# Block Forge — Overview

**Block Forge** is a WordPress plugin that provides a library of custom Gutenberg
blocks for the Movendi website. Each block is a ready-made, branded page section
(hero, banner, card grids, stats, contacts, etc.) that editors drop into a page.

- **Plugin file:** `plugin.php`
- **Category in editor:** *Block Forge*
- **Text domain:** `block-forge`

---

## How it works

- Blocks are written in `src/blocks/*` and compiled into `build/blocks/*`.
- `plugin.php` auto-registers **every** folder in `build/blocks/` on `init` —
  no manual registration per block.
- A shared stylesheet (`build/style.css`) and Google Fonts (Ancizar Serif,
  Barlow Semi Condensed) load on both the front end and the editor.
- Two helper systems are shared across blocks:
  - **`ElementStylePanel` / `typeStyles`** — per-element style overrides
    (font, size, weight, color, background, border). Empty = branded default.
  - **`block_forge_inline_style()`** in `plugin.php` turns those style objects
    into inline CSS on the front end.
- Most blocks ship with real Swedish default copy so a freshly inserted block
  already looks finished.

---

## The blocks

| Block | Title in editor | What it is |
|-------|-----------------|------------|
| `hero` | Hero block | Full-width hero with image **or** video background, heading, description, two CTAs |
| `banner` | Banner / Distriktspuff | Full-bleed banner with image, text, optional CTA and decorations |
| `cards-grid` | Kortpuffar | 2×2 image cards with colored overlay, title, description, arrow link |
| `services-grid` | Informationspuffar | 2×2 service cards with image, multiple links and a "show more" toggle |
| `stats-row` | USP / Ikonpuffar | 4-column row of stats: icon, label, description (each toggleable) |
| `text-image` | Text + Image | Two-column block: text one side, image the other |
| `news-grid` | "Image block" | 3-column article cards pulled dynamically from WordPress posts |
| `contacts` | Kontaktblock / Informationsblock | Row of contact cards: icon, heading, HTML body |
| `accordion` | Expanderbart innehåll | Collapsible FAQ / info list, droppable into any column |
| `section` | Section | Centered 1120px boxed container/wrapper for other blocks |

---

## Build

```bash
npm run start    # dev / watch
npm run build    # production build into build/
```

Source lives in `src/`; the plugin only loads what's in `build/`.

---

## See also

- [content-screening.md](content-screening.md) — checklist for reviewing page
  content built with these blocks before publishing.
