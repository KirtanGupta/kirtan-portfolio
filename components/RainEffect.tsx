'use client'

import { useEffect, useRef } from 'react'

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drops: {
      x: number; y: number
      speed: number; length: number; opacity: number
    }[] = []

    for (let i = 0; i < 220; i++) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 8 + Math.random() * 10,
        length: 18 + Math.random() * 28,
        opacity: 0.2 + Math.random() * 0.35,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drops.forEach(drop => {
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x - 2.5, drop.y + drop.length)
        ctx.strokeStyle = `rgba(0, 255, 180, ${drop.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
        drop.y += drop.speed
        drop.x -= 1.2
        if (drop.y > canvas.height || drop.x < -50) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.width
        }
      })
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  )
}