// Generated from lib/content/copy-id.json by lib/i18n/generate-copy.mjs.
// Do not edit by hand: update the deck and re-run the generator.

import type { Copy } from "./copy-en";

export const id: Copy = {
  "schemaVersion": "1.0",
  "meta": {
    "lang": "id",
    "title": "Zidan Mubarak — AI/ML Engineer di Banda Aceh",
    "description": "Saya fine-tune model vision-language, membangun API ML, dan menerbitkan alat data. Enam proyek, dari OCR Jawi sampai pustaka memori di PyPI."
  },
  "nav": {
    "home": "Beranda",
    "about": "Tentang",
    "work": "Karya",
    "experience": "Pengalaman",
    "education": "Pendidikan",
    "skills": "Keahlian",
    "contact": "Kontak",
    "cv": "Unduh CV",
    "switchLanguage": "English",
    "openMenu": "Buka menu",
    "closeMenu": "Tutup menu"
  },
  "hero": {
    "name": "Zidan Mubarak",
    "roleLine": "AI/ML engineer yang membangun model visi komputer dan bahasa",
    "availability": "Terbuka untuk posisi magang AI/ML",
    "location": "Banda Aceh, Indonesia",
    "intro": "Saya fine-tune model vision-language, membangun API machine learning, dan mengubah dataset mentah jadi prototipe yang bisa dipakai.",
    "cta": {
      "work": "Lihat karya",
      "contact": "Hubungi saya",
      "cv": "Unduh CV"
    },
    "scroll": "Gulir"
  },
  "about": {
    "heading": "Tentang",
    "paragraphs": [
      "Saya membangun sistem machine learning dari hulu ke hilir: membereskan data, melatih model, mengukur hasilnya apa adanya, lalu merilisnya sebagai API atau demo web sederhana. Sebagian besar pekerjaan saya ada di computer vision dan model bahasa.",
      "Saya lulus dari S1 Teknologi Informasi UIN Ar-Raniry Banda Aceh dengan IPK 3.77/4.00. Untuk skripsi, saya fine-tune Qwen2.5-VL dengan QLoRA agar bisa membaca naskah Jawi cetak dan mentransliterasinya ke Rumi, lalu menerbitkan adapter-nya di Hugging Face.",
      "Sebelumnya saya membangun sistem rekomendasi wisata NusantaraGo-ML, meraih Best Capstone Project di Asah led by Dicoding lewat Pacu Pintar, dan satu semester menjadi asisten laboratorium untuk praktikum computer vision dan dasar-dasar Java."
    ]
  },
  "work": {
    "heading": "Karya pilihan",
    "intro": "Enam proyek lintas riset, API machine learning, dan perkakas data. Semuanya berangkat dari masalah yang layak diselesaikan.",
    "viewAll": "Lihat semua repositori di GitHub",
    "items": [
      {
        "id": "jawi",
        "title": "OCR dan Transliterasi Jawi",
        "year": "2026",
        "role": "Proyek skripsi, model engineer",
        "stack": [
          "Python",
          "PyTorch",
          "Qwen2.5-VL",
          "QLoRA",
          "Unsloth",
          "Hugging Face",
          "Gradio"
        ],
        "description": "Naskah Jawi memakai aksara Arab-Melayu yang kini tak lagi terbaca oleh sebagian besar orang. Model ini menyasar Jawi cetak: saya fine-tune Qwen2.5-VL-3B dengan QLoRA pada citra halaman sintetis dan hasil pindai, lalu menjalankan ablasi tiga skenario data. Adapter final menurunkan character error rate ekstraksi Jawi dari 82,5% ke 17,4% dan transliterasi Rumi dari 90,6% ke 16,5%.",
        "links": [
          {
            "label": "Model di Hugging Face",
            "href": "https://huggingface.co/zidanmubarak/jawi-qwen25-vl-qlora",
            "kind": "model"
          },
          {
            "label": "Demo langsung",
            "href": "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
            "kind": "demo"
          }
        ]
      },
      {
        "id": "pacu-pintar",
        "title": "Pacu Pintar",
        "year": "2025–2026",
        "role": "ML engineer, tim dua orang",
        "stack": [
          "Python",
          "Scikit-learn",
          "Random Forest",
          "FastAPI"
        ],
        "description": "Mahasiswa tertinggal ketika materi kuliah melaju lebih cepat dari ritme belajarnya. Bersama satu rekan saya membangun sisi ML Pacu Pintar: Random Forest yang memilah ritme belajar ke kategori konsisten, cepat, atau reflektif dengan akurasi sekitar 90%, plus layanan FastAPI yang mengembalikan saran belajar yang dirumuskan LLM.",
        "links": [
          {
            "label": "Repositori",
            "href": "https://github.com/Capstone-Project-Team-DC-08",
            "kind": "source"
          },
          {
            "label": "Video demo",
            "href": "https://drive.google.com/file/d/13IS9Zqi9NkDdG1eVsL489_-uzhGJE7Q2/view",
            "kind": "demo"
          }
        ]
      },
      {
        "id": "nusantarago",
        "title": "NusantaraGo-ML",
        "year": "2025",
        "role": "ML engineer, tim capstone",
        "stack": [
          "Python",
          "Scikit-learn",
          "Flask",
          "Pandas"
        ],
        "description": "Wisatawan sering hanya mendapat daftar destinasi generik yang tidak sesuai selera. Saya membangun recommender hibrida, skor berbasis konten ditambah user-based collaborative filtering, lalu menyajikannya lewat Flask sehingga formulir preferensi singkat menghasilkan peringkat destinasi Indonesia.",
        "links": [
          {
            "label": "Repositori",
            "href": "https://github.com/NusantaraGo/NusantaraGo-ML",
            "kind": "source"
          }
        ]
      },
      {
        "id": "climate-agriculture",
        "title": "Dampak Iklim pada Pertanian",
        "year": "2025",
        "role": "Solo, proyek akhir kelas",
        "stack": [
          "Python",
          "Pandas",
          "Scikit-learn",
          "Matplotlib",
          "Seaborn"
        ],
        "description": "Perencana kebijakan pertanian sulit membaca seberapa besar perubahan iklim menekan hasil panen. Saya mengelompokkan dataset iklim-pertanian dari Kaggle untuk menemukan pola antarwilayah, melatih classifier untuk memprediksi hasil panen spesifik dari variabel iklim, lalu menulis kedua notebook agar analisisnya bisa diulang.",
        "links": [
          {
            "label": "Repositori",
            "href": "https://github.com/zidanmubarak/climate-agriculture-ml-analysis",
            "kind": "source"
          }
        ]
      },
      {
        "id": "bike-sharing",
        "title": "Dashboard Permintaan Sepeda Sewa",
        "year": "2025",
        "role": "Solo, proyek akhir kelas",
        "stack": [
          "Python",
          "Pandas",
          "Matplotlib",
          "Streamlit"
        ],
        "description": "Pengelola sepeda sewa perlu tahu kondisi apa yang mendorong penyewaan. Saya membandingkan pola musim, cuaca, dan per jam pada dataset UCI, menjalankan clustering untuk memisahkan kelompok penggunaan, lalu merilis dashboard Streamlit dengan filter tanggal, musim, dan cuaca.",
        "links": [
          {
            "label": "Repositori",
            "href": "https://github.com/zidanmubarak/data-visualization-dashboard",
            "kind": "source"
          }
        ]
      },
      {
        "id": "memory-vault",
        "title": "Memory Vault AI",
        "year": "2026",
        "role": "Solo, penulis dan pengelola",
        "stack": [
          "Python",
          "FastAPI",
          "SQLModel",
          "SQLite",
          "ChromaDB",
          "PyPI"
        ],
        "description": "Asisten AI melupakan semuanya begitu sesi berakhir. Saya membangun Memory Vault AI, lapisan Python di antara aplikasi dan LLM apa pun: menangkap percakapan, mengekstrak fakta, memadatkan konteks lama, lalu menyuntikkan memori relevan ke setiap prompt baru. Terbit di PyPI sebagai memory-vault.",
        "links": [
          {
            "label": "Repositori",
            "href": "https://github.com/zidanmubarak/Memory-Vault-AI",
            "kind": "source"
          },
          {
            "label": "Paket PyPI",
            "href": "https://pypi.org/project/memory-vault/",
            "kind": "package"
          }
        ]
      }
    ]
  },
  "experience": {
    "heading": "Pengalaman",
    "intro": "Riset, pengajaran, dan magang.",
    "items": [
      {
        "id": "lab-big-data",
        "role": "Asisten Laboratorium Big Data Analitik",
        "org": "Program Studi Teknologi Informasi, UIN Ar-Raniry Banda Aceh",
        "place": "Banda Aceh, Indonesia",
        "period": "Mei 2026 – Jul 2026",
        "bullets": [
          "Mendampingi mahasiswa pada praktikum computer vision: pengolahan citra dengan Python dan OpenCV, klasifikasi CNN, transfer learning, dan fine-tuning.",
          "Membantu mahasiswa membenahi kode saat praktik dan menjelaskan penyebab tiap kesalahan."
        ]
      },
      {
        "id": "lab-algorithms",
        "role": "Asisten Laboratorium Algoritma dan Pemrograman",
        "org": "Program Studi Teknologi Informasi, UIN Ar-Raniry Banda Aceh",
        "place": "Banda Aceh, Indonesia",
        "period": "Mei 2026 – Jul 2026",
        "bullets": [
          "Mendampingi praktikum dasar Java: variabel, tipe data, input, operator aritmatika, dan percabangan.",
          "Menyusun studi kasus praktikum dengan tingkat kesulitan setara beserta rubrik penilaiannya."
        ]
      },
      {
        "id": "asah",
        "role": "Cohort Machine Learning, Best Capstone Project",
        "org": "Asah led by Dicoding",
        "place": "Remote, Bandung, Indonesia",
        "period": "Agu 2025 – Jan 2026",
        "bullets": [
          "Membangun komponen ML Pacu Pintar bersama satu rekan: Random Forest yang memilah ritme belajar ke tiga kategori dengan akurasi sekitar 90%.",
          "Merilis layanan FastAPI yang mengubah keluaran model jadi saran belajar LLM untuk aplikasi web tim.",
          "Menutup program dengan penghargaan Best Capstone Project."
        ]
      },
      {
        "id": "coding-camp",
        "role": "Cohort Machine Learning Engineer",
        "org": "Coding Camp powered by DBS Foundation",
        "place": "Remote, Bandung, Indonesia",
        "period": "Feb 2025 – Jul 2025",
        "bullets": [
          "Menuntaskan jalur ML bersertifikat, termasuk alur soft skills dan kelas Introduction to Financial Literacy.",
          "Melatih classifier gambar CNN dengan transfer learning untuk materi computer vision.",
          "Membangun NusantaraGo-ML, sistem rekomendasi wisata dengan content-based dan user-based collaborative filtering, disajikan lewat Flask."
        ]
      },
      {
        "id": "bpka",
        "role": "Pengelolaan dan Analisis Data",
        "org": "Badan Pengelolaan Keuangan Aceh (BPKA)",
        "place": "Banda Aceh, Indonesia",
        "period": "Feb 2025 – Mar 2025",
        "bullets": [
          "Mendigitalisasi dan mengolah data keuangan dengan spreadsheet dan alat analisis data.",
          "Menyusun dokumentasi internal dan laporan operasional harian, lalu mendukung pelaporan data keuangan."
        ]
      }
    ]
  },
  "education": {
    "heading": "Pendidikan",
    "intro": "Studi formal dan catatan akademik.",
    "labels": {
      "degree": "Jenjang",
      "institution": "Institusi",
      "period": "Periode",
      "gpa": "IPK"
    },
    "items": [
      {
        "id": "s1-informatics",
        "degree": "S1 Teknologi Informasi",
        "institution": "UIN Ar-Raniry Banda Aceh",
        "period": "2022 – 2026",
        "gpa": "3,77/4,00"
      }
    ]
  },
  "skills": {
    "heading": "Keahlian",
    "intro": "Perangkat yang saya pakai, dikelompokkan menurut cara pakainya.",
    "groups": [
      {
        "id": "ml",
        "title": "Machine learning dan AI",
        "items": [
          "Python",
          "PyTorch",
          "TensorFlow",
          "Keras",
          "Scikit-learn",
          "Hugging Face",
          "Fine-tuning QLoRA dengan Unsloth",
          "CNN dan transfer learning",
          "OpenCV",
          "Sistem rekomendasi",
          "Klasifikasi"
        ]
      },
      {
        "id": "data",
        "title": "Data",
        "items": [
          "SQL",
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Plotly",
          "Preprocessing dan feature engineering",
          "Evaluasi model dengan CER, WER, dan akurasi"
        ]
      },
      {
        "id": "deploy",
        "title": "Deployment dan perkakas",
        "items": [
          "Flask",
          "FastAPI",
          "Gradio",
          "Hugging Face Hub dan Spaces",
          "Git dan GitHub",
          "Google Colab",
          "Jupyter Notebook",
          "VS Code"
        ]
      },
      {
        "id": "collab",
        "title": "Bahasa dan kolaborasi",
        "items": [
          "Indonesia, aktif",
          "Inggris, pasif",
          "Pemecahan masalah",
          "Dokumentasi teknis",
          "Kerja tim",
          "Pendampingan mahasiswa"
        ]
      }
    ]
  },
  "certifications": {
    "heading": "Sertifikasi dan penghargaan",
    "intro": "Kredensial dari Dicoding Indonesia dan Asah.",
    "items": [
      {
        "id": "best-capstone",
        "name": "Best Capstone Project",
        "issuer": "Asah led by Dicoding",
        "year": "Januari 2026",
        "type": "award"
      },
      {
        "id": "mlops",
        "name": "Membangun Sistem Machine Learning (MLOps)",
        "issuer": "Dicoding Indonesia",
        "year": "2025",
        "type": "certification"
      },
      {
        "id": "applied-ml",
        "name": "Machine Learning Terapan",
        "issuer": "Dicoding Indonesia",
        "year": "2025",
        "type": "certification"
      },
      {
        "id": "data-processing",
        "name": "Belajar Fundamental Pemrosesan Data",
        "issuer": "Dicoding Indonesia",
        "year": "2025",
        "type": "certification"
      }
    ]
  },
  "contact": {
    "heading": "Hubungi saya",
    "body": "Punya peran, proyek, atau dataset yang butuh model? Kirim pesan dan ceritakan apa yang sedang Anda kerjakan.",
    "labels": {
      "name": "Nama",
      "email": "Email",
      "subject": "Subjek",
      "message": "Pesan",
      "submit": "Kirim pesan",
      "sending": "Mengirim"
    },
    "placeholders": {
      "name": "Nama Anda",
      "email": "nama@email.com",
      "subject": "Tentang apa ini?",
      "message": "Ceritakan proyeknya"
    },
    "success": {
      "heading": "Pesan terkirim",
      "body": "Terima kasih. Saya akan membalas ke alamat email yang Anda isi."
    },
    "error": "Pesan gagal dikirim. Coba lagi, atau kirim email langsung ke saya.",
    "info": {
      "emailLabel": "Email",
      "locationLabel": "Lokasi",
      "locationValue": "Banda Aceh, Indonesia",
      "connectLabel": "Di tempat lain"
    },
    "availability": {
      "heading": "Terbuka untuk posisi magang",
      "body": "Saya mencari magang sebagai AI engineer untuk mengerjakan model dan data sungguhan."
    }
  },
  "footer": {
    "tagline": "AI/ML engineer di Banda Aceh. Saya membangun model visi komputer dan bahasa, lalu merilisnya.",
    "navHeading": "Navigasi",
    "contactHeading": "Kontak",
    "availability": "Terbuka untuk posisi magang",
    "rights": "© {year} Zidan Mubarak. Seluruh hak cipta dilindungi.",
    "builtWith": "Dibangun dengan Next.js dan Tailwind CSS",
    "backToTop": "Kembali ke atas"
  }
};
