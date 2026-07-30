---
layout: page
permalink: /zh/publications/
title: 学术成果
description: 期刊论文、会议论文与报告
nav: true
nav_order: 3
---

<!-- _pages/zh-publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="quick-links">
  <a class="btn btn-sm z-depth-0" role="button" href="#journal-articles">期刊论文</a>
  <a class="btn btn-sm z-depth-0" role="button" href="#conference-papers">会议论文与报告</a>
</div>

<p class="text-muted">* 通讯作者。</p>

## 期刊论文 {#journal-articles}

<div class="publications">

{% bibliography %}

</div>

## 会议论文与报告 {#conference-papers}

<div class="publications">

{% bibliography -f talks %}

</div>
