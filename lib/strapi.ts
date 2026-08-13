import snapshot from "@/content/site.json";

export type SiteContent = {
  heroTitle: string;
  heroText: string;
  availability: string;
  quoteEmail: string;
  stack: string[];
};

const fallbackContent: SiteContent = snapshot;

export async function getSiteContent(): Promise<SiteContent> {
  const baseUrl = process.env.STRAPI_URL?.replace(/\/$/, "");
  if (!baseUrl) return fallbackContent;

  try {
    const response = await fetch(`${baseUrl}/api/site-setting`, {
      headers: process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : undefined,
    });
    if (!response.ok) return fallbackContent;
    const payload = (await response.json()) as { data?: Partial<SiteContent> };
    return { ...fallbackContent, ...payload.data };
  } catch {
    return fallbackContent;
  }
}
