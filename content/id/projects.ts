import type { Project } from "../types";

/**
 * Enam proyek yang dipilih untuk Karya Pilihan.
 *
 * Kriteria seleksi (didokumentasikan di `content-source.md`): dampak, kualitas
 * bukti yang tersedia, dan relevansi dengan peran AI/ML serta web. Semua gambar
 * kartu harus tangkapan nyata atau keluaran nyata. Gambar proyek dari situs
 * sebelumnya adalah mockup AI dan tidak dipakai ulang.
 */
export const projects: readonly Project[] = [
  {
    slug: "jawi-ocr",
    index: "01",
    title: "Jawi OCR",
    year: "2026",
    period: "Skripsi",
    category: "research",
    categoryLabel: "Penelitian",
    role: "Peneliti dan ML engineer (solo)",
    team: "Skripsi sarjana, UIN Ar-Raniry",
    summary:
      "Adapter Qwen2.5-VL-3B yang membaca Jawi cetak dan mentransliterasinya ke Rumi, menurunkan character error pada pindaian baru sebesar 79%.",
    resultLine: "CER 82,51% → 17,35% pada 790 citra uji",
    description:
      "Jawi ditulis dengan aksara Arab tetapi membawa bahasa Melayu, dan OCR umum menanganinya dengan buruk. Skripsi ini melakukan fine-tuning model vision-language 3B dengan QLoRA, menguji tiga skenario data, dan mengevaluasi ekstraksi serta transliterasi secara terpisah agar kegagalannya terlihat, bukan dirata-ratakan.",
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
      alt: "Grafik batang yang membandingkan model dasar Qwen2.5-VL dengan adapter hasil fine-tuning pada CER Jawi, CER Rumi, dan WER Rumi.",
      aspect: "16/9",
      note: "Grafik hasil nyata yang diterbitkan bersama model card. T8 mengunduh, mengonversi ke WebP/AVIF, dan menghapus metadata.",
    },
    figure: {
      caption:
        "Grafik hasil yang diterbitkan bersama model card: model dasar dibandingkan dengan adapter hasil fine-tuning pada split held-out.",
      label: "Gbr. 01 · Hasil",
    },
    assets: [
      {
        id: "jawi-space",
        label: "Tangkapan demo Gradio",
        status: "needs-capture",
        source: {
          kind: "live-capture",
          value: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
        },
        alt: "Demo transliterasi Jawi dengan gambar masukan dan kedua keluaran model.",
        aspect: "16/10",
        note: "Space tidur di perangkat CPU gratis; buka sekali dan tunggu bangun sebelum menangkap.",
      },
      {
        id: "jawi-sample",
        label: "Sampel sebelum / sesudah",
        status: "needs-capture",
        source: {
          kind: "owner-supplied",
          value:
            "Notebook perbandingan Gradio: potongan satu atau dua baris, model dasar versus adapter hasil fine-tuning.",
        },
        alt: "Potongan Jawi satu baris di samping keluaran model dasar dan keluaran model hasil fine-tuning.",
        aspect: "16/10",
        note: "Pemilik mengonfirmasi demo memakai potongan satu atau dua baris dari notebook Gradio. Tangkap kedua keluaran pada potongan yang sama.",
      },
    ],
    selected: true,
    featured: true,
    highlights: [
      "Fine-tuning QLoRA Qwen2.5-VL-3B-Instruct pada ≈26.000 sampel Jawi sintetis dan ≈7.902 sampel autentik.",
      "Tiga skenario data dibandingkan; skenario gabungan yang paling bisa generalisasi.",
      "Pada data autentik yang belum pernah dilihat: CER Jawi 82,51% → 17,35%, CER Rumi 90,59% → 16,48%, WER Rumi 107,08% → 39,36%.",
      "Epoch 4 overfit, jadi yang dirilis adalah epoch 3.",
      "Adapter dan demo Gradio tersedia publik di Hugging Face.",
    ],
    caseStudy: "jawi-ocr",
    sources: ["cv", "hf-model-card", "hf-model-files", "hf-space"],
    verification: {
      verified: true,
      sources: ["cv", "hf-model-card"],
      note: "Nilai CER dan WER identik di CV dan model card; judul skripsi serta jumlah 26.000 / 7.902 berasal dari jawaban pemilik. Cakupan dikonfirmasi sebagai Jawi cetak.",
    },
  },
  {
    slug: "pacu-pintar",
    index: "02",
    title: "Pacu Pintar",
    year: "2026",
    period: "Agu 2025 - Jan 2026",
    category: "ai-ml",
    categoryLabel: "Machine learning",
    role: "ML engineer, tim ML dua orang",
    team: "Asah led by Dicoding capstone; tim ML 2 orang di dalam tim full-stack",
    summary:
      "Platform learning analytics berbasis AI tempat Random Forest memberi label kecepatan belajar dan layanan FastAPI mengubahnya menjadi saran belajar.",
    resultLine: "Random Forest · akurasi ≈90%",
    description:
      "Separuh ML dari platform web untuk learning analytics. Sebuah classifier membagi mahasiswa ke tiga kategori kecepatan belajar; layanan FastAPI menyajikan model dan meminta LLM menyusun rencana belajar personal. Proyek ini meraih Best Capstone Project di kohort.",
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
      alt: "Halaman landing publik Pacu Pintar dengan judul bahasa Indonesia untuk jalur belajar coding terstruktur.",
      aspect: "16/10",
      note: "Situs live aktif; yang tertangkap adalah halaman landing publik. Dashboard mahasiswa setelah login belum ditangkap.",
    },
    figure: {
      caption:
        "Halaman landing publik Pacu Pintar. Dashboard mahasiswa setelah login belum ditangkap.",
      label: "Gbr. 01 · Tangkapan live",
    },
    selected: true,
    featured: true,
    highlights: [
      "Classifier Random Forest untuk tiga kategori kecepatan belajar, konsisten, cepat, reflektif, dengan akurasi ≈90%.",
      "Layanan FastAPI yang menyajikan classifier plus saran belajar personal dari LLM.",
      "Terintegrasi dengan aplikasi web Next.js dan Hapi.js tim.",
      "Best Capstone Project, Asah led by Dicoding.",
    ],
    sources: ["cv", "owner-brief", "github-capstone"],
    verification: {
      verified: true,
      sources: ["cv", "github-capstone", "owner-answers"],
      note: "Tanggal penghargaan dikonfirmasi Jan 2026 (jawaban pemilik), di dalam rentang kohort. Situs live dan kedua repositori publik.",
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
    role: "Solo, library, API, CLI, dan dokumentasi",
    team: "Proyek solo",
    summary:
      "Lapisan memori model-agnostic yang memberi LLM mana pun konteks persisten per pengguna, dikirim sebagai paket Python, REST API, CLI, dan MCP server.",
    resultLine: "Empat tipe memori · local-first · di PyPI",
    description:
      "Memory Vault berada di antara aplikasi dan LLM mana pun: ia mengklasifikasikan apa yang layak diingat, memadatkan yang sudah usang, dan hanya menyuntikkan memori relevan ke prompt berikutnya. Semuanya berjalan lokal dengan ChromaDB, jadi deployment bawaan tidak berbiaya dan tidak pernah mengirim memori ke vendor.",
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
      alt: "Situs dokumentasi Memory Vault AI dengan empat mode integrasi.",
      aspect: "16/10",
      note: "Repositori menyertakan banner SVG; tangkapan nyata situs dokumentasi lebih dipilih daripada banner.",
    },
    figure: {
      caption:
        "Situs dokumentasi Memory Vault AI, ditangkap dari GitHub Pages.",
      label: "Gbr. 01 · Tangkapan live",
    },
    assets: [
      {
        id: "memory-vault-cli",
        label: "Sesi CLI",
        status: "needs-capture",
        source: {
          kind: "live-capture",
          value:
            "pip install memory-vault, lalu sesi `memory-vault memory list` yang nyata",
        },
        alt: "Keluaran terminal yang menampilkan memori tersimpan beserta tipe dan jumlah tokennya.",
        aspect: "16/9",
      },
      {
        id: "memory-vault-api",
        label: "UI introspeksi API",
        status: "needs-capture",
        source: {
          kind: "live-capture",
          value:
            "uvicorn memory_vault.api.main:app, lalu http://localhost:8000/ui",
        },
        alt: "UI web Memory Vault yang menampilkan memori tersimpan untuk seorang pengguna.",
        aspect: "16/10",
      },
    ],
    selected: true,
    featured: true,
    highlights: [
      "Empat tipe memori, episodik, semantik, kerja, dan prosedural, dengan pengambilan berbasis vektor.",
      "Recall yang sadar anggaran token; memori lama dipadatkan, bukan dihapus.",
      "Local-first: ChromaDB dan embedding lokal, tanpa vendor.",
      "Kompatibel MCP dengan Claude Desktop dan Cursor.",
      "Terbit di PyPI sebagai `memory-vault`.",
    ],
    sources: ["github-memory-vault", "pypi-memory-vault", "github-repos"],
    verification: { verified: true, sources: ["github-memory-vault"] },
  },
  {
    slug: "nusantarago",
    index: "04",
    title: "NusantaraGo",
    year: "2025",
    period: "Mei 2025 - Jun 2025",
    category: "ai-ml",
    categoryLabel: "Sistem rekomendasi",
    role: "Kontributor teratas, machine learning",
    team: "Tim capstone empat orang; 107 commit oleh Zidan",
    summary:
      "Recommender pariwisata Indonesia dengan TF-IDF content similarity plus collaborative filtering, disajikan melalui Flask.",
    resultLine: "TF-IDF + collaborative filtering · 107 commit",
    description:
      "Dibangun selama kohort Coding Camp powered by DBS Foundation. Tim mengambil data atraksi provinsi demi provinsi, membersihkannya, lalu menggabungkan sinyal content-based, popularitas, dan lokasi menjadi recommender hibrida di balik front end Flask.",
    stack: ["Python", "Flask", "scikit-learn", "TensorFlow", "NLTK", "Pandas"],
    links: {
      repo: "https://github.com/NusantaraGo/NusantaraGo-ML",
    },
    image: {
      status: "generated",
      source: { kind: "none" },
      alt: "Komposisi tipografi abstrak yang mewakili model rekomendasi NusantaraGo.",
      aspect: "16/10",
      note: "Tidak ada tangkapan nyata dan pemilik menolak menjalankan aplikasi. Pemilik mengizinkan visual generatif; harus abstrak atau tipografis, bukan layar aplikasi palsu dengan teks UI karangan.",
    },
    figure: {
      caption:
        "Visual tipografi abstrak yang disetujui pemilik. Ini bukan tangkapan aplikasi.",
      label: "Gbr. 01 · Visual generatif",
    },
    selected: true,
    featured: false,
    highlights: [
      "Content-based filtering dengan TF-IDF dan cosine similarity, plus collaborative filtering.",
      "Peringkat hibrida yang juga mempertimbangkan popularitas dan lokasi.",
      "Data atraksi diambil dan dibersihkan provinsi demi provinsi, disimpan sebagai CSV dan JSON.",
      "107 commit, kontribusi terbesar di tim empat orang.",
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
    categoryLabel: "Aplikasi web",
    role: "Solo, full-stack",
    team: "Proyek solo",
    summary:
      "Guest book CodeIgniter 3 untuk acara: registrasi tamu, check-in QR, kartu identitas otomatis, dan ekspor kehadiran.",
    resultLine: "Check-in QR · kartu ID otomatis · ekspor Excel",
    description:
      "Alat operasional acara, bukan landing page: tamu mendaftar dengan foto, menerima kartu identitas ber-QR, dan check-in dari kamera ponsel. Admin mendapat laporan kehadiran per acara dan ekspor Excel, dengan peran terpisah untuk staf.",
    stack: ["CodeIgniter 3", "PHP", "MySQL", "Bootstrap", "jQuery", "AdminLTE"],
    links: {
      repo: "https://github.com/zidanmubarak/guest-book-system",
    },
    image: {
      status: "generated",
      source: { kind: "none" },
      alt: "Komposisi tipografi abstrak yang mewakili sistem check-in QR dan kartu identitas.",
      aspect: "16/10",
      note: "Tidak ada tangkapan nyata dan pemilik menolak menjalankan aplikasi. Pemilik mengizinkan visual generatif; harus abstrak atau tipografis, bukan panel admin palsu.",
    },
    figure: {
      caption:
        "Visual tipografi abstrak yang disetujui pemilik. Ini bukan tangkapan aplikasi.",
      label: "Gbr. 01 · Visual generatif",
    },
    selected: true,
    featured: false,
    highlights: [
      "Check-in dengan kode QR yang dipindai melalui kamera perangkat.",
      "Kartu identitas otomatis dengan tata letak yang bisa disesuaikan per acara.",
      "Laporan kehadiran yang bisa diekspor ke Excel.",
      "Peran bertingkat (admin, staf) dan registrasi tamu RFID/NFC.",
    ],
    sources: ["github-guest-book", "github-repos"],
    verification: { verified: true, sources: ["github-guest-book"] },
  },
  {
    slug: "climate-agriculture",
    index: "06",
    title: "Climate × Agriculture",
    year: "2025",
    period: "Mar 2025 - Mei 2025",
    category: "data",
    categoryLabel: "Sains data",
    role: "Solo, analisis dan visualisasi",
    team: "Proyek solo",
    summary:
      "Studi dua notebook yang mengelompokkan 10.002 catatan iklim-pertanian, lalu memprediksi hasil panen dengan Random Forest dan Gradient Boosting.",
    resultLine: "10.002 baris × 15 kolom · empat metrik",
    description:
      "Tahap unsupervised lebih dulu: skalakan fitur, reduksi dimensi, tuning K-Means, dan baca klaster. Klaster itu menjadi label untuk tahap supervised yang membandingkan Random Forest dengan model Gradient Boosting yang sudah dituning pada accuracy, precision, recall, dan F1.",
    stack: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    links: {
      repo: "https://github.com/zidanmubarak/climate-agriculture-ml-analysis",
    },
    image: {
      status: "generated",
      source: { kind: "none" },
      alt: "Komposisi tipografi abstrak yang dibangun dari urutan hasil panen versus iklim.",
      aspect: "16/10",
      note: "Pemilik tidak memiliki grafik hasil ekspor. Utamakan ekspor nyata jika notebook bisa dijalankan; jika tidak, visual abstrak generatif, bukan dashboard dengan angka karangan.",
    },
    figure: {
      caption:
        "Visual tipografi abstrak yang disetujui pemilik. Ini bukan tangkapan aplikasi.",
      label: "Gbr. 01 · Visual generatif",
    },
    selected: true,
    featured: false,
    highlights: [
      "Clustering K-Means dengan feature engineering yang diarahkan pada silhouette score.",
      "Random Forest dibandingkan dengan Gradient Boosting yang dituning, diukur pada empat metrik.",
      "Dataset: 10.002 baris × 15 kolom dari Kaggle, diproses dengan pipeline berskrip.",
      "Dipin di profil GitHub.",
    ],
    sources: ["github-climate", "github-eksperimen", "github-profile"],
    verification: { verified: true, sources: ["github-climate", "github-eksperimen"] },
  },
];
