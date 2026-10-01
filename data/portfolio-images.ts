export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  depth: 1 | 2 | 3 | 4;
  featured?: boolean;
  className: string;
  exit: {
    x: string;
    y: string;
    scale: number;
    rotation: number;
  };
}

/**
 * The landing collage is controlled from this single list. Replace `src` with
 * your own image while keeping the id/className to preserve the composition.
 */
export const portfolioImages: PortfolioImage[] = [
  {
    id: "interface",
    src: "/landing/developer-workspace.jpg",
    alt: "Developer working at a multi-monitor workspace",
    depth: 3,
    className: "cinema-card--interface",
    exit: { x: "-96vw", y: "-56vh", scale: 2.8, rotation: -7 },
  },
  {
    id: "portrait",
    src: "/landing/keith-conference.jpg",
    alt: "Keith Justin Emeterio at a leadership conference",
    depth: 1,
    className: "cinema-card--portrait",
    exit: { x: "-23vw", y: "-112vh", scale: 1.45, rotation: 3 },
  },
  {
    id: "code",
    src: "/landing/manila-workspace.jpg",
    alt: "Creative laptop workspace in Manila, Philippines",
    depth: 2,
    className: "cinema-card--code",
    exit: { x: "89vw", y: "-70vh", scale: 2.05, rotation: 6 },
  },
  {
    id: "keith-portrait",
    src: "/photos/keith-hero.webp",
    alt: "Portrait of Keith Justin Emeterio in a dark creative studio",
    depth: 2,
    featured: true,
    className: "cinema-card--featured",
    exit: { x: "0", y: "0", scale: 1, rotation: 0 },
  },
  {
    id: "graphic",
    src: "/landing/photography-workspace.jpg",
    alt: "Photography and visual editing workspace",
    depth: 4,
    className: "cinema-card--graphic",
    exit: { x: "-108vw", y: "40vh", scale: 3.25, rotation: 9 },
  },
  {
    id: "mobile",
    src: "/landing/mobile.svg",
    alt: "Mobile application prototype",
    depth: 1,
    className: "cinema-card--mobile",
    exit: { x: "-18vw", y: "105vh", scale: 1.5, rotation: -5 },
  },
  {
    id: "film",
    src: "/landing/keith-bass.jpg",
    alt: "Keith Justin Emeterio performing bass guitar",
    depth: 3,
    className: "cinema-card--film",
    exit: { x: "92vw", y: "83vh", scale: 2.55, rotation: -8 },
  },
  {
    id: "photo",
    src: "/projects/mockups/seeds-of-life-global.png",
    alt: "Seeds of Life Global website displayed in a laptop mockup",
    depth: 2,
    className: "cinema-card--photo",
    exit: { x: "108vw", y: "12vh", scale: 2, rotation: 7 },
  },
];

export const heroCollageImages = portfolioImages.filter(
  (image) => !image.featured && !["interface", "code", "mobile"].includes(image.id),
);
