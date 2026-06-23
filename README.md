# Block Forge

A WordPress plugin that provides a library of custom Gutenberg blocks (branded
page sections — hero, banner, card grids, stats, contacts, accordion, etc.) for
the Movendi website.

- **Plugin file:** `plugin.php`
- **Category in editor:** *Block Forge*
- **Text domain:** `block-forge`

See [`docs/overview.md`](docs/overview.md) for the full block catalogue and how
the plugin works.

---

## Requirements

- WordPress 6.x with the block editor (Gutenberg)
- The active theme (provides the `movendi-theme-style` handle the plugin's CSS
  depends on)
- Node.js 18+ and npm — **only for building**, not for running the plugin

---

## Installation

### Fresh install

1. Copy the plugin folder to `wp-content/plugins/block-forge/`.
2. Build the assets (see [Building](#building)) so the `build/` directory exists.
   The plugin registers blocks by scanning `build/blocks/*`, so **nothing shows
   up until the project has been built.**
3. In WordPress go to **Plugins** and activate **Block Forge**.
4. The "Block Forge" category and its blocks now appear in the editor inserter.

### Building

Source lives in `src/`; the plugin only loads the compiled output in `build/`.

```bash
npm install          # first time only — installs build tooling
npm run start        # dev: watch JS + CSS and rebuild on save
npm run build        # production build into build/
```

`npm run build` runs `wp-scripts build` (compiles the blocks) and then
`build:css` (compiles `tailwind.css` into `build/style.css`).

> **Note:** `build/`, `dist/` and `node_modules/` are git-ignored. A clean
> checkout does not contain compiled assets — you must run `npm run build`
> before the plugin will do anything.

---

## Updating an existing install (FTP / SFTP)

Because `build/` is **not** committed to git, you cannot just pull on the server.
Build locally, then upload the result.

1. **Pull the latest source** and build it locally:

   ```bash
   git pull
   npm install        # only if dependencies changed
   npm run build
   ```

2. **Connect by FTP/SFTP** to the site and go to:

   ```
   wp-content/plugins/block-forge/
   ```

3. **Upload these — overwrite the existing files:**

   - `build/`        ← the compiled blocks and `build/style.css` (required)
   - `plugin.php`
   - `assets/`
   - `src/`          ← optional on the server, but keep it in sync
   - `docs/`         ← optional
   - `package.json`, `postcss.config.js`, `webpack.config.js`, `tailwind.css`

   **Do not upload** `node_modules/` (large and unnecessary on the server) or
   the `.git/` folder.

4. **Verify the upload finished**, then load a page in the editor. If blocks or
   styles look stale, hard-refresh — `plugin.php` versions the stylesheet by the
   file's modification time, so a freshly uploaded `build/style.css` busts the
   cache automatically.

> **Tip:** Always upload a *fully built* `build/` directory. If a transfer is
> interrupted mid-upload, blocks can disappear from the inserter because a
> block folder's `block.json` is missing. Re-upload `build/` if that happens.

### Quick reference

| What changed | Rebuild needed? | Upload |
|--------------|-----------------|--------|
| Block markup / JS (`src/blocks/*`) | Yes (`npm run build`) | `build/` |
| Styles (`tailwind.css`) | Yes (`npm run build:css`) | `build/style.css` |
| PHP only (`plugin.php`) | No | `plugin.php` |
| Editor assets (`assets/*.js`) | No | `assets/` |

---

## Project structure

```
block-forge/
├── plugin.php          # registers blocks, styles, fonts, menus
├── assets/             # editor-only JS (list styles, arrow-link format)
├── src/blocks/*        # block source (edit here)
├── build/              # compiled output (git-ignored, FTP this)
├── docs/               # overview + content-screening notes
├── tailwind.css        # Tailwind v4 entry, compiled to build/style.css
└── package.json        # build scripts
```
