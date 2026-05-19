// lib/sheets.ts
import { google } from "googleapis";
import { unstable_cache } from "next/cache";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function fetchSheetData(sheetName: string, range: string) {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.DATA_GOOGLE_SHEET_ID,
    range: `${sheetName}!${range}`,
  });

  const [headers, ...rows] = res.data.values ?? [];
  if (!headers) return [];

  return rows.map((row) =>
    Object.fromEntries(
      headers.map((h: string, i: number) => [h, row[i] ?? ""]),
    ),
  );
}

export function getSheetData(sheetName: string, range = "A:Z") {
  return unstable_cache(() => fetchSheetData(sheetName, range), [sheetName], {
    revalidate: 60,
    tags: [sheetName.toLowerCase()],
  })();
}
