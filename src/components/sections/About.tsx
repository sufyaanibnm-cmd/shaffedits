import { motion } from "motion/react";
import { GlowButton } from "../ui/GlowButton";

export function About() {
  return (
    <section id="about" className="bg-white px-6 py-28 text-black md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5"
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-black/50">
            About / 01
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight">
            Creativity with purpose. <span className="italic font-light text-black/50">Strategy</span> behind every pixel.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="md:col-span-7"
        >
          <p className="text-lg leading-relaxed text-black/75 md:text-xl">
            At Shaffedits, creativity is communication. We are a multidisciplinary
            creative agency bringing together branding, content, design, digital
            marketing, filmmaking, and web experiences under one creative roof.
          </p>
          <p className="mt-6 leading-relaxed text-black/60">
            Every project we do begins with understanding your business, your
            audience, and your ambitions before we build solutions that are visually
            compelling and commercially effective. Whether you are launching a new
            venture, refreshing an established brand, or scaling your digital presence,
            we become an extension of your team to create work that delivers
            measurable impact.
          </p>
          <div className="mt-10">
            <GlowButton as="a" href="#contact" tone="onLight">
              Let's Build Your Brand
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
