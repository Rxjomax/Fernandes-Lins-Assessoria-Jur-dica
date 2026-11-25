import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';
import {
  BCB_SERIES,
  OFFICIAL_FEED_URLS,
  fetchEconomicIndicators,
  fetchMigalhasNews,
  fetchStfNews,
  fetchStjNews,
  mergeAndFilterNews,
  type CourtNewsItem,
  type EconomicIndicator,
  type TribunalFilter,
} from '../utils/legalFeed';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

interface LegalBriefingTabProps {
  onBackToHome: () => void;
}

const AUTO_REFRESH_MS = 10 * 60 * 1000;

interface NewsPhotoProps {
  src?: string;
  alt?: string;
  href: string;
  aspectClass?: string;
  containerClass?: string;
}

function NewsPhoto({
  src,
  alt,
  href,
  aspectClass = 'aspect-[16/9]',
  containerClass = 'mt-4 max-w-[540px]',
}: NewsPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <figure className={containerClass}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden border border-[#DED9CE] bg-[#E8E4DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
      >
        <div className={`${aspectClass} w-full overflow-hidden`}>
          <img
            src={src}
            alt={alt || 'Imagem ilustrativa da notícia jurídica'}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </a>
    </figure>
  );
}

export function LegalBriefingTab({ onBackToHome }: LegalBriefingTabProps) {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([]);
  const [indicatorsLoading, setIndicatorsLoading] = useState(true);
  const [indicatorsError, setIndicatorsError] = useState<string | null>(null);

  const [stjNews, setStjNews] = useState<CourtNewsItem[]>([]);
  const [stfNews, setStfNews] = useState<CourtNewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsWarning, setNewsWarning] = useState<string | null>(null);

  const [migalhasNews, setMigalhasNews] = useState<CourtNewsItem[]>([]);
  const [migalhasLoading, setMigalhasLoading] = useState(true);
  const [migalhasError, setMigalhasError] = useState<string | null>(null);

  const [tribunalFilter, setTribunalFilter] = useState<TribunalFilter>('ALL');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const loadAll = useCallback(async (signal?: AbortSignal) => {
    setIndicatorsLoading(true);
    setNewsLoading(true);
    setMigalhasLoading(true);
    setIndicatorsError(null);
    setNewsWarning(null);
    setMigalhasError(null);

    const [stjResult, stfResult, migalhasResult, bcbResult] = await Promise.allSettled([
      fetchStjNews(signal, 8),
      fetchStfNews(signal, 8),
      fetchMigalhasNews(signal, 6),
      fetchEconomicIndicators(signal),
    ]);

    if (signal?.aborted) return;

    const nextStj = stjResult.status === 'fulfilled' ? stjResult.value : [];
    const nextStf = stfResult.status === 'fulfilled' ? stfResult.value : [];
    setStjNews(nextStj);
    setStfNews(nextStf);

    if (nextStj.length === 0 && nextStf.length === 0) {
      setNewsWarning(
        'Os feeds públicos do STJ e do STF estão temporariamente indisponíveis. Você pode acessar os portais oficiais diretamente pelos links abaixo.'
      );
    } else if (nextStj.length === 0) {
      setNewsWarning('Feed do STJ temporariamente indisponível; exibindo notícias oficiais do STF.');
    } else if (nextStf.length === 0) {
      setNewsWarning('Feed do STF temporariamente indisponível; exibindo notícias oficiais do STJ.');
    }
    setNewsLoading(false);

    if (migalhasResult.status === 'fulfilled' && migalhasResult.value.length > 0) {
      setMigalhasNews(migalhasResult.value);
    } else {
      setMigalhasNews([]);
      setMigalhasError(
        'Não foi possível carregar as notícias do Portal Migalhas agora. Acesse o portal diretamente pelo link acima.'
      );
    }
    setMigalhasLoading(false);

    if (bcbResult.status === 'fulfilled') {
      setIndicators(bcbResult.value);
    } else {
      setIndicators([]);
      setIndicatorsError(
        'Não foi possível carregar os indicadores do Banco Central agora. Tente atualizar em instantes.'
      );
    }
    setIndicatorsLoading(false);

    const now = new Date();
    setLastUpdated(
      now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    );
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadAll(controller.signal);

    const intervalId = window.setInterval(() => {
      void loadAll();
    }, AUTO_REFRESH_MS);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [loadAll]);

  const allFreshNews = mergeAndFilterNews(stjNews, stfNews, 'ALL');
  const stjFreshCount = allFreshNews.filter((item) => item.tribunal === 'STJ').length;
  const stfFreshCount = allFreshNews.filter((item) => item.tribunal === 'STF').length;
  const filteredNews =
    tribunalFilter === 'ALL'
      ? allFreshNews
      : allFreshNews.filter((item) => item.tribunal === tribunalFilter);

  const isRefreshing = indicatorsLoading || newsLoading || migalhasLoading;
  const whatsappHref = buildGeneralWhatsAppUrl();

  const jumpToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F8F7F4] text-[#1E293B]">
      {/* Compact authoritative header banner */}
      <section className="bg-[#0B192C] text-[#F1F5F9]">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#CBD5E1] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Voltar para a página do escritório</span>
          </button>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.16em] uppercase text-[#C5A059]">
                <span aria-hidden="true" className="h-px w-8 bg-[#C5A059]" />
                <span>Feed de Notícias · STJ, STF &amp; Migalhas</span>
              </div>
              <h1 className="mt-4 font-serif text-[28px] leading-[1.15] font-medium text-[#F1F5F9] text-balance sm:text-[40px]">
                Feed de Notícias Jurídicas e Indicadores Econômicos.
              </h1>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-[#CBD5E1]">
                Publicações atuais dos portais oficiais do STJ, do STF e do Portal Migalhas, acompanhadas pelos principais índices econômicos do Banco Central.
              </p>

              {/* Quiet in-page section jump navigation */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-4 text-sm">
                <button
                  type="button"
                  onClick={() => jumpToSection('secao-tribunais')}
                  className="inline-flex min-h-[44px] items-center font-medium text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  STJ e STF
                </button>
                <span aria-hidden="true" className="text-[#C5A059]/60">·</span>
                <button
                  type="button"
                  onClick={() => jumpToSection('secao-migalhas')}
                  className="inline-flex min-h-[44px] items-center font-medium text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  Portal Migalhas
                </button>
                <span aria-hidden="true" className="text-[#C5A059]/60">·</span>
                <button
                  type="button"
                  onClick={() => jumpToSection('secao-indicadores')}
                  className="inline-flex min-h-[44px] items-center font-medium text-[#F1F5F9] transition-colors hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  Indicadores BCB
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center lg:flex-col lg:items-end">
              <button
                type="button"
                onClick={() => void loadAll()}
                disabled={isRefreshing}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-[#C5A059]/70 px-5 py-2.5 text-sm font-medium text-[#F1F5F9] transition-colors hover:bg-[#C5A059] hover:text-[#0B192C] disabled:opacity-60 sm:w-auto whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <RefreshCw
                  className={`h-4 w-4 shrink-0 ${isRefreshing ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                <span>{isRefreshing ? 'Atualizando…' : 'Atualizar notícias'}</span>
              </button>
              {lastUpdated && !isRefreshing && (
                <p className="text-xs text-[#CBD5E1]/80 tabular-nums">
                  Atualizado às {lastUpdated} · Fontes diretas
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Live STJ & STF News Feed (Broadsheet list with photo below each article) */}
      <section
        id="secao-tribunais"
        aria-labelledby="heading-tribunais"
        className="scroll-mt-20 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
                Tribunais Superiores · Últimas Publicações
              </p>
              <h2
                id="heading-tribunais"
                className="mt-2 font-serif text-[26px] leading-[1.2] font-medium text-[#1E293B] sm:text-[32px]"
              >
                Notícias Atuais do STJ e do STF
              </h2>
            </div>

            {/* Interactive Segmented Filter Control */}
            <div
              role="group"
              aria-label="Filtrar notícias por tribunal"
              className="inline-flex w-full items-center border border-[#CFCAC0] bg-[#F3F1ED] p-1 sm:w-auto"
            >
              {(
                [
                  { id: 'ALL', label: `Todos (${allFreshNews.length})` },
                  { id: 'STJ', label: `STJ (${stjFreshCount})` },
                  { id: 'STF', label: `STF (${stfFreshCount})` },
                ] as const
              ).map((tab) => {
                const active = tribunalFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTribunalFilter(tab.id)}
                    className={`min-h-[44px] flex-1 px-4 text-sm font-semibold transition-colors whitespace-nowrap sm:flex-initial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A] tabular-nums ${
                      active
                        ? 'bg-[#0B192C] text-[#F1F5F9]'
                        : 'text-[#475569] hover:text-[#1E293B]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {newsWarning && (
            <p
              role="status"
              className="mt-6 border border-[#DED9CE] bg-[#F3F1ED] px-5 py-3.5 text-sm text-[#475569]"
            >
              {newsWarning}
            </p>
          )}

          {newsLoading ? (
            <div
              aria-busy="true"
              aria-label="Carregando notícias atuais do STJ e STF"
              className="mt-8 divide-y divide-[#DED9CE] border-y border-[#DED9CE]"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="py-8">
                  <div className="h-3.5 w-40 bg-[#E5E1D8]" />
                  <div className="mt-3 h-6 w-4/5 bg-[#E5E1D8]" />
                  <div className="mt-3 h-4 w-full max-w-2xl bg-[#E5E1D8]/70" />
                  <div className="mt-4 aspect-[16/9] w-full max-w-[540px] bg-[#E5E1D8]/60" />
                </div>
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="mt-8 border border-[#DED9CE] bg-[#F3F1ED] p-7">
              <p className="text-[16px] text-[#475569]">
                Nenhuma notícia disponível para este filtro no momento.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <a
                  href={OFFICIAL_FEED_URLS.stjPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#87682A] underline underline-offset-4 hover:text-[#0B192C]"
                >
                  <span>Abrir Portal do STJ</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={OFFICIAL_FEED_URLS.stfPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#87682A] underline underline-offset-4 hover:text-[#0B192C]"
                >
                  <span>Abrir Portal do STF</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-8 divide-y divide-[#DED9CE] border-y border-[#DED9CE]">
              {filteredNews.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-1 gap-4 py-8 sm:py-9 lg:grid-cols-12 lg:items-start lg:gap-8"
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase lg:col-span-3 lg:pt-1.5">
                    <span className="text-[#87682A]">{item.tribunal}</span>
                    <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                    <span className="font-medium tracking-normal normal-case text-[#475569] tabular-nums">
                      {item.publishedLabel}
                    </span>
                  </div>

                  <div className="lg:col-span-9">
                    <h3 className="font-serif text-[20px] leading-[1.3] font-medium text-[#1E293B] sm:text-[22px]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                      >
                        {item.title}
                      </a>
                    </h3>

                    <p className="mt-2.5 max-w-[68ch] text-[15.5px] leading-[1.65] text-[#475569]">
                      {item.summary}
                    </p>

                    <NewsPhoto
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      href={item.url}
                      aspectClass="aspect-[16/9]"
                      containerClass="mt-4 max-w-[540px]"
                    />

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ler notícia completa no portal do ${item.tribunal}: ${item.title}`}
                      className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#87682A] transition-colors hover:text-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                    >
                      <span>Ler na fonte oficial ({item.tribunal})</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Portal Migalhas (Distinct 2-column hairline editorial grid with photo under each article) */}
      <section
        id="secao-migalhas"
        aria-labelledby="heading-migalhas"
        className="scroll-mt-20 border-t border-[#E5E1D8] bg-[#F3F1ED] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
                Portal Migalhas · Migalhas Quentes
              </p>
              <h2
                id="heading-migalhas"
                className="mt-2 font-serif text-[26px] leading-[1.2] font-medium text-[#1E293B] sm:text-[32px]"
              >
                Destaques do Portal Migalhas
              </h2>
            </div>

            <a
              href={OFFICIAL_FEED_URLS.migalhasPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#87682A] transition-colors hover:text-[#0B192C] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
            >
              <span>Abrir migalhas.com.br</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {migalhasLoading ? (
            <div
              aria-busy="true"
              aria-label="Carregando notícias do Portal Migalhas"
              className="mt-8 grid grid-cols-1 gap-px border border-[#DED9CE] bg-[#DED9CE] md:grid-cols-2"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-[#F8F7F4] p-6 sm:p-8">
                  <div className="h-3.5 w-32 bg-[#E5E1D8]" />
                  <div className="mt-3 h-6 w-11/12 bg-[#E5E1D8]" />
                  <div className="mt-3 h-4 w-full bg-[#EFECE6]" />
                  <div className="mt-5 aspect-[16/10] w-full bg-[#E5E1D8]/70" />
                </div>
              ))}
            </div>
          ) : migalhasError ? (
            <div
              role="alert"
              className="mt-8 border border-[#DED9CE] bg-[#F8F7F4] p-6 sm:p-8"
            >
              <p className="text-[16px] text-[#475569]">{migalhasError}</p>
              <a
                href={OFFICIAL_FEED_URLS.migalhasPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#87682A] underline underline-offset-4 hover:text-[#0B192C]"
              >
                <span>Acessar Migalhas Quentes</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-px border border-[#DED9CE] bg-[#DED9CE] md:grid-cols-2">
              {migalhasNews.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between bg-[#F8F7F4] p-6 transition-colors duration-200 hover:bg-[#F5F3EE] sm:p-8"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
                      <span className="text-[#87682A]">Migalhas</span>
                      <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                      <span className="font-medium tracking-normal normal-case text-[#475569] tabular-nums">
                        {item.publishedLabel}
                      </span>
                    </div>

                    <h3 className="mt-3 font-serif text-[20px] leading-[1.3] font-medium text-[#1E293B] sm:text-[21px]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-[#87682A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                      >
                        {item.title}
                      </a>
                    </h3>

                    <p className="mt-2.5 text-[15px] leading-[1.65] text-[#475569]">
                      {item.summary}
                    </p>
                  </div>

                  <div>
                    <NewsPhoto
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      href={item.url}
                      aspectClass="aspect-[16/10]"
                      containerClass="mt-5 w-full"
                    />

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ler matéria completa no Portal Migalhas: ${item.title}`}
                      className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#87682A] transition-colors hover:text-[#0B192C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                    >
                      <span>Ler no Portal Migalhas</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Economic Indicators (Banco Central do Brasil — 3-column hairline grid) */}
      <section
        id="secao-indicadores"
        aria-labelledby="heading-indicadores"
        className="scroll-mt-20 border-t border-[#E5E1D8] bg-[#F8F7F4] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#87682A]">
                Banco Central do Brasil · SGS
              </p>
              <h2
                id="heading-indicadores"
                className="mt-2 font-serif text-[26px] leading-[1.2] font-medium text-[#1E293B] sm:text-[32px]"
              >
                Indicadores Econômicos Atualizados
              </h2>
            </div>
            <a
              href={OFFICIAL_FEED_URLS.bcbPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#87682A] transition-colors hover:text-[#0B192C] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
            >
              <span>Fonte oficial (BCB)</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {indicatorsLoading ? (
            <div
              aria-busy="true"
              aria-label="Carregando indicadores econômicos"
              className="mt-8 grid grid-cols-1 gap-px border border-[#DED9CE] bg-[#DED9CE] sm:grid-cols-2 lg:grid-cols-3"
            >
              {BCB_SERIES.map((series) => (
                <div key={series.id} className="bg-[#F8F7F4] p-6 sm:p-7">
                  <div className="h-4 w-36 bg-[#E5E1D8]" />
                  <div className="mt-4 h-9 w-32 bg-[#E5E1D8]" />
                  <div className="mt-4 h-4 w-full bg-[#EFECE6]" />
                </div>
              ))}
            </div>
          ) : indicatorsError ? (
            <div
              role="alert"
              className="mt-8 border border-[#DED9CE] bg-[#F3F1ED] p-6 sm:p-8"
            >
              <p className="text-[16px] font-medium text-[#1E293B]">{indicatorsError}</p>
              <button
                type="button"
                onClick={() => void loadAll()}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 border border-[#0B192C] px-5 text-sm font-semibold text-[#0B192C] transition-colors hover:bg-[#0B192C] hover:text-[#F1F5F9]"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-px border border-[#DED9CE] bg-[#DED9CE] sm:grid-cols-2 lg:grid-cols-3">
              {indicators.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between bg-[#F8F7F4] p-6 transition-colors duration-200 hover:bg-[#F3F1ED] sm:p-7"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-sans text-[13px] font-semibold tracking-[0.06em] uppercase text-[#475569]">
                        {item.label}
                      </h3>
                      <span className="text-xs text-[#64748B] tabular-nums whitespace-nowrap">
                        Ref. {item.referenceDate}
                      </span>
                    </div>

                    <p className="mt-4 font-serif text-[32px] leading-none font-medium text-[#0B192C] tabular-nums sm:text-[36px]">
                      {item.valueFormatted}
                    </p>
                  </div>

                  <p className="mt-5 border-t border-[#E5E1D8] pt-3.5 text-[14px] leading-[1.55] text-[#475569]">
                    {item.legalNote}
                  </p>
                </article>
              ))}
            </div>
          )}

          {/* Official portals footer strip + discreet consultation CTA */}
          <div className="mt-12 flex flex-col gap-6 border-t border-[#DED9CE] pt-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p className="font-serif text-[20px] text-[#1E293B]">
                Dúvidas sobre como uma decisão recente ou índice econômico impacta seu caso?
              </p>
              <p className="text-sm text-[#475569]">
                Fontes diretas:{' '}
                <a
                  href={OFFICIAL_FEED_URLS.stjPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#87682A] underline underline-offset-2 hover:text-[#0B192C]"
                >
                  stj.jus.br
                </a>{' '}
                ·{' '}
                <a
                  href={OFFICIAL_FEED_URLS.stfPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#87682A] underline underline-offset-2 hover:text-[#0B192C]"
                >
                  noticias.stf.jus.br
                </a>{' '}
                ·{' '}
                <a
                  href={OFFICIAL_FEED_URLS.migalhasPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#87682A] underline underline-offset-2 hover:text-[#0B192C]"
                >
                  migalhas.com.br
                </a>{' '}
                ·{' '}
                <a
                  href={OFFICIAL_FEED_URLS.bcbPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#87682A] underline underline-offset-2 hover:text-[#0B192C]"
                >
                  bcb.gov.br
                </a>
              </p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 bg-[#0B192C] px-7 py-3 text-[15px] font-semibold text-[#F1F5F9] transition-colors hover:bg-[#13253F] sm:w-auto whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <span>Falar com Advogado</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
