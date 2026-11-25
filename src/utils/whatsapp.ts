import { FIRM_INFO } from '../data/firmContent';

export interface ContactFormValues {
  name: string;
  whatsapp: string;
  area: string;
  summary: string;
}

export interface ContactFormErrors {
  name?: string;
  whatsapp?: string;
  area?: string;
  summary?: string;
}

export function extractDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Formats Brazilian phone numbers into (00) 0000-0000 or (00) 00000-0000.
 */
export function formatBrazilPhone(raw: string): string {
  const digits = extractDigits(raw).slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function buildWhatsAppUrl(message: string, phoneNumber: string = FIRM_INFO.whatsappNumber): string {
  const sanitizedPhone = extractDigits(phoneNumber);
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${sanitizedPhone}?text=${encoded}`;
}

export function buildGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    'Olá, equipe Fernandes & Lins Assessoria Jurídica. Gostaria de agendar uma análise do meu caso.'
  );
}

export function buildSecondaryWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    'Olá, equipe Fernandes & Lins Assessoria Jurídica. Gostaria de agendar uma análise do meu caso.',
    FIRM_INFO.whatsappSecondaryNumber
  );
}

export function buildAreaWhatsAppUrl(areaTitle: string): string {
  return buildWhatsAppUrl(
    `Olá, equipe Fernandes & Lins! Gostaria de falar com um especialista sobre ${areaTitle}.`
  );
}

export function formatContactMessage(values: ContactFormValues): string {
  const cleanName = values.name.trim();
  const cleanWhatsapp = formatBrazilPhone(values.whatsapp);
  const cleanArea = values.area.trim();
  const cleanSummary = values.summary.trim();

  return [
    'Olá, equipe Fernandes & Lins Assessoria Jurídica!',
    'Solicito uma análise inicial pelo site:',
    '',
    `*Nome:* ${cleanName}`,
    `*WhatsApp:* ${cleanWhatsapp}`,
    `*Área de interesse:* ${cleanArea}`,
    `*Resumo do caso:* ${cleanSummary}`,
  ].join('\n');
}

export function buildFormWhatsAppUrl(values: ContactFormValues): string {
  return buildWhatsAppUrl(formatContactMessage(values));
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.name.trim().length < 3) {
    errors.name = 'Informe seu nome completo para identificarmos o atendimento.';
  }

  const phoneDigits = extractDigits(values.whatsapp);
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.whatsapp = 'Informe um WhatsApp válido com DDD (10 ou 11 dígitos).';
  }

  if (!values.area.trim()) {
    errors.area = 'Selecione a área jurídica relacionada à sua demanda.';
  }

  if (values.summary.trim().length < 15) {
    errors.summary = 'Escreva um breve resumo do seu caso (mínimo de 15 caracteres).';
  }

  return errors;
}
