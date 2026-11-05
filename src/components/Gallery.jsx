import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { GALLERY } from '../data/content.js';
import { cn } from '../utils/cn.js';
import { Reveal } from './Reveal.jsx';
import { Container, Section, SectionHeading } from './ui.jsx';

const FILTERS = ['الكل', 'تسليك مجاري', 'تركيب وصيانة'];

function matches(item, filter) {
  if (filter === 'الكل') return true;
  if (filter === 'تسليك مجاري') return item.category.includes('تسليك') || item.category.includes('تصليك');
  if (filter === 'تركيب وصيانة') return item.category.includes('تركيب');
  return true;
}

export function Gallery() {
  const [filter, setFilter] = useState('الكل');
  const [lightbox, setLightbox] = useState(-1);

  const items = GALLERY.filter((g) => matches(g, filter));

  const openAt = useCallback(
    (src) => setLightbox(items.findIndex((g) => g.src === src)),
    [items],
  );
  const close = useCallback(() => setLightbox(-1), []);
  const step = useCallback(
    (dir) => setLightbox((i) => (i + dir + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (lightbox < 0) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(1); // RTL: left = next visually
      if (e.key === 'ArrowRight') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, close, step]);

  return (
    <Section id="work" className="bg-white dark:bg-white/[0.02]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-slate-900/10 to-transparent dark:via-white/10"
        aria-hidden="true"
      />
      <Container>
        <SectionHeading
          eyebrow="أعمالنا"
          title={<>شغل حقيقي <span className="text-gradient">بعدسة الكاميرا</span></>}
          desc="لقطات من أعمال التركيب والصيانة والتسليك — اضغط على أي صورة لعرضها بحجم كامل."
        />

        {/* Filters */}
        <Reveal className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setLightbox(-1);
              }}
              aria-pressed={filter === f}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300',
                filter === f
                  ? 'bg-brand-900 text-white shadow-lg dark:bg-accent-500 dark:text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white',
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* Masonry-ish grid */}
        <motion.div layout className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[210px] lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((g) => (
              <motion.figure
                layout
                key={g.src}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'group relative cursor-zoom-in overflow-hidden rounded-2xl',
                  'border border-slate-900/[0.06] bg-slate-100 shadow-[var(--shadow-card)]',
                  'dark:border-white/[0.08] dark:bg-white/[0.04]',
                  g.span === 'wide' && 'sm:col-span-2',
                  g.span === 'tall' && 'sm:row-span-2',
                )}
                onClick={() => openAt(g.src)}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10
                    to-transparent opacity-80 transition-opacity duration-400 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span
                  className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full
                    bg-black/45 px-3 py-1 text-xs font-bold text-white opacity-0 backdrop-blur-md
                    transition-all duration-300 group-hover:opacity-100"
                >
                  <Expand size={13} />
                  عرض
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="mb-1.5 inline-block rounded-full bg-accent-500/90 px-2.5 py-0.5 text-[11px] font-bold">
                    {g.category}
                  </span>
                  <p className="font-display text-lg font-extrabold leading-7">{g.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox >= 0 && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`عارض الصور — ${items[lightbox].title}`}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-950/92 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="إغلاق العارض"
              className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full
                bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="الصورة التالية"
              className="absolute start-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center
                rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:start-6"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="الصورة السابقة"
              className="absolute end-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center
                rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:end-6"
            >
              <ChevronRight size={24} />
            </button>

            <motion.figure
              key={items[lightbox].src}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full w-full max-w-4xl overflow-hidden rounded-2xl bg-night-900 shadow-2xl"
            >
              <img
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                width="800"
                height="600"
                decoding="async"
                className="max-h-[72vh] w-full object-contain bg-black/40"
              />
              <figcaption className="flex items-center justify-between gap-4 p-4 text-white">
                <div>
                  <p className="font-display text-lg font-extrabold">{items[lightbox].title}</p>
                  <p className="text-sm text-white/60">
                    {lightbox + 1} / {items.length} — {items[lightbox].category}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
