import React, { useEffect, useRef, useState } from 'react'

// Fullscreen hero video rendered through a WebGL shader that applies a
// mouse-driven "torsion" (twist + ripple + bulge around the cursor).
// Grayscale by default to stay on-brand; falls back to a plain cover <video>
// on touch-only devices.
const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = (aPos * 0.5 + 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform float uTime;
uniform float uStrength;   // global intensity (always 1 — see below)
uniform float uIdle;       // gentle idle warp even without hover

void main(){
  vec2 uv = vUv;
  vec2 c = uMouse;
  vec2 delta = uv - c;
  float dist = length(delta);

  // --- torsion: rotate the field around the cursor, strongest near it ---
  // amplifies with time so it feels alive, multiplied by hover strength
  float t = uTime;
  float ang = 0.85 * uStrength * exp(-dist * 4.2)
            + 0.15 * uIdle * sin(t * 1.2) * exp(-dist * 3.0);
  float s = sin(ang);
  float co = cos(ang);
  delta = mat2(co, -s, s, co) * delta;

  // --- bulge: cylindrical lens pop toward the cursor ---
  float blow = exp(-dist * 3.2) * (0.55 * uStrength + 0.10 * uIdle);
  delta *= 1.0 + blow;

  // --- global shear follows mouse X: whole field twists with horizontal motion ---
  float shear = uStrength * 0.4 * (uv.x - 0.5);
  delta += vec2(shear * (uv.y - c.y), 0.0);

  vec2 warped = c + delta;

  // subtle living ripple / shimmer
  float sh = 0.008 * (0.4 + uStrength);
  warped.x += sin(warped.y * 16.0 + t * 1.1) * sh;
  warped.y += cos(warped.x * 14.0 - t * 0.9) * sh;

  vec4 col = texture2D(uTex, clamp(warped, 0.0, 1.0));

  // monochrome brand treatment + slight brightness lift at the cursor
  float gray = dot(col.rgb, vec3(0.299, 0.587, 0.114));
  vec3 outCol = vec3(mix(gray, gray * 1.15, uStrength * 0.4));
  outCol += vec3(0.05) * uStrength * exp(-dist * 8.0);

  gl_FragColor = vec4(outCol, 1.0);
}
`

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error('Shader compile: ' + gl.getShaderInfoLog(sh))
  }
  return sh
}

export default function HeroVideo({ src = 'https://noth-in.b-cdn.net/nothin-sharp-high.mp4' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [interactive] = useState(
    () => !window.matchMedia('(hover: none)').matches
  )

  useEffect(() => {
    if (!interactive) return
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!canvas || !wrap) return

    let gl = null
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false }) || canvas.getContext('experimental-webgl')
    } catch (e) { gl = null }
    if (!gl) return

    // --- real <video> appended to DOM for reliable autoplay + texture decode ---
    const video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = 'auto'
    video.autoplay = true
    video.setAttribute('playsinline', '')
    video.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none'
    video.src = src
    wrap.prepend(video)
    const tryPlay = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}) }
    tryPlay()
    video.addEventListener('canplay', tryPlay, { once: true })

    // --- shader program ---
    let prog, uPos, uTex, uMouse, uTime, uStrength, uIdle
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      prog = gl.createProgram()
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
      gl.useProgram(prog)
      uPos = gl.getAttribLocation(prog, 'aPos')
      uTex = gl.getUniformLocation(prog, 'uTex')
      uMouse = gl.getUniformLocation(prog, 'uMouse')
      uTime = gl.getUniformLocation(prog, 'uTime')
      uStrength = gl.getUniformLocation(prog, 'uStrength')
      uIdle = gl.getUniformLocation(prog, 'uIdle')
    } catch (e) {
      video.remove()
      return
    }

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(uPos)
    gl.vertexAttribPointer(uPos, 2, gl.FLOAT, false, 0, 0)

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.uniform1i(uTex, 0)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, tex)

    // --- mouse (lerped) ---
    let mx = 0.5, my = 0.5, sx = 0.5, sy = 0.5
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mx = (e.clientX - r.left) / r.width
      my = 1.0 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('mousemove', onMove)

    // --- resize ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth, h = canvas.clientHeight
      canvas.width = Math.max(1, w * dpr)
      canvas.height = Math.max(1, h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // --- render loop ---
    let raf
    const t0 = performance.now()
    const render = () => {
      sx += (mx - sx) * 0.08
      sy += (my - sy) * 0.08
      const t = (performance.now() - t0) / 1000
      if (video.readyState >= 2) {
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      }
      const strength = 1
      gl.uniform2f(uMouse, sx, sy)
      gl.uniform1f(uTime, t)
      gl.uniform1f(uStrength, strength)
      gl.uniform1f(uIdle, 0.8)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      video.pause()
      video.removeAttribute('src')
      video.load()
      if (prog) gl.deleteProgram(prog)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive])

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {interactive ? (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      ) : (
        <video className="absolute inset-0 w-full h-full object-cover" src={src} autoPlay loop muted playsInline preload="auto" />
      )}
      <div className="absolute inset-0 bg-bg-light/40 dark:bg-bg-dark/50" />
    </div>
  )
}
