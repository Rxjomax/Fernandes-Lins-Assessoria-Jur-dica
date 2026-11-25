import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Newspaper,
  Pause,
  Play,
} from 'lucide-react';
import {
  OFFICIAL_FEED_URLS,
  buildInterleavedNewsQueue,
  fetchMigalhasNews,
  fetchStfNews,
  fetchStjNews,
  getNextFrameIndex,
  type CourtNewsItem,
  type NewsSourceCode,
} from '../utils/legalFeed';

interface LateralNewsFeedProps {
  onOpenFullFeed: () => void;
}

const ROTATION_INTERVAL_MS = 6500;
const AUTO_REFRESH_MS = 10 * 60 * 1000;

const SOURCE_LABELS: Record<NewsSourceCode, string> = {
  STF: 'STF',
  STJ: 'STJ',
  MIGALHAS: 'Portal Migalhas',
};

function formatFrameCounter(index: number, total: number): string {
  const current = String(index + 1).padStart(2, '0');
  const max = String(total).padStart(2, '0');
  return `${current} / ${max}`;
}

interface FrameImageProps {
  src?: string;
  alt?: string;
  sourceLabel: string;
}

function FrameImage({ src, alt, sourceLabel }: FrameImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center border border-[#DED9CE] bg-[#0B192C] px-4 text-center">
        <div className="flex flex-col items-center gap-2 text-[#CBD5E1]">
          <Newspaper className="h-5 w-5 text-[#C5A059]" strokeWidth={1.6} aria-hidden="true" />
          <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#C5A059]">
            {sourceLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] w-full overflow-hidden border border-[#DED9CE] bg-[#E8E4DC] xl:aspect-[16/9]">
      <img
        src={src}
        alt={alt || `Fotografia da notícia publicada por ${sourceLabel}`}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function LateralNewsFeed({ onOpenFullFeed }: LateralNewsFeedProps) {
  const [items, setItems] = useState<CourtNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const loadFeed = useCallback(async (signal?: AbortSignal) => {
    const [stjResult, stfResult, migalhasResult] = await Promise.allSettled([
      fetchStjNews(signal, 6),
      fetchStfNews(signal, 6),
      fetchMigalhasNews(signal, 6),
    ]);

    if (signal?.aborted) return;

    const stj = stjResult.status === 'fulfilled' ? stjResult.value : [];
    const stf = stfResult.status === 'fulfilled' ? stfResult.value : [];
    const migalhas = migalhasResult.status === 'fulfilled' ? migalhasResult.value : [];

    const combined = buildInterleavedNewsQueue(stj, stf, migalhas, 12);
    setItems(combined);
    setLoadFailed(combined.length === 0);
    setActiveIndex((prev) => (combined.length > 0 ? prev % combined.length : 0));
    setLoading(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadFeed(controller.signal);

    const refreshId = window.setInterval(() => {
      void loadFeed();
    }, AUTO_REFRESH_MS);

    return () => {
      controller.abort();
      window.clearInterval(refreshId);
    };
  }, [loadFeed]);

  const total = items.length;
  const effectivePaused = isPaused || isHoveredOrFocused || prefersReducedMotion;

  useEffect(() => {
    if (total <= 1 || effectivePaused) return;

    const timerId = window.setInterval(() => {
      setActiveIndex((prev) => getNextFrameIndex(prev, total, 1));
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [total, effectivePaused]);

  const handleStep = (step: number) => {
    if (total <= 1) return;
    setActiveIndex((prev) => getNextFrameIndex(prev, total, step));
  };

  const currentItem = items[activeIndex];
  const nextUpItems =
    total > 1
      ? [
          items[getNextFrameIndex(activeIndex, total, 1)],
          ...(total > 2 ? [items[getNextFrameIndex(activeIndex, total, 2)]] : []),
        ]
      : [];

  return (
    <aside
      aria-label="Feed de notícias jurídico lateral"
      onMouseEnter={() => setIsHoveredOrFocused(true)}
      onMouseLeave={() => setIsHoveredOrFocused(false)}
      onFocus={() => setIsHoveredOrFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsHoveredOrFocused(false);
        }
      }}
      className="border-y border-[#DED9CE] bg-[#F3F1ED] xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:border-y-0 xl:border-l xl:bg-[#F3F1ED]"
    >
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 xl:sticky xl:top-16 xl:max-h-[calc(100vh-10rem)] xl:max-w-none xl:overflow-y-auto xl:px-5 xl:py-5">
        {/* Rail editorial header + frame controls */}
        <div className="flex items-center justify-between gap-2 border-b border-[#DED9CE] pb-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#87682A] whitespace-nowrap">
              Feed de Notícias
            </p>
            <p className="mt-0.5 text-[11.5px] text-[#475569] whitespace-nowrap">
              STJ · STF · Migalhas
            </p>
          </div>

          {total > 1 && (
            <div className="flex shrink-0 items-center gap-1" role="group" aria-label="Controles dos quadros de notícias">
              <span
                data-testid="lateral-news-counter"
                className="mr-1 text-[11px] font-medium text-[#475569] tabular-nums whitespace-nowrap"
              >
                {formatFrameCounter(activeIndex, total)}
              </span>

              <button
                type="button"
                onClick={() => handleStep(-1)}
                aria-label="Notícia anterior"
                className="inline-flex h-11 w-11 items-center justify-center border border-[#CFCAC0] bg-[#F8F7F4] text-[#1E293B] transition-colors hover:border-[#0B192C] hover:bg-[#0B192C] hover:text-[#F1F5F9] xl:h-7 xl:w-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
              >
                <ChevronLeft className="h-4 w-4 xl:h-3.5 xl:w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-pressed={isPaused}
                aria-label={isPaused ? 'Retomar rotação das notícias' : 'Pausar rotação das notícias'}
                className={`inline-flex h-11 w-11 items-center justify-center border transition-colors xl:h-7 xl:w-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A] ${
                  isPaused
                    ? 'border-[#0B192C] bg-[#0B192C] text-[#F1F5F9]'
                    : 'border-[#CFCAC0] bg-[#F8F7F4] text-[#1E293B] hover:border-[#0B192C] hover:bg-[#0B192C] hover:text-[#F1F5F9]'
                }`}
              >
                {isPaused ? (
                  <Play className="h-3.5 w-3.5 xl:h-3 xl:w-3" aria-hidden="true" />
                ) : (
                  <Pause className="h-3.5 w-3.5 xl:h-3 xl:w-3" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleStep(1)}
                aria-label="Próxima notícia"
                className="inline-flex h-11 w-11 items-center justify-center border border-[#CFCAC0] bg-[#F8F7F4] text-[#1E293B] transition-colors hover:border-[#0B192C] hover:bg-[#0B192C] hover:text-[#F1F5F9] xl:h-7 xl:w-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
              >
                <ChevronRight className="h-4 w-4 xl:h-3.5 xl:w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Active Rotating News Frame (entire frame is a direct link to the official article) */}
        <div className="mt-3.5">
          {loading ? (
            <div
              aria-busy="true"
              aria-label="Carregando últimas notícias jurídicas"
              className="border border-[#DED9CE] bg-[#F8F7F4] p-4"
            >
              <div className="h-3 w-36 bg-[#E5E1D8]" />
              <div className="mt-3 aspect-[16/10] w-full bg-[#E5E1D8] xl:aspect-[16/9]" />
              <div className="mt-3.5 h-5 w-11/12 bg-[#E5E1D8]" />
              <div className="mt-2 h-4 w-4/5 bg-[#EFECE6]" />
            </div>
          ) : loadFailed || !currentItem ? (
            <div className="border border-[#DED9CE] bg-[#F8F7F4] p-4">
              <p className="text-[14px] leading-[1.55] text-[#475569]">
                Notícias em atualização. Acesse diretamente os portais oficiais:
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-semibold text-[#87682A]">
                <a
                  href={OFFICIAL_FEED_URLS.stjPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1 underline underline-offset-4 hover:text-[#0B192C]"
                >
                  <span>STJ</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={OFFICIAL_FEED_URLS.stfPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1 underline underline-offset-4 hover:text-[#0B192C]"
                >
                  <span>STF</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={OFFICIAL_FEED_URLS.migalhasPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1 underline underline-offset-4 hover:text-[#0B192C]"
                >
                  <span>Migalhas</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <a
              key={currentItem.id}
              href={currentItem.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="lateral-news-active-frame"
              aria-label={`Abrir notícia de ${SOURCE_LABELS[currentItem.tribunal]}: ${currentItem.title}`}
              className="news-frame-enter group block border border-[#DED9CE] bg-[#F8F7F4] p-4 transition-colors duration-200 hover:border-[#87682A] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A] xl:p-3.5"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
                <span className="text-[#87682A]">{SOURCE_LABELS[currentItem.tribunal]}</span>
                <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                <span className="font-medium tracking-normal normal-case text-[#475569] tabular-nums">
                  {currentItem.publishedLabel}
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center xl:grid-cols-1 xl:gap-2.5">
                <div className="sm:col-span-5 xl:col-span-1">
                  <FrameImage
                    src={currentItem.imageUrl}
                    alt={currentItem.imageAlt}
                    sourceLabel={SOURCE_LABELS[currentItem.tribunal]}
                  />
                </div>

                <div className="sm:col-span-7 xl:col-span-1">
                  <h2 className="font-serif text-[18px] leading-[1.28] font-medium text-[#1E293B] transition-colors duration-200 group-hover:text-[#87682A] line-clamp-3 xl:text-[16.5px]">
                    {currentItem.title}
                  </h2>

                  <p className="mt-1.5 text-[14px] leading-[1.5] text-[#475569] line-clamp-2 xl:text-[13px]">
                    {currentItem.summary}
                  </p>

                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#87682A] transition-colors group-hover:text-[#0B192C]">
                    <span>Clique para ler a notícia</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          )}

          {/* Hairline frame progress strip */}
          {total > 1 && (
            <div
              aria-hidden="true"
              className="mt-2 flex items-center gap-1"
            >
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Ir para notícia ${idx + 1}`}
                  className="group/bar flex h-3.5 flex-1 items-center focus:outline-none"
                >
                  <span
                    className={`block h-[2px] w-full transition-colors duration-200 ${
                      idx === activeIndex
                        ? 'bg-[#87682A]'
                        : 'bg-[#CFCAC0] group-hover/bar:bg-[#0B192C]/50'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming headlines (desktop rail quick queue — clickable directly to the official article) */}
        {nextUpItems.length > 0 && (
          <div className="mt-3 hidden border-t border-[#DED9CE] pt-3 xl:block">
            <p className="text-[10.5px] font-semibold tracking-[0.14em] uppercase text-[#475569]">
              A seguir no feed
            </p>
            <ul className="mt-2 divide-y divide-[#DED9CE]">
              {nextUpItems.map((item) => (
                <li key={item.id} className="py-2 first:pt-0 last:pb-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87682A]"
                  >
                    <p className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-[#87682A]">
                      {SOURCE_LABELS[item.tribunal]}
                      <span className="ml-1.5 font-normal tracking-normal normal-case text-[#64748B] tabular-nums">
                        · {item.publishedLabel}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-[1.35] font-medium text-[#1E293B] transition-colors group-hover:text-[#87682A] line-clamp-2">
                      {item.title}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action link to open full Feed de Notícias tab (with BCB indicators & full lists) */}
        <div className="mt-3.5 border-t border-[#DED9CE] pt-3">
          <button
            type="button"
            onClick={onOpenFullFeed}
            className="inline-flex min-h-[44px] w-full items-center justify-between gap-2 border border-[#0B192C] bg-[#0B192C] px-4 py-2 text-[13px] font-semibold text-[#F1F5F9] transition-colors hover:bg-[#13253F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] xl:min-h-[38px]"
          >
            <span className="whitespace-nowrap">Abrir feed completo e indicadores</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#C5A059]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
