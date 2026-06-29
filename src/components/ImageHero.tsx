import Image from "next/image";
import MarqueeBanner from "./MarqueeBanner";

export default function HeroImage() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/fortress.jpg"
          alt="Jr Knights players"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/50" />
        {/* Bottom gradient fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black-500 to-transparent" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <p
          className="font-display text-black-500 text-2xl tracking-[0.5em] mb-4 animate-fade-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          Centennial Knights Football
        </p>
        <h2
          className="font-display text-black-500 text-[clamp(5rem,18vw,14rem)] leading-none tracking-wider animate-fade-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          JR
        </h2>
        <h2
          className="font-display text-black-500 text-[clamp(5rem,18vw,14rem)] leading-none tracking-wider animate-fade-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          KNIGHTS
        </h2>
        <p
          className="font-display font-semibold text-royal-600 text-2xl tracking-[0.3em] mt-4 animate-fade-up opacity-0"
          style={{
            animationDelay: "400ms",
            animationFillMode: "forwards",
          }}
        >
          Building the Future
        </p>
      </div>
      <div className="relative z-10">
        <MarqueeBanner />
      </div>
    </section>
  );
}
