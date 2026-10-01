# Portfolio Interaction Upgrades

## Intent

Turn the portfolio from a polished gallery into a clearer evidence-led case-study experience. The additions must retain the existing `KEITH.OS` cinematic, editorial, dark interface rather than introducing a generic component-library look.

## Approved scope

1. Add an inline contact form to the existing contact section. It collects a reply email and message, posts to the existing `/api/contact` endpoint, reports validation/server outcomes inline, and presents a brief success toast. Existing direct-contact, social, CV, and terminal links remain available.
2. Add a thumbnail-driven screenshot carousel to each project page. It starts on the existing project mockup, exposes all project screenshots available in portfolio data, supports previous/next buttons, clickable thumbnails, visible position feedback, and keyboard navigation when focused.
3. Replace the Creative Archive's two launch cards with a single archive dialog containing animated tabs for Graphic Design and Video & Media. Existing Escape key and overlay-close behavior are retained; the active tab is keyboard accessible.
4. Add expandable case-study notes beneath the project overview. Each project supplies Problem, Approach, and Outcome content. Only one note is expanded at a time; the first is expanded initially.
5. Add non-intrusive tooltips to icon-only controls introduced by this work, such as carousel navigation and close buttons. They must also provide accessible names and work by keyboard focus.

## Architecture

The portfolio remains a client-led homepage plus server-rendered project pages. Reusable interaction modules live under `components/portfolio/`, while project-specific narrative and gallery data remain in `data/portfolio-data.ts`. The homepage composes a `ContactForm` and archive tabs; the project page composes a client `ProjectGallery` and `CaseStudyNotes` around the existing static metadata.

No Watermelon UI registry code is installed. The project uses Tailwind 3 while Watermelon targets Tailwind 4, so the selected interaction patterns will be implemented with the already-installed `motion`, React, and local styling to avoid a framework upgrade or visual mismatch.

## Components and contracts

### `ContactForm`

- Controlled `fromEmail` and `message` fields.
- On submit, POST `{ fromEmail, message }` to `/api/contact`.
- Disable submission while pending.
- Render returned error text in an `aria-live` status region.
- On `{ ok: true }`, clear fields and show a temporary `Message sent` toast; no external email client opens.
- Preserve the existing mailto/social/CV/terminal links next to the form.

### `ProjectGallery`

- Accepts `images: PortfolioImage[]` where every image has `src`, `alt`, `width`, and `height`.
- Renders one active large image, labelled previous/next buttons, numbered progress, and thumbnail buttons.
- Previous/next wraps at either end. ArrowLeft and ArrowRight advance only while the gallery has focus.
- Uses subtle crossfade/slide motion; reduced-motion users get an immediate image swap.

### `CaseStudyNotes`

- Accepts exactly three notes: Problem, Approach, Outcome.
- Renders an accessible accordion. The Problem panel begins expanded and choosing another panel closes the previously open panel.
- Project detail data contains concise copy for all three fields, so no placeholder content is added.

### `CreativeArchive`

- Reuses the existing archive dialog and image/video renderers.
- Has two tabs, `Graphic Design` and `Video & Media`; the selected tab controls which archive body is mounted.
- Dialog close actions retain click-outside and Escape behavior, restore body scrolling, and return focus to the launcher.

### `Tooltip`

- A small internal primitive used only by icon-only controls added or changed in this scope.
- Opens on pointer hover and keyboard focus, uses `role="tooltip"`, and never hides an action's accessible label.

## Data changes

Extend every project record with:

```ts
gallery: PortfolioImage[]
caseStudy: {
  problem: string
  approach: string
  outcome: string
}
```

The existing mockup image is the first gallery image. Additional local screenshots from `public/projects/<project>/` follow it. Images without a corresponding project page are not introduced.

## Visual and accessibility constraints

- Keep current `--ink`, `--paper`, `--acid`, mono labels, thin borders, and large editorial typography.
- Do not add rounded shadcn-style cards, a new page-wide navigation pattern, or a replacement hero.
- All controls are reachable by keyboard, have visible focus treatment, and have text-based accessible labels.
- Respect `prefers-reduced-motion`.
- Layout must remain usable at 800px and below.

## Error handling

- Client-side submit errors remain visible without clearing user input.
- The missing `RESEND_API_KEY` response remains a human-readable inline state; it is not treated as successful delivery.
- Gallery/accordion state stays local and does not alter routing.

## Verification

- Add focused tests for contact submit states, gallery wrapping and keyboard behavior, notes accordion behavior, and archive tab selection.
- Run existing project, creative archive, and hero verification scripts plus lint and production build.
- Manually inspect desktop and mobile layouts, including reduced-motion behavior.

## Out of scope

- Tailwind upgrade, Watermelon CLI installation, dashboard/data-table additions, external analytics, CMS work, and redesigning the current hero/navigation.
