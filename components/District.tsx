'use client'

import { useEffect, useState } from 'react'

export type DistrictData = {
  id: string
  label: string
  neonSign: string
  color: string
  x: number
  y: number
  width: number
  height: number
}

type Props = {
  district: DistrictData
  onClick: (id: string) => void
}

export default function District({ district, onClick }: Props) {
  const { label, neonSign, color, x, y, width, height } = district
  const cx = x + width / 2
  const cy = y + height / 2
  const [flicker, setFlicker] = useState(1)

  // Random neon flicker
  useEffect(() => {
    const flick = () => {
      const delay = 2000 + Math.random() * 5000
      setTimeout(() => {
        setFlicker(0.15)
        setTimeout(() => setFlicker(1), 60)
        setTimeout(() => setFlicker(0.4), 120)
        setTimeout(() => setFlicker(1), 180)
        flick()
      }, delay)
    }
    const t = setTimeout(flick, Math.random() * 3000)
    return () => clearTimeout(t)
  }, [])

  const animId = `pulse-${district.id}`

  return (
    <g
      onClick={() => onClick(district.id)}
      style={{ cursor: 'crosshair' }}
      className="district-group"
    >
      {/* CSS pulse rings via SVG animate */}
      <circle cx={cx} cy={cy} r={12} fill="none" stroke={color} strokeWidth={1}>
        <animate attributeName="r" from="10" to="30" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={12} fill="none" stroke={color} strokeWidth={0.5}>
        <animate attributeName="r" from="10" to="45" dur="2s" begin="0.7s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="0.7s" repeatCount="indefinite" />
      </circle>

      {/* Zone fill */}
      <rect
        className="district-fill"
        x={x} y={y} width={width} height={height} rx={8}
        fill={color + '08'}
        stroke={color}
        strokeWidth={0.6}
        style={{ transition: 'all 0.3s ease' }}
      />

      {/* Inner grid lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <line key={`h${i}`}
          x1={x + 8} y1={y + (height / 5) * (i + 1)}
          x2={x + width - 8} y2={y + (height / 5) * (i + 1)}
          stroke={color + '18'} strokeWidth={0.5}
          style={{ pointerEvents: 'none' }}
        />
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <line key={`v${i}`}
          x1={x + (width / 4) * (i + 1)} y1={y + 8}
          x2={x + (width / 4) * (i + 1)} y2={y + height - 8}
          stroke={color + '18'} strokeWidth={0.5}
          style={{ pointerEvents: 'none' }}
        />
      ))}

      {/* Beacon dot */}
      <circle
        cx={cx} cy={cy} r={5}
        fill={color}
        style={{
          filter: `drop-shadow(0 0 8px ${color})`,
          pointerEvents: 'none'
        }}
      />

      {/* Neon sign */}
      <text
        x={cx} y={cy + 26}
        textAnchor="middle"
        fontSize={10}
        fontFamily="'Orbitron', monospace"
        fontWeight="700"
        fill={color}
        opacity={flicker}
        style={{
          filter: `drop-shadow(0 0 6px ${color})`,
          letterSpacing: '2px',
          pointerEvents: 'none',
        }}
      >
        {neonSign}
      </text>

      {/* Corner label */}
      <text
        x={x + 10} y={y + 16}
        fontSize={7}
        fontFamily="'Share Tech Mono', monospace"
        fill={color + '55'}
        style={{ pointerEvents: 'none', letterSpacing: '2px' }}
      >
        {label}
      </text>
    </g>
  )
}