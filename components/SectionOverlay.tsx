'use client'

import { useEffect, useState } from 'react'
import { siteData } from './sections/data'

type Props = {
  activeId: string | null
  onClose: () => void
}

const colorMap: Record<string, string> = {
  home: '#00ffb4',
  about: '#c084fc',
  skills: '#38bdf8',
  projects: '#fb923c',
  resume: '#f472b6',
  contact: '#facc15',
}

const titleMap: Record<string, string> = {
  home: 'CENTRAL NEXUS',
  about: 'IDENTITY HUB',
  skills: 'TECH FORGE',
  projects: 'MISSION HQ',
  resume: 'DATA VAULT',
  contact: 'COMM TOWER',
}

export default function SectionOverlay({ activeId, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (activeId) {
      setRendered(true)
      setTimeout(() => setVisible(true), 20)
    } else {
      setVisible(false)
      setTimeout(() => setRendered(false), 500)
    }
  }, [activeId])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!rendered || !activeId) return null

  const color = colorMap[activeId] || '#00ffb4'
  const title = titleMap[activeId] || activeId.toUpperCase()

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 100,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          backdropFilter: 'blur(2px)',
        }}
      />

      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: visible
          ? 'translate(-50%, -50%) scale(1)'
          : 'translate(-50%, -40%) scale(0.92)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 101,
        width: '90%',
        maxWidth: '760px',
        maxHeight: '80vh',
        background: 'rgba(4, 9, 14, 0.97)',
        border: `1px solid ${color}40`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        <div style={{
          height: '3px',
          background: color,
          boxShadow: `0 0 16px ${color}`,
          flexShrink: 0,
        }} />

        <div style={{
          padding: '20px 28px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '20px',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '4px',
              textShadow: `0 0 20px ${color}`,
            }}>
              {title}
            </div>
            <div style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '3px',
              marginTop: '4px',
              fontFamily: "'Share Tech Mono', monospace",
            }}>
              DISTRICT NODE · PRESS ESC TO EXIT
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.5)',
              width: '32px', height: '32px',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#ff2d78'
              e.currentTarget.style.color = '#ff2d78'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{
          padding: '24px 28px',
          overflowY: 'auto',
          flex: 1,
          scrollbarWidth: 'thin',
          scrollbarColor: `${color}40 transparent`,
        }}>
          <SectionContent id={activeId} color={color} />
        </div>
      </div>
    </>
  )
}

function SectionContent({ id, color }: { id: string; color: string }) {
  const d = siteData

  const SH = ({ children }: { children: string }) => (
    <div style={{
      fontSize: '8px', letterSpacing: '3px',
      color: 'rgba(255,255,255,0.25)',
      margin: '18px 0 10px',
      fontFamily: "'Share Tech Mono', monospace",
    }}>
      {children}
    </div>
  )

  const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center',
      padding: '9px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', fontFamily: "'Share Tech Mono', monospace" }}>
        {label}
      </span>
      <span style={{ fontSize: '11px', color: highlight ? color : '#fff', letterSpacing: '1px', fontFamily: "'Share Tech Mono', monospace" }}>
        {value}
      </span>
    </div>
  )

  const Tag = ({ text }: { text: string }) => (
    <span style={{
      fontSize: '9px', padding: '3px 10px',
      border: `1px solid ${color}`,
      color: color, letterSpacing: '1px',
      opacity: 0.7,
      fontFamily: "'Share Tech Mono', monospace",
    }}>
      {text}
    </span>
  )

  if (id === 'home') return (
    <div>
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: '22px', fontWeight: 900,
        color: '#fff', letterSpacing: '4px',
        textShadow: `0 0 20px ${color}`,
        marginBottom: '6px',
      }}>
        {d.home.name}
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '3px', marginBottom: '20px', fontFamily: "'Share Tech Mono', monospace" }}>
        {d.home.role}
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 2, letterSpacing: '0.5px', marginBottom: '20px', fontFamily: "'Share Tech Mono', monospace" }}>
        {d.home.bio}
      </div>
      <Row label="STATUS" value={d.home.status} highlight />
      <Row label="LOCATION" value={d.home.location} />
      <SH>NAVIGATION PROTOCOL</SH>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 2.2, letterSpacing: '1px', fontFamily: "'Share Tech Mono', monospace" }}>
        → CLICK ANY GLOWING BEACON ON THE MAP<br />
        → EACH DISTRICT REVEALS A SECTOR<br />
        → PRESS ESC TO RETURN TO THE CITY
      </div>
    </div>
  )

  if (id === 'about') return (
    <div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 2, marginBottom: '16px', fontFamily: "'Share Tech Mono', monospace" }}>
        {d.about.bio}
      </div>
      <SH>VITAL STATS</SH>
      <Row label="CODENAME" value="Kirtan Jagdish Gupta" />
      <Row label="CLASS" value="Full Stack Developer" />
      <Row label="ORIGIN" value="Mumbai, India" />
      <SH>EDUCATION</SH>
      <Row label="DEGREE" value={d.about.education.degree} />
      <Row label="INSTITUTE" value={d.about.education.institute} />
      <Row label="CGPA" value={d.about.education.cgpa} highlight />
      <Row label="PERIOD" value={d.about.education.year} />
      <SH>ACHIEVEMENTS</SH>
      {d.about.achievements.map((a, i) => (
        <div key={i} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.5px' }}>
          → {a}
        </div>
      ))}
    </div>
  )

  if (id === 'skills') return (
    <div>
      {[
        { label: 'FRONTEND', items: d.skills.frontend },
        { label: 'BACKEND', items: d.skills.backend },
        { label: 'DATABASE', items: d.skills.database },
        { label: 'LANGUAGES', items: d.skills.languages },
        { label: 'TOOLS', items: d.skills.tools },
      ].map(group => (
        <div key={group.label}>
          <SH>{group.label}</SH>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {group.items.map(item => <Tag key={item} text={item} />)}
          </div>
        </div>
      ))}
    </div>
  )

  if (id === 'projects') return (
    <div>
      <SH>COMPLETED OPERATIONS</SH>
      {d.projects.map(p => (
        <div key={p.codename} style={{
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '16px',
          marginBottom: '12px',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: color, boxShadow: `0 0 8px ${color}` }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <div>
              <div style={{ fontSize: '9px', color: color, letterSpacing: '3px', fontFamily: "'Orbitron', monospace", marginBottom: '4px' }}>
                {p.codename}
              </div>
              <div style={{ fontSize: '13px', color: '#fff', letterSpacing: '1px', fontFamily: "'Share Tech Mono', monospace" }}>
                {p.title}
              </div>
            </div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px', fontFamily: "'Share Tech Mono', monospace" }}>
              {p.period}
            </div>
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '10px', fontFamily: "'Share Tech Mono', monospace" }}>
            {p.description}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {p.stack.map(s => <Tag key={s} text={s} />)}
          </div>
          <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
            fontSize: '9px', color: color, letterSpacing: '2px',
            textDecoration: 'none', fontFamily: "'Share Tech Mono', monospace",
            opacity: 0.7,
          }}>
            → VIEW ON GITHUB
          </a>
        </div>
      ))}
    </div>
  )

  if (id === 'resume') return (
    <div>
      <Row label="FORMAT" value="PDF" />
      <Row label="CLEARANCE" value="OPEN ACCESS" highlight />
      <div
        onClick={() => window.open('/Kirtan_Gupta_Resume.pdf', '_blank')}
        style={{
          margin: '16px 0',
          padding: '14px',
          border: `1px solid ${color}`,
          textAlign: 'center',
          cursor: 'pointer',
          color: color,
          fontSize: '11px',
          letterSpacing: '3px',
          fontFamily: "'Orbitron', monospace",
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = `${color}10`)}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        ↓ &nbsp; DOWNLOAD RESUME.PDF
      </div>
      <SH>EXPERIENCE LOG</SH>
      <Row label="BCA — Tilak Maharashtra Vidyapeeth" value="2022 – 2025" />
      <Row label="CGPA" value="8.3" highlight />
      <SH>TECH ARSENAL</SH>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Node.js','Express.js','MongoDB','Tailwind','GSAP','JavaScript','Java','Python','Git','Linux'].map(s => (
          <Tag key={s} text={s} />
        ))}
      </div>
    </div>
  )

  if (id === 'contact') return (
    <div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 2, marginBottom: '16px', fontFamily: "'Share Tech Mono', monospace" }}>
        Transmitting from Neo-Mumbai. Open to full-time roles, freelance missions, and collaborations. Response time: &lt;24h.
      </div>
      {[
        { icon: '✉', label: d.contact.email, sub: 'PRIMARY CHANNEL', href: `mailto:${d.contact.email}` },
        { icon: '⬡', label: 'linkedin.com/in/kirtan-gupta-51866736a', sub: 'PROFESSIONAL NETWORK', href: d.contact.linkedin },
        { icon: '◈', label: 'github.com/KirtanGupta', sub: 'CODE REPOSITORY', href: d.contact.github },
        { icon: '◉', label: d.contact.twitter, sub: 'X / TWITTER', href: '#' },
        { icon: '☎', label: d.contact.phone, sub: 'DIRECT LINE', href: `tel:${d.contact.phone}` },
      ].map(item => (
        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '8px',
            textDecoration: 'none',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${color}60`
            e.currentTarget.style.background = `${color}08`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <span style={{ fontSize: '20px' }}>{item.icon}</span>
          <div>
            <div style={{ fontSize: '11px', color: '#fff', letterSpacing: '1px', fontFamily: "'Share Tech Mono', monospace" }}>
              {item.label}
            </div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', marginTop: '2px', fontFamily: "'Share Tech Mono', monospace" }}>
              {item.sub}
            </div>
          </div>
        </a>
      ))}
    </div>
  )

  return null
}
