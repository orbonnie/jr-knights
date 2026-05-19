export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/sheets";
import RosterTabs from "./rosterTabs";

export default async function JrkRosterPage() {
  const [coaches, roster] = await Promise.all([
    getSheetData("JRK-Coaches"),
    getSheetData("JRK-Roster"),
  ]);

  return <RosterTabs coaches={coaches} roster={roster} />;
}
