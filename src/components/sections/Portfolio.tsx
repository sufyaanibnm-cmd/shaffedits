import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const projects = [
  {
    name: "Cloud Apparels",
    tag: "Brand + E-commerce",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=70",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=70",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=70",
    ],
  },
  {
    name: "Lspace",
    tag: "Brand Identity",
    images: [
      "/images/lspace1.jpg",
      "/images/lspace2.jpg",
      "/images/lspace3.jpg",
    ],
  },
  {
    name: "Purple Curve",
    tag: "Website Design",
    images: [
      "/images/purple1.jpg",
      "/images/purple2.jpg",
      "/images/purple3.jpg",
    ],
  },
  {
    name: "Untangle",
    tag: "Content + Social",
    images: [
      "/images/untangle1.jpg",
      "/images/untangle2.jpg",
      "/images/untangle3.jpg",
    ],
  },
  {
    name: "Cricketeria",
    tag: "Campaign",
    images: [
      "/images/cricket1.jpg",
      "/images/cricket2.jpg",
      "/images/cricket3.jpg",
    ],
  },
];

export function Portfolio() {
  const swipers = useRef<(SwiperType | null)[]>([]);

  return (
    <section
      id="work"
      className="bg-white px-6 py-28 text-black md:py-40"
    >
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-black/50">
              Featured Work / 03
            </p>

            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight">
              Selected{" "}
              <span className="italic font-light text-black/50">
                projects
              </span>.
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-6">

          {projects.map((p, i) => (

            <motion.a
              key={p.name}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
              }}
              onMouseEnter={() => {
                swipers.current[i]?.autoplay.start();
              }}
              onMouseLeave={() => {
                swipers.current[i]?.autoplay.stop();
              }}
              className={
                "group relative block overflow-hidden rounded-xl bg-black " +
                (i === 0 || i === 3
                  ? "md:col-span-4"
                  : "md:col-span-2")
              }
            >

              <div className="aspect-4/3 overflow-hidden relative z-0">

                <Swiper
                  modules={[Autoplay, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  loop
                  speed={1000}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }}
                  onSwiper={(swiper) => {
                    swipers.current[i] = swiper;
                    swiper.autoplay.stop(); // paused initially
                  }}
                  className="h-full w-full"
>
                  {p.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-linear-to-t from-black/90 via-black/30 to-transparent p-6 text-white">

                <div>
                  <p className="text-xs uppercase tracking-widest text-white/70">
                    {p.tag}
                  </p>

                  <h3 className="mt-1 font-display text-2xl font-bold">
                    {p.name}
                  </h3>
                </div>

                <button
                  type="button"
                  className="relative z-30 flex h-12 w-12 items-center justify-center rounded-full
                            border border-transparent
                            transition-all duration-300
                            hover:border-white hover:bg-white hover:text-black"
                >
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
                </button>

              </div>

            </motion.a>

          ))}

        </div>
      </div>
    </section>
  );
}