const metrics = [
  "40+ Brands Trusted Us",
  "2M+ Cumulative Views Generated",
  "8+ Years Industry Experience",
  "7+ Countries Reached",
  "500+ Projects Delivered",
  "10,000+ Hours of Creative Work",
  "300+ Brand Videos Produced",
  "Countless Ideas Brought to Life",
];

const countries = [
  "United States", "Russia", "Germany", "UAE", "Qatar", "Singapore", "Malaysia", "India"
];

export function TrustMarquee() {
  const loop = [...metrics, ...metrics];
  return (
    <section className="border-y border-white/10 bg-black py-10 text-white">
      <div
        className="marquee-paused group relative overflow-hidden"
        style={{ ["--marquee-duration" as string]: "45s" }}
      >
        <div className="flex w-max animate-marquee gap-14 whitespace-nowrap px-8">
          {loop.map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-14 font-display text-2xl font-bold tracking-tight md:text-4xl"
            >
              {m}
              <span aria-hidden className="text-white/30">✱</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 px-6 text-center text-xs uppercase tracking-[0.35em] text-white/50 md:text-sm">
        <span className="text-white/80">Global Collaborations</span> —{" "}
        {countries.join(" · ")}
      </div>
    </section>
  );
}
