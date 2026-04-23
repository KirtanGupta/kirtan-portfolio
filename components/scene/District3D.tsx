'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Group, Color } from 'three'
import { District3DData } from './CityScene'

type Props = {
  data: District3DData
  onClick: (id: string) => void
  isActive: boolean
}

const buildingConfigs = [
  { x: 0,    z: 0,    h: 3.5, w: 1.0, d: 1.0 },
  { x: 1.2,  z: 0.2,  h: 2.2, w: 0.7, d: 0.7 },
  { x: -1.1, z: 0.1,  h: 2.6, w: 0.7, d: 0.8 },
  { x: 0.3,  z: -1.2, h: 1.8, w: 0.8, d: 0.7 },
  { x: -0.6, z: 1.2,  h: 1.4, w: 0.7, d: 0.7 },
  { x: 1.3,  z: -1.0, h: 2.0, w: 0.6, d: 0.6 },
  { x: -1.3, z: -1.0, h: 1.6, w: 0.5, d: 0.5 },
  { x: 0.0,  z: 1.4,  h: 1.2, w: 0.6, d: 0.6 },
]

export default function District3D({ data, onClick, isActive }: Props) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const targetY = useRef(0)
  const currentY = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    targetY.current = hovered || isActive ? 0.4 : 0
    currentY.current += (targetY.current - currentY.current) * delta * 5
    groupRef.current.position.y = currentY.current
  })

  const emissive = hovered ? 0.8 : isActive ? 0.6 : 0.25

  return (
    <group
      ref={groupRef}
      position={data.position}
      onClick={(e) => { e.stopPropagation(); onClick(data.id) }}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'crosshair' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
    >
      {/* Buildings */}
      {buildingConfigs.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive={data.color}
            emissiveIntensity={emissive * 0.15}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Neon roof cap */}
      <mesh position={[0, buildingConfigs[0].h + 0.03, 0]}>
        <boxGeometry args={[1.05, 0.06, 1.05]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered ? 5 : 2.5}
          toneMapped={false}
        />
      </mesh>

      {/* Ground zone glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[data.size[0], data.size[1]]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered ? 0.5 : 0.15}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        color={data.color}
        intensity={hovered ? 8 : 3}
        distance={8}
        position={[0, 5, 0]}
      />

      {/* Neon sign */}
      <Text
        position={[0, buildingConfigs[0].h + 0.7, 0]}
        fontSize={0.24}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        outlineColor={data.color}
        outlineOpacity={0.5}
        outlineWidth={0.01}
      >
        {data.neonSign}
      </Text>

      {/* Zone label */}
      <Text
        position={[0, 0.15, data.size[1] / 2 + 0.2]}
        fontSize={0.11}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        fillOpacity={0.4}
      >
        {data.label}
      </Text>
    </group>
  )
}