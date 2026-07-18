import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "onDark" | "onLight";
  label?: ReactNode;
  href?: string;
  as?: "a" | "button";
}

export function ArrowButton({
  tone = "onDark",
  label,
  className,
  href,
  as,
  children,
  ...rest
}: Props) {
  const onDark = tone === "onDark";
  const content = (
    <>
      {label && (
        <span className={cn("text-sm font-semibold uppercase tracking-wider", onDark ? "text-white" : "text-black")}>
          {label}
        </span>
      )}
      <span
        className={cn(
          "relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border transition-colors",
          onDark
            ? "border-white/40 text-white group-hover:border-white group-hover:bg-white group-hover:text-black"
            : "border-black/40 text-black group-hover:border-black group-hover:bg-black group-hover:text-white",
        )}
      >
        <ArrowRight
          className="absolute h-5 w-5 -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          strokeWidth={2}
        />
        <ArrowRight
          className="absolute h-5 w-5 transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0"
          strokeWidth={2}
        />
      </span>
    </>
  );
  const cls = cn("group inline-flex items-center gap-4", className);
  if (as === "a" && href) {
    return (
      <a href={href} className={cls}>
        {content}
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
      {children}
    </button>
  );
}
