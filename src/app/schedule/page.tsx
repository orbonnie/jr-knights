export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/sheets";
import JrkScheduleClient from "./scheduleTabs";

export default async function JrkSchedulePage() {
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
    />
  );
}
