export type TribunalCode = 'STJ' | 'STF';
export type NewsSourceCode = TribunalCode | 'MIGALHAS';
export type TribunalFilter = 'ALL' | TribunalCode;

export interface CourtNewsItem {
  id: string;
  tribunal: NewsSourceCode;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  imageAlt?: string;
  publishedAt: number; // epoch ms (0 if unknown)
  publishedLabel: string;
}

export type IndicatorFormat =
  | 'percent-year'
  | 'percent-month'
  | 'percent-12m'
  | 'currency-brl'
  | 'fx-brl';

export interface BcbSeriesConfig {
  id: string;
  seriesCode: number;
  label: string;
  legalNote: string;
  format: IndicatorFormat;
}

export interface EconomicIndicator {
  id: string;
  label: string;
  valueFormatted: string;
  referenceDate: string;
  legalNote: string;
}

export const MAX_NEWS_AGE_DAYS = 30;

export const BCB_SERIES: BcbSeriesConfig[] = [
  {
    id: 'selic',
    seriesCode: 432,
    label: 'Taxa Selic (Meta)',
    legalNote: 'Referência central em juros moratórios e atualização judicial.',
    format: 'percent-year',
  },
  {
    id: 'ipca-12m',
    seriesCode: 13522,
    label: 'IPCA (Acum. 12 meses)',
    legalNote: 'Índice oficial de inflação usado em correções monetárias.',
    format: 'percent-12m',
  },
  {
    id: 'inpc',
    seriesCode: 188,
    label: 'INPC (Mensal)',
    legalNote: 'Indexador de benefícios do INSS, pensões e acordos trabalhistas.',
    format: 'percent-month',
  },
  {
    id: 'igpm',
    seriesCode: 189,
    label: 'IGP-M (Mensal)',
    legalNote: 'Índice recorrente em reajustes de contratos e locações.',
    format: 'percent-month',
  },
  {
    id: 'salario-minimo',
    seriesCode: 1619,
    label: 'Salário Mínimo',
    legalNote: 'Piso previdenciário, referência do BPC/LOAS e verbas alimentares.',
    format: 'currency-brl',
  },
  {
    id: 'dolar-ptax',
    seriesCode: 1,
    label: 'Dólar PTAX (Venda)',
    legalNote: 'Cotação oficial do Banco Central para contratos em moeda estrangeira.',
    format: 'fx-brl',
  },
];

export const OFFICIAL_FEED_URLS = {
  stjRss: 'https://res.stj.jus.br/hrestp-c-portalp/RSS.xml',
  stjPortal: 'https://www.stj.jus.br/sites/portalp/Inicio',
  // Official daily news custom post type (postsnoticias) with embedded featured press photos
  stfApi:
    'https://noticias.stf.jus.br/wp-json/wp/v2/postsnoticias?per_page=10&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=id,date,link,title,excerpt,_links,_embedded',
  stfPortal: 'https://noticias.stf.jus.br/',
  migalhasQuentes: 'https://www.migalhas.com.br/quentes',
  migalhasPortal: 'https://www.migalhas.com.br/quentes',
  bcbPortal: 'https://www3.bcb.gov.br/sgspub/',
} as const;

const PT_MONTH_MAP: Record<string, number> = {
  jan: 0,
  fev: 1,
  feb: 1,
  mar: 2,
  abr: 3,
  apr: 3,
  mai: 4,
  may: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  aug: 7,
  set: 8,
  sep: 8,
  out: 9,
  oct: 9,
  nov: 10,
  dez: 11,
  dec: 11,
};

const PT_MONTH_SHORT = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

const NAMED_HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  laquo: '«',
  raquo: '»',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
  hellip: '…',
};

export function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, num: string) => {
      const code = Number.parseInt(num, 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : '';
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : '';
    })
    .replace(/&([a-zA-Z]+);/g, (full, name: string) => {
      const mapped = NAMED_HTML_ENTITIES[name.toLowerCase()];
      return mapped ?? full;
    });
}

export function stripHtmlAndClean(raw: string): string {
  const withoutScripts = raw
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const withoutTags = withoutScripts.replace(/<[^>]+>/g, ' ');
  return decodeHtmlEntities(withoutTags)
    .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();
}

export function truncateText(text: string, maxLength = 210): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const cut = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.replace(/[.,;:\s]+$/, '')}…`;
}

export function sanitizeExternalUrl(rawUrl: string, baseUrl?: string): string | null {
  try {
    const trimmed = rawUrl.trim();
    if (!trimmed) return null;
    const parsed = baseUrl ? new URL(trimmed, baseUrl) : new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export function resolveMigalhasImageUrl(rawSrc: string): string | undefined {
  const clean = decodeHtmlEntities(rawSrc).trim();
  if (!clean) return undefined;

  // Upgrade Migalhas medproc thumbnail URLs to the original high-res Migalhas image when available
  const medprocMatch = clean.match(
    /^https?:\/\/medproc\.migalhas\.com\.br\/(https?)__([^/]+?)__SL__(.+?)\._PROC_[^/]+$/i
  );
  if (medprocMatch) {
    const [, protocol, host, encodedPath] = medprocMatch;
    const rebuilt = `${protocol}://${host}/${encodedPath.replace(/__SL__/g, '/')}`;
    const safe = sanitizeExternalUrl(rebuilt);
    if (safe) return safe;
  }

  return sanitizeExternalUrl(clean, 'https://www.migalhas.com.br') ?? undefined;
}

export function formatShortDatePtBr(timestamp: number): string {
  if (!Number.isFinite(timestamp) || timestamp <= 0) return 'Recente';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'Recente';
  const day = String(date.getDate()).padStart(2, '0');
  const month = PT_MONTH_SHORT[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  if (hours === '00' && minutes === '00') {
    return `${day} ${month} ${year}`;
  }
  return `${day} ${month} ${year} · ${hours}h${minutes}`;
}

/**
 * Parses STJ RSS pubDate ("Qua, nov 25 2026 16:32:00"), STF ISO ("2026-11-25T17:04:11"),
 * and Migalhas dates ("25.nov.2026").
 */
export function parseCourtDate(rawDate: string): number {
  const cleaned = rawDate.trim();
  if (!cleaned) return 0;

  // Match ISO local datetime from STF WP-JSON: "2026-11-25T17:04:11"
  const isoLocalMatch = cleaned.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/
  );
  if (isoLocalMatch) {
    return new Date(
      Number.parseInt(isoLocalMatch[1], 10),
      Number.parseInt(isoLocalMatch[2], 10) - 1,
      Number.parseInt(isoLocalMatch[3], 10),
      Number.parseInt(isoLocalMatch[4], 10),
      Number.parseInt(isoLocalMatch[5], 10),
      isoLocalMatch[6] ? Number.parseInt(isoLocalMatch[6], 10) : 0
    ).getTime();
  }

  // Match Migalhas / Brazilian dot or space format: "25.nov.2026" or "25 nov 2026"
  const dmyMatch = cleaned.match(/^(\d{1,2})[\s./-]+([A-Za-zÀ-ÿ]{3})[\s./-]+(\d{4})$/i);
  if (dmyMatch) {
    const monthIndex = PT_MONTH_MAP[dmyMatch[2].toLowerCase()];
    if (monthIndex !== undefined) {
      return new Date(
        Number.parseInt(dmyMatch[3], 10),
        monthIndex,
        Number.parseInt(dmyMatch[1], 10),
        0,
        0,
        0
      ).getTime();
    }
  }

  const nativeParsed = Date.parse(cleaned);
  if (!Number.isNaN(nativeParsed)) return nativeParsed;

  // Match Brazilian STJ format: "Qua, nov 25 2026 16:32:00"
  const stjMatch = cleaned.match(
    /(?:[A-Za-zÀ-ÿ]+,\s*)?([A-Za-zÀ-ÿ]{3})\s+(\d{1,2})\s+(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/i
  );
  if (stjMatch) {
    const monthIndex = PT_MONTH_MAP[stjMatch[1].toLowerCase()];
    if (monthIndex !== undefined) {
      const day = Number.parseInt(stjMatch[2], 10);
      const year = Number.parseInt(stjMatch[3], 10);
      const hour = stjMatch[4] ? Number.parseInt(stjMatch[4], 10) : 12;
      const minute = stjMatch[5] ? Number.parseInt(stjMatch[5], 10) : 0;
      const second = stjMatch[6] ? Number.parseInt(stjMatch[6], 10) : 0;
      return new Date(year, monthIndex, day, hour, minute, second).getTime();
    }
  }

  return 0;
}

function extractXmlTag(block: string, tagName: string): string {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, 'i');
  const match = block.match(regex);
  if (!match) return '';
  return match[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/i, '$1').trim();
}

function isFilenameAlt(text: string): boolean {
  return /\.(jpe?g|png|webp|gif)$/i.test(text.trim()) || /^PORTAL_/i.test(text.trim());
}

export function parseStjRssXml(xmlText: string, limit = 8): CourtNewsItem[] {
  const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  const parsed: CourtNewsItem[] = [];

  for (let i = 0; i < itemMatches.length; i += 1) {
    const block = itemMatches[i];
    const title = stripHtmlAndClean(extractXmlTag(block, 'title'));
    const rawLink = extractXmlTag(block, 'link') || extractXmlTag(block, 'guid');
    const url = sanitizeExternalUrl(rawLink);
    if (!title || !url) continue;

    const rawContent = extractXmlTag(block, 'content:encoded');
    const rawDesc = extractXmlTag(block, 'description');
    const contentClean = stripHtmlAndClean(rawContent);
    const descClean = stripHtmlAndClean(rawDesc);

    const summarySource =
      contentClean.length > 35
        ? contentClean
        : descClean && descClean.toLowerCase() !== title.toLowerCase()
          ? descClean
          : 'Leia a íntegra do informativo publicado no portal oficial do Superior Tribunal de Justiça.';

    // Extract press photo from <media:content> or first <img> inside content/description
    const mediaUrlMatch = block.match(/<media:content[^>]+url=["']([^"']+)["']/i);
    const imgTagMatch = (rawContent || rawDesc).match(/<img[^>]+>/i);
    const imgSrcMatch = imgTagMatch?.[0].match(/src=["']([^"']+)["']/i);
    const imgAltMatch = imgTagMatch?.[0].match(/alt=["']([^"']+)["']/i);

    const rawImage = mediaUrlMatch?.[1] || imgSrcMatch?.[1] || '';
    const imageUrl = rawImage
      ? sanitizeExternalUrl(decodeHtmlEntities(rawImage), 'https://www.stj.jus.br') ?? undefined
      : undefined;

    const rawAlt = imgAltMatch ? stripHtmlAndClean(imgAltMatch[1]) : '';
    const imageAlt = rawAlt && !isFilenameAlt(rawAlt) ? rawAlt : `Imagem da notícia do STJ: ${title}`;

    const publishedAt = parseCourtDate(extractXmlTag(block, 'pubDate'));

    parsed.push({
      id: `stj-${i}-${publishedAt || title.slice(0, 16)}`,
      tribunal: 'STJ',
      title,
      summary: truncateText(summarySource, 200),
      url,
      imageUrl,
      imageAlt: imageUrl ? imageAlt : undefined,
      publishedAt,
      publishedLabel: formatShortDatePtBr(publishedAt),
    });
  }

  return parsed
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, limit);
}

export interface StfWpPost {
  id: number | string;
  date?: string;
  link?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: {
          medium_large?: { source_url?: string };
          large?: { source_url?: string };
        };
      };
    }>;
  };
}

export function parseStfPostsJson(posts: StfWpPost[], limit = 8): CourtNewsItem[] {
  const parsed: CourtNewsItem[] = [];

  for (const post of posts) {
    const title = stripHtmlAndClean(post.title?.rendered ?? '');
    const url = sanitizeExternalUrl(post.link ?? '');
    if (!title || !url) continue;

    const excerptClean = stripHtmlAndClean(post.excerpt?.rendered ?? '')
      .replace(/\[\u2026\]|\[\.\.\.\]/g, '…')
      .trim();
    const publishedAt = parseCourtDate(post.date ?? '');

    const media = post._embedded?.['wp:featuredmedia']?.[0];
    const rawMediaUrl =
      media?.media_details?.sizes?.medium_large?.source_url ||
      media?.media_details?.sizes?.large?.source_url ||
      media?.source_url ||
      '';
    const imageUrl = sanitizeExternalUrl(rawMediaUrl) ?? undefined;
    const cleanedAlt = stripHtmlAndClean(media?.alt_text ?? '');
    const imageAlt = imageUrl
      ? cleanedAlt || `Fotografia oficial do STF: ${title}`
      : undefined;

    parsed.push({
      id: `stf-${post.id}`,
      tribunal: 'STF',
      title,
      summary: truncateText(
        excerptClean ||
          'Leia a íntegra da notícia oficial publicada no portal do Supremo Tribunal Federal.',
        200
      ),
      url,
      imageUrl,
      imageAlt,
      publishedAt,
      publishedLabel: formatShortDatePtBr(publishedAt),
    });
  }

  return parsed
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, limit);
}

export function parseMigalhasHtml(htmlText: string, limit = 6): CourtNewsItem[] {
  const articleBlocks = htmlText.match(/<article[^>]*class=["'][^"']*\bitem\b[^"']*["'][\s\S]*?<\/article>/gi) ?? [];
  const parsed: CourtNewsItem[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < articleBlocks.length; i += 1) {
    const block = articleBlocks[i];
    const hrefMatch = block.match(/<a[^>]+href=["']([^"']+)["']/i);
    const url = hrefMatch ? sanitizeExternalUrl(hrefMatch[1], 'https://www.migalhas.com.br') : null;
    if (!url || !url.includes('/quentes/')) continue;

    const key = url.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const titleMatch = block.match(/<h2[^>]*class=["'][^"']*topico__header[^"']*["'][^>]*>([\s\S]*?)<\/h2>/i);
    const bodyMatch = block.match(/<h3[^>]*class=["'][^"']*topico__body[^"']*["'][^>]*>([\s\S]*?)<\/h3>/i);
    const dateMatch = block.match(/<span[^>]*class=["'][^"']*badge[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
    const imgMatch = block.match(/<img[^>]+>/i);
    const imgSrcMatch = imgMatch?.[0].match(/src=["']([^"']+)["']/i);
    const imgAltMatch = imgMatch?.[0].match(/alt=["']([^"']+)["']/i);

    const title = stripHtmlAndClean(titleMatch?.[1] ?? '');
    if (!title) continue;

    const summaryRaw = stripHtmlAndClean(bodyMatch?.[1] ?? '');
    const publishedAt = parseCourtDate(stripHtmlAndClean(dateMatch?.[1] ?? ''));
    const imageUrl = imgSrcMatch ? resolveMigalhasImageUrl(imgSrcMatch[1]) : undefined;
    const cleanedCredit = stripHtmlAndClean(imgAltMatch?.[1] ?? '').replace(/^\(|\)$/g, '').trim();
    const imageAlt = imageUrl
      ? cleanedCredit
        ? `${title} — ${cleanedCredit}`
        : `Imagem da matéria do Portal Migalhas: ${title}`
      : undefined;

    parsed.push({
      id: `migalhas-${i}-${publishedAt || title.slice(0, 16)}`,
      tribunal: 'MIGALHAS',
      title,
      summary: truncateText(
        summaryRaw || 'Leia a matéria completa diretamente no Portal Migalhas.',
        195
      ),
      url,
      imageUrl,
      imageAlt,
      publishedAt,
      publishedLabel: formatShortDatePtBr(publishedAt),
    });

    if (parsed.length >= limit) break;
  }

  return parsed;
}

export function mergeAndFilterNews(
  stjItems: CourtNewsItem[],
  stfItems: CourtNewsItem[],
  filter: TribunalFilter,
  nowMs = Date.now(),
  maxAgeDays = MAX_NEWS_AGE_DAYS
): CourtNewsItem[] {
  const seenUrls = new Set<string>();
  const combined: CourtNewsItem[] = [];

  for (const item of [...stjItems, ...stfItems]) {
    const key = item.url.toLowerCase();
    if (seenUrls.has(key)) continue;
    seenUrls.add(key);
    combined.push(item);
  }

  combined.sort((a, b) => b.publishedAt - a.publishedAt);

  const byTribunal =
    filter === 'ALL' ? combined : combined.filter((item) => item.tribunal === filter);

  const cutoffMs = nowMs - maxAgeDays * 24 * 60 * 60 * 1000;
  const recentOnly = byTribunal.filter(
    (item) => item.publishedAt > 0 && item.publishedAt >= cutoffMs
  );

  return recentOnly.length > 0 ? recentOnly : byTribunal;
}

/**
 * Interleaves live news from STF, STJ, and Portal Migalhas in round-robin order
 * so the rotating lateral frames alternate across all active sources without duplicates.
 */
export function buildInterleavedNewsQueue(
  stjItems: CourtNewsItem[],
  stfItems: CourtNewsItem[],
  migalhasItems: CourtNewsItem[],
  maxItems = 12,
  nowMs = Date.now(),
  maxAgeDays = MAX_NEWS_AGE_DAYS
): CourtNewsItem[] {
  const freshStf = mergeAndFilterNews([], stfItems, 'STF', nowMs, maxAgeDays);
  const freshStj = mergeAndFilterNews(stjItems, [], 'STJ', nowMs, maxAgeDays);

  const queues = [freshStf, freshStj, migalhasItems];
  const seenUrls = new Set<string>();
  const result: CourtNewsItem[] = [];
  const cursors = [0, 0, 0];

  while (result.length < maxItems) {
    let addedInPass = false;

    for (let q = 0; q < queues.length; q += 1) {
      const list = queues[q];
      while (cursors[q] < list.length) {
        const candidate = list[cursors[q]];
        cursors[q] += 1;
        const key = candidate.url.toLowerCase();
        if (seenUrls.has(key)) continue;
        seenUrls.add(key);
        result.push(candidate);
        addedInPass = true;
        break;
      }
      if (result.length >= maxItems) break;
    }

    if (!addedInPass) break;
  }

  return result;
}

export function getNextFrameIndex(
  currentIndex: number,
  total: number,
  step = 1
): number {
  if (total <= 0) return 0;
  return (((currentIndex + step) % total) + total) % total;
}

export function formatBcbValue(rawValue: string, format: IndicatorFormat): string {
  const num = Number.parseFloat(rawValue.replace(',', '.'));
  if (!Number.isFinite(num)) return '—';

  const ptNumber = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  switch (format) {
    case 'percent-year':
      return `${ptNumber.format(num)}% a.a.`;
    case 'percent-12m':
      return `${ptNumber.format(num)}%`;
    case 'percent-month':
      return `${ptNumber.format(num)}%`;
    case 'currency-brl':
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    case 'fx-brl':
      return `R$ ${ptNumber.format(num)}`;
  }
}

export async function fetchEconomicIndicators(
  signal?: AbortSignal
): Promise<EconomicIndicator[]> {
  const cacheBust = Date.now();
  const results = await Promise.allSettled(
    BCB_SERIES.map(async (series) => {
      const endpoint = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${series.seriesCode}/dados/ultimos/1?formato=json&_=${cacheBust}`;
      const response = await fetch(endpoint, { signal });
      if (!response.ok) {
        throw new Error(`BCB HTTP ${response.status}`);
      }
      const data = (await response.json()) as Array<{ data?: string; valor?: string }>;
      const latest = Array.isArray(data) ? data[0] : undefined;
      if (!latest?.valor) {
        throw new Error(`BCB empty payload for series ${series.seriesCode}`);
      }

      return {
        id: series.id,
        label: series.label,
        valueFormatted: formatBcbValue(latest.valor, series.format),
        referenceDate: latest.data ?? 'Atual',
        legalNote: series.legalNote,
      } satisfies EconomicIndicator;
    })
  );

  const fulfilled = results
    .filter((res): res is PromiseFulfilledResult<EconomicIndicator> => res.status === 'fulfilled')
    .map((res) => res.value);

  if (fulfilled.length === 0) {
    throw new Error('Não foi possível consultar os indicadores do Banco Central neste momento.');
  }

  return fulfilled;
}

export async function fetchStjNews(signal?: AbortSignal, limit = 8): Promise<CourtNewsItem[]> {
  const endpoint = `${OFFICIAL_FEED_URLS.stjRss}?_=${Date.now()}`;
  const response = await fetch(endpoint, { signal });
  if (!response.ok) {
    throw new Error(`STJ HTTP ${response.status}`);
  }
  const xml = await response.text();
  return parseStjRssXml(xml, limit);
}

export async function fetchStfNews(signal?: AbortSignal, limit = 8): Promise<CourtNewsItem[]> {
  const endpoint = `${OFFICIAL_FEED_URLS.stfApi}&_=${Date.now()}`;
  const response = await fetch(endpoint, { signal });
  if (!response.ok) {
    throw new Error(`STF HTTP ${response.status}`);
  }
  const json = (await response.json()) as StfWpPost[];
  return parseStfPostsJson(Array.isArray(json) ? json : [], limit);
}

export async function fetchMigalhasNews(
  signal?: AbortSignal,
  limit = 6
): Promise<CourtNewsItem[]> {
  const endpoint = `${OFFICIAL_FEED_URLS.migalhasQuentes}?_=${Date.now()}`;
  const response = await fetch(endpoint, { signal });
  if (!response.ok) {
    throw new Error(`Migalhas HTTP ${response.status}`);
  }
  const html = await response.text();
  return parseMigalhasHtml(html, limit);
}
