'use client'

import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Canvas } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion, useWebGLSupport } from './hooks'
import { CircuitScene } from './scene'
import styles from './lumen-circuit.module.css'
import type { CircuitStage } from './types'

export function LumenCircuitExperience() {
  const [stage, setStage] = useState<CircuitStage>('off')
  const [switchHovered, setSwitchHovered] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()
  const webglStatus = useWebGLSupport()
  const isTransitioning = stage === 'arming' || stage === 'disarming'
  const isLive = stage === 'arming' || stage === 'on'

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const toggleCircuit = useCallback(() => {
    if (stage === 'arming' || stage === 'disarming') return

    const turningOn = stage === 'off'
    setStage(turningOn ? 'arming' : 'disarming')

    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(
      () => setStage(turningOn ? 'on' : 'off'),
      reducedMotion ? 180 : turningOn ? 1120 : 470,
    )
  }, [reducedMotion, stage])

  const status = isLive ? 'Circuit live' : 'Circuit open'
  const controlLabel = isLive ? 'Open circuit' : 'Close circuit'

  return (
    <div
      className={styles.experience}
      data-switch-hovered={switchHovered ? 'true' : 'false'}
      onPointerLeave={() => setSwitchHovered(false)}
    >
      <div className={styles.noise} aria-hidden="true" />
      <section className={styles.stage} aria-label="Interactive electrical circuit">
        {webglStatus === 'ready' ? (
          <Canvas
            dpr={reducedMotion ? 1 : [1, 1.5]}
            camera={{ position: [0.35, 0.1, 15], fov: 34 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping
              gl.toneMappingExposure = 1.14
              gl.shadowMap.enabled = true
              gl.shadowMap.type = THREE.PCFSoftShadowMap
            }}
          >
            <color attach="background" args={['#080c13']} />
            <fog attach="fog" args={['#080c13', 14, 27]} />
            <CircuitScene
              stage={stage}
              reducedMotion={reducedMotion}
              onToggle={toggleCircuit}
              onSwitchHoverChange={setSwitchHovered}
            />
            <EffectComposer multisampling={0} enableNormalPass={false}>
              <Bloom
                intensity={0.92}
                luminanceThreshold={0.72}
                luminanceSmoothing={0.72}
                mipmapBlur
              />
              <Vignette offset={0.32} darkness={0.8} />
            </EffectComposer>
          </Canvas>
        ) : (
          <CircuitFallback active={isLive} checking={webglStatus === 'checking'} />
        )}
      </section>

      <div className={`${styles.status} ${isLive ? styles.statusLive : ''}`} aria-live="polite">
        <span className={styles.statusOrb} aria-hidden="true" />
        {status}
      </div>

      <button
        className={`${styles.control} ${isLive ? styles.controlLive : ''}`}
        type="button"
        onClick={toggleCircuit}
        disabled={isTransitioning}
        role="switch"
        aria-checked={isLive}
        aria-label={controlLabel}
      >
        <span className={styles.controlLed} aria-hidden="true" />
        <span>{isTransitioning ? 'Synchronising' : controlLabel}</span>
      </button>
    </div>
  )
}

function CircuitFallback({ active, checking }: { active: boolean; checking: boolean }) {
  return (
    <div className={`${styles.fallback} ${active ? styles.fallbackLive : ''}`}>
      <div className={styles.fallbackBoard} aria-hidden="true">
        <span className={styles.fallbackWire} />
        <span className={styles.fallbackBattery}>+/−</span>
        <span className={styles.fallbackResistor} />
        <span className={styles.fallbackBulb} />
        <span className={styles.fallbackSwitch} />
      </div>
      <p>{checking ? 'Preparing realtime circuit…' : 'WebGL unavailable — use the circuit control'}</p>
    </div>
  )
}

