export type SiteContent = {
  heroTitle: string;
  heroText: string;
  availability: string;
  quoteEmail: string;
  stack: string[];
};

const fallbackContent: SiteContent = {
  heroTitle: "Websites en web apps",
  heroText: "Ik ben Oussama El Hajoui, software engineer. Ik ontwerp en bouw snelle digitale ervaringen met React, Angular, Java en C# — van eerste idee tot solide eindproduct.",
  availability: "Beschikbaar voor nieuwe projecten",
  quoteEmail: "oussamaelhajoui@gmail.com",
  stack: ["React", "Angular", "Java", "C#"],
};

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
