import Link from 'next/link';
import Image from 'next/image';
import type { Artikel } from '@/lib/contentful';

function formatDato(dato: string) {
  const d = new Date(dato);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `D. ${dd}/${mm}-${yyyy}`;
}

export default function ArtikelKort({ artikel, stor = false }: { artikel: Artikel; stor?: boolean }) {
  const { overskrift, dato, skribent, billede, resume, indhold } = artikel.fields;
  const billedeUrl = billede?.fields?.file?.url
    ? `https:${billede.fields.file.url}`
    : '/placeholder.jpg';
  const kortTekst = resume || indhold?.slice(0, 120) + '...';

  if (stor) {
    return (
      <div style={{
        background: '#fff',
        marginBottom: 2,
      }}>
        <div style={{ padding: '16px 16px 8px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>
            {overskrift}
          </h2>
          <p style={{ fontSize: 13, marginBottom: 4 }}>
            <span style={{ color: 'var(--red)' }}>
              {formatDato(dato)} - af {skribent}
            </span>
          </p>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{kortTekst}</p>
          <Link href={`/artikel/${artikel.sys.id}`} style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--red)',
          }}>
            Læs mere
          </Link>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', overflow: 'hidden' }}>
          <Image
            src={billedeUrl}
            alt={overskrift}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 1100px"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: '14px 14px 10px' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 5 }}>
          {overskrift}
        </h3>
        <p style={{ fontSize: 12, marginBottom: 4 }}>
          <span style={{ color: 'var(--red)' }}>
            {formatDato(dato)} - af {skribent}
          </span>
        </p>
        {kortTekst && (
          <p style={{ fontSize: 13, color: '#555', marginBottom: 8, lineHeight: 1.5 }}>
            {kortTekst}
          </p>
        )}
        <Link href={`/artikel/${artikel.sys.id}`} style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--red)',
          display: 'block',
          marginBottom: 10,
        }}>
          Læs mere
        </Link>
      </div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', marginTop: 'auto' }}>
        <Image
          src={billedeUrl}
          alt={overskrift}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 550px"
        />
      </div>
    </div>
  );
}
