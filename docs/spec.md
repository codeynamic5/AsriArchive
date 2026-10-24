# Asri's Archive — Website Specification & Tech Stack

Version 1.0 · 24 Oct 2026 · Status: ready for scaffolding

A redesign of the existing travel/photo blog (asriarchives.com, currently on Blogger) into a multi-section, photo-first website with a lobby entry, a section menu, and four sections: **Travels, Gallery, Cooking, Asri's Book Club**.

---

## 1. Goals

1. Document trips from around the world through photos, organised by country.
2. Keep the calm, personal identity of the first version (blue-grey lobby, bold serif wordmark, pill "Enter").
3. Make photos the hero: fast, sharp, and presented like a gallery (auto-sliding, click to explore).
4. Be easy to update: Asri adds photos and notes through a CMS, with no code deploys.
5. Protect privacy: no GPS metadata leaks from published photos.
6. Preserve existing search traffic by migrating Blogger content and redirecting old URLs.

**Non-goals (v1):** user accounts, public comments, multi-language, e-commerce, recipes with full structure.

---

## 2. Decisions Log (confirmed with owner)

| # | Topic | Decision |
|---|---|---|
| 1 | Book Club name | **Asri's Book Club** (replaces "Ayu's Bookclub") |
| 2 | "Exposures" | Renamed to **Gallery**. Groups of images that auto-slide; clicking a photo opens a viewer where the other images in the set can be browsed |
| 3 | Book Club | **Notes only**, no public comments or discussion |
| 4 | Cooking | **Placeholder** for v1, photos and notes only |
| 5 | Content migration | **Yes**, import existing Blogger Travel posts; **minimum 5 images per location** |
| 6 | Language | **English only** |
| 7 | Photo privacy | **Strip GPS/EXIF** from published images; location shown via a manually written place label |
| 8 | Next step | This spec document, then scaffold |
| 9 | Travels hierarchy | **Country → Location → Item.** Each country has its own "lobby" page of location cards. Each location has its own page of cards, where an item is either a single photo or a **collection** of photos (badge shows count, e.g. "3 photos") |
| 10 | Image storage | **Managed CMS storage** (owner uploads through the Studio); hardcoded images only as dev placeholders. See 9b |

### Assumptions to confirm (flagged, not yet answered)

- **A1 — Cities vs. countries (resolved by Decision 9):** the v1 index lists *Budapest* and *Prague* beside countries. Under the confirmed hierarchy they become **locations**: Budapest under Hungary, Prague under the Czech Republic. "Bosnia" is displayed as "Bosnia and Herzegovina". Please confirm this regrouping is what you want.
- **A2 — Location vs. privacy (Decision 7):** the owner wants to know where photos were taken *and* wants GPS stripped. Resolved as: GPS is stripped from every public file; the CMS stores an optional **private coordinate** (never published) and a **public place label** (e.g. "Merton College, Oxford") that is shown in captions. Confirm this matches intent.
- **A3 — UK photos:** the sample Gallery and Book Club images appear to be from Oxford/Cambridge. If those are real content, a **United Kingdom** country entry should be added.
- **A4 — Blogger access:** the live site blocks automated crawling, so the import will use a **Blogger Takeout/export XML** (or Blogger API with Asri's credentials), not scraping.

---

## 3. Site Map & Routes

```
/                       Lobby (wordmark + Enter)
/menu                   Section picker (4 cards)
/travels                Country index
/travels/[country]              Country lobby: location cards
/travels/[country]/[location]   Location page: cards for single photos and collections
                                (a collection opens in the Viewer; deep link ?c=<collection>&p=<n>)
/gallery                Gallery sets (auto-sliding)
/gallery/[set]          Single set (optional deep link; also opens in viewer)
/cooking                Placeholder
/book-club              Current book + past reads (notes)
/book-club/[book]       Book detail with notes
/about                  (optional, footer link)
/sitemap.xml  /robots.txt  /404
```

**Navigation model**

- Lobby → click **Enter** → Menu (animated transition).
- Every inner page has a persistent top nav: **Lobby · Travels · Gallery · Cooking · Book Club**, with an active-state indicator.
- Mobile: nav collapses to a menu button; all tap targets at least 44×44 px.
- The wordmark in the nav links to the Lobby.

---

## 4. Page Specifications

### 4.1 Lobby `/`
- Full-viewport blue-grey background. Centered wordmark **"Asri's Archive"** (bold serif, fluid size via `clamp()`), pill-shaped **Enter** button below.
- Enter is a real `<a>`/`<button>` with visible focus ring. Pressing Enter or Space on the keyboard activates it.
- Transition to `/menu`: fade/scale, 400–600 ms; disabled under `prefers-reduced-motion`.
- Optional: remember that a visitor has seen the lobby (`sessionStorage`) and offer a "Skip" for returning visitors. Never block direct deep links.

### 4.2 Menu `/menu`
- Four cards in a **centered 2×2 grid** (1 column on mobile), equal sizing, tight consistent gaps (fixes the v1 dead space between rows).
- Each card: section title (serif) over a **cover photo** chosen from that section, replacing the grey placeholder boxes. Dusty-rose card surface and border from v1 are kept as the fallback when no cover photo exists.
- Hover/focus: gentle lift and cover zoom (≤ 1.03).
- Cards: Travels, Gallery, Cooking, Asri's Book Club.

### 4.3 Travels `/travels`
- Heading "Travels". Responsive grid (3 columns desktop, 2 tablet, 1 mobile) of countries in alphabetical order.
- Each country tile: cover photo, name, and photo count. Hover reveals a short line (e.g. cities visited).
- Seed countries from v1: Austria, Bosnia and Herzegovina, Croatia, Czech Republic (Prague), Egypt, Germany, Greece, Hungary (Budapest), Indonesia, Italy, South Korea, Netherlands, Serbia, Spain, Turkey. (See A1, A3.)

### 4.4 Country lobby `/travels/[country]`
- Each country has its own lobby, as in the "USA" mockup: centered H1 with the country name, then a grid of **location cards**.
- Location card: cover photo on top, location name below on a white rounded card (soft shadow) over the light-grey page. Grid is 3 columns desktop, 2 tablet, 1 mobile.
- Last-row cards should be **centered** (the mockup left-aligns the orphan card).
- Whole card is a link, with hover lift and a visible focus state.
- Example (USA): New York, Los Angeles, Chicago, Miami, San Francisco.

### 4.4b Location page `/travels/[country]/[location]`
- Centered H1 with the location name, then a **card grid** (as in the "New York" mockup). Cards have varying heights, so use a masonry layout (CSS columns or a masonry grid), not a fixed row height.
- Two card types:
  - **Photo card:** image plus a short caption beneath (e.g. "matcha blue"). Click opens the Viewer on that single image.
  - **Collection card:** cover image, a dark pill badge in the top-right showing the count (e.g. "3 photos"), and a caption beneath (title + date, e.g. "newyork Collection 7/29/2025"). Click opens the Viewer on the collection, where its photos are browsed.
- Cards are lazy-loaded with reserved aspect ratios; captions may show the **public place label** and date.
- Order: newest first by default, with an optional manual order field.
- Keep the grid centered and consistent with the country lobby (the mockup's New York grid is left-aligned and wider).
- **Content floor:** each location has at least 5 images in total (counting photos inside collections) at launch (seed or imported).
- **Cover for each country/location card** is chosen in the CMS, falling back to the first photo.

### 4.5 Gallery `/gallery`
- Concept: a few images gathered into a set, shown like a gallery. The set **slides automatically** so visitors witness the other images without interacting.
- Layout reference (from owner's screenshots): a large centered active image with the adjacent images **peeking** at the left and right edges, over a dark, dimmed backdrop. Framed single-photo posts (white border, soft shadow) are the closed state before opening.
- Behaviour:
  - Autoplay advances every ~4 s; pauses on hover, focus, touch, or when the tab is hidden.
  - Visible prev/next buttons, swipe on touch, arrow keys on keyboard, and a pause/play control.
  - **Click an image → opens the Viewer** on that image, where the other images in the set can be browsed.
  - Autoplay is off by default for `prefers-reduced-motion`.
- Multiple sets on the page, each titled, stacked vertically.

### 4.6 Cooking `/cooking` (placeholder)
- Heading, short "coming soon" note, and a designed empty state with a photo and notes block. Content type is built (photo + notes) so entries can be added without redesign.

### 4.7 Asri's Book Club `/book-club`
- **Current book** hero card: cover (or placeholder), title, author, status badge (*Reading / Finished / Up next*), and Asri's notes.
- **Past reads** list below. Each links to a detail page with longer notes.
- No comments, no discussion box. (Remove the "Discussion" section from v1.)
- Fix v1 alignment: cover and text share a consistent layout (cover left, text right on desktop; stacked on mobile).

---

## 5. Key Components

### 5.1 Viewer (lightbox / carousel)
- Opens from any photo in Travels or Gallery. Dark backdrop (~90% opacity), centered image, neighbours peeking, caption below (place label, date).
- Controls: close (Esc), prev/next (arrows, swipe), thumbnail strip, optional zoom, optional autoplay (Gallery only).
- Accessibility: focus trap, `aria-modal`, return focus to the trigger on close, alt text announced, body scroll locked.
- Deep-linkable via `?photo=<id>` so a specific photo can be shared.

### 5.2 Photo
- Wrapper around `next/image`: responsive `sizes`, AVIF/WebP, blur-up placeholder (LQIP), reserved aspect ratio, required `alt`.

### 5.3 Top Nav
- Sticky, subtle shadow, active-link indicator, mobile menu, skip-to-content link.

### 5.4 Cards, Buttons, Badges
- Pill button (Enter), section card (Menu), country tile, **location card** (cover + name), **photo card** (image + caption), **collection card** (image + count badge + caption), book status badge. All share design tokens: white card surface, 16–24 px radius, soft shadow.

---

## 6. Design System

### 6.1 Colour tokens (approximated from v1 mockups; verify with eyedropper)

| Token | Value | Use |
|---|---|---|
| `--bg-lobby` | `#C5D1D8` | Lobby, Menu, Gallery, Book Club backgrounds |
| `--bg-surface` | `#F1F1F1` | Light content pages (Travels, Cooking) |
| `--bg-nav` | `#F6F7F9` | Top nav |
| `--text` | `#333333` | Headings and body |
| `--text-muted` | `#666666` | Captions and metadata |
| `--card-rose` | `#D0C4C2` | Menu card surface |
| `--card-rose-border` | `#B58B8B` | Menu card border |
| `--viewer-bg` | `rgba(18,18,18,.92)` | Lightbox backdrop |

**Recommendation:** unify the page background. v1 mixes `#C5D1D8` and `#F1F1F1`. Use `--bg-lobby` everywhere except the Viewer, or define two deliberate themes. Decide in design review.
Dark mode: out of scope for v1 (the Viewer is already dark).

### 6.2 Typography
- **Headings, nav, wordmark:** bold serif in the spirit of v1's Times-style (e.g. a modern text serif such as *Newsreader* or *Libre Baskerville*; fall back to `Georgia, 'Times New Roman', serif`).
- **Body, captions, UI text:** clean sans (e.g. *Inter*), so captions stay legible on photos.
- Fluid type scale using `clamp()`; wordmark and page H1 scale from ~40 px (mobile) to ~96 px (desktop).
- Line length for notes: 60–75 characters.

### 6.3 Spacing, shape, motion
- 8 px spacing scale. Radii: cards 16–24 px, pill 999 px, photos 4–8 px.
- Motion: 200–500 ms ease-out; always honour `prefers-reduced-motion`.

### 6.4 UX principles
- Photos first, with minimal chrome and generous whitespace.
- One clear choice per screen in the lobby and menu.
- Consistent wayfinding: nav everywhere, active state, no dead ends.
- Performance is UX: reserve space to avoid layout shift, lazy-load below the fold.
- Mobile first: most viewing happens on phones.

---

## 7. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Static generation + ISR, server components, great image handling |
| Styling | **Tailwind CSS** + CSS variables for tokens | Tokens in section 6 map to Tailwind theme |
| Motion | **Framer Motion** | Lobby→Menu transition, card hover, page fades |
| Carousel / Gallery | **Embla Carousel** + Autoplay plugin | Lightweight, touch-friendly, peeking slides, controllable autoplay |
| Viewer | Custom on Embla, or **yet-another-react-lightbox** (Slideshow, Thumbnails, Zoom plugins) | Choose during build; custom gives exact "peeking" look |
| CMS | **Sanity** (alternative: Payload CMS if self-hosting preferred) | Studio for uploading photos and writing notes |
| Images | **Sanity image CDN** or **Cloudinary**, via `next/image` | AVIF/WebP, responsive, LQIP |
| Hosting | **Vercel** | Domain `asriarchives.com` pointed via DNS |
| Analytics | **Plausible** or Vercel Analytics | Privacy-friendly |
| Quality | ESLint, Prettier, TypeScript strict, Playwright (smoke + a11y with axe), Lighthouse CI | |
| Package manager | pnpm | |

**Optional later:** MapLibre world map using public place labels (not exact coordinates).

---

## 8. Content Model (Sanity)

```ts
// country
{ name: string, slug: slug, cover: image, summary?: text,
  order?: number }

// location  (a city/place within a country; has its own page)
{ name: string, slug: slug, country: ref(country), cover?: image,
  summary?: text, order?: number,
  items: array(photoItem | collection) }   // at least 5 images in total for launch

// photoItem  (a single photo card)
{ photo: photo, title?: string, date?: date }

// collection  (a card that groups several photos; shows "N photos" badge)
{ title: string, slug: slug, date?: date, cover?: image,
  photos: array(photo) }                   // cover falls back to first photo

// photo (object)
{ image: image (hotspot), alt: string (required), caption?: string,
  placeLabel?: string,              // PUBLIC, shown on site
  privateCoords?: geopoint,         // PRIVATE, never exposed to the frontend
  takenAt?: datetime }

// gallerySet
{ title: string, slug: slug, photos: array(photo), autoplayMs?: number }

// book
{ title: string, author: string, cover?: image,
  status: 'reading' | 'finished' | 'up-next',
  notes?: portableText, finishedAt?: date }

// cookingEntry (placeholder content type)
{ title: string, photo?: image, notes?: portableText, date?: date }

// siteSettings
{ lobbyTitle, menuCovers: { travels, gallery, cooking, bookClub }: image }
```

Validation rules: `alt` required on every photo; `slug` unique; trips warn when they have fewer than 5 photos.
`privateCoords` is excluded from all public queries (GROQ projections never select it).

---

## 9. Image Pipeline & Privacy
*(See 9b for where images are stored and who uploads them.)*

1. Upload originals through Sanity Studio.
2. **EXIF/GPS stripping:** all *delivered* derivatives must contain no GPS or personal metadata. Either rely on the CDN's metadata stripping (verify) or run originals through a `sharp` step that removes EXIF before storage.
3. Before upload, optionally read EXIF GPS locally (script) to pre-fill `privateCoords` and suggest a `placeLabel`; Asri edits the label.
4. **Verification:** a CI/script check runs `exiftool` on a sample of published URLs and fails if any GPS tags are present.
5. Delivery: AVIF/WebP, widths 480 / 768 / 1280 / 1920 / 2560 for full-bleed viewing, quality ~75–80, LQIP blur placeholders.
6. Store originals privately; only derivatives are public.

---

## 9b. Content Storage Strategy

**Decision (10): use managed storage via the CMS, not hardcoded images.**

**Why**
- The owner uploads and edits photos directly in the browser (Sanity Studio), with no commit or redeploy for new content.
- Full-size photos would bloat the git repo, slow clones, and make builds heavier.
- GPS/EXIF stripping and the hidden `privateCoords` are enforced in one pipeline rather than by hand per file.
- The image CDN produces AVIF/WebP, responsive sizes, and blur placeholders automatically.
- Content (captions, order, covers) changes without touching code.

**Rules**
- All production photos live in the CMS asset store and are delivered through the image CDN via `next/image`.
- The Studio is private (owner login only). The public site is read-only.
- Only **placeholder/seed images** live in the repo, under `public/placeholders/`, for development, tests, and Storybook-style previews. Remove or ignore them in production data.
- Keep **original, full-resolution photos backed up separately** (e.g. a cloud drive folder). The CMS is the publishing copy, not the only archive.
- Back up the CMS dataset periodically (`sanity dataset export`), and keep the export outside the repo.
- Before launch, check the current free-tier limits for storage and bandwidth, and set up usage alerts.

**Upload workflow (owner)**
1. Open the Studio → choose Country → Location.
2. Add a **photo item** or a **collection**, then drop in images.
3. Fill in alt text (required), optional caption and public place label.
4. Publish. The site updates through on-demand revalidation (section 15).

---

## 10. Content Migration (Blogger → New Site)

1. Export Blogger content (Takeout XML) or use the Blogger API with Asri's account (the live site blocks scraping).
2. Script parses posts labeled **Travel**, extracts title, date, text, and image URLs.
3. Map each post to Country → Trip using labels/titles; flag unmapped posts for manual review.
4. Download images, strip EXIF, and upload to the CDN. Create `photo` entries with alt text (placeholder alt for review).
5. **Content floor:** ensure each country has at least **5 photos**; list shortfalls in a migration report.
6. **Redirects:** build a map of old Blogger URLs (`/YYYY/MM/slug.html`, `/search/label/Travel`) → new routes using permanent 301s in `next.config`.
7. Keep Blogger live until DNS cutover; then point `asriarchives.com` to Vercel.

---

## 11. SEO & Sharing

- Per-page `<title>` and meta description; canonical URLs.
- Open Graph / Twitter cards, with a per-country cover image.
- `sitemap.xml`, `robots.txt`, semantic headings, descriptive alt text.
- Structured data: `ImageGallery` on country pages, `Book` on book pages.
- Clean, human-readable slugs.

---

## 12. Accessibility (WCAG 2.2 AA)

- Colour contrast at least 4.5:1 for text (verify the `#333` on `#C5D1D8` pairing and muted text).
- Full keyboard operation of nav, carousel, and viewer; visible focus states.
- Alt text on every image; decorative images use empty alt.
- Autoplay can be paused; respects `prefers-reduced-motion`.
- Landmarks, skip link, correct heading order.
- Automated axe checks in Playwright; manual screen-reader pass before launch.

---

## 13. Performance Budgets

- LCP ≤ 2.5 s on mid-range mobile; CLS ≤ 0.1; INP ≤ 200 ms.
- Initial JS ≤ ~150 KB gzipped on the lobby and menu.
- Only the first visible image is `priority`; everything else lazy-loads.
- Lighthouse CI thresholds: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

---

## 14. Suggested Project Structure

```
asris-archive/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                      # Lobby
│  ├─ menu/page.tsx
│  ├─ travels/page.tsx
│  ├─ travels/[country]/page.tsx
│  ├─ travels/[country]/[location]/page.tsx
│  ├─ gallery/page.tsx
│  ├─ cooking/page.tsx
│  ├─ book-club/page.tsx
│  ├─ book-club/[book]/page.tsx
│  ├─ sitemap.ts  robots.ts  not-found.tsx
├─ components/
│  ├─ nav/  lobby/  menu/  travels/  gallery/  viewer/  book/  ui/
├─ lib/        # sanity client, GROQ queries, image helpers, redirects
├─ sanity/     # studio config + schemas
├─ scripts/    # migrate-blogger.ts, strip-exif.ts, verify-exif.ts
├─ styles/     # tokens.css, globals.css
├─ tests/      # playwright specs
└─ public/
```

---

## 15. Environment & Deployment

- Env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, optional `CLOUDINARY_*`.
- Content updates trigger on-demand revalidation via a Sanity webhook.
- Preview deployments on every pull request; production from `main`.
- DNS: apex and `www` to Vercel; HTTPS automatic.

---

## 16. Milestones

| Phase | Scope | Output |
|---|---|---|
| 0. Setup | Repo, Next.js, Tailwind, tokens, CI, Sanity project | Running skeleton |
| 1. Shell | Lobby, Menu, Nav, 404, transitions | Navigable flow with sample data |
| 2. Travels | Country index, country and trip pages, Photo component | Seeded pages (≥ 5 photos/country) |
| 3. Viewer + Gallery | Embla carousel, autoplay, peeking, lightbox, deep links | Gallery section live |
| 4. Book Club + Cooking | Book cards and notes, cooking placeholder | All four sections present |
| 5. Migration | Blogger import, EXIF strip, redirect map, migration report | Real content in place |
| 6. Polish & launch | A11y, performance, SEO, analytics, DNS cutover | Production release |

---

## 17. Acceptance Criteria (v1)

- [ ] Lobby → Enter → Menu → each section works on desktop and mobile.
- [ ] Menu shows four cards with cover photos; the layout is centered and evenly spaced.
- [ ] Travels lists all countries; each country opens its own lobby of location cards.
- [ ] Each location page shows photo cards and collection cards (with "N photos" badge); each location has at least 5 images in total.
- [ ] Clicking a collection opens the Viewer on that collection; clicking a photo card opens that photo.
- [ ] Gallery sets auto-slide, pause on interaction, and show peeking neighbours.
- [ ] Clicking a photo opens the Viewer; the other images in the set are browsable (arrows, swipe, thumbnails, keyboard).
- [ ] Book Club shows current book + past reads with notes only; no comment UI.
- [ ] Cooking shows a designed placeholder with photo and notes support.
- [ ] No GPS/EXIF present in any published image (automated check passes).
- [ ] Old Blogger URLs 301-redirect to new pages.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- [ ] Axe reports no critical or serious violations; keyboard-only walkthrough passes.
- [ ] English only; all page titles and alt text present.

---

## 18. Open Items

1. Confirm **A1** (Budapest and Prague regrouped as locations under Hungary and the Czech Republic) and add a UK entry if needed (**A3**). The USA/New York mockups use placeholder photos that look like Oxford/Cambridge.
   Also: the nav in the mockups still says "Exposures"; the build uses **Gallery**.
2. Confirm **A2** (public place label shown, private coordinates hidden).
3. Provide Blogger export or API access (**A4**), plus any must-keep posts.
4. Choose final feed layout (single-column vs masonry) after first design review.
5. Choose final serif/sans pairing and unify background colours (section 6).
6. Decide whether to add an About page and a world map in v1.1.
