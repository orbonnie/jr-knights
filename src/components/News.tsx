"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsStory } from "@/types";

export default function News({
  news,
  divBg = "silver-300",
  reelBg = "white",
}: {
  news: NewsStory[];
  divBg?: string;
  reelBg?: string;
}) {
  const slides = [...news, news[0]];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const throttleRef = useRef(false);

  const throttledNav = (fn: () => void) => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    fn();
    setTimeout(() => {
      throttleRef.current = false;
    }, 750); // matches transition duration
  };

  const next = () => {
    throttledNav(() => setIndex((prev) => prev + 1));
  };

  const prev = () => {
    throttledNav(() => {
      if (index === 0) {
        setTransitionEnabled(false);
        setIndex(news.length - 1);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
        return;
      }
      setIndex((prev) => prev - 1);
    });
  };

  // Auto advance
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      next();
    }, 6000);

    return () => clearInterval(interval);
  }, [paused]);

  // seamless reset after cloned first slide
  useEffect(() => {
    if (index === news.length) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [index, news.length]);

  return (
    <section className={`bg-${divBg} py-16 px-6`}>
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-4">
          <p className="font-display text-royal-600 text-xl tracking-[0.4em] mb-2">
            STAY
          </p>

          <h2 className="font-display text-black-500 text-6xl tracking-widest">
            INFORMED
          </h2>
        </div>

        {/* CAROUSEL */}
        <div
          className={`relative overflow-hidden max-w-3xl mx-auto rounded-3xl bg-${reelBg} border border-black/5 shadow-sm`}
          // onMouseEnter={() => setPaused(true)}
          // onMouseLeave={() => setPaused(false)}
        >
          <button
            onClick={() => setPaused((prev) => !prev)}
            className="absolute top-3 sm:top-6 left-3 sm:left-6 z-40
                      bg-black-500/60 hover:bg-black-500/80
                      text-white rounded-full
                      w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center
                      transition"
            aria-label={paused ? "Play carousel" : "Pause carousel"}
          >
            {paused ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            )}
          </button>

          {/* TRACK */}
          <div
            className={`flex w-full ${
              transitionEnabled
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {slides.map((item, i) => (
              <Link
                key={`${item.title}-${i}`}
                href={item.href}
                className="min-w-full w-full flex-shrink-0"
              >
                {/* IMAGE */}
                <div className="pt-8 flex justify-center">
                  <div className="relative w-3/4 aspect-[16/7] overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="75vw"
                      className="object-contain"
                      priority={i === 0}
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-10 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-royal-600 mb-4">
                    {item.date}
                  </p>

                  <h3 className="font-display text-4xl text-black-500 leading-none tracking-wide">
                    {item.title}
                  </h3>

                  <p className="mt-6 text-black-500/70 text-base leading-relaxed max-w-3xl mx-auto">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="absolute left-0 sm:left-16 top-1/2 -translate-y-1/2 z-30
                      flex items-center justify-center
                      text-black-500/90
                      transition-all duration-200
                      hover:scale-110"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="absolute right-0 sm:right-16 top-1/2 -translate-y-1/2 z-30
                      flex items-center justify-center
                      text-black-500/90
                      transition-all duration-200
                      hover:scale-110"
            aria-label="Next story"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-6">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to story ${i + 1}`}
              className={`rounded-full transition-all ${
                i === index
                  ? "bg-royal-600 w-3.5 h-3.5 scale-110"
                  : "bg-black-500/40 w-2.5 h-2.5 hover:bg-black-500/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
