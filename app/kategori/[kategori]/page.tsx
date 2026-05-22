import { getArtikler } from '@/lib/contentful';
import { KATEGORIER } from '@/lib/kategorier';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtikelSektioner from '@/components/ArtikelSektioner';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  return KATEGORIER.filter(k => k !== 'Alle').map(k => ({
    kategori: k.toLowerCase(),
  }));
}

export default async function KategoriSide({ params }: { params: { kategori: string } }) {
  const navn = KATEGORIER.find(k => k.toLowerCase() === params.kategori);
  if (!navn) notFound();

  const artikler = await getArtikler(navn);

  return (
    <>
      <Navbar aktivKategori={navn} />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        {artikler.length === 0 ? (
          <p style={{ textAlign: 'center', padding: 64, color: '#888' }}>
            Ingen artikler i denne kategori endnu.
          </p>
        ) : (
          <ArtikelSektioner artikler={artikler} />
        )}
      </main>

      <Footer />
    </>
  );
}
