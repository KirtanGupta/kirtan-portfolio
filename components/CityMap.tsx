'use client'

import District, { DistrictData } from './District'

const districts: DistrictData[] = [
  {
    id: 'home',
    label: 'CENTRAL NEXUS',
    neonSign: 'KIRTAN.DEV',
    color: '#00ffb4',
    x: 300, y: 210, width: 240, height: 130,
  },
  {
    id: 'about',
    label: 'IDENTITY HUB',
    neonSign: 'WHO AM I',
    color: '#c084fc',
    x: 40, y: 60, width: 220, height: 120,
  },
  {
    id: 'skills',
    label: 'TECH FORGE',
    neonSign: 'AUGMENT//LAB',
    color: '#38bdf8',
    x: 580, y: 60, width: 220, height: 120,
  },
  {
    id: 'projects',
    label: 'MISSION HQ',
    neonSign: 'OPERATIONS',
    color: '#fb923c',
    x: 40, y: 360, width: 220, height: 120,
  },
  {
    id: 'resume',
    label: 'DATA VAULT',
    neonSign: 'CLASSIFIED',
    color: '#f472b6',
    x: 580, y: 360, width: 220, height: 120,
  },
  {
    id: 'contact',
    label: 'COMM TOWER',
    neonSign: 'OPEN CHANNEL',
    color: '#facc15',
    x: 300, y: 490, width: 240, height: 110,
  },
]

type Props = {
  onDistrictClick: (id: string) => void
}

export default function CityMap({ onDistrictClick }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#050a0f' }}>
      <svg
        viewBox="0 0 840 640"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: '#050a0f',
          pointerEvents: 'all'
        }}
      >
        {/* Background grid */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`vg${i}`}
            x1={i * 30} y1={0} x2={i * 30} y2={640}
            stroke="rgba(0,255,180,0.04)" strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 22 }).map((_, i) => (
          <line
            key={`hg${i}`}
            x1={0} y1={i * 30} x2={840} y2={i * 30}
            stroke="rgba(0,255,180,0.04)" strokeWidth={0.5}
          />
        ))}

        {/* Main roads — horizontal */}
        {[210, 360, 490].map(y => (
          <g key={y}>
            <line x1={0} y1={y} x2={840} y2={y} stroke="rgba(0,255,180,0.06)" strokeWidth={10}/>
            <line x1={0} y1={y} x2={840} y2={y} stroke="rgba(0,255,180,0.18)" strokeWidth={1.5}/>
          </g>
        ))}

        {/* Main roads — vertical */}
        {[280, 560].map(x => (
          <g key={x}>
            <line x1={x} y1={0} x2={x} y2={640} stroke="rgba(0,255,180,0.06)" strokeWidth={10}/>
            <line x1={x} y1={0} x2={x} y2={640} stroke="rgba(0,255,180,0.18)" strokeWidth={1.5}/>
          </g>
        ))}

        {/* Road dashes — center lines */}
        {[210, 360, 490].map(y => (
          <line
            key={`dash-h${y}`}
            x1={0} y1={y} x2={840} y2={y}
            stroke="rgba(0,255,180,0.35)"
            strokeWidth={0.5}
            strokeDasharray="12 16"
          />
        ))}
        {[280, 560].map(x => (
          <line
            key={`dash-v${x}`}
            x1={x} y1={0} x2={x} y2={640}
            stroke="rgba(0,255,180,0.35)"
            strokeWidth={0.5}
            strokeDasharray="12 16"
          />
        ))}

        {/* Districts */}
        {districts.map(d => (
          <District key={d.id} district={d} onClick={onDistrictClick} />
        ))}
      </svg>
    </div>
  )
}