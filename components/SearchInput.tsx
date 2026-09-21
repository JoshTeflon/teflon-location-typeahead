"use client";

import type { KeyboardEvent } from "react";
import type { Mode } from "../hooks/useLocationSearch";

type SearchInputProps = {
  mode: Mode;
  value: string;
  countryLabel?: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClearCountry: () => void;
};

const modeLabels: Record<Mode, string> = {
  country: "Country",
  city: "City",
  postal: "Postal code",
};

export function SearchInput({
  mode,
  value,
  countryLabel,
  onChange,
  onKeyDown,
  onClearCountry,
}: SearchInputProps) {
  return (
    <div className="flex min-h-14 items-center gap-2.5 rounded-[10px] border border-line bg-surface-soft px-4 shadow-input">
      <span className="-rotate-20 text-[26px] leading-none text-icon-muted" aria-hidden="true">
        ⌕
      </span>

      <input
        aria-label={`Search by ${modeLabels[mode].toLowerCase()}`}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={mode === "country" ? "Search countries" : `Search ${modeLabels[mode].toLowerCase()}`}
        type="search"
        value={value}
        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-0 placeholder:text-placeholder"
      />

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