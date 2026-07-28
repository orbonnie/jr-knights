"use client";

import Marquee from "react-fast-marquee";

const items = [
  "CENTENNIAL JR KNIGHTS",
  "ROSWELL GEORGIA",
  "GMSAA CLASS C1",
  "WE ARE #UKNIGHTED",
  "HONOR · COURAGE · COMMITMENT",
];

export default function MarqueeBanner() {
  return (
    <div className="bg-black-500 py-3 overflow-hidden">
      <Marquee speed={60} gradient={false}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-white text-xl tracking-widest  mx-8">
              {item}
            </span>
            <span className="text-white opacity-40">⚔</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
