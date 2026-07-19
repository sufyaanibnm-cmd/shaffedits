import { useEffect, useRef, useState } from "react";
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
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 20);

      if (current > lastScrollY.current && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = current;
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{
        y: hidden ? -120 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="fixed left-1/2 top-4 z-50 w-[min(96vw,1100px)] -translate-x-1/2 md:top-6"
    >
      <motion.div
        animate={{
          borderRadius: open ? 24 : 9999,
          scale: scrolled ? 0.98 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: [0.25, 1, 0.5, 1],
        }}
        className={cn(
          "relative overflow-hidden border backdrop-blur-2xl transition-all duration-300",
          scrolled
            ? "border-white/15 bg-black/70 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "border-white/10 bg-white/[0.05]"
        )}
      >
        {/* Soft glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/[0.03] blur-2xl" />

        <div className="relative flex items-center justify-between gap-6 px-5 py-3 md:px-7">
          {/* Logo */}
          <motion.a
            href="#top"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="SHAFFEDITS"
              className="h-12 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </nav>

          {/* CTA */}
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              hidden
              md:inline-flex
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-white
              to-gray-300
              px-6
              py-2.5
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-black
              shadow-lg
              shadow-white/10
              transition-all
              duration-300
              hover:shadow-white/30
            "
          >
            Book a Call
          </motion.a>

          {/* Mobile Toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-white transition-transform duration-300 hover:scale-110 md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
                y: -20,
              }}
              animate={{
                height: "auto",
                opacity: 1,
                y: 0,
              }}
              exit={{
                height: 0,
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="overflow-hidden md:hidden"
            >
              <div className="border-t border-white/10 px-5 py-4">
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      whileHover={{ x: 6 }}
                      className="
                        rounded-xl
                        px-4
                        py-3
                        text-base
                        font-medium
                        text-white/90
                        transition-colors
                        hover:bg-white/5
                        hover:text-white
                      "
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  <motion.a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    className="
                      mt-3
                      rounded-full
                      bg-gradient-to-r
                      from-white
                      to-gray-300
                      px-4
                      py-3
                      text-center
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-black
                    "
                  >
                    Book a Call
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}