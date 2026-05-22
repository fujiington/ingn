import { getArtikler } from '@/lib/contentful';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtikelSektioner from '@/components/ArtikelSektioner';

export const revalidate = 60;

export default async function Home() {
  const artikler = await getArtikler();

  return (
    <>
      <Navbar aktivKategori="Alle" />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        <ArtikelSektioner artikler={artikler} />
      </main>

      <Footer />
    </>
  );
}
