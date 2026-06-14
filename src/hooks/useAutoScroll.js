import { useRef, useCallback, useState, useEffect } from 'react'

const SPEED_CONFIG = {
  beginner:     { start: 1.0, end: 2.0 },
  intermediate: { start: 1.0, end: 3.0 },
  advanced:     { start: 1.0, end: 4.0 },
}

const BASE_PX_PER_SEC = 22

export function useAutoScroll(mode = 'intermediate') {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  const isPausedRef = useRef(false)
  const offsetRef = useRef(0)
  const modeRef = useRef(mode)

  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  const tick = useCallback((timestamp) => {
    if (isPausedRef.current) return

    if (!lastTimeRef.current) lastTimeRef.current = timestamp
    const delta = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05)
    lastTimeRef.current = timestamp

    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const containerH = container.clientHeight
    const contentH = content.offsetHeight
    const maxScroll = contentH - containerH

    if (maxScroll <= 0) {
      rafRef.current = requestAnimationFrame(tick)
      return
    }

    const prog = Math.min(-offsetRef.current / maxScroll, 1)
    const cfg = SPEED_CONFIG[modeRef.current] || SPEED_CONFIG.intermediate
    const multiplier = cfg.start + (cfg.end - cfg.start) * prog
    const speed = BASE_PX_PER_SEC * multiplier

    offsetRef.current = Math.max(offsetRef.current - speed * delta, -maxScroll)
    content.style.transform = `translateY(${offsetRef.current}px)`

    setProgress(Math.min(-offsetRef.current / maxScroll, 1))

    if (-offsetRef.current >= maxScroll - 2) {
      setIsFinished(true)
      setProgress(1)
      return
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const startRAF = useCallback(() => {
    lastTimeRef.current = null
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stopRAF = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const pause = useCallback(() => {
    if (isPausedRef.current) return
    isPausedRef.current = true
    setIsPaused(true)
    stopRAF()
  }, [stopRAF])

  const resume = useCallback(() => {
    if (!isPausedRef.current) return
    isPausedRef.current = false
    setIsPaused(false)
    startRAF()
  }, [startRAF])

  const toggle = useCallback(() => {
    if (isPausedRef.current) {
      resume()
    } else {
      pause()
    }
  }, [pause, resume])

  useEffect(() => {
    offsetRef.current = 0
    if (contentRef.current) {
      contentRef.current.style.transform = 'translateY(0px)'
    }

    const startTimer = setTimeout(() => {
      if (!isPausedRef.current) {
        startRAF()
      }
    }, 600)

    return () => {
      clearTimeout(startTimer)
      stopRAF()
    }
  }, [startRAF, stopRAF])

  return { containerRef, contentRef, isPaused, progress, isFinished, toggle, pause, resume }
}
