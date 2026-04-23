'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import CityMap from '@/components/CityMap'

const CityScene = dynamic(() => import('@/components/scene/CityScene'), { ssr: false })

type Props = {
  onDistrictClick: (id: string) => void
  activeId: string | null
}

export default function DeviceGate({ onDistrictClick, activeId }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      // Check screen width AND WebGL support
      const smallScreen = window.innerWidth < 1024
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const noWebGL = !gl

      setIsMobile(smallScreen || noWebGL)
      setChecked(true)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Don't render until checked — avoids flash
  if (!checked) return null

  if (isMobile) {
    return (
      <>
        {/* Mobile banner */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid rgba(0,255,180,0.3)',
          padding: '6px 16px',
          color: 'rgba(0,255,180,0.5)',
          fontSize: '8px',
          letterSpacing: '2px',
          fontFamily: "'Share Tech Mono', monospace",
          whiteSpace: 'nowrap',
          zIndex: 60,
        }}>
          2D MODE · 3D AVAILABLE ON DESKTOP
        </div>
        <CityMap onDistrictClick={onDistrictClick} />
      </>
    )
  }

  return (
    <CityScene
      onDistrictClick={onDistrictClick}
      activeId={activeId}
    />
  )
}
