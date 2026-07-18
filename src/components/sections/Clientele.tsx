// PLACEHOLDER: Replace with real client logos.
const clients = [
  "CLOUD", "LSPACE", "PURPLE CURVE", "UNTANGLE", "CRICKETERIA",
  "NORTHWIND", "AURORA", "FIELD & CO", "MONO", "OKTAVA", "PARALLEL",
];

export function Clientele() {
  const loop = [...clients, ...clients];
  return (
    <section className="border-y border-black/10 bg-white py-24 text-black">
      <div className="mx-auto mb-14 max-w-4xl px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-black/50">
          Clientele / 05
        </p>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-none tracking-tight">
          Brands that trust <span className="italic font-light text-black/50">Shaffedits</span>.
        </h2>
      </div>
      <div
        className="marquee-paused overflow-hidden"
        style={{ ["--marquee-duration" as string]: "35s" }}
      >
        <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap px-8">
          {loop.map((c, i) => (
            <span
              key={i}
              className="font-display text-2xl font-black tracking-tight text-black/40 transition-colors hover:text-black md:text-4xl"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
