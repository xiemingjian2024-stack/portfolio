import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App.jsx';
import { caseFactTokens, navItems, portfolioSections, photographyItems, profile } from './portfolioData.js';

function renderAt(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('portfolio configuration', () => {
  it('keeps six experimental icons separate from the published icon library', async () => {
    const fs = await import('node:fs');
    const candidates = ['camera', 'calendar', 'share', 'download', 'hidden', 'lock'];

    candidates.forEach((name) => {
      const svg = fs.readFileSync(`public/assets/app-icon-guide/candidates/${name}.svg`, 'utf8');
      expect(svg).toContain('viewBox="0 0 40.3045 40.3045"');
      expect(svg).toContain('stroke-width="2.519"');
      if (name === 'lock') {
        expect(svg).toContain('M10.076 18.893V11.336');
      }
    });
  });

  it('defines the six requested bottom navigation modules in order', () => {
    expect(navItems.map((item) => item.label)).toEqual(['APP', '网页', 'AI', '摄影', '关于', '联系']);
    expect(navItems.map((item) => item.path)).toEqual([
      '/app',
      '/web',
      '/ai',
      '/photography',
      '/about',
      '/contact'
    ]);
  });

  it('defines the shared case header fact tokens in order', () => {
    expect(caseFactTokens.map((token) => token.key)).toEqual(['brand', 'status', 'role', 'scope']);
    expect(caseFactTokens.map((token) => token.label)).toEqual(['品牌', '状态', '角色', '范围']);
  });

  it('centers the desktop content width on wide screens like the reference', async () => {
    const css = await import('node:fs').then((fs) => fs.readFileSync('src/styles.css', 'utf8'));
    const docs = await import('node:fs').then((fs) => fs.readFileSync('docs/case-visual-system.md', 'utf8'));
    expect(css).toContain('--content-max: 1700px;');
    expect(css).toContain('max(38px, calc((100vw - var(--content-max)) / 2))');
    expect(css).toContain('--layout-wide-inline-margin: 8.5vw;');
    expect(css).toContain('--page-margin: max(var(--layout-wide-inline-margin), calc((100vw - var(--content-max)) / 2));');
    expect(css).toContain('--project-card-meta-font-size: 14px;');
    expect(css).toContain('--project-card-meta-line-height: 18px;');
    expect(css).toContain('--project-card-meta-summary-gap: 20px;');
    expect(css).toContain('--project-card-summary-link-gap: 32px;');
    expect(css).not.toContain('--page-margin: 48px;');
    expect(css).toContain('--case-hero-cover-max-width: 592px;');
    expect(css).toContain('--case-hero-cover-justify: end;');
    expect(css).toMatch(/\.detail-cover\s*{[^}]*max-width:\s*var\(--case-hero-cover-max-width\);[^}]*justify-self:\s*var\(--case-hero-cover-justify\);/s);
    expect(docs).toContain('Hero cover alignment');
    expect(css).toMatch(/\.brand-evolution\s*{[^}]*min-height:\s*auto;/s);
    expect(css).toMatch(/\.app-icon-lines__copy h3\s*{[^}]*max-width:\s*var\(--case-subtitle-width\);/s);
    expect(css).toContain('--case-display-title-line: 1.28;');
    expect(css).toContain('--case-display-title-weight: 400;');
    expect(css).toContain('--case-statement-title-size: var(--case-display-title-size);');
    expect(css).toContain('--case-hero-title-size: var(--case-display-title-size);');
    expect(css).toMatch(/@media \(min-width:\s*1440px\)\s*{[^}]*--case-display-title-size:\s*50px;/s);
    expect(css).toMatch(/\.minimal-case__statement-title\s*{[^}]*max-width:\s*none;/s);
    expect(css).toMatch(/\.huawei-cloud-cover--video\s*{[^}]*background:\s*#fbfbfb;/s);
    expect(css).toMatch(/\.huawei-cloud-cover--split-image\s*{[^}]*background:\s*#f6f6f6;/s);
    expect(css).toMatch(/\.huawei-cloud-cover__video\s*{[^}]*width:\s*150%;/s);
    expect(docs).toContain('Statement Gallery');
    expect(docs).toContain("`caseStudy.template: 'statement-gallery'`");
  });

  it('pauses project cover animations and gently enlarges cover content on hover', async () => {
    const css = await import('node:fs').then((fs) => fs.readFileSync('src/styles.css', 'utf8'));
    expect(css).toMatch(/\.project-cover:hover,[\s\S]*\.project-cover:hover\s+\*,[\s\S]*animation-play-state:\s*paused !important;/);
    expect(css).toMatch(/\.project-cover:hover\s*>\s*\*,[\s\S]*\.project-cover:focus-visible\s*>\s*\*[\s\S]*transform:\s*scale\(1\.035\);/);
    expect(css).toContain('transition: transform var(--motion-duration-base) var(--motion-ease-standard);');
  });

  it('uses a long scrubbed timeline without intercepting native scrolling', async () => {
    const source = await import('node:fs').then((fs) => fs.readFileSync('src/App.jsx', 'utf8'));
    expect(source).toContain('scrub: 0.65');
    expect(source).toContain('window.innerHeight * 6');
    expect(source).not.toContain('ScrollTrigger.observe');
    expect(source).not.toContain('preventDefault: true');
    expect(source).not.toContain("addEventListener('wheel'");
  });

  it('keeps editable placeholder content centralized', () => {
    expect(profile.name).toBe('谢名剑');
    expect(profile.role).toBe('Design Engineer');
    expect(Object.keys(portfolioSections)).toEqual(['app', 'web', 'ai']);
    expect(photographyItems.length).toBeGreaterThanOrEqual(8);
  });

  it('keeps projects sorted from newest to oldest inside each category', () => {
    const getNewestYear = (year) => Math.max(...String(year).match(/\d{4}/g).map(Number));

    Object.values(portfolioSections).forEach((section) => {
      const years = section.projects.map((project) => getNewestYear(project.year));
      expect(years).toEqual([...years].sort((firstYear, secondYear) => secondYear - firstYear));
    });

    expect(portfolioSections.app.projects.map((project) => project.title)).toEqual([
      'FunnFuzzy APP icon design guide',
      '理想中的华为商城',
      '界面用语规范',
      'V+ 会员',
      '华为商城智能客服',
      '北极星数据监控平台'
    ]);

    expect(portfolioSections.web.projects.map((project) => project.title)).toEqual([
      'FunnyFuzzy商城首页设计',
      'Amazon店铺首页设计',
      'UOM',
      '布家班',
      '华为云产品页设计',
      '华为云活动页设计'
    ]);
  });
});

describe('portfolio routes', () => {
  it('renders the Polaris project with an animated branded cover and a single gallery image', () => {
    renderAt('/app');
    const cover = screen.getByRole('link', { name: '北极星数据监控平台' });
    expect(cover).toHaveClass('project-cover--vmall-polaris');
    expect(cover.querySelector('.vmall-polaris-cover__logo')).toHaveAttribute(
      'src',
      '/assets/vmall-polaris/logo.svg'
    );

    renderAt('/project/app-vmall-polaris');
    expect(screen.getByRole('heading', { name: /北极星数据监控平台面向商城经营与运营团队/ })).toBeInTheDocument();
    expect(document.querySelector('.statement-gallery-case__masonry')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: '北极星数据监控平台移动端界面合集' })).toHaveAttribute(
      'src',
      '/assets/vmall-polaris/gallery.jpg'
    );
  });

  it('redirects the root experience to APP work', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: /移动产品与体验/i })).toBeInTheDocument();
  });

  it('renders real project links and omits empty placeholder projects', () => {
    renderAt('/app');
    expect(screen.getByRole('link', { name: /FunnFuzzy APP icon design guide/i })).toHaveAttribute(
      'href',
      '/project/app-funnfuzzy-icon-guide'
    );
    expect(screen.queryByRole('link', { name: /APP 项目 01/i })).not.toBeInTheDocument();
    expect(portfolioSections.app.projects.every((project) => project.caseStudy)).toBe(true);
    expect(portfolioSections.web.projects.every((project) => project.caseStudy)).toBe(true);
    expect(portfolioSections.ai.projects.every((project) => project.caseStudy)).toBe(true);
    expect(screen.getAllByRole('link', { name: 'Case Study' })[0]).toHaveClass('case-link');
    expect(screen.getAllByText('2025').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/APP/i).length).toBeGreaterThan(0);
  });

  it('renders the FunnFuzzy APP icon guide case with the animated icon system cover', () => {
    renderAt('/project/app-funnfuzzy-icon-guide');

    expect(screen.getByRole('heading', { name: /FunnFuzzy APP icon design guide/i })).toBeInTheDocument();
    expect(screen.getByText(/FunnFuzzy APP 建立一套清晰、可复用的图标设计 guide/i)).toBeInTheDocument();
    expect(document.querySelector('.app-icon-cover__brand img')).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/ff-logo.svg'
    );
    expect(screen.queryByRole('heading', { name: /统一线宽、结构和视觉重心/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Navigation/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /FunnFuzzy APP icon design guide 原稿 1/i })).not.toBeInTheDocument();
    expect(screen.queryByText('01 / 品牌符号演变')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '品牌符号演变' })).toHaveClass(
      'case-section-heading__title'
    );
    expect(screen.getByText(/兼顾品牌识别与功能清晰度/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '几何结构' })).toBeInTheDocument();
    expect(screen.getByText(/方形网格与圆形基准/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /方形与圆形几何结构规范/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/geometric-structure.svg'
    );
    expect(screen.getByRole('img', { name: /方形与圆形几何结构规范/ })).toHaveClass(
      'app-icon-geometry__image'
    );
    expect(screen.getByRole('heading', { name: '线条' })).toBeInTheDocument();
    expect(screen.getByText(/控制线段长度、间距和视觉重心/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Shipping 图标线条与端点规范/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/line-system/shipping.svg'
    );
    expect(screen.getByRole('img', { name: /Sort 图标线条与端点规范/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/line-system/sort.svg'
    );
    expect(screen.getByRole('img', { name: /Filter 图标线条与端点规范/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/line-system/filter.svg'
    );
    expect(document.querySelectorAll('.app-icon-lines__cards figcaption')).toHaveLength(0);
    expect(document.querySelector('.app-icon-lines__cards')).toHaveClass('case-visual-stack');
    expect(screen.getByRole('heading', { name: '修饰符' })).toBeInTheDocument();
    expect(screen.getByText(/修饰符外扩 3dp 建立独立安全区/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Classification 组合图标修饰符规范/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/modifiers/classification.svg'
    );
    expect(screen.getByRole('img', { name: /Processing 组合图标修饰符规范/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/modifiers/processing.svg'
    );
    expect(screen.getByRole('img', { name: /Contact 组合图标修饰符规范/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/modifiers/contact.svg'
    );
    expect(document.querySelectorAll('.app-icon-modifiers__cards figcaption')).toHaveLength(0);
    expect(screen.getByRole('heading', { name: '设计展示' })).toBeInTheDocument();
    expect(screen.getByText(/在统一网格中校验线宽、尺寸、留白和视觉重心/)).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /FunnFuzzy APP 图标展示/ })).toHaveLength(42);
    expect(document.querySelector('.app-icon-showcase__grid')).toHaveClass('app-icon-showcase__grid');
    expect(screen.getByRole('heading', { name: '场景应用' })).toBeInTheDocument();
    expect(screen.getByText(/导航、订单、会员、筛选与宠物档案等高频界面/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /FunnFuzzy APP 图标实际应用展示/ })).toHaveAttribute(
      'src',
      '/assets/app-icon-guide/application-showcase.jpg'
    );
    expect(document.querySelector('.brand-evolution-visual')).toHaveAttribute('data-animation', 'scrubbed');
    expect(document.querySelectorAll('[data-evolution-stage]')).toHaveLength(7);
    expect(document.querySelector('.brand-evolution-symbol-cloud')).not.toBeInTheDocument();
    const fragmentGroups = document.querySelectorAll('.brand-evolution-fragments');
    expect(fragmentGroups).toHaveLength(1);
    fragmentGroups.forEach((group) => {
      const fragmentImages = group.querySelectorAll('img');
      expect(fragmentImages).toHaveLength(2);
      fragmentImages.forEach((image) => {
        expect(image).toHaveAttribute(
          'src',
          '/assets/app-icon-guide/brand-evolution-ascii/word-logo-accent.svg'
        );
      });
    });
  });

  it('keeps the product asset locator in the AI case studies', () => {
    renderAt('/ai');

    expect(screen.getByRole('link', { name: /产品素材快速定位工具/i })).toHaveAttribute(
      'href',
      '/project/ai-product-assets-locator'
    );
    expect(screen.getByText(/从产品页快速找到 SPU 与 NAS 素材/i)).toBeInTheDocument();
  });

  it('adds the local AI material collector with its application logo and a complete case narrative', () => {
    const { unmount } = renderAt('/ai');
    const cover = screen.getByRole('link', { name: '谢小屯 — AI 素材采集器' });

    expect(cover).toHaveClass('project-cover--material-collector');
    expect(within(cover).getByRole('img', { name: '谢小屯应用 Logo' })).toHaveAttribute(
      'src',
      '/assets/material-collector/cangshu-cover-icon.svg'
    );
    expect(cover.querySelector('.material-collector-cover__background')).toHaveAttribute(
      'src',
      '/assets/material-collector/cover-grid-background.png'
    );
    expect(within(cover).queryByText('谢小屯')).not.toBeInTheDocument();
    expect(cover).toHaveAttribute('href', '/project/ai-material-collector');

    unmount();
    renderAt('/project/ai-material-collector');

    expect(screen.getByRole('heading', { name: '谢小屯 — AI 素材采集器' })).toBeInTheDocument();
    expect(document.querySelector('.detail-cover--material-collector')).toContainElement(
      screen.getByRole('img', { name: '谢小屯应用 Logo' })
    );
    expect(screen.getByRole('heading', { name: /把“采集—理解—纠正—再利用”收进本地.*逐步长成贴近个人工作方式的素材系统/ })).toBeInTheDocument();
    expect(screen.queryByText('项目思路')).not.toBeInTheDocument();
    expect(screen.queryByText(/不是再做一个云端收藏夹/)).not.toBeInTheDocument();
    const workflow = screen.getByRole('list', { name: '采集到偏好学习的五步闭环' });
    expect(screen.queryByText('我负责采集与校准，让模型从每次选择中持续学习')).not.toBeInTheDocument();
    expect(screen.queryByText('工作流角色')).not.toBeInTheDocument();
    expect(screen.queryByText('本地模型参与')).not.toBeInTheDocument();
    expect(within(workflow).getAllByRole('listitem')).toHaveLength(5);
    expect(within(workflow).getByText('我选择参与')).toBeInTheDocument();
    expect(within(workflow).getByText('检索与复用')).toBeInTheDocument();
    expect(within(workflow).getAllByText('我参与')).toHaveLength(1);
    expect(within(workflow).getAllByText('本地模型')).toHaveLength(2);
    expect(within(workflow).getByText('自动执行')).toBeInTheDocument();
    expect(screen.queryByText('偏好回流')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '设计背景' })).toBeInTheDocument();
    expect(screen.getByText(/花瓣承接了日常灵感收藏，却没有完全接上本地工作流/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '跨平台采集受限' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '本地归档需要维护' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '分类与标签成本高' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '列表页直取原始大图' })).toBeInTheDocument();
    expect(screen.getByText(/Behance 等素材网站中直接解析卡片对应的大图地址/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Behance 移动端界面设计作品列表页' })).toHaveAttribute(
      'src',
      '/assets/material-collector/behance-list-page-latest.png'
    );
    const collectButton = screen.getByRole('button', { name: '采集素材' });
    expect(collectButton).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(collectButton);
    expect(collectButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('已存入素材库');
    expect(screen.getByRole('heading', { name: '制定标签逻辑' })).toBeInTheDocument();
    expect(screen.getByText(/先判断素材是什么，再决定该用哪些标签。分类不是一次模型调用/)).toBeInTheDocument();
    expect(screen.queryByText('04 / 设计过程 · 标签判断逻辑制定')).not.toBeInTheDocument();
    expect(screen.getByLabelText('本地模型标签判断树')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qwen3-VL 2B · 4-bit' })).toBeInTheDocument();
    expect(screen.getByText('UI 置信度 ≥ 0.80')).toBeInTheDocument();
    expect(screen.getByText('页面类型 ≤ 1')).toBeInTheDocument();
    expect(screen.getByText('人工新增', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('人工删除', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.queryByText('05 / 设计过程 · 浏览')).not.toBeInTheDocument();
    expect(screen.queryByText('06 / 设计过程 · 学习')).not.toBeInTheDocument();
    expect(screen.queryByText('07 / 协作与同步 / 可扩展路线')).not.toBeInTheDocument();
    expect(screen.queryByText('08 / 项目成果')).not.toBeInTheDocument();
    const learningHeading = screen.getByRole('heading', { name: '让人工判断始终高于自动判断' });
    const collaborationHeading = screen.getByRole('heading', { name: '从本地优先出发，逐步长出协作能力' });
    expect(learningHeading.compareDocumentPosition(collaborationHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('img', { name: '谢小屯本地素材库瀑布流首页' })).toHaveAttribute(
      'src',
      '/assets/material-collector/library-home-labeled.png'
    );
    expect(screen.getByRole('img', { name: '谢小屯素材详情与标签修正界面' })).toHaveAttribute(
      'src',
      '/assets/material-collector/library-detail-latest.png'
    );
    expect(screen.getByRole('heading', { name: '工具对比' })).toBeInTheDocument();
    expect(screen.getByText(/花瓣更像成熟的云端灵感平台，谢小屯更像贴身的本地工作台/)).toBeInTheDocument();
    expect(screen.getByRole('table', { name: '花瓣与谢小屯能力对比' })).toBeInTheDocument();
    expect(screen.getByText(/分类、用途标签和属性识别由本地模型异步完成/)).toBeInTheDocument();
    expect(screen.getByText('更纯粹')).toBeInTheDocument();
    expect(screen.getByLabelText('协作与同步可扩展路线')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '共享素材包' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '用户自选同步源' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '共享标签词典' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '临时项目组' })).toBeInTheDocument();
    expect(screen.getByText(/项目结束后可解散项目组，素材仍保留在个人素材库中/)).toBeInTheDocument();
    expect(screen.getByText(/原文件直接进入用户指定文件夹/)).toBeInTheDocument();
    expect(screen.queryByText(/谢小屯更好的地方，不是功能更多/)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /最终，采集、理解、纠正与再利用成为一条连续的本地工作流/ })).not.toBeInTheDocument();
    expect(screen.queryByText('47')).not.toBeInTheDocument();
    expect(screen.queryByText('93')).not.toBeInTheDocument();
    expect(screen.queryByText('57')).not.toBeInTheDocument();
  });

  it('adds the Amazon Store homepage case to Web with research, final designs, and result placeholders', () => {
    const { unmount } = renderAt('/web');

    expect(screen.getByRole('link', { name: 'Amazon店铺首页设计' })).toHaveAttribute(
      'href',
      '/project/web-amazon-store-home'
    );

    unmount();
    renderAt('/project/web-amazon-store-home');

    expect(screen.getByRole('heading', { name: 'Amazon店铺首页设计' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '数据结果' })).toBeInTheDocument();
    expect(screen.getByText('店铺访问量')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Amazon 店铺首页最终 Web 端完整方案/ })).toHaveAttribute(
      'src',
      '/assets/amazon-store-home/final-desktop-hq.jpg'
    );
    expect(screen.getByRole('img', { name: /Amazon 店铺首页最终移动端完整方案/ })).toHaveAttribute(
      'src',
      '/assets/amazon-store-home/final-mobile.jpg'
    );
    expect(screen.getByRole('region', { name: '最终双端设计' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Chuckit!/i })).toHaveAttribute(
      'href',
      'https://www.thinknectar.com/case-studies/chuckit-gets-thrown-a-brand-store-makeover'
    );
    expect(document.querySelectorAll('.amazon-benchmark__grid > a')).toHaveLength(6);
    expect(screen.getByRole('heading', { name: 'Petcube' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Teton Sports' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Yogi Tea' })).toBeInTheDocument();
    expect(screen.getByText('研究结论')).toBeInTheDocument();
  });

  it('adds the FunnyFuzzy homepage case with real page assets, native explanations, and measured results', async () => {
    const { unmount } = renderAt('/web');

    const cover = screen.getByRole('link', { name: 'FunnyFuzzy商城首页设计' });
    expect(cover).toHaveAttribute('href', '/project/web-funnyfuzzy-homepage');
    expect(cover).not.toHaveClass('project-cover--placeholder');
    expect(within(cover).getByRole('img', { name: '绿色沙发上的电脑展示 FunnyFuzzy 商城首页首屏' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/cover.png'
    );
    const projectMeta = within(screen.getByLabelText('FunnyFuzzy商城首页设计 信息'));
    expect(projectMeta.getByText('2026')).toBeInTheDocument();
    expect(projectMeta.getByText('网页设计')).toBeInTheDocument();

    unmount();
    renderAt('/project/web-funnyfuzzy-homepage');

    expect(screen.getByRole('heading', { name: 'FunnyFuzzy商城首页设计' })).toBeInTheDocument();
    expect(screen.getByText('FunnyFuzzy')).toBeInTheDocument();
    expect(screen.getByText('设计与策略')).toBeInTheDocument();
    expect(screen.getByText('研究、框架、设计')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'funnyfuzzy.com' })).toHaveAttribute(
      'href',
      'https://funnyfuzzy.com/'
    );
    expect(document.querySelector('.detail-cover--placeholder')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: '绿色沙发上的电脑展示 FunnyFuzzy 商城首页首屏' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/cover.png'
    );
    expect(screen.getByText(/把 FunnyFuzzy 首页从商品与活动的堆叠/)).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: '项目概述' })).not.toBeInTheDocument();
    const contextSection = screen.getByRole('region', { name: '首页改版任务' });
    expect(within(contextSection).queryByRole('heading', { name: '项目背景与目标' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /重新定义.*首页的任务/ })).toBeInTheDocument();
    expect(within(contextSection).queryByText('1人')).not.toBeInTheDocument();
    expect(within(contextSection).getByText(/我负责研究、页面框架、视觉设计与双端适配/)).toBeInTheDocument();
    const moodboard = screen.getByRole('region', { name: '视觉情绪版' });
    expect(within(moodboard).getByRole('heading', { name: '视觉情绪版' })).toBeInTheDocument();
    expect(within(moodboard).getAllByRole('img')).toHaveLength(3);
    expect(within(moodboard).getByText('场景建立第一印象')).toBeInTheDocument();
    expect(within(moodboard).getByText('层级引导浏览节奏')).toBeInTheDocument();
    expect(within(moodboard).getByText('小圆角贴近生活物件')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '改版前体验诊断' })).toHaveClass('case-section-heading__title');
    const beforeDesktop = screen.getByRole('img', { name: 'FunnyFuzzy 改版前桌面端首页' });
    expect(beforeDesktop).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/before-desktop.webp'
    );
    expect(screen.getByLabelText('FunnyFuzzy 改版前桌面端首页 页面滚动预览')).toBeInTheDocument();
    expect(screen.getByLabelText('FunnyFuzzy 改版前移动端首页 页面滚动预览')).toBeInTheDocument();
    expect(screen.getByLabelText('改版前体验问题总结').children).toHaveLength(4);
    const firstDiagnosis = screen.getByRole('heading', { name: '信息层级混杂' });
    expect(beforeDesktop.compareDocumentPosition(firstDiagnosis) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.queryByText('BEFORE / WEB')).not.toBeInTheDocument();
    expect(screen.queryByText('BEFORE / WAP')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: '方案 A桌面端首页完整设计' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/direction-a-desktop.webp'
    );
    expect(screen.getByText(/处于 F 型阅读动线以外区域的信息/)).toBeInTheDocument();
    expect(screen.queryByText(/以明确的横向模块和线性顺序组织信息/)).not.toBeInTheDocument();
    const directionSection = screen.getByRole('region', { name: '设计方向探索' });
    const directionTabs = within(directionSection).getAllByRole('tab');
    expect(directionTabs).toHaveLength(2);
    expect(screen.getByRole('tab', { name: '方案 A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '方案 B' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.queryByRole('img', { name: '方案 B桌面端首页完整设计' })).not.toBeInTheDocument();
    const directionAScroller = screen.getByRole('region', { name: '滚动查看方案 A桌面端完整页面' });
    const directionAMobileScroller = screen.getByRole('region', { name: '滚动查看方案 A移动端完整页面' });
    expect(directionAScroller).toBeInTheDocument();
    expect(directionAMobileScroller).toBeInTheDocument();
    expect(directionAMobileScroller.compareDocumentPosition(directionAScroller) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const directionAChapter = directionAScroller.closest('.ff-direction-chapter');
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[0]).toHaveClass('is-active');
    expect(within(directionAChapter).getByText(/尼尔森在 2006 年的网页眼动研究/)).toBeInTheDocument();
    expect(within(directionAChapter).queryByText('商品承接')).not.toBeInTheDocument();
    Object.defineProperties(directionAScroller, {
      scrollHeight: { configurable: true, value: 1000 },
      clientHeight: { configurable: true, value: 200 },
      scrollTop: { configurable: true, value: 90 },
    });
    fireEvent.scroll(directionAScroller);
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[1]).toHaveClass('is-active');
    Object.defineProperty(directionAScroller, 'scrollTop', { configurable: true, value: 240 });
    fireEvent.scroll(directionAScroller);
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[2]).toHaveClass('is-active');
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[2]).toHaveTextContent('场景入口');
    Object.defineProperty(directionAScroller, 'scrollTop', { configurable: true, value: 320 });
    fireEvent.scroll(directionAScroller);
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[3]).toHaveClass('is-active');
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[3]).toHaveTextContent('宠物尺寸入口');
    Object.defineProperty(directionAScroller, 'scrollTop', { configurable: true, value: 420 });
    fireEvent.scroll(directionAScroller);
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[4]).toHaveClass('is-active');
    Object.defineProperty(directionAScroller, 'scrollTop', { configurable: true, value: 760 });
    fireEvent.scroll(directionAScroller);
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[5]).toHaveClass('is-active');
    Object.defineProperties(directionAMobileScroller, {
      scrollHeight: { configurable: true, value: 1200 },
      clientHeight: { configurable: true, value: 240 },
      scrollTop: { configurable: true, value: 600 },
    });
    fireEvent.scroll(directionAMobileScroller);
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__annotations article')[5]).toHaveClass('is-active');
    expect(directionAChapter.querySelectorAll('.ff-direction-chapter__scroll-marker')).toHaveLength(0);
    expect(screen.getByRole('img', { name: '宠物尺寸入口的破框构图与悬停状态', hidden: true })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/direction-a-pet-size-hover.jpg'
    );
    expect(screen.getByRole('img', { name: '方案 A 场景网格拓展状态', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '空间场景中的商品热点与展开卡片', hidden: true })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/direction-a-space-exploration.png'
    );
    fireEvent.click(screen.getByRole('tab', { name: '方案 B' }));
    expect(screen.getByRole('tab', { name: '方案 A' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: '方案 B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('img', { name: '方案 B桌面端首页完整设计' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/direction-b-desktop.webp'
    );
    expect(screen.getByRole('region', { name: '滚动查看方案 B桌面端完整页面' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '滚动查看方案 B移动端完整页面' })).toBeInTheDocument();
    expect(screen.getByText(/提高空间利用率、减少无效留白/)).toBeInTheDocument();
    expect(screen.getByText(/不适合需要连续、深度阅读的文字型内容/)).toBeInTheDocument();
    expect(screen.getAllByText('场景网格').length).toBeGreaterThan(0);
    const strategySection = screen.getByRole('region', { name: '核心设计策略' });
    expect(within(strategySection).getByRole('heading', { name: '核心设计策略' })).toHaveClass('case-section-heading__title');
    expect(within(strategySection).getByRole('heading', { name: '保持双端路径一致' })).toBeInTheDocument();
    expect(within(strategySection).getAllByRole('img')).toHaveLength(4);
    expect(within(strategySection).getByRole('img', { name: '由沙发与家居形态组成的抽象生活场景' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/strategy-context.png'
    );
    expect(screen.getByRole('img', { name: 'FunnyFuzzy 商城首页最终移动端设计' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/final-mobile.webp'
    );
    expect(screen.getByText(/Variant\s+38\.46%/)).toBeInTheDocument();
    expect(screen.getByText(/Variant\s+8\.65%/)).toBeInTheDocument();
    expect(screen.getByText('$7.04 → $7.99')).toBeInTheDocument();
    const extensionSection = screen.getByRole('region', { name: '后续系列页范围' });
    expect(within(extensionSection).getByRole('tab', { name: 'Before' })).toHaveAttribute('aria-selected', 'true');
    expect(within(extensionSection).getByRole('img', { name: 'FunnyFuzzy 类目页Before桌面端设计' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/category-before-desktop.jpg'
    );
    fireEvent.click(within(extensionSection).getByRole('tab', { name: 'After' }));
    expect(within(extensionSection).getByRole('tab', { name: 'After' })).toHaveAttribute('aria-selected', 'true');
    expect(within(extensionSection).getByRole('img', { name: 'FunnyFuzzy 类目页After移动端设计' })).toHaveAttribute(
      'src',
      '/assets/funnyfuzzy-homepage/category-after-mobile.jpg'
    );
    expect(screen.queryByText(/线上 A\/B 测试/)).not.toBeInTheDocument();
    expect(screen.getByText(/探索两种不同的内容承接方式/)).toBeInTheDocument();
    expect(document.querySelectorAll('.ff-directions__explorer > .ff-direction-chapter')).toHaveLength(1);

    const fs = await import('node:fs');
    expect(fs.readdirSync('public/assets/funnyfuzzy-homepage').sort()).toEqual([
      'before-desktop.webp',
      'before-mobile.webp',
      'breathing-marker-static.png',
      'breathing-marker.gif',
      'category-after-desktop.jpg',
      'category-after-mobile.jpg',
      'category-before-desktop.jpg',
      'category-before-mobile.jpg',
      'cover.png',
      'direction-a-desktop.webp',
      'direction-a-grid-state-1.jpg',
      'direction-a-grid-state-2.jpg',
      'direction-a-mobile.webp',
      'direction-a-pet-size-hover.jpg',
      'direction-a-space-exploration.png',
      'direction-b-desktop.webp',
      'direction-b-mobile.webp',
      'final-desktop.webp',
      'final-mobile.webp',
      'mood-immersion.webp',
      'mood-softness.webp',
      'mood-vitality.webp',
      'strategy-context.png',
      'strategy-responsive.png',
      'strategy-rhythm.png',
      'strategy-scale.png'
    ]);
  });

  it('adds UOM as a Web case with evidence, system assets, and interactive planning', () => {
    const { unmount } = renderAt('/web');

    expect(screen.getByRole('link', { name: 'UOM' })).toHaveAttribute(
      'href',
      '/project/web-uom'
    );
    expect(screen.getByRole('link', { name: 'UOM' })).toHaveClass('project-cover--uom');
    const uomMeta = within(screen.getByLabelText('UOM 信息'));
    expect(uomMeta.getByText('2024')).toBeInTheDocument();
    expect(uomMeta.getByText('后台系统')).toBeInTheDocument();
    const uomCover = document.querySelector('.project-cover--uom .uom-cover');
    expect(uomCover.querySelector('.uom-cover__orb')).toHaveAttribute(
      'src',
      '/assets/uom/uom-guideline-orb.png'
    );
    expect(uomCover.querySelector('.uom-cover__logo')).toHaveAttribute(
      'src',
      '/assets/uom/uom-vmall-portal.svg'
    );
    expect(uomCover.querySelector('.uom-cover__title')).not.toBeInTheDocument();
    expect(uomCover.querySelector('.uom-cover__visual')).not.toBeInTheDocument();
    expect(uomCover.querySelector('.uom-cover__scene')).not.toBeInTheDocument();
    expect(uomCover.querySelector('.uom-cover__principle')).not.toBeInTheDocument();

    unmount();
    renderAt('/project/web-uom');

    expect(screen.getByRole('heading', { name: 'UOM' })).toBeInTheDocument();
    expect(screen.getByText(/UOM 是华为商城面向运营、产品与业务团队的统一运营管理平台/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '用户调研与问题归因' })).toBeInTheDocument();
    expect(screen.getByText('品牌')).toBeInTheDocument();
    expect(screen.getByText('华为商城')).toBeInTheDocument();
    expect(screen.getByText('状态')).toBeInTheDocument();
    expect(screen.getByText('已上线')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /围绕华为商城 UOM 后台/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '项目计划' })).toBeInTheDocument();
    expect(screen.queryByText('Project target')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '体验反馈' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '线上化' })).toBeInTheDocument();
    expect(document.querySelectorAll('.uom-target__timeline')).toHaveLength(4);
    expect(document.querySelectorAll('.uom-target__timeline-node')).toHaveLength(4);
    expect(document.querySelectorAll('.uom-target__timeline-track')).toHaveLength(4);
    expect(screen.getByText(/建立从问题发现到设计、研发与上线协同落地的长期治理机制/)).toBeInTheDocument();
    const targetFloor = document.querySelector('.uom-target-section');
    const researchFloor = document.querySelector('.uom-research');
    expect(targetFloor.nextElementSibling).toBe(researchFloor);
    expect(targetFloor.querySelector('.case-section-heading--statement')).toHaveTextContent(
      '系统盘点组件、页面与公共能力'
    );
    expect(targetFloor.querySelector('.uom-target-section__plan-heading')).toHaveTextContent('项目计划');
    expect(targetFloor.querySelector('.uom-target')).not.toHaveTextContent('Project target');
    const issueExplorer = researchFloor.querySelector('.uom-issue-explorer');
    const researchMetrics = within(researchFloor).getByLabelText('用户调研规模');
    expect(researchMetrics).toBeInTheDocument();
    expect(issueExplorer).toContainElement(researchMetrics);
    expect(within(issueExplorer).getByRole('heading', { name: '内部调研' })).toBeInTheDocument();
    expect(within(issueExplorer).queryByText(/Problem mapping/i)).not.toBeInTheDocument();
    expect(within(issueExplorer).queryByText(/典型反馈摘录/)).not.toBeInTheDocument();
    expect(within(issueExplorer).queryByText('01')).not.toBeInTheDocument();
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(within(researchFloor).getAllByText(/组件及样式|体验问题/)).toHaveLength(2);
    expect(within(researchFloor).queryByText('公共能力')).not.toBeInTheDocument();
    expect(within(researchFloor).queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText(/附件列出的三类页面合计为 90%/)).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'UOM 色彩、字体和图标规范' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '把分散的视觉语言沉淀为一致、可复用的基础规则' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '颜色' })).toBeInTheDocument();
    expect(screen.getByText(/主色采用具有沉稳、可靠含义的深蓝色/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 主色、状态色与文字色规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/color-system.jpg'
    );
    expect(screen.getByRole('heading', { name: '字体' })).toBeInTheDocument();
    expect(screen.getByText(/字体默认使用鸿蒙黑体/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 中文、英文与数字字体规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/typography-system.svg'
    );
    expect(screen.getByRole('heading', { name: '图标' })).toBeInTheDocument();
    expect(screen.getByText(/系统图标以 64 × 64 px 为设计参考/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 图标尺寸、比例与类型规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/icon-system.svg'
    );
    expect(screen.getByRole('heading', { name: '栅格' })).toBeInTheDocument();
    expect(screen.getByText(/当前提供 Web 端 1700 px/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM Web 端十二列栅格布局规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/grid-system.svg'
    );
    expect(screen.getByRole('heading', { name: '侧边菜单与布局' })).toBeInTheDocument();
    expect(screen.getByText(/页面边距为 20 px，模块上下间距为 12 px/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 侧边菜单与后台页面布局规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/sidebar-layout.png'
    );
    expect(screen.getByRole('heading', { name: '把高频交互沉淀为一致、可复用的设计控件' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '按钮' })).toBeInTheDocument();
    expect(screen.getByText(/常规按钮最小宽度为 96 px/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 按钮类型、尺寸与交互状态规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/button-system.svg'
    );
    expect(screen.getByRole('heading', { name: '输入框' })).toBeInTheDocument();
    expect(screen.getByText(/在过滤框架中采用标签在上/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 输入框结构、尺寸与状态规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/input-system.svg'
    );
    expect(screen.getByRole('heading', { name: '下拉菜单' })).toBeInTheDocument();
    expect(screen.getByText(/下拉菜单默认显示水印文本/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 下拉菜单单选、多选与搜索状态规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/select-system.svg'
    );
    expect(screen.getByRole('heading', { name: 'Checkbox' })).toBeInTheDocument();
    expect(screen.getByText(/提供单选框与多选框两种样式/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 单选框与多选框状态及布局规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/checkbox-system.svg'
    );
    expect(screen.getByRole('heading', { name: '时间选择' })).toBeInTheDocument();
    expect(screen.getByText(/时间选择器提供手动输入与选择输入两种方式/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 时间段、快捷范围与时分秒选择规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/date-time-system.svg'
    );
    expect(screen.getByRole('heading', { name: '地址选择' })).toBeInTheDocument();
    expect(screen.getByText(/悬停时可查看完整文案/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 地址选择器输入与多级选择规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/address-system.svg'
    );
    expect(screen.getByRole('heading', { name: '文件上传' })).toBeInTheDocument();
    expect(screen.getByText(/文件上传支持图片预览与文件列表两种展示形式/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UOM 图片预览与文件列表上传规范' })).toHaveAttribute(
      'src',
      '/assets/uom/component-system/upload-system.svg'
    );
    expect(screen.getByRole('img', { name: 'UOM 车商品管理、运营单创建、选配组合与商品价格设计展示' })).toHaveAttribute(
      'src',
      '/assets/uom/uom-design-showcase.jpg'
    );
    const outcomeFloor = screen.getByRole('heading', { name: /规范不是终点/ }).closest('section');
    expect(outcomeFloor).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '规范沉淀' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '工具协同' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '持续治理' })).toBeInTheDocument();
    expect(within(outcomeFloor).queryByText('2025 H1')).not.toBeInTheDocument();

    const issueTabs = screen.getByRole('tablist', { name: '体验问题类型' });
    const usabilityTab = within(issueTabs).getByRole('tab', { name: '组件不好用' });
    fireEvent.click(usabilityTab);
    expect(usabilityTab).toHaveAttribute('aria-selected', 'true');
    expect(within(usabilityTab).getByText(/难以支持复杂运营任务/)).toBeInTheDocument();
    expect(screen.getByText(/关键信息都折叠在表格里/)).toBeInTheDocument();
    expect(screen.getByText(/翻页查看详情后再返回/)).toBeInTheDocument();
    expect(document.querySelectorAll('.uom-feedback-card')).toHaveLength(9);
    expect(document.querySelectorAll('.uom-feedback-card img')).toHaveLength(9);
    expect(within(document.querySelector('#uom-issue-panel')).queryByText('调研记录')).not.toBeInTheDocument();

    const analysisFloor = document.querySelector('.uom-analysis');
    expect(researchFloor.nextElementSibling).toBe(analysisFloor);
    expect(within(analysisFloor).getByRole('heading', { name: '能力现状与设计拆解' })).toBeInTheDocument();
    expect(within(analysisFloor).getByRole('list', { name: '从根因到设计目标的分析路径' })).toBeInTheDocument();
    expect(within(analysisFloor).getByText(/BP、MS、CP、BDS 四大业务域/)).toBeInTheDocument();
    expect(within(analysisFloor).getByText('规范停留在文档，缺少有效遵从机制')).toBeInTheDocument();
    expect(within(analysisFloor).getByRole('heading', { name: '完善 UX 规范' })).toBeInTheDocument();
    expect(analysisFloor.querySelectorAll('.uom-analysis-map__stage')).toHaveLength(4);
    expect(analysisFloor.querySelectorAll('.uom-analysis-map__connectors svg')).toHaveLength(6);
    expect(analysisFloor.querySelector('.uom-analysis-map__label')).not.toHaveTextContent('01');

    const tacticFloor = document.querySelector('.uom-tactic');
    expect(within(tacticFloor).getByRole('heading', { name: '分层治理页面，优先整改高频入口' })).toBeInTheDocument();
    expect(within(tacticFloor).getByRole('heading', { name: '页面分级治理' })).toBeInTheDocument();
    expect(within(tacticFloor).getByRole('heading', { name: 'TOP50 高频菜单' })).toBeInTheDocument();
    expect(tacticFloor.querySelectorAll('.uom-page-type')).toHaveLength(3);
    expect(within(tacticFloor).getByText('优先整改 TOP50 高频访问菜单')).toBeInTheDocument();
    expect(within(tacticFloor).getByText(/访问量最高的 6 个入口/)).toBeInTheDocument();

    const versionTabs = screen.getByRole('tablist', { name: '版本选择' });
    expect(screen.getByRole('heading', { name: '开发版本计划' })).toBeInTheDocument();
    expect(screen.getByLabelText('产研协同流程')).toBeInTheDocument();
    expect(within(screen.getByLabelText('产研协同流程')).getByText('按节奏开发')).toBeInTheDocument();
    const version255 = within(versionTabs).getByRole('tab', { name: /25\.5/ });
    fireEvent.click(version255);
    expect(version255).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: '完善审核与内容管理' })).toBeInTheDocument();
    expect(within(document.querySelector('#uom-roadmap-panel')).getByText('操作日志')).toBeInTheDocument();
    expect(within(document.querySelector('#uom-roadmap-panel')).getByRole('columnheader', { name: '现状痛点' })).toBeInTheDocument();
    expect(within(document.querySelector('#uom-roadmap-panel')).getByText(/提前 5 分钟倒计时提醒/)).toBeInTheDocument();
  });

  it('scopes the FUNNYFUZZY orange token away from UOM and the portfolio foundation', async () => {
    const css = await import('node:fs').then((fs) => fs.readFileSync('src/styles.css', 'utf8'));
    const docs = await import('node:fs').then((fs) => fs.readFileSync('docs/case-visual-system.md', 'utf8'));

    expect(css).toContain('--funnyfuzzy-orange: #ffac33;');
    expect(css).not.toContain('--brand-orange');
    expect(css).toContain('--uom-accent: #6993ff;');
    expect(css).toMatch(/\.uom-cover\s*\{[^}]*background:\s*#f2f3f5;/s);
    expect(css).toMatch(/\.uom-cover__orb\s*\{[^}]*bottom:\s*-45%;/s);
    expect(css).toMatch(/\.uom-issue-explorer\s*{[^}]*background:\s*var\(--uom-surface\);/s);
    expect(css).toContain('--uom-cover-blue-rgb: 105, 147, 255;');
    expect(css).toContain('--uom-cover-green-rgb: 82, 196, 26;');
    expect(css).toContain('--uom-cover-red-rgb: 210, 10, 44;');
    expect(css).toContain('background: rgba(var(--uom-principle-rgb), .5);');
    expect(css).toMatch(/\.uom-cover__color--efficiency\s*{[^}]*z-index:\s*1;/s);
    expect(css).toMatch(/\.uom-cover__principle--efficiency\s*{[^}]*z-index:\s*2;/s);
    expect(css).toMatch(/\.uom-cover__blur-clip--collaboration\s*{[^}]*z-index:\s*3;[^}]*animation-name:\s*uom-cover-blur-clip-right;/s);
    expect(css).toMatch(/\.uom-cover__color--collaboration\s*{[^}]*z-index:\s*4;/s);
    expect(css).toMatch(/\.uom-cover__principle--collaboration\s*{[^}]*z-index:\s*5;/s);
    expect(css).toMatch(/\.uom-cover__blur-clip--consistency\s*{[^}]*z-index:\s*6;[^}]*animation-name:\s*uom-cover-blur-clip-top;/s);
    expect(css).toMatch(/\.uom-cover__color--consistency\s*{[^}]*z-index:\s*7;/s);
    expect(css).toMatch(/\.uom-cover__principle--consistency\s*{[^}]*z-index:\s*8;/s);
    expect(css).toContain('filter: blur(8px);');
    expect(css).toContain('filter: blur(10px);');
    expect(css).toMatch(/\.uom-cover__principle\s*{[^}]*border:\s*0;[^}]*background:\s*transparent;[^}]*box-shadow:\s*none;/s);
    expect(css).toMatch(/@keyframes uom-cover-blur-clip-right\s*{[\s\S]*clip-path:\s*circle\(27% at 73% 66\.85%\);/);
    expect(css).toMatch(/@keyframes uom-cover-blur-clip-top\s*{[\s\S]*clip-path:\s*circle\(27% at 50% 27%\);/);
    expect(css).toContain('bottom: 6.15%;');
    expect(css).toMatch(/\.uom-target\s*{[^}]*min-height:\s*460px;/s);
    expect(css).toMatch(/\.uom-target-section > \.case-section-heading--statement\s*{[^}]*margin-bottom:\s*clamp\(96px, 8vw, 132px\);/s);
    expect(css).toMatch(/\.uom-target__stages\s*{[^}]*margin:\s*0;/s);
    expect(css).toMatch(/\.uom-target__timeline-track\s*{[^}]*background:\s*var\(--uom-accent\);/s);
    expect(css).not.toMatch(/\.uom-target__stages li\s*{[^}]*border-top:/s);
    expect(css).toMatch(/\.uom-issue-explorer__tabs button\.is-active\s*{[^}]*color:\s*#fff;[^}]*background:\s*var\(--uom-issue-color\);/s);
    expect(css).toMatch(/\.uom-issue-explorer__tabs button\.is-active\s*{[^}]*box-shadow:\s*0 14px 30px/s);
    expect(css).toMatch(/\.uom-issue-explorer\s*{[^}]*min-height:\s*0;/s);
    expect(css).toMatch(/\.uom-issue-explorer__tabs\s*{[^}]*height:\s*224px;[^}]*align-items:\s*end;/s);
    expect(css).toMatch(/\.uom-issue-explorer__tabs button\.is-active\s*{[^}]*height:\s*224px;[^}]*transform:\s*none;/s);
    expect(css).toMatch(/\.uom-issue-explorer__panel\s*{[^}]*min-height:\s*0;[^}]*padding:\s*clamp\(56px, 6vw, 84px\) clamp\(28px, 4vw, 62px\);/s);
    expect(css).toMatch(/\.uom-issue-explorer__panel::before\s*{[^}]*content:\s*none;/s);
    expect(css).toMatch(/\.uom-issue-explorer__panel\s*{[^}]*background:\s*#e7ebf1;/s);
    expect(css).toMatch(/\.uom-feedback-cloud\s*{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(12,/s);
    expect(css).toMatch(/\.uom-feedback-cloud\s*{[^}]*min-height:\s*0;[^}]*grid-auto-rows:\s*auto;[^}]*align-content:\s*start;/s);
    expect(css).toMatch(/\.uom-feedback-cloud\s*{[^}]*gap:\s*16px;/s);
    expect(css).toMatch(/\.uom-feedback-card\s*{[^}]*display:\s*flex;[^}]*background:\s*#fff;[^}]*border-radius:\s*14px;/s);
    expect(css).toMatch(/\.uom-feedback-card img\s*{[^}]*border-radius:\s*50%;/s);
    expect(css).not.toMatch(/\.uom-feedback-card img\s*{[^}]*filter:/s);
    expect(css).toMatch(/\.uom-analysis-map__stage--pains article\s*{[^}]*background:\s*#d5e1ff;[^}]*border:\s*1px solid rgba\(105, 147, 255, \.28\);/s);
    expect(docs).toContain('仅用于 FUNNYFUZZY 相关项目');
    expect(docs).not.toContain('全局品牌橙');
  });

  it('presents the VMALL smart service project with its supplied desk-and-phone cover and statement gallery', () => {
    const { unmount } = renderAt('/app');

    expect(screen.getByRole('link', { name: '华为商城智能客服' })).toHaveAttribute(
      'href',
      '/project/app-vmall-smart-service-2'
    );
    expect(screen.getByText('客服系统')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '华为商城智能客服手持手机封面' })).toHaveAttribute(
      'src',
      '/assets/vmall-smart-service-2/cover-handheld-clean-v5.png'
    );
    expect(document.querySelector('.vmall-smart-service-cover')).toBeInTheDocument();
    expect(document.querySelector('.project-cover--vmall-smart-service')).toHaveStyle({
      '--cover-color': '#B9DDFF'
    });

    unmount();
    renderAt('/project/app-vmall-smart-service-2');

    expect(
      screen.getByRole('heading', { name: /基于 2022 年 H4 客服功能拓展诉求/i })
    ).toHaveClass('minimal-case__statement-title');
    expect(screen.getByRole('img', { name: '华为商城智能客服 2.0 项目图集' })).toHaveAttribute(
      'src',
      '/assets/vmall-smart-service-2/gallery.jpg'
    );
  });

  it('adds V+ membership with the supplied cover and gallery artwork', () => {
    const { unmount } = renderAt('/app');
    const cover = screen.getByRole('link', { name: 'V+ 会员' });

    expect(cover).toHaveAttribute('href', '/project/app-vplus-membership');
    expect(screen.getByRole('img', { name: 'V+ 会员封面' })).toHaveAttribute(
      'src',
      '/assets/vplus-membership/cover.jpg'
    );

    unmount();
    renderAt('/project/app-vplus-membership');

    expect(screen.getByRole('heading', { name: /V\+ 会员围绕用户从开通/ })).toHaveClass(
      'minimal-case__statement-title'
    );
    expect(screen.getByRole('img', { name: 'V+ 会员产品体验项目图集' })).toHaveAttribute(
      'src',
      '/assets/vplus-membership/gallery.jpg'
    );
  });

  it('adds the VMALL language design system to APP and renders its case visual system', () => {
    const { unmount } = renderAt('/app');

    expect(screen.getByRole('link', { name: '界面用语规范' })).toHaveAttribute(
      'href',
      '/project/app-vmall-language-system'
    );
    expect(document.querySelector('.project-cover--vmall-language-system')).toBeInTheDocument();

    unmount();
    renderAt('/project/app-vmall-language-system');

    expect(screen.getByRole('heading', { name: '界面用语规范' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /把零散的界面写作经验/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /界面用语原则/i })).toHaveAttribute('href', '#vmall-language-principles');
    expect(screen.getByRole('link', { name: /编辑规范/i })).toHaveAttribute('href', '#vmall-language-editing');
    expect(screen.getByRole('link', { name: /场景化写作指导/i })).toHaveAttribute('href', '#vmall-language-scenarios');
    expect(screen.getByRole('heading', { name: '空状态' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '六个写作原则' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '七条内容设计指导' })).toBeInTheDocument();
    expect(screen.getByText(/先建立共同的写作判断，再讨论具体用词/i)).toBeInTheDocument();
    expect(screen.getByText('友好而尊重')).toBeInTheDocument();
    expect(screen.getByText('如何衡量成功？')).toBeInTheDocument();
    expect(screen.getByText(/少谈产品的“卖点”，多谈用户的“买点”/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '时间与日期' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '标点规范' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '空格规范' })).toBeInTheDocument();
    expect(screen.getByText('卸载 USB 存储设备')).toBeInTheDocument();
    expect(screen.getByText('删除后将无法恢复。确定删除？')).toBeInTheDocument();
    expect(screen.getAllByRole('table')).toHaveLength(12);
    expect(screen.getByText('场景一：操作无反馈')).toBeInTheDocument();
    expect(screen.getByText('没有找到您搜索的相关商品，请尝试其他搜索词')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '删除' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '删除与确认' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /删除弹窗/ })).toHaveLength(8);
    expect(screen.getByRole('heading', { name: '确定弹出框' })).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /确定弹出框/ })).toHaveLength(6);
    expect(screen.getByRole('heading', { name: '异常提示、检查更新、更多帮助' })).toBeInTheDocument();
    expect(document.querySelectorAll('.vmall-scenario-feature-card img')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: '异常提示—失败提示' })).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /失败提示/ })).toHaveLength(4);
    expect(screen.getByRole('heading', { name: '帮助引导-全屏引导型' })).toBeInTheDocument();
    expect(document.querySelectorAll('.vmall-guidance-text-card')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: '语气语调' })).toBeInTheDocument();
    expect(document.querySelectorAll('.vmall-tone-taxonomy__grid--patterns > span')).toHaveLength(26);
    expect(document.querySelectorAll('.vmall-tone-taxonomy__grid:not(.vmall-tone-taxonomy__grid--patterns) > span')).toHaveLength(13);
    expect(screen.getByRole('heading', { name: '设置' })).toBeInTheDocument();
    expect(document.querySelectorAll('.vmall-setting-card')).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: /设置.*案例/ })).toHaveLength(2);
    expect(screen.queryByText(/界面图片占位/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('img', { name: /界面用语规范第/i })).toHaveLength(0);
    expect(screen.getAllByRole('img', { name: /空状态示例/i })).toHaveLength(3);
    expect(document.querySelectorAll('.vmall-scene-placeholder')).toHaveLength(0);
    expect(document.querySelector('.vmall-language-outcome__grid')).toBeInTheDocument();
  });

  it('adds the ideal VMALL case with its supplied cover and native web storytelling', () => {
    const { unmount } = renderAt('/app');
    const cover = screen.getByRole('link', { name: '理想中的华为商城' });

    expect(cover).toHaveAttribute('href', '/project/app-ideal-vmall');
    expect(cover).not.toHaveClass('project-cover--placeholder');
    expect(cover.querySelector('img')).toHaveAttribute('src', '/assets/ideal-vmall/cover.jpg');

    unmount();
    renderAt('/project/app-ideal-vmall');

    expect(screen.getByRole('heading', { name: '理想中的华为商城' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '理想中的华为商城项目封面' })).toHaveAttribute('src', '/assets/ideal-vmall/cover.jpg');
    expect(screen.getByRole('heading', { name: /从消费者对品质、秩序与体验的期待出发/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '消费者行为趋势' })).toHaveClass('case-section-heading__title');
    expect(screen.getByRole('heading', { name: /消费并未简单降级.*价格更透明/ })).not.toHaveClass('case-section-heading__title');
    expect(document.querySelector('.ideal-vmall-opening__rail')).not.toBeInTheDocument();
    expect(document.querySelector('.ideal-vmall-trends__implication')).not.toBeInTheDocument();
    expect(screen.getAllByText('58%')).toHaveLength(2);
    expect(screen.getByText('>75%')).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-trend-card')).toHaveLength(4);
    expect(screen.getByRole('heading', { name: '用户研究' })).toBeInTheDocument();
    expect(screen.getByText('783')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '用户满意度评分' })).toBeInTheDocument();
    expect(screen.getAllByText('6.23').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.ideal-vmall-chart')).toHaveLength(3);
    expect(document.querySelectorAll('.ideal-vmall-chart--compact')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: '用户满意度评分' }).closest('.ideal-vmall-chart')).toHaveClass('ideal-vmall-chart--compact');
    expect(document.querySelectorAll('.ideal-vmall-chart__row b')).toHaveLength(13);
    expect(screen.getByRole('heading', { name: '用户原声' })).toBeInTheDocument();
    expect(screen.getAllByText(/APP 和实体店能互动/)).toHaveLength(2);
    expect(document.querySelectorAll('.ideal-vmall-voice-card')).toHaveLength(24);
    expect(document.querySelectorAll('.ideal-vmall-voices__group:not([aria-hidden="true"]) .ideal-vmall-voice-card')).toHaveLength(12);
    expect(document.querySelectorAll('.ideal-vmall-voices__group[aria-hidden="true"]')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: '素材图' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '素材图' }).parentElement).not.toHaveClass('case-section-heading--statement');
    expect(screen.getByText(/使用了大量非官方或二次创作素材/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '华为商城' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'DJI' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-materials__study')).toHaveLength(3);
    expect(document.querySelector('.ideal-vmall-materials__meta')).not.toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-materials__strip img')).toHaveLength(3);
    expect(screen.getByRole('img', { name: '华为商城素材组合' })).toHaveAttribute('src', '/assets/ideal-vmall/materials/vmall-strip-v2.png');
    expect(screen.getByRole('heading', { name: '颜色' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-color-card')).toHaveLength(3);
    expect(document.querySelectorAll('.ideal-vmall-color-card__wheel')).toHaveLength(3);
    expect(screen.getByRole('img', { name: '华为商城色轮' })).toHaveAttribute('src', '/assets/ideal-vmall/colors/vmall-wheel-v2.png');
    expect(document.querySelectorAll('.ideal-vmall-color-card__samples img')).toHaveLength(3);
    expect(document.querySelector('.ideal-vmall-color-ring')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '文案' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-copy-card')).toHaveLength(3);
    expect(screen.getByText('产品都称心，体验更如意。')).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-copy-card__fragments > div')).toHaveLength(18);
    expect(screen.queryByRole('heading', { name: '信息密度与层级' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '品牌叙事' })).toBeInTheDocument();
    expect(screen.getByText(/高级感，不止被看见，更需要被持续讲述/)).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-narrative-chapter')).toHaveLength(3);
    expect(document.querySelectorAll('.ideal-vmall-narrative-chapter__media img')).toHaveLength(6);
    expect(document.querySelectorAll('.ideal-vmall-narrative-chapter__copy li')).toHaveLength(9);
    expect(screen.getByText('CHANEL')).toBeInTheDocument();
    expect(screen.getByText('LOUIS VUITTON')).toBeInTheDocument();
    expect(screen.getByText('HERMÈS')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'CHANEL 文学对谈栏目' })).toHaveAttribute('src', '/assets/ideal-vmall/luxury-narrative/chanel-literary.jpg');
    expect(screen.getByRole('img', { name: 'Louis Vuitton 200 Trunks, 200 Visionaries 展览现场' })).toHaveAttribute('src', '/assets/ideal-vmall/luxury-narrative/lv-exhibition-02.jpg');
    expect(screen.getByRole('img', { name: 'Hermès 大阪艺术橱窗' })).toHaveAttribute('src', '/assets/ideal-vmall/luxury-narrative/hermes-window-01.jpg');
    expect(screen.getByRole('heading', { name: '业界洞察' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-insights__brands img')).toHaveLength(5);
    expect(document.querySelectorAll('.ideal-vmall-insight-card')).toHaveLength(4);
    expect(screen.getByRole('img', { name: 'Apple 品牌标识' })).toHaveAttribute('src', '/assets/ideal-vmall/insights/apple.svg');
    expect(screen.getByRole('img', { name: 'Hermès 品牌标识' })).toHaveAttribute('src', '/assets/ideal-vmall/insights/hermes.svg');
    expect(screen.getByRole('heading', { name: '清晰的浏览与导购体验' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '主打新品，用户视角划分品类、页面定位清晰' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '极具视觉冲击力与品质感' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '多端与线上线下体验的一致性' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '将“高端”拆解为纯净、贴心与高品质，打造贯穿页面、动线、动效与内容的精品旗舰体验。' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-direction__card')).toHaveLength(3);
    expect(document.querySelectorAll('.ideal-vmall-direction__content li')).toHaveLength(15);
    expect(screen.getByText('坚持少即是多')).toBeInTheDocument();
    expect(screen.getByText('沉浸式且一致')).toBeInTheDocument();
    expect(screen.getByText('呈现质感打磨')).toBeInTheDocument();
    expect(screen.getByText('构建 F 型浏览动线')).toBeInTheDocument();
    expect(screen.getByText('规范内容质量标准')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '户外移动场景中的纯净产品体验' })).toHaveAttribute('src', '/assets/ideal-vmall/strategy/purity.jpg');
    expect(screen.getByRole('img', { name: '鲜花与宠物主题的年轻生活方式影像' })).toHaveAttribute('src', '/assets/ideal-vmall/strategy/care.jpg');
    expect(screen.getByRole('img', { name: '高端室内场景中的品质产品体验' })).toHaveAttribute('src', '/assets/ideal-vmall/strategy/quality.jpg');
    expect(screen.getByRole('heading', { name: '详情页设计' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '重排信息优先级，让产品成为决策起点。' })).toBeInTheDocument();
    expect(screen.getByText('现网分析')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '现网分析：信息认知负重大、制约易读性。' })).toBeInTheDocument();
    expect(screen.getByText('综合用户调研、竞品分析及数据结果，用户首要关注信息应为产品信息而非优惠。')).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-detail-analysis__phones img')).toHaveLength(3);
    expect(screen.getByRole('img', { name: '商品详情基础页面' })).toHaveAttribute('src', '/assets/ideal-vmall/detail-analysis/current-page.jpg');
    expect(screen.getByRole('img', { name: '商品详情优惠弹窗' })).toHaveAttribute('src', '/assets/ideal-vmall/detail-analysis/offer-sheet.jpg');
    expect(screen.getByRole('img', { name: '商品详情选配弹窗' })).toHaveAttribute('src', '/assets/ideal-vmall/detail-analysis/sku-sheet.jpg');
    expect(screen.getByRole('img', { name: '现网商品详情页完整长图' })).toHaveAttribute('src', '/assets/ideal-vmall/detail-analysis/full-page.jpg');
    expect(screen.getByRole('heading', { name: '一条详情页，同时承担六类信息任务。' })).toBeInTheDocument();
    expect(screen.queryByText('Key finding')).not.toBeInTheDocument();
    expect(document.querySelector('.ideal-vmall-research__finding')).not.toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-plan__card')).toHaveLength(2);
    expect(document.querySelectorAll('.ideal-vmall-plan__pages img')).toHaveLength(4);
    expect(document.querySelectorAll('.ideal-vmall-plan__card header p strong')).toHaveLength(2);
    expect(document.querySelectorAll('.ideal-vmall-plan__card header p strong')[0]).toHaveTextContent('42%');
    expect(document.querySelectorAll('.ideal-vmall-plan__card header p strong')[1]).toHaveTextContent('58%');
    expect(screen.getByRole('img', { name: '看购分离方案详情页' })).toHaveAttribute('src', '/assets/ideal-vmall/plan-comparison/separated-detail.jpg');
    expect(screen.getByRole('img', { name: '主流电商方案选购页' })).toHaveAttribute('src', '/assets/ideal-vmall/plan-comparison/mainstream-purchase.jpg');
    expect(screen.getByRole('heading', { name: '详情页定位与交互' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '以产品信息为主要承载、以业务转化为主战场，通过清晰的区域划分与克制的营销表达，让产品、优惠与履约信息在正确的决策节点出现。' })).toBeInTheDocument();
    expect(screen.getByLabelText('同步浏览交互页面与视觉页面')).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-positioning__page-frame')).toHaveLength(2);
    expect(screen.getByRole('img', { name: 'HUAWEI Pura 70 Ultra 交互页面' })).toHaveAttribute('src', '/assets/ideal-vmall/detail-positioning/interaction-page.jpg');
    expect(screen.getByRole('img', { name: 'HUAWEI Pura 70 Ultra 视觉页面' })).toHaveAttribute('src', '/assets/ideal-vmall/detail-positioning/full-page.jpg');
    expect(screen.getByRole('heading', { name: '立体与多维展示' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-positioning__detail')).toHaveLength(6);
    expect(document.querySelectorAll('.ideal-vmall-positioning__visuals img')).toHaveLength(17);
    expect(screen.getByRole('heading', { name: '详情页呈现' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-page-showcase__column')).toHaveLength(6);
    expect(document.querySelectorAll('.ideal-vmall-page-showcase img')).toHaveLength(18);
    expect(screen.getByRole('heading', { name: '订单页现网分析' })).toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-order-analysis__finding')).toHaveLength(3);
    expect(document.querySelectorAll('.ideal-vmall-order-analysis__screen')).toHaveLength(4);
    expect(screen.getByRole('img', { name: '现网订单物流跟踪页' })).toHaveAttribute('src', '/assets/ideal-vmall/order-current/order-tracking.jpg');
    expect(screen.getByRole('heading', { name: '订单页面呈现' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '订单中心、订单详情与物流状态页面组合展示' })).toHaveAttribute('src', '/assets/ideal-vmall/order-showcase/order-pages-composite.jpg');
    expect(screen.getByRole('region', { name: '横向滚动查看华为商城改版完整页面' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '向左浏览页面总览' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '向右浏览页面总览' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '华为商城改版完整页面横向总览' })).toHaveAttribute('src', '/assets/ideal-vmall/final-page-overview.jpg');
    expect(document.querySelector('.ideal-vmall-gallery__item')).not.toBeInTheDocument();
    expect(document.querySelectorAll('.ideal-vmall-case img')).toHaveLength(78);
  });

  it('keeps the remaining HUAWEI CLOUD gallery pages as separate statement-gallery projects', () => {
    const { unmount } = renderAt('/web');

    expect(screen.queryByRole('link', { name: /HUAWEI CLOUD 站内外物料设计/i })).not.toBeInTheDocument();
    expect(portfolioSections.web.projects.find((project) => project.id === 'web-01')).toBeUndefined();
    expect(screen.getByRole('link', { name: /华为云产品页设计/i })).toHaveAttribute(
      'href',
      '/project/web-huawei-cloud-product-pages'
    );
    expect(
      portfolioSections.web.projects.find((project) => project.id === 'web-huawei-cloud-product-pages').coverImage
    ).toBe('/assets/huawei-cloud/product-pages-cover.jpg');
    expect(screen.getByRole('img', { name: /华为云产品页设计封面/i })).toHaveAttribute(
      'src',
      '/assets/huawei-cloud/product-pages-cover.jpg'
    );
    expect(screen.getByRole('link', { name: /华为云活动页设计/i })).toHaveAttribute(
      'href',
      '/project/web-huawei-cloud-campaign-pages'
    );
    expect(
      portfolioSections.web.projects.find((project) => project.id === 'web-huawei-cloud-campaign-pages').coverImage
    ).toBe('/assets/huawei-cloud/campaign-pages-cover.jpg');
    expect(
      portfolioSections.web.projects.find((project) => project.id === 'web-huawei-cloud-campaign-pages').coverLogo
    ).toBe('/assets/huawei-cloud/campaign-cover-logo.svg');
    expect(screen.getByRole('img', { name: /华为云活动页设计封面$/i })).toHaveAttribute(
      'src',
      '/assets/huawei-cloud/campaign-pages-cover.jpg'
    );
    expect(screen.getByRole('img', { name: /华为云活动页设计封面标志/i })).toHaveAttribute(
      'src',
      '/assets/huawei-cloud/campaign-cover-logo.svg'
    );
    expect(
      portfolioSections.web.projects.find((project) => project.id === 'web-huawei-cloud-product-pages').caseStudy
        .template
    ).toBe('statement-gallery');
    expect(
      portfolioSections.web.projects.find((project) => project.id === 'web-huawei-cloud-campaign-pages').caseStudy
        .template
    ).toBe('statement-gallery');
    expect(document.querySelector('.project-cover--huawei-cloud-placeholder')).not.toBeInTheDocument();

    unmount();
    const productPage = renderAt('/project/web-huawei-cloud-product-pages');

    expect(screen.queryByRole('heading', { name: '华为云产品页设计' })).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /为 HUAWEI CLOUD 官网产品页、解决方案页与多语言产品页面/i })
    ).toHaveClass('minimal-case__statement-title');
    expect(screen.getByRole('heading', { name: /保持层级、节奏与一致识别/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /华为云产品页设计合集/i })).toHaveAttribute(
      'src',
      '/assets/huawei-cloud/product-pages-collage.jpg'
    );
    expect(screen.queryByText('角色')).not.toBeInTheDocument();
    expect(screen.queryByText('产出')).not.toBeInTheDocument();

    productPage.unmount();
    renderAt('/project/web-huawei-cloud-campaign-pages');

    expect(
      screen.getByRole('heading', { name: /为 HUAWEI CLOUD 活动页建立更具节奏感的视觉入口/i })
    ).toHaveClass('minimal-case__statement-title');
    expect(screen.getByRole('heading', { name: /在大促、发布会和专题活动之间/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /华为云活动页设计合集/i })).toHaveAttribute(
      'src',
      '/assets/huawei-cloud/campaign-pages-collage.jpg'
    );
  });

  it('adds the Bujiaban smart material tool with an animated gradient cover and statement gallery detail', () => {
    const { unmount } = renderAt('/web');

    expect(screen.getByRole('link', { name: '布家班' })).toHaveAttribute(
      'href',
      '/project/web-bujiaban-smart-material-tool'
    );
    expect(screen.getByText('工具设计')).toBeInTheDocument();
    expect(document.querySelector('.project-cover--bujiaban')).toBeInTheDocument();
    expect(document.querySelector('.bujiaban-cover__logo')).toHaveAttribute(
      'src',
      '/assets/bujiaban-smart-material-tool/logo.svg'
    );
    expect(document.querySelectorAll('.bujiaban-cover__flow')).toHaveLength(2);
    expect(screen.getByText(/50\+ 种常用站外物料尺寸与 30\+ 套设计模板/)).toBeInTheDocument();

    unmount();
    renderAt('/project/web-bujiaban-smart-material-tool');

    expect(screen.getByRole('heading', { name: /让物料生产从重复排版转向高效/ })).toHaveClass(
      'minimal-case__statement-title'
    );
    expect(screen.getByRole('img', { name: '布家班智能物料设计工具项目图集' })).toHaveAttribute(
      'src',
      '/assets/bujiaban-smart-material-tool/gallery.jpg'
    );
  });

  it('renders the product asset locator case narrative', () => {
    renderAt('/project/ai-product-assets-locator');

    expect(screen.getByRole('heading', { name: /产品素材快速定位工具/i })).toBeInTheDocument();
    expect(screen.getByText(/为运营、设计、摄影团队设计的内部插件/i)).toBeInTheDocument();
    const caseFacts = screen.getByLabelText('产品素材快速定位工具 项目概览');
    expect(within(caseFacts).getAllByRole('term').map((term) => term.textContent)).toEqual([
      '品牌',
      '状态',
      '角色',
      '范围'
    ]);
    expect(within(caseFacts).getByText('个人项目')).toBeInTheDocument();
    expect(within(caseFacts).getByText('已开源')).toBeInTheDocument();
    expect(within(caseFacts).getByText('1人 / 产品、设计、开发')).toBeInTheDocument();
    expect(within(caseFacts).getByText('产品、运营、设计、摄影')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'github.com/xiemingjian2024-stack/...' })).toHaveAttribute(
      'href',
      'https://github.com/xiemingjian2024-stack/funnyfuzzy-product-assets-extension'
    );
    expect(screen.getByText(/仅内部可见的插件/i)).toBeInTheDocument();
    expect(screen.getAllByText(/飞书绑定表/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/最终落到真实产品页/i)).toBeInTheDocument();
  });

  it('adds EDM Editor to AI projects and renders the full workflow case', () => {
    const { unmount } = renderAt('/ai');

    expect(screen.getByRole('link', { name: 'EDM Editor' })).toHaveAttribute(
      'href',
      '/project/ai-edm-editor'
    );
    expect(screen.getAllByText('AI 辅助工作流').length).toBeGreaterThan(0);
    expect(document.querySelector('.project-cover--edm-editor')).toBeInTheDocument();
    expect(screen.getByText(/2026 · AI 辅助工作流/i)).toBeInTheDocument();

    unmount();
    renderAt('/project/ai-edm-editor');

    expect(screen.getByRole('heading', { name: 'EDM Editor' })).toBeInTheDocument();
    const facts = screen.getByLabelText('EDM Editor 项目概览');
    expect(within(facts).getByText('个人项目')).toBeInTheDocument();
    expect(within(facts).getByText('已开源')).toBeInTheDocument();
    expect(within(facts).getByText('产品、设计、开发')).toBeInTheDocument();
    expect(within(facts).getByText('构思、交互、视觉、落地')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /楼层编排与属性编辑界面/i })).toHaveAttribute(
      'src',
      '/assets/edm-editor/editor.png'
    );
    expect(screen.getByRole('img', { name: /作品管理首页/i })).toHaveAttribute(
      'src',
      '/assets/edm-editor/home.png'
    );
    expect(screen.getByText('−58%')).toBeInTheDocument();
    expect(screen.getByText(/试运行估算，用于展示衡量方式/i)).toBeInTheDocument();
    expect(screen.getByText(/250 项自动测试/i)).toBeInTheDocument();
  });

  it('shows launch screenshots and extension UI states in the asset locator case', () => {
    renderAt('/project/ai-product-assets-locator');

    expect(screen.getByRole('img', { name: /插件上线后的产品页效果/i })).toHaveAttribute(
      'src',
      '/assets/product-assets-final-result.jpg'
    );
    expect(screen.queryByText(/设计演进/i)).not.toBeInTheDocument();
    expect(screen.getAllByText('FF00003').length).toBeGreaterThan(0);
    expect(screen.getAllByText('暂未关联NAS，去反馈').length).toBeGreaterThan(0);
    expect(screen.getAllByText('内部素材加载失败').length).toBeGreaterThan(0);
    expect(screen.getByText('‹ 资产内容')).toBeInTheDocument();
    expect(screen.getByText(/已绑定 \/ 多个 SPU/i)).toBeInTheDocument();
    expect(screen.getByText(/未绑定：明确告诉同事/i)).toBeInTheDocument();
    expect(screen.getByText(/异常：把故障原因/i)).toBeInTheDocument();
    expect(screen.getByText(/折叠：不用时收起到右侧/i)).toBeInTheDocument();
    expect(document.querySelector('.state-board')).toHaveClass('case-visual-stack');
    expect(screen.getByText(/原始需求/i)).toBeInTheDocument();
    expect(screen.getByText(/需求判断/i)).toBeInTheDocument();
    expect(screen.queryByText('01 / 起因')).not.toBeInTheDocument();
    expect(screen.queryByText('02 / 判断')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '方案' })).toBeInTheDocument();
    expect(screen.getByText(/从产品页到素材库的最短路径/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '交互' })).toBeInTheDocument();
    expect(screen.getByText(/把内部工具需要遇到的状态提前设计清楚/i)).toBeInTheDocument();
    expect(screen.getByText(/Product page/i)).toBeInTheDocument();
    expect(screen.getByText(/Feishu asset sheet/i)).toBeInTheDocument();
    expect(screen.getByText(/View SPU/i)).toBeInTheDocument();
    expect(screen.getByText(/NAS assets/i)).toBeInTheDocument();
    expect(screen.queryByText(/04 \/ AI 与维护/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '落地' })).toBeInTheDocument();
    expect(screen.getByText(/把 AI 用在信息关系、异常说明和后续维护上/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /我把 Codex 当成可以协作落地的工程伙伴.*AI 参与了需求拆解、字段关系梳理、异常状态补全、测试用例设计和维护说明整理/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/6 组测试/i)).toBeInTheDocument();
    const pageText = document.body.textContent;
    expect(pageText.indexOf('最终落到真实产品页')).toBeLessThan(
      pageText.indexOf('我把 Codex 当成可以协作落地的工程伙伴')
    );
  });

  it('returns from project details to the matching project list', () => {
    renderAt('/project/app-funnfuzzy-icon-guide');
    expect(screen.queryByRole('link', { name: 'APP' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '返回' }));
    expect(screen.getByRole('heading', { name: '移动产品与体验' })).toBeInTheDocument();

    cleanup();
    renderAt('/project/web-funnyfuzzy-homepage');
    fireEvent.click(screen.getByRole('button', { name: '返回' }));
    expect(screen.getByRole('heading', { name: '网页与品牌站' })).toBeInTheDocument();

    cleanup();
    renderAt('/project/ai-product-assets-locator');
    fireEvent.click(screen.getByRole('button', { name: '返回' }));
    expect(screen.getByRole('heading', { name: 'AI 项目与实验' })).toBeInTheDocument();
  });

  it('resets scroll position when a route renders', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    renderAt('/project/app-funnfuzzy-icon-guide');
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });

  it('renders the photography gallery', () => {
    renderAt('/photography');
    expect(screen.getByRole('heading', { name: /摄影/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('photo-item')).toHaveLength(photographyItems.length);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', photographyItems[0].src);
    expect(screen.getAllByTestId('photo-item')[0]).toHaveStyle({ aspectRatio: photographyItems[0].aspectRatio });
  });

  it('renders Chinese placeholder copy on about and contact pages', () => {
    renderAt('/about');
    expect(screen.getByText(/这里先放一段关于你的中文介绍/i)).toBeInTheDocument();

    renderAt('/contact');
    expect(screen.getByRole('link', { name: /hello@example.com/i })).toHaveAttribute(
      'href',
      'mailto:hello@example.com'
    );
  });
});
