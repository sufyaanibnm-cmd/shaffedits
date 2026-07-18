import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logoWhite from "@/assets/logo-white.png";

const SESSION_KEY = "shaffedits-preloaded";

export function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const minDuration = 1200;
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);
      if (elapsed < minDuration) {
        raf = requestAnimationFrame(tick);
      } else {
        // wait for window load if not yet ready
        const done = () => {
          sessionStorage.setItem(SESSION_KEY, "1");
          setTimeout(() => setVisible(false), 200);
        };
        if (document.readyState === "complete") done();
        else window.addEventListener("load", done, { once: true });
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black"
        >
          <div className="w-[min(80vw,640px)]">
            <img
              src={logoWhite}
              alt="Shaffedits"
              className="mx-auto block w-full animate-wipe"
              width={1536}
              height={512}
            />
            <div className="relative mx-auto mt-10 h-px w-full max-w-md overflow-hidden bg-white/15">
              <div
                className="h-full bg-white transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-center text-xs font-medium tracking-[0.3em] text-white/60">
              {String(progress).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
