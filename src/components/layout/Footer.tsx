import logoWhite from "@/assets/logo-white.png";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-14 text-white/60">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <img src={logoWhite} alt="Shaffedits" className="h-10 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-sm">
            Creative marketing agency building brands people remember.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/40">Explore</p>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#work" className="hover:text-white">Work</a></li>
            <li><a href="#team" className="hover:text-white">Team</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/40">Contact</p>
          <ul className="space-y-2">
            <li><a href="mailto:hi@shaffedits.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Email</a></li>
            <li><a href="tel:+918807705502" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></li>
            <li><a href="https://www.instagram.com/shaffedits/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/shaffedits/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
            <li><a href="https://www.youtube.com/@ShaffEdits." target="_blank" rel="noopener noreferrer" className="hover:text-white">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center">
        <p>© {year} Shaffedits. All rights reserved.</p>
        <p>Creative marketing — Made with intention.</p>
      </div>
    </footer>
  );
}
