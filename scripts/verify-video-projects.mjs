import assert from "node:assert/strict";

const { videoProjects = [] } = await import("../data/portfolio-data.ts");

assert.equal(videoProjects.length, 4, "The portfolio should feature the four approved YouTube videos.");

const ids = new Set();
for (const video of videoProjects) {
  assert.ok(video.title, "Every video needs a title.");
  assert.equal(video.role, "Video Editor & Videographer", `${video.title} needs the approved role credit.`);
  assert.match(video.href, /^https:\/\/www\.youtube\.com\/watch\?v=/, `${video.title} needs a canonical YouTube link.`);
  assert.ok(!ids.has(video.id), `${video.id} appears more than once.`);
  ids.add(video.id);
}

console.log("Video portfolio contract verified.");
