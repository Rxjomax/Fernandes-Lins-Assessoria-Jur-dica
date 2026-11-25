import { ExternalLink, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { FIRM_INFO, NAV_LINKS } from '../data/firmContent';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import type { ActiveTab } from './Navbar';

interface FooterProps {
  onNavigate: (tab: ActiveTab, sectionHref?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B192C] text-[#CBD5E1]">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/15 pb-12 md:grid-cols-12">
          {/* Firm identity, real address & OAB registration slots */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5">
              <img
                src={FIRM_INFO.logoImage}
                alt="Monograma oficial Fernandes & Lins Assessoria Jurídica"
                className="h-12 w-12 rounded-full border border-[#C5A059]/45 object-cover shrink-0"
              />
              <div>
                <p className="font-serif text-[22px] leading-tight font-medium tracking-[0.04em] text-[#F1F5F9]">
                  FERNANDES &amp; LINS
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-[0.18em] uppercase text-[#C5A059]">
                  Assessoria Jurídica · {FIRM_INFO.since}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.65] text-[#CBD5E1]">
              Advocacia Cível, Criminal, Trabalhista, Previdenciária e Familiar com sede no Recife (PE) e atuação digital em todo o Brasil.
            </p>

            <div className="mt-5 flex items-start gap-2.5 text-[14px] text-[#CBD5E1]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" aria-hidden="true" />
              <p>
                {FIRM_INFO.addressLine1}
                <br />
                {FIRM_INFO.addressLine2}
                <br />
                <span className="text-[13px] text-[#94A3B8]">
                  {FIRM_INFO.officeHours} · Plantão Criminal 24h
                </span>
              </p>
            </div>

            {/* Official partners' OAB/PE registrations */}
            <div className="mt-6 border-t border-white/10 pt-4 text-[13px] text-[#CBD5E1]">
              <p className="font-semibold text-[#F1F5F9]">Registros Profissionais (OAB/PE)</p>
              <ul className="mt-2 space-y-1.5 tabular-nums">
                {FIRM_INFO.partnersOab.map((member) => (
                  <li key={member.oab} className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium text-[#F1F5F9]">{member.name}</span>
                    <span aria-hidden="true" className="text-[#C5A059]">·</span>
                    <span className="text-[#CBD5E1]">{member.oab}</span>
                    <span className="text-[12px] text-[#94A3B8]">({member.role})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation mirror */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
              Navegação
            </p>
            <ul className="mt-4 space-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.tab, link.href);
                    }}
                    className="inline-flex min-h-[44px] items-center text-[15px] text-[#CBD5E1] transition-colors hover:text-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#duvidas"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home', '#duvidas');
                  }}
                  className="inline-flex min-h-[44px] items-center text-[15px] text-[#CBD5E1] transition-colors hover:text-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Official links */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
              Canais Oficiais
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center justify-between border-b border-white/10 py-2 text-[15px] text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span className="inline-flex items-center gap-2.5 tabular-nums">
                  <MessageCircle className="h-4 w-4 text-[#C5A059]" aria-hidden="true" />
                  <span>WhatsApp {FIRM_INFO.whatsappDisplay}</span>
                </span>
                <ExternalLink className="h-4 w-4 text-[#C5A059]" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${FIRM_INFO.email}`}
                className="flex min-h-[44px] items-center justify-between gap-2 border-b border-white/10 py-2 text-[14px] text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span className="inline-flex min-w-0 items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-[#C5A059]" aria-hidden="true" />
                  <span className="truncate">{FIRM_INFO.email}</span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#C5A059]" aria-hidden="true" />
              </a>

              <a
                href={FIRM_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center justify-between border-b border-white/10 py-2 text-[15px] text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Instagram className="h-4 w-4 text-[#C5A059]" aria-hidden="true" />
                  <span>Instagram {FIRM_INFO.instagramHandle}</span>
                </span>
                <ExternalLink className="h-4 w-4 text-[#C5A059]" aria-hidden="true" />
              </a>

              <a
                href={FIRM_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center justify-between border-b border-white/10 py-2 text-[15px] text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span className="tabular-nums">
                  Google Avaliações ({FIRM_INFO.googleRating} ★ · {FIRM_INFO.googleReviewCount})
                </span>
                <ExternalLink className="h-4 w-4 text-[#C5A059]" aria-hidden="true" />
              </a>

              <a
                href={FIRM_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center justify-between border-b border-white/10 py-2 text-[15px] text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span>Ver localização no Google Maps</span>
                <ExternalLink className="h-4 w-4 text-[#C5A059]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory OAB ethics disclaimer */}
        <div className="mt-8 space-y-4">
          <p className="max-w-4xl text-[13px] leading-[1.65] text-[#CBD5E1]/90">
            <strong className="font-semibold text-[#F1F5F9]">Aviso Legal e Ético (OAB):</strong>{' '}
            {FIRM_INFO.oabDisclaimer}
          </p>
          <p className="text-[13px] text-[#94A3B8]">
            © {year} {FIRM_INFO.brandFull}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
