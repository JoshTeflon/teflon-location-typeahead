import type { Mode, LocationResult } from "@/hooks/useLocationSearch";

type CountryApiResult = {
  name?: { common?: string };
  region?: string;
  cca2?: string;
  flags?: { svg?: string };
};

type ZippopotamResult = {
  country?: string;
  places?: Array<{
    "place name"?: string;
    state?: string;
    "state abbreviation"?: string;
    latitude?: string;
    longitude?: string;
  }>;
  "post code"?: string;
};

export function parseResults(data: unknown, mode: Mode): LocationResult[] {
  if (mode === "country") {
    if (!Array.isArray(data)) return [];

    return (data as CountryApiResult[])
      .filter((country) => country.name?.common)
      .map((country) => ({
        label: country.name?.common ?? "Unknown country",
        sublabel: country.region || "Country",
        flag: country.flags?.svg,
        countryCode: country.cca2?.toLowerCase(),
      }));
  }

  if (!data || typeof data !== "object") return [];

  const postalData = data as ZippopotamResult;
  const postalCode = postalData["post code"];
  return (postalData.places ?? []).map((place) => ({
    label: place["place name"] ?? "Unknown place",
    sublabel: [place.state, place["state abbreviation"]].filter(Boolean).join(" · "),
    postalCode,
    coordinates:
      place.latitude && place.longitude
        ? `${place.latitude}, ${place.longitude}`
        : undefined,
  }));
}