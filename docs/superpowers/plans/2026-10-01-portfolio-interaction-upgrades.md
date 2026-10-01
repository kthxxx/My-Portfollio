# Portfolio Interaction Upgrades Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a working contact form, project galleries and case-study notes, tabbed creative archive, and accessible tooltip polish without changing the portfolio's visual identity.

**Architecture:** New client interaction components live in `components/portfolio/`, with small pure state helpers kept alongside them for direct tests. `data/portfolio-data.ts` remains the sole source of case-study and gallery content. The existing homepage and project page compose the new modules, while `app/globals.css` provides the KEITH.OS-compatible layout and reduced-motion rules.

**Tech Stack:** Next.js 15, React 18, TypeScript, Motion, Tailwind CSS 3, CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-01-portfolio-interaction-upgrades-design.md`

## Global Constraints

- Preserve the existing `--ink`, `--paper`, `--acid`, mono labels, thin borders, and editorial type; do not import Watermelon registry code or upgrade Tailwind.
- Keep existing direct-contact/social/CV/terminal links and current project/archive content.
- All added controls require visible keyboard focus and text-based accessible labels.
- Respect `prefers-reduced-motion`; no animation is essential to operation.
- Do not expose unapproved LIFEVENT internal screenshots.
- Work only on top of the current dirty worktree; do not revert unrelated user changes.

## Review Focus

- An unavailable Resend key must show a failed-send message and retain the form values.
- Gallery navigation must wrap correctly from first to last and last to first.
- Keyboard arrows must change a gallery only while its gallery container is focused.
- An archive dialog must restore body scrolling and return focus to its launcher after Escape or close.
- The narrow mobile layout must retain usable thumbnails, note panels, and contact form controls.

---

### Task 1: Establish interaction-test tooling

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/portfolio-smoke.test.tsx`

**Interfaces:**
- Produces: `npm test` runs jsdom component tests and `npm run test:watch` runs Vitest interactively.

- [ ] **Step 1: Write a failing smoke test**

Create `tests/portfolio-smoke.test.tsx` that imports `@testing-library/react` and asserts a deliberately missing test marker. The test must describe the intended client-component testing environment.

- [ ] **Step 2: Run the test to verify it fails because Vitest is not configured**

Run: `npm test -- --run tests/portfolio-smoke.test.tsx`

Expected: FAIL because the test runner/script is unavailable.

- [ ] **Step 3: Add the minimal test harness**

Add `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, and `@testing-library/jest-dom` as development dependencies. Add `test` and `test:watch` scripts. Configure Vitest for jsdom, `@/` aliases, TypeScript/React transforms, and the setup file that imports `@testing-library/jest-dom/vitest`.

- [ ] **Step 4: Replace the temporary assertion with a passing rendered-button smoke test**

Render a simple test button using Testing Library and assert it is visible. This proves the runner can render React, not merely execute Node assertions.

- [ ] **Step 5: Run the smoke test**

Run: `npm test -- --run tests/portfolio-smoke.test.tsx`

Expected: PASS with one test.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tests/setup.ts tests/portfolio-smoke.test.tsx
git commit -m "test: add portfolio interaction test harness"
```

### Task 2: Complete and verify portfolio case-study data

**Files:**
- Modify: `data/portfolio-data.ts`
- Modify: `scripts/verify-projects.mjs`

**Interfaces:**
- Produces: `Project.caseStudy: { problem: string; approach: string; outcome: string }` for every project.
- Consumes: existing `Project.gallery` and project assets.

- [ ] **Step 1: Write failing project-contract assertions**

In `scripts/verify-projects.mjs`, assert that every project has non-empty `caseStudy.problem`, `caseStudy.approach`, and `caseStudy.outcome`, and that the existing mockup is the first `gallery` item. Keep the existing LIFEVENT privacy assertion.

- [ ] **Step 2: Run the contract to verify it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/verify-projects.mjs`

Expected: FAIL because `caseStudy` does not yet exist and gallery ordering does not begin with `mockupImage`.

- [ ] **Step 3: Extend the `Project` type and all five project records**

Add the exact `caseStudy` shape above. Insert each existing `mockupImage` as `gallery[0]`, then retain the approved public screenshots. Write concise, factual Problem/Approach/Outcome copy based only on each record's existing detail and status.

- [ ] **Step 4: Re-run the project contract**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/verify-projects.mjs`

Expected: PASS and confirms all public gallery assets exist.

- [ ] **Step 5: Commit**

```bash
git add data/portfolio-data.ts scripts/verify-projects.mjs
git commit -m "feat: add case-study data and gallery coverage"
```

### Task 3: Build and test the contact form and toast

**Files:**
- Create: `components/portfolio/ContactForm.tsx`
- Create: `components/portfolio/ContactForm.test.tsx`
- Modify: `components/site/Portfolio.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `<ContactForm />`, which POSTs `{ fromEmail: string, message: string }` to `/api/contact`.
- Consumes: browser `fetch`, existing `/api/contact`, and CSS classes prefixed `contact-form` / `contact-toast`.

- [ ] **Step 1: Write failing component tests**

Create tests that mock `fetch` and verify: empty fields display client validation; a `{ ok: true }` response clears fields and displays `Message sent`; a `{ ok: false, error }` response leaves both values intact and displays the error in an `aria-live` region.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- --run components/portfolio/ContactForm.test.tsx`

Expected: FAIL because `ContactForm` does not exist.

- [ ] **Step 3: Implement `ContactForm`**

Use controlled email/message inputs, a native submit button with pending state, client validation, defensive JSON handling, a polite status region, and a timer-cleared success toast. Do not send credentials or change the existing API contract.

- [ ] **Step 4: Compose the form into the contact section**

Place `<ContactForm />` above the existing `contact-links`; retain every existing link unchanged.

- [ ] **Step 5: Add responsive editorial styling**

Use a two-column desktop form that collapses to one column at 800px. Match the current thin borders, uppercase mono labels, acid focus state, and avoid rounded library-card treatment.

- [ ] **Step 6: Run component tests**

Run: `npm test -- --run components/portfolio/ContactForm.test.tsx`

Expected: PASS for validation, success, and error paths.

- [ ] **Step 7: Commit**

```bash
git add components/portfolio/ContactForm.tsx components/portfolio/ContactForm.test.tsx components/site/Portfolio.tsx app/globals.css
git commit -m "feat: add portfolio contact form"
```

### Task 4: Build and test project gallery, notes accordion, and tooltip primitive

**Files:**
- Create: `components/portfolio/Tooltip.tsx`
- Create: `components/portfolio/ProjectGallery.tsx`
- Create: `components/portfolio/CaseStudyNotes.tsx`
- Create: `components/portfolio/ProjectGallery.test.tsx`
- Create: `components/portfolio/CaseStudyNotes.test.tsx`
- Modify: `app/work/[slug]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `<ProjectGallery images={ProjectImage[]} />` and `<CaseStudyNotes notes={Project["caseStudy"]} />`.
- `ProjectGallery` exposes labelled `Previous image`, `Next image`, and thumbnail buttons; its focusable root handles `ArrowLeft` / `ArrowRight`.
- `CaseStudyNotes` begins with Problem expanded and uses buttons with `aria-expanded`.

- [ ] **Step 1: Write failing gallery tests**

Use two fixture images. Assert the first image is active initially; `Previous image` wraps to the final image; `Next image` wraps from final to first; clicking a thumbnail changes the active image; ArrowRight works only after the gallery root is focused.

- [ ] **Step 2: Run gallery tests to verify they fail**

Run: `npm test -- --run components/portfolio/ProjectGallery.test.tsx`

Expected: FAIL because `ProjectGallery` does not exist.

- [ ] **Step 3: Implement `Tooltip` and `ProjectGallery`**

Implement local state with a wrapped index helper. Use `next/image`, Motion `AnimatePresence`, and a reduced-motion media-query hook or CSS override. Wrap icon-only navigation buttons in `Tooltip`, but retain their `aria-label`s.

- [ ] **Step 4: Write failing note-accordion tests**

Assert Problem is expanded initially, selecting Approach expands it and collapses Problem, and the selected trigger exposes accurate `aria-expanded` state.

- [ ] **Step 5: Run note tests to verify they fail**

Run: `npm test -- --run components/portfolio/CaseStudyNotes.test.tsx`

Expected: FAIL because `CaseStudyNotes` does not exist.

- [ ] **Step 6: Implement `CaseStudyNotes`**

Render exactly Problem, Approach, Outcome in that order. Use one active panel id, button triggers, linked panel ids, and immediate reduced-motion behavior.

- [ ] **Step 7: Compose modules on the project page**

Replace the lone mockup figure with `<ProjectGallery images={project.gallery} />`, then render `<CaseStudyNotes notes={project.caseStudy} />` below the overview grid. Keep project metadata and links unchanged.

- [ ] **Step 8: Add project-page styles**

Add `case-gallery`, thumbnail rail, control bar, note accordion, tooltip, mobile, focus-visible, and reduced-motion rules. Ensure portrait RideQuest screens remain fully visible inside the stage.

- [ ] **Step 9: Run focused component tests**

Run: `npm test -- --run components/portfolio/ProjectGallery.test.tsx components/portfolio/CaseStudyNotes.test.tsx`

Expected: PASS for wraparound, keyboard containment, thumbnail selection, and exclusive accordion state.

- [ ] **Step 10: Commit**

```bash
git add components/portfolio/Tooltip.tsx components/portfolio/ProjectGallery.tsx components/portfolio/CaseStudyNotes.tsx components/portfolio/ProjectGallery.test.tsx components/portfolio/CaseStudyNotes.test.tsx app/work/[slug]/page.tsx app/globals.css
git commit -m "feat: add case-study gallery and notes"
```

### Task 5: Convert the creative archive into an accessible tabbed dialog

**Files:**
- Modify: `components/site/Portfolio.tsx`
- Create: `components/site/Portfolio.archive.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: one `Creative Archive` launcher and a dialog with `Graphic Design` / `Video & Media` tabs.
- Consumes: `graphicDesignProjects`, `videoProjects`, existing lightbox state, and `Tooltip` for the close control.

- [ ] **Step 1: Write failing archive interaction tests**

Render `Portfolio` with required Next/image and Next/link test stubs. Assert opening the archive shows an accessible dialog and Graphic Design tab selected; selecting Video & Media swaps the gallery body and updates `aria-selected`; Escape closes the dialog and focus returns to the launcher.

- [ ] **Step 2: Run archive tests to verify they fail**

Run: `npm test -- --run components/site/Portfolio.archive.test.tsx`

Expected: FAIL because the current two-card launcher and dialog have no tablist/focus restoration.

- [ ] **Step 3: Refactor archive state and markup**

Replace `activeArchive` with dialog open state plus `activeArchiveTab`. Add one launcher, `role="tablist"`, two correctly linked tab/panel pairs, keyboard tab navigation, and a close routine that restores the launcher focus. Preserve overlay close, Escape close, lightbox behavior, and body-scroll lock.

- [ ] **Step 4: Add archive-tab styling**

Style the single launcher and tab strip as bordered editorial controls. Animate panel presence subtly with the installed Motion library and disable the transition for reduced motion.

- [ ] **Step 5: Run archive tests**

Run: `npm test -- --run components/site/Portfolio.archive.test.tsx`

Expected: PASS for selection, content swap, Escape, and focus restoration.

- [ ] **Step 6: Commit**

```bash
git add components/site/Portfolio.tsx components/site/Portfolio.archive.test.tsx app/globals.css
git commit -m "feat: add creative archive tabs"
```

### Task 6: Verify integration and visual resilience

**Files:**
- Modify: `scripts/verify-projects.mjs` only if a real contract gap was found during verification.

**Interfaces:**
- Consumes: all previous tasks and existing verification scripts.

- [ ] **Step 1: Run all component and contract tests**

Run: `npm test -- --run; npm run verify:projects; npm run verify:graphic-design; npm run verify:hero; npm run verify:videos`

Expected: all commands pass.

- [ ] **Step 2: Run code-quality and production checks**

Run: `npm run lint; npm run build`

Expected: lint and build complete without errors.

- [ ] **Step 3: Inspect responsive and reduced-motion behavior**

Run the local site and inspect homepage, one landscape case study, RideQuest portrait gallery, archive dialog, contact success/error state, keyboard traversal, and reduced-motion at desktop plus 390px width. Record any corrections in the relevant component/CSS task, rerun its focused test, then repeat Steps 1–2.

- [ ] **Step 4: Commit final verification fixes**

```bash
git add -A -- . ':!docs/superpowers/specs/**' ':!docs/superpowers/plans/**'
git commit -m "fix: polish portfolio interactions"
```

## Self-review

- Spec coverage: Tasks 2–5 map one-to-one to the five approved features; Task 1 supplies real interaction testing and Task 6 verifies integration.
- Type consistency: `Project.caseStudy` is produced in Task 2 and consumed in Task 4; `ProjectImage[]` is already the existing gallery type and becomes the gallery input.
- Review focus coverage: contact failure is Task 3; gallery wrap and focus containment are Task 4; archive focus restoration is Task 5; mobile interaction layout is Task 6.
- Proportion: the plan specifies only the required contracts, test cases, files, and command-level verification; component markup and CSS remain implementation decisions.
