import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "onDark" | "onLight";
  as?: "button" | "a";
  href?: string;
}

export const GlowButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, tone = "onDark", children, href, as, ...rest }, ref) => {
    const onDark = tone === "onDark";
    const base = cn(
      "group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-transform duration-300 will-change-transform hover:-translate-y-0.5",
      onDark
        ? "bg-white text-black"
        : "bg-black text-white",
      className,
    );

    const glow = (
      <>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-3 rounded-full blur-2xl opacity-40 transition-all duration-500 group-hover:opacity-90 group-hover:blur-3xl",
            onDark ? "bg-white/60" : "bg-black/50",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            onDark
              ? "bg-linear-to-br from-white via-white to-neutral-300"
              : "bg-linear-to-br from-black via-neutral-800 to-black",
          )}
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </>
    );

    if (as === "a" && href) {
      return (
        <a href={href} className={base}>
          {glow}
        </a>
      );
    }
    return (
      <button ref={ref} className={base} {...rest}>
        {glow}
      </button>
    );
  },
);
GlowButton.displayName = "GlowButton";
