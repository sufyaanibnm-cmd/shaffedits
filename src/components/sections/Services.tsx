import { motion } from "motion/react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { ArrowButton } from "../ui/ArrowButton";
import {
  Palette, PenLine, Share2, Clapperboard, MonitorSmartphone, Target,
} from "lucide-react";


const services = [
  {
    icon: Target,
    title: "Meta Ads",
    desc: "Performance campaigns that turn creative into ROI.",
    cta: "Explore Campaigns",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Identities and systems that make brands unmistakable.",
    cta: "View Portfolio",
  },
  {
    icon: PenLine,
    title: "Content Creation",
    desc: "Story-first creative built to earn attention and action.",
    cta: "Explore Branding",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Content, community, and calendars that compound growth.",
    cta: "Watch Projects",
  },
  {
    icon: Clapperboard,
    title: "Videography & Photography",
    desc: "Cinematic capture and edits with commercial polish.",
    cta: "View Websites",
  },
  {
    icon: MonitorSmartphone,
    title: "Website Design & Development",
    desc: "Modern websites built for performance, user experience, and conversions.",
    cta: "View Websites",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
            What We Do / 02
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight">
            Six disciplines.<br /> One creative <span className="italic font-light text-white/60">engine</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 [&:hover>*:not(:hover)]:scale-[0.98] [&:hover>*:not(:hover)]:opacity-50 [&:hover>*:not(:hover)]:blur-[2px]">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <SpotlightCard tone="dark" className="h-full">
                <div className="flex h-full flex-col justify-between gap-10">
                   <s.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                  <div>
                    <span className="mb-6 block font-mono text-xs text-white/40">
                      0{i + 1} / 06
                    </span>
                    <h3 className="font-display text-3xl font-bold md:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
                      {s.desc}
                    </p>
                  </div>
                  <ArrowButton as="a" href="#work" tone="onDark" label={s.cta} />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
