export interface PracticeArea {
  id: string;
  number: string;
  title: string;
  description: string;
  highlights: string;
  icon:
    | 'file-signature'
    | 'gavel'
    | 'briefcase'
    | 'landmark'
    | 'users'
    | 'shield-check'
    | 'key-round'
    | 'building-2'
    | 'heart-pulse';
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

export interface TeamMemberOab {
  name: string;
  role: string;
  oab: string;
  group: 'Equipe Técnica';
}

export const FIRM_INFO = {
  brandShort: 'Fernandes & Lins',
  brandFull: 'Fernandes & Lins Assessoria Jurídica',
  since: 'Desde 2019',
  whatsappNumber: '5581986693251',
  whatsappDisplay: '(81) 98669-3251',
  email: 'fernandeselinsassessoriajuridica@outlook.com',
  instagramHandle: '@fernandeselins1',
  instagramUrl: 'https://www.instagram.com/fernandeselins1/',
  googleReviewsUrl: 'https://www.google.com/search?q=fernando+%26+lins+assessoria+juridica',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Boanerges+Pereira+08+Jordao+Recife+PE+51260-000',
  addressLine1: 'Rua Boanerges Pereira, 08 – 1º Andar, Sala 06',
  addressLine2: 'Jordão, Recife – PE · CEP 51260-000',
  cityRegion: 'Recife – PE e todo o Brasil',
  officeHours: 'Segunda a sexta-feira, das 08h00 às 18h00',
  criminalDuty: 'Plantão Criminal Extraordinário: 24h (consultar disponibilidade)',
  paymentMethods:
    'Mercado Pago · Cartões de Crédito (Visa, Mastercard, Elo, Amex, Hipercard e Diners) · Boleto',
  googleRating: '5,0',
  googleReviewCount: 27,
  googleTopTags: 'Advogados · Competência · Escritório · Dedicação',
  logoImage: '/assets/real/logo-fl-circle.png',
  heroImage: '/src/assets/images/hero_law_architecture_1795563157470.jpg',
  partnersMainPhoto: '/assets/real/socios-tribunal.jpg',
  galleryPhotos: [
    {
      src: '/assets/real/atuacao-trt.jpg',
      alt: 'Dra. Fabíola Lins em atuação presencial no Tribunal Regional do Trabalho de Pernambuco (TRT-PE)',
      caption: 'Atuação no TRT-PE',
    },
    {
      src: '/assets/real/atendimento-escritorio.jpg',
      alt: 'Dra. Fabíola Lins em atendimento jurídico individualizado no escritório em Recife',
      caption: 'Atendimento próximo',
    },
    {
      src: '/assets/real/dr-fernandes-retrato.jpg',
      alt: 'Dr. Marciel Fernandes em seu gabinete no escritório Fernandes & Lins',
      caption: 'Dr. Marciel Fernandes',
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
    {
      name: 'Dr. Marciel Fernandes',
      role: 'Sócio Administrador',
      oab: 'OAB/PE 57.411',
      group: 'Equipe Técnica',
    },
    {
      name: 'Dra. Fabíola Lins',
      role: 'Sócia Administradora',
      oab: 'OAB/PE 50.250',
      group: 'Equipe Técnica',
    },
  ] as TeamMemberOab[],
  oabDisclaimer:
    'Este site possui caráter meramente informativo e institucional, em estrita observância ao Código de Ética e Disciplina da OAB e ao Provimento nº 205/2021 do Conselho Federal da OAB. As informações aqui disponibilizadas não constituem aconselhamento jurídico individualizado nem promessa de resultado processual.',
} as const;

export const NAV_LINKS = [
  { label: 'Áreas de Atuação', href: '#areas', tab: 'home' as const },
  { label: 'Sobre', href: '#sobre', tab: 'home' as const },
  { label: 'Avaliações', href: '#avaliacoes', tab: 'home' as const },
  { label: 'Feed de Notícias', href: '#feed-de-noticias', tab: 'feed' as const },
  { label: 'Contato', href: '#contato', tab: 'home' as const },
] as const;

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'familia-sucessoes',
    number: '01',
    title: 'Direito de Família e Sucessões',
    description:
      'Atuação discreta e técnica em pensão alimentícia, guarda, divórcio, curatela, retificação de registro civil, inventário e partilha de bens.',
    highlights: 'Pensão · Guarda · Divórcio · Inventário · Curatela',
    icon: 'users',
  },
  {
    id: 'consumidor',
    number: '02',
    title: 'Direitos do Consumidor',
    description:
      'Responsabilidade do fornecedor, ações por erro médico (dano moral, estético e material), empréstimo bancário ilegal e desconto indevido.',
    highlights: 'Erro Médico · Bancos · Desconto Indevido',
    icon: 'shield-check',
  },
  {
    id: 'possessorios',
    number: '03',
    title: 'Direitos Possessórios',
    description:
      'Defesa estratégica da posse em ações de usucapião, reintegração de posse, embargos de terceiro e regularização possessória.',
    highlights: 'Usucapião · Reintegração de Posse · Embargos de Terceiro',
    icon: 'key-round',
  },
  {
    id: 'imobiliario',
    number: '04',
    title: 'Direito Imobiliário',
    description:
      'Regularização imobiliária, estruturação de holding familiar para proteção patrimonial, contratos e defesa em ação de despejo.',
    highlights: 'Regularização · Holding Familiar · Ação de Despejo',
    icon: 'building-2',
  },
  {
    id: 'saude',
    number: '05',
    title: 'Direito da Saúde',
    description:
      'Medidas urgentes e pedidos liminares para concessão de medicamentos de alto custo, tratamento com home care e disponibilização de leito de UTI.',
    highlights: 'Medicamentos de Alto Custo · Home Care · Leito de UTI',
    icon: 'heart-pulse',
  },
  {
    id: 'trabalhista',
    number: '06',
    title: 'Direito Trabalhista',
    description:
      'Ação e defesa em processo trabalhista, verbas rescisórias, adicional de insalubridade, audiências no TRT e assessoria preventiva.',
    highlights: 'Ação e Defesa · Atuação no TRT · Preventivo',
    icon: 'briefcase',
  },
  {
    id: 'criminal',
    number: '07',
    title: 'Defesa Criminal',
    description:
      'Acompanhamento em inquérito policial, audiência de custódia, defesa processual e violência doméstica, com plantão criminal extraordinário 24h.',
    highlights: 'Inquérito · Custódia · Violência Doméstica · Plantão 24h',
    icon: 'gavel',
  },
  {
    id: 'previdenciario',
    number: '08',
    title: 'Direito Previdenciário',
    description:
      'Planejamento previdenciário, aposentadorias, pensões e Benefício de Prestação Continuada (BPC/LOAS para idosos e pessoas com deficiência — autista e geral).',
    highlights: 'Planejamento · Aposentadorias · BPC/LOAS (Idoso e PCD)',
    icon: 'landmark',
  },
  {
    id: 'administrativo-consultas',
    number: '09',
    title: 'Demandas Administrativas e Consultas',
    description:
      'Resolução de demandas administrativas junto a órgãos públicos e instituições, além de consultas jurídicas presenciais ou on-line.',
    highlights: 'Via Administrativa · Consulta Presencial · Consulta On-line',
    icon: 'file-signature',
  },
];

export const FIRM_PILLARS: FirmPillar[] = [
  {
    number: '01',
    title: 'Atendimento Direto com os Sócios',
    description:
      'Desde o primeiro contato você fala diretamente com Dr. Marciel Fernandes e Dra. Fabíola Lins, contando com estrutura técnica completa e escuta genuína.',
  },
  {
    number: '02',
    title: 'Atuação Técnica e Plantão 24h',
    description:
      'Experiência prática desde 2019 em demandas judiciais e administrativas, audiências presenciais e digitais, além de plantão criminal extraordinário 24h.',
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
      'Você relata sua situação pelo WhatsApp (81) 98669-3251, por e-mail ou pelo formulário abaixo, com total sigilo profissional.',
  },
  {
    number: '02',
    title: 'Análise Jurídica',
    description:
      'Avaliamos os documentos em consulta presencial ou on-line, verificamos a viabilidade legal e apresentamos o caminho estratégico mais seguro.',
  },
  {
    number: '03',
    title: 'Atuação e Acompanhamento',
    description:
      'Conduzimos as medidas administrativas ou judiciais cabíveis mantendo você informado de cada avanço, online ou em nossa sede no Recife.',
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
      'Sim. Realizamos consultas presenciais em Recife e atendimentos 100% on-line em todo o Brasil, com reuniões por WhatsApp ou videoconferência, análise segura de documentos e assinatura eletrônica com plena validade jurídica.',
  },
  {
    id: 'faq-horario-plantao',
    question: 'Qual o horário de funcionamento e como funciona o plantão criminal?',
    answer:
      'O atendimento presencial funciona de segunda-feira a sexta-feira, das 08h00 às 18h00. Para urgências como prisões em flagrante e audiências de custódia, disponibilizamos Plantão Criminal Extraordinário 24h (mediante consulta de disponibilidade pelo WhatsApp (81) 98669-3251).',
  },
  {
    id: 'faq-documentos',
    question: 'Quais documentos preciso ter para a primeira conversa?',
    answer:
      'Para o primeiro contato, você não precisa reunir toda a papelada. Basta relatar o ocorrido e, caso tenha em mãos, separar documentos básicos como contratos, receitas ou laudos médicos, protocolos do INSS, boletins ou notificações.',
  },
  {
    id: 'faq-acompanhamento',
    question: 'Como funciona o acompanhamento do meu processo?',
    answer:
      'Mantemos comunicação direta com a equipe responsável. A cada andamento relevante, traduzimos o que aconteceu para uma linguagem clara e objetiva, informando o próximo passo previsto e tirando todas as suas dúvidas.',
  },
  {
    id: 'faq-regioes',
    question: 'Onde fica o escritório físico e quais formas de pagamento são aceitas?',
    answer:
      'Nossa sede presencial fica na Rua Boanerges Pereira, 08 – 1º Andar, Sala 06, bairro do Jordão, Recife – PE (CEP 51260-000). Para maior comodidade nos honorários contratuais, trabalhamos com Mercado Pago, cartões de crédito (Visa, Mastercard, Elo, American Express, Hipercard e Diners) e boleto bancário.',
  },
];
