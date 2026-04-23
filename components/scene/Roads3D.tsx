'use client'

export default function CityGround() {
  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#050a0f"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Grid */}
      <gridHelper
        args={[100, 50, '#00ffb4', '#00ffb4']}
        position={[0, 0, 0]}
      />
    </group>
  )
}