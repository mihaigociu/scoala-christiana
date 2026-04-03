import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Despre noi',
      href: getPermalink('/despre-noi'),
      links: [
        {
          text: 'Valorile culturale ale școlii',
          href: getPermalink('/valorile-culturale'),
        },
        {
          text: 'Codul de etică și conduită profesională',
          href: getPermalink('/codul-de-etica'),
        },
        {
          text: 'Prevenirea și combaterea hărțuirii',
          href: getPermalink('/prevenirea-hartuirii'),
        },
        {
          text: 'Proiectul de Dezvoltare Instituțională',
          href: getPermalink('/proiect-dezvoltare'),
        },
        {
          text: 'ROFUIP',
          href: getPermalink('/rofuip'),
        },
        {
          text: 'Regulamentul intern',
          href: getPermalink('/regulament-intern'),
        },
        {
          text: 'Rapoarte de activitate',
          href: getPermalink('/rapoarte-activitate'),
        },
        {
          text: 'Organigramă',
          href: getPermalink('/organigrama'),
        },
        {
          text: 'Informare GDPR',
          href: getPermalink('/informare-gdpr'),
        },
        {
          text: 'Informații financiare',
          href: getPermalink('/informatii-financiare'),
        },
        {
          text: 'Hotărâri ale Consiliului de Administrație',
          href: getPermalink('/hotarari-ca'),
        },
        {
          text: 'Galerie',
          href: getPermalink('/galerie'),
        },
      ],
    },
    {
      text: 'Cadre didactice',
      href: getPermalink('/personalul-scolii'),
      links: [
        {
          text: 'Personalul școlii',
          href: getPermalink('/personalul-scolii'),
        },
        {
          text: 'Programe școlare — nivelul primar',
          href: getPermalink('/programe-scolare-a-doua-sansa-nivelul-primar'),
        },
        {
          text: 'Programe școlare — nivelul secundar inferior',
          href: getPermalink('/programe-scolare-a-doua-sansa-nivelul-secundar-inferior'),
        },
        {
          text: 'Ghiduri școlare cadre didactice',
          href: getPermalink('/ghiduri-scolare'),
        },
      ],
    },
    {
      text: 'Programul „A Doua Șansă"',
      href: getPermalink('/inscriere-in-programul-a-doua-sansa'),
      links: [
        {
          text: 'Metodologia programului',
          href: getPermalink('/metodologia'),
        },
        {
          text: 'Curriculum',
          href: getPermalink('/curriculum'),
        },
        {
          text: 'Documente utile',
          href: getPermalink('/documente-utile'),
        },
        {
          text: 'Rapoarte de activitate',
          href: getPermalink('/rapoarte-de-activitate-program-a-doua-sansa'),
        },
      ],
    },
    {
      text: 'Cursanți',
      href: getPermalink('/cursanti/orar'),
      links: [
        {
          text: 'Oferta liceelor pentru anul școlar 2025-2026',
          href: getPermalink('/cursanti/unitati-de-invatamant-cu-program-liceal-seral'),
        },
        {
          text: 'Structura anului școlar',
          href: getPermalink('/cursanti/structura-an-scolar'),
        },
        {
          text: 'Orar școlar',
          href: getPermalink('/cursanti/orar'),
        },
        {
          text: 'Școala Altfel',
          href: getPermalink('/cursanti/scoala-altfel'),
        },
        {
          text: 'Ghiduri școlare cursanți',
          href: getPermalink('/cursanti/nivelul-primar-ghiduri-scolare-elevi'),
        },
        {
          text: 'Anul I secundar inferior',
          href: getPermalink('/cursanti/anul-i-gimnazial'),
        },
        {
          text: 'Anul II secundar inferior',
          href: getPermalink('/cursanti/anul-ii-gimnazial'),
        },
        {
          text: 'Anul IV secundar inferior',
          href: getPermalink('/cursanti/anul-iv-gimnazial'),
        },
      ],
    },
    {
      text: 'Resurse',
      href: getPermalink('/resurse-educative-pentru-cadre-didactice'),
      links: [
        {
          text: 'Resurse educative pentru cadre didactice',
          href: getPermalink('/resurse-educative-pentru-cadre-didactice'),
        },
        {
          text: 'Resurse educaționale pentru cursanți',
          href: getPermalink('/resurse-educationale-pentru-cursanti'),
        },
        {
          text: 'Formularul de sesizare',
          href: getPermalink('/formularul-de-sesizare'),
        },
      ],
    },
    {
      text: 'Noutăți',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [{ text: 'GDPR', href: getPermalink('/informare-gdpr') }],
  partners: [
    {
      name: 'Arhiepiscopia\nOrtodoxă a Vadului,\nFeleacului și Clujului',
      logo: '/images/parteneri/sigla_mtr.png',
      showName: true,
    },
    {
      name: 'Seminarul Teologic Ortodox Cluj',
      logo: '/images/parteneri/sigla_sto400.png',
    },
    {
      name: 'Inspectoratul Școlar Județean Cluj',
      logo: '/images/parteneri/logo-isj-cluj.jpg',
      href: 'https://www.isjcluj.ro/',
    },
    {
      name: 'Asociația Christiana',
      logo: '/images/parteneri/590c8f34d94fe.png',
    },
    {
      name: 'Fundația Liviu Breteanu',
      logo: '/images/parteneri/logo-liviu-breteanu_web.png',
    },
    {
      name: 'Liceul Tehnic de Comunicații „Augustin Maior" Cluj-Napoca',
      logo: '/images/parteneri/maior.png',
    },
  ],
  socialLinks: [
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/scoalachristiana',
    },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} Școala Gimnazială Christiana, Cluj-Napoca. Toate drepturile rezervate.
  `,
};
