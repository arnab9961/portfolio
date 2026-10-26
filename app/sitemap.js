import { CASE_STUDIES } from "../src/constants/caseStudies";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://arnab9961.github.io/",
    },
    ...Object.values(CASE_STUDIES).map((caseStudy) => ({
      url: caseStudy.canonical,
    })),
  ];
}
