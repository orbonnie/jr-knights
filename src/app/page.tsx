export const dynamic = "force-dynamic";

import Link from "next/link";
import Hero from "@/components/Hero";
import ImageHero from "@/components/ImageHero";
import News from "@/components/News";
import Calendar from "@/components/Calendar";
import RegisterButtons from "@/components/links/RegisterButtons";
import MarqueeBanner from "@/components/MarqueeBanner";
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
      <ImageHero />
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
      <section className="bg-silver-500 px-6 py-10" id="registration-links">
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
      </section>
    </div>
  );
}
