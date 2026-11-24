import { useCallback, useEffect, useRef } from 'react'

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  lockScroll = false,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const scrimRef = useRef(null)
  const hintRef = useRef(null)

  const propsRef = useRef({})
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled
  }

  const applyProgress = useCallback((p) => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return
    const c = propsRef.current

    const e = smoothstep(0, 1, p) * 0.65 + p * 0.35

    const w = c.startWidth + (100 - c.startWidth) * e
    const h = c.startHeight + (100 - c.startHeight) * e
    const ix = Math.max(0, (100 - w) / 2)
    const iy = Math.max(0, (100 - h) / 2)
    const r = c.startRadius + (c.endRadius - c.startRadius) * e
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p)
      titleRef.current.style.opacity = `${1 - out}`
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p)
      hintRef.current.style.opacity = `${1 - gone}`
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p)
      overlayRef.current.style.opacity = `${inn}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`
      overlayRef.current.style.pointerEvents = inn > 0.5 ? 'auto' : 'none'
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    if (!root || !track || !stage) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let currentProgress = 0
    let targetProgress = 0
    let lastFrame = 0
    let stageH = 0

    const draw = () => applyProgress(currentProgress)
    const startLoop = () => {
      if (raf) return
      lastFrame = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const tick = (now) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastFrame) / 1000))
      lastFrame = now
      const tau = reduceMotion || propsRef.current.smoothing <= 0 ? 0 : propsRef.current.smoothing
      const k = tau > 0 ? 1 - Math.exp(-dt / tau) : 1
      currentProgress += (targetProgress - currentProgress) * k
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress
        raf = 0
        draw()
        return
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    const setProgress = (progress) => {
      targetProgress = progress
      startLoop()
    }

    const scrollLocked = useWindowScroll && lockScroll && enabled && !reduceMotion
    let locked = false
    let lockCompleted = false
    let sectionTop = 0
    let lockValue = 0
    let lockHold = 0
    let touchY = 0
    let lastScrollY = window.scrollY
    const holdPx = height => height * 0.18

    const measure = () => {
      const c = propsRef.current
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight
      if (stageH <= 0) return
      stage.style.height = `${stageH}px`
      track.style.height = `${stageH * (c.useWindowScroll ? 1 : 1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`

      const w = root.clientWidth || stageH
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`)
    }

    const readProgress = () => {
      const c = propsRef.current
      if (!c.enabled) return 1
      const span = c.useWindowScroll ? stageH : stageH * Math.max(0.01, c.scrollDistance)
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top
        return clamp(-top / span, 0, 1)
      }
      return clamp(root.scrollTop / span, 0, 1)
    }

    const rememberSection = () => {
      sectionTop = window.scrollY + track.getBoundingClientRect().top
    }

    const releaseLock = (completed) => {
      if (!locked) return
      locked = false
      lockHold = 0
      if (completed) {
        lockCompleted = true
        window.scrollTo({ top: sectionTop + track.offsetHeight, behavior: 'instant' })
      }
    }

    const advanceLock = (delta) => {
      const total = Math.max(1, stageH)
      if (lockValue >= 1 && delta > 0) {
        if (currentProgress < 0.995) return
        lockHold -= delta
        if (lockHold <= 0) releaseLock(true)
        return
      }
      if (lockValue >= 1 && delta < 0) lockHold = holdPx(stageH)
      lockValue = clamp(lockValue + delta / total, 0, 1)
      setProgress(lockValue)
      if (lockValue >= 1) lockHold = holdPx(stageH)
      else if (lockValue <= 0 && delta < 0) releaseLock(false)
    }

    const isInRange = () => {
      const rect = track.getBoundingClientRect()
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5
    }

    const maybeEngage = (direction) => {
      if (!scrollLocked || locked || lockCompleted || direction <= 0 || !isInRange()) return false
      rememberSection()
      lockValue = clamp(-track.getBoundingClientRect().top / Math.max(1, stageH), 0, 1)
      currentProgress = lockValue
      targetProgress = lockValue
      draw()
      lockHold = holdPx(stageH)
      locked = true
      window.scrollTo({ top: sectionTop, behavior: 'instant' })
      return true
    }

    const onScroll = () => {
      const scrollY = window.scrollY
      const direction = scrollY - lastScrollY
      lastScrollY = scrollY
      if (locked) return
      if (lockCompleted) {
        if (track.getBoundingClientRect().top > window.innerHeight + 1) {
          lockCompleted = false
          lockValue = 0
          setProgress(0)
        } else {
          setProgress(1)
        }
        return
      }
      if (direction > 0 && maybeEngage(direction)) return
      setProgress(readProgress())
    }

    const onResize = () => {
      measure()
      rememberSection()
      setProgress(lockCompleted ? 1 : readProgress())
    }

    measure()
    rememberSection()
    currentProgress = readProgress()
    targetProgress = currentProgress
    draw()

    const normalizeWheel = (e) => {
      const raw = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY
      return clamp(raw, -stageH * 0.22, stageH * 0.22)
    }

    const onWheel = (e) => {
      if (!scrollLocked) return
      const delta = normalizeWheel(e)
      if (!locked && !maybeEngage(delta)) return
      e.preventDefault()
      advanceLock(delta)
    }

    const onTouchStart = (e) => {
      if (!scrollLocked || locked) return
      touchY = e.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (e) => {
      if (!scrollLocked) return
      const y = e.touches[0]?.clientY ?? touchY
      const delta = touchY - y
      touchY = y
      if (!locked && !maybeEngage(delta)) return
      e.preventDefault()
      advanceLock(delta * 1.15)
    }

    const onKeyDown = (e) => {
      if (!scrollLocked) return
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' '
      const up = e.key === 'ArrowUp' || e.key === 'PageUp'
      if (!down && !up) return
      const delta = (down ? 1 : -1) * window.innerHeight * 0.35
      if (!locked && !maybeEngage(delta)) return
      e.preventDefault()
      advanceLock(delta)
    }

    const scroller = useWindowScroll ? window : root
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    if (scrollLocked) {
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('keydown', onKeyDown)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(root)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (scrollLocked) {
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('keydown', onKeyDown)
      }
      ro.disconnect()
    }
  }, [applyProgress, useWindowScroll, lockScroll, enabled])

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="absolute inset-0 h-full w-full origin-center object-cover select-none [will-change:transform]"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef}
        className="absolute inset-0 h-full w-full origin-center object-cover select-none [will-change:transform]"
        src={src}
        alt={alt}
        draggable={false}
      />
    )

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full ${useWindowScroll ? '' : 'overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="relative w-full">
        <div ref={stageRef} className="sticky top-0 z-10 w-full overflow-hidden [contain:paint] [--se-title-size:4rem]">
          <div
            ref={frameRef}
            className="absolute inset-0 [clip-path:inset(21%_29%_21%_29%_round_24px)] [transform:translateZ(0)] [will-change:clip-path]"
          >
            {media}
            <div
              ref={scrimRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.35))] opacity-0"
            />
            {children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center p-[6%] text-center opacity-0 [will-change:opacity,transform]"
              >
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div
              ref={titleRef}
              className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center px-[6%] text-center text-[length:var(--se-title-size)] font-bold leading-none tracking-[-0.03em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] [will-change:opacity,transform]"
            >
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div
              ref={hintRef}
              className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-[0.8125rem] tracking-[0.02em] text-white/55 [will-change:opacity,transform]"
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ScrollExpand
