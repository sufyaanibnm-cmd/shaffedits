import { motion } from "motion/react";
import { SpotlightCard } from "../ui/SpotlightCard";

// PLACEHOLDER: real headshots to replace initials avatars later.
const team = [
  { name: "Mohammed Shafeeq", role: "Founder & Creative Director", bio: "Leads the agency's creative vision, brand strategy, client relationships, and campaign direction while ensuring every project creates meaningful business impact." },
  { name: "Ayesha Saiyed", role: "Content Writer", bio: "Transforms ideas into compelling stories, campaigns, and copy that connect brands with their audience." },
  { name: "Amal Kader", role: "Social Media Strategist", bio: "Develops strategic content plans and digital growth frameworks that strengthen brand presence across platforms." },
  { name: "Zeena Qaida", role: "Graphic Designer", bio: "Creates thoughtful visual identities and creative assets that blend aesthetics with strategy." },
  { name: "Mohammed", role: "Web Developer", bio: "Builds fast, scalable, and user-focused websites designed for performance and long-term growth." },
  { name: "Rukshanda", role: "Video Editor", bio: "Shapes engaging visual stories through editing, pacing, motion, and cinematic storytelling." },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export function Team() {
  return (
    <section id="team" className="bg-black px-6 py-28 text-white md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
            Our Team / 04
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight">
            The people behind the <span className="italic font-light text-white/60">work</span>.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <SpotlightCard tone="dark" className="h-full">
                <div className="flex flex-col items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 font-display text-xl font-bold">
                    {initials(t.name)}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-white/50">{t.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{t.bio}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
