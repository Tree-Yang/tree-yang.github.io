# Agent Guidelines for al-folio

A simple, clean, and responsive Jekyll theme for academics.

## Quick Links by Role

- **Are a coding agent?** → Read [`.github/copilot-instructions.md`](.github/copilot-instructions.md) first (tech stack, build, CI/CD, common pitfalls & solutions)
- **Customizing the site?** → See [`.github/agents/customize.agent.md`](.github/agents/customize.agent.md)
- **Writing documentation?** → See [`.github/agents/docs.agent.md`](.github/agents/docs.agent.md)
- **Need setup/deployment help?** → [INSTALL.md](INSTALL.md)
- **Troubleshooting & FAQ?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Customization & theming?** → [CUSTOMIZE.md](CUSTOMIZE.md)
- **Quick 5-min start?** → [QUICKSTART.md](QUICKSTART.md)

## Essential Commands

### Local Development (Docker)

The recommended approach is using Docker.

```bash
# Initial setup & start dev server
docker compose pull && docker compose up
# Site runs at http://localhost:8080

# Rebuild after changing dependencies or Dockerfile
docker compose up --build

# Stop containers and free port 8080
docker compose down
```

### Pre-Commit Checklist

Before every commit, you **must** run these steps:

1.  **Format Code:**
    ```bash
    # (First time only)
    npm install --save-dev prettier @shopify/prettier-plugin-liquid
    # Format all files
    npx prettier . --write
    ```
2.  **Build Locally & Verify:**

    ```bash
    # Rebuild the site
    docker compose up --build

    # Verify by visiting http://localhost:8080.
    # Check navigation, pages, images, and dark mode.
    ```

**Note:** `_scripts/` files are excluded from Prettier (they mix Liquid + JS). Do NOT run prettier on `_scripts/`.

## Critical Configuration

When modifying `_config.yml`, these **must be updated together**:

- **Personal site:** `url: https://username.github.io` + `baseurl:` (empty)
- **Project site:** `url: https://username.github.io` + `baseurl: /repo-name/`
- **YAML errors:** Quote strings with special characters: `title: "My: Cool Site"`

## High-Level Architecture

### Content Types → Directories

| Content            | Directory                  | Frontmatter Key                                 |
| ------------------ | -------------------------- | ----------------------------------------------- |
| Blog posts         | `_posts/`                  | `layout: post`, filename: `YYYY-MM-DD-title.md` |
| News/announcements | `_news/`                   | `layout: post`                                  |
| Projects           | `_projects/`               | `layout: page`, `importance: N`                 |
| Publications       | `_bibliography/papers.bib` | BibTeX entries                                  |
| Books              | `_books/`                  | `layout: book-review`                           |
| Teaching           | `_teachings/`              | `layout: page`                                  |
| Static pages       | `_pages/`                  | `layout: page`, `permalink: /path/`             |
| CV                 | `_data/cv.yml`             | RenderCV format (auto-generates PDF via CI)     |

### Templates & Rendering

- **`_layouts/`** — Page templates (about, post, bib, distill, cv, etc.)
- **`_includes/`** — Reusable Liquid components (header, footer, scripts, citation, etc.)
- **`_sass/`** — SCSS stylesheets
- **`_plugins/`** — Custom Jekyll plugins

### Configuration

- **`_config.yml`** — Primary config: site metadata, feature flags, plugin settings, third-party library URLs
- **`_data/`** — YAML data files: `socials.yml`, `cv.yml`, `coauthors.yml`, `citations.yml`, `repositories.yml`
- **`url` + `baseurl`** must be set together: personal site uses empty `baseurl`, project site uses `/repo-name/`

### Key Feature Flags (in `_config.yml`)

`enable_darkmode`, `enable_math`, `enable_masonry`, `enable_google_analytics`, `enable_cookie_consent`, `enable_publication_thumbnails`, `enable_publication_badges.*`, `search_enabled`, `related_blog_posts.enabled`

## File-Specific Instructions

Detailed instructions for each file type live in `.github/instructions/`:

| File Type                                       | Instruction File                                           |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Markdown content (posts, pages, projects, etc.) | `.github/instructions/markdown-content.instructions.md`    |
| YAML config (`_config.yml`, `_data/`)           | `.github/instructions/yaml-configuration.instructions.md`  |
| BibTeX (`_bibliography/papers.bib`)             | `.github/instructions/bibtex-bibliography.instructions.md` |
| Liquid templates (`_includes/`, `_layouts/`)    | `.github/instructions/liquid-templates.instructions.md`    |
| JavaScript (`_scripts/`)                        | `.github/instructions/javascript-scripts.instructions.md`  |

## Development Workflow

- **Git & Commits:** For commit message format and Git practices, see [.github/GIT_WORKFLOW.md](.github/GIT_WORKFLOW.md).
- **Code-Specific Instructions:** Consult the relevant instruction file for your code type.

## CI/CD Pipeline

GitHub Actions (`.github/workflows/`):

- **deploy.yml** — Builds with Jekyll, runs purgecss, deploys to `gh-pages`
- **prettier.yml** — Formatting check (fails PRs if not formatted)
- **broken-links.yml / broken-links-site.yml** — Link validation
- **axe.yml** — Accessibility testing
- **render-cv.yml** — Auto-generates CV PDF from `_data/cv.yml`
- **update-citations.yml** — Auto-updates Google Scholar citations

## Common Pitfalls

- **YAML special characters** (`:`, `&`, `#`) must be quoted: `title: "My: Cool Site"`
- **CSS/JS not loading after deploy** — Check `url` and `baseurl` in `_config.yml` match your site
- **Related posts errors** — Posts with only stop words cause "zero vectors" errors; add meaningful content or set `related_posts: false`
- **Image paths** — Must start with `/assets/`; ImageMagick processes `.jpg/.png/.gif` to WebP
- **BibTeX `pdf`/`preview` fields** — Resolved to `assets/pdf/` and `assets/img/publication_preview/` automatically
- **`.liquid.js` files** — Mix Liquid + JS; Prettier doesn't support this format (excluded via `.prettierignore`)

## Common Issues

For troubleshooting, see:

- [Common Pitfalls & Workarounds](.github/copilot-instructions.md#common-pitfalls--workarounds) in copilot-instructions.md
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions
- [GitHub Issues](https://github.com/alshedivat/al-folio/issues) to search for your specific problem.

## Tech Stack

- **Jekyll 4.x** with Ruby 3.3.5
- **Python 3.13** (for nbconvert / Jupyter notebook support)
- **Docker image:** `amirpourmand/al-folio:v0.16.3`
- **Key plugins:** jekyll-scholar, jekyll-archives-v2, jekyll-paginate-v2, jekyll-minifier, jekyll-terser, classifier-reborn
- **Node.js:** Prettier v3.8+ with `@shopify/prettier-plugin-liquid`, purgecss

---

# This Site: Design System & Customizations

This section documents the customizations layered on top of stock al-folio for **Jia-Shu Yang's** personal site (`https://tree-yang.github.io`). Read this before editing so changes stay consistent. Content is authoritative from the CV PDFs / `_data`; do not invent facts.

## Design Language

- **Two-color accent system — nothing else.** Do not introduce new accent hues.
  - **Indigo** = primary/brand. Light `#4f46e5` (hover `#4338ca`); dark `#818cf8` (hover `#a5b4fc`). Defined in `_sass/_variables.scss` (`$blue-color`, `$blue-color-dark`, `$indigo-color-light`, `$indigo-color-lighter`) and wired to `--global-theme-color` / `--global-hover-color` in `_sass/_themes.scss`.
  - **Amber** = award/honor accent only. Vars `--global-award-color` / `--global-award-bg` / `--global-award-border` in both theme blocks of `_sass/_themes.scss`.
- **Always use CSS variables, never hard-coded hex**, so light/dark modes both work. When you need a tint, use `color-mix(in srgb, var(--global-theme-color) N%, transparent)` (this is the established pattern throughout `_sass/_components.scss`).
- **Dark mode is enabled** (`enable_darkmode: true`); the navbar shows a system/dark/light toggle automatically. Every new style must be verified in both modes.
- **Typography.** Body font is **Inter** (Google Fonts, weights 400–800, URL in `_config.yml` `third_party_libraries.google_fonts`) with CJK fallback to system fonts (`PingFang SC` / `Hiragino Sans GB` / `Microsoft YaHei` / `Noto Sans CJK SC`). The stacks live in `_sass/_variables.scss` as `$font-family-sans` / `$font-family-mono` and are applied in `_sass/_layout.scss` (body) and `_sass/_typography.scss` (code). Body text is softened near-black `#212529` in light mode (`$grey-900`); headings use weight 600 with `-0.01em` letter-spacing. `fonts.googleapis.com`/`fonts.gstatic.com` preconnects are in `_includes/head.liquid`. Do not switch back to Roboto/Roboto Slab.
- **Motion.** `scroll-behavior: smooth` with a `prefers-reduced-motion` global kill-switch, a 0.25s background/color transition on theme toggle, indigo `::selection`, theme-colored `:focus-visible` outline, hover underline animation on navbar links (`.nav-link::after` scaleX), and 0.15s transitions on all pill buttons. Keep durations in the 0.15–0.25s range.
- **Navbar** uses a translucent backdrop blur (`color-mix` 82% bg + `backdrop-filter: saturate(1.5) blur(10px)`); it is `fixed-top`, so the blur shows while scrolling.
- **Card-based layout** is the shared visual motif: rounded corners (`0.6rem` — also applied to the generic Bootstrap `.card`), 1px `--global-divider-color` border, a 3px indigo top/left accent, subtle hover lift (`translateY(-2px)` + indigo-tinted shadow).
- Keep it clean and restrained: generous spacing, muted secondary text (`--global-text-color-light`), pill-shaped buttons/badges.

## Reusable Components (`_sass/_components.scss`)

| Class                                                | Purpose                                                                                                                                                                                        |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.page-lead`                                         | Intro/lead paragraph at top of a page (larger, muted).                                                                                                                                         |
| `.info-panel`                                        | Soft indigo-tinted card for a highlighted prose block (used on home). Wrap markdown with `<div class="info-panel" markdown="1"> … </div>`.                                                     |
| `.topic-cards` / `.topic-card`                       | Responsive grid of feature cards with a `.topic-icon` (Font Awesome) + `h3` + `p`. Used for Research on the home page.                                                                         |
| `.project-cards` / `.project-card`                   | Grid of software cards (`.project-lang` label, `.project-links` pill buttons). Used on the Code page.                                                                                          |
| `.quick-links`                                       | Row of small pill nav buttons (home bottom links). Variant `.quick-links.section-nav` = larger buttons with a `fa-circle-down` arrow, used for in-page section jumps on the publications page. |
| `.about-timeline`                                    | Single-column appointments/education list on the home page (was two-column; keep single).                                                                                                      |
| `.cv-bullets` / `.cv-subitems` / `.cv-labeled-entry` | Styling for generic CV sections (see CV below).                                                                                                                                                |

## Home Page (`_pages/about.md`, `_pages/zh-about.md`)

- Uses the `about` layout. The big page title comes from `_config.yml` `first_name`/`last_name` (EN) or the `display_name` front-matter key (ZH shows `杨家树`). The Chinese name + role live in the `subtitle`. **Do not repeat the name in the body.**
- **Research was merged into the home page** — there is no standalone `/research/` page. The five research directions are `.topic-cards` embedded directly in the home body, followed by `.quick-links` (Code / Publications / CV).
- `about` layout supports `selected_papers: true` → renders `@*[selected=true]*` from `papers.bib` via `_includes/selected_papers.liquid`. The section heading is localized: EN shows "Selected Publications" linking to `/publications/`, ZH shows "代表性论文" linking to `/zh/publications/` (branched on `page.url contains '/zh/'` in `about.liquid`). Both home pages enable it.

## Bilingual Structure

- English pages: `/`, `/publications/`, `/code/`, `/cv/`. Chinese mirrors: `/zh/`, `/zh/publications/`, `/zh/code/`, `/zh/cv/`. ZH pages are separate `_pages/zh-*.md` files.
- **Navbar & language toggle logic lives in `_includes/header.liquid`.** `is_zh` is derived from `page.url contains '/zh/'`. Nav items are filtered by language; the brand shows `杨家树` on ZH pages. The 中/EN toggle maps to the **counterpart** page (`/foo/` ↔ `/zh/foo/`) and falls back to the language home if no counterpart exists.
- When adding a new page, create **both** language versions and keep `permalink`s mirrored so the toggle resolves.
- The "Code" page keeps English title `Code` (permalink `/code/`) and Chinese title `开源程序` (`/zh/code/`).

## Publications & Talks (`_layouts/bib.liquid`, `_bibliography/`, `_data/venues.yml`)

- `enable_publication_thumbnails: true`. Journal papers → `_bibliography/papers.bib`; conference talks → `_bibliography/talks.bib`, rendered on the same page via `{% bibliography -f talks %}`. Both group by year.
- Supported custom BibTeX fields in use: `abbr`, `bibtex_show`, `abstract`, `selected`, `award` + `award_name`, `preview`, `code`, `location`, `language`, and the **site-specific** `chinese_title`, `chinese_journal`, `chinese_booktitle` (the last three are whitelisted in `_config.yml` `filtered_bibtex_keywords`).
- **Chinese-language entries render Chinese-primary:** title shows `chinese_title` as the main line and English as the muted secondary line; the venue shows `中文名 / English name` wrapped together in one `<em>` (both italic). This is handled in `bib.liquid`.
- **Chinese author names:** `_data/coauthors.yml` maps last-name → `chinese` for the four recurring authors (Chen 陈建兵, Yang 杨家树, Weng 翁丽丽, Lyu 律梦泽). For any `language: Chinese` entry, `bib.liquid` renders each mapped author as `中文名 (English)`. The site owner (Yang) is always bold + underlined (`.author > em`). Do **not** add `url` to these coauthors (it would turn every author into a link site-wide).
- **Award badges** are amber-filled pills (`.links a.award.btn`); the expandable award detail uses the amber border. The badge icon distinguishes the entry kind (`entry.type` in `bib.liquid`): journal papers (`@article`) show a `fa-trophy`, conference talks (`@inproceedings`, i.e. invited/award talks) show a `fa-microphone-lines`.
- Journal abbreviation badges come from `_data/venues.yml` (indigo-family colors). Topic/keyword tags are unified to a single indigo pill (`.publication-tag`) — do not reintroduce per-category colors.
- `assets/img/publication_preview/` holds preview images named `<citekey>.png/.jpg`; add a `preview = {…}` field to a bib entry to show one. Missing preview → left column simply stays blank (expected).
- **Section headings** on the publications pages carry `{#journal-articles .section-heading}` / `{#conference-papers .section-heading}` (kramdown IAL); `.section-heading` in `_publications.scss` adds the indigo left bar + Font Awesome `::before` icon (`\f518` book-open, `\f3c9` microphone-lines; bundled family name is `'Font Awesome 7 Free'`).
- **Right-side year rail:** the page body is wrapped in `.pub-layout` (grid: content + 4.5rem rail on ≥992px, hidden below). `assets/js/pub-year-rail.js` scans `h2.bibliography` year headings, assigns `year-XXXX` ids (duplicate years across journal/talks get `-2` suffixes and are not listed), and builds the sticky axis nav with IntersectionObserver highlighting. Its dynamically-added classes (`pub-year-item/link/label/dot`, `active`) survive purgecss because `purgecss.config.js` also scans `_site/**/*.js` — keep them as literals in the JS. The `.pub-main` wrapper needs `markdown="1"` so the `##` headings inside still render.

## Web CV (`_layouts/cv.liquid`, `_includes/cv/*.liquid`, `_data/cv*.yml`)

- The CV is rendered as web cards, **not** a PDF link. `_pages/cv.md` and `_pages/zh-cv.md` set `layout: cv`, `cv_format: rendercv`.
- **Data source is selectable** via the `cv_data` front-matter key: EN uses `_data/cv.yml` (default), ZH sets `cv_data: cv_zh` → `_data/cv_zh.yml`.
- `cv_zh.yml` has a top-level `labels:` map that localizes card titles (Experience→工作经历, etc.) and the "Present"→"至今" badge. `cv.liquid` reads `cv_labels` and falls back to the English key.
- Section keys are dispatched by exact name in `cv.liquid` (`Education`, `Experience`, `Honors and Awards`, `Projects`, …). Unknown sections fall through to a **generic renderer** that accepts either:
  - `bullet:` items → indigo-bulleted list (`.cv-bullets`), optionally with `subitems:` → nested second-level list (`.cv-subitems`), used for the reviewer journal list.
  - `label:` + `details:` items → left-accent-bar block (`.cv-labeled-entry`), used for grants.
- The `render-cv.yml` GitHub Action was **deleted on purpose** (it validated/committed a PDF). Do not reinstate it; the site no longer publishes a CV PDF.

## Build / CI Notes

- **Prettier version is pinned** in `package.json` (`prettier@3.9.6`, `@shopify/prettier-plugin-liquid@1.11.0`) because CI installs the latest plugin and its Liquid formatting differs across versions. After editing any `.liquid`/`.scss`/`.md`/`.yml`, run `npx prettier . --write` (never touch `_scripts/`) and confirm `npx prettier . --check` is clean before committing, or the Prettier CI job fails.
- Deploy is automatic: pushing to `main` triggers `deploy.yml` (Jekyll build → purgecss → publish to `gh-pages`). No manual deploy needed.
- **purgecss** keeps only classes present in built HTML/JR. All classes above are used in templates, so they survive; avoid styles whose class names are only assembled in JS.
- Root-level source files not meant for the site (`plan.md`, `resume-*.tex`, `*.pdf`) are listed under `exclude:` in `_config.yml`.
- `assets/js/bibsearch.js` was patched so a URL `#hash` that matches an element id is treated as **anchor navigation** (section jump / cite link), not a bib search filter.

## Known Incidents / Postmortems

- **First push after the redesign: the `Prettier code formatter` CI job failed (deploy itself succeeded).**
  - _Symptom:_ `deploy.yml` was green and the site published fine, but the `Prettier code formatter` workflow reported a failure on `_layouts/bib.liquid`, while a local `npx prettier . --check` passed.
  - _Root cause:_ CI does not use a lockfile — it runs `npm install --save-dev --save-exact prettier @shopify/prettier-plugin-liquid`, which pulls the **latest** `@shopify/prettier-plugin-liquid`. That newer plugin formatted a Liquid block in `bib.liquid` (a `{% highlight %}` indent) differently from the older plugin resolved locally, so the check disagreed.
  - _Fix:_ pinned exact versions in `package.json` (`prettier@3.9.6`, `@shopify/prettier-plugin-liquid@1.11.0`) to match what CI installs, then reformatted `bib.liquid`.
  - _Prevention:_ before committing template/style/data changes, format with the pinned toolchain and verify `npx prettier . --check` is clean. If CI's Prettier fails again while local passes, first suspect a plugin version drift — re-check the latest published `@shopify/prettier-plugin-liquid` version and bump the pin to match, then reformat. Note the Prettier job only blocks the check, not the actual Pages deploy.

## Where Content Lives (quick map)

See `README.zh-CN.md` for the human-facing version. In short: identity → `_config.yml` + `_pages/about.md` subtitle; socials → `_data/socials.yml`; web CV → `_data/cv.yml` & `_data/cv_zh.yml`; papers → `_bibliography/papers.bib`; talks → `_bibliography/talks.bib`; venue badges → `_data/venues.yml`; author Chinese names → `_data/coauthors.yml`; colors → `_sass/_variables.scss` & `_sass/_themes.scss`; components → `_sass/_components.scss`; avatar → `assets/img/prof_pic.jpg` (currently the stock placeholder — replace with a real photo, then add a `profile:` block to `about.md`).
