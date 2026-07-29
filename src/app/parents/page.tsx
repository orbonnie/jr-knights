export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { values, eliteParentActions, faqs, contacts } from "@/data/parentPage";
import { socialLinks } from "@/data/socialLinks";
import { RegSocialLink } from "@/components/links/SocialLinks";
import CalendarSubscribe from "@/components/CalendarSubscribe";
import { getSheetData } from "@/lib/sheets";
import type { CalendarConfig } from "@/types";

export const metadata: Metadata = {
  title: "Parent Playbook | Centennial Knights Football",
};

export default async function ParentsPage() {
  const allCalendars = (await getSheetData(
    "Calendars",
  )) as unknown as CalendarConfig[];
  const fullCalendar = allCalendars
    .filter((c) => c.group === "Jr Knights" || c.group === "General")
    .map(({ name }) => name);
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em]">
            CENTENNIAL JR KNIGHTS
          </p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest leading-none">
            PARENT
            <br />
            PLAYBOOK
          </h1>
        </div>
      </div>

      {/* Welcome */}
      <section className="bg-royal-600 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto ">
          <p className="font-display text-silver-400 text-xl tracking-[0.4em] mb-2">
            OUR
          </p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-10">
            MISSION
          </h2>
          <p className="font-heading text-white text-[clamp(1.5rem,4vw,2.25rem)] leading-tight tracking-wide max-w-4xl">
            Welcome to Centennial Knights Football. Our mission is to develop
            young men who pursue excellence in everything they do. Thank you for
            trusting us to challenge your son and for partnering with us to
            build something special.
          </p>
        </div>
      </section>

      {/* UKNIGHTED Values */}
      {/* <section className="bg-silver-400 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            OUR
          </p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-12">
            VALUES
          </h2>
          <div className="flex flex-col gap-px bg-white/5">
            {values.map((v) => (
              <div
                key={v.word}
                className="bg-black-500 hover:bg-silver-700 transition-colors px-6 py-6 flex items-center gap-8 rounded-md"
              >
                <span className="font-display text-royal-600 text-6xl w-16 shrink-0 text-center">
                  {v.letter}
                </span>
                <div>
                  <p className="font-display text-white text-2xl tracking-widest">
                    {v.word}
                  </p>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 5 Actions of UKNIGHTED Parents */}
      <section className="bg-white py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            PARENTING FOR
          </p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-12">
            SUCCESS
          </h2>
          <div className="flex flex-col gap-4">
            {eliteParentActions.map((action, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="font-display text-royal-600 text-4xl w-10 shrink-0">
                  {i + 1}
                </span>
                <p className="text-black-500/90 text-base font-medium leading-relaxed pt-2">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Athlete */}
      <section className="bg-royal-600 py-20 px-6 mb-2">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-silver-400 text-xl tracking-[0.4em] mb-2">
            SUCCEEDING AS A
          </p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-10">
            STUDENT-ATHLETE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-white/90 leading-relaxed text-lg">
              Our program is committed to developing young men who pursue
              excellence in the classroom with the same effort and discipline
              they bring to the field. Academic success is a foundational part
              of who we are.
            </p>
            <p className="text-white/90 leading-relaxed">
              We expect every player to prioritize the "student" role by
              managing time wisely, completing assignments, and communicating
              with teachers.
            </p>
          </div>
        </div>
      </section>

      <CalendarSubscribe
        selectedCalendars={fullCalendar}
        ALL_CALENDARS={allCalendars}
      />

      {/* Communication */}
      <section className="bg-silver-400 py-20 px-6 mb-2" id="communication">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            STAY
          </p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-12">
            CONNECTED
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                title: "Weekly Email",
                description: (
                  <>
                    Our primary source of program-wide communication. Sent
                    weekly to all families with essential information,
                    reminders, and updates. Parents are expected to read it
                    carefully each week. If you are not getting the weekly
                    email, contact Anna McLaurin at{" "}
                    <a
                      href={"mailto: aadaniel84@gmail.com"}
                      className="text-royal-500 text-sm font-semibold tracking-wider transition-colors shrink-0 hover:text-royal-400"
                    >
                      aadaniel84@gmail.com
                    </a>
                  </>
                ),
              },
              {
                title: "TeamSnap App",
                description:
                  "TeamSnap serves as a platform for team-specific coordination, including game schedules, RSVPs and group chats.",
              },
              {
                title: "Website & Social",
                description: (
                  <>
                    JrkFootball.com is the central hub for all program
                    information including schedules, registration, and
                    sponsorships. Follow us on{" "}
                    {socialLinks.map((sl) => (
                      <RegSocialLink
                        label={sl.label}
                        href={sl.href}
                        key={sl.label}
                        separator={sl.separator}
                      />
                    ))}
                    for highlights and announcements.
                  </>
                ),
              },
            ].map((channel) => (
              <div
                key={channel.title}
                className="group bg-black-500/95 p-8 rounded-md transition"
              >
                <h3
                  className="font-display text-royal-600 text-2xl tracking-widest mb-4
               transition-colors group-hover:text-royal-500"
                >
                  {channel.title.toUpperCase()}
                </h3>

                <p className="text-white/90 text-sm leading-relaxed">
                  {channel.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 mb-2" id="faq">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            FREQUENTLY ASKED
          </p>
          <h2 className="font-display text-black-500 text-5xl tracking-widest mb-12">
            QUESTIONS
          </h2>
          <div className="flex flex-col gap-px bg-royal-900/10">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white hover:bg-silver-400/80 transition-colors px-6 py-6 border-b border-black-500/15 last:border-0"
              >
                <p className="font-display text-black-500 text-xl tracking-wider mb-2">
                  {faq.q.toUpperCase()}
                </p>
                <p className="text-black-500/70 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="bg-silver-500 py-20 px-6 mb-2" id="contacts">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            PROGRAM
          </p>
          <h2 className="font-display text-white text-5xl tracking-widest mb-12">
            CONTACTS
          </h2>
          <div className="flex flex-col gap-px bg-white/5">
            {contacts.map((c) => (
              <div
                key={c.role}
                className="bg-silver-300 hover:bg-white transition-colors px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-md"
              >
                <div>
                  <p className="font-display text-royal-600 text-lg tracking-widest">
                    {c.role.toUpperCase()}
                  </p>
                  <p className="text-black-500 font-semibold">{c.name}</p>
                  <p className="text-black-500 text-xs mt-1">{c.for}</p>
                </div>
                <a
                  href={`mailto:${c.email}`}
                  className="text-royal-600 text-sm tracking-wider transition-colors shrink-0 hover:text-royal-500"
                >
                  {c.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
