const SITE_URL = "https://arnab9961.github.io/";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}sitemap.xml`,
  };
}
