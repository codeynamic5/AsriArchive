# CLAUDE.md — Asri's Archive

## Project Context
**Asri's Archive** is a personal archive and portfolio web application. It is a digital lobby that organizes memories into four modules: **Travels**, **Gallery** (auto-sliding photo sets), **Cooking**, and **Asri's Book Club** (a personal library with notes).

The product is a highly personal, aesthetic-driven showcase, inspired by minimalist, photo-first, masonry-style layouts (reference: https://ellpha.tumblr.com/). Photos are the hero; keep chrome minimal.

This is a redesign of the live site (asriarchives.com, currently on Blogger). The full specification is in **`docs/spec.md`** (source: `asris-archive-spec.md`). Read it before starting any feature.

---

## Always Do First
- **Invoke the `frontend-design` skill and the `/ui-ux-pro-max` skill** before writing any frontend code, every session, no exceptions.
- **Read `docs/spec.md` and this file** for project specifications. If anything needs confirmation, ask me before building.
- Look at the design references in `docs/reference/` (lobby, menu, travels, country, location, gallery viewer, book club) before building a page.

---

## Decisions (confirmed, do not revisit without asking)
- Name the book module **Asri's Book Club** (not "Ayu's Bookclub").
- The photo module is **Gallery** (not "Exposures"). Sets of images **slide automatically**; clicking an image opens a viewer where the other images in the set can be browsed. Neighbouring slides peek at the edges.
- Book Club is **notes only**: no comments or discussion UI.
- Cooking is a **placeholder** for v1 (photo + notes content type, designed empty state).
- **English only** for v1.
- Travels hierarchy: **Country → Location → Item.** Each country has its own lobby of location cards. Each location page shows cards that are either a **single photo** or a **collection** (badge such as "3 photos"). Every location needs at least 5 images in total.
- Budapest and Prague are **locations** under Hungary and the Czech Republic (pending final confirmation, see `docs/spec.md` A1).
- Images are stored in the **CMS (managed storage)**, not hardcoded. Only dev placeholders live in `public/placeholders/`.

---

## Tech Stack (Non-Negotiable)
- **Framework:** Next.js 14, App Router, TypeScript (strict).
- **Styling & Animations:** Tailwind CSS + Framer Motion.
- **Content Management:** Sanity.io (headless rich text and media asset management; the owner uploads photos through the Studio).
- **Backend & Database:** Node.js custom services and Supabase (PostgreSQL), only for needs Sanity does not cover. Ask before adding any table or service.
- **Gallery carousel:** Embla Carousel (+ Autoplay plugin), as specified in `docs/spec.md`.
- **Hosting:** Vercel.

Do not introduce other libraries without explicit approval. If you think something is missing, say so and wait for confirmation.

---

## Project Structure
```text
/app
  /(lobby)/page.tsx                          — Lobby: wordmark + Enter
  /(lobby)/menu/page.tsx                     — Section picker (4 cards)
  /(modules)/travels/page.tsx                — Travels module (countries grid)
  /(modules)/travels/[country]/page.tsx      — Country lobby (location cards)
  /(modules)/travels/[country]/[location]/page.tsx — Location page (photo + collection cards)
  /(modules)/gallery/page.tsx                — Gallery: auto-sliding sets + viewer
  /(modules)/cooking/page.tsx                — Recipe cards and cooking logs (placeholder)
  /(modules)/book-club/page.tsx              — Asri's Book Club (current book + past reads)
  /(modules)/book-club/[book]/page.tsx       — Book detail with notes
/components
  /ui                          — Base UI primitives (do not modify)
  /gallery                     — MasonryGrid.tsx, Slideshow.tsx, PhotoCard.tsx, CollectionCard.tsx, Viewer.tsx
  /shared                      — Navbar.tsx, Footer.tsx, PageTransition.tsx
/lib
  sanity.ts                    — Sanity client configuration
  supabase.ts                  — Supabase client (browser + server)
  utils.ts                     — formatDate(), class merging, etc.
  types.ts                     — All TypeScript types (generated from CMS/DB schema)
/sanity                        — Studio config + schemas
/scripts                       — migrate-blogger.ts, strip-exif.ts, verify-exif.ts
/docs
  spec.md                      — Full specification
  reference/                   — Design screenshots
/public/placeholders           — Dev-only placeholder images
```

---

## Content Rules
- Content model: `country → location → items (photoItem | collection)`; plus `gallerySet`, `book`, `cookingEntry`, `siteSettings` (see `docs/spec.md` section 8).
- **Alt text is required** on every photo.
- **Privacy:** published images must contain **no GPS/EXIF data**. Never select, return, or render `privateCoords` in any public query or component. Show only the manually written public place label.
- The public site is read-only. The Studio is private to the owner.

---

## Design Rules
- Use the design tokens from `docs/spec.md` section 6 (blue-grey `#C5D1D8`, charcoal `#333`, light grey `#F1F1F1`, dusty-rose cards). Do not hardcode colours that duplicate a token.
- Bold serif for headings, nav, and wordmark; clean sans for captions and body.
- Honour `prefers-reduced-motion` (no autoplay or large transitions when set).
- Autoplay must pause on hover, focus, touch, and when the tab is hidden, and have a visible pause control.
- Centre card grids, including a partly filled last row.
- Accessibility target is WCAG 2.2 AA: keyboard operation for nav, carousel, and viewer; focus trap in the viewer.
- Performance: reserve image aspect ratios, lazy-load below the fold, only the first visible image is `priority`.

---

## Git Workflow
- `main` is production. Never commit to it directly.
- `v2` is the integration branch for the rebuild.
- Create feature branches off `v2`: `feat/shell`, `feat/gallery` (includes the Viewer), `feat/travels`, `feat/book-club`, `feat/migration`.
- Build `feat/shell` (tokens, layout, nav) first and merge it before starting other features.
- Open a pull request for each feature; Vercel preview deployments are used for review.
- Keep branches short-lived and merge often.

---

## Working Style
- Implement one feature at a time, following the matching section of `docs/spec.md`.
- State briefly what you are about to build, then build it. Ask only when the spec is silent or contradictory.
- Run lint, type-check, and tests before saying a task is done.
- Do not modify `/components/ui` primitives.
