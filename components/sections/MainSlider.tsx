"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Slider } from "@/types";

interface MainSliderProps {
  sliders: Slider[];
}

export function MainSlider({ sliders }: MainSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || sliders.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, sliders.length]);

  if (sliders.length === 0) return null;

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const currentSlider = sliders[currentSlide];
  const SlideContent = (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-md3md bg-neutral-100 shadow-elevation3 sm:aspect-[21/9]">
      <Image
        src={currentSlider.image_url}
        alt={currentSlider.title}
        fill
        className="object-cover transition-transform duration-1000"
        priority
      />
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      
      {/* Optional Title Overlay */}
      <div className="absolute bottom-8 left-8 z-10 hidden sm:block">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">{currentSlider.title}</h2>
      </div>
    </div>
  );

  return (
    <div className="container-page py-4">
      <div className="relative group">
        {/* Slider Container */}
        <div className="relative overflow-hidden rounded-md3md">
          {currentSlider.link_url ? (
            <Link href={currentSlider.link_url}>{SlideContent}</Link>
          ) : (
            SlideContent
          )}

          {/* Navigation Buttons (Visible on Hover) */}
          {sliders.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-neutral-900 shadow-elevation3 opacity-0 transition-all group-hover:opacity-100 hover:bg-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-neutral-900 shadow-elevation3 opacity-0 transition-all group-hover:opacity-100 hover:bg-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Progress Dots */}
        {sliders.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
