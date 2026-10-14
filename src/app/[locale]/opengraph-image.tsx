import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const alt = 'PT Sarana Lima Kencana — Jual & Sewa Genset / Generator Set';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #2f5b44 0%, #427f5f 100%)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 30,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: '#00d4d7',
          fontWeight: 700,
        }}
      >
        {siteConfig.tagline}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.05,
          marginTop: 24,
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 44,
          fontWeight: 600,
          marginTop: 28,
          color: '#e8efe9',
        }}
      >
        Jual & Sewa Genset · Generator Set 9–1000 kVA
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 30,
          marginTop: 40,
          color: '#cfe0d6',
        }}
      >
        Service · Sparepart · Panel ATS/AMF · Jakarta & seluruh Indonesia
      </div>
    </div>,
    { ...size },
  );
}
