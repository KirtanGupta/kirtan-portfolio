'use client'

import { useState, useCallback, useRef } from 'react'
import CityMap from '@/components/CityMap'
import RainEffect from '@/components/RainEffect'
import ScanlineOverlay from '@/components/ScanlineOverlay'
import SectionOverlay from '@/components/SectionOverlay'
import ElectricLines from '@/components/ElectricLines'
import LightningFlash from '@/components/LightningFlash'

export default function Home() {
  const [active, setActive] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const handleDistrictClick = useCallback((id: string) => {
    setZoomed(true)
    setTimeout(() => setActive(id), 150)
  }, [])

  const handleClose = useCallback(() => {
    setActive(null)
    setTimeout(() => setZoomed(false), 400)
  }, [])

  const toggleSound = async () => {
    if (!soundOn) {
      try {
        const ctx = new AudioContext()
        audioRef.current = ctx
        const gain = ctx.createGain()
        gainRef.current = gain

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        osc1.type = 'sine'; osc1.frequency.value = 60
        osc2.type = 'sine'; osc2.frequency.value = 120
        const g1 = ctx.createGain(); g1.gain.value = 0.04
        const g2 = ctx.createGain(); g2.gain.value = 0.02

        const bufferSize = ctx.sampleRate * 2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
        const noise = ctx.createBufferSource()
        noise.buffer = buffer; noise.loop = true
        const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.025
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'; filter.frequency.value = 800

        osc1.connect(g1); osc2.connect(g2)
        noise.connect(filter); filter.connect(noiseGain)
        g1.connect(gain); g2.connect(gain); noiseGain.connect(gain)
        gain.connect(ctx.destination)
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.5)
        osc1.start(); osc2.start(); noise.start()
        setSoundOn(true)
      } catch (e) { console.log(e) }
    } else {
      if (gainRef.current && audioRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, audioRef.current.currentTime + 0.8)
        setTimeout(() => { audioRef.current?.close(); audioRef.current = null }, 1000)
      }
      setSoundOn(false)
    }
  }

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      background: '#050a0f',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <LightningFlash />
      <RainEffect />
      <ScanlineOverlay />

      {/* HUD top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '46px',
        background: 'rgba(0,255,180,0.04)',
        borderBottom: '1px solid rgba(0,255,180,0.15)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 200,
        fontFamily: "'Share Tech Mono', monospace",
      }}>
        {/* Left — title */}
        <span style={{
          fontFamily: "'Orbitron', monospace",
          color: '#00ffb4', fontSize: '13px',
          fontWeight: 900, letterSpacing: '5px',
          textShadow: '0 0 14px #00ffb4',
        }}>
          NEO//FOLIO
        </span>

        {/* Center — name */}
        <span style={{
          color: 'rgba(0,255,180,0.4)',
          fontSize: '10px', letterSpacing: '2px',
          textAlign: 'center',
        }}>
          KIRTAN JAGDISH GUPTA · FULL STACK DEVELOPER
        </span>

        {/* Right — sound + status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px',
        }}>
          <button
            onClick={toggleSound}
            style={{
              background: soundOn ? 'rgba(0,255,180,0.08)' : 'rgba(0,0,0,0.5)',
              border: `1px solid ${soundOn ? '#00ffb4' : 'rgba(255,255,255,0.25)'}`,
              color: soundOn ? '#00ffb4' : 'rgba(255,255,255,0.5)',
              padding: '5px 14px',
              cursor: 'pointer',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '9px',
              letterSpacing: '2px',
              textShadow: soundOn ? '0 0 8px #00ffb4' : 'none',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
          >
            {soundOn ? '🔊 SND:ON' : '🔇 SND:OFF'}
          </button>
          <span style={{
            color: '#ff2d78',
            fontSize: '10px',
            letterSpacing: '2px',
            animation: 'blink 2s infinite',
            whiteSpace: 'nowrap',
          }}>
            ◉ ONLINE
          </span>
        </div>
      </div>

      {/* City map */}
      <div style={{
        position: 'absolute',
        top: '46px', left: 0, right: 0, bottom: 0,
        zIndex: 30,
        transform: zoomed ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'center center',
      }}>
        <CityMap onDistrictClick={handleDistrictClick} />
      </div>

      {/* Electric pulses */}
      <div style={{
        position: 'absolute',
        top: '46px', left: 0, right: 0, bottom: 0,
        zIndex: 36, pointerEvents: 'none',
      }}>
        <ElectricLines />
      </div>

      {/* Bottom hint */}
      {!active && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(0,255,180,0.3)',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '9px',
          letterSpacing: '3px',
          zIndex: 60,
          whiteSpace: 'nowrap',
          animation: 'blink 3s infinite',
        }}>
          ↑ CLICK A DISTRICT TO ENTER ↑
        </div>
      )}

      {/* Section overlay */}
      <SectionOverlay activeId={active} onClose={handleClose} />

    </main>
  )
}