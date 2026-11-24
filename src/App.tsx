import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PracticeAreasSection } from './components/PracticeAreasSection';
import { ProcessSection } from './components/ProcessSection';
import { SocialProofSection } from './components/SocialProofSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1E293B]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[#C5A059] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#0B192C]"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar />

      <main id="conteudo-principal">
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <ProcessSection />
        <SocialProofSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
