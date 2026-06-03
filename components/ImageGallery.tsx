"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryItem {
  src: string;
  label: string;
}

interface ImageGalleryProps {
  items: GalleryItem[];
}

export default function ImageGallery({ items }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;

  const goTo = useCallback(
    (direction: "prev" | "next") => {
      if (selectedIndex === null) return;
      if (direction === "prev") {
        setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1);
      } else {
        setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
      }
    },
    [selectedIndex, items.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") goTo("prev");
      if (e.key === "ArrowRight") goTo("next");
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, goTo]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="glass-card rounded-xl overflow-hidden group hover:border-blue-400/60 transition-all duration-300 cursor-pointer text-left relative"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              {/* Zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium">{item.label}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
            {selectedIndex + 1} / {items.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo("prev");
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo("next");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image */}
          <div
            className="relative w-[90vw] h-[80vh] max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[selectedIndex].src}
              alt={items[selectedIndex].label}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Label */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 text-white text-center max-w-lg">
            <p className="font-medium">{items[selectedIndex].label}</p>
          </div>
        </div>
      )}
    </>
  );
}
