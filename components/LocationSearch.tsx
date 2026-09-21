"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ResultsList } from "./ResultsList";
import { SearchInput } from "./SearchInput";
import { useLocationSearch, type LocationResult, type Mode } from "../hooks/useLocationSearch";

const modes: Array<{ value: Mode; label: string }> = [
  { value: "country", label: "Country" },
  { value: "postal", label: "Postal code" },
];

export default function LocationSearch() {
  const [mode, setMode] = useState<Mode>("country");
  const [query, setQuery] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [countryLabel, setCountryLabel] = useState("United States");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selection, setSelection] = useState<LocationResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, status, errorMessage } = useLocationSearch(query, mode, countryCode);

  const visibleHighlightedIndex = results.length && highlightedIndex < 0 ? 0 : highlightedIndex;

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setQuery("");
    setSelection(null);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  function selectResult(result: LocationResult) {
    setSelection(result);
    setQuery("");
    setHighlightedIndex(-1);
    if (mode === "country" && result.countryCode) {
      setCountryCode(result.countryCode);
      setCountryLabel(result.label);
      setMode("postal");
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) => results.length ? (index + 1) % results.length : -1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => results.length ? (index - 1 + results.length) % results.length : -1);
    }
    if (event.key === "Enter" && visibleHighlightedIndex >= 0) {
      event.preventDefault();
      selectResult(results[visibleHighlightedIndex]);
    }
    if (event.key === "Escape") {
      setQuery("");
      setHighlightedIndex(-1);
    }
  }

  return (
    <section className="rounded-2xl border border-line/90 bg-white/80 p-8 shadow-card" aria-label="Location finder">
      <div className="flex items-start justify-between">
        <h2 className="m-0 text-3xl leading-[.98] tracking-[-.055em] text-ink md:text-4xl">
          Where are you located?
        </h2>

        <span className="mt-2.5 h-3 w-3 rounded-full bg-lime shadow-status-ring" aria-hidden="true" />
      </div>

      <p className="mb-8 mt-4 text-xs leading-normal text-muted">
        Confirm your address to discover what is available near you.
      </p>

      <div className="mb-4 flex gap-1.5 overflow-x-auto" role="tablist" aria-label="Search mode">
        {modes.map((item) => (
          <button
            aria-selected={mode === item.value}
            className={mode === item.value ? "shrink-0 rounded-full border-0 bg-ink px-3.5 py-2 text-xs text-white" : "shrink-0 rounded-full border-0 bg-surface-muted px-3.5 py-2 text-xs text-text-soft"}
            key={item.value}
            onClick={() => changeMode(item.value)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <SearchInput
          countryLabel={countryLabel}
          mode={mode}
          onChange={(value) => { setQuery(value); setSelection(null); }}
          onClearCountry={() => { setCountryCode("US"); setCountryLabel("United States"); }}
          onKeyDown={handleKeyDown}
          value={query}
        />

        <ResultsList
          errorMessage={errorMessage}
          highlightedIndex={visibleHighlightedIndex}
          onHover={setHighlightedIndex}
          onSelect={selectResult}
          query={query}
          results={results}
          status={status}
        />
      </div>

      {selection ? (
        <div className="mt-5 flex items-center gap-3 rounded-[10px] bg-selection-background p-3.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-selection-icon-background text-xl text-selection-icon-foreground" aria-hidden="true">
            ⌖
          </span>

          <div className="grid min-w-0 flex-1 gap-1">
            <small className="text-[0.625rem] uppercase tracking-[.08em] text-selection-label">
              Selected location
            </small>

            <strong className="text-xs text-ink">
              {selection.label}
            </strong>

            <span className="text-[0.625rem] text-selection-value">
              {selection.sublabel || selection.postalCode || countryLabel}
            </span>
          </div>

          <button
            className="border-0 bg-transparent text-xl text-selection-close"
            aria-label="Clear selected location"
            onClick={() => setSelection(null)}
            type="button"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          className="mt-6 grid min-h-48 place-items-center gap-2 rounded-[14px] bg-surface-panel text-xs tracking-[.04em] text-text-panel"
          aria-label="Illustration placeholder"
          role="img"
        >
          <span className="grid h-18 w-18 rotate-[-14deg] place-items-center rounded-[46%_54%_44%_56%] bg-lime-soft text-5xl text-lime-dark" aria-hidden="true">
            ⌖
          </span>

          <span>Illustration placeholder</span>
        </div>
      )}
    </section>
  );
}