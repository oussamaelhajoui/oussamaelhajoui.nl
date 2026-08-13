import type { Core } from '@strapi/strapi';

const defaultContent = {
  siteName: 'Oussama El Hajoui',
  seoTitle: 'Oussama El Hajoui — Software engineer',
  seoDescription:
    'Snelle websites en web apps met React, Angular, Java en C#. Rechtstreeks samenwerken met software engineer Oussama El Hajoui.',
  seoKeywords: [
    'software engineer',
    'website laten maken',
    'web app development',
    'React developer',
    'Angular developer',
    'Java developer',
    'C# developer',
    'Nederland',
  ],
  socialTitle: 'Oussama El Hajoui — Software engineer',
  socialDescription: 'Snelle websites en web apps die helder voelen, goed presteren en klaar zijn om te groeien.',
  robotsIndex: true,
  robotsFollow: true,
  googleSiteVerification: '',
  bingSiteVerification: '',
  customMetaTags: [],
  heroTitle: 'Websites en web apps',
  heroHighlight: 'die presteren.',
  heroText:
    'Ik ben Oussama El Hajoui, software engineer. Ik ontwerp en bouw snelle digitale ervaringen met React, Angular, Java en C# — van eerste idee tot solide eindproduct.',
  availability: 'Beschikbaar voor nieuwe projecten',
  stack: ['React', 'Angular', 'Java', 'C#'],
  homeServices: [
    {
      number: '01',
      title: 'Websites die converteren',
      text: 'Een scherpe structuur, onderscheidend ontwerp en technische SEO. Gebouwd om snel te laden én actie uit te lokken.',
      tags: ['UX/UI', 'Tailwind', 'SEO'],
    },
    {
      number: '02',
      title: 'Web apps die meegroeien',
      text: 'Van intern portaal tot klantplatform: intuïtieve interfaces met een solide architectuur onder de motorkap.',
      tags: ['React', 'Angular', "API's"],
    },
    {
      number: '03',
      title: 'Backends die blijven staan',
      text: 'Veilige, onderhoudbare services en koppelingen in Java of C# — helder opgezet voor de volgende fase.',
      tags: ['Java', 'C#', 'Integraties'],
    },
  ],
  homePrinciples: [
    {
      title: 'Snel op ieder scherm',
      text: 'Performance is geen laatste optimalisatieronde, maar een ontwerpkeuze vanaf dag één.',
    },
    {
      title: 'Direct met de bouwer',
      text: 'Geen lagen of overdrachten. Je schakelt rechtstreeks met mij van idee tot livegang.',
    },
    {
      title: 'Gebouwd voor morgen',
      text: 'Heldere code, een logisch CMS en documentatie waarmee je verder kunt.',
    },
  ],
  servicesHero: {
    kicker: 'Diensten',
    title: 'Van scherpe website tot',
    highlight: 'solide software.',
    text: 'Je hebt één aanspreekpunt voor ontwerp en development. Dat houdt de lijn kort, de kwaliteit hoog en het proces overzichtelijk.',
  },
  services: [
    {
      number: '01',
      title: 'Websites',
      slug: 'websites',
      seoKeyword: 'Website laten maken',
      landingIntro: 'Een professionele website die snel laadt, vertrouwen wekt en bezoekers richting contact of aanvraag begeleidt.',
      isWebsiteService: true,
      lead: 'Snel, vindbaar en ontworpen om vertrouwen om te zetten in aanvragen.',
      detail: 'Van positionering en paginastructuur tot responsive bouw, technische SEO en CMS-inrichting. Je krijgt geen standaard thema, maar een herkenbare site die past bij jouw bedrijf.',
      items: ['UX & visueel ontwerp', 'Tailwind CSS', 'Strapi CMS', 'SEO & performance'],
    },
    {
      number: '02',
      title: 'Web apps',
      slug: 'web-apps',
      seoKeyword: 'Web app laten maken',
      landingIntro: 'Een gebruiksvriendelijke webapp die complexe processen terugbrengt tot een heldere ervaring voor klanten en teams.',
      isWebsiteService: false,
      lead: 'Gebruiksvriendelijke tools voor klanten, teams en complexe processen.',
      detail: 'Ik vertaal workflows naar een heldere interface en schaalbare frontend. Denk aan dashboards, klantportalen, configurators en interne applicaties.',
      items: ['React', 'Angular', 'Design systems', 'API-integraties'],
    },
    {
      number: '03',
      title: "Backend & API's",
      slug: 'backend-apis',
      seoKeyword: 'Backend en API laten ontwikkelen',
      landingIntro: 'Een veilige en onderhoudbare backend met API-koppelingen die passen bij je product, processen en groeiplannen.',
      isWebsiteService: false,
      lead: 'Een stevige technische basis waarop je verder kunt bouwen.',
      detail: 'Onderhoudbare services, datamodellen en koppelingen met aandacht voor veiligheid, testbaarheid en heldere verantwoordelijkheden.',
      items: ['Java', 'C# / .NET', "REST API's", 'Integraties'],
    },
    {
      number: '04',
      title: 'Doorontwikkeling',
      slug: 'doorontwikkeling',
      seoKeyword: 'Software laten doorontwikkelen',
      landingIntro: 'Bestaande software gericht verbeteren met extra functies, een snellere interface en een beter onderhoudbare technische basis.',
      isWebsiteService: false,
      lead: 'Bestaande software sneller, duidelijker en beter onderhoudbaar maken.',
      detail: 'Ik help bij gerichte performanceverbetering, een nieuw frontend-onderdeel, technische opschoning of het stap voor stap moderniseren van je product.',
      items: ['Performance audit', 'Refactoring', 'Nieuwe features', 'Technisch advies'],
    },
  ],
  audienceCards: [
    {
      title: 'Een nieuwe website',
      text: 'Je bedrijf is gegroeid, maar je site vertelt nog het oude verhaal.',
    },
    {
      title: 'Een digitaal product',
      text: 'Je wilt een portaal, dashboard of web app van idee naar eerste versie brengen.',
    },
    {
      title: 'Extra engineeringkracht',
      text: 'Je team kan tijdelijk een ervaren frontend- of backendbouwer gebruiken.',
    },
    {
      title: 'Een technische upgrade',
      text: 'Je bestaande product moet sneller, stabieler of makkelijker te onderhouden worden.',
    },
  ],
  processHero: {
    kicker: 'Werkwijze',
    title: 'Duidelijk proces.',
    highlight: 'Sterk resultaat.',
    text: 'Je weet steeds wat er gebeurt, waarom een keuze wordt gemaakt en wat de volgende stap is. Zonder onnodige vergaderingen.',
  },
  processSteps: [
    {
      number: '01',
      title: 'Scherpstellen',
      text: 'We bespreken doel, doelgroep, gewenste functies en randvoorwaarden. Daarna krijg je een heldere scope, planning en offerte.',
      result: 'Resultaat: gedeelde richting',
    },
    {
      number: '02',
      title: 'Structuur & ontwerp',
      text: 'Ik vertaal de inhoud en gebruikersreis naar een sterk visueel systeem. Je ziet vroeg hoe het product gaat voelen.',
      result: 'Resultaat: klikbaar beeld',
    },
    {
      number: '03',
      title: 'Bouwen',
      text: 'De gekozen richting wordt zorgvuldig ontwikkeld. Je kunt tussentijds meekijken en krijgt korte, concrete updates.',
      result: 'Resultaat: werkend product',
    },
    {
      number: '04',
      title: 'Testen & live',
      text: 'Responsiviteit, toegankelijkheid, snelheid en SEO worden gecontroleerd voordat de definitieve versie livegaat.',
      result: 'Resultaat: zelfverzekerde lancering',
    },
    {
      number: '05',
      title: 'Verder groeien',
      text: 'Na livegang kan ik ondersteunen met meten, verbeteren en uitbreiden. Alleen wanneer het echt iets toevoegt.',
      result: 'Resultaat: duurzame vooruitgang',
    },
  ],
  collaborationCards: [
    {
      title: 'Transparant',
      text: 'Je ziet voortgang, aandachtspunten en beslissingen zonder technisch rookgordijn.',
    },
    {
      title: 'Pragmatisch',
      text: 'We bouwen wat nodig is voor jouw doel — niet meer, maar ook niet minder.',
    },
    {
      title: 'Toegankelijk',
      text: 'Feedback kan gewoon in duidelijke taal. Ik vertaal het naar de techniek.',
    },
    {
      title: 'Eigenaarschap',
      text: 'Ik kijk verder dan mijn takenlijst en signaleer kansen voordat ze problemen worden.',
    },
  ],
  aboutHero: {
    kicker: 'Over mij',
    title: 'Technisch scherp.',
    highlight: 'Menselijk helder.',
    text: 'Ik ben Oussama El Hajoui: software engineer met een sterke interesse in het snijvlak van ontwerp, gebruikerservaring en degelijke techniek.',
  },
  aboutQuote: 'Goede software merk je niet aan hoeveel techniek erin zit. Je merkt het aan hoe vanzelfsprekend alles werkt.',
  aboutParagraphs: [
    'Daarom kijk ik altijd naar het hele plaatje. Wat moet een bezoeker begrijpen? Welke stap moet eenvoudig voelen? En welke technische keuzes houden het product ook later prettig om aan te werken?',
    'Mijn frontendwerk ligt in React en Angular. Voor backends werk ik met Java en C#. Bij websites verbind ik die technische basis met sterke content, Tailwind CSS en een flexibel CMS zoals Strapi.',
    'Je werkt rechtstreeks met mij. Dat betekent korte lijnen, eerlijke verwachtingen en iemand die verantwoordelijkheid neemt voor het eindresultaat.',
  ],
  aboutValues: [
    {
      title: 'Kwaliteit zonder drama',
      text: 'Doordachte keuzes, nette uitvoering en open communicatie.',
    },
    {
      title: 'Eenvoud als resultaat',
      text: 'Complexiteit terugbrengen tot een ervaring die logisch aanvoelt.',
    },
    {
      title: 'Samen boven overdracht',
      text: 'Geen ticketfabriek, maar echt betrokken bij jouw doel.',
    },
  ],
  quoteHero: {
    kicker: 'Offerte aanvragen',
    title: 'Vertel me wat je',
    highlight: 'wilt bouwen.',
    text: 'Een paar duidelijke antwoorden zijn genoeg voor een goede eerste inschatting. Vrijblijvend en rechtstreeks bij mij in de inbox.',
  },
  quoteSteps: [
    {
      number: '01',
      title: 'Persoonlijke beoordeling',
      text: 'Ik lees je aanvraag persoonlijk.',
    },
    {
      number: '02',
      title: 'Korte kennismaking',
      text: 'Je ontvangt vragen of een voorstel voor een korte kennismaking.',
    },
    {
      number: '03',
      title: 'Helder voorstel',
      text: 'Daarna volgt een heldere scope, planning en prijs.',
    },
  ],
  cta: {
    kicker: 'Heb je een idee?',
    title: 'Laten we er iets sterks van maken.',
    text: 'Vertel kort wat je wilt bouwen. Je ontvangt persoonlijk antwoord met de slimste volgende stap.',
    buttonLabel: 'Start je aanvraag',
  },
  footerTagline: 'Websites en web apps die helder voelen, snel werken en klaar zijn om te groeien.',
  contact: {
    email: 'oussamaelhajoui@gmail.com',
    phone: '',
    location: 'Nederland',
    whatsappUrl: '',
    linkedinUrl: '',
    githubUrl: '',
  },
  tracking: {
    enabled: false,
    consentTitle: 'Jouw privacy, jouw keuze',
    consentText:
      'Met jouw toestemming gebruiken we analyse- en marketingtags om de website en campagnes te verbeteren. Zonder toestemming blijven alleen noodzakelijke functies actief.',
    googleTagManagerId: '',
    googleTagId: '',
    metaPixelId: '',
    tiktokPixelId: '',
    snapPixelId: '',
  },
};

const defaultLocations = [
  {
    name: 'Eindhoven',
    slug: 'eindhoven',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers en organisaties in Eindhoven bouw ik snelle websites die een technisch sterke indruk combineren met een helder verhaal en een duidelijke route naar contact.',
    localText: 'In een omgeving waar digitale kwaliteit en innovatie vanzelfsprekend zijn, moet je website direct professioneel aanvoelen. Daarom worden ontwerp, inhoud, vindbaarheid en performance vanaf de eerste schets als één geheel behandeld.',
    active: true,
    sortOrder: 10,
  },
  {
    name: 'Nuenen',
    slug: 'nuenen',
    province: 'Noord-Brabant',
    intro: 'Voor bedrijven in Nuenen maak ik herkenbare websites die persoonlijk aanvoelen, snel werken en duidelijk maken waarom klanten juist voor jouw organisatie moeten kiezen.',
    localText: 'Een sterke lokale reputatie verdient een online presentatie die dezelfde zorg en betrouwbaarheid uitstraalt. Je krijgt korte lijnen, een eigen ontwerp en content die bezoekers helpt om met vertrouwen de volgende stap te zetten.',
    active: true,
    sortOrder: 20,
  },
  {
    name: 'Geldrop',
    slug: 'geldrop',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers in Geldrop ontwikkel ik moderne websites en weboplossingen die diensten overzichtelijk presenteren en meer passende aanvragen opleveren.',
    localText: 'Of je klanten vooral uit Geldrop komen of uit de bredere regio: de website moet snel duidelijk maken wat je doet en waarom je betrouwbaar bent. De structuur en techniek worden daarop afgestemd.',
    active: true,
    sortOrder: 30,
  },
  {
    name: 'Best',
    slug: 'best',
    province: 'Noord-Brabant',
    intro: 'Voor bedrijven in Best bouw ik snelle, schaalbare websites die professioneel ogen, prettig werken op mobiel en klaar zijn om mee te groeien met de organisatie.',
    localText: 'Een goede website ondersteunt zowel lokale zichtbaarheid als verdere groei. Daarom combineer ik een scherpe paginastructuur met technische SEO, sterke prestaties en een CMS dat eenvoudig te beheren blijft.',
    active: true,
    sortOrder: 40,
  },
  {
    name: 'Mierlo',
    slug: 'mierlo',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers in Mierlo ontwerp en bouw ik websites die dichtbij en persoonlijk voelen, zonder in te leveren op uitstraling, snelheid of technische kwaliteit.',
    localText: 'Bezoekers willen snel weten wie je bent, wat je aanbiedt en hoe ze contact opnemen. Ik vertaal dat naar een rustige gebruikerservaring met duidelijke keuzes en een overtuigende presentatie.',
    active: true,
    sortOrder: 50,
  },
  {
    name: 'Asten',
    slug: 'asten',
    province: 'Noord-Brabant',
    intro: 'Voor organisaties in Asten maak ik professionele websites die lokale betrokkenheid verbinden met een moderne digitale uitstraling en betrouwbare techniek.',
    localText: 'Je website moet niet alleen mooi zijn, maar vooral helder uitleggen wat je voor klanten oplost. Daarom staan leesbaarheid, mobiele snelheid en een logische contactroute centraal.',
    active: true,
    sortOrder: 60,
  },
  {
    name: 'Lierop',
    slug: 'lierop',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers in Lierop bouw ik toegankelijke websites waarmee een lokaal bedrijf professioneel zichtbaar wordt voor klanten binnen én buiten de directe omgeving.',
    localText: 'Een compacte organisatie heeft baat bij een website die eenvoudig te beheren is en zonder omwegen resultaat ondersteunt. De oplossing blijft overzichtelijk, snel en voorbereid op uitbreiding.',
    active: true,
    sortOrder: 70,
  },
  {
    name: 'Son en Breugel',
    slug: 'son-en-breugel',
    province: 'Noord-Brabant',
    intro: 'Voor bedrijven in Son en Breugel ontwikkel ik onderscheidende websites en weboplossingen met een duidelijke boodschap, snelle laadtijd en professionele uitstraling.',
    localText: 'De combinatie van lokale herkenbaarheid en de nabijheid van een sterke zakelijke regio vraagt om een website die vertrouwen geeft én ambitie uitstraalt. Ontwerp en techniek worden daarop afgestemd.',
    active: true,
    sortOrder: 80,
  },
];

function isEmpty(value: unknown) {
  return value == null || value === '';
}

const strapiConfig = {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const uid = 'api::site-setting.site-setting' as const;
    const existing = await strapi.documents(uid).findFirst({
      status: 'published',
      populate: '*',
    });

    if (!existing) {
      await strapi.documents(uid).create({
        status: 'published',
        data: defaultContent as never,
      });
    } else {
      const missingContent = Object.fromEntries(
        Object.entries(defaultContent).filter(([key]) => isEmpty(existing[key as keyof typeof existing])),
      );

      if (Object.keys(missingContent).length > 0) {
        await strapi.documents(uid).update({
          documentId: existing.documentId,
          status: 'published',
          data: missingContent as never,
        });
      }

      const existingServices = Array.isArray(existing.services) ? existing.services : [];
      const servicesNeedLandingFields = existingServices.some((service) => {
        const item = service as Record<string, unknown>;
        return isEmpty(item.slug) || isEmpty(item.seoKeyword) || isEmpty(item.landingIntro);
      });

      if (servicesNeedLandingFields) {
        const defaultsByNumber = new Map(defaultContent.services.map((service) => [service.number, service]));
        const services = existingServices.map((service) => {
          const item = Object.fromEntries(
            Object.entries(service as Record<string, unknown>).filter(([key]) => key !== 'id'),
          );
          const fallback = defaultsByNumber.get(String(item.number));
          if (!fallback) return service;
          return {
            ...item,
            slug: isEmpty(item.slug) ? fallback.slug : item.slug,
            seoKeyword: isEmpty(item.seoKeyword) ? fallback.seoKeyword : item.seoKeyword,
            landingIntro: isEmpty(item.landingIntro) ? fallback.landingIntro : item.landingIntro,
            isWebsiteService: fallback.isWebsiteService,
          };
        });

        await strapi.documents(uid).update({
          documentId: existing.documentId,
          status: 'published',
          data: { services } as never,
        });
      }
    }

    const locationUid = 'api::location.location' as const;
    for (const location of defaultLocations) {
      const existingLocation = await strapi.db.query(locationUid).findOne({
        where: { slug: location.slug },
      });
      if (!existingLocation) {
        await strapi.documents(locationUid).create({
          status: 'published',
          data: location as never,
        });
      }
    }

    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      const actions = [
        'api::site-setting.site-setting.find',
        'api::project.project.find',
        'api::project.project.findOne',
        'api::location.location.find',
        'api::location.location.findOne',
      ];

      for (const action of actions) {
        const permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
          where: { action, role: publicRole.id },
        });

        if (!permission) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRole.id },
          });
        }
      }
    }
  },
};

export default strapiConfig;
