'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { districts3D } from './CityScene'

type Props = {
  activeId: string | null
}

export default function CameraRig({ activeId }: Props) {
  const { camera } = useThree()
  const angle = useRef(0)

  useFrame((_, delta) => {
    if (activeId) {
      const district = districts3D.find(d => d.id === activeId)
      if (district) {
        const [dx, , dz] = district.position
        const targetPos = new Vector3(dx * 0.5, 8, dz * 0.5 + 8)
        camera.position.lerp(targetPos, delta * 2.5)
        camera.lookAt(dx * 0.3, 0, dz * 0.3)
      }
    } else {
      // Slow gentle orbit
      angle.current += delta * 0.06
      const tx = Math.sin(angle.current) * 3
      const tz = 16 + Math.cos(angle.current) * 2
      camera.position.x += (tx - camera.position.x) * delta * 0.8
      camera.position.y += (16 - camera.position.y) * delta * 0.8
      camera.position.z += (tz - camera.position.z) * delta * 0.8
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}