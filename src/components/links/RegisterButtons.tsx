"use client";

import { useHoverReset } from "@/hooks/useHoverReset";

const MIDDLE_REGISTRATION_URL = "https://registration.teamsnap.com/form/48104";
const ELEMENTARY_REGISTRATION_URL =
  "https://app.amilia.com/store/en/city-of-roswell/shop/programs/128058?subCategoryIds=6626396";

export default function RegisterButtons({
  label = "Middle School Registration",
  hover = "bg-black-500 text-white",
}: {
  label?: string;
  hover?: string;
}) {
  const k5RegHover = useHoverReset();
  const msRegHover = useHoverReset();

  const regButtons = [
    {
      label: label,
      href: MIDDLE_REGISTRATION_URL,
      hook: msRegHover,
    },
    {
      label: "K–5th Registration",
      href: ELEMENTARY_REGISTRATION_URL,
      hook: k5RegHover,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {regButtons.map((button) => (
        <a
          key={button.label}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={button.hook.onMouseEnter}
          onMouseLeave={button.hook.onMouseLeave}
          className={`font-display tracking-widest uppercase px-8 py-4 w-full sm:w-64 rounded-xl transition-all duration-200 text-center ${
            button.hook.hovered ? hover : "bg-royal-600 text-white"
          }`}
        >
          {button.label}
        </a>
      ))}
    </div>
  );
}
