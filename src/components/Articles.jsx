import { motion } from 'framer-motion';
import { BookOpenText, CalendarDays } from 'lucide-react';
import { ARTICLES } from '../data/content.js';
import { staggerChild, staggerParent } from './Reveal.jsx';
import { Container, Section, SectionHeading } from './ui.jsx';

export function Articles() {
  return (
    <Section id="articles" className="bg-white dark:bg-white/[0.02]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-slate-900/10 to-transparent dark:via-white/10"
        aria-hidden="true"
      />
      <Container>
        <SectionHeading
          eyebrow="المقالات والأدلة"
          title={<>نصائح وأدلة من <span className="text-gradient">خبرة الميدان</span></>}
          desc="مختارات من مقالاتنا حول السباكة وتسليك المجاري وتركيب المضخات في الكويت."
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ARTICLES.map((a) => (
            <motion.article
              key={a.title}
              variants={staggerChild}
              className="group flex flex-col rounded-2xl border border-slate-900/[0.06] bg-sand-50
                p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5
                hover:shadow-[var(--shadow-lift)] dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="rounded-full bg-brand-600/[0.09] px-3 py-1 text-xs font-extrabold
                    text-brand-700 dark:bg-white/[0.08] dark:text-brand-200"
                >
                  {a.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
                  <CalendarDays size={14} />
                  {a.date}
                </span>
              </div>
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 dark:from-white/10 dark:to-white/[0.04] dark:text-brand-200">
                <BookOpenText size={22} strokeWidth={2.1} />
              </span>
              <h3 className="font-display text-[17px] font-extrabold leading-8 text-brand-950 dark:text-white">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300/85">
                {a.excerpt}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
