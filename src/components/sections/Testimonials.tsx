import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// PLACEHOLDER testimonials — replace with real client quotes when available.
const items = [
  {
    quote:
      "Shaffedits redefined how our brand shows up online. The creative was sharp, the strategy was thoughtful, and the results spoke for themselves.",
    name: "Priya S.",
    role: "Founder, Cloud Apparels",
  },
  {
    quote:
      "From the first call, they felt like an extension of our team. Every deliverable was on brand and on business.",
    name: "Rahul M.",
    role: "Marketing Lead, Lspace",
  },
  {
    quote:
      "They took our messy vision and shipped a brand system we could actually scale. The content engine they built keeps paying off.",
    name: "Ayesha K.",
    role: "CEO, Purple Curve",
  },
  {
    quote:
      "Editorial quality creative with performance marketing rigor — rare combo. Our CAC dropped and our brand equity grew.",
    name: "Daniel T.",
    role: "Growth Director, Untangle",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % items.length);
  const prev = () => setI((v) => (v - 1 + items.length) % items.length);
  const t = items[i];

  return (
    <section className="bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
          Client Reviews / 06
        </p>
        <Quote className="mx-auto mb-8 h-10 w-10 text-white/30" strokeWidth={1.5} />
        <div className="relative min-h-55">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl"
            >
              "{t.quote}"
              <footer className="mt-10 text-sm font-normal not-italic text-white/60">
                <span className="font-semibold text-white">{t.name}</span> · {t.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to review ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={next}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
