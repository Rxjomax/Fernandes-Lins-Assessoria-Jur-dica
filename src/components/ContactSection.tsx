import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react';
import { FIRM_INFO, PRACTICE_AREAS } from '../data/firmContent';
import {
  buildFormWhatsAppUrl,
  buildGeneralWhatsAppUrl,
  buildSecondaryWhatsAppUrl,
  formatBrazilPhone,
  formatContactMessage,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/whatsapp';
import { Reveal } from './Reveal';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  whatsapp: '',
  area: '',
  summary: '',
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedPayload, setSubmittedPayload] = useState<{
    whatsappUrl: string;
    messagePreview: string;
    clientName: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (submittedPayload && formCardRef.current) {
      formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submittedPayload]);

  const handleFieldChange = (field: keyof ContactFormValues, rawValue: string) => {
    const nextValue = field === 'whatsapp' ? formatBrazilPhone(rawValue) : rawValue;
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const whatsappUrl = buildFormWhatsAppUrl(values);
    const messagePreview = formatContactMessage(values);
    setSubmittedPayload({
      whatsappUrl,
      messagePreview,
      clientName: values.name.trim(),
    });
    setCopied(false);
  };

  const handleCopyMessage = async () => {
    if (!submittedPayload) return;
    try {
      await navigator.clipboard.writeText(submittedPayload.messagePreview);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setSubmittedPayload(null);
    setValues(INITIAL_VALUES);
    setErrors({});
    setCopied(false);
  };

  return (
    <section id="contato" className="bg-[#F8F7F4] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left column: Direct institutional channels */}
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
              Contato &amp; Análise Inicial
            </p>
            <h2 className="mt-3 font-serif text-[28px] leading-[1.18] font-medium text-[#1E293B] text-balance sm:text-[36px]">
              Relate sua situação com tranquilidade e sigilo absoluto.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.65] text-[#475569]">
              Preencha os dados ao lado para preparar sua mensagem estruturada diretamente para o WhatsApp da equipe <strong className="font-semibold text-[#1E293B]">Fernandes &amp; Lins</strong>.
            </p>

            <div className="mt-9 divide-y divide-[#DED9CE] border-y border-[#DED9CE]">
              <div className="py-4">
                <div className="flex items-start gap-3.5">
                  <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-[#87682A]" strokeWidth={1.6} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#64748B]">
                      WhatsApp &amp; Telefones
                    </p>
                    <div className="mt-1 flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1 tabular-nums">
                      <a
                        href={buildGeneralWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-[16px] font-medium text-[#1E293B] transition-colors hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                      >
                        <span>{FIRM_INFO.whatsappDisplay}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-[#87682A]" aria-hidden="true" />
                      </a>
                      <span aria-hidden="true" className="hidden text-[#94A3B8] sm:inline">·</span>
                      <a
                        href={buildSecondaryWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-[16px] font-medium text-[#1E293B] transition-colors hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                      >
                        <span>{FIRM_INFO.whatsappSecondaryDisplay}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-[#87682A]" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${FIRM_INFO.email}`}
                aria-label={`Enviar e-mail para ${FIRM_INFO.email}`}
                className="flex min-h-[60px] items-center justify-between gap-3 py-4 transition-colors hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <Mail className="h-5 w-5 shrink-0 text-[#87682A]" strokeWidth={1.6} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#64748B]">
                      E-mail Institucional
                    </p>
                    <p className="break-all text-[13.5px] font-medium text-[#1E293B] sm:text-[15px]">
                      {FIRM_INFO.email}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#87682A]" aria-hidden="true" />
              </a>

              <a
                href={FIRM_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Endereço do escritório: ${FIRM_INFO.addressLine1}, ${FIRM_INFO.addressLine2}`}
                className="flex min-h-[60px] items-center justify-between gap-4 py-4 transition-colors hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
              >
                <div className="flex items-center gap-3.5">
                  <MapPin className="h-5 w-5 shrink-0 text-[#87682A]" strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#64748B]">
                      Escritório Presencial · Recife
                    </p>
                    <p className="text-[15.5px] font-medium text-[#1E293B]">
                      {FIRM_INFO.addressLine1}
                    </p>
                    <p className="text-[13.5px] text-[#475569]">
                      {FIRM_INFO.addressLine2}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#87682A]" aria-hidden="true" />
              </a>

              <div className="flex items-start gap-3.5 py-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#87682A]" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#64748B]">
                    Horário &amp; Plantão
                  </p>
                  <p className="text-[15px] font-medium text-[#1E293B]">
                    {FIRM_INFO.officeHours}
                  </p>
                  <p className="mt-0.5 text-[13.5px] font-medium text-[#87682A]">
                    {FIRM_INFO.criminalDuty}
                  </p>
                </div>
              </div>

              <a
                href={FIRM_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram Oficial ${FIRM_INFO.instagramHandle}`}
                className="flex min-h-[60px] items-center justify-between gap-4 py-4 transition-colors hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
              >
                <div className="flex items-center gap-3.5">
                  <Instagram className="h-5 w-5 shrink-0 text-[#87682A]" strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#64748B]">
                      Instagram Oficial
                    </p>
                    <p className="text-[16px] font-medium text-[#1E293B]">
                      {FIRM_INFO.instagramHandle}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#87682A]" aria-hidden="true" />
              </a>

              <a
                href={FIRM_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Google e Avaliações: Nota ${FIRM_INFO.googleRating} com ${FIRM_INFO.googleReviewCount} avaliações`}
                className="flex min-h-[60px] items-center justify-between gap-4 py-4 transition-colors hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
              >
                <div className="flex items-center gap-3.5">
                  <Star className="h-5 w-5 shrink-0 text-[#87682A]" strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#64748B]">
                      Google &amp; Avaliações
                    </p>
                    <p className="text-[16px] font-medium text-[#1E293B] tabular-nums">
                      Nota {FIRM_INFO.googleRating} ★ ({FIRM_INFO.googleReviewCount} avaliações)
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#87682A]" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-5 text-[13px] leading-[1.6] text-[#64748B]">
              <span className="font-semibold text-[#475569]">Honorários &amp; Pagamento:</span>{' '}
              {FIRM_INFO.paymentMethods}.
            </p>
          </Reveal>

          {/* Right column: Mobile-first streamlined form */}
          <Reveal className="lg:col-span-7">
            <div
              ref={formCardRef}
              className="scroll-mt-24 border border-[#DED9CE] bg-[#F3F1ED] p-6 sm:p-9"
            >
              {submittedPayload ? (
                <div role="status" aria-live="polite">
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#87682A]">
                    Solicitação Preparada
                  </p>
                  <h3 className="mt-2 font-serif text-[26px] leading-[1.2] font-medium text-[#1E293B]">
                    Tudo pronto, {submittedPayload.clientName}.
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.65] text-[#475569]">
                    Seus dados foram formatados com segurança. Clique no botão abaixo para abrir a conversa no WhatsApp do escritório com o resumo já preenchido.
                  </p>

                  <pre className="mt-6 whitespace-pre-wrap border border-[#DED9CE] bg-[#F8F7F4] p-4 font-sans text-[14.5px] leading-[1.6] text-[#1E293B]">
                    {submittedPayload.messagePreview}
                  </pre>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={submittedPayload.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[50px] w-full flex-1 items-center justify-center gap-2 bg-[#0B192C] px-6 py-3 text-[15px] font-semibold text-[#F1F5F9] transition-colors hover:bg-[#13253F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B192C] focus-visible:ring-offset-2"
                    >
                      <span>Abrir Conversa no WhatsApp</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex min-h-[50px] items-center justify-center gap-2 border border-[#0B192C]/30 bg-transparent px-5 py-3 text-[15px] font-medium text-[#1E293B] transition-colors hover:border-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B192C]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-[#87682A]" aria-hidden="true" />
                          <span>Mensagem copiada</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copiar resumo</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-[#475569] underline underline-offset-4 hover:text-[#1E293B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                  >
                    Editar dados ou preparar nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-[#1E293B]"
                      >
                        Nome completo
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-contact-name' : undefined}
                        placeholder="Ex.: Mariana Ribeiro"
                        className="mt-2 block min-h-[48px] w-full border border-[#CFCAC0] bg-[#F8F7F4] px-4 py-3 text-[16px] text-[#1E293B] placeholder:text-[#64748B] transition-colors focus:border-[#0B192C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                      />
                      {errors.name && (
                        <p id="error-contact-name" role="alert" className="mt-1.5 text-sm font-medium text-[#991B1B]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-whatsapp"
                        className="block text-sm font-semibold text-[#1E293B]"
                      >
                        WhatsApp (com DDD)
                      </label>
                      <input
                        id="contact-whatsapp"
                        name="whatsapp"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        value={values.whatsapp}
                        onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                        aria-invalid={Boolean(errors.whatsapp)}
                        aria-describedby={errors.whatsapp ? 'error-contact-whatsapp' : undefined}
                        placeholder="(81) 99999-9999"
                        className="mt-2 block min-h-[48px] w-full border border-[#CFCAC0] bg-[#F8F7F4] px-4 py-3 text-[16px] text-[#1E293B] placeholder:text-[#64748B] transition-colors focus:border-[#0B192C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                      />
                      {errors.whatsapp && (
                        <p id="error-contact-whatsapp" role="alert" className="mt-1.5 text-sm font-medium text-[#991B1B]">
                          {errors.whatsapp}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-area"
                      className="block text-sm font-semibold text-[#1E293B]"
                    >
                      Área de interesse
                    </label>
                    <select
                      id="contact-area"
                      name="area"
                      required
                      value={values.area}
                      onChange={(e) => handleFieldChange('area', e.target.value)}
                      aria-invalid={Boolean(errors.area)}
                      aria-describedby={errors.area ? 'error-contact-area' : undefined}
                      className="mt-2 block min-h-[48px] w-full border border-[#CFCAC0] bg-[#F8F7F4] px-4 py-3 text-[16px] text-[#1E293B] transition-colors focus:border-[#0B192C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                    >
                      <option value="">Selecione a área jurídica</option>
                      {PRACTICE_AREAS.map((area) => (
                        <option key={area.id} value={area.title}>
                          {area.title}
                        </option>
                      ))}
                      <option value="Outra demanda jurídica">Outra demanda jurídica</option>
                    </select>
                    {errors.area && (
                      <p id="error-contact-area" role="alert" className="mt-1.5 text-sm font-medium text-[#991B1B]">
                        {errors.area}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-summary"
                      className="block text-sm font-semibold text-[#1E293B]"
                    >
                      Breve resumo da situação
                    </label>
                    <textarea
                      id="contact-summary"
                      name="summary"
                      rows={4}
                      required
                      value={values.summary}
                      onChange={(e) => handleFieldChange('summary', e.target.value)}
                      aria-invalid={Boolean(errors.summary)}
                      aria-describedby={errors.summary ? 'error-contact-summary' : undefined}
                      placeholder="Conte em poucas linhas o ocorrido ou sua principal dúvida jurídica..."
                      className="mt-2 block w-full border border-[#CFCAC0] bg-[#F8F7F4] px-4 py-3 text-[16px] leading-[1.6] text-[#1E293B] placeholder:text-[#64748B] transition-colors focus:border-[#0B192C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                    />
                    {errors.summary && (
                      <p id="error-contact-summary" role="alert" className="mt-1.5 text-sm font-medium text-[#991B1B]">
                        {errors.summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 bg-[#C5A059] px-7 py-3 text-[16px] font-semibold text-[#0B192C] transition-colors duration-200 hover:bg-[#B08D48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B192C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F1ED]"
                    >
                      <span>Preparar Mensagem para WhatsApp</span>
                      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                    </button>
                    <p className="mt-3 text-center text-[13px] text-[#475569]">
                      Suas informações são protegidas pelo sigilo profissional previsto no Estatuto da Advocacia.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
