import assert from "node:assert/strict";
import { creativeAreas, creativeArchivePreviews, graphicDesignProjects, videoProjects } from "../data/portfolio-data.ts";

const expectedCategories = ["School", "Conference", "Logo"];

assert.equal(graphicDesignProjects.length, 20, "every supplied graphic-design asset should be represented");
assert.deepEqual(
  [...new Set(graphicDesignProjects.map((project) => project.category))].sort(),
  expectedCategories.sort(),
  "the gallery should retain the three supplied categories",
);
assert.ok(
  graphicDesignProjects.every((project) => project.src.startsWith("/graphic-design/")),
  "gallery images should be served from the public graphic-design directory",
);
assert.ok(
  graphicDesignProjects.every((project) => Number.isInteger(project.width) && project.width > 0 && Number.isInteger(project.height) && project.height > 0),
  "every artwork should expose its original dimensions so the gallery can preserve its natural ratio",
);
assert.deepEqual(
  creativeArchivePreviews.map(({ id, itemCount }) => ({ id, itemCount })),
  [
    { id: "graphic-design", itemCount: graphicDesignProjects.length },
    { id: "video-media", itemCount: videoProjects.length },
  ],
  "the homepage should expose compact previews that open both creative galleries",
);
assert.deepEqual(
  creativeAreas.map(({ title }) => title),
  ["Graphic Design", "Video & Media"],
  "the creative archive should expose only its two completed collections",
);

console.log("Graphic design gallery contract verified.");
