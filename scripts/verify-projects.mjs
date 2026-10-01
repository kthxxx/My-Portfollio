import assert from "node:assert/strict";
import { existsSync } from "node:fs";

process.on("warning", (warning) => {
  if (warning.code !== "MODULE_TYPELESS_PACKAGE_JSON") {
    console.warn(warning);
  }
});

const { projects } = await import("../data/portfolio-data.ts");

const expectedSlugs = [
  "seeds-of-life-global",
  "bible-voyagers",
  "lifevent",
  "sentinelai",
  "ridequest",
];

assert.deepEqual(
  projects.map((project) => project.slug),
  expectedSlugs,
  "The public portfolio should contain only the five approved projects in display order.",
);

for (const project of projects) {
  assert.ok(project.role, `${project.slug} needs a role description.`);
  assert.ok(project.detail, `${project.slug} needs a case-study overview.`);
  assert.ok(project.featuredImage, `${project.slug} needs a homepage image.`);
  assert.ok(project.mockupImage, `${project.slug} needs a project mockup.`);
  assert.ok(project.gallery.length > 0, `${project.slug} needs gallery media.`);

  for (const image of [project.featuredImage, ...project.gallery]) {
    assert.ok(image.src.startsWith("/projects/"), `${image.src} must use the public projects directory.`);
    assert.ok(image.alt.trim(), `${image.src} needs useful alternative text.`);
    assert.ok(existsSync(`public${image.src}`), `${image.src} is missing from public assets.`);
  }

  assert.ok(project.mockupImage.src.startsWith("/projects/mockups/"), `${project.slug} must use a public mockup.`);
  assert.ok(existsSync(`public${project.mockupImage.src}`), `${project.mockupImage.src} is missing from public assets.`);
}

const lifevent = projects.find((project) => project.slug === "lifevent");
assert.ok(lifevent, "LIFEVENT must be present.");
assert.equal(lifevent.gallery.length, 1, "LIFEVENT may expose only its approved landing page.");
assert.ok(
  lifevent.gallery.every((image) => image.src.includes("landing")),
  "LIFEVENT must not publish internal dashboard screenshots.",
);

console.log("Project portfolio contract verified.");
