# CV Case Visual System

Use this visual system for portfolio case-study pages, except photography work.

## Reuse Prompt

沿用 AI 项目的 case visual system：左标题右封面头部、下方四个项目信息点、统一页边距、标题宽度、说明宽度、浅灰卡片和 20px 圆角。项目色按各自品牌或内容语境局部定义，不设作品集全局品牌色。

## Core Tokens

- Page margin: `--page-margin`
- Content max width: `--content-max`
- FUNNYFUZZY orange: `--funnyfuzzy-orange`（仅用于 FUNNYFUZZY 相关项目）
- Shared motion: `--motion-duration-fast`, `--motion-duration-base`, `--motion-duration-slow`, `--motion-enter-distance`, `--motion-ease-standard`
- Light card background: `--case-card-bg`
- Media radius: `--media-radius`
- Section gap: `--case-section-gap` (`236px` desktop, `156px` mobile)
- Hero facts to first content gap: `--case-hero-to-content-gap` (`79px` desktop, `52px` mobile)

## Hero Tokens

- Display title system: `--case-display-title-size`, `--case-display-title-weight`, `--case-display-title-line`, `--case-display-title-letter-spacing`
- Hero title width: `--case-hero-title-width`
- Hero title size and rhythm inherit the display-title tokens through `--case-hero-title-size` and `--case-hero-title-line`
- Hero intro width: `--case-hero-intro-width`
- Hero intro gap: `--case-hero-intro-gap`
- Hero grid ratio: `--case-hero-grid-left`, `--case-hero-grid-right`
- Hero cover alignment: `--case-hero-cover-max-width`, `--case-hero-cover-justify`, `--case-hero-cover-margin-top`
- Hero facts layout: `--case-facts-columns`, `--case-facts-gap`, `--case-facts-margin`

Hero covers use the shared cover tokens rather than project-specific `justify-self` overrides. On desktop, the cover is capped at `592px` and aligned to the right edge of the content grid; on mobile, it stretches to the available width with a shared top gap.

## Section Heading Tokens

- Section title width: `--case-heading-width`
- Section subtitle width: `--case-subtitle-width`
- Section small title size: `--case-section-kicker-size` (`24px`)
- Large section titles inherit the same display-title tokens through `--case-title-size` and `--case-title-line`
- Section subtitle size: `--case-subtitle-size`
- Title/subtitle gap: `--case-heading-gap`

## Title Patterns

- 大标题：只使用一段大字文本，不拆成项目标题加描述。
- 小标题：沿用现有 `case-section-heading` 格式，由短标题和正文说明组成。

## Statement Gallery

用于纯图片展示类项目，例如网页合集、物料合集、视觉系统展示、品牌图集。

调用方式：在项目数据中设置 `caseStudy.template: 'statement-gallery'`。

内容结构：

- 顶部只使用一段大字 statement，不显示单独项目标题和描述。
- 下方直接展示一张主图或拼贴图。
- 不使用四个信息点，不使用底部总结文案。

必填字段：

- `caseStudy.statement`：顶部大字文案。
- `caseStudy.image`：展示图片路径。
- `caseStudy.imageAlt`：图片替代文本。

## Component Pattern

Use `CaseHero` for non-photography project pages:

- Left: project title and intro.
- Right: project cover visual.
- Below: four facts, usually role, users, scene, and output.
