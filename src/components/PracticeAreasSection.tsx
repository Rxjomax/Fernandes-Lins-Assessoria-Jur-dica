import {
  Briefcase,
  FileSignature,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { PRACTICE_AREAS, type PracticeArea } from '../data/firmContent';
import { buildAreaWhatsAppUrl } from '../utils/whatsapp';
import { Reveal } from './Reveal';

const ICON_MAP: Record<PracticeArea['icon'], LucideIcon> = {
  'file-signature': FileSignature,
  gavel: ShieldAlert,
  briefcase: Briefcase,
  landmark: Landmark,
  users: Users,
  'shield-check': ShieldCheck,
};

export function PracticeAreasSection() {
  return (
    <section id="areas" className="bg-[#F8F7F4] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
                Áreas de Atuação
              </p>
              <h2 className="mt-3 font-serif text-[28px] leading-[1.18] font-medium text-[#1E293B] text-balance sm:text-[38px]">
                Atuação técnica dedicada às principais demandas patrimoniais, familiares e empresariais.
              </h2>
            </div>
            <p className="max-w-[44ch] text-[16px] leading-[1.65] text-[#475569]">
              Cada área é conduzida com estudo individualizado de provas, documentos e estratégia processual ou extrajudicial.
            </p>
          </div>
        </Reveal>

        {/* Architectural 1px hairline grid */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-[#DED9CE] bg-[#DED9CE] md:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((area) => {
            const Icon = ICON_MAP[area.icon];
            const href = buildAreaWhatsAppUrl(area.title);

            return (
              <article
                key={area.id}
                className="group flex flex-col justify-between bg-[#F8F7F4] p-7 transition-colors duration-200 hover:bg-[#F3F1ED] sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-medium tracking-[0.08em] text-[#87682A] tabular-nums">
                      {area.number}
                    </span>
                    <Icon
                      className="h-5 w-5 text-[#87682A] transition-transform duration-200 group-hover:scale-105"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-6 font-serif text-[22px] leading-[1.25] font-medium text-[#1E293B]">
                    {area.title}
                  </h3>

                  <p className="mt-3.5 text-[16px] leading-[1.65] text-[#475569]">
                    {area.description}
                  </p>

                  <p className="mt-5 text-[13px] text-[#64748B]">{area.highlights}</p>
                </div>

                <div className="mt-7 border-t border-[#E5E1D8] pt-4">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar especialista em ${area.title}`}
                    className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-[#87682A] transition-colors duration-200 hover:text-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F4]"
                  >
                    <span>Consultar especialista</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
