import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

/**
 * A card that renders a radial spotlight glow following the shared cursor
 * position tracked by SpotlightProvider. On touch devices a soft static
 * glow is shown (the provider does not update --x/--y there).
 */
export function SpotlightCard({ children, className, tone = "dark" }: Props) {
  const isDark = tone === "dark";
  return (
    <div
      data-spotlight
      style={
        {
          "--spot-color": isDark
            ? "rgba(255,255,255,0.14)"
            : "rgba(0,0,0,0.08)",
        } as React.CSSProperties
      }
      className={cn(
        "spotlight-card group relative rounded-xl border p-8",
        isDark
          ? "border-white/10 bg-white/2 text-white hover:border-white/25"
          : "border-black/10 bg-white text-black hover:border-black/30",
        className,
      )}
    >
      <span
        aria-hidden
        className="spotlight-glow rounded-xl"
        style={{
          // Static soft glow visible on touch devices where --spot-opacity never updates
          opacity: "var(--spot-opacity, 0.35)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
