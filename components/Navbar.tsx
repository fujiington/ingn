'use client';
import Link from 'next/link';
import { useState } from 'react';
import { KATEGORIER } from '@/lib/kategorier';

export default function Navbar({ aktivKategori = 'Alle' }: { aktivKategori?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e0dcdc',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        height: 56,
        gap: 16,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          color: 'var(--red)',
          fontWeight: 400,
          letterSpacing: 1,
          flexShrink: 0,
        }}>
          INGN
        </Link>

        {/* Desktop nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          flex: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }} className="desktop-nav">
          {KATEGORIER.map((kat, i) => (
            <span key={kat} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <span style={{ color: '#ccc', padding: '0 4px' }}>|</span>}
              <Link
                href={kat === 'Alle' ? '/' : `/kategori/${kat.toLowerCase()}`}
                style={{
                  fontSize: 14,
                  fontWeight: aktivKategori === kat ? 700 : 400,
                  color: aktivKategori === kat ? 'var(--red)' : 'var(--black)',
                  padding: '4px 6px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}
              >
                {kat}
              </Link>
            </span>
          ))}
        </nav>

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto', flexShrink: 0 }}>
          <Link href="/login" aria-label="Log ind">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: '#fff',
          borderTop: '1px solid #e0dcdc',
          padding: '12px 16px',
        }}>
          {KATEGORIER.map((kat) => (
            <Link
              key={kat}
              href={kat === 'Alle' ? '/' : `/kategori/${kat.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '10px 0',
                fontSize: 16,
                fontWeight: aktivKategori === kat ? 700 : 400,
                color: aktivKategori === kat ? 'var(--red)' : 'var(--black)',
                borderBottom: '1px solid #f0ecec',
              }}
            >
              {kat}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
