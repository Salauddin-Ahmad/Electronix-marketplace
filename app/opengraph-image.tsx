import { ImageResponse } from 'next/og'

export const alt = 'VOLTRONIX — Electrical Marketplace'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 1116,
            height: 546,
            border: '2px solid #2563eb',
            background: '#111c33',
            paddingLeft: 92,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: 930 }}>
            <div style={{ display: 'flex', color: '#93c5fd', fontSize: 25, fontWeight: 700, letterSpacing: 7 }}>
              ELECTRICAL MARKETPLACE
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: 92, fontWeight: 800, letterSpacing: -4 }}>
              VOLTRONIX
            </div>
            <div style={{ display: 'flex', marginTop: 22, maxWidth: 750, color: '#dbeafe', fontSize: 34, lineHeight: 1.25 }}>
              Electrical, electronics, tools and project supplies.
            </div>
            <div style={{ display: 'flex', marginTop: 40, color: '#60a5fa', fontSize: 24, fontWeight: 700 }}>
              Quote-first support • Bangladesh
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
