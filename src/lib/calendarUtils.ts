export function getSubscribeUrls(calendarId: string) {
  const encoded = encodeURIComponent(calendarId);
  return {
    google: `https://calendar.google.com/calendar/r?cid=${encoded}`,
    apple: `webcal://calendar.google.com/calendar/ical/${encoded}/public/basic.ics`,
  };
}
