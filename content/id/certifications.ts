import type { Credential } from "../types";

/**
 * Sertifikasi, penghargaan, dan makalah jurnal, terbaru lebih dulu.
 * Ketiga sertifikat memiliki halaman kredensial publik yang sudah dibuka dan
 * dicocokkan dengan nama pemilik saat riset.
 */
export const certifications: readonly Credential[] = [
  {
    index: "01",
    id: "asah-best-capstone",
    kind: "award",
    title: "Best Capstone Project",
    issuer: "Asah led by Dicoding",
    date: "2026-01",
    displayDate: "Jan 2026",
    summary:
      "Diberikan untuk Pacu Pintar, platform learning analytics berbasis AI yang dibangun tim ML dua orang di dalam tim web yang lebih besar.",
    sources: ["cv", "owner-answers"],
    verification: {
      verified: true,
      sources: ["owner-answers"],
      note: "Pemilik mengonfirmasi Jan 2026, di dalam rentang kohort. Penghargaan memiliki sertifikat PDF tetapi tidak ada URL publik.",
    },
  },
  {
    index: "02",
    id: "dicoding-membangun-sistem-ml",
    kind: "certification",
    title: "Membangun Sistem Machine Learning",
    issuer: "Dicoding Indonesia",
    date: "2025-11-25",
    displayDate: "25 Nov 2025",
    level: "Lanjutan",
    validUntil: "2028-11-25",
    credentialId: "2VX35EDOJPYQ",
    url: "https://www.dicoding.com/certificates/2VX35EDOJPYQ",
    summary:
      "Dasar MLOps: metadata eksperimen, penyajian model, monitoring, dan alerting.",
    skills: ["MLOps", "Penyajian model", "Monitoring"],
    sources: ["cv", "dicoding-mlops"],
    verification: { verified: true, sources: ["dicoding-mlops"] },
  },
  {
    index: "03",
    id: "ajcsr-hebb-rule",
    kind: "publication",
    title:
      "Penerapan Metode Hebb Rule Menggunakan Python Untuk Pengujian Pengenalan Pola Huruf Hijaiyyah",
    issuer: "Academic Journal of Computer Science Research",
    date: "2025-07",
    displayDate: "Jul 2025 · Vol 7 No 2",
    url: "https://journal.global.ac.id/index.php/AJCSR/article/view/15770",
    summary:
      "Penulis ketiga dari empat. Jaringan Hebbian mengenali huruf Hijaiyyah waw dan ba dari matriks bipolar 5×5, diimplementasikan dan diverifikasi dengan Python.",
    skills: ["Jaringan saraf", "Pengenalan pola", "Python"],
    sources: ["journal-hebb"],
    verification: {
      verified: true,
      sources: ["journal-hebb"],
      note: "Penulis: Nazaruddin Ahmad, Fajar, Zidan Mubarak, Muhammad Bilal Akbar. Tanggal sitasi di halaman jurnal adalah 2025-07-31, mulai halaman 76.",
    },
  },
  {
    index: "04",
    id: "dicoding-ml-terapan",
    kind: "certification",
    title: "Machine Learning Terapan",
    issuer: "Dicoding Indonesia",
    date: "2025-05-27",
    displayDate: "27 Mei 2025",
    level: "Lanjutan",
    validUntil: "2028-05-27",
    credentialId: "1RXYEGQ3KZVM",
    url: "https://www.dicoding.com/certificates/1RXYEGQ3KZVM",
    summary:
      "Machine learning terapan: predictive analytics, analisis sentimen, computer vision, dan sistem rekomendasi.",
    skills: ["Predictive analytics", "Computer vision", "Recommender"],
    sources: ["cv", "dicoding-mlt"],
    verification: { verified: true, sources: ["dicoding-mlt"] },
  },
  {
    index: "05",
    id: "dicoding-pemrosesan-data",
    kind: "certification",
    title: "Belajar Fundamental Pemrosesan Data",
    issuer: "Dicoding Indonesia",
    date: "2025-05-04",
    displayDate: "4 Mei 2025",
    level: "Menengah",
    validUntil: "2028-05-04",
    credentialId: "JLX1964EGP72",
    url: "https://www.dicoding.com/certificates/JLX1964EGP72",
    summary:
      "Menyiapkan data berkualitas untuk proyek berbasis data dengan Python, SQL, dan PostgreSQL.",
    skills: ["Pemrosesan data", "SQL", "PostgreSQL"],
    sources: ["cv", "dicoding-bfpd"],
    verification: { verified: true, sources: ["dicoding-bfpd"] },
  },
];
