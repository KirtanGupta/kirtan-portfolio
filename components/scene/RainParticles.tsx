'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three'

export default function RainParticles() {
  const pointsRef = useRef<Points>(null)
  const count = 2000

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 50  // x
      positions[i * 3 + 1] = Math.random() * 30           // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50  // z
      speeds[i] = 0.05 + Math.random() * 0.1
    }
    return { positions, speeds }
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i]  // fall down
      pos[i * 3]     -= speeds[i] * 0.3  // slight angle
      if (pos[i * 3 + 1] < -2) {
        pos[i * 3 + 1] = 25
        pos[i * 3]     = (Math.random() - 0.5) * 50
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffb4"
        size={0.04}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  )
}