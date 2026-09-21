import type { Mode, LocationResult } from "@/hooks/useLocationSearch";

type CountryDevResult = {
  name?: string;
  region?: string;
  alpha2Code?: string;
  flags?: { svg?: string };
};

type PostalApiResult = {
  countryCode?: string;
  postalCode?: string;
  placeName?: string;
  admin1?: { name?: string; code?: string };
  admin2?: { name?: string; code?: string };
  latitude?: number;
  longitude?: number;
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

  return (data as PostalApiResult[]).map((place) => ({
    label: place.placeName ?? "Unknown place",
    sublabel: [place.admin1?.name, place.admin2?.name].filter(Boolean).join(" · "),
    postalCode: place.postalCode,
    coordinates:
      place.latitude !== undefined && place.longitude !== undefined
        ? `${place.latitude}, ${place.longitude}`
        : undefined,
  }));
}