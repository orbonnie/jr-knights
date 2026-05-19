"use client";

import Image from "next/image";
import { useHoverReset } from "@/hooks/useHoverReset";

export type Sponsor = {
  name: string;
  href: string;
  logo?: string;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Cloudinary helper
const cloudinaryUrl = (path: string) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const hover = useHoverReset();

  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
      className={`relative flex items-center justify-center overflow-hidden aspect-[3/2] rounded-md transition-colors ${
        hover.hovered ? "bg-black-500" : "bg-royal-600"
      }`}
    >
      {sponsor.logo ? (
        <Image
          src={cloudinaryUrl(sponsor.logo)}
          alt={sponsor.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain opacity-90 h-3/4"
        />
      ) : (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3/4 bg-white flex items-center justify-center px-4">
          <span
            className={`font-display font-black tracking-widest text-center uppercase leading-none w-full transition-colors ${
              hover.hovered ? "text-royal-600" : "text-black-500"
            }`}
            style={{ fontSize: "clamp(0.75rem, 4vw, 1.5rem" }}
          >
            {sponsor.name}
          </span>
        </div>
      )}
    </a>
  );
}

export default function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  const buttonHover = useHoverReset();

  if (!sponsors) return null;

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="font-display text-royal-600 text-lg tracking-[0.4em] mb-2">
            THANK YOU TO OUR
          </p>
          <h2 className="font-display text-black-500 text-6xl tracking-widest">
            SPONSORS
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-white/5">
          {sponsors.map((sponsor, i) => (
            <SponsorCard key={i} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
}
