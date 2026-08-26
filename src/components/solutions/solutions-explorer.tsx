"use client";

import {
  Camera,
  Check,
  Flame,
  Network,
  ScanFace,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useSyncExternalStore } from "react";

type SolutionItem = {
  anchor: string;
  title: string;
  description: string;
  items: readonly string[];
};

type SolutionsExplorerProps = {
  solutions: readonly SolutionItem[];
  scopeLabel: string;
};

const solutionIcons: Record<string, LucideIcon> = {
  "fire-safety": Flame,
  "video-surveillance": Camera,
  "access-control": ScanFace,
  electrical: Zap,
  hvac: Wind,
  networking: Network,
};

function subscribeToHashChange(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);

  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getHashSnapshot() {
  return window.location.hash.replace(/^#/, "");
}

function getServerHashSnapshot() {
  return "";
}

export function SolutionsExplorer({
  solutions,
  scopeLabel,
}: SolutionsExplorerProps) {
  const currentHash = useSyncExternalStore(
    subscribeToHashChange,
    getHashSnapshot,
    getServerHashSnapshot,
  );

  const hashMatchesSolution = solutions.some(
    (solution) => solution.anchor === currentHash,
  );

  const activeAnchor = hashMatchesSolution
    ? currentHash
    : (solutions[0]?.anchor ?? "");

  const activeSolution =
    solutions.find(
      (solution) => solution.anchor === activeAnchor,
    ) ?? solutions[0];

  if (!activeSolution) {
    return null;
  }

  const ActiveIcon =
    solutionIcons[activeSolution.anchor] ?? Network;

  function selectSolution(anchor: string) {
    if (anchor === activeAnchor) {
      return;
    }

    const nextUrl = new URL(window.location.href);
    nextUrl.hash = anchor;

    window.history.replaceState(
      null,
      "",
      `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`,
    );

    window.dispatchEvent(new Event("hashchange"));
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8">
      <div className="lg:sticky lg:top-36">
        <div className="hidden overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm lg:block">
          {solutions.map((solution) => {
            const Icon =
              solutionIcons[solution.anchor] ?? Network;

            const isActive =
              solution.anchor === activeSolution.anchor;

            return (
              <button
                key={solution.anchor}
                id={solution.anchor}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  selectSolution(solution.anchor)
                }
                className={`group relative flex w-full items-center gap-4 border-b border-neutral-200 px-5 py-[1.15rem] text-left transition last:border-b-0 ${
                  isActive
                    ? "bg-neutral-950 text-white"
                    : "bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-1 transition ${
                    isActive
                      ? "bg-emerald-500"
                      : "bg-transparent"
                  }`}
                />

                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-neutral-100 text-neutral-500 group-hover:bg-white"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-[18px]"
                    strokeWidth={1.5}
                  />
                </span>

                <span className="text-sm font-semibold leading-6">
                  {solution.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:hidden">
          <label
            htmlFor="solution-selector"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500"
          >
            {scopeLabel}
          </label>

          <select
            id="solution-selector"
            value={activeSolution.anchor}
            onChange={(event) =>
              selectSolution(event.target.value)
            }
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-950 outline-none focus:border-emerald-700"
          >
            {solutions.map((solution) => (
              <option
                key={solution.anchor}
                value={solution.anchor}
              >
                {solution.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)]">
        <div className="relative overflow-hidden bg-neutral-950 px-6 py-9 text-white md:px-10 md:py-11 lg:px-12">
          <ActiveIcon
            aria-hidden="true"
            className="pointer-events-none absolute -right-7 top-1/2 size-52 -translate-y-1/2 text-white/[0.035]"
            strokeWidth={1}
          />

          <div className="relative z-10">
            <div className="flex size-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <ActiveIcon
                aria-hidden="true"
                className="size-6"
                strokeWidth={1.5}
              />
            </div>

            <h2 className="mt-7 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-4xl">
              {activeSolution.title}
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              {activeSolution.description}
            </p>
          </div>
        </div>

        <div className="px-6 py-7 md:px-10 md:py-9 lg:px-12">
          <p className="pb-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            {scopeLabel}
          </p>

          <div className="grid border-t border-neutral-300 sm:grid-cols-2">
            {activeSolution.items.map((item) => (
              <div
                key={item}
                className="flex min-h-[78px] items-start gap-3 border-b border-neutral-200 py-5 pr-5 sm:odd:border-r sm:even:pl-5"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-emerald-700 text-emerald-700">
                  <Check
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={2}
                  />
                </span>

                <span className="text-sm font-medium leading-6 text-neutral-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}