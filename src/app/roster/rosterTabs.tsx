"use client";

import { useState } from "react";
import PlayerCard from "@/components/JrkPlayerCard";
import CoachCard from "@/components/CoachCard";
import type { Coach } from "@/types";
import type { JrkPlayer } from "@/types";

export default function RosterTabs({
  coaches,
  roster,
}: {
  coaches: Record<string, string>[];
  roster: Record<string, string>[];
}) {
  const [activeGrade, setActiveGrade] = useState("6th");

  const sixthCoaches = coaches.filter((c) => c.grade === "6th");
  const seventhCoaches = coaches.filter((c) => c.grade === "7th");
  const eighthCoaches = coaches.filter((c) => c.grade === "8th");

  const sixthRoster = roster.filter((p) => p.grade === "6th");
  const seventhRoster = roster.filter((p) => p.grade === "7th");
  const eighthRoster = roster.filter((p) => p.grade === "8th");

  const grades = [
    {
      id: "6th",
      label: "6th Grade",
      roster: sixthRoster,
      coaches: sixthCoaches,
    },
    {
      id: "7th",
      label: "7th Grade",
      roster: seventhRoster,
      coaches: seventhCoaches,
    },
    {
      id: "8th",
      label: "8th Grade",
      roster: eighthRoster,
      coaches: eighthCoaches,
    },
  ];

  const active = grades.find((g) => g.id === activeGrade)!;
  const aspect = active.coaches.every((c) => c.photo) ? "tall" : "short";

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-10">
          <p className="font-display text-silver-700 text-3xl tracking-widest mt-1 flex items-center gap-4">
            <span className="font-display text-royal-600 text-3xl tracking-[0.2em]">
              2026
            </span>
            JR KNIGHTS
          </p>
          <h1 className="font-display text-black-500 text-7xl tracking-widest">
            ROSTER
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 pb-0">
          {grades.map((grade) => (
            <button
              key={grade.id}
              onClick={() => setActiveGrade(grade.id)}
              className={`flex items-center gap-2 font-display tracking-widest uppercase text-sm px-6 py-3 rounded-t-xl transition-all duration-200 -mb-px ${
                activeGrade === grade.id
                  ? "bg-royal-600 text-white border-black-500"
                  : "bg-black-500 text-white border border-black-500/50 hover:bg-gray-500"
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>

        {/* Roster table */}
        <div className="rounded-b-2xl sm:rounded-2xl sm:rounded-tl-none overflow-hidden border border-gray-400">
          {/* Header */}
          <div className="bg-royal-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-white text-2xl tracking-widest">
                {active.label.toUpperCase()}
              </h2>
            </div>
            <span className="font-display text-silver-200 text-sm tracking-widest">
              {active.roster!.length} PLAYERS
            </span>
          </div>

          {/* Coaches */}
          {active.coaches.length > 0 && (
            <div className="bg-gray-50 border-b border-gray-400">
              <p className="font-display text-gray-500 text-sm tracking-[0.3em] uppercase px-6 pt-4 pb-2 border-b border-gray-400">
                Coaches
              </p>
              <div className="flex overflow-x-auto gap-2 sm:gap-4 px-3 sm:px-6 py-5">
                {active.coaches.map((coach, i) => (
                  <CoachCard key={i} coach={coach as Coach} aspect={aspect} />
                ))}
              </div>
            </div>
          )}

          {/* Players */}
          <p className="font-display text-gray-500 text-sm tracking-[0.3em] uppercase px-6 pt-4 pb-2 border-b border-gray-400 bg-gray-50">
            Players
          </p>

          {/* Column headers */}
          <div className="flex items-center gap-3 px-8 py-2 border-b border-gray-400 text-xs tracking-widest bg-gray-200 uppercase text-gray-700">
            <span className="font-display w-12 shrink-0">#</span>
            <span className="font-display flex-1">Name</span>
            <span className="font-display">Position</span>
          </div>

          {active.roster?.length > 0 ? (
            [...active.roster].map((player, i) => (
              <PlayerCard key={i} player={player as unknown as JrkPlayer} />
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="font-display text-silver-500 text-xl tracking-widest">
                ROSTER COMING SOON
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
