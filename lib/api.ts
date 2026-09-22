import type { Mode } from "@/hooks/useLocationSearch";

const COUNTRIES_API = "https://countries.dev";

export function buildUrl(query: string, mode: Mode, country = "US") {
  const encodedQuery = encodeURIComponent(query.trim());

  if (mode === "country") {
    return `${COUNTRIES_API}/name/${encodedQuery}`;
  }

  const params = new URLSearchParams({
    q: query.trim(),
    country: country.toUpperCase(),
    limit: "20",
  });
  return `${COUNTRIES_API}/cities?${params.toString()}`;
}