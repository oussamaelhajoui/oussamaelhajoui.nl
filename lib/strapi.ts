import snapshot from "@/content/site.json";

export type PageHeroContent = {
  kicker: string;
  title: string;
  highlight?: string | null;
  text: string;
};

export type SummaryCardContent = {
  title: string;
  text: string;
};

export type HomeServiceContent = SummaryCardContent & {
  number: string;
  tags: string[];
};

export type ServiceContent = {
  number: string;
  title: string;
  lead: string;
  detail: string;
  items: string[];
};

export type ProcessStepContent = SummaryCardContent & {
  number: string;
  result?: string | null;
};

export type CallToActionContent = {
  kicker: string;
  title: string;
  text: string;
  buttonLabel: string;
};

export type SiteContent = {
  heroTitle: string;
  heroHighlight: string;
  heroText: string;
  availability: string;
  quoteEmail: string;
  stack: string[];
  homeServices: HomeServiceContent[];
  homePrinciples: SummaryCardContent[];
  servicesHero: PageHeroContent;
  services: ServiceContent[];
  audienceCards: SummaryCardContent[];
  processHero: PageHeroContent;
  processSteps: ProcessStepContent[];
  collaborationCards: SummaryCardContent[];
  aboutHero: PageHeroContent;
  aboutQuote: string;
  aboutParagraphs: string[];
  aboutValues: SummaryCardContent[];
  quoteHero: PageHeroContent;
  quoteSteps: ProcessStepContent[];
  cta: CallToActionContent;
  footerTagline: string;
};

const fallbackContent = snapshot as SiteContent;

function hasContent(value: unknown) {
  return value != null && value !== "";
}

export async function getSiteContent(): Promise<SiteContent> {
  const baseUrl = process.env.STRAPI_URL?.replace(/\/$/, "");
  if (!baseUrl) return fallbackContent;

  try {
    const response = await fetch(`${baseUrl}/api/site-setting?populate=*`, {
      headers: process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : undefined,
    });
    if (!response.ok) return fallbackContent;

    const payload = (await response.json()) as { data?: Partial<SiteContent> };
    const data = payload.data ?? {};

    return Object.fromEntries(
      Object.entries(fallbackContent).map(([key, fallback]) => {
        const value = data[key as keyof SiteContent];
        return [key, hasContent(value) ? value : fallback];
      }),
    ) as SiteContent;
  } catch {
    return fallbackContent;
  }
}
