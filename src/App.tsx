import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LateralNewsFeed } from './components/LateralNewsFeed';
import { LegalBriefingTab } from './components/LegalBriefingTab';
import { Navbar, type ActiveTab } from './components/Navbar';
import { PracticeAreasSection } from './components/PracticeAreasSection';
import { ProcessSection } from './components/ProcessSection';
import { SocialProofSection } from './components/SocialProofSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';

const FEED_HASHES = new Set(['#feed-de-noticias', '#noticias', '#informativo']);

function readInitialTab(): ActiveTab {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const aba = params.get('aba')?.toLowerCase() ?? '';
  if (FEED_HASHES.has(hash) || aba === 'feed-de-noticias' || aba === 'noticias' || aba === 'informativo') {
    return 'feed';
  }
  return 'home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(readInitialTab);

  useEffect(() => {
    document.title =
      activeTab === 'feed'
        ? 'Feed de Notícias | Fernandes & Lins Assessoria Jurídica'
        : 'Fernandes & Lins Assessoria Jurídica | Advocacia Especializada';
  }, [activeTab]);

  useEffect(() => {
    const syncFromHash = () => {
      if (FEED_HASHES.has(window.location.hash.toLowerCase())) {
        setActiveTab('feed');
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleNavigate = useCallback((nextTab: ActiveTab, sectionHref?: string) => {
    if (nextTab === 'feed') {
      setActiveTab('feed');
      if (window.location.hash !== '#feed-de-noticias') {
        window.history.pushState(null, '', '#feed-de-noticias');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const wasDifferentTab = activeTab !== 'home';
    setActiveTab('home');

    const targetHash = sectionHref && sectionHref.startsWith('#') ? sectionHref : '#inicio';
    window.history.pushState(null, '', targetHash === '#inicio' ? window.location.pathname : targetHash);

    const scrollToTarget = () => {
      if (targetHash === '#inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.querySelector(targetHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (wasDifferentTab) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToTarget);
      });
    } else {
      scrollToTarget();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1E293B]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[#C5A059] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#0B192C]"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      <main id="conteudo-principal">
        {activeTab === 'feed' ? (
          <LegalBriefingTab onBackToHome={() => handleNavigate('home', '#inicio')} />
        ) : (
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 xl:col-start-1 xl:row-start-1">
              <HeroSection />
            </div>

            <LateralNewsFeed onOpenFullFeed={() => handleNavigate('feed')} />

            <div className="min-w-0 xl:col-start-1 xl:row-start-2">
              <PracticeAreasSection />
              <AboutSection />
              <ProcessSection />
              <SocialProofSection />
              <FaqSection />
              <ContactSection />
            </div>
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppFloat />
    </div>
  );
}
