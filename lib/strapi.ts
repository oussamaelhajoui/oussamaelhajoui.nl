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
  slug: string;
  seoKeyword: string;
  searchTerms: string[];
  landingIntro: string;
  isWebsiteService: boolean;
  lead: string;
  detail: string;
  items: string[];
};

export type LocationContent = {
  name: string;
  slug: string;
  province: string;
  intro: string;
  localText: string;
  regionalContext: string;
  active: boolean;
  sortOrder: number;
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

export type ContactContent = {
  email: string;
  phone?: string | null;
  location?: string | null;
  whatsappUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
};

export type TrackingContent = {
  enabled: boolean;
  consentTitle: string;
  consentText: string;
  googleTagManagerId?: string | null;
  googleTagId?: string | null;
  metaPixelId?: string | null;
  tiktokPixelId?: string | null;
  snapPixelId?: string | null;
};

export type CustomMetaTagContent = {
  attribute: "name" | "property";
  metaKey: string;
  content: string;
};

export type ProjectContent = {
  title: string;
  slug: string;
  summary: string;
  description?: string | null;
  client?: string | null;
  year?: string | null;
  projectUrl?: string | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  featured: boolean;
  technologies: string[];
  services?: string[] | null;
  sortOrder: number;
};

export type SiteContent = {
  siteName: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  socialTitle: string;
  socialDescription: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  googleSiteVerification?: string | null;
  bingSiteVerification?: string | null;
  customMetaTags: CustomMetaTagContent[];
  heroTitle: string;
  heroHighlight: string;
  heroText: string;
  availability: string;
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
  contact: ContactContent;
  tracking: TrackingContent;
};

type SiteSnapshot = SiteContent & { projects: ProjectContent[]; locations: LocationContent[] };

const fallbackSnapshot = snapshot as SiteSnapshot;
const { projects: fallbackProjects, locations: fallbackLocations, ...fallbackContent } = fallbackSnapshot;

function hasContent(value: unknown) {
  return value != null && value !== "";
}

function getDevelopmentStrapiUrl() {
  if (process.env.NODE_ENV === "production") return "";
  return process.env.STRAPI_URL?.replace(/\/$/, "") ?? "";
}

export async function getProjects(): Promise<ProjectContent[]> {
  const baseUrl = getDevelopmentStrapiUrl();
  if (!baseUrl) return fallbackProjects;

  try {
    const response = await fetch(`${baseUrl}/api/projects?populate=coverImage&sort=sortOrder:asc&pagination[pageSize]=100`, {
      headers: process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : undefined,
    });
    if (!response.ok) return fallbackProjects;

    const payload = (await response.json()) as {
      data?: Array<ProjectContent & { coverImage?: { url?: string; alternativeText?: string | null } | null }>;
    };
    if (!Array.isArray(payload.data)) return fallbackProjects;

    return payload.data.map(({ coverImage, ...project }) => ({
      ...project,
      coverImageUrl: coverImage?.url
        ? (coverImage.url.startsWith("http") ? coverImage.url : `${baseUrl}${coverImage.url}`)
        : null,
      coverImageAlt: coverImage?.alternativeText || project.title,
    }));
  } catch {
    return fallbackProjects;
  }
}

export async function getLocations(): Promise<LocationContent[]> {
  const baseUrl = getDevelopmentStrapiUrl();
  if (!baseUrl) return fallbackLocations;

  try {
    const response = await fetch(
      `${baseUrl}/api/locations?filters[active][$eq]=true&sort=sortOrder:asc&pagination[pageSize]=100`,
      {
        headers: process.env.STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
          : undefined,
      },
    );
    if (!response.ok) return fallbackLocations;

    const payload = (await response.json()) as { data?: LocationContent[] };
    return Array.isArray(payload.data) ? payload.data : fallbackLocations;
  } catch {
    return fallbackLocations;
  }
}

export function getServiceLocationPath(service: ServiceContent, location: LocationContent) {
  return service.isWebsiteService
    ? `/website-laten-maken/${location.slug}/`
    : `/diensten/${service.slug}/${location.slug}/`;
}

export async function getSiteContent(): Promise<SiteContent> {
  const baseUrl = getDevelopmentStrapiUrl();
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
