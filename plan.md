# Task: Customize al-folio into a minimal, modern academic homepage

You are modifying an existing **al-folio Jekyll academic website**.

## Overall Goal

Transform the website into a **clean, light-themed, method-focused academic homepage** with:

- Minimal visual noise
- Clear information hierarchy
- Focus on research methodology (not just publications)
- Structured presentation of GitHub projects
- No images for now (use placeholders or empty sections)

---

## Design Principles

1. **Clarity over completeness**
2. **Problem → Method → Implementation → Evidence**
3. Minimal navigation
4. Avoid unnecessary sections (blog, news, etc.)
5. Academic, modern, and restrained tone

---

## Navigation Structure

Modify navbar to:

Home | Research | Projects | Publications | CV

Remove or disable:

- Blog
- News
- Teaching
- Talks
- People

---

## Configuration Changes (\_config.yml)

Ensure:

- Light theme only
- Disable unused features
- Keep layout minimal

Adjust or ensure:

- Clean navbar
- No unnecessary widgets
- No blog-related features

(Do NOT introduce complex styling changes unless necessary)

---

## Home Page (\_pages/about.md)

Replace content with:

- Short identity statement
- Research problem (framed as a question)
- Methodological framework (bullet list)
- Current research directions
- Link to publications and projects

Structure:

1. Name + one-line identity
2. Research focus (problem-oriented)
3. Methodological framework
4. Current directions
5. Links (publications, projects)

Avoid:

- Long paragraphs
- Redundant wording
- Images (leave placeholders if needed)

---

## Research Page (\_pages/research.md)

Structure as:

- Short overview
- 3–4 core components

Each component should:

- Have a title
- 1–2 sentence description
- No images (yet)

Example components:

- Reliability-Based Topology Optimization
- Dynamic Reliability Analysis
- Probability Density Evolution Methods
- Stochastic Modeling

---

## Projects Page (\_pages/projects.md)

Create this page.

Structure:

- Short intro
- 3–5 categorized projects

Each project should include:

- Title
- One-line functional description
- GitHub link
- Keywords (optional)

Group projects into meaningful categories, e.g.:

- Research Frameworks
- Method Implementations
- Utilities

Do NOT:

- List raw repositories without context
- Use long descriptions

---

## Publications Page

Keep default al-folio behavior.

Ensure:

- Clean BibTeX-based rendering
- No extra explanation text

---

## CV Page

Simple page with:

- Download link to PDF

No extra styling needed.

---

## Content Style

- Use concise academic English
- Avoid buzzwords
- Prefer structure over prose
- No decorative elements

---

## Important Notes

- Do NOT add images yet
- Do NOT introduce complex CSS unless necessary
- Keep everything modular and easy to extend later
- Preserve al-folio structure and conventions ([GitHub][1])

---

## Expected Outcome

A homepage that:

- Immediately communicates research identity
- Shows a coherent methodological framework
- Cleanly separates:
  - Research (concept)
  - Projects (implementation)
  - Publications (evidence)

The result should feel like a **modern academic profile page**, not a blog or portfolio.

[1]: https://github.com/alshedivat/al-folio/blob/main/CUSTOMIZE.md?utm_source=chatgpt.com "al-folio/CUSTOMIZE.md at main"
