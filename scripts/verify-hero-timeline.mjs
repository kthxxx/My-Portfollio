import assert from "node:assert/strict";
import { heroScrollDistance } from "../data/hero-motion.ts";
import { portfolioImages } from "../data/portfolio-images.ts";

assert.deepEqual(
  heroScrollDistance,
  { desktop: 150, mobile: 120 },
  "the hero should complete quickly instead of pinning visitors for multiple screen-heights",
);
assert.deepEqual(
  portfolioImages
    .filter((image) => ["interface", "code", "graphic"].includes(image.id))
    .map(({ src }) => src),
  [
    "/landing/developer-workspace.jpg",
    "/landing/manila-workspace.jpg",
    "/landing/photography-workspace.jpg",
  ],
  "the hero collage should use the approved workspace photos instead of placeholder illustrations",
);
assert.deepEqual(
  portfolioImages
    .filter((image) => ["portrait", "film", "photo"].includes(image.id))
    .map(({ src }) => src),
  [
    "/landing/keith-conference.jpg",
    "/landing/keith-bass.jpg",
    "/projects/mockups/seeds-of-life-global.png",
  ],
  "the supplied hero photos and Seeds of Life Global laptop mockup should appear in the supporting collage",
);
assert.equal(
  portfolioImages.find((image) => image.featured)?.src,
  "/photos/keith-hero.webp",
  "the original featured hero image must remain the main hero",
);

console.log("Hero timeline contract verified.");
