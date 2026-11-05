# SEO Deployment Checklist — Sahhi Kuwait

**Site:** https://plumber-in-kuwait.vercel.app (Vercel)
**Status:** Ready to deploy. Do NOT claim Google indexing based on these local checks.

---

## Pre-deployment (repository)

- [x] `npm run build` succeeds
- [x] `index.html`: title, meta description, canonical (absolute production URL), robots `index, follow`, `lang="ar"`, `dir="rtl"`, Open Graph + Twitter tags complete
- [x] `index.html`: JSON-LD valid — `LocalBusiness` (replaced invalid `Plumber`), `WebPage`, `WebSite`; no fabricated ratings/prices/addresses
- [x] `public/404.html`: exists, returns 404 in production, `noindex, nofollow`, links to homepage + phone
- [x] `public/sitemap.xml`: homepage URL with `lastmod`, referenced in `robots.txt`
- [x] `public/robots.txt`: `Allow: /`, sitemap reference, does not block CSS/JS/images
- [x] `vercel.json`: cache headers for assets/images; short TTL for sitemap/robots/404
- [x] No `localhost` or placeholder URLs in public output
- [x] `.env.local` (Vercel token) remains local and is gitignored — never deployed or committed

---

## Post-deployment (production URL)

- [ ] Verify production homepage returns HTTP 200
- [ ] Verify an unknown path returns HTTP 404 with the custom `404.html`
- [ ] Verify `https://plumber-in-kuwait.vercel.app/robots.txt` is fetchable and allows `/`
- [ ] Verify `https://plumber-in-kuwait.vercel.app/sitemap.xml` returns 200 and lists only the homepage
- [ ] View-source check: title, description, canonical, og:image URL resolve to public production image
- [ ] Verify no `noindex` on the homepage; 404 page carries `noindex`
- [ ] Confirm all internal `#section` anchors still scroll to existing section IDs

---

## External actions (cannot be done from repository)

- [ ] **Google Search Console:** verify property `https://plumber-in-kuwait.vercel.app/` (DNS TXT or HTML file), submit sitemap URL, monitor Coverage and Indexing reports
- [ ] **URL Inspection:** request indexing of the homepage after deployment (optional; sitemap submission is sufficient)
- [ ] **Google Business Profile:** claim/verify the business profile for "صحي بالكويت 24 ساعة" with phone +96566115976 and service area Kuwait (requires business-owner verification; do not invent an address)
- [ ] **Analytics:** Google Analytics 4 / measurement ID if the owner wants conversion tracking (privacy/consent banner may be required)
- [ ] **Custom domain:** if the owner migrates from the Vercel subdomain to a custom domain, update `canonical`, `og:url`, schema `@id`/`url`, sitemap, and `robots.txt` sitemap reference accordingly
- [ ] **Image optimization (P2):** re-export `hero-collage.png` (currently 575 KB) as WebP/AVIF under ~150 KB; update `index.html` (og:image, twitter:image, JSON-LD image), `Hero.jsx` `src`/`sizes`, and `<link rel="preload">`

---

## Monitoring (after indexing begins)

Track in Google Search Console:
- Indexed URLs (expect 1 — homepage)
- Search impressions, clicks, CTR, average position
- Crawl errors / indexing errors
- Mobile usability reports

Core Web Vitals (field data, 75th percentile): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 — monitor via Search Console CrUX / PageSpeed Insights once real-user data exists. Lab scores (Lighthouse) were NOT measurable in this environment (no Chrome) and are not equivalent to field data.
