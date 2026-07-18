import { motion } from "motion/react";
import { GlowButton } from "../ui/GlowButton";
import { ArrowButton } from "../ui/ArrowButton";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black px-6 pb-24 pt-40 text-white"
    >
      {/* Subtle grain / vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_85%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-white/60"
        >
          Creative Marketing Agency
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] font-black leading-[0.95] tracking-tight"
        >
          We build brands<br />
          <span className="italic font-light text-white/70">people</span> remember.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9 }}
          className="mx-auto mt-8 max-w-2xl text-base text-white/70 md:text-lg"
        >
          Creative strategy. Exceptional storytelling. Content that performs.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.05 }}
          className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/55 md:text-base"
        >
          We are a creative marketing agency that helps ambitious brands grow through
          strategic storytelling, impactful visuals, digital experiences, and
          performance driven marketing. Every idea we create is built with one
          objective — making your brand impossible to ignore.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.25 }}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <GlowButton as="a" href="#contact" tone="onDark">Book a Call</GlowButton>
          <ArrowButton as="a" href="#work" tone="onDark" label="View Our Work" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-white/40"
      >
      </motion.div>
    </section>
  );
}
