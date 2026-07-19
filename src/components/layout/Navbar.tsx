import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NavLink } from "../ui/NavLink";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-white.png";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-50 w-[min(96vw,1100px)] -translate-x-1/2 md:top-6"
    >
      <motion.div
        animate={{ borderRadius: open ? 20 : 9999 }}
        transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
        className={cn(
          "border border-white/10 bg-black/50 backdrop-blur-xl transition-shadow",
          scrolled && "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]",
        )}
      >
        <div className="flex items-center justify-between gap-6 px-5 py-3 md:px-7">
          <a href="#top" className="flex items-center gap-2 text-white">
            <img src={logo} alt="SHAFFEDITS" className="h-12 w-auto object-contain" />
            
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            Book a Call
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-white/10 px-5 py-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black"
                >
                  Book a Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
