import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";

export type Coach = {
  name: string;
  role: string;
  grade: "6th" | "7th" | "8th";
  photo?: string;
};

export default function CoachCard({
  coach,
  aspect,
}: {
  coach: Coach;
  aspect: string;
}) {
  return (
    <div
      className={`relative w-36 sm:w-40 rounded-lg overflow-hidden border border-gray-300 bg-royal-600 shrink-0 ${
        aspect === "tall" ? "aspect-[4/5]" : "aspect-[4/1.5]"
      }`}
    >
      {coach.photo && (
        <Image
          src={cloudinaryUrl(coach.photo)}
          alt={coach.name}
          fill
          className="object-cover object-top"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div
        className={`absolute inset-0 z-10 flex flex-col justify-end ${
          aspect === "tall" ? "" : "p-1.5 sm:p-3"
        }`}
      >
        <div
          className={
            aspect === "tall" ? "bg-royal-600/90 w-full px-3 py-2" : ""
          }
        >
          <p className="font-display text-white text-sm leading-tight tracking-wider">
            {coach.name.toUpperCase()}
          </p>
          <p className="text-white/60 text-[8px] tracking-widest mt-1">
            {coach.role.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
