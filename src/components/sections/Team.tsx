import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// PLACEHOLDER: add a real `image` path per member once headshots are ready —
// cards automatically switch from the initials avatar to a full portrait.
const team: { name: string; role: string; bio: string; image?: string }[] = [
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

// ---- Coverflow tuning ----
const CARD_WIDTH = 320;
const CARD_HEIGHT = 420;
const PERSPECTIVE = 1700;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 220;
const SPREAD = 190;
const TILT = 34;
const SIDE_TILT = 4;
const INACTIVE_DIM = 0.65;
const DURATION = 0.6;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const AUTOPLAY_MS = 5000;
const DRAG_THRESHOLD = 90;
const WHEEL_THRESHOLD = 40;

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const textVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Team() {
  const n = team.length;
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pausedRef = useRef(false);
  const wheelCooldown = useRef(false);

  const lockRef = useRef(false);
  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, Math.max(50, DURATION * 1000));
  }, []);

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock],
  );

  const goTo = useCallback(
    (i: number) => {
      if (lockRef.current) return;
      lock();
      setActive(i);
    },
    [lock],
  );

  const handleCardClick = useCallback(
    (i: number) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (i === a ? (a + 1) % n : i));
    },
    [n, lock],
  );

  // ---- Keyboard: arrows, Home/End, Space/Enter ----
  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(n - 1);
      }
    },
    [step, goTo, n],
  );

  // ---- Mouse wheel navigation ----
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD || wheelCooldown.current) return;
      wheelCooldown.current = true;
      step(e.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        wheelCooldown.current = false;
      }, 350);
    },
    [step],
  );

  // ---- Drag navigation (swipe) ----
  const onDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x <= -DRAG_THRESHOLD) step(1);
      else if (info.offset.x >= DRAG_THRESHOLD) step(-1);
    },
    [step],
  );

  // ---- Autoplay, paused on hover ----
  useEffect(() => {
    if (n < 2) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) step(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [n, step]);

  const handleMouseEnterScene = () => {
    pausedRef.current = true;
    setIsPaused(true);
  };
  const handleMouseLeaveScene = () => {
    pausedRef.current = false;
    setIsPaused(false);
  };

  const transitionCss = `transform ${DURATION}s ${EASE}, filter ${DURATION}s ${EASE}, opacity ${DURATION}s ${EASE}`;

  return (
    <section
      className="relative overflow-hidden px-6 py-28 text-white md:py-40"
      style={{ background: "radial-gradient(circle at top, #232323 0%, #050505 62%)" }}
    >
      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: NOISE_BG, opacity: 0.035, mixBlendMode: "overlay" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-end justify-between gap-6"
        >
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
              Our Team / 04
            </p>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight">
              The people behind the <span className="italic font-light text-white/60">work</span>.
            </h2>
          </div>
          {/* Card counter */}
          <div className="hidden shrink-0 items-baseline gap-1 font-display text-white/40 sm:flex">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white"
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
            <span className="text-sm"> / {String(n).padStart(2, "0")}</span>
          </div>
        </motion.div>

        <div
          className="relative mx-auto flex items-center justify-center outline-none"
          style={{ perspective: PERSPECTIVE, minHeight: CARD_HEIGHT + 60 }}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Team members"
          onKeyDown={onKeyDown}
          onWheel={onWheel}
          onMouseEnter={handleMouseEnterScene}
          onMouseLeave={handleMouseLeaveScene}
        >
          {/* Ambient glow blob behind the stack */}
          <div
            aria-hidden
            className="pointer-events-none absolute rounded-full blur-[140px]"
            style={{ width: 700, height: 700, background: "rgba(255,255,255,0.08)" }}
          />

          <motion.div
            className="relative"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT, transformStyle: "preserve-3d" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            drag="x"
            dragElastic={0.12}
            dragMomentum={false}
            dragSnapToOrigin
            onDragEnd={onDragEnd}
          >
            {team.map((member, i) => {
              let rel = i - active;
              if (rel > n / 2) rel -= n;
              if (rel < -n / 2) rel += n;

              const ax = Math.abs(rel);
              const visible = ax <= MAX_VISIBLE;
              const isActive = rel === 0;
              const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
              const tx = rel * SPREAD;
              const tz = -ax * DEPTH;
              const ry = -rel * TILT;
              const rz = rel * SIDE_TILT;

              const cardStyle: CSSProperties = {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: 18,
                overflow: "hidden",
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                transition: transitionCss,
                opacity: visible ? 1 : 0,
                filter: isActive ? "blur(0px) brightness(1)" : "blur(1.5px) brightness(0.75)",
                cursor: isActive ? "default" : "pointer",
                pointerEvents: visible ? "auto" : "none",
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: isActive
                  ? "0 0 120px rgba(255,255,255,0.12)"
                  : "0 0 60px rgba(255,255,255,0.04)",
              };

              return (
                <CoverCard
                  key={member.name}
                  member={member}
                  isActive={isActive}
                  cardStyle={cardStyle}
                  ariaHidden={!visible}
                  onClick={() => handleCardClick(i)}
                />
              );
            })}
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          {/* Prev / Next */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous team member"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Animated progress bar */}
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10 sm:w-56">
              <motion.div
                className="h-full rounded-full bg-white"
                animate={{ width: `${((active + 1) / n) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next team member"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white hover:text-black"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs uppercase tracking-widest text-white/40">
            Drag, scroll, or use ← → · Space/Enter advances · {isPaused ? "paused" : "autoplay on"}
          </p>
        </div>
      </div>
    </section>
  );
}

function CoverCard({
  member,
  isActive,
  cardStyle,
  ariaHidden,
  onClick,
}: {
  member: { name: string; role: string; bio: string; image?: string };
  isActive: boolean;
  cardStyle: CSSProperties;
  ariaHidden: boolean;
  onClick: () => void;
}) {
  // ---- Magnetic tilt on hover ----
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 8 });
  };
  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      aria-hidden={ariaHidden}
      aria-current={isActive ? "true" : undefined}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div
        className="relative h-full w-full"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Portrait (once real photos exist) or plain dark base */}
        {member.image ? (
          <>
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </>
        ) : null}

        {/* Spotlight sweep on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        {/* Content — only the active card renders anything at all */}
        {isActive && (
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="show"
            className="absolute bottom-0 w-full border-t border-white/10 bg-white/10 p-6 backdrop-blur-xl"
          >
            <motion.div
              variants={lineVariants}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 font-display text-xl font-bold"
            >
              {initials(member.name)}
            </motion.div>
            <motion.h3
              variants={lineVariants}
              className="font-display text-xl font-black tracking-tight"
            >
              {member.name}
            </motion.h3>
            <motion.p
              variants={lineVariants}
              className="mt-1 text-xs uppercase tracking-[0.35em] text-white/50"
            >
              {member.role}
            </motion.p>
            <motion.p
              variants={lineVariants}
              className="mt-3 text-sm leading-8 text-white/70"
            >
              {member.bio}
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}