"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSubscribeUrls } from "@/lib/calendarUtils";
type CalendarConfig = {
  id: string;
  name: string;
  color: string;
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

type View = "month" | "agenda";

type CalendarEvent = {
  id: string;
  summary: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  location?: string;
  description?: string;
  calendarId: string;
  calendarName: string;
  calendarColor: string;
};

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function eventDateKey(event: CalendarEvent) {
  return event.start.date || event.start.dateTime?.split("T")[0] || "";
}

function getHeaderLabel(view: View, currentDate: Date) {
  if (view === "month") {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
  return currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function EventDetail({ event }: { event: CalendarEvent }) {
  return (
    <div
      className={`flex gap-3 items-start py-3 border-b border-gray-100 last:border-0`}
    >
      <div
        className="w-1 self-stretch rounded-full shrink-0"
        style={{ backgroundColor: event.calendarColor }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-black-500 tracking-wider text-sm">
            {event.summary}
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full text-white font-display tracking-widest shrink-0"
            style={{ backgroundColor: event.calendarColor }}
          >
            {event.calendarName}
          </span>
        </div>
        {event.start.dateTime && (
          <p className="text-gray-500 text-xs mt-0.5">
            {formatTime(event.start.dateTime)}
            {event.end.dateTime && ` — ${formatTime(event.end.dateTime)}`}
          </p>
        )}
        {event.location && (
          <p className="text-gray-400 text-xs mt-0.5">{event.location}</p>
        )}
      </div>
    </div>
  );
}

function AgendaView({
  currentDate,
  eventsByDate,
  todayKey,
  altBg,
}: {
  currentDate: Date;
  eventsByDate: Record<string, CalendarEvent[]>;
  todayKey: string;
  altBg: string;
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  // Build list of days that have events, plus today
  const days = Array.from({ length: daysInMonth })
    .map((_, i) => {
      const day = i + 1;
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;
      return { day, dateKey, events: eventsByDate[dateKey] || [] };
    })
    .filter((d) => d.events.length > 0 || d.dateKey === todayKey);

  if (days.length === 0) {
    return (
      <div
        className={`px-6 py-12 bg-${altBg} text-center h-[450px] rounded-b-2xl`}
      >
        <p className="text-gray-700 text-sm">No events this month</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-[450px] rounded-b-2xl">
      {days.map(({ day, dateKey, events }) => {
        const isToday = dateKey === todayKey;
        const date = new Date(year, month, day);

        return (
          <div
            key={dateKey}
            className="flex border-b border-gray-400/50 last:border-0"
          >
            {/* Date column */}
            <div
              className={`w-20 shrink-0 px-4 py-4 flex flex-col items-center justify-start bg-${altBg} border-r border-gray-100 ${
                isToday ? "bg-royal-600/5" : ""
              }`}
            >
              <p className="font-display text-xs tracking-widest uppercase text-gray-400">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-display text-sm mt-0.5 ${
                  isToday ? "bg-royal-600 text-white" : "text-gray-700"
                }`}
              >
                {day}
              </div>
            </div>

            {/* Events column */}
            <div className={`flex-1 px-4 py-2 bg-${altBg}`}>
              {events.length === 0 ? (
                <div className="py-3 text-gray-700 text-xs italic">
                  No events
                </div>
              ) : (
                events.map((event) => (
                  <EventDetail key={event.id} event={event} />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Calendar({
  ALL_CALENDARS,
  selectedCalendars,
  divBg = "silver-300",
  dayBg = "white",
}: {
  ALL_CALENDARS: CalendarConfig[];
  selectedCalendars: string[];
  divBg?: string;
  dayBg?: string;
}) {
  const CALENDARS = ALL_CALENDARS.filter((cal) =>
    selectedCalendars.some((c) => c.toLowerCase() === cal.name.toLowerCase()),
  );

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeCalendars, setActiveCalendars] = useState<Set<string>>(
    new Set(CALENDARS.map((c) => c.id)),
  );
  const [view, setView] = useState<View>("agenda");
  const [viewOpen, setViewOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const viewRef = useRef<HTMLDivElement>(null);
  const calendarFilterRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (viewRef.current && !viewRef.current.contains(target))
        setViewOpen(false);
      if (
        calendarFilterRef.current &&
        !calendarFilterRef.current.contains(target)
      )
        setCalendarOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const timeMin = new Date(year, month, 1).toISOString();
        const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

        const results = await Promise.all(
          CALENDARS.map((cal) =>
            fetch(
              `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
                cal.id,
              )}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
            )
              .then((res) => res.json())
              .then((data) =>
                (data.items || []).map((item: any) => ({
                  ...item,
                  calendarId: cal.id,
                  calendarName: cal.name,
                  calendarColor: cal.color,
                })),
              ),
          ),
        );

        setEvents(results.flat());
      } catch (err) {
        setError("Could not load calendar events.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [year, month]);

  const toggleCalendar = (id: string) => {
    setActiveCalendars((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size === 1) return prev;
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredEvents = events.filter((e) =>
    activeCalendars.has(e.calendarId),
  );

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const eventsByDate: Record<string, CalendarEvent[]> = {};
  filteredEvents.forEach((event) => {
    const key = eventDateKey(event);
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(event);
  });

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <section className={`bg-${divBg} py-16 px-6 border-b border-silver-600/20`}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-center">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            TEAM
          </p>
          <h2 className="font-display text-black-500 text-6xl tracking-widest">
            CALENDAR
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="bg-black-500 px-4 py-2 flex items-center gap-3 rounded-t-2xl">
            <button
              onClick={prev}
              className="text-white/70 hover:text-white transition-colors shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <p className="font-display text-white text-base sm:text-xl tracking-widest uppercase flex-1 text-center">
              {getHeaderLabel(view, currentDate)}
            </p>

            <div className="flex items-center gap-2 shrink-0">
              {/* Calendar filter dropdown */}
              <div ref={calendarFilterRef} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCalendarOpen(!calendarOpen);
                  }}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-display tracking-widest uppercase px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span className="hidden sm:inline">Calendars</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      calendarOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {calendarOpen && (
                  <div className="absolute right-0 top-full mt-2 min-w-40 w-max max-h-[70vh] overflow-y-auto bg-white shadow-xl rounded-xl z-40">
                    {CALENDARS.map((cal) => {
                      const isActive = activeCalendars.has(cal.id);
                      const urls = getSubscribeUrls(cal.id);
                      return (
                        <button
                          key={cal.id}
                          onClick={() => toggleCalendar(cal.id)}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className="w-3 h-3 rounded-full shrink-0 border-2 transition-colors"
                            style={{
                              backgroundColor: isActive
                                ? cal.color
                                : "transparent",
                              borderColor: cal.color,
                            }}
                          />
                          <span className="font-display text-xs tracking-widest uppercase text-black-500 text-left flex-1">
                            {cal.name}
                          </span>

                          {/* Subscribe links */}
                          <div className="flex items-center gap-1">
                            <a
                              href={urls.apple}
                              title="Subscribe on Apple"
                              onClick={(e) => e.stopPropagation()}
                              className="group relative w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-royal-600"
                            >
                              <svg
                                className="w-3 h-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                              </svg>
                            </a>
                            <a
                              href={urls.google}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Subscribe on Google"
                              onClick={(e) => e.stopPropagation()}
                              className="group relative w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-royal-600"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                              </svg>
                            </a>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* View dropdown */}
              <div ref={viewRef} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewOpen(!viewOpen);
                  }}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-display tracking-widest uppercase px-3 py-1.5 rounded-lg transition-colors"
                >
                  {view}
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      viewOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {viewOpen && (
                  <div className="absolute right-0 top-full mt-2 w-36 bg-white shadow-xl rounded-xl overflow-hidden z-40">
                    {(["month", "agenda"] as View[]).map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          setView(v);
                          setViewOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 font-display text-xs tracking-widest uppercase ${
                          view === v ? "text-royal-600" : "text-black-500"
                        }`}
                      >
                        {v === "agenda" ? "Agenda" : v}
                        {view === v && (
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={next}
              className="text-white/70 hover:text-white transition-colors shrink-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Day labels — month only */}
          {view === "month" && (
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="py-2 text-center font-display text-xs tracking-widest uppercase text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="h-[500px] flex items-center justify-center">
              {/* <p className="font-display text-silver-500 tracking-widest">LOADING...</p> */}
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          ) : view === "month" ? (
            <div className="grid grid-cols-7 auto-rows-[4rem] sm:auto-rows-[5rem] bg-white">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border-b border-r border-gray-100 bg-gray-50/50 h-full p-1 flex flex-col"
                />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateKey = `${year}-${String(month + 1).padStart(
                  2,
                  "0",
                )}-${String(day).padStart(2, "0")}`;
                const dayEvents = eventsByDate[dateKey] || [];
                const isToday = dateKey === todayKey;
                const isSelected = dateKey === selectedDate;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateKey)}
                    className={`border-b border-r border-gray-100 flex flex-col cursor-pointer transition-colors ${
                      isSelected ? "bg-royal-600/10" : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Fixed date number */}
                    <div className="shrink-0 p-1.5 pb-0">
                      <div
                        className={`w-3 h-3 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-sm font-display mb-1 ${
                          isToday ? "bg-royal-600 text-white" : "text-gray-700"
                        }`}
                      >
                        {day}
                      </div>
                    </div>

                    <div className="overflow-y-auto flex-1 p-1.5 pt-1 space-y-0.5">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="text-[7px] sm:text-xs text-white px-0.5 sm:px-1 py-px sm:py-0.5 rounded truncate"
                          style={{ backgroundColor: event.calendarColor }}
                        >
                          {event.summary}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[7px] sm:text-xs text-gray-700 font-bold">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <AgendaView
              currentDate={currentDate}
              eventsByDate={eventsByDate}
              todayKey={todayKey}
              altBg={dayBg}
            />
          )}

          {/* Selected day events — month view only */}
          {selectedDate && view === "month" && (
            <div className="bg-white border-t border-gray-200 px-6 py-4  rounded-b-2xl">
              <p className="font-display text-black-500 text-sm tracking-widest uppercase mb-3">
                {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                  "en-US",
                  { weekday: "long", month: "long", day: "numeric" },
                )}
              </p>
              {selectedEvents.length === 0 ? (
                <p className="text-gray-700 text-sm">No events</p>
              ) : (
                <div className="space-y-0 overflow-hidden flex-1">
                  {selectedEvents.map((event) => (
                    <EventDetail key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
