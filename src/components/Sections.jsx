import { motion } from 'framer-motion';
import { BadgeCheck, Cpu, MapPin, Zap } from 'lucide-react';
import { AREAS, PROCESS, TEL_HREF, WHY_US } from '../data/content.js';
import { Reveal, staggerChild, staggerParent } from './Reveal.jsx';
import { Container, Section, SectionHeading } from './ui.jsx';

const ICONS = { Zap, BadgeCheck, Cpu, MapPin };

export function WhyUs() {
  return (
    <Section>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="start"
              eyebrow="لماذا نحن"
              title={<>الاختيار الموثوق <span className="text-gradient">لأعمال السباكة</span> في الكويت</>}
              desc="نجمع بين سرعة الاستجابة والاحترافية الفنية والتجهيزات الحديثة — لنحل مشكلتك من أول زيارة."
            />
            <Reveal delay={0.1}>
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-brand-800
                  px-6 py-3 font-extrabold text-brand-800 transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-brand-800 hover:text-white
                  dark:border-brand-300 dark:text-brand-100 dark:hover:bg-brand-300 dark:hover:text-brand-950"
              >
                احجز زيارة فني الآن
              </a>
            </Reveal>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerParent}
            className="grid gap-4 sm:grid-cols-2"
          >
            {WHY_US.map((w) => {
              const Icon = ICONS[w.icon] ?? BadgeCheck;
              return (
                <motion.div
                  key={w.title}
                  variants={staggerChild}
                  className="group rounded-2xl border border-slate-900/[0.06] bg-white p-6
                    shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5
                    hover:shadow-[var(--shadow-lift)] dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <span
                    className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent-500/12
                      text-accent-600 transition-transform duration-300 group-hover:scale-110
                      group-hover:-rotate-6 dark:text-accent-300"
                  >
                    <Icon size={24} strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-brand-950 dark:text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-7 text-slate-600 dark:text-slate-300/90">
                    {w.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export function Areas() {
  return (
    <Section id="areas" className="overflow-hidden bg-brand-950 dark:bg-night-900">
      <div className="bg-dots absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -top-24 start-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 end-1/4 h-72 w-72 rounded-full bg-accent-600/20 blur-[100px]"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="مناطق التغطية"
          title={<span className="text-white">نصلك أينما كنت في الكويت</span>}
          desc="نغطي جميع المحافظات والمناطق — وهذه أبرز المناطق التي نخدمها يومياً على مدار الساعة."
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AREAS.map((a) => (
            <motion.div
              key={a.name}
              variants={staggerChild}
              className="group flex items-center gap-4 rounded-2xl border border-white/10
                bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300
                hover:-translate-y-1 hover:border-accent-400/40 hover:bg-white/[0.09]"
            >
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-500/20
                  text-accent-300 transition-transform duration-300 group-hover:scale-110"
              >
                <MapPin size={22} strokeWidth={2.2} />
              </span>
              <span>
                <span className="block font-display text-xl font-extrabold text-white">
                  فني صحي {a.name}
                </span>
                <span className="block text-sm font-semibold text-white/60">{a.note}</span>
              </span>
            </motion.div>
          ))}
          <motion.a
            variants={staggerChild}
            href={TEL_HREF}
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l
              from-accent-500 to-accent-600 p-5 font-display text-lg font-extrabold text-white
              shadow-[0_14px_36px_-10px_rgb(249_93_22/0.6)] transition-all duration-300
              hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
          >
            منطقتك غير مذكورة؟
            <span className="text-sm font-bold opacity-90">اتصل وسنصلك</span>
          </motion.a>
        </motion.div>
        <Reveal className="mt-8 text-center text-sm font-semibold text-white/55">
          نخدم أيضاً جميع مناطق ومحافظات الكويت الأخرى — اتصل بنا وسنصل إليك أينما كنت.
        </Reveal>
      </Container>
    </Section>
  );
}

export function Process() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="كيف نعمل"
          title={<>من الاتصال إلى الحل في <span className="text-gradient">4 خطوات</span></>}
          desc="إجراءات واضحة وشفافة — تعرف بالضبط ماذا سيحدث من لحظة اتصالك حتى انتهاء العمل."
        />
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute start-[12%] end-[12%] top-10 hidden h-0.5 bg-gradient-to-l
              from-brand-200 via-accent-300 to-brand-200 lg:block dark:from-white/10 dark:via-accent-500/40 dark:to-white/10"
            aria-hidden="true"
          />
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1} className="relative">
              <div
                className="group h-full rounded-2xl border border-slate-900/[0.06] bg-white p-6
                  text-center shadow-[var(--shadow-card)] transition-all duration-300
                  hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]
                  dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <span
                  className="relative mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl
                    bg-gradient-to-br from-brand-700 to-brand-950 font-display text-xl font-black
                    text-white shadow-lg transition-transform duration-300 group-hover:scale-110
                    group-hover:-rotate-6 dark:from-brand-400 dark:to-brand-700"
                >
                  {p.step}
                </span>
                <h3 className="font-display text-lg font-extrabold text-brand-950 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300/90">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
