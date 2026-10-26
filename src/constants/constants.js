export const HERO_CONTENT = {
  name: "D.M. Rafiun Bin Masud",
  resumeUrl: "https://arnab9961.github.io/data/DM_Rafiun_Bin_Masud_CV.pdf",
  eyebrow: "AI Engineer · Dhaka, Bangladesh",
  headline: "I build practical AI systems for real-world problems.",
  summary:
    "I am an AI Engineer at SM Technology, working across machine learning, computer vision, language models, backend APIs and production-ready deployment. I enjoy turning research ideas into useful, maintainable applications.",
  view: {
    day: {
      src: "https://arnab9961.github.io/images/now.jpg",
      alt: "Portrait of D.M. Rafiun Bin Masud",
      caption: "AI engineering, research and applied machine learning.",
    },
    night: {
      src: "https://arnab9961.github.io/images/now-2.png",
      alt: "D.M. Rafiun Bin Masud",
      caption: "Building intelligent systems with purpose.",
    },
  },
};

export const CONTACT = {
  intro:
    "I am open to conversations about AI engineering, machine learning, backend systems, research collaborations and applied AI products.",
  address: "Dhaka, Bangladesh",
  email: "dmrafiun@gmail.com",
  socials: {
    github: "https://github.com/arnab9961",
    linkedin: "https://www.linkedin.com/in/arnab9961/",
    kaggle: "https://www.kaggle.com/arnab9961",
    researchGate: "https://www.researchgate.net/profile/Dm-Masud-2/publications",
  },
};

export const AT_A_GLANCE = [
  { label: "Now", title: "AI Engineer", detail: "SM Technology, Dhaka · March 2025 – present." },
  { label: "Education", title: "B.Sc. in CSE", detail: "East West University · 2024." },
  { label: "Focus", title: "Applied AI", detail: "LLMs, RAG, computer vision, NLP and MLOps." },
  { label: "Research", title: "Published author", detail: "IEEE and Springer conference publications." },
];

export const TOOLBOX = [
  {
    label: "Programming",
    tools: ["Python", "C++", "C", "Java", "PHP", "SQL"],
  },
  {
    label: "AI and ML",
    tools: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Transformers", "Hugging Face", "LangGraph"],
  },
  {
    label: "Backend and data",
    tools: ["FastAPI", "REST APIs", "Async Processing", "MySQL", "Oracle SQL", "Vector Databases"],
  },
  {
    label: "Delivery",
    tools: ["Docker", "GitHub Actions", "CI/CD", "nginx", "AWS", "GCP", "VPS Deployment"],
  },
];

export const PROJECTS = [
  {
    name: "Apple Plum Growth Stage Classification",
    category: "Computer vision · Agriculture",
    headline: "A vision pipeline for growth-stage classification.",
    summary:
      "Curated a 701-image agricultural dataset and engineered preprocessing pipelines and CNN architectures for growth-stage classification and bounding-box detection.",
    stack: "TensorFlow, Keras, OpenCV, Streamlit",
    href: "https://data.mendeley.com/datasets/n6x3mbnvdh/1",
  },
  {
    name: "MANIFEX AI Paragraph Evaluator",
    category: "NLP · Generative AI",
    headline: "Automated feedback for stronger writing.",
    summary:
      "Built an NLP engine that evaluates sentence structure, grammar, vocabulary richness and overall writing quality with automated scoring.",
    stack: "NLP, LLMs, Docker",
    href: "https://manifex.org/",
  },
  {
    name: "Piper TTS FastAPI Inference Server",
    category: "Backend · Speech",
    headline: "Low-latency voice synthesis over REST.",
    summary:
      "Built a containerized neural text-to-speech server delivering real-time voice synthesis through high-throughput FastAPI endpoints.",
    stack: "Python, FastAPI, Docker, REST API",
    href: "https://github.com/arnab9961/piper_tts",
  },
  {
    name: "Bilingual Bengali Medicine Recommendation Chatbot",
    category: "LLMs · Healthcare",
    headline: "Language-aware access to medicine information.",
    summary:
      "Integrated Bengali language support and designed a large-language-model chatbot for medicine information using Python and Streamlit.",
    stack: "Python, Streamlit, LLMs",
  },
  {
    name: "MedGemma-Based Smart Healthcare Platform",
    category: "Computer vision · Healthcare",
    headline: "AI-assisted tools for clinical workflows.",
    summary:
      "Explored wound analysis, surgical outcome simulation and injectable medicines guidance with NHS Injectable Medicines resources.",
    stack: "MedGemma, computer vision, healthcare AI",
      href: "https://www.medusaimg.nhs.uk/",
  },
  {
    name: "Qur’an Recitation Pronunciation Error Detection",
    category: "Speech · Multilingual AI",
    headline: "A framework for more helpful recitation feedback.",
    summary:
      "Developed a multilingual AI approach combining speech recognition and language models for pronunciation error detection.",
    stack: "Speech recognition, NLP, language models",
    href: "https://ai.sunnahshelf.com/",
  },
];

export const FURTHER_OUT = {
  hour: "Beyond the build. Research and community.",
  heading: "Research & beyond",
  standfirst:
    "The same curiosity that drives my engineering work carries into research, technical communities and projects with a human outcome.",
  stripLabel: "Research and community work",
  places: [
    {
      place: "Best paper award",
      detail:
        "Deep Learning and Non-Contrast CT for Widespread Pancreatic Cancer Detection — Springer ICIDA, 2022.",
      link: {
        label: "Read the paper",
        href: "https://doi.org/10.1007/978-981-96-6303-3_38",
      },
    },
    {
      place: "ShrimpXNet",
      detail:
        "Transfer learning, adversarial training and explainable AI for shrimp disease classification.",
      link: {
        label: "IEEE publication",
        href: "https://doi.org/10.1109/3ict68299.2025.11442114",
      },
    },
    {
      place: "SFiNNet",
      detail:
        "Transfer learning and explainable AI for small fish classification with robust training.",
      link: {
        label: "IEEE publication",
        href: "https://doi.org/10.1109/ICCIT68739.2025.11491764",
      },
    },
    {
      place: "Research assistant",
      detail:
        "East West University · Jan 2026 – present. Planning, coordination and progress reporting for a four-member capstone.",
    },
    {
      place: "IEEE Computer Society",
      detail:
        "Event Coordinator at the EWU student branch, organising technical events and workshops.",
    },
  ],
};
