import { memo, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

// ─────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────

interface PortfolioProject {
  /** Display name of the project (also used as the React list key). */
  name: string;
  /** Category / service label rendered under the project name. */
  tag: string;
  /** Ordered list of image URLs for the hover gallery. Can be empty. */
  images: string[];
}

// ─────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL;

const asset = (folder: string, file: string): string =>
  `${BASE}portfolio/${folder}/${file}`;

const brandingImages = [
  "b1.png",
  "b2.png",
  "b3.png",
  "b4.png",
  "b5.png",
  "b6.png",
  "b7.png",
  "b8.png",
  "b9.png",
  "b10.png",
  "b11.png",
  "b12.png",
  "b13.png",
  "b14.png",
  "Copy of Cloud Box packaging 11.png",
  "Copy of Cloud Box packaging 22.png",
  "Copy of magnific_in-img1-remove-the-hand-p_xg1hXSVjfW.png",
  "Copy of mockup 2.png",
  "Copy of mockup 3.png",
  "Copy of mockup 4.png",
  "Copy of mockup 5.png",
].map((file) => asset("Branding + Presentation", file));

const cloudapparelsImages = [
  "Copy of Cloudapparels_Carousel01_042026_slide01.png",
  "Copy of Cloudapparels_Carousel01_042026_slide02.png",
  "Copy of Cloudapparels_Static01_012026.png",
  "Copy of Cloudapparels_Static01_022026.png",
  "Copy of Cloudapparels_Static01_122025.png",
  "Copy of Cloudapparels_Static02_012026.png",
  "Copy of Cloudapparels_Static02_112025.png",
  "Copy of Cloudapparels_Static02_122025.png",
  "Copy of Cloudapparels_Static03_122025.png",
  "Copy of Cloudapparels_Static05_032026.png",
];

const lspaceImages = [
  "Lspace_Carousel01_062026_Slide1.png",
  "Lspace_Carousel02_052026_Slide01.png",
  "Lspace_Carousel02_052026_Slide03.png",
  "Lspace_Carousel02_052026_Slide04.png",
  "Lspace_Carousel02_052026_Slide06.png",
  "Lspace_Carousel03_052026_Slide1.png",
  "Lspace_Carousel03_052026_Slide2.png",
  "Lspace_Carousel03_052026_Slide3.png",
  "Lspace_Carousel03_052026_Slide4.png",
  "Lspace_Carousel04_052026_Slide1.png",
  "Lspace_Carousel04_052026_Slide2.png",
  "Lspace_Carousel04_052026_Slide3.png",
  "Lspace_Carousel04_052026_Slide4.png",
  "Lspace_Carousel04_052026_Slide5.png",
  "Lspace_Static01_012026.png",
  "Lspace_Static01_052026.png",
  "Lspace_Static02_052026.png",
  "Lspace_Static03_012026.png",
  "Lspace_Static03_052026.png",
  "Lspace_Static03_062026.png",
  "Lspace_Static04_062026.png",
];

const purplecurveImages = [
  "Purplecurve_Carousel01_042026_Slide01.png",
  "Purplecurve_Carousel02_042026_Slide03.png",
  "Purplecurve_Carousel03_032026_slide0.png",
  "Purplecurve_Carousel03_032026_slide1.png",
  "Purplecurve_Carousel04_042026_Slide03.png",
  "Purplecurve_Carousel05_032026_Slide1.png",
  "Purplecurve_Carousel05_042026_Slide01.png",
  "Purplecurve_Carousel06_032026_Slide1.png",
  "Purplecurve_Carousel06_042026_Slide01.png",
  "Purplecurve_Carousel06_042026_Slide02.png",
  "Purplecurve_Carousel06_042026_Slide03.png",
  "Purplecurve_Carousel07_032026_Slide1.png",
  "Purplecurve_Carousel08_032026_Slide1.png",
  "Purplecurve_Carousel09_032026_Slide1.png",
  "Purplecurve_Carousel_01_052026_Slide1.png",
  "Purplecurve_Carousel_02_052026_Slide01.png",
  "Purplecurve_Carousel_02_052026_Slide02.png",
  "Purplecurve_Carousel_02_052026_Slide03.png",
  "Purplecurve_Carousel_03_052026_Slide1.png",
  "Purplecurve_Carousel_04_052026_Slide1.png",
  "Purplecurve_Carousel_04_052026_Slide3.png",
  "Purplecurve_Reel03_062026_Slide_8.png",
  "Purplecurve_Static01_022026.png",
  "Purplecurve_Static01_062026.png",
  "Purplecurve_Static05_052026.png",
  "Purplecurve_Static06_052026.png",
  "Purplecurve_Static09_052026.png",
  "Purplecurve_Static_01_052026.png",
  "Purplecurve_Static_02_052026.png",
  "Purplecurve_Static_03_052026.png",
  "Purplecurve_Static_04_052026.png",
];

const campaignImages = [
  ...cloudapparelsImages,
  ...lspaceImages,
  ...purplecurveImages,
].map((file) => asset("Creative Campaign + Social Media", file));

const ecommerceImages = [
  "Cloud Website.png",
  "Cricketeria Website.png",
  "Lspace Website.png",
].map((file) => asset("E-Commerce Store + Website", file));

const bannerImages = [
  "Banner 1 - Slide 1.png",
  "Banner 1 - Slide 2.png",
  "Banner 1 - Slide 3.png",
  "Banner 2 - Slide 1.png",
  "Banner 2 - Slide 2.png",
  "Banner 3 - Slide 1.png",
  "Banner 3 - Slide 2.png",
  "Banner 4 - Slide 1.png",
  "Banner 4 - Slide 2.png",
  "Banner 4 - Slide 3.png",
  "Banner 4 - Slide 4.png",
  "Bats_mobile_dedicated_page_banner.png",
  "Bats_mobile_Home_Screen_banner.png",
  "Bat_care_mobile_homescreen_banner.png",
  "Clubs_and_academies_mobile_Home_Screen_banner.png",
  "Fielding_wicketkeeping_dedicated_page_main_banner.png",
  "Fielding_wicketkeeping_home_screen_banner.png",
  "Junior_mobile_Dedicated_Page_banner.png",
  "Junior_mobile_Home_Screen_banner.png",
  "Main_hero_mobile_banner_slide1.png",
  "Main_hero_mobile_banner_slide2.png",
  "Main_hero_mobile_banner_slide3.png",
  "Women_mobile_Dedicated_Page_banner.png",
  "Women_mobile_Home_Screen_banner.png",
].map((file) => asset("Website Banners + Assets", file));

const portfolioProjects: PortfolioProject[] = [
  {
    name: "VisionCraft",
    tag: ".Branding + Presentation",
    images: brandingImages,
  },
  {
    name: "Campaign Pulse",
    tag: "Creative Campaign + Social Media",
    images: campaignImages,
  },
  {
    name: "MotionVerse",
    tag: "Video Editing + Motion Graphic + Animation",
    images: [],
  },
  {
    name: "Studio Sessions",
    tag: "Creative Shoots",
    images: [],
  },
  {
    name: "ShopSphere",
    tag: "E-Commerce Store + Website",
    images: ecommerceImages,
  },
  {
    name: "Pixel Perfect",
    tag: "Website Banners + Assets",
    images: bannerImages,
  },
  {
    name: "TechVision",
    tag: "Technical Graphics + Animations",
    images: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// ProjectImage — single gallery slide
// ─────────────────────────────────────────────────────────────────────────

interface ProjectImageProps {
  src: string;
  alt: string;
  eager?: boolean;
}

const ProjectImage = memo(function ProjectImage({
  src,
  alt,
  eager = false,
}: ProjectImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
});

// ─────────────────────────────────────────────────────────────────────────
// ProjectPlaceholder — shown for projects with an empty images array
// ─────────────────────────────────────────────────────────────────────────

interface ProjectPlaceholderProps {
  label: string;
}

function ProjectPlaceholder({ label }: ProjectPlaceholderProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-black"
      role="img"
      aria-label={`${label} gallery coming soon`}
    >
      <div className="flex flex-col items-center gap-2 text-white/30">
        <ImageOff className="h-8 w-8" aria-hidden="true" />
        <span className="text-xs uppercase tracking-widest">Coming soon</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// ProjectCard — one grid card: Swiper instance + hover-driven autoplay
// ─────────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const hasImages = project.images.length > 0;

  const handleMouseEnter = useCallback(() => {
    swiperRef.current?.autoplay.start();
  }, []);

  const handleMouseLeave = useCallback(() => {
    swiperRef.current?.autoplay.stop();
  }, []);

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    swiper.autoplay.stop(); 
  }, []);

  const spanClass = index === 0 || index === 3 ? "md:col-span-4" : "md:col-span-2";

  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative block overflow-hidden rounded-xl bg-black ${spanClass}`}
      aria-label={`View ${project.name} — ${project.tag}`}
    >
      <div className="aspect-4/3 overflow-hidden relative z-0">
        {hasImages ? (
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
            onSwiper={handleSwiperInit}
            className="h-full w-full"
          >
            {project.images.map((image, imgIndex) => (
              <SwiperSlide key={image}>
                <ProjectImage
                  src={image}
                  alt={`${project.name} preview ${imgIndex + 1}`}
                  eager={index === 0 && imgIndex === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ProjectPlaceholder label={project.name} />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-linear-to-t from-black/90 via-black/30 to-transparent p-6 text-white">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/70">{project.tag}</p>
          <h3 className="mt-1 font-display text-2xl font-bold">{project.name}</h3>
        </div>
        <span
          aria-hidden="true"
          className="relative z-30 flex h-12 w-12 items-center justify-center rounded-full
                     border border-transparent
                     transition-all duration-300
                     hover:border-white hover:bg-white hover:text-black"
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
        </span>
      </div>
    </motion.a>
  );
});

// ─────────────────────────────────────────────────────────────────────────
// Portfolio — section shell + heading
// ─────────────────────────────────────────────────────────────────────────

export function Portfolio() {
  return (
    <section id="work" className="bg-white px-6 py-28 text-black md:py-40">
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
              <span className="italic font-light text-black/50">projects</span>.
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-6">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
