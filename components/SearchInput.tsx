"use client";

import type { KeyboardEvent } from "react";
import type { Mode } from "../hooks/useLocationSearch";

type SearchInputProps = {
  mode: Mode;
  value: string;
  ghostText: string;
  activeDescendant?: string;
  countryLabel?: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClearCountry: () => void;
};

const modeLabels: Record<Mode, string> = {
  country: "Country",
  city: "City",
};

export function SearchInput({
  mode,
  value,
  ghostText,
  activeDescendant,
  countryLabel,
  onChange,
  onKeyDown,
  onClearCountry,
}: SearchInputProps) {
  const normalizedValue = value.trim().toLowerCase();
  const ghostSuffix = ghostText.toLowerCase().startsWith(normalizedValue)
    ? ghostText.slice(value.trim().length)
    : "";

  return (
    <div className="flex min-h-14 items-center gap-2.5 rounded-[10px] border border-line bg-surface-soft px-4 shadow-input">
      <span className="-rotate-20 text-[26px] leading-none text-icon-muted" aria-hidden="true">
        ⌕
      </span>

      <div className="relative flex h-5 min-w-0 flex-1 items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 overflow-hidden whitespace-pre font-sans text-sm font-normal leading-5 tracking-normal"
        >
          <span className="invisible">{value}</span><span className="text-ghost">{ghostSuffix}</span>
        </div>
        <input
          aria-activedescendant={activeDescendant}
          aria-autocomplete="both"
          aria-controls="location-search-results"
          aria-label={`Search by ${modeLabels[mode].toLowerCase()}`}
          autoComplete="off"
          className="relative z-10 h-5 w-full appearance-none border-0 bg-transparent p-0 font-sans text-sm font-normal leading-5 tracking-normal text-ink outline-0 placeholder:text-placeholder"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={mode === "country" ? "Search countries" : `Search cities in ${countryLabel}`}
          type="search"
          value={value}
        />
      </div>

      {countryLabel && mode !== "country" ? (
        <button
          className="max-w-28 overflow-hidden whitespace-nowrap rounded-full border-0 bg-context-background px-2 py-1.5 text-[0.625rem] text-context-foreground text-ellipsis"
          onClick={onClearCountry}
          type="button"
        >
          {countryLabel} <span className="pl-1 text-sm" aria-hidden="true">×</span>
        </button>
      ) : null}
    </div>
  );
}