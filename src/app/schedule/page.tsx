export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/sheets";
import JrkScheduleClient from "./scheduleTabs";

export default async function JrkSchedulePage() {
  const [jrkSchedule, calendars] = await Promise.all([
    getSheetData("JRK-Schedule"),
    getSheetData("Calendars"),
  ]);

  return <JrkScheduleClient jrkSchedule={jrkSchedule} calendars={calendars} />;
}
