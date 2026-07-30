# 个人主页维护说明（中文）

本站基于 [al-folio](https://github.com/alshedivat/al-folio) Jekyll 主题，部署在 GitHub Pages：<https://tree-yang.github.io>。
本文说明**各类信息存放在哪里、如何手动修改**。改完推送到 `main` 分支即可自动部署，无需手动操作。

> 面向开发/AI 维护者的设计规范与实现细节，见根目录 `agents.md` 的「This Site: Design System & Customizations」章节。

---

## 一、修改后如何生效

1. 编辑对应文件（见下表）。
2. 若改了 `.liquid` / `.scss` / `.md` / `.yml` 文件，提交前建议运行一次格式化，否则 CI 的 Prettier 检查会报红：
   ```bash
   npx prettier . --write     # 自动格式化
   npx prettier . --check     # 确认无问题（勿改动 _scripts/ 目录）
   ```
3. `git push` 到 `main` 分支 → GitHub Actions 自动构建并发布，约 1–3 分钟后线上更新。**不需要手动部署。**

本地预览（可选，需 Docker）：

```bash
docker compose up      # 打开 http://localhost:8080
```

---

## 二、信息存放位置速查表

| 想改的内容                                                                | 文件                                                                               |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 姓名、网站标题、描述、关键词、网址                                        | `_config.yml`（顶部 `first_name` / `last_name` / `description` 等）                |
| 首页职位副标题（姓名旁的一行小字）                                        | `_pages/about.md` 的 `subtitle`（中文版：`_pages/zh-about.md`）                    |
| 社交/联系方式链接（邮箱、GitHub、Google Scholar、ORCID、ResearchGate 等） | `_data/socials.yml`                                                                |
| **网页版简历（英文）**                                                    | `_data/cv.yml`                                                                     |
| **网页版简历（中文）**                                                    | `_data/cv_zh.yml`                                                                  |
| **期刊论文列表**                                                          | `_bibliography/papers.bib`                                                         |
| **会议论文/报告列表**                                                     | `_bibliography/talks.bib`                                                          |
| 期刊缩写徽章（颜色、链接）                                                | `_data/venues.yml`                                                                 |
| 作者中文名（陈建兵/杨家树/翁丽丽/律梦泽）                                 | `_data/coauthors.yml`                                                              |
| 论文配图（缩略图）                                                        | `assets/img/publication_preview/` + 在 bib 条目加 `preview` 字段                   |
| 首页头像                                                                  | `assets/img/prof_pic.jpg`（**目前是占位图，需替换为真实照片**）                    |
| 首页正文与「研究方向」卡片                                                | `_pages/about.md` / `_pages/zh-about.md`                                           |
| 开源程序（Code）页                                                        | `_pages/projects.md`（英文 `/code/`）/ `_pages/zh-projects.md`（中文 `/zh/code/`） |
| 配色（靛蓝主色、琥珀获奖色）                                              | `_sass/_variables.scss`、`_sass/_themes.scss`                                      |
| 页面组件样式（卡片、按钮等）                                              | `_sass/_components.scss`、`_sass/_publications.scss`                               |
| 功能开关（暗色模式、缩略图等）                                            | `_config.yml`                                                                      |

---

## 三、常见修改怎么做

### 1. 增加一篇期刊论文

在 `_bibliography/papers.bib` 里新增一条 `@article`。可用字段示例：

```bibtex
@article{yourkey2025,
  abbr        = {RESS},          % 期刊缩写徽章（需在 venues.yml 里有对应色，可选）
  bibtex_show = {true},          % 显示 "Bib" 按钮
  selected    = {true},          % 设为代表作 → 首页精选展示（可选）
  author      = {Yang, Jia-Shu and Chen*, Jian-Bing},  % * 表示通讯作者
  title       = {论文英文标题},
  journal     = {Reliability Engineering \& System Safety},
  volume      = {264},
  pages       = {111378},
  year        = {2025},
  doi         = {10.xxxx/xxxx},
  abstract    = {可选，填了会出现 "Abs" 展开按钮},
  award       = {获奖说明，如 Top cited paper (2025).},  % 可选
  award_name  = {Top Cited},     % 获奖徽标上的短文字（琥珀色）
  keywords    = {earthquake engineering}   % 研究方向标签
}
```

### 2. 增加一篇会议报告

在 `_bibliography/talks.bib` 里新增一条 `@inproceedings`，字段与上类似，用 `booktitle` 表示会议名、`location` 表示地点。

### 3. 中文期刊 / 中文会议

额外加上中文字段，网站会以**中文为主、英文为次**显示：

```bibtex
@article{chenxxxx,
  language        = {Chinese},                 % 关键：标记为中文条目
  chinese_title   = {中文标题},                 % 标题主行显示中文
  title           = {English title},           % 英文降为副行
  chinese_journal = {振动工程学报},             % 期刊名显示「中文 / English」
  journal         = {Journal of Vibration Engineering},
  author          = {Yang, Jia-Shu and Chen*, Jian-Bing},  % 会自动显示为「杨家树 (Jia-Shu Yang)」
  ...
}
```

会议报告用 `chinese_booktitle` 对应中文会议名、`location` 用中文地点（如 `西安`）。

> 作者中文名来自 `_data/coauthors.yml`。目前只登记了四位常见合作者，新增其他中文作者需先在该文件补充。

### 4. 给某篇论文配图

把图片（建议命名为 `论文的citekey.png`，约 400×300）放到 `assets/img/publication_preview/`，然后在该 bib 条目里加一行：

```bibtex
preview = {yourkey2025.png},
```

没有配图的论文左侧留白属正常现象。

### 5. 修改简历内容

- 英文简历：改 `_data/cv.yml`；中文简历：改 `_data/cv_zh.yml`。
- 两者结构相同：顶层 `cv:` 下有 `sections:`，各栏目（工作经历、教育、获奖、科研项目、学术兼职等）按条目填写。
- **中文版的 `labels:` 段**负责把栏目标题翻译成中文（如 Experience→工作经历）以及把日期的 "Present" 显示为「至今」。
- 简历以网页卡片形式展示，**不再挂 PDF 下载链接**。

### 6. 更换头像

用真实照片替换 `assets/img/prof_pic.jpg`（同名覆盖即可）。若希望头像显示在首页，再在 `_pages/about.md` 顶部的 front matter 里加：

```yaml
profile:
  align: right
  image: prof_pic.jpg
```

### 7. 调整配色

- 主色（靛蓝）：改 `_sass/_variables.scss` 里的 `$blue-color` 等；
- 获奖色（琥珀）：改 `_sass/_themes.scss` 里的 `--global-award-*`；
- **请勿硬编码颜色到具体组件**，统一走 CSS 变量，才能同时兼容浅色/深色模式。

---

## 四、页面结构一览

| 英文                    | 中文镜像            | 内容                                     |
| ----------------------- | ------------------- | ---------------------------------------- |
| `/`（首页，含研究方向） | `/zh/`              | `_pages/about.md` / `_pages/zh-about.md` |
| `/publications/`        | `/zh/publications/` | 期刊 + 会议，两个区块                    |
| `/code/`                | `/zh/code/`         | 开源程序卡片                             |
| `/cv/`                  | `/zh/cv/`           | 网页版简历                               |

- 中英文切换按钮（导航栏右侧「中 / EN」）会自动跳到当前页的另一语言版本。
- 新增页面时，请**同时创建中英文两份**并保持 `permalink` 对应（如 `/foo/` ↔ `/zh/foo/`），切换按钮才能正确联动。

---

## 五、注意事项

- **不要手动部署**，推送到 `main` 即自动发布。
- 提交前务必跑 `npx prettier . --check`，否则 Prettier CI 会失败（版本已在 `package.json` 锁定）。
  - 历史事故：首次推送时 `deploy`（部署）成功，但 `Prettier code formatter` 检查在 `_layouts/bib.liquid` 上报红，而本地检查却通过。原因是 CI 每次安装**最新版** `@shopify/prettier-plugin-liquid`，其 Liquid 格式规则与本地旧版不一致。解决办法：已在 `package.json` 精确锁定 `prettier@3.9.6` 与 `@shopify/prettier-plugin-liquid@1.11.0`。若日后再次"本地通过、CI 报红"，多半是该插件出了新版本——把 `package.json` 里的版本升到与最新一致并重新格式化即可。（注意：Prettier 检查失败只影响该检查项，不影响网站实际部署。）
- 根目录的 `plan.md`、`resume-*.tex`、`*.pdf` 等源文件已在 `_config.yml` 的 `exclude` 中排除，不会发布到线上，可放心保留。
- 全站强调色只有两种：**靛蓝（主色）+ 琥珀（获奖专用）**，新增元素请沿用，保持风格统一。
