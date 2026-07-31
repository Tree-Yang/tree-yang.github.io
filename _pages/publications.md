---
layout: page
permalink: /publications/
title: Publications
description: Journal articles, conference papers, and presentations
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="quick-links section-nav">
  <a class="btn btn-sm z-depth-0" role="button" href="#journal-articles">Journal Articles <i class="fa-solid fa-circle-down"></i></a>
  <a class="btn btn-sm z-depth-0" role="button" href="#conference-papers">Conference Papers & Presentations <i class="fa-solid fa-circle-down"></i></a>
</div>

<div class="pub-layout">
  <div class="pub-main" markdown="1">

<p class="text-muted">* Corresponding author.</p>

## Journal Articles {#journal-articles .section-heading}

<div class="publications">

{% bibliography %}

</div>

## Conference Papers & Presentations {#conference-papers .section-heading}

<div class="publications">

{% bibliography -f talks %}

</div>

  </div>
  <nav class="pub-year-rail" aria-label="Jump to year">
    <ul class="pub-year-rail-list"></ul>
  </nav>
</div>

<script defer src="{{ '/assets/js/pub-year-rail.js' | relative_url | bust_file_cache }}"></script>
