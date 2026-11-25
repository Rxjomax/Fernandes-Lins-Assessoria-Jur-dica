import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBcbValue,
  mergeAndFilterNews,
  parseCourtDate,
  parseMigalhasHtml,
  parseStfPostsJson,
  parseStjRssXml,
  resolveMigalhasImageUrl,
  sanitizeExternalUrl,
  stripHtmlAndClean,
} from './legalFeed';

test('stripHtmlAndClean removes markup, NBSP, punctuation gaps, and decodes HTML entities', () => {
  const input =
    '<p>Decis&atilde;o do <em>STJ</em> , &quot;Regula&ccedil;&atilde;o\u00A0&amp;\u00A0Precedentes&quot; .<script>alert(1)</script></p>';
  const cleaned = stripHtmlAndClean(input);
  assert.ok(!cleaned.includes('<p>'));
  assert.ok(!cleaned.includes('alert(1)'));
  assert.ok(!cleaned.includes('\u00A0'));
  assert.ok(cleaned.includes('STJ, "'));
  assert.ok(cleaned.includes('Precedentes".'));
  assert.ok(cleaned.includes('&'));
});

test('sanitizeExternalUrl allows only http and https links and resolves relative URLs', () => {
  assert.equal(
    sanitizeExternalUrl('https://noticias.stf.jus.br/postsnoticias/exemplo/'),
    'https://noticias.stf.jus.br/postsnoticias/exemplo/'
  );
  assert.equal(
    sanitizeExternalUrl('/sites/portalp/foto.jpg', 'https://www.stj.jus.br'),
    'https://www.stj.jus.br/sites/portalp/foto.jpg'
  );
  assert.equal(sanitizeExternalUrl('javascript:alert(1)'), null);
  assert.equal(sanitizeExternalUrl('not-a-url'), null);
});

test('parseCourtDate handles STJ, STF ISO, and Migalhas dot-separated dates', () => {
  const stjTs = parseCourtDate('Qua, nov 25 2026 16:32:00');
  const stfTs = parseCourtDate('2026-11-25T17:04:11');
  const migTs = parseCourtDate('25.nov.2026');
  assert.ok(stjTs > 0);
  assert.ok(stfTs > stjTs);
  assert.ok(migTs > 0);

  const migDate = new Date(migTs);
  assert.equal(migDate.getFullYear(), 2026);
  assert.equal(migDate.getMonth(), 10);
  assert.equal(migDate.getDate(), 25);
});

test('parseStjRssXml extracts CDATA fields, relative photo URL, and timestamped date', () => {
  const sampleXml = `
    <rss version="2.0"><channel>
      <item>
        <title><![CDATA[Terceira Turma define prazo prescricional em contratos bancários]]></title>
        <link><![CDATA[https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/2026/exemplo.aspx]]></link>
        <description><![CDATA[Terceira Turma define prazo prescricional em contratos bancários]]></description>
        <pubDate>Qua, nov 25 2026 16:32:00</pubDate>
        <content:encoded><![CDATA[<img src="/sites/portalp/PublishingImages/exemplo.jpg" alt="PORTAL_INTERNA.jpg" /><p>A Terceira Turma do Superior Tribunal de Justiça estabeleceu parâmetros objetivos para a contagem do prazo prescricional.</p>]]></content:encoded>
      </item>
    </channel></rss>
  `;

  const items = parseStjRssXml(sampleXml, 5);
  assert.equal(items.length, 1);
  assert.equal(items[0].tribunal, 'STJ');
  assert.equal(items[0].publishedLabel, '25 nov 2026 · 16h32');
  assert.equal(items[0].imageUrl, 'https://www.stj.jus.br/sites/portalp/PublishingImages/exemplo.jpg');
  assert.match(items[0].imageAlt ?? '', /Imagem da notícia do STJ/);
});

test('parseStfPostsJson extracts embedded featured press photo and excludes stale articles on merge', () => {
  const nowMs = parseCourtDate('2026-11-25T18:00:00');
  const stfItems = parseStfPostsJson(
    [
      {
        id: 168143,
        date: '2026-11-25T17:04:11',
        link: 'https://noticias.stf.jus.br/postsnoticias/noticia-de-hoje/',
        title: { rendered: 'STF analisa tema constitucional relevante\u00A0' },
        excerpt: { rendered: '<p>Decisão atual publicada hoje no portal oficial. [&hellip;]</p>' },
        _embedded: {
          'wp:featuredmedia': [
            {
              source_url: 'https://noticias.stf.jus.br/wp-content/uploads/2026/11/full.jpg',
              alt_text: 'Sessão plenária do STF.',
              media_details: {
                sizes: {
                  medium_large: {
                    source_url: 'https://noticias.stf.jus.br/wp-content/uploads/2026/11/medium.jpg',
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: 158493,
        date: '2026-08-13T19:00:00',
        link: 'https://noticias.stf.jus.br/pagina-antiga/',
        title: { rendered: 'Página antiga institucional' },
        excerpt: { rendered: '<p>Publicação antiga fora da janela recente.</p>' },
      },
    ],
    5
  );

  assert.equal(stfItems.length, 2);
  assert.equal(stfItems[0].publishedLabel, '25 nov 2026 · 17h04');
  assert.equal(
    stfItems[0].imageUrl,
    'https://noticias.stf.jus.br/wp-content/uploads/2026/11/medium.jpg'
  );
  assert.equal(stfItems[0].imageAlt, 'Sessão plenária do STF.');

  const stjMock = [
    {
      id: 'stj-1',
      tribunal: 'STJ' as const,
      title: 'STJ julga recurso repetitivo',
      summary: 'Resumo do julgamento.',
      url: 'https://www.stj.jus.br/exemplo',
      publishedAt: parseCourtDate('Qua, nov 25 2026 16:32:00'),
      publishedLabel: '25 nov 2026 · 16h32',
    },
  ];

  const all = mergeAndFilterNews(stjMock, stfItems, 'ALL', nowMs, 30);
  assert.equal(all.length, 2);
  assert.equal(all[0].tribunal, 'STF');
  assert.ok(!all.some((item) => item.title.includes('Página antiga')));
});

test('parseMigalhasHtml extracts live Migalhas Quentes articles and upgrades medproc photo URLs', () => {
  const sampleHtml = `
    <article class="item">
      <a href="https://www.migalhas.com.br/quentes/469294/oab-encerra-conferencia">
        <div class="topico">
          <div><img src="https://medproc.migalhas.com.br/https__img5.migalhas.com.br__SL__gf_base__SL__empresas__SL__miga__SL__imagens__SL__2026__SL__11__SL__25__SL__foto.png._PROC_CP75CCH31622400.png" alt=" (Imagem: Divulgação/OAB )" /></div>
          <div class="topico__texto">
            <span class="badge badge--vermelho">25.nov.2026</span>
            <h2 class="topico__header">OAB encerra 25ª Conferência Nacional da Advocacia</h2>
            <h3 class="topico__body">Debates destacam ética, tecnologia e prerrogativas profissionais.</h3>
          </div>
        </div>
      </a>
    </article>
  `;

  assert.equal(
    resolveMigalhasImageUrl(
      'https://medproc.migalhas.com.br/https__img5.migalhas.com.br__SL__gf_base__SL__foto.png._PROC_CP75CCH31622400.png'
    ),
    'https://img5.migalhas.com.br/gf_base/foto.png'
  );

  const items = parseMigalhasHtml(sampleHtml, 6);
  assert.equal(items.length, 1);
  assert.equal(items[0].tribunal, 'MIGALHAS');
  assert.equal(items[0].publishedLabel, '25 nov 2026');
  assert.equal(
    items[0].imageUrl,
    'https://img5.migalhas.com.br/gf_base/empresas/miga/imagens/2026/11/25/foto.png'
  );
  assert.match(items[0].title, /Conferência Nacional/);
});

test('formatBcbValue formats Brazilian percentages and currency properly', () => {
  assert.equal(formatBcbValue('13.75', 'percent-year'), '13,75% a.a.');
  assert.equal(formatBcbValue('4.63', 'percent-12m'), '4,63%');
  assert.equal(formatBcbValue('0.22', 'percent-month'), '0,22%');
  assert.equal(formatBcbValue('5.8825', 'fx-brl'), 'R$ 5,88');
  assert.match(formatBcbValue('1621.00', 'currency-brl'), /1\.621,00/);
});
