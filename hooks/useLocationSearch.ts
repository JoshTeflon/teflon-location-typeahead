"use client";

import { useEffect, useState } from "react";
import { buildUrl } from "@/lib/api";
import { parseResults } from "@/lib/parsers";

export type Mode = "country" | "city" | "postal";
export type Status = "idle" | "loading" | "success" | "error";

export type LocationResult = {
  label: string;
  sublabel?: string;
  flag?: string;
  countryCode?: string;
  postalCode?: string;
  coordinates?: string;
};

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocationSearch(
  query: string,
  mode: Mode,
  countryCode: string,
) {
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }

    const controller = new AbortController();
    let active = true;

    Promise.resolve()
      .then(() => {
        if (!active) return null;
        setStatus("loading");
        setErrorMessage("");
        return fetch(buildUrl(debouncedQuery, mode, countryCode), {
          signal: controller.signal,
        });
      })
      .then((response) => {
        if (!response) return null;
        if (!response.ok) throw new Error("The location service returned an error.");
        return response.json();
      })
      .then((data: unknown) => {
        if (data === null) return;
        if (!active) return;
        setResults(parseResults(data, mode));
        setStatus("success");
      })
      .catch((error: unknown) => {
        if (!active || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }
        setResults([]);
        setStatus("error");
        setErrorMessage("Something went wrong. Try again.");
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [countryCode, debouncedQuery, mode]);

  return { results, status, errorMessage };
}