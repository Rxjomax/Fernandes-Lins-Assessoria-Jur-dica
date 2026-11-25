import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { FIRM_INFO, FIRM_PILLARS } from '../data/firmContent';
import { Reveal } from './Reveal';

export function AboutSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const markFailed = (src: string) => {
    setFailedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <section id="sobre" className="border-y border-[#E5E1D8] bg-[#F3F1ED] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Real editorial documentary photos of the partners and courtroom practice */}
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#DED9CE] bg-[#0B192C]">
                {!failedImages[FIRM_INFO.partnersMainPhoto] ? (
                  <img
                    src={FIRM_INFO.partnersMainPhoto}
                    alt="Dr. Marciel Fernandes e Dra. Fabíola Lins, sócios administradores da Fernandes & Lins Assessoria Jurídica, em seu escritório"
                    referrerPolicy="no-referrer"
                    onError={() => markFailed(FIRM_INFO.partnersMainPhoto)}
                    className="h-full w-full object-cover object-[50%_30%]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col justify-end p-8 text-[#F1F5F9]">
                    <p className="font-serif text-2xl">{FIRM_INFO.brandShort}</p>
                    <p className="mt-2 text-sm text-[#CBD5E1]">Assessoria Jurídica · {FIRM_INFO.since}</p>
                  </div>
                )}
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 border-b border-[#DED9CE] pb-3 text-[13px] text-[#475569]">
                <span className="font-serif italic">Dr. Marciel Fernandes &amp; Dra. Fabíola Lins</span>
                <span className="whitespace-nowrap font-medium text-[#87682A]">{FIRM_INFO.since}</span>
              </figcaption>
            </figure>

            {/* Documentary 3-photo strip from Instagram practice */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {FIRM_INFO.galleryPhotos.map((photo) => (
                <figure key={photo.src} className="flex flex-col">
                  <div className="aspect-[4/5] w-full overflow-hidden border border-[#DED9CE] bg-[#0B192C]">
                    {!failedImages[photo.src] ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        onError={() => markFailed(photo.src)}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-end p-2 text-[11px] text-[#CBD5E1]">
                        {photo.caption}
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-1.5 text-[12px] leading-snug text-[#475569]">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>

          {/* Institutional narrative & 3 pillars */}
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
              Sobre o Escritório · {FIRM_INFO.since}
            </p>
            <h2 className="mt-3 font-serif text-[28px] leading-[1.18] font-medium text-[#1E293B] text-balance sm:text-[38px]">
              Advocacia próxima, combativa e transparente — do Recife para todo o Brasil.
            </h2>

            <div className="mt-6 max-w-[62ch] space-y-4 text-[16px] leading-[1.7] text-[#334155]">
              <p>
                Fundada em <strong className="font-semibold text-[#1E293B]">2019</strong>, a{' '}
                <strong className="font-semibold text-[#1E293B]">Fernandes &amp; Lins Assessoria Jurídica</strong>{' '}
                é conduzida de perto por <strong className="font-semibold text-[#1E293B]">Dr. Marciel Fernandes</strong> e{' '}
                <strong className="font-semibold text-[#1E293B]">Dra. Fabíola Lins</strong>, unindo presença ativa nos tribunais, estudo técnico rigoroso e acolhimento humano em cada atendimento.
              </p>
              <p>
                Com atuação especializada nas áreas <strong className="font-semibold text-[#1E293B]">Cível, Criminal, Trabalhista e Previdenciária</strong>, atendemos clientes presencialmente em nossa sede no bairro do Jordão, em Recife (PE), e de forma 100% digital em todo o território nacional — sempre sem juridiquês e com transparência sobre cada etapa do processo.
              </p>
            </div>

            {/* Official Equipe Técnica credentials */}
            <div className="mt-6 grid grid-cols-1 gap-px border border-[#DED9CE] bg-[#DED9CE] sm:grid-cols-2">
              {FIRM_INFO.partnersOab.map((member) => (
                <div key={member.oab} className="bg-[#F8F7F4] px-5 py-4">
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#64748B]">
                    {member.group}
                  </p>
                  <p className="mt-1 font-serif text-[18px] font-medium text-[#1E293B]">
                    {member.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold tracking-[0.1em] uppercase text-[#87682A] tabular-nums">
                    {member.role} · {member.oab}
                  </p>
                </div>
              ))}
            </div>

            {/* Real location & office hours inline strip */}
            <div className="mt-6 space-y-2 text-[14.5px] text-[#475569]">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#87682A]" strokeWidth={1.75} aria-hidden="true" />
                <p>
                  <span className="font-semibold text-[#1E293B]">Sede Presencial:</span>{' '}
                  {FIRM_INFO.addressLine1} · {FIRM_INFO.addressLine2}
                </p>
              </div>
              <p className="pl-6.5 text-[13.5px] text-[#475569]">
                <span className="font-semibold text-[#1E293B]">Horário:</span> {FIRM_INFO.officeHours} ·{' '}
                <span className="font-medium text-[#87682A]">{FIRM_INFO.criminalDuty}</span>
              </p>
            </div>

            {/* 3 Pillars separated by clean 1px hairlines */}
            <div className="mt-9 divide-y divide-[#DED9CE] border-y border-[#DED9CE]">
              {FIRM_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="flex items-baseline gap-3 sm:col-span-5">
                    <span className="font-serif text-sm font-medium text-[#87682A] tabular-nums">
                      {pillar.number}
                    </span>
                    <h3 className="font-serif text-[20px] font-medium leading-[1.25] text-[#1E293B]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-[15.5px] leading-[1.65] text-[#475569] sm:col-span-7">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
