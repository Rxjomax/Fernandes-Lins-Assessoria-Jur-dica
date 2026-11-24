import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/firmContent';
import { Reveal } from './Reveal';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="duvidas" className="border-y border-[#E5E1D8] bg-[#F3F1ED] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
              Perguntas Frequentes
            </p>
            <h2 className="mt-3 font-serif text-[28px] leading-[1.18] font-medium text-[#1E293B] text-balance sm:text-[36px]">
              Dúvidas comuns antes do primeiro atendimento.
            </h2>
            <p className="mt-4 max-w-[38ch] text-[16px] leading-[1.65] text-[#475569]">
              Reunimos respostas objetivas sobre nosso modelo de trabalho digital e presencial. Se preferir, envie sua pergunta diretamente pelo formulário abaixo.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <div className="divide-y divide-[#DED9CE] border-y border-[#DED9CE]">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                const panelId = `panel-${item.id}`;
                const buttonId = `trigger-${item.id}`;

                return (
                  <div key={item.id}>
                    <h3 className="font-sans">
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(item.id)}
                        className="flex min-h-[60px] w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-medium leading-[1.4] text-[#1E293B] transition-colors duration-200 hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A] focus-visible:ring-inset sm:text-[18px]"
                      >
                        <span className="font-serif text-[19px] sm:text-[21px]">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#87682A] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="pb-6 pr-2 sm:pr-8"
                    >
                      <p className="max-w-[65ch] text-[16px] leading-[1.7] text-[#475569]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
