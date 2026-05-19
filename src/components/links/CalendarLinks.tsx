"use client";

import { useHoverReset } from "@/hooks/useHoverReset";
import { getSubscribeUrls } from "@/lib/calendarUtils";

export default function CalendarLinks({
  calId,
  labels = false,
  shrink = false,
  hover = "bg-royal-600 text-white",
  unhover = "bg-white text-royal-600",
}: {
  calId: string;
  labels?: boolean;
  shrink?: boolean;
  hover?: string;
  unhover?: string;
}) {
  const googleHover = useHoverReset();
  const appleHover = useHoverReset();

  const urls = getSubscribeUrls(calId);

  const GoogleIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  );

  const AppleIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );

  return (
    <div className="flex gap-2 ml-auto">
      <a
        href={urls.google}
        target="_blank"
        rel="noopener noreferrer"
        title="Subscribe on Google"
        onMouseEnter={googleHover.onMouseEnter}
        onMouseLeave={googleHover.onMouseLeave}
        className={`flex-1 flex items-center justify-center gap-1.5 font-display tracking-widest uppercase text-xs ${
          shrink ? "px-1.5 sm:px-3" : "px-3"
        } py-1.5 rounded-lg border border-royal-600/30 transition-colors ${
          googleHover.hovered ? hover : unhover
        }`}
      >
        <GoogleIcon /> {labels ? "Google" : ""}
      </a>
      <a
        href={urls.apple}
        title="Subscribe on Apple"
        onMouseEnter={appleHover.onMouseEnter}
        onMouseLeave={appleHover.onMouseLeave}
        className={`flex-1 flex items-center justify-center gap-1.5 font-display tracking-widest uppercase text-xs ${
          shrink ? "px-1.5 sm:px-3" : "px-3"
        } py-1.5 rounded-lg border border-royal-600/30 transition-colors ${
          appleHover.hovered ? hover : unhover
        }`}
      >
        <AppleIcon /> {labels ? "Apple" : ""}
      </a>
    </div>
  );
}
