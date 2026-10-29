"use client";

import * as React from "react";

/**
 * Loader readiness registry — the only contract other terminals need.
 *
 * A terminal that loads something the first screen depends on (font file,
 * hero texture, compiled shader) registers a task and marks it ready:
 *
 * ```ts
 * import { registerReadyTask, markReady } from "@/lib/loader/ready";
 *
 * useEffect(() => {
 *   const cancel = registerReadyTask("hero-texture", { weight: 2 });
 *   texture.load().then(() => markReady("hero-texture"));
 *   return cancel;
 * }, []);
 * ```
 *
 * Rules
 * - `registerReadyTask` returns an unregister function. Unregistering a
 *   pending task removes its weight so an abandoned task cannot stall 100%.
 * - `markReady` also registers an unknown name (weight 1) — safe to call even
 *   if registration raced ahead.
 * - Progress is weighted: done weight / total weight, 0-100, rounded down and
 *   monotonic within a task set.
 * - No task registered → 100 (nothing to wait for).
 *
 * The Loader itself registers `fonts` and `document` as built-ins; the hard
 * 4 s cap is the Loader's job, not the registry's.
 */

type Task = { weight: number; done: boolean };

type Snapshot = { tasks: Map<string, Task>; version: number };

const state: Snapshot = { tasks: new Map(), version: 0 };
const listeners = new Set<() => void>();

function emit(): void {
  state.version += 1;
  listeners.forEach((listener) => listener());
}

export type RegisterOptions = {
  /** Relative importance. Defaults to 1. */
  weight?: number;
};

export function registerReadyTask(
  name: string,
  options: RegisterOptions = {}
): () => void {
  if (!name) throw new Error("registerReadyTask needs a name");
  const weight = Number.isFinite(options.weight)
    ? Math.max(0.01, options.weight as number)
    : 1;
  const existing = state.tasks.get(name);
  if (!existing) {
    state.tasks.set(name, { weight, done: false });
    emit();
  }
  return () => {
    const task = state.tasks.get(name);
    if (!task || task.done) return;
    state.tasks.delete(name);
    emit();
  };
}

export function markReady(name: string): void {
  if (!name) return;
  const task = state.tasks.get(name);
  if (!task) {
    state.tasks.set(name, { weight: 1, done: true });
    emit();
    return;
  }
  if (task.done) return;
  task.done = true;
  emit();
}

/** Progress 0-100, weighted. */
export function getAppProgress(): number {
  let total = 0;
  let done = 0;
  state.tasks.forEach((task) => {
    total += task.weight;
    if (task.done) done += task.weight;
  });
  if (total <= 0) return 100;
  return Math.min(100, Math.floor((done / total) * 100));
}

export function getReadyTaskNames(): string[] {
  return Array.from(state.tasks.keys());
}

export function subscribeReady(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Dev/test helper: clear all tasks. Not used by the app. */
export function resetReadyTasks(): void {
  if (state.tasks.size === 0) return;
  state.tasks.clear();
  emit();
}

/** React binding for the loader counter. Server snapshot is 0. */
export function useAppProgress(): number {
  return React.useSyncExternalStore(
    subscribeReady,
    getAppProgress,
    () => 0
  );
}
