import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpotlightProvider } from "@/components/ui/SpotlightProvider";
import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Team } from "@/components/sections/Team";
import { Clientele } from "@/components/sections/Clientele";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

function App() {
  return (
    <>
      <Preloader />
      <SpotlightProvider />
      <Navbar />
      <main className="bg-black">
        <Hero />
        <TrustMarquee />
        <About />
        <Services />
        <Portfolio />
        <Team />
        <Clientele />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
