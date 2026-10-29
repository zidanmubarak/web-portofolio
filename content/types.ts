/**
 * Content model for the portfolio.
 *
 * Rules of this folder
 * --------------------
 * 1. Every fact that reaches the UI must be traceable to an entry in
 *    `sources.ts`. If a fact cannot be verified, it is either dropped or
 *    marked `verified: false` and listed in `open-questions/T5.md`.
 * 2. English is the default language. Translatable prose lives in
 *    `copy.en.ts` and in the prose fields of the data files. A future
 *    `content/id/` folder must re-declare the same shapes, e.g.
 *    `export const copy: SiteCopy = { ... }`, so the UI can switch by
 *    importing from `content/id` instead of `content`.
 * 3. Numbers are stored as numbers when they are rendered by the odometer
 *    or by a table, with a separate display string only where the source
 *    gives a rounded value.
 * 4. No UI code in this folder. No imports from `components/`, `app/`,
 *    `lib/` or `next/*`.
 */

export type SourceId = string;

export type SourceKind =
  | "cv"
  | "github"
  | "huggingface"
  | "journal"
  | "live-site"
  | "owner-brief"
  | "linkedin"
  | "credential"
  | "package";

export interface SourceRef {
  readonly id: SourceId;
  readonly label: string;
  readonly kind: SourceKind;
  readonly url?: string;
  /** ISO date the source was read. */
  readonly retrievedAt: string;
  /** Human note about what this source proves. */
  readonly note?: string;
}

export interface Verification {
  readonly verified: boolean;
  readonly sources: readonly SourceId[];
  /** Short reason when `verified` is false, or a scope caveat when true. */
  readonly note?: string;
}

/** A period that the UI can render without re-parsing strings. */
export interface Period {
  /** `YYYY-MM` when the month is known, `YYYY` otherwise. */
  readonly start: string;
  /** `null` when the period is ongoing. */
  readonly end: string | null;
  readonly current: boolean;
  /** Display form used by the design, e.g. `May 2026 — Jul 2026`. */
  readonly label: string;
}

/* -------------------------------------------------------------------------- */
/* Profile                                                                    */
/* -------------------------------------------------------------------------- */

export interface Location {
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly countryCode: string;
  readonly timezone: string;
  /** Short label shown next to the local clock, e.g. `WIB / UTC+7`. */
  readonly timezoneLabel: string;
  readonly coordinates: { readonly lat: number; readonly lng: number };
}

export interface Availability {
  readonly open: boolean;
  /** One line, no blinking badge clichés. */
  readonly label: string;
  readonly kinds: readonly string[];
}

export interface LanguageSkill {
  readonly language: string;
  readonly level: string;
  readonly note?: string;
}

/**
 * A number that is allowed to appear in the hero odometer or in metadata.
 * Only verified values belong here.
 */
export interface ProfileMetric {
  readonly id: string;
  readonly value: number;
  readonly decimals?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label: string;
  readonly context?: string;
  /** Recommended for the hero odometer. Only 2–3 metrics should carry this. */
  readonly hero?: boolean;
  readonly sourceIds: readonly SourceId[];
  readonly verified: boolean;
}

export interface Profile {
  readonly name: string;
  readonly preferredName: string;
  readonly handle: string;
  /** Positioning line used in metadata and the top bar. */
  readonly role: string;
  /** Shorter variant for tight spaces. */
  readonly roleShort: string;
  /** Hero headline, split into lines by the UI. */
  readonly headline: readonly string[];
  /** One sentence for the hero sub-line. */
  readonly oneLiner: string;
  /** About section prose, 2–3 short paragraphs. */
  readonly about: readonly string[];
  readonly location: Location;
  readonly availability: Availability;
  readonly languages: readonly LanguageSkill[];
  readonly email: string;
  readonly metrics: readonly ProfileMetric[];
  readonly sources: readonly SourceId[];
}

/* -------------------------------------------------------------------------- */
/* Links                                                                      */
/* -------------------------------------------------------------------------- */

export type LinkIcon =
  | "linkedin"
  | "github"
  | "huggingface"
  | "mail"
  | "pypi"
  | "document";

export interface ExternalLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly handle?: string;
  readonly icon: LinkIcon;
  readonly primary: boolean;
  /** Shown under the link in the contact list. */
  readonly description?: string;
  readonly sources: readonly SourceId[];
}

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export interface Service {
  /** Zero-padded index used by the editorial numbering, e.g. `01`. */
  readonly index: string;
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  /** Project slugs or experience ids that prove this service. Empty is not allowed. */
  readonly proof: readonly string[];
  readonly sources: readonly SourceId[];
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

export type ProjectCategory = "ai-ml" | "web" | "data" | "research";

export type ProjectImageStatus =
  | "available"
  | "needs-capture"
  | "generated"
  | "missing";

export interface ProjectImage {
  readonly status: ProjectImageStatus;
  /** Path inside `public/` when already prepared by T8. */
  readonly path?: string;
  /** Where the real asset comes from. Never a stock photo or a mockup. */
  readonly source:
    | { readonly kind: "url"; readonly value: string }
    | { readonly kind: "repo"; readonly value: string }
    | { readonly kind: "live-capture"; readonly value: string }
    | { readonly kind: "owner-supplied"; readonly value: string }
    | { readonly kind: "none" };
  readonly alt: string;
  /** Ratio the layout should reserve, e.g. `16/10`. */
  readonly aspect: string;
  readonly note?: string;
}

export interface ProjectLinks {
  readonly live?: string;
  readonly repo?: string;
  readonly hfModel?: string;
  readonly hfSpace?: string;
  readonly pypi?: string;
  readonly docs?: string;
  readonly publication?: string;
}

/** Extra images beyond the card image, keyed for T8's asset pipeline. */
export interface ProjectAsset extends ProjectImage {
  readonly id: string;
  readonly label: string;
}

export interface Project {
  readonly slug: string;
  /** Display index, `01`–`06`. */
  readonly index: string;
  readonly title: string;
  readonly year: string;
  readonly period?: string;
  readonly category: ProjectCategory;
  readonly categoryLabel: string;
  readonly role: string;
  readonly team?: string;
  /** One sentence. Used in the gallery card. */
  readonly summary: string;
  /** Optional second paragraph for `/work`. */
  readonly description?: string;
  readonly stack: readonly string[];
  readonly links: ProjectLinks;
  readonly image: ProjectImage;
  /** Additional real assets needed by the work and case-study layouts. */
  readonly assets?: readonly ProjectAsset[];
  /** Shown in Selected Work on the homepage. */
  readonly selected: boolean;
  /** Higher priority: gets a case study and more space. */
  readonly featured: boolean;
  readonly highlights: readonly string[];
  /** Slug of a case study in `content/case-studies/`. */
  readonly caseStudy?: string;
  readonly sources: readonly SourceId[];
  readonly verification: Verification;
}

/* -------------------------------------------------------------------------- */
/* Case studies                                                               */
/* -------------------------------------------------------------------------- */

export interface CaseStudyMetric {
  readonly id: string;
  readonly label: string;
  readonly definition: string;
  /** Baseline value, in `unit`. */
  readonly before: number;
  /** Fine-tuned value, in `unit`. */
  readonly after: number;
  readonly unit: "%" | "";
  readonly decimals: number;
  readonly lowerIsBetter: boolean;
  /** Relative error reduction, rounded as reported by the source. */
  readonly deltaPercent: number;
  readonly note?: string;
}

export interface CaseStudyDataset {
  readonly id: string;
  readonly label: string;
  readonly count?: number;
  readonly countLabel?: string;
  readonly description: string;
  readonly note?: string;
}

export interface CaseStudyStep {
  readonly index: string;
  readonly title: string;
  readonly body: string;
}

export interface CaseStudyFigure {
  readonly id: string;
  readonly alt: string;
  readonly status: "available" | "needs-capture" | "generated" | "missing";
  readonly source:
    | { readonly kind: "url"; readonly value: string }
    | { readonly kind: "owner-supplied"; readonly value: string }
    | { readonly kind: "none" };
  readonly caption: string;
  readonly aspect: string;
}

/** Renderable blocks. T8 maps each `kind` to its own layout. */
export type CaseStudyBlock =
  | {
      readonly kind: "prose";
      readonly id: string;
      readonly label?: string;
      readonly heading?: string;
      readonly paragraphs: readonly string[];
    }
  | {
      readonly kind: "facts";
      readonly id: string;
      readonly label: string;
      readonly items: readonly { readonly term: string; readonly value: string }[];
    }
  | {
      readonly kind: "datasets";
      readonly id: string;
      readonly label: string;
      readonly heading: string;
      readonly intro?: string;
      readonly items: readonly CaseStudyDataset[];
    }
  | {
      readonly kind: "steps";
      readonly id: string;
      readonly label: string;
      readonly heading: string;
      readonly steps: readonly CaseStudyStep[];
    }
  | {
      readonly kind: "metrics";
      readonly id: string;
      readonly label: string;
      readonly heading: string;
      readonly intro?: string;
      readonly metrics: readonly CaseStudyMetric[];
    }
  | {
      readonly kind: "list";
      readonly id: string;
      readonly label: string;
      readonly heading: string;
      readonly items: readonly string[];
    };

export interface CaseStudy {
  readonly slug: string;
  readonly projectSlug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly year: string;
  readonly role: string;
  readonly readingTime: string;
  readonly summary: string;
  readonly headlineMetric: {
    readonly value: number;
    readonly decimals: number;
    readonly suffix: string;
    readonly label: string;
    readonly context: string;
  };
  readonly blocks: readonly CaseStudyBlock[];
  readonly lessons: readonly string[];
  readonly limitations: readonly string[];
  readonly links: ProjectLinks;
  readonly figures: readonly CaseStudyFigure[];
  readonly sources: readonly SourceId[];
  readonly verification: Verification;
}

/* -------------------------------------------------------------------------- */
/* Experience, education, certifications                                      */
/* -------------------------------------------------------------------------- */

export type ExperienceType =
  | "internship"
  | "part-time"
  | "scholarship"
  | "award"
  | "freelance";

export interface ExperienceEntry {
  readonly index: string;
  readonly id: string;
  readonly role: string;
  readonly organisation: string;
  readonly organisationNote?: string;
  readonly type: ExperienceType;
  readonly typeLabel: string;
  readonly location: string;
  readonly arrangement: "on-site" | "remote";
  readonly period: Period;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly tags: readonly string[];
  readonly link?: string;
  readonly sources: readonly SourceId[];
  readonly verification: Verification;
}

export interface EducationEntry {
  readonly index: string;
  readonly id: string;
  readonly institution: string;
  readonly institutionShort: string;
  readonly degree: string;
  readonly field: string;
  readonly location: string;
  readonly period: Period;
  readonly grade?: { readonly label: string; readonly value: string };
  readonly thesis?: string;
  readonly notes: readonly string[];
  readonly sources: readonly SourceId[];
  readonly verification: Verification;
}

export type CredentialKind = "certification" | "award" | "publication";

export interface Credential {
  readonly index: string;
  readonly id: string;
  readonly kind: CredentialKind;
  readonly title: string;
  readonly issuer: string;
  /** `YYYY-MM` for sorting and formatting. */
  readonly date: string;
  readonly displayDate: string;
  readonly level?: string;
  readonly validUntil?: string;
  readonly credentialId?: string;
  readonly url?: string;
  readonly summary?: string;
  readonly skills?: readonly string[];
  readonly sources: readonly SourceId[];
  readonly verification: Verification;
}

/* -------------------------------------------------------------------------- */
/* Stack                                                                      */
/* -------------------------------------------------------------------------- */

export type StackCategory =
  | "ml"
  | "data"
  | "web"
  | "deployment"
  | "tools";

export interface StackCategoryMeta {
  readonly id: StackCategory;
  readonly index: string;
  readonly label: string;
}

export interface StackItem {
  readonly id: string;
  readonly name: string;
  /** Slug for `simple-icons` (`simple-icons/icons/<slug>.svg`). */
  readonly slug: string;
  /** Shown in the main Tools strip. Others belong to the full index. */
  readonly primary: boolean;
  readonly category: StackCategory;
  /** Where the skill is evidenced: a project slug, a role id, or a source id. */
  readonly evidence: readonly string[];
  readonly note?: string;
}

/* -------------------------------------------------------------------------- */
/* UI copy                                                                    */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly index: string;
}

export interface ContactCopy {
  readonly label: string;
  readonly heading: readonly string[];
  readonly body: string;
  readonly emailLabel: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
  readonly responseNote: string;
  readonly socialHeading: string;
  readonly form: {
    readonly heading: string;
    readonly name: string;
    readonly namePlaceholder: string;
    readonly email: string;
    readonly emailPlaceholder: string;
    readonly subject: string;
    readonly subjectPlaceholder: string;
    readonly message: string;
    readonly messagePlaceholder: string;
    readonly submit: string;
    readonly submitting: string;
    readonly success: string;
    readonly error: string;
    readonly fallback: string;
    readonly requiredHint: string;
    readonly privacy: string;
  };
}

export interface SiteCopy {
  readonly meta: {
    readonly title: string;
    readonly titleTemplate: string;
    readonly description: string;
    readonly keywords: readonly string[];
  };
  readonly nav: {
    readonly items: readonly NavItem[];
    readonly menuOpen: string;
    readonly menuClose: string;
    readonly skipToContent: string;
    readonly externalLink: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly intro: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly scrollCue: string;
    readonly portraitAlt: string;
    readonly statsLabel: string;
  };
  readonly about: {
    readonly label: string;
    readonly heading: readonly string[];
    readonly closing: string;
    readonly nowLabel: string;
    readonly now: readonly string[];
  };
  readonly services: {
    readonly label: string;
    readonly heading: readonly string[];
    readonly intro: string;
    readonly proofLabel: string;
  };
  readonly tools: {
    readonly label: string;
    readonly heading: readonly string[];
    readonly intro: string;
    readonly footnote: string;
  };
  readonly work: {
    readonly label: string;
    readonly heading: readonly string[];
    readonly intro: string;
    readonly counterSeparator: string;
    readonly caseStudyCta: string;
    readonly viewAll: string;
    readonly indexHeading: readonly string[];
    readonly indexIntro: string;
    readonly backToWork: string;
    readonly nextProject: string;
    readonly prevProject: string;
    readonly roleLabel: string;
    readonly yearLabel: string;
    readonly stackLabel: string;
    readonly linksLabel: string;
    readonly liveLabel: string;
    readonly repoLabel: string;
    readonly modelLabel: string;
    readonly demoLabel: string;
    readonly packageLabel: string;
    readonly docsLabel: string;
    readonly paperLabel: string;
    readonly caseStudyLabel: string;
    readonly comingSoon: string;
  };
  readonly caseStudy: {
    readonly backLabel: string;
    readonly metaRole: string;
    readonly metaYear: string;
    readonly metaReadingTime: string;
    readonly lessonsLabel: string;
    readonly limitationsLabel: string;
    readonly sourcesLabel: string;
    readonly headlineLabel: string;
  };
  readonly experience: {
    readonly label: string;
    readonly heading: readonly string[];
    readonly currentLabel: string;
    readonly educationLabel: string;
    readonly educationHeading: readonly string[];
    readonly certificationsLabel: string;
    readonly certificationsHeading: readonly string[];
    readonly credentialLabel: string;
    readonly verifiedLabel: string;
    readonly unverifiedLabel: string;
    readonly thesisLabel: string;
  };
  readonly contact: ContactCopy;
  readonly footer: {
    readonly tagline: string;
    readonly signatureLabel: string;
    readonly backToTop: string;
    readonly builtNote: string;
    readonly rights: string;
    readonly colophon: string;
  };
  readonly common: {
    readonly loading: string;
    readonly error: string;
    readonly notFoundTitle: string;
    readonly notFoundBody: string;
    readonly notFoundCta: string;
  };
  readonly status: "draft" | "final";
}
