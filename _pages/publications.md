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

<p class="text-muted">* Corresponding author.</p>

## Journal Articles

<div class="publications">

{% bibliography %}

</div>

## Conference Papers & Presentations

<div class="publications">

{% bibliography -f talks %}

</div>
