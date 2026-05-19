export const dynamic = "force-dynamic";

import Sponsors, { Sponsor } from "@/components/Sponsors";
import type { Metadata } from "next";
import { getSheetData } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Sponsors | Centennial Knights Football",
};

export default async function SponsorsPage() {
  const sponsors = (await getSheetData("Sponsors")) as unknown as Sponsor[];

  return (
    <main className="min-h-screen bg-silver-300 pt-24">
      <Sponsors sponsors={sponsors} />
    </main>
  );
}
