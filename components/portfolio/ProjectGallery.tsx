"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ProjectImage } from "@/data/portfolio-data";
import { Tooltip } from "@/components/portfolio/Tooltip";

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  if (images.length === 0) return null;

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <section
      className="case-gallery"
      aria-label="Project screenshots"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}
    >
      <div className="case-gallery-stage" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            className="case-gallery-image"
            key={images[activeIndex].src}
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={images[activeIndex].width}
              height={images[activeIndex].height}
              sizes="(max-width: 800px) 100vw, 92vw"
              priority={activeIndex === 0}
            />
          </motion.figure>
        </AnimatePresence>
        {images.length > 1 && <>
          <Tooltip label="Previous image">
            <button className="case-gallery-arrow previous" type="button" aria-label="Previous image" onClick={() => move(-1)}>←</button>
          </Tooltip>
          <Tooltip label="Next image">
            <button className="case-gallery-arrow next" type="button" aria-label="Next image" onClick={() => move(1)}>→</button>
          </Tooltip>
        </>}
        <span className="case-gallery-count">{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
      </div>
      {images.length > 1 && <div className="case-gallery-thumbs" aria-label="Choose a screenshot">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`case-gallery-thumb${index === activeIndex ? " active" : ""}`}
            aria-label={`Show image ${index + 1}: ${image.alt}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={image.src} alt="" width={image.width} height={image.height} sizes="160px" />
          </button>
        ))}
      </div>}
    </section>
  );
}
