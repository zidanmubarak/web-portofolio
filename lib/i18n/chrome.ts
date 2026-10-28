import type { Locale } from "./types";

/**
 * Language-neutral interface chrome and UI state strings that are not part of
 * the editorial copy decks. Everything a visitor reads as content comes from
 * `lib/content/copy-en.json` / `copy-id.json`; this module only covers labels
 * that sit outside the page copy (figure caption, image alt, widget states).
 */
export type Chrome = {
  skipToContent: string;
  railLabel: string;
  heroLabel: string;
  figCaption: string;
  portraitAlt: string;
  imageSize: string;
  github: {
    label: string;
    live: string;
    repositories: string;
    stars: string;
    forks: string;
    followers: string;
    loading: string;
    error: string;
    retry: string;
    note: string;
  };
  workDetail: {
    year: string;
    role: string;
    summary: string;
    context: string;
    approach: string;
    result: string;
    stack: string;
    links: string;
    backToIndex: string;
  };
};

export const chrome: Record<Locale, Chrome> = {
  en: {
    skipToContent: "Skip to content",
    railLabel: "Index",
    heroLabel: "Index sheet",
    figCaption: "Fig. 01 — RGB subpixel panel",
    portraitAlt:
      "Zidan Mubarak in a black suit and tie, standing on the forecourt of a white neoclassical building.",
    imageSize: "1333 × 2000",
    github: {
      label: "GitHub",
      live: "Live",
      repositories: "Repositories",
      stars: "Stars",
      forks: "Forks",
      followers: "Followers",
      loading: "Fetching live data from the GitHub API…",
      error: "Live GitHub data could not be loaded.",
      retry: "Retry",
      note: "Fetched from the GitHub API at runtime. No value is hardcoded.",
    },
    workDetail: {
      year: "Year",
      role: "Role",
      summary: "Summary",
      context: "Context",
      approach: "Approach",
      result: "Result",
      stack: "Stack",
      links: "Links",
      backToIndex: "Back to index",
    },
  },
  id: {
    skipToContent: "Lewati ke konten",
    railLabel: "Indeks",
    heroLabel: "Lembar indeks",
    figCaption: "Fig. 01 — panel subpiksel RGB",
    portraitAlt:
      "Zidan Mubarak memakai jas hitam dan dasi, berdiri di halaman bangunan neoklasik putih.",
    imageSize: "1333 × 2000",
    github: {
      label: "GitHub",
      live: "Live",
      repositories: "Repositori",
      stars: "Bintang",
      forks: "Fork",
      followers: "Pengikut",
      loading: "Mengambil data langsung dari API GitHub…",
      error: "Data GitHub langsung gagal dimuat.",
      retry: "Coba lagi",
      note: "Diambil dari API GitHub saat halaman dimuat. Tidak ada angka yang ditulis tetap.",
    },
    workDetail: {
      year: "Tahun",
      role: "Peran",
      summary: "Ringkasan",
      context: "Konteks",
      approach: "Pendekatan",
      result: "Hasil",
      stack: "Teknologi",
      links: "Tautan",
      backToIndex: "Kembali ke indeks",
    },
  },
};
