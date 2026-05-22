import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginSide() {
  return (
    <>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px', minHeight: '60vh' }}>
        <div style={{
          background: '#fff',
          maxWidth: 600,
          margin: '32px auto',
          padding: '48px 40px',
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Log ind</h1>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Brugernavn:</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid var(--red)',
                fontSize: 16,
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Password:</label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid var(--red)',
                fontSize: 16,
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          <button style={{
            background: '#fff',
            border: '2px solid var(--red)',
            padding: '10px 32px',
            fontSize: 16,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--red)';
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#fff';
            (e.currentTarget as HTMLButtonElement).style.color = '#000';
          }}
          >
            Log ind
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
