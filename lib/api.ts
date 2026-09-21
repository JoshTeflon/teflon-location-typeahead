import type { Mode } from "@/hooks/useLocationSearch";

const COUNTRY_API = "https://restcountries.com/v3.1/name";
const ZIPPOPOTAM_API = "https://api.zippopotam.us";

export function buildUrl(query: string, mode: Mode, country = "us") {
  const encodedQuery = encodeURIComponent(query.trim());

  if (mode === "country") {
    return `${COUNTRY_API}/${encodedQuery}`;
  }

  return `${ZIPPOPOTAM_API}/${encodeURIComponent(country)}/${encodedQuery}`;
}