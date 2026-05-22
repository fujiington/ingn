import { getArtikel, getArtikler } from '@/lib/contentful';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const artikler = await getArtikler();
  return artikler.map((a) => ({ id: a.sys.id }));
}

function formatDato(dato: string) {
  const d = new Date(dato);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `D. ${dd}/${mm}-${yyyy}`;
}

export default async function ArtikelSide({ params }: { params: { id: string } }) {
  let artikel;
  try {
    artikel = await getArtikel(params.id);
  } catch {
    notFound();
  }

  const { overskrift, dato, skribent, billede, indhold } = artikel.fields;
  const billedeUrl = billede?.fields?.file?.url
    ? `https:${billede.fields.file.url}`
    : null;

  const afsnit = indhold?.split('\n').filter(Boolean) ?? [];

  return (
    <>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Hero image */}
        {billedeUrl && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', overflow: 'hidden' }}>
            <Image
              src={billedeUrl}
              alt={overskrift}
              fill
              style={{ objectFit: 'cover' }}
              sizes="1100px"
              priority
            />
          </div>
        )}

        {/* Article content */}
        <div style={{
          background: '#fff',
          padding: '32px 16px 48px',
          maxWidth: 800,
          margin: '0 auto',
        }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: 10,
          }}>
            {overskrift}
          </h1>

          <p style={{ fontSize: 13, color: 'var(--red)', marginBottom: 24 }}>
            {formatDato(dato)} - af {skribent}
          </p>

          <div style={{ fontSize: 16, lineHeight: 1.75, color: '#222' }}>
            {afsnit.map((afsnit, i) => (
              <p key={i} style={{ marginBottom: 16 }}>{afsnit}</p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
