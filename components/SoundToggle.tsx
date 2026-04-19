'use client'

import { useState, useRef } from 'react'

export default function SoundToggle() {
  const [on, setOn] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const playAmbient = async () => {
    try {
      const ctx = new AudioContext()
      audioRef.current = ctx

      const gain = ctx.createGain()
      gainRef.current = gain

      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.value = 60
      osc2.type = 'sine'
      osc2.frequency.value = 120

      const g1 = ctx.createGain(); g1.gain.value = 0.04
      const g2 = ctx.createGain(); g2.gain.value = 0.02

      // Rain noise
      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.025
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 800

      osc1.connect(g1); osc2.connect(g2)
      noise.connect(filter); filter.connect(noiseGain)
      g1.connect(gain); g2.connect(gain); noiseGain.connect(gain)
      gain.connect(ctx.destination)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.5)

      osc1.start(); osc2.start(); noise.start()
    } catch (e) {
      console.log('Audio error:', e)
    }
  }

  const stopAmbient = () => {
    if (gainRef.current && audioRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, audioRef.current.currentTime + 0.8)
      setTimeout(() => {
        audioRef.current?.close()
        audioRef.current = null
      }, 1000)
    }
  }

  const toggle = () => {
    if (!on) { playAmbient(); setOn(true) }
    else { stopAmbient(); setOn(false) }
  }

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.85)',
        border: `1px solid ${on ? '#00ffb4' : 'rgba(255,255,255,0.2)'}`,
        color: on ? '#00ffb4' : 'rgba(255,255,255,0.45)',
        padding: '10px 18px',
        cursor: 'pointer',
        fontFamily: "'Orbitron', monospace",
        fontSize: '9px',
        letterSpacing: '3px',
        zIndex: 999,
        transition: 'all 0.3s',
        textShadow: on ? '0 0 10px #00ffb4' : 'none',
        boxShadow: on ? '0 0 20px rgba(0,255,180,0.25)' : 'none',
      }}
    >
      {on ? '🔊 SOUND ON' : '🔇 SOUND OFF'}
    </button>
  )
}