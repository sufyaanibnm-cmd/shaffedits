import React from "react";

import BL from "../../assets/logo/BL.png";
import DRLayla from "../../assets/logo/DR Layla.png";
import FinalHorizontal from "../../assets/logo/Final Horizontal Black.png";
import JBKControls from "../../assets/logo/JBK Controls.png";
import JRDental from "../../assets/logo/JR Dental Logo Horizontal Black.png";
import LogoHorizontal from "../../assets/logo/Logo Horizontal Black.png";
import Logotype from "../../assets/logo/Logotype Black.png";
import Lspace from "../../assets/logo/Lspace_Logo_Horizontal.png";
import SynergyOils from "../../assets/logo/Synergy Oils.png";
import TheSheikhShawarma from "../../assets/logo/The Sheikh Shawarma Logo Black Version.png";
import Untangle from "../../assets/logo/Untangle_LogosV6-05 copy.png";
import Wanaromah from "../../assets/logo/Wanaromah.png";
import Attea from "../../assets/logo/attea logo.png";
import Kenrich from "../../assets/logo/kenrich international school.png";
import OrganicOcean from "../../assets/logo/organic ocean.png";
import Purple from "../../assets/logo/purple curve.png";
import Saregama from "../../assets/logo/saregama.png";
import SethGExims from "../../assets/logo/seth G exims.png";

type Client = {
  name: string;
  logo: string;
};

const clients: Client[] = [
  { name: "BL", logo: BL },
  { name: "DR Layla", logo: DRLayla },
  { name: "Final Horizontal", logo: FinalHorizontal },
  { name: "JBK Controls", logo: JBKControls },
  { name: "JR Dental", logo: JRDental },
  { name: "Logo Horizontal", logo: LogoHorizontal },
  { name: "Logotype", logo: Logotype },
  { name: "Lspace", logo: Lspace },
  { name: "Synergy Oils", logo: SynergyOils },
  { name: "The Sheikh Shawarma", logo: TheSheikhShawarma },
  { name: "Untangle", logo: Untangle },
  { name: "Wanaromah", logo: Wanaromah },
  { name: "Attea", logo: Attea },
  { name: "Kenrich International School", logo: Kenrich },
  { name: "Organic Ocean", logo: OrganicOcean },
  { name: "Purple Curve", logo: Purple },
  { name: "Saregama", logo: Saregama },
  { name: "Seth G Exims", logo: SethGExims },
];

export function Clientele() {
  const loop = [...clients, ...clients];

  return (
    <section className="border-y border-black/10 bg-white py-24 text-black">
      <div className="mx-auto mb-14 max-w-4xl px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-black/50">
          Clientele / 05
        </p>

        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-none tracking-tight">
          Brands that trust{" "}
          <span className="italic font-light text-black/50">
            Shaffedits
          </span>
          .
        </h2>
      </div>

      <div
        className="marquee-paused overflow-hidden"
        style={
          {
            "--marquee-duration": "35s",
          } as React.CSSProperties
        }
      >
        <div className="flex w-max animate-marquee items-center gap-20 px-10">
          {loop.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex h-20 w-40 items-center justify-center"
            >
              <img
                src={client.logo}
                alt={client.name}
                title={client.name}
                loading="lazy"
                draggable={false}
                className="max-h-14 max-w-full w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                onError={(e) => {
                  console.error(`Failed to load: ${client.name}`);
                  e.currentTarget.style.border = "2px solid red";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}