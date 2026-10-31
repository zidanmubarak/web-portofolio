import type { Profile } from "../types";

/**
 * Identitas, posisi, dan satu-satunya angka yang boleh muncul di odometer hero.
 * Semua nilai berasal dari CV atau profil publik yang bisa diperiksa.
 */
export const profile: Profile = {
  name: "Zidan Mubarak",
  preferredName: "Zedd",
  handle: "zidanmubarak",

  role: "AI/ML Engineer",
  roleShort: "AI/ML Engineer",

  headline: ["Zidan", "Mubarak"],

  oneLiner:
    "Saya melatih vision-language model untuk membaca Jawi, aksara Melayu berhuruf Arab yang dibaca model dasar dengan character error 82,5%, lalu membangun antarmuka yang membuat hasilnya bisa dipakai orang lain.",

  about: [
    "Saya menyelesaikan studi Teknologi Informasi di UIN Ar-Raniry, Banda Aceh, dengan skripsi tentang mengajarkan vision-language model membaca Jawi, aksara Melayu-Arab yang dibaca model dasar dengan character error 82,5%. Menurunkannya ke 17,4% butuh tiga skenario data, satu epoch 4 yang overfit, dan satu keputusan untuk berhenti di epoch 3.",
    "Sebelumnya saya mengerjakan dua kohort beasiswa: recommender pariwisata bersama tim empat orang, dan Pacu Pintar, platform learning analytics berbasis AI tempat tim ML dua orang membangun model serta layanan FastAPI yang menyajikannya. Di sela proyek, saya membantu laboratorium algoritma dan pemrograman, tempat saya belajar bahwa menjelaskan perulangan for lebih sulit daripada menulisnya.",
    "Saya peduli pada separuh machine learning yang tidak glamor: asal-usul data, evaluasi yang jujur, dan antarmuka yang bisa dipakai tanpa membaca README. Saya bekerja dengan Python untuk model, TypeScript saat hasilnya perlu hidup di browser, dan saya merancang tata letaknya sendiri.",
  ],

  location: {
    city: "Banda Aceh",
    region: "Aceh",
    country: "Indonesia",
    countryCode: "ID",
    timezone: "Asia/Jakarta",
    timezoneLabel: "WIB · UTC+7",
    coordinates: { lat: 5.5483, lng: 95.3238 },
  },

  availability: {
    open: true,
    label: "Terbuka untuk magang AI/ML dan posisi entry-level",
    kinds: ["AI engineering", "Machine learning", "Data"],
  },

  languages: [
    { language: "Indonesia", level: "Native" },
    {
      language: "Inggris",
      level: "Pasif",
      note: "Nyaman membaca dokumentasi dan menulis teks teknis; kemampuan berbicara masih berkembang.",
    },
  ],

  email: "zidanmubarak00@gmail.com",

  metrics: [
    {
      id: "cer-reduction",
      value: 79,
      suffix: "%",
      label: "lebih sedikit character error",
      context: "Ekstraksi Jawi, model dasar vs. hasil fine-tuning",
      hero: true,
      sourceIds: ["cv", "hf-model-card"],
      verified: true,
    },
    {
      id: "authentic-samples",
      value: 7902,
      prefix: "≈",
      label: "sampel Jawi autentik",
      context: "Dokumen cetak hasil pindai dan tulisan tangan",
      hero: true,
      sourceIds: ["owner-answers"],
      verified: true,
    },
    {
      id: "public-repos",
      value: 17,
      label: "repositori publik · Okt 2026",
      context: "Di GitHub, Oktober 2026",
      hero: true,
      sourceIds: ["github-profile"],
      verified: true,
    },
    {
      id: "gpa",
      value: 3.77,
      decimals: 2,
      suffix: "/4.00",
      label: "IPK",
      context: "S1 Teknologi Informasi, UIN Ar-Raniry",
      sourceIds: ["cv"],
      verified: true,
    },
    {
      id: "publications",
      value: 1,
      label: "makalah peer-reviewed",
      context: "Academic Journal of Computer Science Research, 2025",
      sourceIds: ["journal-hebb"],
      verified: true,
    },
  ],

  sources: [
    "cv",
    "github-profile",
    "hf-model-card",
    "journal-hebb",
    "owner-brief",
    "owner-answers",
  ],
};
