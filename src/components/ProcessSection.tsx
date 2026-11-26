import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/firmContent';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Reveal } from './Reveal';

export function ProcessSection() {
  const whatsappHref = buildGeneralWhatsAppUrl();

  return (
    <section id="como-funciona" className="bg-[#0B192C] py-16 text-[#F1F5F9] sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
                Como Funciona o Atendimento
              </p>
              <h2 className="mt-3 font-serif text-[28px] leading-[1.18] font-medium text-[#F1F5F9] text-balance sm:text-[38px]">
                Um caminho claro, confidencial e sem burocracia desde o primeiro contato.
              </h2>
            </div>
            <p className="max-w-[42ch] text-[16px] leading-[1.65] text-[#CBD5E1]">
              Mesmo que seja a sua primeira vez contratando um advogado, conduzimos cada etapa com objetividade.
            </p>
          </div>
        </Reveal>

        {/* 3 Numbered Editorial Steps */}
        <ol className="mt-14 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.number} className="relative flex flex-col">
              <Reveal delay={index * 110}>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[42px] leading-none font-normal text-[#C5A059] tabular-nums sm:text-[50px]">
                    {step.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="reveal-rule h-px flex-1 bg-gradient-to-r from-[#C5A059]/60 to-white/15"
                  />
                </div>

                <h3 className="mt-6 font-serif text-[22px] leading-[1.25] font-medium text-[#F1F5F9]">
                  {step.title}
                </h3>

                <p className="mt-3.5 max-w-[38ch] text-[16px] leading-[1.68] text-[#CBD5E1]">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={160}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
            <p className="text-[15.5px] text-[#CBD5E1]">
              Prefere iniciar a conversa agora mesmo com um dos sócios?
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-gold-sheen inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 bg-[#C5A059] px-7 py-3 text-[15px] font-semibold text-[#0B192C] transition-colors duration-200 hover:bg-[#B08D48] sm:w-auto whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B192C]"
            >
              <span>Iniciar Atendimento pelo WhatsApp</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
