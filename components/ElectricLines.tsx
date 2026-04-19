'use client'

import { useEffect, useRef } from 'react'

export default function ElectricLines() {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg) return

    // All road paths: [x1,y1,x2,y2]
    const roads = [
      [0, 0.40, 1, 0.40],
      [0, 0.63, 1, 0.63],
      [0, 0.84, 1, 0.84],
      [0.33, 0, 0.33, 1],
      [0.66, 0, 0.66, 1],
    ]

    const pulses: {
      road: number[]
      progress: number
      speed: number
      color: string
    }[] = []

    const colors = ['#00ffb4', '#38bdf8', '#c084fc', '#fb923c', '#f472b6', '#facc15']

    const addPulse = () => {
      pulses.push({
        road: roads[Math.floor(Math.random() * roads.length)],
        progress: 0,
        speed: 0.003 + Math.random() * 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Seed initial pulses
    for (let i = 0; i < 4; i++) {
      setTimeout(() => addPulse(), i * 600)
    }

    // Keep adding pulses
    const spawnInterval = setInterval(() => {
      if (pulses.length < 8) addPulse()
    }, 1200)

    let animId: number
    const dots: SVGCircleElement[] = []

    const animate = () => {
      // Remove old dots
      dots.forEach(d => d.remove())
      dots.length = 0

      const W = window.innerWidth
      const H = window.innerHeight

      pulses.forEach((pulse, i) => {
        pulse.progress += pulse.speed
        if (pulse.progress > 1) {
          pulses.splice(i, 1)
          return
        }

        const [x1, y1, x2, y2] = pulse.road
        const x = (x1 + (x2 - x1) * pulse.progress) * W
        const y = (y1 + (y2 - y1) * pulse.progress) * H

        // Main dot
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', String(x))
        circle.setAttribute('cy', String(y))
        circle.setAttribute('r', '3')
        circle.setAttribute('fill', pulse.color)
        circle.style.filter = `drop-shadow(0 0 6px ${pulse.color})`
        svg.appendChild(circle)
        dots.push(circle)

        // Trail
        for (let t = 1; t <= 4; t++) {
          const tp = pulse.progress - t * 0.015
          if (tp < 0) continue
          const tx = (x1 + (x2 - x1) * tp) * W
          const ty = (y1 + (y2 - y1) * tp) * H
          const trail = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          trail.setAttribute('cx', String(tx))
          trail.setAttribute('cy', String(ty))
          trail.setAttribute('r', String(3 - t * 0.5))
          trail.setAttribute('fill', pulse.color)
          trail.setAttribute('opacity', String(0.6 - t * 0.12))
          svg.appendChild(trail)
          dots.push(trail)
        }
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(spawnInterval)
      dots.forEach(d => d.remove())
    }
  }, [])

  return (
    <svg
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 35,
      }}
    />
  )
}