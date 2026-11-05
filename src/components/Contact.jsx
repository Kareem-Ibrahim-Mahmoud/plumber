import { motion } from 'framer-motion';
import { Clock3, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { PHONE_DISPLAY, TEL_HREF, WHATSAPP_HREF } from '../data/content.js';
import { Reveal } from './Reveal.jsx';
import { Container, Section, SectionHeading } from './ui.jsx';

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-300';

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const waHref =
    'https://wa.me/96566115976?text=' +
    encodeURIComponent(
      `السلام عليكم، أنا ${form.name || 'عميل'} (${form.phone || 'بدون رقم'})\n${form.message || 'أحتاج فني صحي'}`,
    );

  return (
    <Section id="contact">
      <Container>
        <SectionHeading
          eyebrow="تواصل معنا"
          title={<>جاهزون لخدمتك <span className="text-gradient">على مدار الساعة</span></>}
          desc="اتصل مباشرة أو أرسل طلبك عبر النموذج وسيصلك ردنا على واتساب فوراً."
        />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <a
                href={TEL_HREF}
                className="group flex items-center gap-5 overflow-hidden rounded-2xl bg-gradient-to-bl
                  from-brand-800 via-brand-900 to-brand-950 p-7 text-white shadow-[var(--shadow-card)]
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]
                  dark:from-brand-700 dark:via-night-850 dark:to-night-900"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent-500 text-white shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Phone size={28} strokeWidth={2.3} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white/65">اتصل بنا الآن — 24 ساعة</span>
                  <span className="block font-display text-3xl font-black tracking-wide" dir="ltr">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-slate-900/[0.06]
                  bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]
                  dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-600 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-400">
                  <MessageCircle size={26} strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-display text-lg font-extrabold text-brand-950 dark:text-white">
                    راسلنا على واتساب
                  </span>
                  <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">
                    رد سريع — أرسل موقعك وتفاصيل المشكلة
                  </span>
                </span>
              </a>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.12}>
                <div className="flex h-full items-start gap-3.5 rounded-2xl border border-slate-900/[0.06] bg-white p-5 shadow-[var(--shadow-card)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600/10 text-brand-700 dark:text-brand-200">
                    <Clock3 size={21} strokeWidth={2.2} />
                  </span>
                  <span>
                    <span className="block font-extrabold text-brand-950 dark:text-white">الدوام</span>
                    <span className="block text-sm text-slate-500 dark:text-slate-400">24 ساعة / 7 أيام</span>
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="flex h-full items-start gap-3.5 rounded-2xl border border-slate-900/[0.06] bg-white p-5 shadow-[var(--shadow-card)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600/10 text-brand-700 dark:text-brand-200">
                    <MapPin size={21} strokeWidth={2.2} />
                  </span>
                  <span>
                    <span className="block font-extrabold text-brand-950 dark:text-white">التغطية</span>
                    <span className="block text-sm text-slate-500 dark:text-slate-400">جميع مناطق الكويت</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form -> WhatsApp */}
          <Reveal delay={0.1}>
            <motion.form
              onSubmit={(e) => e.preventDefault()}
              className="flex h-full flex-col gap-4 rounded-2xl border border-slate-900/[0.06]
                bg-white p-6 shadow-[var(--shadow-card)] dark:border-white/[0.08]
                dark:bg-white/[0.04] sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-bold text-brand-950 dark:text-slate-200">
                  الاسم
                  <input
                    value={form.name}
                    onChange={set('name')}
                    placeholder="مثال: أبو أحمد"
                    className={inputCls}
                    autoComplete="name"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-brand-950 dark:text-slate-200">
                  رقم الهاتف
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="مثال: 9XXXXXXX"
                    inputMode="tel"
                    dir="ltr"
                    className={`${inputCls} text-left`}
                    autoComplete="tel"
                  />
                </label>
              </div>
              <label className="flex flex-1 flex-col gap-2 text-sm font-bold text-brand-950 dark:text-slate-200">
                تفاصيل المشكلة
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder="اشرح المشكلة باختصار — مثال: انسداد في مجاري المطبخ في حولي"
                  rows={5}
                  className={`${inputCls} flex-1 resize-none`}
                />
              </label>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl
                  bg-gradient-to-l from-emerald-500 to-emerald-600 px-6 py-4 text-lg font-extrabold
                  text-white shadow-[0_14px_32px_-10px_rgb(16_185_129/0.6)] transition-all
                  duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send size={19} strokeWidth={2.4} className="-scale-x-100 transition-transform duration-300 group-hover:-translate-x-1" />
                إرسال الطلب عبر واتساب
              </a>
              <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                بالضغط على إرسال سيتم فتح واتساب مع نص طلبك جاهزاً — بدون أي التزام.
              </p>
            </motion.form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
