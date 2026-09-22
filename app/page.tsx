import LocationSearch from "@/components/LocationSearch";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-24">
      <div className="absolute left-4 top-8 z-1 text-xs font-extrabold tracking-[.12em] text-ink">
        TEFLON <span className="font-medium text-accent">LOCATION</span>
      </div>

      <div className="relative z-1 mx-auto w-full max-w-230">
        <header className="mb-10 gap-10">
          <h1 className="m-0 text-[clamp(48px,8vw,92px)] leading-[.88] tracking-[-.07em] text-ink md:text-[clamp(52px,16vw,76px)]">
            Find your place.
          </h1>

          <p className="mt-4 mb-1 text-sm leading-[1.55] text-muted">
            Start with your country, then find a city to explore what makes it yours.
          </p>
        </header>

        <LocationSearch />
      </div>

      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-center tracking-[.03em] text-text-subtle">
        A clear starting point for your local experience.
      </p>
    </main>
  );
}
