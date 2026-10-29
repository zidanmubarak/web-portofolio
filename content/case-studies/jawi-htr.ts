import type { CaseStudy } from "../types";

/**
 * The main case study. Every number here is copied from the CV or the
 * Hugging Face model card; nothing is estimated.
 *
 * Open question Q1 (handwriting vs. printed Jawi) is tracked in
 * `open-questions/T5.md`. Until it is answered, the prose says
 * "authentic samples" rather than claiming handwriting or print.
 */
export const jawiHtrCaseStudy: CaseStudy = {
  slug: "jawi-htr",
  projectSlug: "jawi-htr",
  title: "Reading Jawi with a vision-language model",
  subtitle:
    "Fine-tuning Qwen2.5-VL-3B to extract Jawi script and transliterate it to Rumi — and evaluating both steps separately.",
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
      label: "01 — Context",
      heading: "A script with no good defaults",
      paragraphs: [
        "Jawi is Malay written in Arabic script. It is the script of a large body of Acehnese, Malay and Bruneian documents, and it is not what general-purpose OCR was built for: the letters join, dots carry meaning, and vowel marks are often left out entirely.",
        "The task has two stages. First extraction: read the Jawi characters off an image. Then transliteration: convert that Jawi into Latin Rumi following the Pedoman Ejaan Jawi Yang Disempurnakan (PEJYD). Translation is a third, separate problem and deliberately out of scope.",
        "The thesis asked whether a small vision-language model could be adapted to both stages with parameter-efficient fine-tuning, and — more usefully — which training data actually made the difference.",
      ],
    },
    {
      kind: "facts",
      id: "setup",
      label: "02 — Setup",
      items: [
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
      label: "03 — Data",
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
          count: 7900,
          countLabel: "samples",
          description:
            "Scanned Jawi samples collected from real documents, split so that the evaluation set stays unseen.",
          note: "The CV calls these handwriting samples; the model card describes printed books, newspapers and historical documents. See open question Q1.",
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
      label: "04 — Approach",
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
      label: "05 — Results",
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
          definition: "Word error rate — whole words read correctly.",
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
      label: "06 — Reading the result",
      heading: "Good, not finished",
      paragraphs: [
        "The headline is a 79% drop in extraction errors, and the transliteration moved by a similar margin. The ablation pointed at the combination: synthetic fonts alone taught the letterforms but not the mess, and authentic documents alone did not cover enough variation.",
        "The honest number is 39.36% WER. Roughly two words in five still need a human correction, which is why the model card recommends human-in-the-loop review before anything is published. Epoch 4 started to overfit, so epoch 3 is the artifact that shipped.",
      ],
    },
  ],

  lessons: [
    "The combined scenario won: fonts alone did not cover real documents, and documents alone did not cover enough variation.",
    "Score each stage separately — a decent Rumi score can hide a bad extraction underneath it.",
    "Choose the checkpoint that generalises, not the one with the lowest training loss.",
    "Ship the demo next to the metric; the side-by-side comparison is what made the improvement legible.",
  ],

  limitations: [
    "39.36% word error rate on transliteration means a human still reviews the output.",
    "The model card warns that blur, cropping and heavy background noise push CER up.",
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
      alt: "Gradio demo showing an uploaded Jawi image with base and fine-tuned outputs.",
      status: "needs-capture",
      source: {
        kind: "url",
        value: "https://huggingface.co/spaces/zidanmubarak/jawi-transliterasi-demo",
      },
      caption:
        "The public Space compares both models on the same image. It sleeps on free CPU hardware.",
      aspect: "16/10",
    },
    {
      id: "sample",
      alt: "A Jawi sample image with the base model's output and the fine-tuned output side by side.",
      status: "missing",
      source: {
        kind: "owner-supplied",
        value:
          "One real Jawi sample plus both outputs; needs to come from the thesis material.",
      },
      caption:
        "The most persuasive image for this case study, and the one asset that does not exist publicly yet.",
      aspect: "16/10",
    },
  ],

  sources: [
    "cv",
    "hf-model-card",
    "hf-model-files",
    "hf-space",
  ],

  verification: {
    verified: true,
    sources: ["cv", "hf-model-card"],
    note: "CER/WER values and the epoch-3 choice appear on both sources; the sample counts come from the CV. The description of the authentic samples depends on open question Q1.",
  },
};
