"use client";

import { getSubscribeUrls } from "@/lib/calendarUtils";
import CalendarLinks from "@/components/links/CalendarLinks";
import type { CalendarConfig } from "@/types";

const GROUP_ORDER = ["General", "High School", "Jr Knights"];

const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export default function CalendarSubscribe({
  ALL_CALENDARS,
  selectedCalendars,
  divBg = "white",
}: {
  ALL_CALENDARS: CalendarConfig[];
  selectedCalendars?: string[];
  divBg?: string;
}) {
  const filtered = selectedCalendars
    ? ALL_CALENDARS.filter((c) =>
        selectedCalendars.some((n) => n.toLowerCase() === c.name.toLowerCase()),
      )
    : ALL_CALENDARS;

  const groups = GROUP_ORDER.reduce<Record<string, typeof ALL_CALENDARS>>(
    (acc, group) => {
      const cals = filtered.filter((c) => c.group === group);
      if (cals.length > 0) acc[group] = cals;
      return acc;
    },
    {},
  );

  return (
    <section className={`bg-${divBg} py-16 px-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            get
          </p>
          <h2 className="font-display text-black-500 text-6xl tracking-widest">
            subscribed
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-4xl leading-relaxed">
            Subscribe to stay up to date. Schedules can shift during the season.
            Subscribing means changes sync automatically to your device.
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(groups).map(([group, cals]) => (
            <div
              key={group}
              className="rounded-md border border-gray-200 overflow-hidden"
            >
              <div className="bg-gray-200 px-5 ">
                <p className="font-display text-black-500/70 text-sm tracking-[0.3em] uppercase">
                  {group}
                </p>
              </div>
              {cals.map((cal, i) => {
                const urls = getSubscribeUrls(cal.id);
                return (
                  <div
                    key={cal.id}
                    className={`px-5 py-4 ${
                      i < cals.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cal.color }} /> */}
                      <span
                        className="font-display text-[11px] sm:text-sm text-center sm:text-left tracking-widest rounded-2xl uppercase text-white px-6 py-2 shrink-0 w-24 sm:w-64"
                        style={{ backgroundColor: cal.color }}
                      >
                        {cal.name}
                      </span>
                      <CalendarLinks calId={cal.id} labels={true} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
