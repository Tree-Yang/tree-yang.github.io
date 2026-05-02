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

| Content | Directory | Frontmatter Key |
|---------|-----------|-----------------|
| Blog posts | `_posts/` | `layout: post`, filename: `YYYY-MM-DD-title.md` |
| News/announcements | `_news/` | `layout: post` |
| Projects | `_projects/` | `layout: page`, `importance: N` |
| Publications | `_bibliography/papers.bib` | BibTeX entries |
| Books | `_books/` | `layout: book-review` |
| Teaching | `_teachings/` | `layout: page` |
| Static pages | `_pages/` | `layout: page`, `permalink: /path/` |
| CV | `_data/cv.yml` | RenderCV format (auto-generates PDF via CI) |

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

| File Type | Instruction File |
|-----------|-----------------|
| Markdown content (posts, pages, projects, etc.) | `.github/instructions/markdown-content.instructions.md` |
| YAML config (`_config.yml`, `_data/`) | `.github/instructions/yaml-configuration.instructions.md` |
| BibTeX (`_bibliography/papers.bib`) | `.github/instructions/bibtex-bibliography.instructions.md` |
| Liquid templates (`_includes/`, `_layouts/`) | `.github/instructions/liquid-templates.instructions.md` |
| JavaScript (`_scripts/`) | `.github/instructions/javascript-scripts.instructions.md` |

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
