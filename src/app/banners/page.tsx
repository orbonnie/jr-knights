import type { Metadata } from "next";
import { OrderButton, SubmitButton } from "@/components/links/BannerButtons";

export const metadata: Metadata = {
  title: "Banners | Centennial Knights Football",
};

const banners = [
  {
    size: "Small",
    dimensions: "2x4",
    price: "$350",
    credit: "$200",
    description:
      "A great option for individuals and small businesses. Displayed prominently at home games throughout the season.",
  },
  {
    size: "Large",
    dimensions: "4x6",
    price: "$500",
    credit: "$400",
    description:
      "Maximum visibility for your business. Our largest banner size, guaranteed to stand out on game night.",
  },
];

const steps = [
  {
    step: "01",
    title: "Find a Sponsor",
    description:
      "Reach out to local businesses, family friends, or anyone who wants to support Knights football.",
  },
  {
    step: "02",
    title: "Choose a Size",
    description:
      "Work with your sponsor to select the banner size that fits their needs and budget.",
  },
  {
    step: "03",
    title: "Submit the Order",
    description:
      "Have your sponsor complete the order form before the July 1 deadline. Payment is collected at time of order.",
  },
  {
    step: "04",
    title: "Earn Your Credit",
    description:
      "Credits are applied directly to your player dues. $200 for a 2×4 and $400 for a 4×6.",
  },
];

export default function BannersPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-4">
          <p className="font-display text-royal-600 text-3xl tracking-[0.4em] uppercase mb-2">
            Fundraising
          </p>
          <h1 className="font-display text-black-500 text-7xl md:text-8xl tracking-widest leading-none">
            BANNERS
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-xl leading-relaxed mb-16">
          Sell sponsorship banners to local businesses and earn credits directly
          toward your player dues. Every banner sold puts money back in your
          account.
        </p>

        {/* Deadline banner */}
        <div className="border border-royal-600/30 bg-royal-600/5 rounded-2xl px-6 py-4 mb-12 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-display text-royal-600 text-sm tracking-widest uppercase shrink-0">
            Deadline
          </span>
          <span className="text-gray-400 hidden sm:block">|</span>
          <span className="text-gray-700 text-sm">
            All orders must be submitted and paid by{" "}
            <span className="text-royal-600 font-bold">July 1, 2026</span> to
            guarantee placement for the season.
          </span>
        </div>

        {/* Banner cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {banners.map((banner) => (
            <div
              key={banner.size}
              className="bg-royal-600 rounded-2xl px-8 py-8 flex flex-col gap-6"
            >
              <div>
                <p className="font-display text-white/60 text-lg tracking-widest uppercase mb-2">
                  Banner Size
                </p>
                <p className="font-display text-white text-5xl tracking-widest">
                  {banner.size}
                </p>
                <p className="font-display text-white/60 text-3xl tracking-widest uppercase mt-2">
                  {banner.dimensions}
                </p>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {banner.description}
              </p>
              <div className="border-t border-white/20 pt-6 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-display text-white/80 text-xs tracking-widest uppercase mb-1">
                    Sponsor Price
                  </p>
                  <p className="font-display text-white text-2xl tracking-widest">
                    {banner.price}
                  </p>
                </div>
                <div>
                  <p className="font-display text-white/80 text-xs tracking-widest uppercase mb-1">
                    Player Credit
                  </p>
                  <p className="font-display text-white text-2xl tracking-widest">
                    {banner.credit}
                  </p>
                </div>
              </div>
              <OrderButton />
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-20">
          <h2 className="font-display text-black-500 text-4xl tracking-widest mb-8">
            HOW IT WORKS
          </h2>
          <div className="space-y-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex gap-6 items-start bg-gray-50 rounded-2xl px-6 py-5"
              >
                <span className="font-display text-royal-600 text-3xl tracking-widest shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="font-display text-black-500 text-lg tracking-widest">
                    {s.title.toUpperCase()}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mt-1">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* At a glance */}
        <div className="mb-20">
          <p className="font-display text-royal-600 text-sm tracking-[0.4em] uppercase mb-2">
            Summary
          </p>
          <h2 className="font-display text-black-500 text-4xl tracking-widest mb-8">
            AT A GLANCE
          </h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-3 bg-black-500 px-6 py-3 font-display text-xs tracking-widest uppercase text-white">
              <span>Size</span>
              <span className="text-center">Sponsor Price</span>
              <span className="text-center">Player Credit</span>
            </div>
            {banners.map((banner, i) => (
              <div
                key={banner.size}
                className={`grid grid-cols-3 px-6 py-4 border-t border-gray-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <span className="font-display text-black-500 tracking-widest">
                  {banner.size}
                </span>
                <span className="text-center text-gray-600">
                  {banner.price}
                </span>
                <span className="text-center text-royal-600 font-bold">
                  {banner.credit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-black-500 rounded-2xl px-8 py-12 flex flex-col items-center gap-6 text-center">
          <p className="font-display text-royal-400 text-sm tracking-[0.4em] uppercase">
            Get Involved
          </p>
          <h3 className="font-display text-white text-4xl tracking-widest">
            READY TO SELL?
          </h3>
          <p className="text-silver-400 text-sm max-w-md leading-relaxed">
            Submit your banner order before July 1, 2026. Every banner sold puts
            money directly back into your player's account.
          </p>
          <SubmitButton />
          <p className="text-silver-500 text-sm">
            Questions? Contact us at{" "}
            <a
              href="mailto:Centennialfootballpartners@gmail.com"
              className="text-white underline"
            >
              Centennialfootballpartners@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
