import { useEffect } from "react";

/**
 * Attaches a single document-level pointermove listener that updates
 * CSS custom properties (--x, --y) on every element with `data-spotlight`.
 * Disabled on touch/coarse pointer devices to avoid jank.
 */
export function SpotlightProvider() {
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let raf = 0;
    let lx = 0;
    let ly = 0;

    const onMove = (e: PointerEvent) => {
      lx = e.clientX;
      ly = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const els = document.querySelectorAll<HTMLElement>("[data-spotlight]");
        els.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const x = lx - rect.left;
          const y = ly - rect.top;
          const inside =
            x >= -80 && y >= -80 && x <= rect.width + 80 && y <= rect.height + 80;
          el.style.setProperty("--x", `${x}px`);
          el.style.setProperty("--y", `${y}px`);
          el.style.setProperty("--spot-opacity", inside ? "1" : "0");
        });
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
