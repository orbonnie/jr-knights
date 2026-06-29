export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/sheets";
import RosterTabs from "./rosterTabs";

export default async function JrkRosterPage() {
  const [coaches, roster6, roster7, roster8] = await Promise.all([
    getSheetData("JRK-Coaches"),
    getSheetData("6th-Roster"),
    getSheetData("7th-Roster"),
    getSheetData("8th-Roster"),
  ]);

  return (
    <RosterTabs
      coaches={coaches}
      roster6={roster6}
      roster7={roster7}
      roster8={roster8}
    />
  );
}
