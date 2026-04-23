'use client'

import { Canvas } from '@react-three/fiber'
import CameraRig from './CameraRig'
import CityGround from './CityGround'
import District3D from './District3D'
import Roads3D from './Roads3D'
import RainParticles from './RainParticles'
import PostEffects from './PostEffects'

export type District3DData = {
  id: string
  label: string
  neonSign: string
  color: string
  position: [number, number, number]
  size: [number, number]
}

export const districts3D: District3DData[] = [
  { id: 'home',     label: 'CENTRAL NEXUS', neonSign: 'KIRTAN.DEV',   color: '#00ffb4', position: [0, 0, 0],      size: [4, 3.5] },
  { id: 'about',    label: 'IDENTITY HUB',  neonSign: 'WHO AM I',     color: '#c084fc', position: [-8, 0, -6],    size: [3.5, 3] },
  { id: 'skills',   label: 'TECH FORGE',    neonSign: 'AUGMENT//LAB', color: '#38bdf8', position: [8, 0, -6],     size: [3.5, 3] },
  { id: 'projects', label: 'MISSION HQ',    neonSign: 'OPERATIONS',   color: '#fb923c', position: [-8, 0, 6],     size: [3.5, 3] },
  { id: 'resume',   label: 'DATA VAULT',    neonSign: 'CLASSIFIED',   color: '#f472b6', position: [8, 0, 6],      size: [3.5, 3] },
  { id: 'contact',  label: 'COMM TOWER',    neonSign: 'OPEN CHANNEL', color: '#facc15', position: [0, 0, 9],      size: [3.5, 2.5] },
]

type Props = {
  onDistrictClick: (id: string) => void
  activeId: string | null
}

export default function CityScene({ onDistrictClick, activeId }: Props) {
  return (
 <Canvas
      camera={{ position: [0, 22, 18], fov: 52, near: 0.1, far: 200 }}
      style={{ background: '#050a0f' }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      }}
    >
      {/* Strong ambient so buildings are visible */}
      <ambientLight intensity={1.5} color="#112233" />

      {/* Key light from above */}
      <directionalLight
        position={[0, 20, 10]}
        intensity={2}
        color="#ffffff"
      />

      {/* Cyan fill light */}
      <pointLight position={[0, 10, 0]} intensity={3} color="#00ffb4" distance={30} />

      {/* Fog */}
      <fog attach="fog" args={['#050a0f', 30, 80]} />

      <CityGround />
      <Roads3D />

      {districts3D.map(d => (
        <District3D
          key={d.id}
          data={d}
          onClick={onDistrictClick}
          isActive={activeId === d.id}
        />
      ))}

      <RainParticles />
      <CameraRig activeId={activeId} />
      <PostEffects />
    </Canvas>
  )
}