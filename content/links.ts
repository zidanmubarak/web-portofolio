import type { ExternalLink } from "./types";

/**
 * Public contact points. Order is intentional: the first two are the ones
 * a recruiter should use.
 */
export const links: readonly ExternalLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:zidanmubarak00@gmail.com",
    handle: "zidanmubarak00@gmail.com",
    icon: "mail",
    primary: true,
    description: "Fastest route.",
    sources: ["cv"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zidan-mubarak",
    handle: "in/zidan-mubarak",
    icon: "linkedin",
    primary: true,
    description: "Work history and internships.",
    sources: ["cv"],
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/zidanmubarak",
    handle: "@zidanmubarak",
    icon: "github",
    primary: true,
    description: "Source for most of the work shown here.",
    sources: ["github-profile"],
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    href: "https://huggingface.co/zidanmubarak",
    handle: "@zidanmubarak",
    icon: "huggingface",
    primary: true,
    description: "The Jawi adapter and its Gradio demo.",
    sources: ["hf-model-card", "hf-space"],
  },
  {
    id: "pypi",
    label: "PyPI",
    href: "https://pypi.org/project/memory-vault/",
    handle: "memory-vault",
    icon: "pypi",
    primary: false,
    description: "Memory Vault AI, installable.",
    sources: ["github-memory-vault"],
  },
  {
    id: "journal",
    label: "Journal paper",
    href: "https://journal.global.ac.id/index.php/AJCSR/article/view/15770",
    handle: "AJCSR Vol 7 No 2 (2025)",
    icon: "document",
    primary: false,
    description: "Hebb rule recognition of Hijaiyyah letters, co-authored.",
    sources: ["journal-hebb"],
  },
];

export const primaryLinks = links.filter((link) => link.primary);
