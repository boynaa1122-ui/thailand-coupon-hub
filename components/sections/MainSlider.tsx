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
    <div className="relative aspect-[16/6] w-full overflow-hidden rounded-md3md bg-neutral-100">
      <Image
        src={currentSlider.image_url}
        alt={currentSlider.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );

  return (
    <div className="container-page py-6">
      <div className="relative">
        {/* Slider */}
        <div className="relative overflow-hidden rounded-md3md">
          {currentSlider.link_url ? (
            <Link href={currentSlider.link_url}>{SlideContent}</Link>
          ) : (
            SlideContent
          )}

          {/* Navigation Buttons */}
          {sliders.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-900" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-neutral-900" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {sliders.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary-600"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
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
