import { createClient } from 'contentful';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    'Missing Contentful env vars. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local.'
  );
}

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const CONTENTFUL_ARTIKEL_CONTENT_TYPE = process.env.CONTENTFUL_ARTIKEL_CONTENT_TYPE || 'artikel';

export interface ArtikelFields {
  overskrift: string;
  dato: string;
  skribent: string;
  billede?: {
    fields?: {
      file?: {
        url?: string;
        details?: { image?: { width: number; height: number } };
      };
      title?: string;
    };
  };
  indhold: string;
  kategori: string;
  resume?: string;
}

function toPlainArtikel(entry: any): Artikel {
  const fields = entry?.fields ?? {};

  return {
    sys: {
      id: String(entry?.sys?.id ?? ''),
    },
    fields: {
      overskrift: String(fields.overskrift ?? ''),
      dato: String(fields.dato ?? entry?.sys?.createdAt ?? ''),
      skribent: String(fields.skribent ?? ''),
      billede: fields.billede
        ? {
            fields: {
              file: {
                url: fields.billede?.fields?.file?.url,
                details: {
                  image: {
                    width: Number(fields.billede?.fields?.file?.details?.image?.width ?? 0),
                    height: Number(fields.billede?.fields?.file?.details?.image?.height ?? 0),
                  },
                },
              },
              title: fields.billede?.fields?.title,
            },
          }
        : undefined,
      indhold: String(fields.indhold ?? ''),
      kategori: String(fields.kategori ?? ''),
      resume: fields.resume ? String(fields.resume) : undefined,
    },
  };
}

export interface Artikel {
  sys: { id: string };
  fields: ArtikelFields;
}

export async function getArtikler(kategori?: string): Promise<Artikel[]> {
  const query: Record<string, unknown> = {
    content_type: CONTENTFUL_ARTIKEL_CONTENT_TYPE,
    order: ['-sys.createdAt'],
    limit: 50,
  };

  if (kategori && kategori !== 'Alle') {
    query['fields.kategori'] = kategori;
  }

  try {
    const response = await client.getEntries(query as Record<string, unknown>);
    return response.items.map((item) => toPlainArtikel(item));
  } catch (error: unknown) {
    const maybeError = error as {
      details?: { errors?: Array<{ name?: string }> };
      message?: string;
    };

    const isUnknownContentType = maybeError?.details?.errors?.some(
      (err) => err?.name === 'unknownContentType'
    );

    if (isUnknownContentType) {
      throw new Error(
        `Ugyldigt Contentful content type: "${CONTENTFUL_ARTIKEL_CONTENT_TYPE}". ` +
          'Sæt CONTENTFUL_ARTIKEL_CONTENT_TYPE i .env.local til dit rigtige Content Type ID.'
      );
    }

    throw error;
  }
}

export async function getArtikel(id: string): Promise<Artikel> {
  const entry = await client.getEntry(id);
  return toPlainArtikel(entry);
}
