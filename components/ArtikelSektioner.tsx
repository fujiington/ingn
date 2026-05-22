import Image from 'next/image';
import Link from 'next/link';
import type { Artikel } from '@/lib/contentful';

function formatDato(dato: string) {
  const d = new Date(dato);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `D. ${dd}/${mm}-${yyyy}`;
}

function getImageUrl(artikel: Artikel) {
  const url = artikel.fields.billede?.fields?.file?.url;
  return url ? `https:${url}` : '/placeholder.jpg';
}

function getPreview(artikel: Artikel) {
  const { resume, indhold } = artikel.fields;
  return resume || `${(indhold || '').slice(0, 140)}...`;
}

function HeaderArtikel({ artikel }: { artikel: Artikel }) {
  return (
    <article style={{ background: '#fff' }}>
      <figure style={{ margin: 0 }}>
        <figcaption style={{ padding: '18px 18px 12px' }}>
          <h2 style={{ fontSize: 30, lineHeight: 1.2, marginBottom: 8 }}>{artikel.fields.overskrift}</h2>
          <p style={{ fontSize: 13, color: 'var(--red)', marginBottom: 10 }}>
            {formatDato(artikel.fields.dato)} - af {artikel.fields.skribent}
          </p>
          <p style={{ fontSize: 15, color: '#555', marginBottom: 10 }}>{getPreview(artikel)}</p>
          <Link href={`/artikel/${artikel.sys.id}`} style={{ color: 'var(--red)', fontWeight: 600 }}>
            Læs mere
          </Link>
        </figcaption>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7' }}>
          <Image
            src={getImageUrl(artikel)}
            alt={artikel.fields.overskrift}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </div>
      </figure>
    </article>
  );
}

function BottomImageCard({ artikel }: { artikel: Artikel }) {
  return (
    <article style={{ background: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <figcaption style={{ padding: '14px 14px 10px' }}>
          <h3 style={{ fontSize: 18, lineHeight: 1.28, marginBottom: 6 }}>{artikel.fields.overskrift}</h3>
          <p style={{ fontSize: 12, color: 'var(--red)', marginBottom: 8 }}>
            {formatDato(artikel.fields.dato)} - af {artikel.fields.skribent}
          </p>
          <p style={{ fontSize: 13, color: '#555', marginBottom: 10 }}>{getPreview(artikel)}</p>
          <Link href={`/artikel/${artikel.sys.id}`} style={{ color: 'var(--red)', fontWeight: 600, fontSize: 13 }}>
            Læs mere
          </Link>
        </figcaption>
        <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: 180 }}>
          <Image
            src={getImageUrl(artikel)}
            alt={artikel.fields.overskrift}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 550px"
          />
        </div>
      </figure>
    </article>
  );
}

function SideImageWideCard({ artikel, imageSide }: { artikel: Artikel; imageSide: 'left' | 'right' }) {
  const imageBlock = (
    <div style={{ position: 'relative', flex: '0 0 42%', minHeight: 200 }}>
      <Image
        src={getImageUrl(artikel)}
        alt={artikel.fields.overskrift}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, 480px"
      />
    </div>
  );

  const textBlock = (
    <figcaption style={{ flex: 1, padding: '14px 16px' }}>
      <h3 style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 8 }}>{artikel.fields.overskrift}</h3>
      <p style={{ fontSize: 12, color: 'var(--red)', marginBottom: 8 }}>
        {formatDato(artikel.fields.dato)} - af {artikel.fields.skribent}
      </p>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 12 }}>{getPreview(artikel)}</p>
      <Link href={`/artikel/${artikel.sys.id}`} style={{ color: 'var(--red)', fontWeight: 600, fontSize: 13 }}>
        Læs mere
      </Link>
    </figcaption>
  );

  return (
    <article style={{ background: '#fff' }}>
      <figure style={{
        margin: 0,
        display: 'flex',
        flexDirection: imageSide === 'left' ? 'row' : 'row-reverse',
        minHeight: 220,
      }} className="s3-wide-card">
        {imageBlock}
        {textBlock}
      </figure>
    </article>
  );
}

function SectionTwo({ items }: { items: Artikel[] }) {
  if (items.length === 0) return null;

  return (
    <section style={{ marginTop: 8 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 4,
          height: 600,
        }}
        className="s2-grid"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateRows: '2fr 1fr',
            gap: 4,
          }}
        >
          {items[0] && <BottomImageCard artikel={items[0]} />}
          {items[2] && <BottomImageCard artikel={items[2]} />}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 2fr',
            gap: 4,
          }}
        >
          {items[1] && <BottomImageCard artikel={items[1]} />}
          {items[3] && <BottomImageCard artikel={items[3]} />}
        </div>
      </div>
    </section>
  );
}

function SectionThree({ items }: { items: Artikel[] }) {
  if (items.length === 0) return null;

  return (
    <section style={{ marginTop: 8 }}>
      <div style={{ display: 'grid', gap: 4 }}>
        {items[0] && <SideImageWideCard artikel={items[0]} imageSide="left" />}
        {items[1] && <SideImageWideCard artikel={items[1]} imageSide="right" />}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }} className="s3-bottom-grid">
          {items[2] && <BottomImageCard artikel={items[2]} />}
          {items[3] && <BottomImageCard artikel={items[3]} />}
        </div>
      </div>
    </section>
  );
}

function buildPatternSections(artikler: Artikel[]) {
  const sections: Array<{ type: 'two' | 'three'; items: Artikel[] }> = [];
  let index = 1;
  let useTwo = true;

  while (index < artikler.length) {
    const items = artikler.slice(index, index + 4);
    sections.push({ type: useTwo ? 'two' : 'three', items });
    index += 4;
    useTwo = !useTwo;
  }

  return sections;
}

export default function ArtikelSektioner({ artikler }: { artikler: Artikel[] }) {
  if (!artikler.length) return null;

  const first = artikler[0];
  const sections = buildPatternSections(artikler);

  return (
    <>
      <HeaderArtikel artikel={first} />

      {sections.map((section, i) => (
        <div key={`${section.type}-${i}`}>
          {section.type === 'two' ? <SectionTwo items={section.items} /> : <SectionThree items={section.items} />}
        </div>
      ))}

      <style>{`
        @media (max-width: 900px) {
          .s3-wide-card {
            flex-direction: column !important;
          }
        }

        @media (max-width: 700px) {
          .s2-grid,
          .s3-bottom-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }

          .s2-grid > div {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </>
  );
}
