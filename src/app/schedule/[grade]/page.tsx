export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getSheetData } from "@/lib/sheets";
import JrkScheduleClient from "./scheduleTabs";

const VALID_GRADES = ["6th", "7th", "8th"] as const;
type Grade = (typeof VALID_GRADES)[number];

export default async function JrkSchedulePage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade } = await params;

  if (!VALID_GRADES.includes(grade as Grade)) {
    notFound();
  }

  const [schedule6, schedule7, schedule8, calendars] = await Promise.all([
    getSheetData("6th-Schedule"),
    getSheetData("7th-Schedule"),
    getSheetData("8th-Schedule"),
    getSheetData("Calendars"),
  ]);

  return (
    <JrkScheduleClient
      schedule6={schedule6}
      schedule7={schedule7}
      schedule8={schedule8}
      calendars={calendars}
      activeGrade={grade as Grade}
    />
  );
}
