import type { StackCategoryMeta, StackItem } from "./types";

/** Category order used by the Tools section. */
export const stackCategories: readonly StackCategoryMeta[] = [
  { id: "ml", index: "01", label: "Machine learning" },
  { id: "data", index: "02", label: "Data" },
  { id: "web", index: "03", label: "Web" },
  { id: "deployment", index: "04", label: "Deployment" },
  { id: "tools", index: "05", label: "Tools" },
];

/**
 * Icons are `simple-icons` slugs, verified against the installed package
 * (16.36.0). Tools without an icon in that set are left out on purpose
 * rather than replaced with a wrong logo.
 */
export const stack: readonly StackItem[] = [
  // Machine learning
  {
    id: "python",
    name: "Python",
    slug: "python",
    primary: true,
    category: "ml",
    evidence: ["jawi-htr", "pacu-pintar", "nusantarago"],
  },
  {
    id: "pytorch",
    name: "PyTorch",
    slug: "pytorch",
    primary: true,
    category: "ml",
    evidence: ["jawi-htr"],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    slug: "tensorflow",
    primary: true,
    category: "ml",
    evidence: ["nusantarago", "coding-camp"],
  },
  {
    id: "scikit-learn",
    name: "scikit-learn",
    slug: "scikitlearn",
    primary: true,
    category: "ml",
    evidence: ["pacu-pintar", "nusantarago", "climate-agriculture"],
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    slug: "huggingface",
    primary: true,
    category: "ml",
    evidence: ["jawi-htr"],
  },
  {
    id: "keras",
    name: "Keras",
    slug: "keras",
    primary: false,
    category: "ml",
    evidence: ["coding-camp"],
  },
  {
    id: "opencv",
    name: "OpenCV",
    slug: "opencv",
    primary: false,
    category: "ml",
    evidence: ["lab-big-data"],
  },

  // Data
  {
    id: "pandas",
    name: "pandas",
    slug: "pandas",
    primary: true,
    category: "data",
    evidence: ["climate-agriculture", "nusantarago"],
  },
  {
    id: "jupyter",
    name: "Jupyter",
    slug: "jupyter",
    primary: true,
    category: "data",
    evidence: ["climate-agriculture", "nusantarago"],
  },
  {
    id: "numpy",
    name: "NumPy",
    slug: "numpy",
    primary: false,
    category: "data",
    evidence: ["climate-agriculture", "nusantarago"],
  },
  {
    id: "sql",
    name: "SQL / PostgreSQL",
    slug: "postgresql",
    primary: false,
    category: "data",
    evidence: ["cv", "dicoding-bfpd"],
    note: "Certificate covers PostgreSQL; project-level SQL lives in the CodeIgniter/MySQL app.",
  },
  {
    id: "plotly",
    name: "Plotly",
    slug: "plotly",
    primary: false,
    category: "data",
    evidence: ["github-repos"],
  },
  {
    id: "streamlit",
    name: "Streamlit",
    slug: "streamlit",
    primary: false,
    category: "data",
    evidence: ["github-repos"],
  },

  // Web
  {
    id: "typescript",
    name: "TypeScript",
    slug: "typescript",
    primary: true,
    category: "web",
    evidence: ["github-portfolio"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    slug: "nextdotjs",
    primary: true,
    category: "web",
    evidence: ["github-portfolio"],
  },
  {
    id: "react",
    name: "React",
    slug: "react",
    primary: true,
    category: "web",
    evidence: ["github-portfolio"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    slug: "tailwindcss",
    primary: true,
    category: "web",
    evidence: ["github-portfolio"],
  },
  {
    id: "php",
    name: "PHP",
    slug: "php",
    primary: false,
    category: "web",
    evidence: ["guest-book"],
  },
  {
    id: "codeigniter",
    name: "CodeIgniter",
    slug: "codeigniter",
    primary: false,
    category: "web",
    evidence: ["guest-book"],
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    slug: "bootstrap",
    primary: false,
    category: "web",
    evidence: ["guest-book"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    primary: false,
    category: "web",
    evidence: ["guest-book"],
  },

  // Deployment
  {
    id: "fastapi",
    name: "FastAPI",
    slug: "fastapi",
    primary: true,
    category: "deployment",
    evidence: ["pacu-pintar", "memory-vault"],
  },
  {
    id: "flask",
    name: "Flask",
    slug: "flask",
    primary: false,
    category: "deployment",
    evidence: ["nusantarago"],
  },
  {
    id: "gradio",
    name: "Gradio",
    slug: "gradio",
    primary: false,
    category: "deployment",
    evidence: ["jawi-htr"],
  },
  {
    id: "docker",
    name: "Docker",
    slug: "docker",
    primary: true,
    category: "deployment",
    evidence: ["memory-vault"],
  },
  {
    id: "vercel",
    name: "Vercel",
    slug: "vercel",
    primary: false,
    category: "deployment",
    evidence: ["github-portfolio"],
  },
  {
    id: "pypi",
    name: "PyPI",
    slug: "pypi",
    primary: false,
    category: "deployment",
    evidence: ["memory-vault"],
  },

  // Tools
  {
    id: "git",
    name: "Git",
    slug: "git",
    primary: true,
    category: "tools",
    evidence: ["github-profile"],
  },
  {
    id: "github",
    name: "GitHub",
    slug: "github",
    primary: true,
    category: "tools",
    evidence: ["github-profile"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    slug: "githubactions",
    primary: false,
    category: "tools",
    evidence: ["github-eksperimen"],
  },
  {
    id: "linux",
    name: "Linux",
    slug: "linux",
    primary: false,
    category: "tools",
    evidence: ["github-profile"],
  },
  {
    id: "colab",
    name: "Google Colab",
    slug: "googlecolab",
    primary: false,
    category: "tools",
    evidence: ["jawi-htr", "climate-agriculture"],
  },
];

export const primaryStack = stack.filter((item) => item.primary);

export function stackByCategory(category: StackItem["category"]): readonly StackItem[] {
  return stack.filter((item) => item.category === category);
}
