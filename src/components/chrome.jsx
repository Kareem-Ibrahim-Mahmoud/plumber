import { motion, useScroll, useSpring } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TEL_HREF, WHATSAPP_HREF } from '../data/content.js';
import { cn } from '../utils/cn.js';

/** Thin scroll progress bar under the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-right bg-gradient-to-l from-accent-400 via-accent-500 to-brand-400"
      aria-hidden="true"
    />
  );
}

/** Sticky mobile call actions — appear after scrolling past the hero. */
export function FloatingCall() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed bottom-4 inset-x-4 z-40 grid grid-cols-2 gap-3 sm:hidden',
        !visible && 'pointer-events-none',
      )}
    >
      <a
        href={TEL_HREF}
        tabIndex={visible ? 0 : -1}
        aria-label="اتصل بنا الآن"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l
          from-accent-500 to-accent-600 px-4 py-3.5 font-extrabold text-white shadow-xl"
      >
        <Phone size={18} strokeWidth={2.5} />
        اتصال
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="راسلنا على واتساب"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l
          from-emerald-500 to-emerald-600 px-4 py-3.5 font-extrabold text-white shadow-xl"
      >
        <MessageCircle size={18} strokeWidth={2.5} />
        واتساب
      </a>
    </motion.div>
  );
}
