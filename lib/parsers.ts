import type { Mode, LocationResult } from "@/hooks/useLocationSearch";

type CountryDevResult = {
  name?: string;
  region?: string;
  alpha2Code?: string;
  flags?: { svg?: string };
};

type CityApiResult = {
  geonameId?: number;
  name?: string;
  asciiName?: string;
  countryCode?: string;
  admin1Code?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  timezone?: string;
  featureCode?: string;
};

export function parseResults(data: unknown, mode: Mode): LocationResult[] {
  if (mode === "country") {
    if (!Array.isArray(data)) return [];

    return (data as CountryDevResult[])
      .filter((country) => country.name)
      .map((country) => ({
        label: country.name ?? "Unknown country",
        sublabel: country.region || "Country",
        flag: country.flags?.svg,
        countryCode: country.alpha2Code?.toUpperCase(),
      }));
  }

  if (!Array.isArray(data)) return [];

  return (data as CityApiResult[])
    .filter((city) => city.name)
    .map((city) => ({
      label: city.name ?? "Unknown city",
      sublabel: city.countryCode || "City",
      countryCode: city.countryCode,
      coordinates:
        city.latitude !== undefined && city.longitude !== undefined
          ? `${city.latitude}, ${city.longitude}`
          : undefined,
      geonameId: city.geonameId,
      population: city.population,
      timezone: city.timezone,
      featureCode: city.featureCode,
    }));
}