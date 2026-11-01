import type { CaseStudy } from "../../types";

/**
 * Studi kasus utama. Setiap angka di sini disalin dari CV, model card
 * Hugging Face, atau jawaban pemilik atas pertanyaan terbuka T5 (2026-10-29);
 * tidak ada yang diperkirakan.
 *
 * Judul skripsi resmi mencakup Jawi *cetak*. Dataset juga memuat tulisan
 * tangan, jadi prosa menyebut keduanya saat data dijelaskan.
 */
export const jawiOcrCaseStudy: CaseStudy = {
  slug: "jawi-ocr",
  projectSlug: "jawi-ocr",
  title: "Membaca Jawi cetak dengan vision-language model",
  subtitle:
    "Fine-tuning Qwen2.5-VL-3B untuk mengekstraksi aksara Jawi dan mentransliterasinya ke Rumi, dengan kedua tahap dievaluasi secara terpisah.",
  year: "2026",
  role: "Peneliti dan ML engineer (solo)",
  readingTime: "6 menit",
  summary:
    "Skripsi yang mengubah vision-language model 3B serbaguna menjadi pembaca Jawi: character error 82,51% turun menjadi 17,35% pada citra yang belum pernah dilihat model.",

  headlineMetric: {
    value: 79,
    decimals: 0,
    suffix: "%",
    label: "lebih sedikit character error",
    context: "CER Jawi: 82,51% → 17,35% pada 790 citra held-out",
  },

  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "01 · Konteks",
      heading: "Aksara tanpa default yang baik",
      paragraphs: [
        "Jawi adalah bahasa Melayu yang ditulis dengan aksara Arab. Aksara ini dipakai oleh banyak dokumen Aceh, Melayu, dan Brunei, dan bukan yang menjadi target OCR serbaguna: hurufnya bersambung, titik membawa makna, dan tanda vokal sering dihilangkan sepenuhnya.",
        "Tugasnya punya dua tahap. Pertama ekstraksi: membaca karakter Jawi dari gambar. Lalu transliterasi: mengubah Jawi itu menjadi Rumi Latin mengikuti Pedoman Ejaan Jawi Yang Disempurnakan (PEJYD). Terjemahan adalah masalah ketiga yang terpisah dan sengaja di luar cakupan.",
        "Skripsi ini bertanya apakah model vision-language kecil bisa diadaptasi untuk kedua tahap dengan fine-tuning hemat parameter, dan yang lebih berguna, data latih mana yang benar-benar membuat perbedaan.",
      ],
    },
    {
      kind: "facts",
      id: "setup",
      label: "02 · Persiapan",
      items: [
        {
          term: "Skripsi",
          value:
            "Implementasi Multimodal Large Language Model untuk Ekstraksi dan Transliterasi Printed Jawi Script",
        },
        { term: "Model dasar", value: "Qwen2.5-VL-3B-Instruct" },
        { term: "Metode", value: "QLoRA, 4-bit NF4, bfloat16" },
        { term: "Stack pelatihan", value: "Unsloth, PyTorch, PEFT" },
        { term: "Perangkat keras", value: "NVIDIA T4 / A100 di Google Colab" },
        { term: "Adapter", value: "314 MiB safetensors, Apache 2.0" },
        { term: "Penyajian", value: "Adapter Hugging Face + demo Gradio" },
      ],
    },
    {
      kind: "datasets",
      id: "data",
      label: "03 · Data",
      heading: "Dua jenis sampel, tiga cara mencampurnya",
      intro:
        "Data sintetis memberi bentuk huruf yang bersih; dokumen nyata memberi noise, kemiringan, dan usia. Ablasi dilakukan untuk mengetahui mana yang benar-benar dibutuhkan model.",
      items: [
        {
          id: "synthetic",
          label: "Sintetis",
          count: 26000,
          countLabel: "sampel",
          description:
            "Teks Jawi dirender dalam beberapa typeface Arab dan Jawi, termasuk Jawi Uthman Taha dan Arabic Typesetting.",
        },
        {
          id: "authentic",
          label: "Autentik",
          count: 7902,
          countLabel: "sampel",
          description:
            "Sampel Jawi hasil pindai, dokumen cetak dan tulisan tangan, dipisah agar set evaluasi tetap belum pernah dilihat.",
        },
        {
          id: "test",
          label: "Uji held-out",
          count: 790,
          countLabel: "citra",
          description:
            "10% dari set autentik, tidak pernah dipakai untuk pelatihan. Semua angka di bawah berasal dari split ini.",
        },
      ],
    },
    {
      kind: "steps",
      id: "approach",
      label: "04 · Pendekatan",
      heading: "Lima langkah, berurutan",
      steps: [
        {
          index: "01",
          title: "Kurasi kedua dataset",
          body:
            "Render Jawi sintetis di berbagai font, kumpulkan pindaian autentik, dan sisakan potongan held-out yang tidak pernah muncul di pelatihan.",
        },
        {
          index: "02",
          title: "Perbaiki format instruksi",
          body:
            "System prompt membuat urutannya tidak bisa ditawar: ekstraksi dulu, lalu transliterasi per PEJYD, dan jawab hanya dalam baris `Jawi:` dan `Rumi:` supaya keluaran bisa dinilai secara mekanis.",
        },
        {
          index: "03",
          title: "Fine-tuning dengan QLoRA",
          body:
            "Kuantisasi model dasar 3B ke 4-bit NF4, latih adapter dengan presisi campuran bfloat16, AdamW 8-bit paged, dan gradient checkpointing melalui Unsloth.",
        },
        {
          index: "04",
          title: "Jalankan ablasi",
          body:
            "Latih resep yang sama pada data sintetis saja, autentik saja, dan kombinasi keduanya. Bandingkan ketiganya pada citra held-out yang sama.",
        },
        {
          index: "05",
          title: "Evaluasi per tahap",
          body:
            "Nilai ekstraksi Jawi dengan CER, transliterasi dengan CER Rumi dan WER Rumi. Pantau validation loss per epoch dan pilih checkpoint yang bisa generalisasi.",
        },
      ],
    },
    {
      kind: "metrics",
      id: "results",
      label: "05 · Hasil",
      heading: "Apa yang berubah pada data baru",
      intro:
        "Qwen2.5-VL zero-shot dibandingkan dengan adapter final, pada 790 citra autentik yang tidak dilihat kedua model saat pelatihan. Semakin rendah semakin baik di setiap baris.",
      metrics: [
        {
          id: "cer-jawi",
          label: "CER Jawi",
          definition:
            "Character error rate saat mengekstraksi Jawi beraksara Arab.",
          before: 82.51,
          after: 17.35,
          unit: "%",
          decimals: 2,
          lowerIsBetter: true,
          deltaPercent: 79,
        },
        {
          id: "cer-rumi",
          label: "CER Rumi",
          definition:
            "Character error rate pada transliterasi Latin.",
          before: 90.59,
          after: 16.48,
          unit: "%",
          decimals: 2,
          lowerIsBetter: true,
          deltaPercent: 82,
        },
        {
          id: "wer-rumi",
          label: "WER Rumi",
          definition: "Word error rate, seberapa banyak kata utuh terbaca benar.",
          before: 107.08,
          after: 39.36,
          unit: "%",
          decimals: 2,
          lowerIsBetter: true,
          deltaPercent: 63,
          note:
            "WER bisa melewati 100% ketika jumlah insertion melebihi jumlah kata yang benar.",
        },
      ],
    },
    {
      kind: "prose",
      id: "result-reading",
      label: "06 · Membaca hasil",
      heading: "Bagus, belum selesai",
      paragraphs: [
        "Angka utamanya adalah penurunan 79% pada error ekstraksi, dan transliterasi bergerak dengan margin serupa. Ablasi menunjuk pada kombinasi: font sintetis saja mengajarkan bentuk huruf tetapi tidak kekacauan dokumen, dan dokumen autentik saja tidak mencakup variasi yang cukup.",
        "Angka yang jujur adalah WER 39,36%. Kira-kira dua dari lima kata masih perlu dikoreksi manusia, karena itu model card menyarankan review human-in-the-loop sebelum apa pun diterbitkan. Epoch 4 mulai overfit, jadi epoch 3 adalah artefak yang dirilis.",
      ],
    },
  ],

  lessons: [
    "Skenario gabungan menang: font saja tidak mencakup dokumen nyata, dan dokumen saja tidak mencakup variasi yang cukup.",
    "Nilai setiap tahap secara terpisah, karena skor Rumi yang lumayan bisa menyembunyikan ekstraksi yang buruk di bawahnya.",
    "Pilih checkpoint yang bisa generalisasi, bukan yang training loss-nya paling rendah.",
    "Rilis demo bersama metriknya; perbandingan berdampingan itulah yang membuat peningkatan terbaca.",
  ],

  limitations: [
    "Word error rate 39,36% pada transliterasi berarti manusia masih harus meninjau keluarannya.",
    "Model card memperingatkan bahwa blur, cropping, dan noise latar yang berat menaikkan CER.",
    "Tulisan tangan kursif yang sudah sangat tua lebih sulit daripada typesetting cetak; cakupan skripsi adalah Jawi cetak.",
    "PEJYD punya pengecualian untuk kata serapan Arab yang masih bisa salah ditebak model.",
    "790 citra uji tergolong kecil untuk standar OCR; baca angka ini sebagai estimasi.",
  ],

  links: {
    hfModel: "https://huggingface.co/zidanmubarak/jawi-qwen25-vl-qlora",
    hfSpace: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
  },

  figures: [
    {
      id: "results-chart",
      alt: "Grafik batang berkelompok: CER Jawi 82,5% ke 17,4%, CER Rumi 90,6% ke 16,5%, WER Rumi 107,1% ke 39,4%.",
      status: "available",
      source: {
        kind: "url",
        value:
          "https://huggingface.co/zidanmubarak/jawi-qwen25-vl-qlora/resolve/main/showcase_chart.png",
      },
      caption:
        "Grafik yang diterbitkan bersama model: model dasar dibandingkan dengan adapter hasil fine-tuning pada split held-out.",
      aspect: "16/9",
    },
    {
      id: "demo",
      alt: "Notebook Gradio yang membandingkan model dasar dan adapter hasil fine-tuning pada potongan Jawi satu baris.",
      status: "needs-capture",
      source: {
        kind: "url",
        value: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
      },
      caption:
        "Perbandingan Gradio pada potongan satu atau dua baris. Space tidur di perangkat CPU gratis, jadi bangunkan dulu sebelum menangkap.",
      aspect: "16/10",
    },
    {
      id: "sample",
      alt: "Potongan Jawi satu baris dengan keluaran model dasar di atas keluaran hasil fine-tuning.",
      status: "needs-capture",
      source: {
        kind: "owner-supplied",
        value:
          "Notebook perbandingan Gradio: potongan satu atau dua baris, model dasar versus adapter hasil fine-tuning.",
      },
      caption:
        "Gambar paling persuasif untuk studi kasus ini: potongan yang sama dibaca oleh kedua model.",
      aspect: "16/10",
    },
  ],

  sources: [
    "cv",
    "hf-model-card",
    "hf-model-files",
    "hf-space",
    // "owner-answers",
  ],

  verification: {
    verified: true,
    sources: ["cv", "hf-model-card", "owner-answers"],
    note: "Metrik dan pilihan epoch 3 ada di CV dan model card; jumlah 26.000 / 7.902 serta judul skripsi berasal dari jawaban pemilik pada 2026-10-29. Cakupan cetak dikonfirmasi; tulisan tangan ada di data tetapi merupakan kasus yang lebih sulit.",
  },
};
