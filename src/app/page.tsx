export const dynamic = "force-dynamic";

import Link from "next/link";
import News from "@/components/News";
import Calendar from "@/components/Calendar";
import RegisterButtons from "@/components/links/RegisterButtons";
import Sponsors, { Sponsor } from "@/components/Sponsors";
import { getSheetData } from "@/lib/sheets";
import type { NewsStory } from "@/types";
import type { CalendarConfig } from "@/types";

const quickLinks = [
  {
    label: "Schedules",
    href: "/schedule",
    description: "Game dates, times & locations",
  },
  {
    label: "Rosters",
    href: "/roster",
    description: "Players & coaching staff",
  },
  {
    label: "Info",
    href: "/info",
    description: "Registration, fees & contacts",
  },
];

export default async function JrkLandingPage() {
  const [jrkNews, news, allCalendars, sponsors] = await Promise.all([
    getSheetData("JRK-News"),
    getSheetData("HS-News"),
    getSheetData("Calendars") as unknown as CalendarConfig[],
    getSheetData("Sponsors") as unknown as Sponsor[],
  ]);

  const selectedCalendars = allCalendars
    .filter((c) => c.group === "Jr Knights" || c.group === "General")
    .map(({ name }) => name);

  return (
    <div className="min-h-screen">
      {/* Hero — full screen poster */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-royal-600/95">
        {/* Yard lines - horizontal stripes like a football field viewed from above */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
                              0deg,
                              rgba(255,255,255,0.6) 0px,
                              rgba(255,255,255,0.6) 2px,
                              transparent 2px,
                              transparent 80px
                            )`,
          }}
        />

        {/* Hash marks — left side */}
        <div
          className="absolute top-0 bottom-0 left-0 w-5 sm:w-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
                              0deg,
                              rgba(255,255,255,0.25) 0px,
                              rgba(255,255,255,0.25) 1px,
                              transparent 1px,
                              transparent 16px
                            )`,
          }}
        />
        {/* Hash marks — right side */}
        <div
          className="absolute top-0 bottom-0 right-0 w-5 sm:w-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
                              0deg,
                              rgba(255,255,255,0.25) 0px,
                              rgba(255,255,255,0.25) 1px,
                              transparent 1px,
                              transparent 16px
                            )`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-20">
          <p className="font-display text-black-500 text-2xl tracking-[0.6em] uppercase mb-6">
            Centennial Knights Football
          </p>

          <h1 className="font-display text-white leading-none tracking-widest mb-2">
            <span className="block text-7xl md:text-9xl">JR</span>
            <span className="block text-7xl md:text-9xl">KNIGHTS</span>
          </h1>

          <div className="w-32 h-1 bg-silver-500 mx-auto my-8" />

          <p className="font-display text-black-500 text-2xl md:text-4xl tracking-[0.3em] uppercase mb-12">
            Building the Future
          </p>

          <p className="text-silver-400 text-lg font-bold max-w-xl mx-auto leading-relaxed mb-12">
            The official youth feeder program for Centennial High School
            Football. Developing Knights from kindergarten through 8th grade.
          </p>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xs sm:max-w-xl lg:max-w-2xl mx-auto">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="bg-silver-400 hover:bg-white border border-white/10 hover:border-royal-600/50 rounded-2xl px-6 py-5 text-center transition-all duration-200 group"
              >
                <p className="font-display text-black-500 text-2xl tracking-widest group-hover:font-bold transition-colors">
                  {link.label.toUpperCase()}
                </p>
                <p className="text-black-500/80 text-xs font-semibold mt-1 tracking-wide ">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 mt-12 mb-10 flex flex-col items-center gap-2 text-silver-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* News reel */}
      <div className=" px-6">
        <div className="max-w-4xl mx-auto">
          <News
            news={jrkNews as NewsStory[]}
            divBg="white"
            reelBg="silver-300"
          />
        </div>
      </div>

      {/* Calendar */}
      <div className="sm:px-6 border-y bg-silver-400 border-y-silver-600/10">
        <div className="sm:max-w-4xl mx-auto">
          <Calendar
            selectedCalendars={selectedCalendars}
            ALL_CALENDARS={allCalendars}
            divBg="silver-400"
          />
        </div>
      </div>

      <Sponsors sponsors={sponsors} />

      {/* Register CTA */}
      <div className="bg-silver-500 px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <p className="font-display text-royal-600 text-lg tracking-[0.4em] uppercase">
            Join Us
          </p>
          <h2 className="font-display text-black-500 text-4xl tracking-widest">
            BECOME A KNIGHT
          </h2>
          <p className="text-black-500 text-sm max-w-md leading-relaxed">
            Register today for the 2026 season. Questions? Contact Program
            Director Alpha Owens at{" "}
            <a
              href="tel:8054326170"
              className="text-royal-600 font-semibold underline hover:text-royal-500"
            >
              805-432-6170
            </a>{" "}
            or{" "}
            <a
              href="mailto:kibou94@icloud.com"
              className="text-royal-600 font-semibold underline hover:text-royal-500"
            >
              kibou94@icloud.com
            </a>
            .
          </p>
          <RegisterButtons />
        </div>
      </div>
    </div>
  );
}
