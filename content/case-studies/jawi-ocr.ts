import type { CaseStudy } from "../types";

/**
 * The main case study. Every number here is copied from the CV,
 * the Hugging Face model card, or the owner's answers to the T5
 * open questions (2026-10-29); nothing is estimated.
 *
 * The official thesis title covers *printed* Jawi. The dataset also
 * contains handwriting, so the prose names both where the data is
 * described.
 */
export const jawiOcrCaseStudy: CaseStudy = {
  slug: "jawi-ocr",
  projectSlug: "jawi-ocr",
  title: "Reading printed Jawi with a vision-language model",
  subtitle:
    "Fine-tuning Qwen2.5-VL-3B to extract Jawi script and transliterate it to Rumi, with the two stages evaluated separately.",
  year: "2026",
  role: "Researcher and ML engineer (solo)",
  readingTime: "6 min",
  summary:
    "An undergraduate thesis that turned a general-purpose 3B vision-language model into a Jawi reader: 82.51% character error became 17.35% on images the model had never seen.",

  headlineMetric: {
    value: 79,
    decimals: 0,
    suffix: "%",
    label: "fewer character errors",
    context: "CER Jawi: 82.51% → 17.35% on 790 held-out images",
  },

  blocks: [
    {
      kind: "prose",
      id: "context",
      label: "01 · Context",
      heading: "A script with no good defaults",
      paragraphs: [
        "Jawi is Malay written in Arabic script. It is the script of a large body of Acehnese, Malay and Bruneian documents, and it is not what general-purpose OCR was built for: the letters join, dots carry meaning, and vowel marks are often left out entirely.",
        "The task has two stages. First extraction: read the Jawi characters off an image. Then transliteration: convert that Jawi into Latin Rumi following the Pedoman Ejaan Jawi Yang Disempurnakan (PEJYD). Translation is a third, separate problem and deliberately out of scope.",
        "The thesis asked whether a small vision-language model could be adapted to both stages with parameter-efficient fine-tuning, and, more usefully, which training data actually made the difference.",
      ],
    },
    {
      kind: "facts",
      id: "setup",
      label: "02 · Setup",
      items: [
        { term: "Thesis", value: "Implementasi Multimodal Large Language Model untuk Ekstraksi dan Transliterasi Printed Jawi Script" },
        { term: "Base model", value: "Qwen2.5-VL-3B-Instruct" },
        { term: "Method", value: "QLoRA, 4-bit NF4, bfloat16" },
        { term: "Training stack", value: "Unsloth, PyTorch, PEFT" },
        { term: "Hardware", value: "NVIDIA T4 / A100 on Google Colab" },
        { term: "Adapter", value: "314 MiB safetensors, Apache 2.0" },
        { term: "Serving", value: "Hugging Face adapter + Gradio demo" },
      ],
    },
    {
      kind: "datasets",
      id: "data",
      label: "03 · Data",
      heading: "Two kinds of samples, three ways to mix them",
      intro:
        "Synthetic data gives clean letterforms; real documents give noise, skew and age. The ablation exists to find out which one the model actually needed.",
      items: [
        {
          id: "synthetic",
          label: "Synthetic",
          count: 26000,
          countLabel: "samples",
          description:
            "Jawi text rendered across several Arabic and Jawi typefaces, including Jawi Uthman Taha and Arabic Typesetting.",
        },
        {
          id: "authentic",
          label: "Authentic",
          count: 7902,
          countLabel: "samples",
          description:
            "Scanned Jawi samples, printed documents and handwriting, split so that the evaluation set stays unseen.",
        },
        {
          id: "test",
          label: "Held-out test",
          count: 790,
          countLabel: "images",
          description:
            "10% of the authentic set, never used in training. Every number below comes from this split.",
        },
      ],
    },
    {
      kind: "steps",
      id: "approach",
      label: "04 · Approach",
      heading: "Five moves, in order",
      steps: [
        {
          index: "01",
          title: "Curate both datasets",
          body: "Render synthetic Jawi across fonts, collect authentic scans, and keep a held-out slice that never appears in training.",
        },
        {
          index: "02",
          title: "Fix the instruction format",
          body: "A system prompt makes the order non-negotiable: extract first, then transliterate per PEJYD, and answer only in `Jawi:` and `Rumi:` lines so the output can be scored mechanically.",
        },
        {
          index: "03",
          title: "Fine-tune with QLoRA",
          body: "Quantise the 3B base model to 4-bit NF4, train adapters with bfloat16 mixed precision, an 8-bit paged AdamW and gradient checkpointing via Unsloth.",
        },
        {
          index: "04",
          title: "Run the ablation",
          body: "Train the same recipe on synthetic only, authentic only, and a combination. Compare all three on the same held-out images.",
        },
        {
          index: "05",
          title: "Evaluate per stage",
          body: "Score Jawi extraction with CER, transliteration with CER Rumi and WER Rumi. Watch validation loss per epoch and pick the checkpoint that generalises.",
        },
      ],
    },
    {
      kind: "metrics",
      id: "results",
      label: "05 · Results",
      heading: "What changed on unseen data",
      intro:
        "Zero-shot Qwen2.5-VL against the final adapter, 790 authentic images that neither model saw in training. Lower is better on every row.",
      metrics: [
        {
          id: "cer-jawi",
          label: "CER Jawi",
          definition: "Character error rate when extracting Arabic-script Jawi.",
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
          definition: "Character error rate of the Latin transliteration.",
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
          definition: "Word error rate: whole words read correctly.",
          before: 107.08,
          after: 39.36,
          unit: "%",
          decimals: 2,
          lowerIsBetter: true,
          deltaPercent: 63,
          note: "WER can exceed 100% when insertions outnumber correct words.",
        },
      ],
    },
    {
      kind: "prose",
      id: "result-reading",
      label: "06 · Reading the result",
      heading: "Good, not finished",
      paragraphs: [
        "The headline is a 79% drop in extraction errors, and the transliteration moved by a similar margin. The ablation pointed at the combination: synthetic fonts alone taught the letterforms but not the mess, and authentic documents alone did not cover enough variation.",
        "The honest number is 39.36% WER. Roughly two words in five still need a human correction, which is why the model card recommends human-in-the-loop review before anything is published. Epoch 4 started to overfit, so epoch 3 is the artifact that shipped.",
      ],
    },
  ],

  lessons: [
    "The combined scenario won: fonts alone did not cover real documents, and documents alone did not cover enough variation.",
    "Score each stage separately; a decent Rumi score can hide a bad extraction underneath it.",
    "Choose the checkpoint that generalises, not the one with the lowest training loss.",
    "Ship the demo next to the metric; the side-by-side comparison is what made the improvement legible.",
  ],

  limitations: [
    "39.36% word error rate on transliteration means a human still reviews the output.",
    "The model card warns that blur, cropping and heavy background noise push CER up.",
    "Cursive, heavily aged handwriting is harder than printed typesetting; the thesis scope is printed Jawi.",
    "PEJYD has exceptions for Arabic loanwords that the model can still get wrong.",
    "790 test images is small by OCR standards; read the numbers as an estimate.",
  ],

  links: {
    hfModel: "https://huggingface.co/zidanmubarak/jawi-qwen25-vl-qlora",
    hfSpace: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
  },

  figures: [
    {
      id: "results-chart",
      alt: "Grouped bar chart: CER Jawi 82.5% to 17.4%, CER Rumi 90.6% to 16.5%, WER Rumi 107.1% to 39.4%.",
      status: "available",
      source: {
        kind: "url",
        value:
          "https://huggingface.co/zidanmubarak/jawi-qwen25-vl-qlora/resolve/main/showcase_chart.png",
      },
      caption:
        "The chart published with the model: base model against the fine-tuned adapter on the held-out split.",
      aspect: "16/9",
    },
    {
      id: "demo",
      alt: "Gradio notebook comparing the base model and the fine-tuned adapter on a one-line Jawi crop.",
      status: "needs-capture",
      source: {
        kind: "url",
        value: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
      },
      caption:
        "The Gradio comparison on a one- or two-line crop. It sleeps on free CPU hardware, so wake it before capturing.",
      aspect: "16/10",
    },
    {
      id: "sample",
      alt: "A one-line Jawi crop with the base model's output above the fine-tuned output.",
      status: "needs-capture",
      source: {
        kind: "owner-supplied",
        value:
          "Gradio comparison notebook: one- or two-line crops, base model versus fine-tuned adapter.",
      },
      caption:
        "The most persuasive image for this case study: the same crop read by both models.",
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
    note: "Metrics and the epoch-3 choice are on both the CV and the model card; the 26,000 / 7,902 counts and the thesis title come from the owner's answers on 2026-10-29. Printed scope confirmed; handwriting is present in the data but is the harder case.",
  },
};
