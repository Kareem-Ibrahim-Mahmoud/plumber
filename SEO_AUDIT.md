# SEO Audit — Sahhi Kuwait (صحي بالكويت 24 ساعة)

**Site:** https://plumber-in-kuwait.vercel.app (Vercel)
**Stack:** React 19 + Vite 7 + Tailwind CSS 4 (client-side rendered, single-page application)
**Language/locale:** Arabic (RTL), targeting Kuwait (`lang="ar"`, `dir="rtl"`, `og:locale=ar_KW`, `geo.region=KW`)
**Audit date:** 2026-10-28
**Audited by:** SEO engineering implementation (this repository)

---

## 1. Website understanding (from codebase)

- Business: 24-hour emergency plumbing / handyman service in Kuwait (فني صحي بالكويت).
- Services: drain/sewer unclogging without demolition, water pump installation, water filter installation, sanitaryware installation/maintenance, trap/odor prevention, drain cleaning, bathroom demolition and plumbing extensions.
- Conversion actions: phone call (`tel:+96566115976`), WhatsApp (`wa.me/96566115976`), contact form that opens WhatsApp.
- Service areas: Kuwait nationwide (Hawally, Salmiya, Ahmadi, Kuwait City, Mishref, and all governorates).
- Single public page (`/`) with anchor sections: home, services, work (gallery), areas, articles, contact.
- No authentication, no dashboard, no API routes, no blog/CMS, no multi-language support.

---

## 2. Route-level SEO inventory

| Route | Type | Indexable? | Status | Notes |
|---|---|---|---|---|
| `/` | Public — homepage | Yes | 200 | Only public URL. Title, description, canonical, OG, Twitter, JSON-LD present in initial HTML. |
| `#services`, `#work`, `#areas`, `#articles`, `#contact` | Same-page fragments | N/A | 200 (part of `/`) | Real `<a href="#id">` anchors; not separate indexable URLs. Correct for a one-page site. |
| `/*` (unknown path) | Error page | No | 404 (production, via `404.html`) | Custom `public/404.html` added; `noindex, nofollow`. |
| `/sitemap.xml` | Index control | No | 200 | References homepage only (single-page site). |
| `/robots.txt` | Index control | No | 200 | `Allow: /`, sitemap reference. |
| `/favicon.svg`, `/images/*` | Static assets | No | 200 | Image assets cached via `vercel.json`. |

No authentication pages, private dashboards, dynamic pages, search/filter pages, or localized page variants exist.

---

## 3. Issues identified (before implementation)

| ID | Severity | Issue | Affected | Cause |
|---|---|---|---|---|
| P0-1 | P0 | Invalid schema.org type `@type: "Plumber"` (does not exist in schema.org; node likely ignored by Google) | `/` JSON-LD | Copy-paste error in original `index.html` |
| P0-2 | P0 | Unverified `priceRange: "KWD"` in structured data (currency code is not a price range; fabricates pricing precision) | `/` JSON-LD | Unverified value |
| P0-3 | P0 | No custom 404 page; unknown paths rely on host default | `/*` | Missing `public/404.html` |
| P1-1 | P1 | `sitemap.xml` missing `lastmod` | `/sitemap.xml` | Static file never maintained |
| P1-2 | P1 | `hero-collage.png` is 575 KB — the preloaded LCP hero image is oversized | `/` hero | No image optimization step in build |
| P1-3 | P1 | No `WebPage` schema describing the page itself | `/` | Not implemented |
| P2-1 | P2 | No cache-header policy for static assets | `/assets/*`, `/images/*` | No `vercel.json` |
| P2-2 | P2 | LCP image not served in modern format (WebP/AVIF) | `/` hero | No image processing tooling available in this environment |
| P2-3 | P2 | Page body content is client-rendered (empty `#root` in initial HTML); metadata is present in initial HTML but primary content requires JS execution | `/` | Vite + React CSR; no SSR/SSG configured |

**Items NOT present (verified, not issues):** accidental `noindex`, `robots.txt` blocking, missing title/description/canonical, missing `lang`/`dir`, broken internal hash links (all `#home`, `#services`, `#work`, `#areas`, `#articles`, `#contact` resolve), missing `rel="noopener noreferrer"` on `target="_blank"` links, missing skip-to-content link.

---

## 4. Implemented solutions

See `SEO_IMPLEMENTATION.md` for the full change list.

---

## 5. Remaining risks

1. **Hero image weight (575 KB PNG).** Preloaded with `fetchPriority="high"`. Recommended: re-export as WebP/AVIF under ~150 KB and update `index.html`, `Hero.jsx`, and JSON-LD `image`. No image-processing tooling was available in this environment, so this could not be done here (see `SEO_DEPLOYMENT_CHECKLIST.md`).
2. **Client-side rendering.** Section content exists in the DOM only after React hydration. Googlebot renders JavaScript, so content is indexable after render, but it is not in the raw initial HTML. A full SSR/SSG migration was deemed out of scope: Vite has no official React SSR in this setup, framer-motion animations/counters would risk hydration mismatches, and the site is a single page whose metadata *is* in the initial HTML.
3. **No local Lighthouse/Chrome available** in this environment, so lab Core Web Vitals could not be measured (documented in `SEO_IMPLEMENTATION.md`).
4. **Production domain** observed in code: `plumber-in-kuwait.vercel.app` (Vercel subdomain). No custom domain or Google Search Console property found in the repository.

---

## 6. Priority summary

- **P0 (critical):** Fixed invalid `Plumber` schema → `LocalBusiness`; removed unverified `priceRange`; added custom `404.html`.
- **P1 (high impact):** Added `WebPage` schema; added `lastmod` to sitemap; added `sizes` to hero image; verified metadata/canonical/robots.
- **P2 (enhancements):** Added `vercel.json` cache headers; font `display=swap` already present; preconnects already present.
