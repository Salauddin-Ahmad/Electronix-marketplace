import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Battery, Bulb, CurrentFlow, Resistor, SwitchBox } from './circuit-parts'
import { createFlowCurve, createWireCurves } from './geometry'
import { createGraphiteTextureSet } from './stone-texture'
import type { CircuitStage, CircuitTimeline } from './types'

const OFF_DURATION = 0.42
const ON_DURATION = 1.06

type CircuitSceneProps = {
  stage: CircuitStage
  reducedMotion: boolean
  onToggle: () => void
  onSwitchHoverChange: (hovered: boolean) => void
}

export function CircuitScene({
  stage,
  reducedMotion,
  onToggle,
  onSwitchHoverChange,
}: CircuitSceneProps) {
  const timeline = useRef<CircuitTimeline>({
    lastStage: stage,
    stage,
    startedAt: 0,
    power: 0,
    leadProgress: 0,
    switchClosed: 0,
    bulb: 0,
    resistor: 0,
    flow: 0,
  })
  const wireCurves = useMemo(() => createWireCurves(), [])
  const flowCurve = useMemo(() => createFlowCurve(), [])

  useFrame(({ clock }, delta) => {
    const state = timeline.current

    if (state.lastStage !== stage) {
      state.lastStage = stage
      state.stage = stage
      state.startedAt = clock.elapsedTime
    }

    const elapsed = clock.elapsedTime - state.startedAt

    if (stage === 'off') {
      state.power = 0
      state.leadProgress = 0
      state.switchClosed = 0
      state.bulb = 0
      state.resistor = 0
      state.flow = 0
      return
    }

    if (stage === 'arming') {
      const duration = reducedMotion ? 0.18 : ON_DURATION
      const leadStart = reducedMotion ? 0 : 0.16
      state.leadProgress = THREE.MathUtils.clamp(
        (elapsed - leadStart) / Math.max(0.02, duration - leadStart),
        0,
        1,
      )
      state.switchClosed = THREE.MathUtils.smoothstep(
        elapsed,
        0.06,
        reducedMotion ? 0.12 : 0.24,
      )
      state.power = THREE.MathUtils.smoothstep(state.leadProgress, 0, 0.2)
      state.resistor = THREE.MathUtils.smoothstep(state.leadProgress, 0.22, 0.38)
      state.bulb = THREE.MathUtils.smoothstep(state.leadProgress, 0.48, 0.66)
      state.flow = state.leadProgress
      return
    }

    if (stage === 'on') {
      state.power = 1
      state.leadProgress = 1
      state.switchClosed = 1
      state.resistor = 1
      state.bulb = 1
      state.flow = reducedMotion ? 0.72 : (elapsed * 0.21) % 1
      return
    }

    const fade =
      1 - THREE.MathUtils.smoothstep(elapsed, 0, reducedMotion ? 0.16 : OFF_DURATION)
    state.power = fade
    state.leadProgress = 1
    state.switchClosed =
      1 - THREE.MathUtils.smoothstep(elapsed, 0.08, reducedMotion ? 0.12 : 0.26)
    state.resistor = fade
    state.bulb = fade
    state.flow = reducedMotion ? 0.72 : (elapsed * 0.15) % 1

    if (delta > 0.2) state.power = Math.min(state.power, 0.4)
  })

  return (
    <>
      <CameraDrift reducedMotion={reducedMotion} />
      <ambientLight intensity={0.56} color="#8a9cb8" />
      <directionalLight
        castShadow
        color="#dce7ff"
        intensity={3.6}
        position={[-5, 6, 8]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        color="#ffe6c4"
        intensity={4.1}
        angle={0.72}
        penumbra={0.94}
        decay={1.6}
        distance={20}
        position={[0, 5.8, 7]}
      />
      <pointLight color="#c76b2d" intensity={5.8} distance={15} position={[-5.5, -1.5, 4]} />
      <pointLight color="#527ab6" intensity={3.5} distance={15} position={[5.5, 3.8, 4]} />

      <BackdropPlate />
      <CircuitWire curve={wireCurves.topLeft} />
      <CircuitWire curve={wireCurves.topRight} />
      <CircuitWire curve={wireCurves.bottomRight} />
      <CircuitWire curve={wireCurves.bottomLeft} />

      <Battery timeline={timeline} reducedMotion={reducedMotion} />
      <Resistor timeline={timeline} reducedMotion={reducedMotion} />
      <Bulb timeline={timeline} reducedMotion={reducedMotion} />
      <SwitchBox
        timeline={timeline}
        reducedMotion={reducedMotion}
        onToggle={onToggle}
        onHoverChange={onSwitchHoverChange}
      />
      <CurrentFlow curve={flowCurve} timeline={timeline} reducedMotion={reducedMotion} />
    </>
  )
}

function CameraDrift({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame(({ camera, clock }) => {
    if (reducedMotion) {
      camera.position.set(0.35, 0.1, 15)
      camera.lookAt(0, 0, 0)
      return
    }

    camera.position.x = 0.35 + Math.sin(clock.elapsedTime * 0.13) * 0.12
    camera.position.y = 0.1 + Math.cos(clock.elapsedTime * 0.16) * 0.06
    camera.lookAt(0, 0, 0)
  })

  return null
}

function BackdropPlate() {
  const graphite = useMemo(() => createGraphiteTextureSet(), [])

  useEffect(() => () => graphite.dispose(), [graphite])

  return (
    <group position={[0, 0, -0.72]}>
      <RoundedBox args={[12.9, 8.8, 0.13]} radius={0.5} smoothness={12}>
        <meshPhysicalMaterial
          color="#0a0f15"
          metalness={0.68}
          roughness={0.34}
          clearcoat={0.22}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>
      <RoundedBox
        args={[12.38, 8.28, 0.16]}
        position={[0, 0, 0.12]}
        radius={0.42}
        smoothness={12}
      >
        <meshStandardMaterial color="#121923" metalness={0.4} roughness={0.52} />
      </RoundedBox>
      <mesh receiveShadow position={[0, 0, 0.22]}>
        <planeGeometry args={[10.8, 6.85]} />
        <meshPhysicalMaterial
          map={graphite.colorMap}
          roughnessMap={graphite.roughnessMap}
          normalMap={graphite.normalMap}
          normalScale={[0.16, 0.16]}
          color="#93989b"
          emissive="#030405"
          emissiveIntensity={0.04}
          roughness={0.66}
          metalness={0.18}
          clearcoat={0.1}
          clearcoatRoughness={0.36}
          reflectivity={0.34}
        />
      </mesh>
    </group>
  )
}

function CircuitWire({ curve }: { curve: THREE.Curve<THREE.Vector3> }) {
  return (
    <mesh castShadow receiveShadow>
      <tubeGeometry args={[curve, 180, 0.105, 16, false]} />
      <meshPhysicalMaterial
        color="#b56a35"
        metalness={0.98}
        roughness={0.145}
        clearcoat={0.82}
        clearcoatRoughness={0.11}
        reflectivity={0.8}
      />
    </mesh>
  )
}
