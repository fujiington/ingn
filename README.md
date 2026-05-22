# INGN Nyheder

Et Next.js nyhedssite med Contentful som headless CMS.

## Teknologier

- **Next.js 14** (App Router)
- **TypeScript**
- **Contentful** (Headless CMS)
- Fonte: Righteous + Roboto Flex (Google Fonts)

---

## Opsætning

### 1. Installer afhængigheder

```bash
npm install
```

### 2. Opret Contentful Content Model

Log ind på [app.contentful.com](https://app.contentful.com) og opret en ny Content Type kaldet **`artikel`** med følgende felter:

| Felt-ID     | Visningsnavn | Type              | Påkrævet |
|-------------|--------------|-------------------|----------|
| `overskrift`| Overskrift   | Short text        | ✅       |
| `dato`      | Dato         | Date & time       | ✅       |
| `skribent`  | Skribent     | Short text        | ✅       |
| `billede`   | Billede      | Media (one file)  | ✅       |
| `indhold`   | Indhold      | Long text         | ✅       |
| `kategori`  | Kategori     | Short text        | ✅       |
| `resume`    | Resume       | Short text        | ❌       |

**Kategori-værdier** (brug præcis disse):
`Indland`, `Udland`, `Teknologi`, `Sport`, `Politik`, `Samfund`

> Tip: Sæt `resume` som et kort uddrag (max 150 tegn) der vises på forsiden. Hvis tomt bruges starten af `indhold`.

### 3. Opret .env.local

Kopiér eksempel-filen og udfyld dine Contentful-nøgler:

```bash
cp .env.local.example .env.local
```

Find dine nøgler under:
**Settings → API Keys** i dit Contentful space

```env
CONTENTFUL_SPACE_ID=xxxxxxxxxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# Valgfri hvis dit Content Type ID ikke hedder "artikel"
CONTENTFUL_ARTIKEL_CONTENT_TYPE=artikel
```

### 4. Tilføj mindst 9 artikler i Contentful

For hvert artikel: udfyld alle felter og upload et billede.

### 5. Start udviklerserveren

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000)

---

## Sider

| URL                        | Beskrivelse                      |
|----------------------------|----------------------------------|
| `/`                        | Forside med alle artikler        |
| `/kategori/indland`        | Filtreret visning pr. kategori   |
| `/artikel/[id]`            | Fuld artikel-visning             |
| `/login`                   | Login-side                       |

---

## Deploy (Vercel)

```bash
npm install -g vercel
vercel
```

Husk at tilføje miljøvariablerne (`CONTENTFUL_SPACE_ID` og `CONTENTFUL_ACCESS_TOKEN`) i Vercel's dashboard under **Settings → Environment Variables**.

---

## Design-specifikationer

- **Farver:** `#F6F3F3` (baggrund), `#C52525` (rød accent), `#000000` (tekst), `#FFFFFF` (kort)
- **Fonte:** Righteous (logo/display), Roboto Flex (brødtekst)
- **Ikoner:** SVG inline (FontAwesome-inspireret)
