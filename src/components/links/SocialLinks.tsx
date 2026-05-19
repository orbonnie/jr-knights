"use client";

import { useHoverReset } from "@/hooks/useHoverReset";

export function RegSocialLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const hover = useHoverReset();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
      className={`transition-colors font-bold ${
        hover.hovered ? "text-royal-500" : "text-white"
      }`}
    >
      {label}
    </a>
  );
}

export function PlayerSocialLink({
  label,
  href,
  svg,
}: {
  label: string;
  href: string;
  svg: React.ReactNode;
}) {
  const hover = useHoverReset();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
      className={`flex items-center backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20 transition-all duration-300 ${
        hover.hovered ? "gap-2 bg-white/20" : "gap-0 bg-white/10"
      }`}
    >
      {svg}
      <span
        className={`text-white text-xs font-semibold tracking-wide overflow-hidden whitespace-nowrap transition-all duration-300 ${
          hover.hovered ? "max-w-[80px]" : "max-w-0"
        }`}
      >
        {label !== "X" ? label : ""}
      </span>
    </a>
  );
}
