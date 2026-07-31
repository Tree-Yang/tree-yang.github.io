---
layout: page
permalink: /zh/publications/
title: 学术成果
description: 期刊论文、会议论文与报告
nav: true
nav_order: 2
---

<!-- _pages/zh-publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="quick-links section-nav">
  <a class="btn btn-sm z-depth-0" role="button" href="#journal-articles">期刊论文 <i class="fa-solid fa-circle-down"></i></a>
  <a class="btn btn-sm z-depth-0" role="button" href="#conference-papers">会议论文与报告 <i class="fa-solid fa-circle-down"></i></a>
</div>

<div class="pub-layout">
  <div class="pub-main" markdown="1">

<p class="text-muted">* 通讯作者。</p>

## 期刊论文 {#journal-articles .section-heading}

<div class="publications">

{% bibliography %}

</div>

## 会议论文与报告 {#conference-papers .section-heading}

<div class="publications">

{% bibliography -f talks %}

</div>

  </div>
  <nav class="pub-year-rail" aria-label="跳转到年份">
    <ul class="pub-year-rail-list"></ul>
  </nav>
</div>

<script defer src="{{ '/assets/js/pub-year-rail.js' | relative_url | bust_file_cache }}"></script>
