'use client'

import { useEffect, useState } from 'react'

type Props = {
  show: boolean
}

export default function AchievementBanner({ show }: Props) {
  const [visible, setVisible] = useState(false)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (show) {
      setRendered(true)
      setTimeout(() => setVisible(true), 50)
      // Auto hide after 5 seconds
      setTimeout(() => setVisible(false), 5000)
      setTimeout(() => setRendered(false), 5600)
    }
  }, [show])

  if (!rendered) return null

  return (
    <div style={{
      position: 'fixed',
      top: visible ? '60px' : '-160px',
      left: '50%',
      transform: 'translateX(-50%)',
      transition: 'top 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 999,
      background: 'rgba(4, 9, 14, 0.97)',
      border: '1px solid #facc15',
      boxShadow: '0 0 40px rgba(250,204,21,0.3), 0 0 80px rgba(250,204,21,0.1)',
      padding: '0',
      minWidth: '420px',
      overflow: 'hidden',
    }}>
      {/* Top gold stripe */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #facc15, transparent)',
        boxShadow: '0 0 12px #facc15',
      }} />

      <div style={{
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Trophy icon */}
        <div style={{
          fontSize: '36px',
          filter: 'drop-shadow(0 0 12px #facc15)',
          animation: 'spin 0.6s ease-out',
          flexShrink: 0,
        }}>
          🏆
        </div>

        <div>
          {/* Achievement unlocked label */}
          <div style={{
            fontSize: '8px',
            letterSpacing: '4px',
            color: '#facc15',
            fontFamily: "'Share Tech Mono', monospace",
            marginBottom: '6px',
            opacity: 0.7,
          }}>
            ACHIEVEMENT UNLOCKED
          </div>

          {/* Title */}
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '16px',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '3px',
            textShadow: '0 0 16px #facc15',
            marginBottom: '4px',
          }}>
            CITY FULLY EXPLORED
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '2px',
            fontFamily: "'Share Tech Mono', monospace",
          }}>
            ALL 6 DISTRICTS ACCESSED · NEO-MUMBAI UNLOCKED
          </div>
        </div>

        {/* XP badge */}
        <div style={{
          marginLeft: 'auto',
          flexShrink: 0,
          border: '1px solid #facc15',
          padding: '8px 14px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '18px',
            fontWeight: 900,
            color: '#facc15',
            textShadow: '0 0 12px #facc15',
          }}>
            +500
          </div>
          <div style={{
            fontSize: '7px',
            color: 'rgba(250,204,21,0.6)',
            letterSpacing: '2px',
            fontFamily: "'Share Tech Mono', monospace",
          }}>
            XP
          </div>
        </div>
      </div>

      {/* Progress bar draining */}
      <div style={{
        height: '2px',
        background: 'rgba(250,204,21,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          background: '#facc15',
          boxShadow: '0 0 8px #facc15',
          width: visible ? '0%' : '100%',
          transition: 'width 4.8s linear',
        }} />
      </div>
    </div>
  )
}
