import type { Project } from "./types";

/**
 * Six projects selected for Selected Work.
 *
 * Selection criteria (documented in `content-source.md`):
 * impact, quality of available evidence, and relevance to AI/ML and web roles.
 * All card images must be real screenshots or real output. The previous
 * site's project images were AI mockups and are explicitly not reused.
 */
export const projects: readonly Project[] = [
  {
    slug: "jawi-ocr",
    index: "01",
    title: "Jawi OCR",
    year: "2026",
    period: "Thesis",
    category: "research",
    categoryLabel: "Research",
    role: "Researcher and ML engineer (solo)",
    team: "Undergraduate thesis, UIN Ar-Raniry",
    summary:
      "A Qwen2.5-VL-3B adapter that reads printed Jawi and transliterates it to Rumi, cutting character error on unseen scans by 79%.",
    description:
      "Jawi is written in Arabic script but carries Malay, and general-purpose OCR handles it badly. The thesis fine-tunes a 3B vision-language model with QLoRA, tests three data scenarios, and evaluates extraction and transliteration separately so the failure is visible instead of averaged away.",
    stack: [
      "Qwen2.5-VL-3B",
      "QLoRA",
      "Unsloth",
      "PyTorch",
      "Hugging Face",
      "Gradio",
    ],
    links: {
      hfModel: "https://huggingface.co/zidanmubarak/jawi-qwen25-vl-qlora",
      hfSpace: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
    },
    image: {
      status: "available",
      source: {
        kind: "url",
        value:
          "https://huggingface.co/zidanmubarak/jawi-qwen25-vl-qlora/resolve/main/showcase_chart.png",
      },
      alt: "Bar chart comparing the base Qwen2.5-VL model with the fine-tuned adapter on CER Jawi, CER Rumi and WER Rumi.",
      aspect: "16/9",
      note: "Real results graphic published with the model card. T8 downloads, converts to WebP/AVIF and strips metadata.",
    },
    assets: [
      {
        id: "jawi-space",
        label: "Gradio demo screenshot",
        status: "needs-capture",
        source: {
          kind: "live-capture",
          value: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
        },
        alt: "The Jawi transliteration demo with an input image and both model outputs.",
        aspect: "16/10",
        note: "Space sleeps on free CPU hardware; open it once and wait for the wake-up before capturing.",
      },
      {
        id: "jawi-sample",
        label: "Before / after sample",
        status: "needs-capture",
        source: {
          kind: "owner-supplied",
          value: "Gradio comparison notebook: one- or two-line crops, base model versus fine-tuned adapter.",
        },
        alt: "A one-line Jawi crop next to the base model's output and the fine-tuned model's output.",
        aspect: "16/10",
        note: "Owner confirmed the demo uses one- or two-line crops from the Gradio notebook. Capture both outputs on the same crop.",
      },
    ],
    selected: true,
    featured: true,
    highlights: [
      "QLoRA fine-tune of Qwen2.5-VL-3B-Instruct on ≈26,000 synthetic and ≈7,902 authentic Jawi samples.",
      "Three data scenarios compared; the combined scenario was the one that generalised.",
      "On unseen authentic data: CER Jawi 82.51% → 17.35%, CER Rumi 90.59% → 16.48%, WER Rumi 107.08% → 39.36%.",
      "Epoch 4 overfitted, so epoch 3 shipped.",
      "Adapter and a Gradio demo are public on Hugging Face.",
    ],
    caseStudy: "jawi-ocr",
    sources: [
      "cv",
      "hf-model-card",
      "hf-model-files",
      "hf-space",
    ],
    verification: {
      verified: true,
      sources: ["cv", "hf-model-card"],
      note: "CER and WER values are identical on the CV and the model card; the thesis title and the 26,000 / 7,902 counts come from the owner's answers. Scope confirmed as printed Jawi.",
    },
  },
  {
    slug: "pacu-pintar",
    index: "02",
    title: "Pacu Pintar",
    year: "2026",
    period: "Aug 2025 — Jan 2026",
    category: "ai-ml",
    categoryLabel: "Machine learning",
    role: "ML engineer, two-person ML team",
    team: "Asah led by Dicoding capstone; ML team of 2 inside a full-stack team",
    summary:
      "An AI learning-analytics platform where a Random Forest labelled study pace and a FastAPI service turned it into study advice.",
    description:
      "The ML half of a web platform for learning analytics. A classifier sorts students into three study-pace categories; a FastAPI service exposes the model and asks an LLM for a personal study plan. It won Best Capstone Project in the cohort.",
    stack: [
      "Python",
      "scikit-learn",
      "Random Forest",
      "FastAPI",
      "LLM",
      "Next.js",
      "Hapi.js",
    ],
    links: {
      live: "https://pacupintar.netlify.app/",
      repo: "https://github.com/Capstone-Project-Team-DC-08",
    },
    image: {
      status: "needs-capture",
      source: {
        kind: "live-capture",
        value: "https://pacupintar.netlify.app/",
      },
      alt: "Pacu Pintar dashboard showing a student's learning pace and AI study recommendation.",
      aspect: "16/10",
      note: "The live site is up; capture the student dashboard. The ML service lives in the team's ML repository.",
    },
    selected: true,
    featured: true,
    highlights: [
      "Random Forest classifier for three study-pace categories — consistent, fast, reflective — at ≈90% accuracy.",
      "FastAPI service serving the classifier plus LLM-generated personal study suggestions.",
      "Integrated with the team's Next.js and Hapi.js web application.",
      "Best Capstone Project, Asah led by Dicoding.",
    ],
    sources: ["cv", "owner-brief", "github-capstone"],
    verification: {
      verified: true,
      sources: ["cv", "github-capstone", "owner-answers"],
      note: "Award date confirmed as Jan 2026 (owner answer), inside the cohort window. Live site and both repositories are public.",
    },
  },
  {
    slug: "memory-vault",
    index: "03",
    title: "Memory Vault AI",
    year: "2026",
    period: "Apr 2026",
    category: "ai-ml",
    categoryLabel: "Open source",
    role: "Solo — library, API, CLI and docs",
    team: "Solo project",
    summary:
      "A model-agnostic memory layer that gives any LLM persistent, user-scoped context, shipped as a Python package, REST API, CLI and MCP server.",
    description:
      "Memory Vault sits between an application and any LLM: it classifies what is worth remembering, compresses what is stale, and injects only the relevant memories into the next prompt. It runs locally against ChromaDB, so the default deployment costs nothing and never sends memory to a vendor.",
    stack: ["Python", "FastAPI", "ChromaDB", "MCP", "Docker", "PyPI"],
    links: {
      repo: "https://github.com/zidanmubarak/Memory-Vault-AI",
      pypi: "https://pypi.org/project/memory-vault/",
      docs: "https://zidanmubarak.github.io/Memory-Vault-AI/",
    },
    image: {
      status: "needs-capture",
      source: {
        kind: "live-capture",
        value: "https://zidanmubarak.github.io/Memory-Vault-AI/",
      },
      alt: "Memory Vault AI documentation site with the four integration modes.",
      aspect: "16/10",
      note: "The repository ships an SVG banner; prefer a real capture of the docs site over the banner.",
    },
    assets: [
      {
        id: "memory-vault-cli",
        label: "CLI session",
        status: "needs-capture",
        source: {
          kind: "live-capture",
          value: "pip install memory-vault, then a real `memory-vault memory list` session",
        },
        alt: "Terminal output listing stored memories with their types and token counts.",
        aspect: "16/9",
      },
      {
        id: "memory-vault-api",
        label: "API introspection UI",
        status: "needs-capture",
        source: {
          kind: "live-capture",
          value: "uvicorn memory_vault.api.main:app, then http://localhost:8000/ui",
        },
        alt: "Memory Vault web UI showing saved memories for a user.",
        aspect: "16/10",
      },
    ],
    selected: true,
    featured: true,
    highlights: [
      "Four memory types — episodic, semantic, working, procedural — with vector retrieval.",
      "Token-budget-aware recall; old memories are compressed instead of deleted.",
      "Local-first: ChromaDB and local embeddings, no vendor required.",
      "MCP-compatible with Claude Desktop and Cursor.",
      "Published on PyPI as `memory-vault`.",
    ],
    sources: ["github-memory-vault", "pypi-memory-vault", "github-repos"],
    verification: { verified: true, sources: ["github-memory-vault"] },
  },
  {
    slug: "nusantarago",
    index: "04",
    title: "NusantaraGo",
    year: "2025",
    period: "May 2025 — Jun 2025",
    category: "ai-ml",
    categoryLabel: "Recommendation",
    role: "Top contributor — machine learning",
    team: "Four-person capstone team; 107 commits by Zidan",
    summary:
      "A tourism recommender for Indonesia — TF-IDF content similarity plus collaborative filtering, served through Flask.",
    description:
      "Built during the Coding Camp powered by DBS Foundation cohort. The team scraped attraction data province by province, cleaned it, and combined content-based, popularity and location signals into a hybrid recommender behind a Flask front end.",
    stack: ["Python", "Flask", "scikit-learn", "TensorFlow", "NLTK", "Pandas"],
    links: {
      repo: "https://github.com/NusantaraGo/NusantaraGo-ML",
    },
    image: {
      status: "generated",
      source: { kind: "none" },
      alt: "Abstract typographic composition representing the NusantaraGo recommendation model.",
      aspect: "16/10",
      note: "No real screenshot exists and the owner declined to run the app. Owner authorised a generated visual; it must be abstract or typographic — never a fake app screen with invented UI copy.",
    },
    selected: true,
    featured: false,
    highlights: [
      "Content-based filtering with TF-IDF and cosine similarity, plus collaborative filtering.",
      "Hybrid ranking that also weighs popularity and location.",
      "Attraction data scraped and cleaned province by province, stored as CSV and JSON.",
      "107 commits — the largest contribution in the four-person team.",
    ],
    sources: ["github-nusantara", "cv", "github-repos"],
    verification: { verified: true, sources: ["github-nusantara", "cv"] },
  },
  {
    slug: "guest-book",
    index: "05",
    title: "Guest Book System",
    year: "2025",
    period: "Apr 2025",
    category: "web",
    categoryLabel: "Web application",
    role: "Solo — full-stack",
    team: "Solo project",
    summary:
      "A CodeIgniter 3 guest book for events: guest registration, QR check-in, generated ID cards and attendance exports.",
    description:
      "An event operations tool rather than a landing page: guests register with a photo, receive a QR-coded ID card, and get checked in from a phone camera. Admins get per-event attendance reports and Excel exports, with separate roles for staff.",
    stack: ["CodeIgniter 3", "PHP", "MySQL", "Bootstrap", "jQuery", "AdminLTE"],
    links: {
      repo: "https://github.com/zidanmubarak/guest-book-system",
    },
    image: {
      status: "generated",
      source: { kind: "none" },
      alt: "Abstract typographic composition representing a QR check-in and ID card system.",
      aspect: "16/10",
      note: "No real screenshot exists and the owner declined to run the app. Owner authorised a generated visual; it must be abstract or typographic — never a fake admin panel.",
    },
    selected: true,
    featured: false,
    highlights: [
      "QR-code check-in scanned through the device camera.",
      "Generated ID cards with a customisable layout per event.",
      "Attendance reports exportable to Excel.",
      "Multi-level roles (admin, staff) and RFID/NFC visitor registration.",
    ],
    sources: ["github-guest-book", "github-repos"],
    verification: { verified: true, sources: ["github-guest-book"] },
  },
  {
    slug: "climate-agriculture",
    index: "06",
    title: "Climate × Agriculture",
    year: "2025",
    period: "Mar 2025 — May 2025",
    category: "data",
    categoryLabel: "Data science",
    role: "Solo — analysis and visualisation",
    team: "Solo project",
    summary:
      "A two-notebook study that clusters 10,002 climate-agriculture records, then predicts crop yield with Random Forest and Gradient Boosting.",
    description:
      "An unsupervised pass first: scale the features, reduce dimensions, tune K-Means and read the clusters. Those clusters become the label for a supervised pass that compares Random Forest against a tuned Gradient Boosting model across accuracy, precision, recall and F1.",
    stack: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    links: {
      repo: "https://github.com/zidanmubarak/climate-agriculture-ml-analysis",
    },
    image: {
      status: "generated",
      source: { kind: "none" },
      alt: "Abstract typographic composition built from a yield-versus-climate sequence.",
      aspect: "16/10",
      note: "Owner has no exported charts. Prefer a real export if a notebook can be run; otherwise a generated abstract visual, never a dashboard with invented figures.",
    },
    selected: true,
    featured: false,
    highlights: [
      "K-Means clustering with feature engineering aimed at the silhouette score.",
      "Random Forest versus tuned Gradient Boosting, compared on four metrics.",
      "Dataset: 10,002 rows × 15 columns from Kaggle, preprocessed with a scripted pipeline.",
      "Pinned on the GitHub profile.",
    ],
    sources: ["github-climate", "github-eksperimen", "github-profile"],
    verification: { verified: true, sources: ["github-climate", "github-eksperimen"] },
  },
];

export const selectedProjects = projects.filter((project) => project.selected);

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
