'use client'

import { useState, useCallback } from 'react'
import CityMap from '@/components/CityMap'
import RainEffect from '@/components/RainEffect'
import ScanlineOverlay from '@/components/ScanlineOverlay'
import SectionOverlay from '@/components/SectionOverlay'

export default function Home() {
  const [active, setActive] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)

  const handleDistrictClick = useCallback((id: string) => {
    setZoomed(true)
    setTimeout(() => setActive(id), 150)
  }, [])

  const handleClose = useCallback(() => {
    setActive(null)
    setTimeout(() => setZoomed(false), 400)
  }, [])

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      background: '#050a0f',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Rain */}
      <RainEffect />

      {/* Scanlines + vignette */}
      <ScanlineOverlay />

      {/* HUD top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '38px',
        background: 'rgba(0,255,180,0.04)',
        borderBottom: '1px solid rgba(0,255,180,0.15)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
        fontFamily: "'Share Tech Mono', monospace",
      }}>
        <span style={{
          fontFamily: "'Orbitron', monospace",
          color: '#00ffb4', fontSize: '13px',
          fontWeight: 900, letterSpacing: '5px',
          textShadow: '0 0 14px #00ffb4',
        }}>
          NEO//FOLIO
        </span>
        <span style={{ color: 'rgba(0,255,180,0.4)', fontSize: '10px', letterSpacing: '2px' }}>
          KIRTAN JAGDISH GUPTA · FULL STACK DEVELOPER
        </span>
        <span style={{ color: '#ff2d78', fontSize: '10px', letterSpacing: '2px' }}>
          ◉ ONLINE
        </span>
      </div>

      {/* City map — zooms when district clicked */}
      <div style={{
        position: 'absolute',
        top: '38px', left: 0, right: 0, bottom: 0,
        zIndex: 30,
        transform: zoomed ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'center center',
      }}>
        <CityMap onDistrictClick={handleDistrictClick} />
      </div>

      {/* Section overlay */}
      <SectionOverlay activeId={active} onClose={handleClose} />

    </main>
  )
}
