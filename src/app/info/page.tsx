import type { Metadata } from "next";
import RegisterButtons from "@/components/links/RegisterButtons";

export const metadata: Metadata = {
  title: "Jr Knights | Centennial Knights Football",
};

const importantDates = [
  {
    program: "Middle School",
    summerTraining: "July 7",
    firstPractice: "July 27",
  },
  {
    program: "K–5th",
    summerTraining: "July 20",
    firstPractice: "August 1",
  },
];

const fees = [
  {
    program: "Middle School",
    registration: "$150",
    dues: "$500",
  },
  {
    program: "K–5th",
    registration: "$360",
    dues: "$0",
  },
];

export default function JrKnightsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="font-display text-black-500 text-7xl tracking-widest">
            JR KNIGHTS
          </h1>
        </div>

        {/* Intro */}
        <div className="mb-12 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            The Jr. Knights are the official youth feeder program for Centennial
            High School Football, serving players from kindergarten through 8th
            grade in the Centennial school district. Our program is dedicated to
            building the next generation of Knights by developing players on and
            off the field through great coaching, teamwork, and a commitment to
            excellence.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold">Middle School (6th–8th):</span> Players
            zoned for Centennial from{" "}
            <span className="font-bold">Holcomb Bridge</span> and{" "}
            <span className="font-bold">Haynes Bridge Middle Schools</span> are
            eligible to participate. All practices and home games are held at
            Centennial High School.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold">Elementary (K–5th):</span> Open to
            players from{" "}
            <span className="font-bold">
              River Eves, Esther Jackson, Hillside,
            </span>{" "}
            and <span className="font-bold">Northwood Elementary Schools</span>.
            All practices and home games are held at East Roswell Park.
          </p>
        </div>

        {/* Registration buttons */}
        <div className="mb-14">
          <p className="text-black-500 text-md leading-relaxed mb-6 text-center">
            <span className="font-bold text-lg text-royal-600 bg-royal-600/10 p-2 rounded-xl text-center">
              Register today
            </span>{" "}
            to secure your spot for the 2026 season.
          </p>
          <div className="flex justify-center">
            <RegisterButtons />
          </div>
        </div>

        {/* Program Info */}
        <div className="mb-12">
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
            PROGRAM INFO
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-royal-600">
                Middle School (6th–8th):
              </span>{" "}
              The season runs from July through early November. Players are
              expected to participate in all practices and training activities.
              During the season, practices occur Monday, Tuesday, and Thursday
              evenings at Centennial High School. Games take place on Saturdays.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-royal-600">
                Elementary (K–5th):
              </span>{" "}
              While the actual season runs from late July to early December,
              K–5th players are encouraged to take part in as many off-season
              activities as possible, including workouts and camps. Summer
              workouts take place Tuesday evenings from 6:30–7:30PM (K–3rd) and
              7:30–8:30PM (4th–5th) at East Roswell Park. During the season,
              practices occur Monday, Tuesday, and Thursday evenings from
              6:30–8:30PM. Games take place on Saturdays.
            </p>
          </div>
        </div>

        {/* Important Dates */}
        <div className="mb-12">
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
            2026 IMPORTANT DATES
          </h2>
          <div className="rounded-md overflow-hidden border border-gray-200">
            <div className="grid grid-cols-3 bg-black-500 px-6 py-3 font-display text-sm tracking-widest uppercase text-white">
              <span>Program</span>
              <span className="text-center">Summer Training</span>
              <span className="text-right">First Practice</span>
            </div>
            {importantDates.map((d, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-6 py-4 border-t border-gray-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <span className="font-display text-royal-600 text-md tracking-wider">
                  {d.program}
                </span>
                <span className="text-gray-700 text-md text-center">
                  {d.summerTraining}
                </span>
                <span className="text-gray-700 text-md text-right font-bold">
                  {d.firstPractice}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fees */}
        <div className="mb-12">
          <h2 className="font-display text-black-500 text-3xl tracking-widest">
            2026 FEES
          </h2>
          <p className="text-black-500/90 mb-6">
            *See full fee details on our{" "}
            <a
              href="/registration"
              className="text-royal-600 font-bold hover:text-royal-500"
            >
              General Registration page
            </a>
            .
          </p>
          <div className="rounded-md overflow-hidden border border-gray-200">
            <div className="grid grid-cols-3 bg-black-500 px-6 py-3 font-display text-sm tracking-widest uppercase text-white">
              <span>Program</span>
              <span className="text-center">Registration Fee</span>
              <span className="text-right">Players Dues</span>
            </div>
            {fees.map((fee, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-6 py-4 border-t border-gray-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <span className="font-display text-royal-600 text-md tracking-wider">
                  {fee.program}
                </span>
                <span className="text-gray-700 text-md text-center">
                  {fee.registration}
                </span>
                <span className="text-gray-700 text-md text-right">
                  {fee.dues}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-12">
          <h2 className="font-display text-black-500 text-3xl tracking-widest mb-6">
            CONTACT
          </h2>
          <div className="bg-silver-300 rounded-md px-6 py-5 space-y-2">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold">Alpha Owens</span> Jr Knights Program
              Director
            </p>
            <p className="text-gray-700">
              <a
                href="tel:8054326170"
                className="text-royal-600 font-bold underline hover:text-royal-500"
              >
                805-432-6170
              </a>
            </p>
            <p className="text-gray-700">
              <a
                href="mailto:kibou94@icloud.com"
                className="text-royal-600 font-bold underline hover:text-royal-500"
              >
                kibou94@icloud.com
              </a>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-silver-400 rounded-lg px-8 py-10 flex flex-col items-center gap-6 text-center">
          <h3 className="font-display text-black-500 text-3xl tracking-widest">
            READY TO JOIN THE KNIGHTS?
          </h3>
          <RegisterButtons />
          <p className="text-black-500/90 text-sm">
            Questions? Call{" "}
            <a
              href="tel:8054326170"
              className="text-royal-600 font-bold underline hover:text-royal-500"
            >
              805-432-6170
            </a>{" "}
            or email{" "}
            <a
              href="mailto:kibou94@icloud.com"
              className="text-royal-600 font-bold underline hover:text-royal-500"
            >
              kibou94@icloud.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
