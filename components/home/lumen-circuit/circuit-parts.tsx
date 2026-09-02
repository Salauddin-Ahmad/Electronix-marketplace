import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { createFilamentGeometry } from './geometry'
import type { CircuitPartProps, CircuitTimelineRef } from './types'

export function Battery({ timeline, reducedMotion }: CircuitPartProps) {
  const chargeRef = useRef<THREE.MeshStandardMaterial>(null)
  const terminalRef = useRef<THREE.MeshStandardMaterial>(null)
  const polarityRefs = useRef<Array<THREE.MeshStandardMaterial | null>>([])

  useFrame(({ clock }, delta) => {
    const current = timeline.current
    const pulseAmount = reducedMotion ? 0.88 : 0.88 + Math.sin(clock.elapsedTime * 3) * 0.07
    const pulse = current.power * pulseAmount
    const polarityGlow = 0.42 + current.power * 1.9

    if (chargeRef.current) {
      chargeRef.current.emissiveIntensity = THREE.MathUtils.damp(
        chargeRef.current.emissiveIntensity,
        pulse * 2.2,
        8,
        delta,
      )
    }
    if (terminalRef.current) {
      terminalRef.current.emissiveIntensity = THREE.MathUtils.damp(
        terminalRef.current.emissiveIntensity,
        current.power * 0.45,
        7,
        delta,
      )
    }
    polarityRefs.current.forEach((material) => {
      if (material) {
        material.emissiveIntensity = THREE.MathUtils.damp(
          material.emissiveIntensity,
          polarityGlow,
          9,
          delta,
        )
      }
    })
  })

  return (
    <group position={[-4.65, 0, 0.12]}>
      <RoundedBox args={[1.55, 3.65, 0.82]} radius={0.23} smoothness={10} castShadow>
        <meshPhysicalMaterial
          color="#18212c"
          metalness={0.7}
          roughness={0.3}
          clearcoat={0.28}
          clearcoatRoughness={0.26}
        />
      </RoundedBox>
      <RoundedBox
        args={[1.26, 3.26, 0.08]}
        position={[0, 0, 0.46]}
        radius={0.17}
        smoothness={8}
      >
        <meshPhysicalMaterial
          color="#111923"
          metalness={0.4}
          roughness={0.42}
          clearcoat={0.18}
          clearcoatRoughness={0.28}
        />
      </RoundedBox>
      {[
        [-0.48, 1.38],
        [0.48, 1.38],
        [-0.48, -1.38],
        [0.48, -1.38],
      ].map(([x, y]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.535]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.025, 16]} />
          <meshStandardMaterial color="#657080" metalness={0.86} roughness={0.28} />
        </mesh>
      ))}
      <RoundedBox
        args={[0.1, 2.24, 0.05]}
        position={[0.43, 0, 0.53]}
        radius={0.04}
        smoothness={6}
      >
        <meshStandardMaterial
          ref={chargeRef}
          color="#2b6a96"
          emissive="#148dff"
          emissiveIntensity={0}
          metalness={0.62}
          roughness={0.24}
        />
      </RoundedBox>
      <RoundedBox
        args={[1.05, 0.18, 0.92]}
        position={[0, 1.83, 0]}
        radius={0.08}
        smoothness={6}
      >
        <meshStandardMaterial
          ref={terminalRef}
          color="#b96a2f"
          emissive="#ff8b38"
          emissiveIntensity={0.02}
          metalness={0.95}
          roughness={0.18}
        />
      </RoundedBox>
      <RoundedBox
        args={[1.05, 0.18, 0.92]}
        position={[0, -1.83, 0]}
        radius={0.08}
        smoothness={6}
      >
        <meshStandardMaterial color="#85502e" metalness={0.95} roughness={0.19} />
      </RoundedBox>
      <mesh position={[-0.18, 1.18, 0.56]}>
        <boxGeometry args={[0.34, 0.05, 0.03]} />
        <meshStandardMaterial
          ref={(node) => {
            polarityRefs.current[0] = node
          }}
          color="#b7ecff"
          emissive="#168dff"
          emissiveIntensity={0.42}
          metalness={0.58}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.18, 1.18, 0.56]}>
        <boxGeometry args={[0.05, 0.34, 0.03]} />
        <meshStandardMaterial
          ref={(node) => {
            polarityRefs.current[1] = node
          }}
          color="#b7ecff"
          emissive="#168dff"
          emissiveIntensity={0.42}
          metalness={0.58}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.18, -1.18, 0.56]}>
        <boxGeometry args={[0.34, 0.05, 0.03]} />
        <meshStandardMaterial
          ref={(node) => {
            polarityRefs.current[2] = node
          }}
          color="#b7ecff"
          emissive="#168dff"
          emissiveIntensity={0.42}
          metalness={0.58}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

export function Resistor({ timeline, reducedMotion }: CircuitPartProps) {
  const bodyRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const bandRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(({ clock }, delta) => {
    const heat = timeline.current.resistor
    const pulseAmount = reducedMotion ? 0.86 : 0.86 + Math.sin(clock.elapsedTime * 4.2) * 0.06
    const shimmer = heat * pulseAmount

    if (bodyRef.current) {
      bodyRef.current.emissiveIntensity = THREE.MathUtils.damp(
        bodyRef.current.emissiveIntensity,
        shimmer * 0.25,
        7,
        delta,
      )
    }
    if (bandRef.current) {
      bandRef.current.emissiveIntensity = THREE.MathUtils.damp(
        bandRef.current.emissiveIntensity,
        shimmer * 0.38,
        7,
        delta,
      )
    }
  })

  return (
    <group position={[0, 3.15, 0.16]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.37, 2.14, 8, 40]} />
        <meshPhysicalMaterial
          ref={bodyRef}
          color="#d1c1a7"
          emissive="#ff7c28"
          emissiveIntensity={0}
          roughness={0.36}
          metalness={0.01}
          clearcoat={0.28}
          clearcoatRoughness={0.34}
          reflectivity={0.34}
        />
      </mesh>
      {[-1.15, 1.15].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.35, 0.022, 10, 40]} />
          <meshPhysicalMaterial
            color="#a99b85"
            roughness={0.32}
            metalness={0.08}
            clearcoat={0.18}
          />
        </mesh>
      ))}
      {[-0.8, -0.28, 0.28, 0.78].map((x, index) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.386, 0.06, 12, 40]} />
          <meshStandardMaterial
            ref={index === 2 ? bandRef : undefined}
            color={['#7b211a', '#e3ae30', '#8f2616', '#56441e'][index]}
            emissive={index === 2 ? '#ff6f28' : '#120807'}
            emissiveIntensity={0}
            metalness={0.34}
            roughness={0.38}
          />
        </mesh>
      ))}
      {[-1.69, 1.69].map((x) => (
        <mesh key={x} castShadow position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.105, 0.105, 0.74, 24]} />
          <meshPhysicalMaterial
            color="#b56a35"
            metalness={0.98}
            roughness={0.145}
            clearcoat={0.82}
            clearcoatRoughness={0.11}
            reflectivity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export function Bulb({ timeline, reducedMotion }: CircuitPartProps) {
  const filamentRef = useRef<THREE.MeshStandardMaterial>(null)
  const socketAccentRef = useRef<THREE.MeshStandardMaterial>(null)
  const haloRef = useRef<THREE.MeshBasicMaterial>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const filamentGeometry = useMemo(() => createFilamentGeometry(), [])

  useFrame(({ clock }, delta) => {
    const power = timeline.current.bulb
    const pulseAmount = reducedMotion ? 0.95 : 0.95 + Math.sin(clock.elapsedTime * 5.5) * 0.025
    const shimmer = power * pulseAmount

    if (filamentRef.current) {
      filamentRef.current.emissiveIntensity = THREE.MathUtils.damp(
        filamentRef.current.emissiveIntensity,
        shimmer * 5.6,
        10,
        delta,
      )
    }
    if (socketAccentRef.current) {
      socketAccentRef.current.emissiveIntensity = THREE.MathUtils.damp(
        socketAccentRef.current.emissiveIntensity,
        power * 1.2,
        8,
        delta,
      )
    }
    if (haloRef.current) {
      haloRef.current.opacity = THREE.MathUtils.damp(haloRef.current.opacity, power * 0.1, 7, delta)
    }
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        power * 14.1,
        8,
        delta,
      )
    }
  })

  return (
    <group position={[4.65, 0, 0.16]}>
      <mesh position={[0, 0.42, -0.04]}>
        <sphereGeometry args={[1.18, 48, 48]} />
        <meshBasicMaterial
          ref={haloRef}
          color="#ff8b35"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0.42, 0.08]} castShadow>
        <sphereGeometry args={[0.84, 56, 56]} />
        <meshPhysicalMaterial
          color="#f5debe"
          roughness={0.05}
          metalness={0.02}
          transmission={0.96}
          thickness={0.27}
          ior={1.42}
          transparent
          opacity={0.4}
          clearcoat={1}
          clearcoatRoughness={0.045}
          reflectivity={0.74}
          attenuationColor="#ffd3a6"
          attenuationDistance={1.82}
          iridescence={0.06}
          iridescenceIOR={1.25}
        />
      </mesh>
      <mesh position={[0, -0.45, 0.08]}>
        <cylinderGeometry args={[0.45, 0.29, 0.78, 40]} />
        <meshPhysicalMaterial
          color="#e9c9a0"
          roughness={0.13}
          metalness={0.12}
          transmission={0.78}
          thickness={0.12}
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh geometry={filamentGeometry} position={[0, 0.34, 0.5]}>
        <meshStandardMaterial
          ref={filamentRef}
          color="#e3a05c"
          emissive="#ff6b20"
          emissiveIntensity={0.08}
          metalness={0.78}
          roughness={0.26}
        />
      </mesh>
      {[-0.17, 0.17].map((x) => (
        <mesh key={x} position={[x, -0.24, 0.47]}>
          <cylinderGeometry args={[0.013, 0.013, 0.86, 12]} />
          <meshStandardMaterial color="#574937" metalness={0.92} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -1.18, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.58, 0.88, 48]} />
        <meshPhysicalMaterial
          color="#111925"
          metalness={0.92}
          roughness={0.19}
          clearcoat={0.46}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.76, 0]}>
        <cylinderGeometry args={[0.545, 0.505, 0.1, 48]} />
        <meshPhysicalMaterial
          color="#202b38"
          metalness={0.9}
          roughness={0.22}
          clearcoat={0.34}
        />
      </mesh>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[0.585, 0.55, 0.14, 48]} />
        <meshPhysicalMaterial
          color="#0d141d"
          metalness={0.94}
          roughness={0.2}
          clearcoat={0.42}
        />
      </mesh>
      {[-0.98, -1.21, -1.42].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.525, 0.018, 10, 48]} />
          <meshStandardMaterial color="#334253" metalness={0.88} roughness={0.24} />
        </mesh>
      ))}
      <mesh position={[0, -0.84, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.51, 0.028, 12, 56]} />
        <meshStandardMaterial
          ref={socketAccentRef}
          color="#aa5224"
          emissive="#ff7425"
          emissiveIntensity={0}
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.7, 24]} />
        <meshPhysicalMaterial
          color="#b96a32"
          metalness={0.97}
          roughness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.16}
        />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshPhysicalMaterial color="#c47438" metalness={0.98} roughness={0.13} clearcoat={0.7} />
      </mesh>
      <mesh position={[0, -1.72, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.56, 24]} />
        <meshPhysicalMaterial
          color="#b96a32"
          metalness={0.97}
          roughness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.16}
        />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshPhysicalMaterial color="#c47438" metalness={0.98} roughness={0.13} clearcoat={0.7} />
      </mesh>
      <pointLight
        ref={lightRef}
        color="#ff9a42"
        intensity={0}
        distance={9}
        decay={2}
        position={[0, 0.45, 2.7]}
      />
    </group>
  )
}

type SwitchBoxProps = CircuitPartProps & {
  onToggle: () => void
  onHoverChange: (hovered: boolean) => void
}

export function SwitchBox({
  timeline,
  reducedMotion,
  onToggle,
  onHoverChange,
}: SwitchBoxProps) {
  const leverRef = useRef<THREE.Group>(null)
  const ledRef = useRef<THREE.MeshStandardMaterial>(null)
  const bodyAccentRef = useRef<THREE.MeshStandardMaterial>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }, delta) => {
    const current = timeline.current
    const leverAngle = THREE.MathUtils.lerp(-0.76, 0.04, current.switchClosed)

    if (leverRef.current) {
      leverRef.current.rotation.z = THREE.MathUtils.damp(
        leverRef.current.rotation.z,
        leverAngle,
        12,
        delta,
      )
    }
    if (ledRef.current) {
      const pulseAmount = reducedMotion ? 0.88 : 0.88 + Math.sin(clock.elapsedTime * 5) * 0.05
      const flicker = current.power * pulseAmount
      ledRef.current.emissiveIntensity = THREE.MathUtils.damp(
        ledRef.current.emissiveIntensity,
        flicker * 3.1,
        9,
        delta,
      )
    }
    if (bodyAccentRef.current) {
      bodyAccentRef.current.emissiveIntensity = THREE.MathUtils.damp(
        bodyAccentRef.current.emissiveIntensity,
        (hovered ? 0.34 : 0.03) + current.power * 0.45,
        8,
        delta,
      )
    }
  })

  const updateHovered = (nextHovered: boolean) => {
    setHovered(nextHovered)
    onHoverChange(nextHovered)
  }

  return (
    <group position={[0, -3.15, 0.18]}>
      <RoundedBox args={[3.18, 0.94, 0.82]} radius={0.22} smoothness={10} castShadow>
        <meshStandardMaterial color="#111720" metalness={0.87} roughness={0.25} />
      </RoundedBox>
      <RoundedBox
        args={[2.72, 0.56, 0.09]}
        position={[0, 0, 0.47]}
        radius={0.13}
        smoothness={8}
      >
        <meshStandardMaterial color="#080b10" metalness={0.5} roughness={0.43} />
      </RoundedBox>
      <mesh position={[0, -0.23, 0.54]}>
        <boxGeometry args={[1.78, 0.045, 0.026]} />
        <meshStandardMaterial
          ref={bodyAccentRef}
          color="#b75c26"
          emissive="#ff7827"
          emissiveIntensity={0.03}
          metalness={0.78}
          roughness={0.24}
        />
      </mesh>
      <mesh position={[1.08, 0.2, 0.57]}>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial
          ref={ledRef}
          color="#f49a3b"
          emissive="#ff7724"
          emissiveIntensity={0.03}
          metalness={0.44}
          roughness={0.2}
        />
      </mesh>
      {[-1.35, 1.35].map((x) => (
        <mesh key={x} position={[x, 0, 0.04]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.22, 24]} />
          <meshStandardMaterial color="#ae602c" metalness={0.96} roughness={0.16} />
        </mesh>
      ))}
      <group ref={leverRef} position={[-0.72, 0.18, 0.55]}>
        <mesh position={[0.78, 0.06, 0]} castShadow>
          <boxGeometry args={[1.56, 0.11, 0.16]} />
          <meshStandardMaterial color="#c87a37" metalness={0.95} roughness={0.14} />
        </mesh>
        <mesh position={[0.05, 0.04, 0]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#e1a15d" metalness={0.9} roughness={0.16} />
        </mesh>
      </group>
      <mesh
        position={[0, 0, 0.94]}
        onClick={(event) => {
          event.stopPropagation()
          onToggle()
        }}
        onPointerOver={(event) => {
          event.stopPropagation()
          updateHovered(true)
        }}
        onPointerOut={() => updateHovered(false)}
      >
        <boxGeometry args={[3.6, 1.45, 0.22]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}

type CurrentFlowProps = {
  curve: THREE.Curve<THREE.Vector3>
  timeline: CircuitTimelineRef
  reducedMotion: boolean
}

const ELECTRON_OFFSETS = [0, 0.5] as const

export function CurrentFlow({ curve, timeline, reducedMotion }: CurrentFlowProps) {
  const pulseRefs = useRef<Array<THREE.Mesh | null>>([])
  const materialRefs = useRef<Array<THREE.MeshStandardMaterial | null>>([])

  useFrame(({ clock }) => {
    const current = timeline.current
    const active = current.power > 0.01

    for (let index = 0; index < ELECTRON_OFFSETS.length; index += 1) {
      const pulse = pulseRefs.current[index]
      const material = materialRefs.current[index]
      if (!pulse || !material) continue

      let visible = active
      let position = 0
      const offset = ELECTRON_OFFSETS[index]

      if (current.stage === 'arming') {
        position = current.leadProgress - offset
        visible = active && position >= 0 && position <= 1 && (index === 0 || !reducedMotion)
      } else if (current.stage === 'on') {
        position = (current.flow + offset) % 1
        visible = !reducedMotion || index === 0
      } else if (current.stage === 'disarming') {
        position = (current.flow + offset) % 1
        visible = active && index < (reducedMotion ? 1 : 2)
      } else {
        visible = false
      }

      pulse.visible = visible
      if (!visible) continue

      const point = curve.getPointAt(position)
      pulse.position.copy(point)
      pulse.position.z += 0.05
      const shimmer = reducedMotion
        ? 1
        : 0.96 + Math.sin(clock.elapsedTime * 7 + index * Math.PI) * 0.045
      pulse.scale.setScalar(shimmer)
      material.opacity = Math.max(
        0,
        current.power *
          (reducedMotion ? 0.86 : 0.86 + Math.sin(clock.elapsedTime * 7 + index * Math.PI) * 0.06),
      )
      material.emissiveIntensity = reducedMotion
        ? 5.45
        : 5.45 + Math.sin(clock.elapsedTime * 7 + index * Math.PI) * 0.42
    }
  })

  return (
    <group>
      {ELECTRON_OFFSETS.map((offset, index) => (
        <mesh
          key={offset}
          ref={(node) => {
            pulseRefs.current[index] = node
          }}
        >
          <sphereGeometry args={[0.102, 24, 24]} />
          <meshStandardMaterial
            ref={(node) => {
              materialRefs.current[index] = node
            }}
            color="#b9edff"
            emissive="#168dff"
            emissiveIntensity={5.4}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
