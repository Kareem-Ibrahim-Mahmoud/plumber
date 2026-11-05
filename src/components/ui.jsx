import { cn } from '../utils/cn.js';
import { Reveal } from './Reveal.jsx';

export function Container({ children, className }) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </div>
  );
}

export function Section({ id, children, className }) {
  return (
    <section
      id={id}
      aria-label={id}
      className={cn('relative scroll-mt-24 py-16 sm:py-20 lg:py-24', className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-brand-600/20
        bg-brand-600/[0.07] px-4 py-1.5 text-[13px] font-semibold text-brand-700
        dark:border-brand-300/20 dark:bg-brand-300/10 dark:text-brand-200"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, desc, align = 'center' }) {
  const centered = align === 'center';
  return (
    <Reveal
      className={cn(
        'mb-10 flex flex-col gap-4 sm:mb-14',
        centered ? 'items-center text-center' : 'items-start text-start',
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="max-w-2xl font-display text-3xl font-extrabold leading-[1.35]
          text-brand-950 dark:text-white sm:text-4xl sm:leading-[1.4]"
      >
        {title}
      </h2>
      {desc ? (
        <p
          className={cn(
            'max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300/90 sm:text-lg sm:leading-9',
            centered && 'mx-auto',
          )}
        >
          {desc}
        </p>
      ) : null}
    </Reveal>
  );
}
