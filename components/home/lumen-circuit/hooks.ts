import { useEffect, useState } from 'react'
import * as THREE from 'three'

export type WebGLStatus = 'checking' | 'ready' | 'unavailable'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

export function useWebGLSupport() {
  const [status, setStatus] = useState<WebGLStatus>('checking')

  useEffect(() => {
    let cancelled = false

    const checkWebGL = () => {
      let renderer: THREE.WebGLRenderer | null = null
      let nextStatus: WebGLStatus = 'unavailable'

      try {
        const canvas = document.createElement('canvas')
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
        nextStatus = 'ready'
      } catch {
        nextStatus = 'unavailable'
      } finally {
        renderer?.dispose()
      }

      if (!cancelled) setStatus(nextStatus)
    }

    const timer = window.setTimeout(checkWebGL, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  return status
}

