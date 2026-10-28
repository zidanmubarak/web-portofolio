"use client";

import { useEffect, useState } from "react";
import { useChrome, useLocale } from "@/lib/i18n/provider";

const GITHUB_USER = "zidanmubarak";
const USER_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}`;
const REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`;

type GitHubUser = {
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  stargazers_count: number;
  forks_count: number;
};

type Stats = {
  repositories: number;
  stars: number;
  forks: number;
  followers: number;
};

type Status =
  | { kind: "loading" }
  | { kind: "ready"; stats: Stats }
  | { kind: "error" };

function isCount(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/**
 * Live GitHub slot (DESIGN.md §12). Values are fetched from the public GitHub
 * API in the browser; the component renders em dashes while loading and a
 * labelled error state with retry when the API cannot be reached. No count is
 * hardcoded anywhere in the source.
 */
export function GitHubStats() {
  const chrome = useChrome();
  const { locale } = useLocale();
  const [status, setStatus] = useState<Status>({ kind: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus({ kind: "loading" });

    const load = async () => {
      try {
        const headers = {
          Accept: "application/vnd.github+json",
        };
        const [userResponse, reposResponse] = await Promise.all([
          fetch(USER_ENDPOINT, { signal: controller.signal, headers }),
          fetch(REPOS_ENDPOINT, { signal: controller.signal, headers }),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub API responded with an error status");
        }

        const user = (await userResponse.json()) as Partial<GitHubUser>;
        const repos = (await reposResponse.json()) as Partial<GitHubRepo>[];

        if (
          !isCount(user.public_repos) ||
          !isCount(user.followers) ||
          !Array.isArray(repos)
        ) {
          throw new Error("GitHub API returned an unexpected payload");
        }

        const stars = repos.reduce(
          (total, repo) =>
            isCount(repo.stargazers_count)
              ? total + repo.stargazers_count
              : total,
          0,
        );
        const forks = repos.reduce(
          (total, repo) =>
            isCount(repo.forks_count) ? total + repo.forks_count : total,
          0,
        );

        setStatus({
          kind: "ready",
          stats: {
            repositories: user.public_repos,
            stars,
            forks,
            followers: user.followers,
          },
        });
      } catch {
        if (controller.signal.aborted) return;
        setStatus({ kind: "error" });
      }
    };

    load();
    return () => controller.abort();
  }, [attempt]);

  const numberFormat = new Intl.NumberFormat(
    locale === "id" ? "id-ID" : "en-US",
  );

  const fields: { key: keyof Stats; label: string }[] = [
    { key: "repositories", label: chrome.github.repositories },
    { key: "stars", label: chrome.github.stars },
    { key: "forks", label: chrome.github.forks },
    { key: "followers", label: chrome.github.followers },
  ];

  return (
    <section
      className="gh-live"
      data-widget="github-stats"
      aria-label={chrome.github.label}
    >
      <div className="gh-head">
        <p className="meta">{chrome.github.label}</p>
        <span className="gh-badge">{chrome.github.live}</span>
      </div>
      <dl className="gh-grid">
        {fields.map((field) => (
          <div key={field.key}>
            <dt>{field.label}</dt>
            <dd className="num">
              {status.kind === "ready"
                ? numberFormat.format(status.stats[field.key])
                : "—"}
            </dd>
          </div>
        ))}
      </dl>
      <p className="gh-note" role="status" aria-live="polite">
        {status.kind === "loading"
          ? chrome.github.loading
          : status.kind === "error"
            ? chrome.github.error
            : chrome.github.note}
      </p>
      {status.kind === "error" ? (
        <button
          type="button"
          className="gh-retry"
          onClick={() => setAttempt((value) => value + 1)}
        >
          {chrome.github.retry}
        </button>
      ) : null}
    </section>
  );
}
