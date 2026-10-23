"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "/banner2.png",
  "/2k-sip.jpg",
  "/mf-sakhi.jpg",
  "/mf-ginnie.jpg",
  "/5k-sip.jpg",
  "/banner11.jpeg",
  "/banner22.jpeg",
  "/banner33.jpeg",
  "/banner44.jpeg",
  "/banner55.jpeg",
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <>
      {/* Desktop Slider */}
      <div
        className="hidden md:block relative w-full max-w-2xl mx-auto group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glow Background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />

        <div className="relative rounded-3xl overflow-hidden bg-background/40">
          <div className="relative aspect-[16/12] w-full overflow-hidden">
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((src, index) => (
                <div key={index} className="relative min-w-full h-full flex-shrink-0">
                  <Image
                    src={src}
                    alt={`Dashboard ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === index
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-gray-400/60 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slider */}
      <div
        className="block md:hidden w-full relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="rounded-3xl overflow-hidden relative">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((src, index) => (
                <div key={index} className="relative min-w-full h-full flex-shrink-0">
                  <Image
                    src={src}
                    alt={`Dashboard ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Pagination Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === index
                      ? "w-5 h-1.5 bg-primary"
                      : "w-1.5 h-1.5 bg-gray-400/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
