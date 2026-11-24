import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export function WhatsAppFloat() {
  const href = buildGeneralWhatsAppUrl();

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Atendimento imediato via WhatsApp com Fernandes & Lins"
        className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#C5A059] bg-[#0B192C] text-[#F1F5F9] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#13253F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 sm:w-auto sm:gap-2.5 sm:px-5"
      >
        <span
          aria-hidden="true"
          className="whatsapp-halo pointer-events-none absolute inset-0 rounded-full border border-[#C5A059]/70"
        />
        <MessageCircle
          className="relative h-5 w-5 shrink-0 text-[#C5A059]"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <span className="relative hidden text-sm font-medium tracking-[0.01em] text-[#F1F5F9] whitespace-nowrap sm:inline">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
