import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, Wrench, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BRAND, NAV_LINKS, TEL_HREF } from '../data/content.js';
import { useActiveSection, useScrolled } from '../hooks/hooks.js';
import { cn } from '../utils/cn.js';
import { ThemeToggle } from './ThemeToggle.jsx';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Navbar() {
  const scrolled = useScrolled(16);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-slate-900/[0.07] bg-white/85 shadow-[0_8px_30px_-12px_rgb(11_43_51/0.25)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-night-950/80'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
            className="group flex items-center gap-3"
            aria-label={BRAND.full}
          >
            <span
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br
                from-brand-700 to-brand-950 text-white shadow-md transition-transform
                duration-300 group-hover:-rotate-6 group-hover:scale-105
                dark:from-brand-400 dark:to-brand-700"
            >
              <Wrench size={20} strokeWidth={2.4} />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-display text-lg font-extrabold text-brand-950 dark:text-white">
                {BRAND.name}
                <span className="text-accent-500"> {BRAND.tag}</span>
              </span>
              <span className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                فني صحي — سباكة وتسليك مجاري
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.id);
                }}
                data-active={active === link.id}
                className={cn(
                  'link-underline rounded-lg px-3.5 py-2 text-[15px] font-semibold transition-colors',
                  active === link.id
                    ? 'text-accent-600 dark:text-accent-300'
                    : 'text-slate-600 hover:text-brand-800 dark:text-slate-300 dark:hover:text-white',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle className="hidden sm:grid" />
            <a
              href={TEL_HREF}
              className="group hidden items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-l
                from-accent-500 to-accent-600 px-5 py-2.5 text-[15px] font-bold text-white
                shadow-[0_10px_25px_-8px_rgb(249_93_22/0.6)] transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgb(249_93_22/0.7)]
                active:translate-y-0 sm:inline-flex"
            >
              <Phone size={17} strokeWidth={2.5} className="transition-transform duration-300 group-hover:rotate-12" />
              <span dir="ltr">66115976</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200
                bg-white text-brand-900 transition-colors hover:border-brand-300
                dark:border-white/10 dark:bg-white/[0.06] dark:text-white lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-brand-950/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: '8%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '8%', opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              aria-label="قائمة الجوال"
              className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col gap-1 overflow-y-auto
                bg-white p-6 pt-24 shadow-2xl dark:bg-night-900"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => scrollTo(link.id), 80);
                  }}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-4 py-3.5 text-right text-lg font-bold transition-colors',
                    active === link.id
                      ? 'bg-accent-500/10 text-accent-600 dark:text-accent-300'
                      : 'text-brand-950 hover:bg-slate-100 dark:text-white dark:hover:bg-white/5',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full transition-opacity',
                      active === link.id ? 'bg-accent-500 opacity-100' : 'opacity-0',
                    )}
                  />
                </motion.a>
              ))}
              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                <a
                  href={TEL_HREF}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl
                    bg-gradient-to-l from-accent-500 to-accent-600 px-5 py-3.5 font-bold text-white"
                >
                  <Phone size={18} strokeWidth={2.5} />
                  <span dir="ltr">66115976</span>
                </a>
                <ThemeToggle />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
