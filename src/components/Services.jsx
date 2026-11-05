import { motion } from 'framer-motion';
import {
  Droplets,
  Gauge,
  Hammer,
  ShowerHead,
  Waves,
  Wind,
  Wrench,
  ArrowLeft,
} from 'lucide-react';
import { SERVICES, TEL_HREF } from '../data/content.js';
import { staggerChild, staggerParent } from './Reveal.jsx';
import { Container, Section, SectionHeading } from './ui.jsx';

const ICONS = { Waves, Gauge, Droplets, Wrench, Wind, ShowerHead, Hammer };

export function Services() {
  return (
    <Section id="services">
      <Container>
        <SectionHeading
          eyebrow="خدماتنا"
          title={<>كل ما تحتاجه من أعمال <span className="text-gradient">السباكة والصرف</span> في مكان واحد</>}
          desc="من تسليك المجاري إلى تركيب المضخات والفلاتر — خدمات متكاملة بأحدث الأجهزة وعلى مدار الساعة."
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon] ?? Wrench;
            return (
              <motion.article
                key={s.title}
                variants={staggerChild}
                className="group relative flex flex-col overflow-hidden rounded-2xl border
                  border-slate-900/[0.06] bg-white p-7 shadow-[var(--shadow-card)]
                  transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]
                  dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <div
                  className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full
                    bg-brand-100/70 blur-2xl transition-all duration-500 group-hover:scale-[1.8]
                    group-hover:bg-accent-100/80 dark:bg-brand-500/10 dark:group-hover:bg-accent-500/10"
                  aria-hidden="true"
                />
                <span
                  className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br
                    from-brand-700 to-brand-950 text-white shadow-md transition-transform
                    duration-300 group-hover:-rotate-6 group-hover:scale-110
                    dark:from-brand-400 dark:to-brand-700"
                >
                  <Icon size={26} strokeWidth={2.2} />
                </span>
                <h3 className="font-display text-xl font-extrabold text-brand-950 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-[1.9] text-slate-600 dark:text-slate-300/90">
                  {s.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-brand-600/[0.08] px-3 py-1 text-xs font-bold
                        text-brand-700 dark:bg-white/[0.07] dark:text-brand-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={TEL_HREF}
                  aria-label={`اطلب خدمة ${s.title} الآن`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-extrabold
                    text-accent-600 transition-all duration-300 hover:gap-3
                    dark:text-accent-300"
                >
                  اطلب الخدمة الآن
                  <ArrowLeft size={17} strokeWidth={2.6} />
                </a>
              </motion.article>
            );
          })}

          {/* CTA card */}
          <motion.a
            variants={staggerChild}
            href={TEL_HREF}
            className="group relative flex min-h-[240px] flex-col justify-center overflow-hidden
              rounded-2xl bg-gradient-to-bl from-brand-800 via-brand-900 to-brand-950 p-7
              text-white shadow-[var(--shadow-card)] transition-all duration-300
              hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] dark:from-brand-700 dark:via-night-850 dark:to-night-900"
          >
            <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
            <div
              className="absolute -bottom-12 -start-12 h-44 w-44 rounded-full bg-accent-500/25 blur-3xl
                transition-transform duration-500 group-hover:scale-150"
              aria-hidden="true"
            />
            <p className="relative font-display text-2xl font-extrabold leading-relaxed">
              عندك مشكلة سباكة طارئة؟
            </p>
            <p className="relative mt-2 text-white/75 leading-8">
              فني جاهز يصلك الآن — اتصل بنا على مدار الساعة.
            </p>
            <span
              className="relative mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-white
                px-6 py-3 font-extrabold text-brand-900 transition-transform duration-300
                group-hover:-translate-y-0.5"
              dir="ltr"
            >
              66115976
            </span>
          </motion.a>
        </motion.div>
      </Container>
    </Section>
  );
}
