import type { SiteCopy } from "./types";

/**
 * Teks antarmuka, bahasa utama.
 *
 * Nada: tenang, langsung, sedikit teknis. Istilah industri yang lazim
 * (fine-tuning, vision-language model, baseline) dibiarkan dalam bahasa
 * Inggris agar mudah dipindai oleh perekrut teknis.
 */
export const copy: SiteCopy = {
  status: "final",

  meta: {
    title: "Zidan Mubarak · AI/ML Engineer",
    titleTemplate: "%s · Zidan Mubarak",
    description:
      "AI/ML engineer di Banda Aceh. Melatih vision-language model, membangun antarmuka di atasnya, dan menerbitkan evaluasinya.",
    keywords: [
      "AI engineer",
      "machine learning",
      "computer vision",
      "OCR Jawi",
      "vision-language model",
      "Next.js",
      "Indonesia",
    ],
  },

  nav: {
    items: [
      { id: "about", label: "Tentang", href: "#about", index: "01" },
      { id: "services", label: "Layanan", href: "#services", index: "02" },
      { id: "work", label: "Karya", href: "#work", index: "03" },
      { id: "experience", label: "Rekam", href: "#record", index: "04" },
      { id: "tools", label: "Alat", href: "#tools", index: "05" },
      { id: "contact", label: "Kontak", href: "#contact", index: "06" },
    ],
    menuOpen: "Buka menu",
    menuClose: "Tutup",
    indexLabel: "INDEKS",
    sectionsLabel: "Bagian",
    skipToContent: "Lompat ke konten",
    externalLink: "terbuka di tab baru",
    menuLabel: "Indeks",
    backToTop: "Kembali ke atas",
  },

  language: {
    label: "Bahasa",
    options: [
      { code: "id", label: "ID", ariaLabel: "Bahasa Indonesia" },
      { code: "en", label: "EN", ariaLabel: "English" },
    ],
  },

  hero: {
    eyebrow: "AI/ML engineer · Banda Aceh, Indonesia",
    intro:
      "Saya melatih vision-language model, lalu membangun antarmuka yang membuat hasilnya bisa dipakai orang lain. Terbaru: model 3B yang membaca Jawi.",
    primaryCta: "Lihat karya",
    secondaryCta: "Hubungi saya",
    scrollCue: "Gulir untuk membaca",
    portraitAlt:
      "Potret Zidan Mubarak, setengah badan, dirender sebagai grid subpiksel RGB",
    statsLabel: "Dalam angka",
    roleLine: "AI/ML engineer · Computer vision · Web",
    roleLineShort: "AI/ML engineer · Banda Aceh, ID",
    subline:
      "Saya melatih vision-language model sampai bisa membaca tulisan tangan Jawi.",
    workCta: "Lihat karya pilihan",
    figureLabel: "Gbr. 01 · ZM",
  },

  about: {
    label: "Tentang",
    meta: "Banda Aceh, ID",
    heading: ["Versi", "singkat"],
    closing:
      "Kalau hanya ada satu hal yang dibaca di sini, baca studi kasus Jawi. Itu contoh paling jelas cara saya bekerja.",
    nowLabel: "Sekarang",
    now: [
      "Terbuka untuk magang dan posisi junior AI/ML.",
      "Berbasis di Banda Aceh, UTC+7.",
    ],
    statement: "Saya bekerja di titik temu model bahasa dan tulisan tangan.",
    body: [
      "Saya menyelesaikan studi Teknologi Informasi di UIN Ar-Raniry, Banda Aceh, dengan skripsi tentang mengajarkan vision-language model membaca Jawi, aksara Melayu-Arab yang dibaca model dasar dengan character error 82,5%. Menurunkannya ke 17,4% butuh tiga skenario data, satu epoch 4 yang overfit, dan satu keputusan untuk berhenti di epoch 3.",
      "Bagian machine learning yang tidak glamor justru yang layak dipertahankan: asal-usul data, evaluasi yang jujur, dan antarmuka yang bisa dipakai tanpa membaca README. Python untuk model, TypeScript saat hasilnya harus hidup di browser, dan tata letak yang saya rancang sendiri.",
    ],
    facts: [
      { term: "Zona waktu", value: "UTC+7 (WIB)" },
      { term: "Fokus", value: "Vision-language · OCR" },
      { term: "Sekarang", value: "Terbuka untuk peran AI/ML" },
    ],
    cvLabel: "Daftar riwayat hidup",
  },

  services: {
    label: "Layanan",
    meta: "04 Disiplin",
    heading: ["Empat cara", "saya bisa membantu"],
    intro:
      "Bukan daftar semua hal yang pernah saya sentuh. Empat area yang buktinya ada di halaman ini.",
    proofLabel: "Bukti",
  },

  tools: {
    label: "Alat",
    heading: ["Yang saya", "pakai"],
    intro:
      "Alat yang muncul di proyek-proyek ini dan pekerjaan di baliknya.",
    footnote: "Ikon dari simple-icons.",
    itemsLabel: "Item",
    categoriesLabel: "Kategori",
  },

  work: {
    label: "Karya pilihan",
    heading: ["Enam proyek", "yang layak dilihat"],
    intro:
      "Dipilih karena dampaknya dan seberapa banyak bukti yang bisa dilihat publik. Yang pertama adalah skripsi.",
    counterSeparator: " / ",
    caseStudyCta: "Baca studi kasus",
    viewAll: "Semua karya",
    indexHeading: ["Indeks", "karya"],
    indexIntro:
      "Semua yang dipilih, dalam satu daftar. Deskripsi singkat; detailnya ada di tiap studi kasus.",
    backToWork: "Kembali ke karya pilihan",
    nextProject: "Proyek berikutnya",
    prevProject: "Proyek sebelumnya",
    roleLabel: "Peran",
    yearLabel: "Tahun",
    stackLabel: "Stack",
    linksLabel: "Tautan",
    liveLabel: "Live",
    repoLabel: "Sumber",
    modelLabel: "Model",
    demoLabel: "Demo",
    packageLabel: "Paket",
    docsLabel: "Dokumentasi",
    paperLabel: "Makalah",
    caseStudyLabel: "Studi kasus",
    comingSoon: "Belum ada tangkapan",
    scrollHint: "Gulir →",
    viewProject: "Lihat proyek",
    generatedVisual: "Visual generatif",
    missingImage: "Belum ada tangkapan",
    projectsLabel: "proyek",
    indexNote:
      "Setiap baris membuka halaman. Yang pertama adalah studi kasus skripsi lengkap; sisanya catatan proyek yang lebih singkat.",
    overviewLabel: "01 · Ringkasan",
    overviewHeading: "Apa ini",
    highlightsLabel: "02 · Sorotan",
    highlightsHeading: "Sorotan",
    stackHeading: "Stack",
  },

  caseStudy: {
    backLabel: "Semua karya",
    metaRole: "Peran",
    metaYear: "Tahun",
    metaReadingTime: "Waktu baca",
    lessonsLabel: "Yang saya ambil",
    limitationsLabel: "Di mana masih gagal",
    sourcesLabel: "Sumber",
    headlineLabel: "Hasil",
    contentsLabel: "Isi",
    projectNote: "Catatan proyek",
    openLabel: "Buka",
    otherProjectsLabel: "Proyek lain",
    teamLabel: "Tim",
    contentsAria: "Bagian studi kasus",
    metricNote:
      "Batang aksen = sisa error setelah fine-tuning, relatif terhadap baseline.",
    errorLabel: "error",
    beforeLabel: "sebelum",
    afterLabel: "sesudah",
    demo: {
      alt: "Space Gradio transliterasi Jawi dengan area unggah gambar, panel ekstraksi dan Rumi, serta dua contoh potongan.",
      caption:
        "Demo Gradio yang disertakan bersama adapter. Dua contoh potongan berasal dari repositori Space.",
      label: "Gbr. 02 · Demo",
    },
    sourceCrops: {
      altOne:
        "Potongan Jawi cetak satu baris yang dipakai sebagai contoh di demo.",
      altTwo:
        "Potongan Jawi cetak dua baris yang dipakai sebagai contoh di demo.",
      label: "Gbr. 03 · Masukan demo",
      caption:
        "Dua contoh potongan yang disertakan bersama Space, satu baris dan dua baris.",
    },
  },

  experience: {
    label: "Rekam",
    heading: ["Di mana saya", "bekerja"],
    currentLabel: "Sekarang",
    educationLabel: "Pendidikan",
    educationHeading: ["Di mana saya", "belajar"],
    certificationsLabel: "Kredensial",
    certificationsHeading: ["Sertifikat,", "penghargaan, makalah"],
    credentialLabel: "Kredensial",
    verifiedLabel: "Terverifikasi",
    unverifiedLabel: "Belum terverifikasi",
    thesisLabel: "Skripsi",
    recordHeading: "Rekam: pengalaman, pendidikan, dan sertifikasi",
    metaEntries: "Entri",
    groupExperience: "Pengalaman",
    groupEducation: "Pendidikan",
    groupCredentials: "Sertifikasi, penghargaan, makalah",
    groupCredentialsLong: "Sertifikasi, penghargaan, dan makalah",
    groupNote:
      "Entri dan tanggal merujuk ke CV dan halaman kredensial publik. Terbaru di atas; satu terbuka setiap kali.",
    entriesLabel: "entri",
    entryLabel: "entri",
    credentialLink: "Kredensial",
    gpaLabel: "IPK",
  },

  contact: {
    label: "Kontak",
    heading: ["Mari buat", "sesuatu", "yang terbaca."],
    body:
      "Ceritakan yang sedang Anda bangun. Satu kalimat tentang peran, proyek, atau masalahnya sudah cukup.",
    emailLabel: "Email",
    copyLabel: "Salin alamat",
    copiedLabel: "Tersalin",
    copiedAnnouncement: "Alamat email disalin ke clipboard.",
    externalLink: "terbuka di tab baru",
    responseNote:
      "Formulir ini membalas dari alamat tersebut. Tidak ada yang ditambahkan ke daftar.",
    socialHeading: "Di tempat lain",
    form: {
      heading: "Atau tulis di sini",
      name: "Nama",
      namePlaceholder: "Siapa yang menulis",
      email: "Email",
      emailPlaceholder: "anda@perusahaan.com",
      subject: "Subjek",
      subjectPlaceholder: "Peran, proyek, atau pertanyaan",
      message: "Pesan",
      messagePlaceholder: "Apa yang sedang Anda kerjakan?",
      submit: "Kirim pesan",
      submitting: "Mengirim",
      success: "Pesan terkirim. Saya akan membalas dari Banda Aceh.",
      error: "Pesan gagal terkirim. Coba email langsung:",
      fallback: "Jika formulir gagal, email langsung:",
      requiredHint: "Semua kolom wajib diisi.",
      privacy:
        "Alamat Anda hanya dipakai untuk membalas. Tanpa daftar, tanpa pelacakan.",
      errors: {
        name: "Tambahkan nama Anda.",
        email: "Gunakan alamat seperti anda@perusahaan.com.",
        subject: "Tambahkan subjek.",
        message: "Beri sedikit lebih banyak detail (10 karakter atau lebih).",
      },
    },
  },

  footer: {
    tagline: "Dibuat di Banda Aceh, di antara manuskrip dan mesin.",
    signatureLabel: "Tanda tangan",
    signatureSr: "Tanda tangan Zidan Mubarak.",
    ariaLabel: "Kaki halaman",
    backToTop: "Kembali ke atas",
    builtNote: "Dirancang dan dibangun oleh Zidan Mubarak.",
    rights: "Seluruh hak cipta dilindungi.",
    colophon: "Disusun di Banda Aceh. Diperbarui Oktober 2026.",
  },

  common: {
    loading: "Memuat",
    loadingPortfolio: "Memuat portofolio",
    indexFallback: "Indeks",
    error: "Ada yang rusak. Coba lagi, atau email saya.",
    notFoundTitle: "404",
    notFoundLabel: "Tidak ditemukan",
    notFoundBody: "Halaman ini tidak ada di sini. Karyanya tetap ada.",
    notFoundCta: "Kembali ke karya",
    notFoundIndex: "Indeks",
  },
};
