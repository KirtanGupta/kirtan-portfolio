export default function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,180,0.012) 3px, rgba(0,255,180,0.012) 4px)',
        pointerEvents: 'none',
        zIndex: 20,
      }} />
      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.75) 100%)',
        pointerEvents: 'none',
        zIndex: 21,
      }} />
    </>
  )
}