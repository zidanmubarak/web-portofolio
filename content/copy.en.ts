import type { SiteCopy } from "./types";

/**
 * UI copy — DRAFT.
 *
 * Written by T5 from verified facts only. T7 rewrites the final tone
 * against `design-direction.md`; the structure here is the contract, not
 * the last word. Never add a claim that is not in the data files.
 */
export const copy: SiteCopy = {
  status: "draft",

  meta: {
    title: "Zidan Mubarak — AI/ML Engineer",
    titleTemplate: "%s — Zidan Mubarak",
    description:
      "AI/ML engineer in Banda Aceh. Fine-tunes vision-language models, builds the interfaces around them, and publishes the evaluation.",
    keywords: [
      "AI engineer",
      "machine learning",
      "computer vision",
      "Jawi OCR",
      "vision-language model",
      "Next.js",
      "Indonesia",
    ],
  },

  nav: {
    items: [
      { id: "work", label: "Work", href: "/work", index: "01" },
      { id: "about", label: "About", href: "#about", index: "02" },
      { id: "services", label: "Services", href: "#services", index: "03" },
      { id: "tools", label: "Tools", href: "#tools", index: "04" },
      { id: "experience", label: "Experience", href: "#experience", index: "05" },
      { id: "contact", label: "Contact", href: "#contact", index: "06" },
    ],
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skipToContent: "Skip to content",
    externalLink: "opens in a new tab",
  },

  hero: {
    eyebrow: "AI/ML engineer · Banda Aceh, Indonesia",
    intro:
      "I fine-tune vision-language models, then build the interface that puts them in someone's hands. Most recently: a 3B model that reads Jawi.",
    primaryCta: "See the work",
    secondaryCta: "Get in touch",
    scrollCue: "Scroll",
    portraitAlt: "Portrait of Zidan Mubarak",
    statsLabel: "By the numbers",
  },

  about: {
    label: "About",
    heading: ["The short", "version"],
    closing:
      "If you only read one thing here, read the Jawi case study. It is the clearest example of how I work.",
    nowLabel: "Now",
    now: [
      "Open to AI/ML internships and junior roles.",
      "Based in Banda Aceh, UTC+7.",
    ],
  },

  services: {
    label: "Services",
    heading: ["Four ways", "I can help"],
    intro:
      "Not a menu of everything I have touched. The four areas where there is work below to prove it.",
    proofLabel: "Evidence",
  },

  tools: {
    label: "Tools",
    heading: ["What I", "work with"],
    intro:
      "Tools that show up across these projects and the work behind them.",
    footnote: "Icons from simple-icons.",
  },

  work: {
    label: "Selected work",
    heading: ["Six projects", "worth your time"],
    intro:
      "Chosen for impact and for how much of the evidence is public. The first one is the thesis.",
    counterSeparator: " / ",
    caseStudyCta: "Read the case study",
    viewAll: "All work",
    indexHeading: ["Work", "index"],
    indexIntro:
      "Everything selected, in one list. Short descriptions; the detail lives in each case study.",
    backToWork: "Back to selected work",
    nextProject: "Next project",
    prevProject: "Previous project",
    roleLabel: "Role",
    yearLabel: "Year",
    stackLabel: "Stack",
    linksLabel: "Links",
    liveLabel: "Live",
    repoLabel: "Source",
    modelLabel: "Model",
    demoLabel: "Demo",
    packageLabel: "Package",
    docsLabel: "Docs",
    paperLabel: "Paper",
    caseStudyLabel: "Case study",
    comingSoon: "Screenshot pending",
  },

  caseStudy: {
    backLabel: "All work",
    metaRole: "Role",
    metaYear: "Year",
    metaReadingTime: "Reading time",
    lessonsLabel: "What I took from it",
    limitationsLabel: "Where it still fails",
    sourcesLabel: "Sources",
    headlineLabel: "Result",
  },

  experience: {
    label: "Experience",
    heading: ["Where I've", "worked"],
    currentLabel: "Present",
    educationLabel: "Education",
    educationHeading: ["Where I", "studied"],
    certificationsLabel: "Credentials",
    certificationsHeading: ["Certificates,", "awards, paper"],
    credentialLabel: "Credential",
    verifiedLabel: "Verified",
    unverifiedLabel: "Unverified",
    thesisLabel: "Thesis",
  },

  contact: {
    label: "Contact",
    heading: ["Say something", "useful"],
    body:
      "A sentence about the role, the project, or the problem is enough. I answer everything that is not a template.",
    emailLabel: "Email",
    copyLabel: "Copy address",
    copiedLabel: "Copied",
    responseNote: "Replies come from this address.",
    socialHeading: "Elsewhere",
    form: {
      heading: "Or write here",
      name: "Name",
      namePlaceholder: "Who is writing",
      email: "Email",
      emailPlaceholder: "you@company.com",
      subject: "Subject",
      subjectPlaceholder: "Role, project, or question",
      message: "Message",
      messagePlaceholder: "What are you working on?",
      submit: "Send message",
      submitting: "Sending",
      success: "Message sent. I'll reply from zidanmubarak00@gmail.com.",
      error: "The message did not send. Try email instead.",
      fallback: "If the form fails, email zidanmubarak00@gmail.com directly.",
      requiredHint: "All fields are required.",
      privacy: "Your address is only used to reply. No list, no tracking.",
    },
  },

  footer: {
    tagline: "Machine learning, interfaces, and the space between them.",
    signatureLabel: "Signature",
    backToTop: "Back to top",
    builtNote: "Designed and built by Zidan Mubarak.",
    rights: "All rights reserved.",
    colophon: "Set in Banda Aceh. Updated October 2026.",
  },

  common: {
    loading: "Loading",
    error: "Something broke. Try again, or email me.",
    notFoundTitle: "404",
    notFoundBody: "This page is not here. The work still is.",
    notFoundCta: "Back to the work",
  },
};
