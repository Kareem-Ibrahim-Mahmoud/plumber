# SEO Implementation — Sahhi Kuwait

**Site:** https://plumber-in-kuwait.vercel.app
**Implementation date:** 2026-10-28
**Stack:** React 19.1.0 + Vite 7.3.6 + Tailwind CSS 4.1.11 + framer-motion (CSR, single-page application)
**Production deployment:** Vercel (project `plumber-in-kuwait`)

---

## 1. Rendering decision

The application is a client-side rendered single-page app (Vite + React). All public content lives on one URL (`/`); sections are hash fragments (`#services`, `#work`, etc.).

- **No SSR/SSG was added.** Rationale: Vite has no official React SSR plugin in this project; the homepage's entire SEO metadata block (title, description, canonical, robots, Open Graph, Twitter, JSON-LD) exists in the initial static HTML (`index.html`); migrating to SSR would risk framer-motion animation/layout hydration mismatches and contradicts the rule to avoid unnecessary architectural changes.
- Googlebot renders JavaScript, so section content is indexable after render. This was accepted as a documented trade-off (see `SEO_AUDIT.md`, P2-3).

---

## 2. Changed files

| File | Change | Phase | Priority |
|---|---|---|---|
| `index.html` (root, Vite entry) | Replaced invalid `@type: "Plumber"` JSON-LD with valid `@type: "LocalBusiness"` (verified values only: name, telephone, opening hours, areaServed cities, sameAs, hasOfferCatalog of Service offers) | Technical SEO / Structured data | P0 |
| `index.html` | Removed `priceRange: "KWD"` (currency code is not a price range; no verified pricing exists on the site) | Structured data | P0 |
| `index.html` | Added `@type: "WebPage"` JSON-LD block (url, name, description, isPartOf → WebSite, inLanguage ar-KW) | Structured data | P1 |
| `index.html` | Confirmed retained: unique title, meta description, absolute canonical, `robots: index, follow`, `lang="ar"`/`dir="rtl"`, `geo.region=KW`, `geo.placename=Kuwait`, Open Graph (locale ar_KW, type website, site_name, url, title, description, image + image:alt), Twitter card summary_large_image, theme-color, favicon, font preconnects, hero image preload with `fetchPriority="high"` | Metadata | Verified (no change needed) |
| `src/components/Hero.jsx` | Added `sizes="(max-width: 768px) 100vw, 560px"` to the LCP hero image; retained `width="1200" height="900" loading="eager" decoding="async" fetchPriority="high"` | Images / Performance | P1 |
| `public/404.html` | New custom 404 page (Arabic, branded, `noindex nofollow`, CTA call + link to homepage) | Index control | P0 |
| `public/sitemap.xml` | Added `lastmod: 2026-10-28`; single URL (homepage) — correct for a one-page site | Sitemaps | P1 |
| `vercel.json` | New: cache headers — `/assets/*` immutable 1 year (hashed Vite assets), `/images/*` 1 year, `/favicon.svg` 1 year, `robots.txt|sitemap.xml|404.html` 10 min must-revalidate | Performance / Infrastructure | P2 |
| `public/robots.txt` | Reviewed — already correct (`Allow: /`, sitemap reference); no change | Index control | Verified |

No existing functionality, routing, authentication, API integrations, or business logic was modified. No dependencies were added.

---

## 3. Structured data decisions (final, in `index.html`)

1. **LocalBusiness** (`#business`) — the business genuinely qualifies: 24h plumbing service in Kuwait. Includes only verified values from `src/data/content.js` (telephone +96566115976, opening hours 24/7, areaServed Kuwait + cities, OfferCatalog of 7 actual services). `priceRange` removed (unverified). No address invented. No ratings/reviews fabricated.
2. **WebPage** (`#webpage`) — describes the homepage; `isPartOf` points to WebSite.
3. **WebSite** (`#website`) — site-level identity with `inLanguage: ar-KW`.

Not implemented and why:
- `LocalBusiness.address` / `hasMap`: no physical address verified in the codebase (rule: do not invent addresses).
- `aggregateRating` / `Review`: no reviews exist (rule: do not fabricate ratings).
- `Article`/`BlogPosting`: articles are excerpts on the homepage, not standalone article pages.
- `FAQPage`: not eligible for Google rich results in most cases; not added per guidance.
- `BreadcrumbList`: single-page site, no breadcrumb navigation needed.

JSON-LD syntax validated (all 3 blocks parse as valid JSON).

---

## 4. Sitemap strategy

- `sitemap.xml` contains one canonical, indexable URL: `https://plumber-in-kuwait.vercel.app/` (with `lastmod`, `changefreq: weekly`, `priority: 1.0`).
- Excludes: 404 page (noindexed), no auth/dashboard/API routes exist.
- Single page → no sitemap index/splitting needed.
- Referenced from `robots.txt`.

---

## 5. Metadata architecture

- Single source of truth: static `index.html` (Vite entry). No React-based metadata manager needed because there is exactly one public route and no client-side navigation between URLs.
- Title/description/OG/Twitter are unique to the homepage and match visible content.
- `canonical`, `og:url`, and schema `@id`/`url` all use the absolute production URL `https://plumber-in-kuwait.vercel.app/`.

---

## 6. Performance optimizations

- Hero image: `loading="eager"`, `fetchPriority="high"`, `decoding="async"`, explicit `width`/`height`, new `sizes` attribute; preloaded in `<head>` with `fetchPriority="high"`.
- Gallery images: `loading="lazy"`, `decoding="async"`, explicit `width`/`height` (already present).
- Fonts: `display=swap` on Google Fonts (avoids invisible text); preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`.
- Cache headers via `vercel.json` (hashed assets immutable; images 1 year; sitemap/robots/404 short-lived).
- **Unresolved:** `hero-collage.png` is 575 KB. Environment lacks image-processing tools (no sharp/PIL/ImageMagick), so it could not be re-encoded to WebP/AVIF. Documented as a remaining P2 risk.

---

## 7. Validation performed

- `npm run build` succeeds (Vite 7 production build, 2064 modules) — before and after changes.
- `dist/` contains: `index.html` (metadata verified), `404.html`, `sitemap.xml` (with lastmod), `robots.txt`, `favicon.svg`, `/images/*`, hashed `/assets/*`.
- JSON-LD: all 3 blocks in `dist/index.html` parse as valid JSON (`LocalBusiness`, `WebPage`, `WebSite`).
- Preview server (`npm run preview`) served `/` with HTTP 200; raw HTML contains title, canonical, Open Graph, Twitter, LocalBusiness, WebPage.
- All internal hash anchors (`#home`, `#services`, `#work`, `#areas`, `#articles`, `#contact`) resolve to existing section IDs; `rel="noopener noreferrer"` present on all `target="_blank"` links.
- **Not available in this environment:** Chrome/Lighthouse for lab Core Web Vitals; no test suite exists in `package.json` (no test script, no test files); Rich Results Test requires live URL + external access.
- Production indexing/crawling by Google cannot be verified locally and is NOT claimed.
