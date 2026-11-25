import { useState } from 'react';
import {
  Briefcase,
  Building2,
  FileSignature,
  HeartPulse,
  KeyRound,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  Users,
  Wallet,
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
  'key-round': KeyRound,
  'building-2': Building2,
  'heart-pulse': HeartPulse,
  wallet: Wallet,
};

export function PracticeAreasSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

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
            const showPhoto = Boolean(area.image && !failedImages[area.id]);

            if (area.fullWidth) {
              return (
                <article
                  key={area.id}
                  className="group bg-[#F3F1ED] p-7 transition-colors duration-200 hover:bg-[#ECE8E0] sm:p-8 md:col-span-2 lg:col-span-3"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-sm font-medium tracking-[0.08em] text-[#87682A] tabular-nums">
                          {area.number}
                        </span>
                        <Icon
                          className="h-5 w-5 text-[#87682A]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#64748B]">
                          {area.highlights}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-[22px] leading-[1.25] font-medium text-[#1E293B]">
                        {area.title}
                      </h3>
                      <p className="mt-2.5 text-[16px] leading-[1.65] text-[#475569]">
                        {area.description}
                      </p>
                    </div>

                    <div className="shrink-0 border-t border-[#DED9CE] pt-4 lg:border-t-0 lg:pt-0">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Consultar especialista em ${area.title}`}
                        className="inline-flex min-h-[48px] items-center gap-2 border border-[#0B192C]/20 bg-[#F8F7F4] px-6 py-3 text-[15px] font-semibold text-[#0B192C] transition-colors duration-200 hover:border-[#87682A] hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F1ED]"
                      >
                        <span>Agendar consulta</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            }

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

                <div className="mt-6">
                  {showPhoto && area.image && (
                    <figure className="mb-5 overflow-hidden border border-[#DED9CE] bg-[#E8E4DC]">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={area.image}
                          alt={area.imageAlt || area.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [area.id]: true }))
                          }
                          className={`h-full w-full object-cover ${
                            area.imagePosition || 'object-center'
                          } transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                        />
                      </div>
                    </figure>
                  )}

                  <div className="border-t border-[#E5E1D8] pt-4">
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
