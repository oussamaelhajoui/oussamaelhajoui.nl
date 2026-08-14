import type { Core } from '@strapi/strapi';

const defaultContent = {
  contentRevision: 4,
  siteName: 'Oussama El Hajoui',
  seoTitle: 'Oussama El Hajoui — Websites, webshops & software',
  seoDescription:
    'Websites en webshops laten maken in Eindhoven en omgeving. Met WordPress, Shopify, React, Angular, Java, C# en persoonlijke begeleiding.',
  seoKeywords: [
    'software engineer',
    'website laten maken',
    'website laten maken Eindhoven',
    'website bouwen Eindhoven',
    'webshop laten maken Eindhoven',
    'WordPress developer',
    'Shopify developer',
    'Shopify Liquid developer',
    'web app development',
    'React developer',
    'Angular developer',
    'Java developer',
    'C# developer',
    'AI training bedrijven',
    'security assessment',
    'pentest uitvoeren',
    'technisch projectleider',
    'Eindhoven',
  ],
  socialTitle: 'Oussama El Hajoui — Websites, webshops & software',
  socialDescription: 'Websites, Shopify-webshops en software die helder voelen, goed presteren en klaar zijn om te groeien.',
  robotsIndex: true,
  robotsFollow: true,
  googleSiteVerification: '',
  bingSiteVerification: '',
  customMetaTags: [],
  heroTitle: 'Websites en web apps',
  heroHighlight: 'die presteren.',
  heroText:
    'Ik ben Oussama El Hajoui, software engineer uit de regio Eindhoven. Ik ontwerp en bouw snelle websites, WordPress-sites, Shopify-webshops en web apps — van eerste idee tot solide eindproduct.',
  availability: 'Beschikbaar voor nieuwe projecten',
  stack: ['React', 'Angular', 'Java', 'C#'],
  homeServices: [
    {
      number: '01',
      title: 'Websites die converteren',
      text: 'Maatwerk of WordPress met een scherpe structuur, onderscheidend ontwerp en technische SEO. Gebouwd om snel te laden én actie uit te lokken.',
      tags: ['UX/UI', 'WordPress', 'SEO'],
    },
    {
      number: '02',
      title: 'Webshops die verkopen',
      text: 'Shopify- en WooCommerce-webshops met een heldere klantreis, snelle techniek en Liquid-maatwerk waar dat nodig is.',
      tags: ['Shopify', 'Liquid', 'WooCommerce'],
    },
    {
      number: '03',
      title: 'Web apps die meegroeien',
      text: 'Van intern portaal tot klantplatform: intuïtieve interfaces met een solide architectuur onder de motorkap.',
      tags: ['React', 'Angular', "API's"],
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
    title: 'Van converterende webshop tot',
    highlight: 'solide software.',
    text: 'Websites, webshops, software, security en technische begeleiding vanuit één ervaren aanspreekpunt. Dat houdt de lijn kort en het resultaat sterk.',
  },
  services: [
    {
      number: '01',
      title: 'Websites & WordPress',
      slug: 'websites',
      seoKeyword: 'Website laten maken',
      searchTerms: ['website bouwen', 'website laten maken', 'WordPress website', 'webdesigner', 'webdeveloper'],
      landingIntro: 'Een professionele website die snel laadt, vertrouwen wekt en bezoekers richting contact of aanvraag begeleidt.',
      isWebsiteService: true,
      lead: 'Snel, vindbaar en ontworpen om vertrouwen om te zetten in aanvragen.',
      detail: 'Van positionering en paginastructuur tot responsive bouw, technische SEO en CMS-inrichting. Ik bouw maatwerk met moderne webtechniek en ontwikkel of verbeter ook WordPress-websites wanneer dat beter bij je organisatie past.',
      items: ['UX & visueel ontwerp', 'WordPress ontwikkeling', 'Technische SEO', 'Performance', 'Strapi CMS'],
    },
    {
      number: '02',
      title: 'Webshops & e-commerce',
      slug: 'webshops',
      seoKeyword: 'Webshop laten maken',
      searchTerms: ['Shopify webshop', 'WooCommerce webshop', 'Shopify developer', 'Liquid developer', 'e-commerce ontwikkeling'],
      landingIntro: 'Een snelle webshop die producten overtuigend presenteert, prettig afrekent en technisch klaar is om door te groeien.',
      isWebsiteService: false,
      lead: 'Shopify en WooCommerce met aandacht voor conversie, beheer en snelheid.',
      detail: 'Ik bouw en verbeter webshops in Shopify en WooCommerce. Voor Shopify kan ik thema’s en secties aanpassen met Liquid, integraties realiseren en de winkelervaring gericht optimaliseren.',
      items: ['Shopify', 'Liquid maatwerk', 'WooCommerce', 'Betalingen & integraties', 'Conversie-optimalisatie'],
    },
    {
      number: '03',
      title: 'Web apps',
      slug: 'web-apps',
      seoKeyword: 'Web app laten maken',
      searchTerms: ['webapplicatie ontwikkelen', 'React web app', 'Angular web app', 'klantportaal', 'dashboard ontwikkelen'],
      landingIntro: 'Een gebruiksvriendelijke webapp die complexe processen terugbrengt tot een heldere ervaring voor klanten en teams.',
      isWebsiteService: false,
      lead: 'Gebruiksvriendelijke tools voor klanten, teams en complexe processen.',
      detail: 'Ik vertaal workflows naar een heldere interface en schaalbare frontend. Denk aan dashboards, klantportalen, configurators en interne applicaties.',
      items: ['React', 'Angular', 'Design systems', 'API-integraties'],
    },
    {
      number: '04',
      title: "Backend & API's",
      slug: 'backend-apis',
      seoKeyword: 'Backend en API laten ontwikkelen',
      searchTerms: ['Java backend', 'C# .NET backend', 'API ontwikkeling', 'software integraties'],
      landingIntro: 'Een veilige en onderhoudbare backend met API-koppelingen die passen bij je product, processen en groeiplannen.',
      isWebsiteService: false,
      lead: 'Een stevige technische basis waarop je verder kunt bouwen.',
      detail: 'Onderhoudbare services, datamodellen en koppelingen met aandacht voor veiligheid, testbaarheid en heldere verantwoordelijkheden.',
      items: ['Java', 'C# / .NET', "REST API's", 'Integraties'],
    },
    {
      number: '05',
      title: 'Doorontwikkeling',
      slug: 'doorontwikkeling',
      seoKeyword: 'Software laten doorontwikkelen',
      searchTerms: ['software moderniseren', 'legacy software verbeteren', 'performance audit', 'refactoring'],
      landingIntro: 'Bestaande software gericht verbeteren met extra functies, een snellere interface en een beter onderhoudbare technische basis.',
      isWebsiteService: false,
      lead: 'Bestaande software sneller, duidelijker en beter onderhoudbaar maken.',
      detail: 'Ik help bij gerichte performanceverbetering, een nieuw frontend-onderdeel, technische opschoning of het stap voor stap moderniseren van je product.',
      items: ['Performance audit', 'Refactoring', 'Nieuwe features', 'Technisch advies'],
    },
    {
      number: '06',
      title: 'AI-training & gastlessen',
      slug: 'ai-training-gastlessen',
      seoKeyword: 'AI training of gastles boeken',
      searchTerms: ['AI training bedrijven', 'AI workshop', 'gastles kunstmatige intelligentie', 'prompt engineering training'],
      landingIntro: 'Praktische AI-trainingen en gastlessen die teams en studenten leren wat generatieve AI kan, waar de risico’s liggen en hoe je er verantwoord mee werkt.',
      isWebsiteService: false,
      lead: 'Toegankelijke, actuele AI-kennis vertaald naar de dagelijkse praktijk.',
      detail: 'Van interactieve gastles tot bedrijfstraining: deelnemers leren concrete toepassingen herkennen, betere instructies schrijven, resultaten beoordelen en zorgvuldig omgaan met privacy, veiligheid en betrouwbaarheid.',
      items: ['AI-geletterdheid', 'Prompt engineering', 'Praktische workshops', 'Gastlessen', 'Veilig & verantwoord gebruik'],
    },
    {
      number: '07',
      title: 'Security-assessments & pentests',
      slug: 'security-assessments-pentests',
      seoKeyword: 'Security assessment en pentest',
      searchTerms: ['digitale security assessment', 'webapp pentest', 'API pentest', 'cybersecurity onderzoek'],
      landingIntro: 'Een gericht security-onderzoek dat kwetsbaarheden zichtbaar maakt en vertaalt naar duidelijke, uitvoerbare verbeterpunten.',
      isWebsiteService: false,
      lead: 'Praktisch inzicht in digitale risico’s, kwetsbaarheden en herstelprioriteiten.',
      detail: 'Ik voer geautoriseerde security-assessments en pentests uit op websites, webapplicaties en API’s. Je ontvangt een heldere rapportage met impact, reproduceerbare bevindingen en concreet hersteladvies.',
      items: ['Webapp & API pentest', 'Configuratie-review', 'Risicoanalyse', 'Heldere rapportage', 'Hersteladvies'],
    },
    {
      number: '08',
      title: 'Technisch project- & teamleiderschap',
      slug: 'technisch-projectleider',
      seoKeyword: 'Technisch projectleider inhuren',
      searchTerms: ['software projectleider', 'development team lead', 'nearshore team aansturen', 'offshore team aansturen', 'farshore team aansturen'],
      landingIntro: 'Technische leiding voor softwareprojecten en developmentteams, met grip op scope, architectuur, communicatie en levering.',
      isWebsiteService: false,
      lead: 'Rust, richting en technische kwaliteit voor lokale, nearshore en offshore teams.',
      detail: 'Ik kan projecten technisch leiden, stakeholders en engineers verbinden en nearshore-, offshore- of farshoreteams begeleiden. Daarbij bewaak ik haalbaarheid, architectuur, kwaliteit, planning en een transparante voortgang.',
      items: ['Technische projectleiding', 'Teamcoördinatie', 'Architectuurkeuzes', 'Nearshore, offshore & farshore', 'Stakeholdercommunicatie'],
    },
  ],
  audienceCards: [
    {
      title: 'Een website of webshop',
      text: 'Je organisatie is gegroeid en heeft een snelle website, WordPress-oplossing of Shopify-webshop nodig die beter verkoopt.',
    },
    {
      title: 'Een digitaal product',
      text: 'Je wilt een portaal, dashboard of web app van idee naar eerste versie brengen.',
    },
    {
      title: 'AI-kennis voor je team',
      text: 'Je zoekt een praktische training, workshop of gastles over generatieve AI en verantwoord gebruik.',
    },
    {
      title: 'Digitale zekerheid',
      text: 'Je wilt met een security-assessment of geautoriseerde pentest weten waar de belangrijkste risico’s zitten.',
    },
    {
      title: 'Extra engineeringkracht',
      text: 'Je team kan tijdelijk een ervaren frontend- of backendbouwer gebruiken.',
    },
    {
      title: 'Technische leiding',
      text: 'Je project of nearshore- of offshoreteam heeft behoefte aan richting, afstemming en technische kwaliteitsbewaking.',
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

const defaultProjects = [
  {
    title: 'Kompas Advies — leadgerichte website',
    slug: 'kompas-advies-website',
    summary: 'Een heldere corporate website die complexe dienstverlening terugbrengt tot duidelijke keuzes en gerichte aanvragen.',
    description: 'De conceptcase combineert een rustige visuele stijl, lokale SEO-landingspagina’s en een flexibel Strapi-CMS. De mobiele route naar een kennismaking staat centraal.',
    client: 'Zakelijke dienstverlening',
    year: '2026',
    projectUrl: '',
    isConcept: true,
    featured: true,
    technologies: ['Next.js', 'Tailwind CSS', 'Strapi', 'Technische SEO'],
    services: ['Website', 'UX/UI', 'SEO', 'CMS'],
    sortOrder: 10,
  },
  {
    title: 'Noorderlicht Living — Shopify-webshop',
    slug: 'noorderlicht-shopify-webshop',
    summary: 'Een premium storefront met snelle productontdekking, sterke mobiele presentatie en een rustige route naar de checkout.',
    description: 'Voor deze conceptshop zijn herbruikbare Shopify-secties, Liquid-componenten, productfilters en redactionele collectiepagina’s uitgewerkt met conversie en eenvoudig beheer als uitgangspunt.',
    client: 'Interieur & e-commerce',
    year: '2026',
    projectUrl: '',
    isConcept: true,
    featured: true,
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'CRO'],
    services: ['Webshop', 'Shopify', 'Liquid maatwerk'],
    sortOrder: 20,
  },
  {
    title: 'RouteFlow — operations platform',
    slug: 'routeflow-operations-platform',
    summary: 'Een overzichtelijk operationsdashboard waarmee planners capaciteit, uitzonderingen en voortgang vanuit één werkplek bewaken.',
    description: 'De case vertaalt een druk logistiek proces naar rollen, duidelijke statussen en gerichte acties. Een React-interface communiceert met onderhoudbare Java-services en realtime updates.',
    client: 'Logistiek & operations',
    year: '2026',
    projectUrl: '',
    isConcept: true,
    featured: true,
    technologies: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    services: ['Web app', 'Backend & API', 'Technische projectleiding'],
    sortOrder: 30,
  },
  {
    title: 'Zorgpad — veilig cliëntportaal',
    slug: 'zorgpad-clientportaal',
    summary: 'Een toegankelijk cliëntportaal voor afspraken, documenten en veilige communicatie, ontworpen voor rust en duidelijkheid.',
    description: 'Deze conceptcase focust op inclusieve interactie, sterke autorisatie en een helder auditspoor. De technische opzet scheidt gevoelige processen en maakt gecontroleerde uitbreiding mogelijk.',
    client: 'Zorg & dienstverlening',
    year: '2026',
    projectUrl: '',
    isConcept: true,
    featured: false,
    technologies: ['Angular', 'C#', '.NET', 'Azure', 'WCAG'],
    services: ['Web app', 'Backend & API', 'Security'],
    sortOrder: 40,
  },
  {
    title: 'AI Werkplaats — training platform',
    slug: 'ai-werkplaats-training-platform',
    summary: 'Een interactief leerplatform dat teams stap voor stap laat oefenen met generatieve AI, privacy en resultaatbeoordeling.',
    description: 'De leerroute combineert korte uitleg, praktijkscenario’s en reflectievragen. Beheerders kunnen programma’s samenstellen voor bedrijfstrainingen, workshops en gastlessen.',
    client: 'Onderwijs & teams',
    year: '2026',
    projectUrl: '',
    isConcept: true,
    featured: false,
    technologies: ['React', 'Strapi', 'AI-geletterdheid', 'Accessibility'],
    services: ['AI-training', 'Gastlessen', 'Web app'],
    sortOrder: 50,
  },
  {
    title: 'SecureScope — assessment workspace',
    slug: 'securescope-assessment-workspace',
    summary: 'Een beveiligde workspace die technische bevindingen vertaalt naar risico, bewijs en concrete herstelprioriteiten.',
    description: 'De conceptoplossing ondersteunt een geautoriseerde assessmentworkflow: scope vastleggen, bevindingen structureren, bewijs afschermen en een begrijpelijke managementrapportage opleveren.',
    client: 'Digital security',
    year: '2026',
    projectUrl: '',
    isConcept: true,
    featured: false,
    technologies: ['React', 'C#', '.NET', 'OWASP', 'Security reporting'],
    services: ['Security-assessment', 'Pentest rapportage', 'Web app'],
    sortOrder: 60,
  },
];

const defaultLocations = [
  {
    name: 'Eindhoven',
    slug: 'eindhoven',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers en organisaties in Eindhoven bouw ik snelle websites die een technisch sterke indruk combineren met een helder verhaal en een duidelijke route naar contact.',
    localText: 'In een omgeving waar digitale kwaliteit en innovatie vanzelfsprekend zijn, moet je website direct professioneel aanvoelen. Daarom worden ontwerp, inhoud, vindbaarheid en performance vanaf de eerste schets als één geheel behandeld.',
    regionalContext: 'Eindhoven kent een sterke mix van technologiebedrijven, mkb, onderwijs en groeiende organisaties. Ik sluit daarop aan met korte lijnen, technische diepgang en oplossingen die zowel lokale zichtbaarheid als verdere groei ondersteunen.',
    active: true,
    sortOrder: 10,
  },
  {
    name: 'Nuenen',
    slug: 'nuenen',
    province: 'Noord-Brabant',
    intro: 'Voor bedrijven in Nuenen maak ik herkenbare websites die persoonlijk aanvoelen, snel werken en duidelijk maken waarom klanten juist voor jouw organisatie moeten kiezen.',
    localText: 'Een sterke lokale reputatie verdient een online presentatie die dezelfde zorg en betrouwbaarheid uitstraalt. Je krijgt korte lijnen, een eigen ontwerp en content die bezoekers helpt om met vertrouwen de volgende stap te zetten.',
    regionalContext: 'Voor organisaties in Nuenen zijn persoonlijk contact en een betrouwbare uitvoering vaak net zo belangrijk als de techniek. Daarom werk ik transparant en vertaal ik complexe keuzes naar een praktische aanpak.',
    active: true,
    sortOrder: 20,
  },
  {
    name: 'Geldrop',
    slug: 'geldrop',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers in Geldrop ontwikkel ik moderne websites en weboplossingen die diensten overzichtelijk presenteren en meer passende aanvragen opleveren.',
    localText: 'Of je klanten vooral uit Geldrop komen of uit de bredere regio: de website moet snel duidelijk maken wat je doet en waarom je betrouwbaar bent. De structuur en techniek worden daarop afgestemd.',
    regionalContext: 'Geldrop ligt midden in een ondernemende regio met zowel lokale dienstverleners als technische organisaties. Digitale oplossingen moeten daar betrouwbaar, duidelijk en zonder onnodige complexiteit inzetbaar zijn.',
    active: true,
    sortOrder: 30,
  },
  {
    name: 'Best',
    slug: 'best',
    province: 'Noord-Brabant',
    intro: 'Voor bedrijven in Best bouw ik snelle, schaalbare websites die professioneel ogen, prettig werken op mobiel en klaar zijn om mee te groeien met de organisatie.',
    localText: 'Een goede website ondersteunt zowel lokale zichtbaarheid als verdere groei. Daarom combineer ik een scherpe paginastructuur met technische SEO, sterke prestaties en een CMS dat eenvoudig te beheren blijft.',
    regionalContext: 'Best combineert een sterke lokale economie met directe aansluiting op de Brainport-regio. Ik help organisaties om digitale ambities om te zetten in overzichtelijke projecten en onderhoudbare techniek.',
    active: true,
    sortOrder: 40,
  },
  {
    name: 'Helmond',
    slug: 'helmond',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers en organisaties in Helmond bouw ik snelle websites en digitale oplossingen die een professionele uitstraling combineren met een duidelijke route naar contact of verkoop.',
    localText: 'Een sterke website voor de Helmondse markt moet direct vertrouwen wekken, uitstekend werken op mobiel en inhoudelijk aansluiten op de vragen van je doelgroep. Daarom verbind ik ontwerp, lokale vindbaarheid, performance en eenvoudig beheer vanaf het begin.',
    regionalContext: 'Helmond heeft een brede mix van maakindustrie, zakelijke dienstverlening, retail en groeiende ondernemingen binnen de Brainport-regio. Ik help deze organisaties met korte lijnen, praktische technische keuzes en een digitale basis die kan meegroeien.',
    active: true,
    sortOrder: 45,
  },
  {
    name: 'Mierlo',
    slug: 'mierlo',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers in Mierlo ontwerp en bouw ik websites die dichtbij en persoonlijk voelen, zonder in te leveren op uitstraling, snelheid of technische kwaliteit.',
    localText: 'Bezoekers willen snel weten wie je bent, wat je aanbiedt en hoe ze contact opnemen. Ik vertaal dat naar een rustige gebruikerservaring met duidelijke keuzes en een overtuigende presentatie.',
    regionalContext: 'Organisaties in Mierlo profiteren van een partner die dichtbij werkt en tegelijk brede technische ervaring meebrengt. De samenwerking blijft persoonlijk, concreet en gericht op een bruikbaar resultaat.',
    active: true,
    sortOrder: 50,
  },
  {
    name: 'Asten',
    slug: 'asten',
    province: 'Noord-Brabant',
    intro: 'Voor organisaties in Asten maak ik professionele websites die lokale betrokkenheid verbinden met een moderne digitale uitstraling en betrouwbare techniek.',
    localText: 'Je website moet niet alleen mooi zijn, maar vooral helder uitleggen wat je voor klanten oplost. Daarom staan leesbaarheid, mobiele snelheid en een logische contactroute centraal.',
    regionalContext: 'In Asten werken veel organisaties vanuit langdurige klantrelaties en een praktische mentaliteit. Mijn aanpak sluit daarop aan: heldere afspraken, direct contact en techniek die aantoonbaar iets oplevert.',
    active: true,
    sortOrder: 60,
  },
  {
    name: 'Lierop',
    slug: 'lierop',
    province: 'Noord-Brabant',
    intro: 'Voor ondernemers in Lierop bouw ik toegankelijke websites waarmee een lokaal bedrijf professioneel zichtbaar wordt voor klanten binnen én buiten de directe omgeving.',
    localText: 'Een compacte organisatie heeft baat bij een website die eenvoudig te beheren is en zonder omwegen resultaat ondersteunt. De oplossing blijft overzichtelijk, snel en voorbereid op uitbreiding.',
    regionalContext: 'Voor compacte organisaties in Lierop is een flexibele technische partner vaak waardevoller dan een groot projectteam. Ik houd de aanpak overzichtelijk en maak keuzes die passen bij de schaal en ambitie.',
    active: true,
    sortOrder: 70,
  },
  {
    name: 'Son en Breugel',
    slug: 'son-en-breugel',
    province: 'Noord-Brabant',
    intro: 'Voor bedrijven in Son en Breugel ontwikkel ik onderscheidende websites en weboplossingen met een duidelijke boodschap, snelle laadtijd en professionele uitstraling.',
    localText: 'De combinatie van lokale herkenbaarheid en de nabijheid van een sterke zakelijke regio vraagt om een website die vertrouwen geeft én ambitie uitstraalt. Ontwerp en techniek worden daarop afgestemd.',
    regionalContext: 'Son en Breugel ligt dicht bij een sterk netwerk van zakelijke en technische bedrijven. Ik ondersteun organisaties met een professionele aanpak, duidelijke communicatie en oplossingen die schaalbaar blijven.',
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
      const currentRevision = typeof existing.contentRevision === 'number' ? existing.contentRevision : 1;
      const defaultPublicContent = Object.fromEntries(
        Object.entries(defaultContent).filter(([key]) => key !== 'contentRevision'),
      );
      const missingContent = Object.fromEntries(
        Object.entries(defaultPublicContent).filter(([key]) => isEmpty(existing[key as keyof typeof existing])),
      );

      if (Object.keys(missingContent).length > 0) {
        await strapi.documents(uid).update({
          documentId: existing.documentId,
          status: 'published',
          data: missingContent as never,
        });
      }

      if (currentRevision < defaultContent.contentRevision) {
        await strapi.documents(uid).update({
          documentId: existing.documentId,
          status: 'published',
          data: {
            contentRevision: defaultContent.contentRevision,
            seoTitle: defaultContent.seoTitle,
            seoDescription: defaultContent.seoDescription,
            seoKeywords: defaultContent.seoKeywords,
            socialTitle: defaultContent.socialTitle,
            socialDescription: defaultContent.socialDescription,
            heroText: defaultContent.heroText,
            homeServices: defaultContent.homeServices,
            servicesHero: defaultContent.servicesHero,
            services: defaultContent.services,
            audienceCards: defaultContent.audienceCards,
          } as never,
        });
      } else {
        const existingServices = Array.isArray(existing.services) ? existing.services : [];
        const servicesNeedLandingFields = existingServices.some((service) => {
          const item = service as Record<string, unknown>;
          return isEmpty(item.slug) || isEmpty(item.seoKeyword) || isEmpty(item.landingIntro) || !Array.isArray(item.searchTerms);
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
              searchTerms: Array.isArray(item.searchTerms) ? item.searchTerms : fallback.searchTerms,
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
      } else if (isEmpty(existingLocation.regionalContext) && existingLocation.documentId) {
        await strapi.documents(locationUid).update({
          documentId: existingLocation.documentId,
          status: 'published',
          data: { regionalContext: location.regionalContext } as never,
        });
      }
    }

    const projectUid = 'api::project.project' as const;
    for (const project of defaultProjects) {
      const existingProject = await strapi.db.query(projectUid).findOne({
        where: { slug: project.slug },
      });
      if (!existingProject) {
        await strapi.documents(projectUid).create({
          status: 'published',
          data: project as never,
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
