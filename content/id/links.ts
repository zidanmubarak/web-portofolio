import type { ExternalLink } from "../types";

/**
 * Titik kontak publik. Urutan disengaja: dua yang pertama adalah jalur yang
 * sebaiknya dipakai perekrut.
 */
export const links: readonly ExternalLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:zidanmubarak00@gmail.com",
    handle: "zidanmubarak00@gmail.com",
    icon: "mail",
    primary: true,
    description: "Jalur tercepat.",
    sources: ["cv"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zidan-mubarak",
    handle: "in/zidan-mubarak",
    icon: "linkedin",
    primary: true,
    description: "Riwayat kerja dan magang.",
    sources: ["cv"],
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/zidanmubarak",
    handle: "@zidanmubarak",
    icon: "github",
    primary: true,
    description: "Sumber sebagian besar karya di sini.",
    sources: ["github-profile"],
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    href: "https://huggingface.co/zidanmubarak",
    handle: "@zidanmubarak",
    icon: "huggingface",
    primary: true,
    description: "Adapter Jawi dan demo Gradio-nya.",
    sources: ["hf-model-card", "hf-space"],
  },
  {
    id: "pypi",
    label: "PyPI",
    href: "https://pypi.org/project/memory-vault/",
    handle: "memory-vault",
    icon: "pypi",
    primary: false,
    description: "Memory Vault AI, siap dipasang.",
    sources: ["github-memory-vault"],
  },
  {
    id: "journal",
    label: "Makalah jurnal",
    href: "https://journal.global.ac.id/index.php/AJCSR/article/view/15770",
    handle: "AJCSR Vol 7 No 2 (2025)",
    icon: "document",
    primary: false,
    description: "Pengenalan huruf Hijaiyyah dengan Hebb rule, ditulis bersama.",
    sources: ["journal-hebb"],
  },
];
