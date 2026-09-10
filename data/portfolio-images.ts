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
    src: "/landing/interface.svg",
    alt: "Mobile interface design study",
    depth: 3,
    className: "cinema-card--interface",
    exit: { x: "-96vw", y: "-56vh", scale: 2.8, rotation: -7 },
  },
  {
    id: "portrait",
    src: "/landing/portrait.svg",
    alt: "Creative portrait placeholder",
    depth: 1,
    className: "cinema-card--portrait",
    exit: { x: "-23vw", y: "-112vh", scale: 1.45, rotation: 3 },
  },
  {
    id: "code",
    src: "/landing/code.svg",
    alt: "Software development workspace",
    depth: 2,
    className: "cinema-card--code",
    exit: { x: "89vw", y: "-70vh", scale: 2.05, rotation: 6 },
  },
  {
    id: "resilinav",
    src: "/landing/resilinav.svg",
    alt: "ResiliNav flood-resilient navigation project",
    depth: 2,
    featured: true,
    className: "cinema-card--featured",
    exit: { x: "0", y: "0", scale: 1, rotation: 0 },
  },
  {
    id: "graphic",
    src: "/landing/graphic.svg",
    alt: "Graphic design poster exploration",
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
    src: "/landing/film.svg",
    alt: "Video editing and visual storytelling",
    depth: 3,
    className: "cinema-card--film",
    exit: { x: "92vw", y: "83vh", scale: 2.55, rotation: -8 },
  },
  {
    id: "photo",
    src: "/landing/photo.svg",
    alt: "Photography study",
    depth: 2,
    className: "cinema-card--photo",
    exit: { x: "108vw", y: "12vh", scale: 2, rotation: 7 },
  },
];

