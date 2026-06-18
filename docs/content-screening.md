# Block Forge — Quick Content Screening Guide

A fast checklist for reviewing pages built with **Block Forge** blocks before publishing.
Use it to catch the things that break most often: placeholder text left in, empty links,
missing images/alt text, and the German/English `Lorem ipsum` defaults shipped with some blocks.

All blocks live under the **Block Forge** category in the editor. Source: `src/blocks/*`,
built output: `build/blocks/*` (registered automatically from `build/blocks/` by `plugin.php`).

---

## Things to screen on *every* block

These are shared across the library, so check them on each instance:

- **Anchor ID** (`anchorId`) — most blocks expose one. If a page has in-page nav, confirm the
  anchor is set and unique. (Exception: `section` has `anchor` support disabled.)
- **Per-element style overrides** — title / description / button / link each have an optional
  style object (font, size, weight, color, background, border). Empty = branded default shows
  through. Screen for *accidental* overrides that fight the brand (odd colors, off fonts).
- **Branded Swedish defaults** — every text field ships with real Movendi copy or `Lorem ipsum`.
  Anything still showing a default value is almost certainly unfinished content.
- **Links** — button/link URLs default to empty (`""`). An empty URL renders a dead link.
  Screen every CTA, arrow link, and "show more" link for a real destination.
- **Images** — `imageUrl` defaults to empty and `imageId` to `0`/unset. Confirm an image is
  chosen *and* that `imageAlt` is filled for accessibility.

---

## Per-block screening checklist

### Hero (`block-forge/hero`)
Full-width hero with image **or** video background, heading, description, two CTAs.
- [ ] `bgType` is `image` or `video` — confirm the matching media is set (`imageUrl` / `videoUrl`).
- [ ] Title not still `"Fri att vara du"` placeholder (unless intended).
- [ ] Primary button (`"Bli medlem"`) and secondary (`"Uppträck Movendi"`) have real URLs.
- [ ] `imageAlt` set when using an image background.

### Banner / Distriktspuff (`block-forge/banner`)
Full-bleed banner with image, text, optional CTA. Background color + decorations.
- [ ] `ctaType` matches what's filled in (`none` / buttons / link). If `none`, no orphan link copy.
- [ ] If a CTA is shown, buttons aren't left as `"Knapp"` and link isn't `"Länk kommer här"`.
- [ ] `backgroundColor` (default `blue`) is an approved brand color.
- [ ] If `showDecoration` / `showDecorationMobile` are on, the decoration images are actually set.
- [ ] Main image set with alt text; check `imageType` (full/boxed) and `imagePosition`.

### Kortpuffar / Cards Grid (`block-forge/cards-grid`)
2×2 image cards with colored overlay, title, description, arrow link.
- [ ] Each of the 4 cards has an image (`imageUrl`) + `imageAlt`.
- [ ] Each card's `linkUrl` is filled (empty = dead arrow link).
- [ ] Card titles/descriptions replaced (defaults: "För barn och unga", etc.).
- [ ] `colorVariant` per card is a valid brand variant (`peach` / `blue` in defaults).

### Informationspuffar / Services Grid (`block-forge/services-grid`)
2×2 service cards with image, title, description, multiple links, "show more" toggle.
- [ ] ⚠️ Defaults ship with `Lorem ipsum` descriptions — confirm all are replaced.
- [ ] Each card has image + alt, and `titleUrl` if the title should link.
- [ ] Every link in each card's `links[]` array has a real `url` (not empty).
- [ ] `visibleLinks` (default 3) matches how many should show before "Visa fler".
- [ ] `showMoreLabel` makes sense ("Visa fler").

### Stats Row / USP / Ikonpuffar (`block-forge/stats-row`)
4-column row: icon, label, description. Each stat has an `isEnabled` toggle.
- [ ] Each enabled stat has an icon (`iconUrl` / `iconId`).
- [ ] Labels/descriptions replaced from defaults ("medlemmar", etc.).
- [ ] Disabled stats (`isEnabled: false`) are intentional, not accidentally hidden content.

### Text + Image (`block-forge/text-image`)
Two-column: text one side, image the other. Full-bleed or boxed image.
- [ ] Image set with `imageAlt`.
- [ ] `linkLabel` + `linkUrl` either both filled or both empty (no labeled dead link).
- [ ] Title not left as `"Om oss"` default unless intended.
- [ ] `imagePosition` (left/right), `imageType` (boxed/full), `backgroundColor` as designed.

### News Grid (`block-forge/news-grid`)  *(title shows as "Image block" in inserter)*
3-column article cards pulled dynamically from WordPress posts.
- [ ] `postType` is correct and `numberOfPosts` (default 3) matches the layout.
- [ ] If `selectedPostIds` is set, those posts still exist/are published; else `offset` is right.
- [ ] `moreLinkUrl` filled if "Läs fler artiklar i nyhetsarkivet" link should work.
- [ ] **Dynamic block** — preview reflects live posts; re-check after posts change.

### Kontaktblock / Contacts (`block-forge/contacts`)
Row of contact cards: icon, heading, HTML body (phone / email / service).
- [ ] `body` HTML is valid — phone numbers, hours, and `mailto:` links correct.
- [ ] Each card icon set; `bgColor` (default `coral-60`) is a brand color.
- [ ] Email addresses in the body are current.

### Accordion / Expanderbart innehåll (`block-forge/accordion`)
Vertical list of collapsible FAQ / info items. Drop into any column.
- [ ] ⚠️ Default items ship with **empty `content`** — confirm each open item has body copy.
- [ ] Item labels are the real questions/sections (defaults are address/org-number stubs).
- [ ] Remove unused default rows (Besökadress, Postadress, etc.) if not needed.

### Section (`block-forge/section`)
Centered 1120px boxed container — a layout wrapper, not content itself.
- [ ] `bgColor` (default `none`) and `padY` (default `lg`) match the design.
- [ ] Contains the intended child blocks; not left empty.
- [ ] No anchor expected here — `anchor` support is disabled for this block.

---

## Fast triage — biggest red flags

1. **`Lorem ipsum`** anywhere → Services Grid descriptions, unfinished content.
2. **Empty accordion items** → expanding shows a blank panel.
3. **Dead links** → any button/arrow/"show more" with an empty URL.
4. **Placeholder copy** → "Knapp", "Länk kommer här", default Movendi headings left unchanged.
5. **Missing alt text** → any block with an image where `imageAlt` is blank.
6. **News Grid** → wrong `postType`, deleted selected posts, or broken "more" link.
