"use client";

import { useHoverReset } from "@/hooks/useHoverReset";

const ORDER_FORM_URL = "https://forms.gle/Fbmt4UunfzzoRJga9";

export function OrderButton() {
  const orderHover = useHoverReset();

  return (
    <a
      href={ORDER_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={orderHover.onMouseEnter}
      onMouseLeave={orderHover.onMouseLeave}
      className={`mt-auto block text-center font-display tracking-widest uppercase px-6 py-3 rounded-xl transition-all duration-200 text-sm ${
        orderHover.hovered
          ? "bg-silver-300 text-royal-600"
          : "bg-black-500 text-white"
      }`}
    >
      Order Now
    </a>
  );
}

export function SubmitButton() {
  const bannerHover = useHoverReset();

  return (
    <a
      href={ORDER_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={bannerHover.onMouseEnter}
      onMouseLeave={bannerHover.onMouseLeave}
      className={`font-display tracking-widest uppercase px-10 py-4 rounded-xl transition-all duration-200 ${
        bannerHover.hovered
          ? "bg-silver-300 text-royal-600"
          : "bg-royal-600 text-white"
      }`}
    >
      Submit Banner Order
    </a>
  );
}
