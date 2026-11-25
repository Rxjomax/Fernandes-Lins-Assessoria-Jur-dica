import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { FIRM_INFO, NAV_LINKS } from '../data/firmContent';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export type ActiveTab = 'home' | 'feed';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab, sectionHref?: string) => void;
}

export function Navbar({ activeTab, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappHref = buildGeneralWhatsAppUrl();

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    tab: ActiveTab,
    href: string
  ) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(tab, href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C] border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line editorial wordmark with official FL monogram */}
        <a
          href="#inicio"
          onClick={(e) => handleLinkClick(e, 'home', '#inicio')}
          className="inline-flex items-center gap-2.5 font-serif text-[19px] sm:text-[21px] font-medium tracking-[0.04em] text-[#F1F5F9] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B192C]"
        >
          <img
            src={FIRM_INFO.logoImage}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded-full border border-[#C5A059]/40 object-cover shrink-0"
          />
          <span>{FIRM_INFO.brandShort}</span>
        </a>

        {/* Zone 2: Concise single-line navigation links (Desktop) */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-6 xl:gap-7"
        >
          {NAV_LINKS.map((link) => {
            const isCurrentTab =
              link.tab === 'feed' && activeTab === 'feed';
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isCurrentTab ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, link.tab, link.href)}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 py-2 border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B192C] ${
                  isCurrentTab
                    ? 'border-[#C5A059] text-[#F1F5F9]'
                    : 'border-transparent text-[#CBD5E1] hover:border-[#C5A059] hover:text-[#F1F5F9]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action (Desktop) + Mobile quick controls */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center min-h-[42px] px-5 border border-[#C5A059]/70 text-sm font-medium text-[#F1F5F9] transition-colors duration-200 hover:bg-[#C5A059] hover:text-[#0B192C] hover:border-[#C5A059] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B192C]"
          >
            Falar com Advogado
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com advogado pelo WhatsApp"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center border border-[#C5A059]/60 text-[#C5A059] transition-colors duration-200 hover:bg-[#C5A059] hover:text-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-[#F1F5F9] border border-white/15 transition-colors duration-200 hover:border-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Menu móvel"
          className="lg:hidden border-t border-white/10 bg-[#0B192C] px-5 pb-6 pt-3"
        >
          <p className="text-xs tracking-[0.14em] uppercase text-[#C5A059] pb-3 border-b border-white/10">
            Assessoria Jurídica
          </p>
          <ul className="divide-y divide-white/10">
            {NAV_LINKS.map((link) => {
              const isCurrentTab =
                link.tab === 'feed' && activeTab === 'feed';
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isCurrentTab ? 'page' : undefined}
                    onClick={(e) => handleLinkClick(e, link.tab, link.href)}
                    className={`flex min-h-[48px] items-center justify-between text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                      isCurrentTab
                        ? 'text-[#C5A059]'
                        : 'text-[#F1F5F9] hover:text-[#C5A059]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="text-[#C5A059] text-sm">
                      →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-5 flex min-h-[48px] w-full items-center justify-center bg-[#C5A059] px-5 text-base font-semibold text-[#0B192C] transition-colors hover:bg-[#B08D48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Falar com Advogado
          </a>
        </nav>
      )}
    </header>
  );
}
