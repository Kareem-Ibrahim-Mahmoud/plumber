import { motion } from 'framer-motion';
import { STATS } from '../data/content.js';
import { useCountUp } from '../hooks/hooks.js';
import { staggerChild, staggerParent } from './Reveal.jsx';
import { Container, Section } from './ui.jsx';

function StatCard({ value, suffix, label }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      variants={staggerChild}
      className="group relative overflow-hidden rounded-2xl border border-slate-900/[0.06]
        bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]
        dark:border-white/[0.08] dark:bg-white/[0.04] sm:p-7"
    >
      <div
        className="absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-l
          from-accent-500 to-brand-400 transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <div
        className="font-display text-4xl font-black text-brand-800 dark:text-white sm:text-5xl"
        dir="ltr"
      >
        {Math.round(v)}
        <span className="text-accent-500">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-300">{label}</p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <Section className="py-10 sm:py-14">
      <Container>
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </motion.dl>
      </Container>
    </Section>
  );
}
