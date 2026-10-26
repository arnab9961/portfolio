import PortfolioApp from "../src/App";

const SITE_URL = "https://arnab9961.github.io/";
const OG_IMAGE_URL = `${SITE_URL}assets/og-image.png`;
const DESCRIPTION =
  "AI Engineer in Dhaka building practical machine learning, computer vision, language model and backend systems.";
const SOCIAL_DESCRIPTION =
  "Explore AI engineering projects, research publications and applied machine learning work by D.M. Rafiun Bin Masud.";

export const dynamic = "error";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "D.M. Rafiun Bin Masud | AI Engineer",
  description: DESCRIPTION,
  authors: [{ name: "D.M. Rafiun Bin Masud" }],
  keywords: [
    "AI Engineer Bangladesh",
    "Machine Learning Engineer",
    "Computer Vision",
    "Large Language Models",
    "RAG",
    "FastAPI",
    "Python",
    "MLOps",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    title: "D.M. Rafiun Bin Masud | Technical Portfolio",
    description: SOCIAL_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "D.M. Rafiun Bin Masud's AI engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D.M. Rafiun Bin Masud's AI Engineering Portfolio",
    images: [OG_IMAGE_URL],
  },
  appleWebApp: {
    capable: true,
    title: "Rafiun's Portfolio",
    statusBarStyle: "black-translucent",
  },
  other: {
    image: OG_IMAGE_URL,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "D.M. Rafiun Bin Masud",
  image: OG_IMAGE_URL,
  jobTitle: "AI Engineer",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/arnab9961/",
    "https://github.com/arnab9961",
    "https://www.kaggle.com/arnab9961",
    "https://www.researchgate.net/profile/Dm-Masud-2/publications",
  ],
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "East West University",
    url: "https://www.ewubd.edu",
  },
  knowsAbout: [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Computer Vision",
    "Natural Language Processing",
    "FastAPI",
    "REST APIs",
    "Docker",
    "AWS",
    "GCP",
    "MLOps",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        id="person-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioApp />
    </>
  );
}
