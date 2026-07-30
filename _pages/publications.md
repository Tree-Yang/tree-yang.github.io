---
layout: page
permalink: /publications/
title: Publications
description: Journal articles, conference papers, and presentations
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="quick-links">
  <a class="btn btn-sm z-depth-0" role="button" href="#journal-articles">Journal Articles</a>
  <a class="btn btn-sm z-depth-0" role="button" href="#conference-papers">Conference Papers & Presentations</a>
</div>

<p class="text-muted">* Corresponding author.</p>

## Journal Articles {#journal-articles}

<div class="publications">

{% bibliography %}

</div>

## Conference Papers & Presentations {#conference-papers}

<div class="publications">

{% bibliography -f talks %}

</div>
