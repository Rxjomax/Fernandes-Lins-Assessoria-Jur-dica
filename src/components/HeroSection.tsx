import { useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { FIRM_INFO } from '../data/firmContent';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

const heroDelay = (ms: number): CSSProperties =>
  ({ '--hero-delay': `${ms}ms` }) as CSSProperties;

export function HeroSection() {
  const [imgFailed, setImgFailed] = useState(false);
  const whatsappHref = buildGeneralWhatsAppUrl();

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[#0B192C] text-[#F1F5F9]"
    >
      {/* Architectural backdrop photograph with gentle Ken Burns settle */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {!imgFailed ? (
          <img
            src={FIRM_INFO.heroImage}
            alt="Recepção arquitetônica do escritório Fernandes & Lins com painéis de madeira nobre, pedra natural e iluminação em latão"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="hero-backdrop-drift h-full w-full object-cover object-center opacity-55 sm:opacity-65"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-[radial-gradient(circle_at_75%_25%,rgba(197,160,89,0.16),transparent_55%)]"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/90 to-[#0B192C]/55 lg:to-[#0B192C]/38"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-[#0B192C]/45"
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            {/* Editorial kicker without pill enclosure */}
            <div
              style={heroDelay(40)}
              className="hero-enter flex items-center gap-3 text-xs sm:text-[13px] font-medium tracking-[0.16em] uppercase text-[#C5A059]"
            >
              <span aria-hidden="true" className="hero-line-draw h-px w-8 bg-[#C5A059]" />
              <span>Assessoria Jurídica Especializada · {FIRM_INFO.since}</span>
            </div>

            <h1
              style={heroDelay(130)}
              className="hero-enter mt-5 font-serif text-[30px] leading-[1.14] font-medium tracking-[-0.01em] text-[#F1F5F9] text-balance sm:text-[42px] lg:text-[52px]"
            >
              Defesa estratégica e soluções jurídicas sob medida para proteger seus direitos e seu patrimônio.
            </h1>

            <p
              style={heroDelay(220)}
              className="hero-enter mt-6 max-w-[58ch] text-[16px] sm:text-[18px] leading-[1.65] text-[#CBD5E1]"
            >
              Advocacia Cível, Criminal, Trabalhista e Previdenciária. Atendimento ágil, transparente e humanizado em Recife (PE) e online em todo o Brasil.
            </p>

            {/* Primary & Secondary CTAs */}
            <div
              style={heroDelay(300)}
              className="hero-enter mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-gold-sheen inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 bg-[#C5A059] px-7 py-3 text-[15px] sm:text-base font-semibold text-[#0B192C] transition-colors duration-200 hover:bg-[#B08D48] sm:w-auto whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B192C]"
              >
                <span>Agendar Análise do Meu Caso</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>

              <a
                href="#areas"
                className="inline-flex min-h-[52px] w-full items-center justify-center border border-[#F1F5F9]/30 px-7 py-3 text-[15px] sm:text-base font-medium text-[#F1F5F9] transition-all duration-200 hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-white/[0.03] sm:w-auto whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B192C]"
              >
                Conhecer Áreas de Atuação
              </a>
            </div>

            {/* Unboxed credibility strip */}
            <div
              style={heroDelay(390)}
              className="hero-enter mt-12 border-t border-white/15 pt-6"
            >
              <ul className="flex flex-col gap-2 text-[13.5px] text-[#CBD5E1] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3.5 sm:gap-y-2">
                <li className="font-medium text-[#F1F5F9]">Sede em Recife – PE · Todo o Brasil</li>
                <li className="tabular-nums sm:border-l sm:border-[#C5A059]/45 sm:pl-3.5">
                  Nota {FIRM_INFO.googleRating} ★ no Google ({FIRM_INFO.googleReviewCount} avaliações)
                </li>
                <li className="sm:border-l sm:border-[#C5A059]/45 sm:pl-3.5">Sigilo Absoluto</li>
              </ul>
            </div>

            {/* Compact firm watermark lockup on mobile/tablet below the fold line */}
            <div
              style={heroDelay(440)}
              className="hero-enter mt-7 flex items-center gap-4 border-t border-[#C5A059]/20 pt-5 lg:hidden"
            >
              <img
                src={FIRM_INFO.logoImage}
                alt="Logotipo oficial Fernandes & Lins Assessoria Jurídica"
                referrerPolicy="no-referrer"
                className="h-14 w-14 shrink-0 rounded-full border border-[#C5A059]/50 object-cover opacity-90"
              />
              <div className="min-w-0">
                <p className="font-serif text-[17px] tracking-[0.06em] uppercase text-[#F1F5F9]">
                  {FIRM_INFO.brandShort}
                </p>
                <p className="text-[11.5px] font-medium tracking-[0.14em] uppercase text-[#C5A059]">
                  Assessoria Jurídica · {FIRM_INFO.since}
                </p>
                <p className="mt-0.5 text-[12px] text-[#CBD5E1] tabular-nums">
                  OAB/PE 57.411 · OAB/PE 50.250
                </p>
              </div>
            </div>
          </div>

          {/* Architectural firm watermark & official logo emblem integrated over the reception wall */}
          <aside
            aria-label="Marca institucional Fernandes & Lins Assessoria Jurídica"
            style={heroDelay(260)}
            className="hero-enter relative hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:self-center"
          >
            <div className="relative flex w-full flex-col items-center px-6 py-9 text-center bg-[radial-gradient(circle_at_center,rgba(7,17,31,0.72)_0%,rgba(7,17,31,0.34)_64%,transparent_100%)]">
              {/* Subtle architectural brass corner ticks */}
              <span aria-hidden="true" className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-[#C5A059]/45" />
              <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-[#C5A059]/45" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#C5A059]/45" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#C5A059]/45" />

              {/* Concentric hairline seal with official circular logo */}
              <div className="relative flex items-center justify-center rounded-full border border-[#C5A059]/25 p-3">
                <div className="rounded-full border border-[#C5A059]/45 p-1.5">
                  <img
                    src={FIRM_INFO.logoImage}
                    alt="Logotipo oficial Fernandes & Lins Assessoria Jurídica"
                    referrerPolicy="no-referrer"
                    className="h-24 w-24 rounded-full object-cover opacity-90"
                  />
                </div>
              </div>

              <p className="mt-5 font-serif text-[21px] leading-tight font-medium tracking-[0.12em] uppercase text-[#F1F5F9]/95">
                Fernandes &amp; Lins
              </p>

              <span aria-hidden="true" className="my-3 h-px w-14 bg-[#C5A059]/65" />

              <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-[#C5A059]">
                Assessoria Jurídica
              </p>

              <p className="mt-2.5 text-[12px] tracking-[0.06em] text-[#CBD5E1]/90">
                Recife – PE · {FIRM_INFO.since}
              </p>

              <p className="mt-1 text-[11.5px] tracking-[0.08em] text-[#CBD5E1]/80 tabular-nums">
                OAB/PE 57.411 · OAB/PE 50.250
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
