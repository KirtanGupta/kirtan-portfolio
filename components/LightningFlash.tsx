'use client'

import { useEffect, useState } from 'react'

export default function LightningFlash() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const flash = () => {
      const delay = 15000 + Math.random() * 25000
      setTimeout(() => {
        // Double flash like real lightning
        setOpacity(0.12)
        setTimeout(() => setOpacity(0), 80)
        setTimeout(() => setOpacity(0.08), 140)
        setTimeout(() => setOpacity(0), 220)
        flash()
      }, delay)
    }
    flash()
  }, [])

  if (opacity === 0) return null

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#c0e8ff',
      opacity,
      pointerEvents: 'none',
      zIndex: 25,
      transition: 'opacity 0.05s',
    }} />
  )
}