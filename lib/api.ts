import type { Mode } from "@/hooks/useLocationSearch";

const COUNTRIES_API = "https://countries.dev";

export function buildUrl(query: string, mode: Mode, country = "US") {
  const encodedQuery = encodeURIComponent(query.trim());

  if (mode === "country") {
    return `${COUNTRIES_API}/name/${encodedQuery}`;
  }

  return `${COUNTRIES_API}/postal/${encodeURIComponent(country.toUpperCase())}/${encodedQuery}`;
}