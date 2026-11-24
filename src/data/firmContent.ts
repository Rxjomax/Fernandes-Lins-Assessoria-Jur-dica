export interface PracticeArea {
  id: string;
  number: string;
  title: string;
  description: string;
  highlights: string;
  icon: 'file-signature' | 'gavel' | 'briefcase' | 'landmark' | 'users' | 'shield-check';
}

export interface FirmPillar {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  meta: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface RealPhotoItem {
  src: string;
  alt: string;
  caption: string;
}

export const FIRM_INFO = {
  brandShort: 'Fernandes & Lins',
  brandFull: 'Fernandes & Lins Assessoria Jurídica',
  since: 'Desde 2019',
  whatsappNumber: '5581986693251',
  whatsappDisplay: '(81) 98669-3251',
  instagramHandle: '@fernandeselins1',
  instagramUrl: 'https://www.instagram.com/fernandeselins1/',
  googleReviewsUrl: 'https://www.google.com/search?q=fernando+%26+lins+assessoria+juridica',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Boanerges+Pereira+08+Jordao+Recife+PE+51260-000',
  addressLine1: 'Rua Boanerges Pereira, 08 – Sala 06',
  addressLine2: 'Jordão, Recife – PE · CEP 51260-000',
  cityRegion: 'Recife – PE e todo o Brasil',
  googleRating: '5,0',
  googleReviewCount: 27,
  googleTopTags: 'Advogados · Competência · Escritório · Dedicação',
  logoImage: '/assets/real/logo-fl-circle.png',
  heroImage: '/src/assets/images/hero_law_architecture_1795563157470.jpg',
  partnersMainPhoto: '/assets/real/socios-tribunal.jpg',
  galleryPhotos: [
    {
      src: '/assets/real/atuacao-trt.jpg',
      alt: 'Dra. Fabíola em atuação presencial no Tribunal Regional do Trabalho de Pernambuco (TRT-PE)',
      caption: 'Atuação no TRT-PE',
    },
    {
      src: '/assets/real/atendimento-escritorio.jpg',
      alt: 'Dra. Fabíola em atendimento jurídico individualizado no escritório em Recife',
      caption: 'Atendimento próximo',
    },
    {
      src: '/assets/real/dr-fernandes-retrato.jpg',
      alt: 'Dr. Fernandes em seu gabinete no escritório Fernandes & Lins',
      caption: 'Dr. Fernandes · Sócio',
    },
  ] as RealPhotoItem[],
  officePhotos: [
    {
      src: '/assets/real/escritorio-recepcao.jpg',
      alt: 'Recepção do escritório Fernandes & Lins no bairro do Jordão, Recife',
      caption: 'Recepção · Jordão, Recife',
    },
    {
      src: '/assets/real/escritorio-sala.jpg',
      alt: 'Sala de espera acolhedora do escritório Fernandes & Lins Assessoria Jurídica',
      caption: 'Ambiente de atendimento',
    },
  ] as RealPhotoItem[],
  partnersOab: [
    { name: 'Dr. Fernandes', oab: 'OAB/PE — inserir registro' },
    { name: 'Dra. Fabíola Lins', oab: 'OAB/PE — inserir registro' },
  ],
  oabDisclaimer:
    'Este site possui caráter meramente informativo e institucional, em estrita observância ao Código de Ética e Disciplina da OAB e ao Provimento nº 205/2021 do Conselho Federal da OAB. As informações aqui disponibilizadas não constituem aconselhamento jurídico individualizado nem promessa de resultado processual.',
} as const;

export const NAV_LINKS = [
  { label: 'Áreas de Atuação', href: '#areas' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#contato' },
] as const;

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'civel-contratos',
    number: '01',
    title: 'Direito Cível e Contratos',
    description:
      'Elaboração e revisão de contratos, responsabilidade civil, ações indenizatórias, erro médico e defesa estratégica do seu patrimônio.',
    highlights: 'Contratos · Responsabilidade Civil · Erro Médico',
    icon: 'file-signature',
  },
  {
    id: 'criminal',
    number: '02',
    title: 'Direito Criminal',
    description:
      'Atuação técnica e imediata em prisão em flagrante, acompanhamento em delegacias, audiências de custódia e defesa integral no processo penal.',
    highlights: 'Flagrantes · Processo Penal · Garantias Constitucionais',
    icon: 'gavel',
  },
  {
    id: 'trabalhista',
    number: '03',
    title: 'Direito Trabalhista',
    description:
      'Defesa dos direitos do trabalhador, verbas rescisórias, adicional de insalubridade, licença-maternidade, audiências no TRT e consultoria preventiva.',
    highlights: 'Atuação no TRT · Insalubridade · Preventivo',
    icon: 'briefcase',
  },
  {
    id: 'previdenciario',
    number: '04',
    title: 'Direito Previdenciário',
    description:
      'Aposentadorias comuns e especiais, benefícios por incapacidade junto ao INSS, BPC/LOAS, pensão por morte e revisões administrativas ou judiciais.',
    highlights: 'Aposentadoria Especial · Auxílios INSS · BPC',
    icon: 'landmark',
  },
  {
    id: 'familia-sucessoes',
    number: '05',
    title: 'Direito de Família e Sucessões',
    description:
      'Condução discreta e acolhedora de divórcios consensuais ou litigiosos, inventários judiciais e extrajudiciais, guarda, pensão e planejamento sucessório.',
    highlights: 'Divórcios · Inventários · Planejamento Sucessório',
    icon: 'users',
  },
  {
    id: 'consumidor-preventivo',
    number: '06',
    title: 'Consumidor e Assessoria Preventiva',
    description:
      'Defesa contra práticas abusivas, planos de saúde, passagens aéreas e negativação indevida, além de consultoria contínua para evitar litígios.',
    highlights: 'Planos de Saúde · Companhias Aéreas · Consultoria',
    icon: 'shield-check',
  },
];

export const FIRM_PILLARS: FirmPillar[] = [
  {
    number: '01',
    title: 'Atendimento Direto com os Sócios',
    description:
      'Desde o primeiro contato você fala diretamente com Dr. Fernandes e Dra. Fabíola, sem filtros robotizados e com escuta genuína sobre sua situação.',
  },
  {
    number: '02',
    title: 'Atuação Técnica nos Tribunais',
    description:
      'Experiência prática desde 2019 em audiências presenciais e digitais, processos no TRT, Justiça Estadual, Federal e demandas urgentes.',
  },
  {
    number: '03',
    title: 'Transparência e Empatia Real',
    description:
      'Explicamos seus direitos, riscos e próximos passos em linguagem clara, mantendo você atualizado a cada movimentação relevante.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Contato Inicial',
    description:
      'Você relata sua situação pelo WhatsApp (81) 98669-3251 ou pelo formulário abaixo, com total sigilo profissional e retorno ágil.',
  },
  {
    number: '02',
    title: 'Análise Jurídica',
    description:
      'Avaliamos os documentos, verificamos a viabilidade legal e apresentamos com clareza o caminho estratégico mais seguro para o seu caso.',
  },
  {
    number: '03',
    title: 'Atuação e Acompanhamento',
    description:
      'Ingressamos com as medidas extrajudiciais ou judiciais cabíveis mantendo você informado de cada avanço, online ou em nossa sede no Recife.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'google-fatima',
    quote:
      'Super indico Fernandes & Lins Assessoria Jurídica, advogados empenhados em resolver questões judiciais, além disso são pessoas honestas e têm muita empatia com o próximo.',
    author: 'Fatima Erdmann',
    meta: 'Local Guide · Avaliação verificada no Google',
  },
  {
    id: 'google-samuel',
    quote:
      'A minha experiência com a Fernandes e Lins Assessoria Jurídica foi marcada pela seriedade, competência e elevado comprometimento profissional. Desde o início do acompanhamento processual, recebi um atendimento diligente e transparente.',
    author: 'Samuel Otávio',
    meta: '6 avaliações · Avaliação verificada no Google',
  },
  {
    id: 'google-humberto',
    quote:
      'Excelentes profissionais, super atenciosos e educados. São totalmente comprometidos com o cliente, fazem tudo o que podem pra ajudar. Super recomendo.',
    author: 'Humberto Silva',
    meta: '3 avaliações · Avaliação verificada no Google',
  },
  {
    id: 'google-luciano',
    quote:
      'Escritório de advocacia com excelentes profissionais onde falo e afirmo, parabéns Dr. Fernandes e Dra. Fabíola, muito obrigado e que Deus os abençoe sempre em tudo.',
    author: 'Luciano Sousa',
    meta: 'Avaliação verificada no Google',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-online',
    question: 'O atendimento pode ser feito 100% online?',
    answer:
      'Sim. Atuamos em todo o Brasil de forma 100% digital, com reuniões por WhatsApp ou videoconferência, análise segura de documentos e assinatura eletrônica com plena validade jurídica — além do atendimento presencial em Recife.',
  },
  {
    id: 'faq-documentos',
    question: 'Quais documentos preciso ter para a primeira conversa?',
    answer:
      'Para o primeiro contato, você não precisa reunir toda a papelada. Basta relatar o ocorrido e, caso tenha em mãos, separar documentos básicos como contratos, conversas registradas, notificações, protocolos do INSS ou boletins relacionados à demanda.',
  },
  {
    id: 'faq-acompanhamento',
    question: 'Como funciona o acompanhamento do meu processo?',
    answer:
      'Mantemos comunicação direta com os advogados responsáveis. A cada andamento relevante, traduzimos o que aconteceu para uma linguagem clara e objetiva, informando o próximo passo previsto e tirando todas as suas dúvidas.',
  },
  {
    id: 'faq-regioes',
    question: 'Onde fica o escritório físico e em quais regiões vocês atendem?',
    answer:
      'Nossa sede presencial fica na Rua Boanerges Pereira, 08 – Sala 06, bairro do Jordão, Recife – PE (CEP 51260-000). Por meio do processo judicial eletrônico, atendemos e acompanhamos causas em todo o território nacional.',
  },
];
