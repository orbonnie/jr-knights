export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getSheetData } from "@/lib/sheets";
import RosterTabs from "./rosterTabs";
import type { Coach, JrkPlayer } from "@/types";

const VALID_GRADES = ["6th", "7th", "8th"] as const;
type Grade = (typeof VALID_GRADES)[number];

export default async function JrkRosterPage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade } = await params;
  if (!VALID_GRADES.includes(grade as Grade)) {
    notFound();
  }

  const [coaches, roster6, roster7, roster8] = await Promise.all([
    getSheetData("JRK-Coaches"),
    getSheetData("6th-Roster"),
    getSheetData("7th-Roster"),
    getSheetData("8th-Roster"),
  ]);

  return (
    <RosterTabs
      coaches={coaches as Coach[]}
      roster6={roster6 as JrkPlayer[]}
      roster7={roster7 as JrkPlayer[]}
      roster8={roster8 as JrkPlayer[]}
      activeGrade={grade as Grade}
    />
  );
}
