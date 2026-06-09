# 305 Studios — Web Experience Studio

Portfolio/agency site for 305 Studios, led by Lova Rakotomavonandrianina.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion 12

---

## Getting Started

```bash
npm install
npm run dev     # starts at http://localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

---

## Swapping Content

### Projects (`src/data/projects.ts`)
Each entry in the `projects` array maps to a card in the Work Grid and the first 4 are used in the Hero carousel.

| Field | Purpose |
|---|---|
| `title` | All-caps display heading on the card |
| `description` | One-line caption below the title |
| `category` | Teal tag pill on the card and hero thumbnail |
| `imageUrl` | Card image (900×600 for regular, 900×1100 for tall) |
| `heroBgUrl` | Full-bleed hero background (1920×1080) |
| `span` | `"wide"` = 2 cols, `"tall"` = 2 rows, `"large"` = 2×2 |

### Services (`src/data/services.ts`)
Four service cards. Edit `title`, `blurb`, `icon` (any unicode glyph), and `tags`.

### Studio bio
Edit the copy directly in `src/components/Studio.tsx` → the `<p>` blocks under "Right — bio + stats".

### Stats
In the same file, edit the `stats` array at the top:
```ts
const stats = [
  { value: 40, label: "Projects Shipped", suffix: "+" },
  ...
];
```

---

## Swapping the Accent Color

The primary coral `#FF5E5B` is defined in `tailwind.config.ts` under `theme.extend.colors.coral`. Change it there and it propagates everywhere: CTAs, hero gradient, progress bars, card hover borders.

Secondary accent (teal `#1BC7B4`) lives at `colors.teal`.

---

## Swapping Fonts

Fonts are loaded via `next/font/google` in `src/app/layout.tsx`:

```ts
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
```

To swap the display font (e.g. to "Bebas Neue"):

1. Change the import: `import { BebasNeue } from "next/font/google"`
2. Update the variable name and CSS variable if desired
3. Update `tailwind.config.ts` → `fontFamily.display` if you changed the variable

---

## Adding Real Images

Replace the `picsum.photos` URLs in `src/data/projects.ts` with your own. Images are served through `next/image` for automatic optimisation. If using an external host, add it to `next.config.ts → images.remotePatterns`.

---

## Design System

Custom Tailwind tokens (`tailwind.config.ts`):

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0B0B0F` | Base background / hero |
| `coral` | `#FF5E5B` | Primary CTA, accents |
| `teal` | `#1BC7B4` | Tags, hovers, stats |
| `sunset` | `#FF9E64` | Gradient highlight |
| `sand` | `#F4F1EC` | Services section bg |
| `mist` | `#E8F0F2` | Contact section bg |

Utility classes defined in `globals.css`:
- `.heading-display` — font-display, uppercase, tight leading
- `.label` — small-caps, tracked, body font
- `.glass` / `.glass-dark` — frosted-glass panel
- `.clip-diagonal-top` / `.clip-diagonal-top-lg` — angled section divider

---

## Accessibility

- Hero carousel is keyboard-navigable (prev/next buttons, thumbnail tabs with `role="tab"`)
- All images have descriptive `alt` text
- Focus states on all interactive elements via `focus-visible:outline`
- Animations respect `prefers-reduced-motion` via Framer Motion's `useReducedMotion()`
