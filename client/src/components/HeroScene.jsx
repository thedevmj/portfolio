import React, { useEffect, useRef, useState } from 'react'

function makeLetterShape(THREE, points) {
  const shape = new THREE.Shape()
  shape.moveTo(points[0][0], points[0][1])
  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y))
  shape.closePath()
  return shape
}

export default function HeroScene() {
  const hostRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let disposed = false
    let frameId = 0
    let renderer
    let observer
    let themeObserver
    let cleanupScene
    let hasRendered = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let pointerTarget = { x: 0, y: 0 }
    let previousFrame = 0

    import('three')
      .then((THREE) => {
        if (disposed || !hostRef.current) return

        const host = hostRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
        camera.position.set(0, 0, 7)

        try {
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        } catch (error) {
          console.error('[HeroScene] WebGL renderer could not be created:', error)
          return
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
        renderer.setSize(host.clientWidth, host.clientHeight)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        host.appendChild(renderer.domElement)

        const root = new THREE.Group()
        scene.add(root)

        const letterMaterial = new THREE.MeshStandardMaterial({
          color: 0xff5c2b,
          metalness: 0.48,
          roughness: 0.28,
          emissive: 0x401000,
          emissiveIntensity: 0.18,
          side: THREE.DoubleSide,
        })
        const bevel = { depth: 0.18, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.035, bevelThickness: 0.035 }
        const jShape = new THREE.Shape()
        jShape.moveTo(-0.5, 0.82)
        jShape.lineTo(0.5, 0.82)
        jShape.lineTo(0.5, 0.54)
        jShape.lineTo(-0.18, 0.54)
        jShape.lineTo(-0.18, -0.24)
        jShape.quadraticCurveTo(-0.18, -0.58, -0.52, -0.58)
        jShape.quadraticCurveTo(-0.86, -0.58, -0.86, -0.24)
        jShape.lineTo(-0.86, -0.04)
        jShape.lineTo(-0.57, -0.04)
        jShape.lineTo(-0.57, -0.22)
        jShape.quadraticCurveTo(-0.57, -0.31, -0.49, -0.31)
        jShape.lineTo(-0.46, -0.31)
        jShape.quadraticCurveTo(-0.43, -0.31, -0.43, -0.24)
        jShape.lineTo(-0.43, 0.54)
        jShape.lineTo(-0.5, 0.54)
        jShape.closePath()
        const mShape = makeLetterShape(THREE, [
          [-0.56, -0.63], [-0.56, 0.7], [-0.23, 0.7], [0, 0.12],
          [0.23, 0.7], [0.56, 0.7], [0.56, -0.63], [0.28, -0.63],
          [0.28, 0.15], [0, -0.4], [-0.28, 0.15], [-0.28, -0.63],
        ])
        const j = new THREE.Mesh(new THREE.ExtrudeGeometry(jShape, bevel), letterMaterial)
        const m = new THREE.Mesh(new THREE.ExtrudeGeometry(mShape, bevel), letterMaterial)
        j.position.set(-0.53, 0, 0)
        m.position.set(0.52, 0, 0.03)
        root.add(j, m)

        const orbitGroup = new THREE.Group()
        root.add(orbitGroup)
        const orbitMaterial = new THREE.MeshStandardMaterial({
          color: 0x4353ff,
          metalness: 0.72,
          roughness: 0.28,
          emissive: 0x101944,
          emissiveIntensity: 0.2,
        })
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.012, 8, 160), orbitMaterial)
        orbit.rotation.set(0.92, 0.22, -0.34)
        orbitGroup.add(orbit)

        const fineOrbit = new THREE.Mesh(
          new THREE.TorusGeometry(1.82, 0.006, 6, 160),
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
        )
        fineOrbit.rotation.set(-0.56, 0.72, 0.14)
        orbitGroup.add(fineOrbit)

        const beadGeometry = new THREE.SphereGeometry(0.075, 20, 16)
        const bead = new THREE.Mesh(beadGeometry, orbitMaterial)
        bead.position.set(1.71, 0, 0)
        orbitGroup.add(bead)
        const smallBead = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 16, 12),
          new THREE.MeshStandardMaterial({ color: 0xff5c2b, emissive: 0x401000, emissiveIntensity: 0.25 })
        )
        smallBead.position.set(-1.68, 0, 0.05)
        orbitGroup.add(smallBead)

        scene.add(new THREE.AmbientLight(0xffffff, 1.5))
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.2)
        keyLight.position.set(-3, 4, 5)
        scene.add(keyLight)
        const rimLight = new THREE.PointLight(0x4353ff, 18, 8)
        rimLight.position.set(3, -1, 2)
        scene.add(rimLight)

        const updateTheme = () => {
          const styles = getComputedStyle(document.documentElement)
          const orange = styles.getPropertyValue('--accent').trim()
          const blue = styles.getPropertyValue('--accent-2').trim()
          if (orange) {
            letterMaterial.color.setStyle(orange)
            smallBead.material.color.setStyle(orange)
          }
          if (blue) {
            orbitMaterial.color.setStyle(blue)
            rimLight.color.setStyle(blue)
          }
        }
        updateTheme()

        const resize = () => {
          const { clientWidth: width, clientHeight: height } = host
          if (!width || !height) return
          camera.aspect = width / height
          camera.position.z = width / height < 0.7 ? 7.8 : 7
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }

        const onPointerMove = (event) => {
          const rect = host.getBoundingClientRect()
          pointerTarget = {
            x: ((event.clientX - rect.left) / rect.width - 0.5) * 0.24,
            y: ((event.clientY - rect.top) / rect.height - 0.5) * 0.2,
          }
        }
        const onPointerLeave = () => {
          pointerTarget = { x: 0, y: 0 }
        }

        if (!reduceMotion) {
          host.addEventListener('pointermove', onPointerMove)
          host.addEventListener('pointerleave', onPointerLeave)
        }
        observer = new ResizeObserver(resize)
        observer.observe(host)
        themeObserver = new MutationObserver(updateTheme)
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

        const render = (time = 0) => {
          if (disposed) return
          if (!reduceMotion && time - previousFrame < 32) {
            frameId = requestAnimationFrame(render)
            return
          }
          previousFrame = time
          root.rotation.y += (pointerTarget.x - root.rotation.y) * 0.035
          root.rotation.x += (pointerTarget.y - root.rotation.x) * 0.035
          if (!reduceMotion) {
            orbitGroup.rotation.z += 0.0015
            root.rotation.z = Math.sin(time * 0.00035) * 0.025
          }
          renderer.render(scene, camera)
          if (!hasRendered) {
            hasRendered = true
            setReady(true)
          }
          if (!reduceMotion) frameId = requestAnimationFrame(render)
        }
        render()

        cleanupScene = () => {
          host.removeEventListener('pointermove', onPointerMove)
          host.removeEventListener('pointerleave', onPointerLeave)
          observer?.disconnect()
          themeObserver?.disconnect()
          scene.traverse((object) => {
            if (!object.isMesh) return
            object.geometry.dispose()
            if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
            else object.material.dispose()
          })
          renderer.dispose()
          renderer.domElement.remove()
        }
      })
      .catch((error) => {
        if (!disposed) console.error('[HeroScene] Three.js failed to load:', error)
      })

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      observer?.disconnect()
      themeObserver?.disconnect()
      cleanupScene?.()
    }
  }, [])

  return (
    <div ref={hostRef} className="absolute inset-0" aria-hidden="true">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="display select-none text-[8.5rem] italic leading-none text-accent sm:text-[10rem]">JM</span>
        </div>
      )}
    </div>
  )
}
