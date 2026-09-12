# KEITH.OS

Keith Justin Emeterio's creative technology portfolio. The site presents work across software development, interface design, and creative media through a cinematic, scroll-driven landing experience.

The opening sequence follows this progression:

`IMAGE COLLAGE → CAMERA ZOOM → FEATURED PROJECT → FULLSCREEN HERO → IDENTITY REVEAL → PORTFOLIO`

## Technology

- Next.js 15 App Router
- React 18 and TypeScript
- Tailwind CSS
- GSAP and ScrollTrigger
- Lenis smooth scrolling
- Motion
- Optional Supabase and Resend integrations

## Getting started

Use Node.js 20 or 22. Node.js 24 can cause filesystem and development-server problems with this version of Next.js on Windows.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project structure

```text
app/
  page.tsx                     Homepage route
  globals.css                  Site and cinematic landing styles
  terminal/                    Interactive portfolio terminal
  work/[slug]/                 Generated project detail pages

components/
  landing/CinematicHero.tsx    GSAP landing timeline and Lenis integration
  site/Portfolio.tsx           Existing portfolio sections

data/
  portfolio-data.ts            Profile, projects, skills, and contact content
  portfolio-images.ts          Landing image, depth, and exit configuration

public/landing/                Local landing artwork and project images
```

## Replacing the landing images

Landing artwork is stored in `public/landing/`. Replace the SVG placeholders with your own optimized WebP, AVIF, PNG, JPEG, or SVG files.

Update image paths and descriptions in `data/portfolio-images.ts`:

```ts
{
  id: "project-name",
  src: "/landing/project-name.webp",
  alt: "Description of the project image",
  depth: 2,
  className: "cinema-card--project-name",
  exit: {
    x: "90vw",
    y: "-70vh",
    scale: 2,
    rotation: 4,
  },
}
```

The current featured hero is `public/photos/keith-hero.webp`. To select another image, move `featured: true` to that image's configuration. Only one image should be featured.

## Adjusting the animation

The primary timeline is in `components/landing/CinematicHero.tsx`.

- Increase the ScrollTrigger `end` distance to make the sequence require more scrolling and feel slower.
- Decrease `end` to shorten the sequence.
- Adjust `scrub` to control how quickly the animation catches up with scrolling.
- Change each image's `depth`, `exit.x`, `exit.y`, `exit.scale`, and `exit.rotation` in `data/portfolio-images.ts` to reshape the camera movement.

Initial collage positions and responsive sizes are in the `Cinematic landing` section of `app/globals.css`.

## Responsive and accessible behavior

- Desktop displays the complete collage.
- Mobile uses a reduced five-image composition.
- Breakpoint changes rebuild the GSAP timeline cleanly.
- `prefers-reduced-motion` skips the camera sequence and displays the final hero immediately.
- The hero CTA and navigation remain keyboard accessible.
- GSAP timelines, ScrollTriggers, Lenis listeners, and ticker callbacks are cleaned up when the component unmounts.

## Environment variables

Copy `.env.example` to `.env.local` and fill in only the services you use:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

RESEND_API_KEY=
```

Supabase powers the optional guestbook API. Resend powers the optional contact API. The portfolio can run without either service configured.

## Routes

- `/` — cinematic landing and portfolio
- `/work/[slug]` — generated project detail pages
- `/terminal` — interactive portfolio terminal
- `/api/contact` — optional Resend contact endpoint
- `/api/guestbook` — optional Supabase guestbook endpoint

## Troubleshooting on Windows

If `next dev` or `next build` reports `EISDIR`, `readlink`, `.next/trace`, or unexplained permission errors:

1. Confirm that Node.js 20 or 22 is active with `node --version`.
2. Stop running Next.js processes.
3. Delete the generated `.next` directory.
4. Run `npm install` and start the project again.
5. If the repository is on an external or virtual drive, move a clean copy to a normal local NTFS directory and retry.

The development command uses Turbopack because the legacy webpack watcher can return false `readlink` errors for this project on the F: drive.

The source currently passes TypeScript, ESLint, and a complete Next.js production build under Node.js 22.

## Content

Portfolio copy and project information live in `data/portfolio-data.ts`. Replace the marked project media and public profile links with verified work before publishing.

Set `NEXT_PUBLIC_SITE_URL` to the final production URL when deploying.
