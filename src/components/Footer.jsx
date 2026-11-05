import { ArrowUp, MapPin, Phone, Wrench } from 'lucide-react';
import { BRAND, NAV_LINKS, PHONE_DISPLAY, SERVICES, TEL_HREF, WHATSAPP_HREF } from '../data/content.js';
import { Container } from './ui.jsx';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white dark:bg-black/60">
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-brand-400 via-accent-500 to-brand-400"
        aria-hidden="true"
      />
      <div
        className="absolute -top-28 start-1/3 h-64 w-64 rounded-full bg-brand-500/15 blur-[100px]"
        aria-hidden="true"
      />
      <Container className="relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white">
                <Wrench size={22} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-extrabold">
                {BRAND.name}
                <span className="text-accent-400"> {BRAND.tag}</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[15px] leading-8 text-white/65">
              {BRAND.slogan} — تسليك مجاري، تركيب مضخات وفلاتر، أدوات صحية وتمديدات،
              في جميع مناطق الكويت على مدار الساعة.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a href={TEL_HREF} className="inline-flex w-fit items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-600">
                <Phone size={17} strokeWidth={2.5} />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-sm font-bold text-white/75 hover:text-white"
              >
                راسلنا عبر واتساب
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="روابط سريعة">
            <h3 className="mb-4 font-display text-lg font-extrabold">روابط سريعة</h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(l.id);
                    }}
                    className="link-underline text-[15px] font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-display text-lg font-extrabold">خدماتنا</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('services');
                    }}
                    aria-label={`خدمة ${s.title} بالكويت`}
                    className="link-underline text-[15px] font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h3 className="mb-4 font-display text-lg font-extrabold">مناطق التغطية</h3>
            <p className="inline-flex items-start gap-2 text-[15px] leading-8 text-white/65">
              <MapPin size={18} className="mt-1.5 shrink-0 text-accent-400" />
              حولي، الأحمدي، السالمية، العاصمة، مشرف — وجميع مناطق ومحافظات الكويت.
            </p>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06]
                px-4 py-2.5 text-sm font-bold text-white/80 transition-all duration-300
                hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            >
              <ArrowUp size={16} />
              العودة للأعلى
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.full} — جميع الحقوق محفوظة.</p>
          <p className="inline-flex items-center gap-1.5">
            خدمة سباكة موثوقة في الكويت — <span dir="ltr">{PHONE_DISPLAY}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
