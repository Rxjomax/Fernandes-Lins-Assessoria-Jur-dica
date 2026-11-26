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
            Advocacia Cível, Criminal, Trabalhista, Previdenciária e Familiar. Atendimento ágil, transparente e humanizado em Recife (PE) e online em todo o Brasil.
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
            <ul className="flex flex-col gap-1.5 text-[14px] text-[#CBD5E1] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
              <li className="font-medium text-[#F1F5F9]">Sede em Recife – PE · Atuação em todo o Brasil</li>
              <li aria-hidden="true" className="hidden text-[#C5A059] sm:inline">·</li>
              <li className="tabular-nums">Nota {FIRM_INFO.googleRating} ★ no Google ({FIRM_INFO.googleReviewCount} avaliações)</li>
              <li aria-hidden="true" className="hidden text-[#C5A059] sm:inline">·</li>
              <li>Sigilo Absoluto</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
