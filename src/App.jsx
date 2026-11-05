import { Articles } from './components/Articles.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { Gallery } from './components/Gallery.jsx';
import { Hero } from './components/Hero.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Areas, Process, WhyUs } from './components/Sections.jsx';
import { Services } from './components/Services.jsx';
import { Stats } from './components/Stats.jsx';
import { FloatingCall, ScrollProgress } from './components/chrome.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[80]
          focus:rounded-xl focus:bg-brand-900 focus:px-5 focus:py-3 focus:font-bold focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Gallery />
        <WhyUs />
        <Areas />
        <Process />
        <Articles />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
    </div>
  );
}
