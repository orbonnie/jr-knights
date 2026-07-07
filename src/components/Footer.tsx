"use client";

import Link from "next/link";
import { socialLinks, type SocialLink } from "@/data/socialLinks";
import { useHoverReset } from "@/hooks/useHoverReset";

function SocialCard({ social }: { social: SocialLink }) {
  const hover = useHoverReset();
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
      className={`transition-colors ${
        hover.hovered ? social.hover : "text-white/50"
      }`}
    >
      {social.icon}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-black-500 border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-2xl text-royal-600 text-center tracking-widest">
            JR KNIGHTS
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {[
            ["Schedule", "/schedule"],
            ["Roster", "/roster"],
            ["Register", "/info"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-white/90 hover:text-silver-400 text-xs tracking-widest uppercase transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <SocialCard social={social} key={social.label} />
          ))}
        </div>
      </div>
    </footer>
  );
}
