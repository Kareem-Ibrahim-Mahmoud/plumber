import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { BadgeCheck, Clock3, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useRef } from 'react';
import { BRAND, TEL_HREF, WHATSAPP_HREF } from '../data/content.js';
import { Container } from './ui.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

function TrustChip({ icon: Icon, text, delay }) {
  return (
    <motion.span
      variants={fadeUp}
      custom={delay}
      className="inline-flex items-center gap-2 rounded-full border border-white/15
        bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md"
    >
      <Icon size={16} className="text-accent-300" strokeWidth={2.4} />
      {text}
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pb-14 pt-[120px] sm:pt-[140px] lg:pb-20">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950 via-[#0e2f38] to-brand-950">
        <motion.div style={{ y: bgY }} className="bg-blueprint absolute inset-0 opacity-70" />
        <div
          className="absolute -top-32 start-[10%] h-96 w-96 rounded-full bg-brand-500/25 blur-[110px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 end-[5%] h-[28rem] w-[28rem] rounded-full bg-accent-600/20 blur-[130px]"
          aria-hidden="true"
        />
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute end-[12%] top-[18%] hidden h-24 w-24 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm lg:block"
            animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Copy */}
          <motion.div initial="hidden" animate="show" className="text-center lg:text-start">
            <motion.div variants={fadeUp} custom={0} className="mb-5 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-accent-400/30
                  bg-accent-500/15 px-4 py-1.5 text-sm font-bold text-accent-200"
              >
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
                </span>
                متاحون الآن — خدمة طوارئ 24 ساعة
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-[2.4rem] font-black leading-[1.35] text-white
                sm:text-6xl sm:leading-[1.3]"
            >
              فني صحي بالكويت
              <br />
              <span className="bg-gradient-to-l from-accent-300 via-accent-400 to-amber-300 bg-clip-text text-transparent">
                {BRAND.tag} — نصلك أينما كنت
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/75 sm:text-lg sm:leading-9 lg:mx-0"
            >
              {BRAND.slogan} — تسليك مجاري، تركيب مضخات وفلاتر، أدوات صحية وتمديدات،
              بأحدث الأجهزة وبدون تكسير.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href={TEL_HREF}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl
                  bg-gradient-to-l from-accent-500 to-accent-600 px-7 py-4 text-lg font-extrabold
                  text-white shadow-[0_16px_40px_-10px_rgb(249_93_22/0.65)] transition-all
                  duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-10px_rgb(249_93_22/0.75)]
                  active:translate-y-0 sm:w-auto"
              >
                <Phone size={20} strokeWidth={2.6} className="transition-transform duration-300 group-hover:rotate-12" />
                اتصل الآن — <span dir="ltr">66115976</span>
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl
                  border border-white/20 bg-white/[0.07] px-7 py-4 text-lg font-extrabold text-white
                  backdrop-blur-md transition-all duration-300 hover:-translate-y-1
                  hover:border-white/35 hover:bg-white/[0.12] active:translate-y-0 sm:w-auto"
              >
                <MessageCircle size={20} strokeWidth={2.4} className="transition-transform duration-300 group-hover:scale-110" />
                راسلنا واتساب
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
            >
              <TrustChip icon={Clock3} text="استجابة فورية 24/7" delay={4} />
              <TrustChip icon={MapPin} text="جميع مناطق الكويت" delay={5} />
              <TrustChip icon={BadgeCheck} text="فنيون محترفون" delay={6} />
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <motion.div style={{ y: imgY }} className="img-frame relative overflow-hidden shadow-2xl">
              <img
                src="/images/hero-collage.png"
                alt="فني صحي محترف أثناء تركيب وصيانة الأدوات الصحية في الكويت"
                className="aspect-[4/3] w-full rounded-[1rem] object-cover"
                width="1200"
                height="900"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div
                className="pointer-events-none absolute inset-[6px] rounded-[1rem] bg-gradient-to-t
                  from-brand-950/55 via-transparent to-transparent"
                aria-hidden="true"
              />
            </motion.div>

            {/* Floating cards */}
            {!reduce ? (
              <>
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-5 start-4 flex items-center gap-3 rounded-2xl border
                    border-white/40 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-lg
                    dark:border-white/10 dark:bg-night-850/90 sm:start-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Clock3 size={22} strokeWidth={2.4} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-extrabold leading-6 text-brand-950 dark:text-white" dir="ltr">
                      24/7
                    </span>
                    <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                      خدمة طوارئ دائمة
                    </span>
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute -top-5 end-4 flex items-center gap-3 rounded-2xl border
                    border-white/40 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-lg
                    dark:border-white/10 dark:bg-night-850/90 sm:end-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/15 text-accent-600 dark:text-accent-300">
                    <BadgeCheck size={22} strokeWidth={2.4} />
                  </span>
                  <span>
                    <span className="block font-display text-base font-extrabold leading-6 text-brand-950 dark:text-white">
                      بدون تكسير
                    </span>
                    <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                      أحدث أجهزة التسليك
                    </span>
                  </span>
                </motion.div>
              </>
            ) : null}
          </motion.div>
        </div>
      </Container>

      {/* Bottom fade into page bg */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-sand-50 to-transparent dark:from-night-950"
        aria-hidden="true"
      />
    </section>
  );
}
