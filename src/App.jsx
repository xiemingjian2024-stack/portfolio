import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Instagram, Linkedin, Send } from 'lucide-react';
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  findProjectById,
  navItems,
  photographyItems,
  portfolioSections,
  profile
} from './portfolioData.js';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const APP_ICON_GUIDE_ICONS = Array.from({ length: 42 }, (_, index) => (
  `/assets/app-icon-guide/icons/icon-${String(index + 1).padStart(2, '0')}.svg`
));

const APP_ICON_GUIDE_SET_A = APP_ICON_GUIDE_ICONS.slice(0, 20);
const APP_ICON_GUIDE_SET_B = APP_ICON_GUIDE_ICONS.slice(20, 40);
const APP_ICON_GUIDE_ORIGINALS = Array.from({ length: 7 }, (_, index) => (
  `/assets/app-icon-guide/originals/guide-${String(index + 1).padStart(2, '0')}.jpg`
));
const BRAND_EVOLUTION_BASE = '/assets/app-icon-guide/brand-evolution-ascii';
const BRAND_EVOLUTION_ICONS = Array.from({ length: 8 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    black: `${BRAND_EVOLUTION_BASE}/icon-${number}.svg`,
    accent: `${BRAND_EVOLUTION_BASE}/icon-${number}-accent.svg`,
  };
});
const APP_ICON_LINE_CARDS = [
  {
    src: '/assets/app-icon-guide/line-system/shipping.svg',
    alt: 'Shipping 图标线条与端点规范',
  },
  {
    src: '/assets/app-icon-guide/line-system/sort.svg',
    alt: 'Sort 图标线条与端点规范',
  },
  {
    src: '/assets/app-icon-guide/line-system/filter.svg',
    alt: 'Filter 图标线条与端点规范',
  },
];
const APP_ICON_MODIFIER_CARDS = [
  {
    src: '/assets/app-icon-guide/modifiers/classification.svg',
    alt: 'Classification 组合图标修饰符规范',
  },
  {
    src: '/assets/app-icon-guide/modifiers/processing.svg',
    alt: 'Processing 组合图标修饰符规范',
  },
  {
    src: '/assets/app-icon-guide/modifiers/contact.svg',
    alt: 'Contact 组合图标修饰符规范',
  },
];

const CASE_MOTION = {
  enterY: 72,
  duration: 0.9,
  stagger: 0.08,
  ease: 'power3.out',
};

const UOM_FEEDBACK_AVATARS = Array.from({ length: 11 }, (_, index) => (
  `/assets/uom/avatars/avatar-${String(index + 1).padStart(2, '0')}.svg`
));
function App() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/app" element={<ProjectIndex sectionKey="app" />} />
          <Route path="/web" element={<ProjectIndex sectionKey="web" />} />
          <Route path="/ai" element={<ProjectIndex sectionKey="ai" />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </main>
      <BottomNavigation />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function Header() {
  return (
    <header className="site-header" aria-label="作品集头部">
      <div className="identity">
        <p className="identity-name">{profile.name}</p>
        <p>{profile.role}</p>
        <p>{profile.year}</p>
      </div>
      <nav className="social-links" aria-label="社交链接">
        {profile.socialLinks.map((link, index) => (
          <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer">
            {index === 0 && <Instagram aria-hidden="true" />}
            {index === 1 && <Send aria-hidden="true" />}
            {index === 2 && <Linkedin aria-hidden="true" />}
          </a>
        ))}
      </nav>
    </header>
  );
}

function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectDetail = location.pathname.startsWith('/project/');

  if (isProjectDetail) {
    return (
      <nav className="bottom-nav bottom-nav-back" aria-label="项目返回">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
              return;
            }
            navigate('/app');
          }}
        >
          <ArrowLeft aria-hidden="true" />
          返回
        </button>
      </nav>
    );
  }

  return (
    <nav className="bottom-nav" aria-label="作品集模块">
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'active' : undefined)}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function Intro({ children, className = '' }) {
  return <section className={`intro ${className}`}>{children}</section>;
}

function ProjectIndex({ sectionKey }) {
  const section = portfolioSections[sectionKey];

  return (
    <>
      <Intro>
        <h1>{section.title}</h1>
      </Intro>
      <section className="project-grid" aria-label={`${section.kicker} 项目列表`}>
        {section.projects.map((project) => (
          <article className="project-card" key={project.id}>
            <NavLink
              className={`project-cover ${project.coverVariant ? `project-cover--${project.coverVariant}` : ''} ${
                project.coverPlaceholder ? 'project-cover--placeholder' : ''
              } ${
                project.coverPlaceholder && project.coverVariant
                  ? `project-cover--${project.coverVariant}-placeholder`
                  : ''
              }`}
              to={`/project/${project.id}`}
              aria-label={project.title}
              style={{ '--cover-color': project.color }}
            >
              {project.coverVariant === 'asset-locator' && <AssetLocatorCover />}
              {project.coverVariant === 'app-icon-guide' && <AppIconGuideCover />}
              {project.coverVariant === 'vmall-language-system' && <VmallLanguageCover />}
              {project.coverVariant === 'uom' && <UomCover project={project} />}
              {project.coverVariant === 'amazon-store' && <AmazonStoreCover />}
              {project.coverVariant === 'bujiaban' && <BujiabanCover />}
              {project.coverVariant === 'vmall-polaris' && <VmallPolarisCover project={project} />}
              {project.coverVariant === 'vmall-smart-service' && <VmallSmartServiceCover project={project} />}
              {project.coverVariant === 'huawei-cloud' && !project.coverPlaceholder && (
                <HuaweiCloudCover project={project} />
              )}
              {!project.coverVariant && project.coverImage && (
                <img className="project-cover__image" src={project.coverImage} alt={project.coverImageAlt} />
              )}
              {!project.coverVariant && !project.coverPlaceholder && !project.coverImage && <span>{project.title}</span>}
            </NavLink>
            <div className="project-meta" aria-label={`${project.title} 信息`}>
              <strong>{project.title}</strong>
              <span>{project.year}</span>
              <span>{project.type}</span>
            </div>
            <p>{project.summary}</p>
            <NavLink className="case-link" to={`/project/${project.id}`}>
              Case Study
              <ArrowRight aria-hidden="true" />
            </NavLink>
          </article>
        ))}
      </section>
    </>
  );
}

function BujiabanCover() {
  return (
    <div className="bujiaban-cover" aria-hidden="true">
      <span className="bujiaban-cover__flow bujiaban-cover__flow--one" />
      <span className="bujiaban-cover__flow bujiaban-cover__flow--two" />
      <img className="bujiaban-cover__logo" src="/assets/bujiaban-smart-material-tool/logo.svg" alt="" />
    </div>
  );
}

function VmallSmartServiceCover({ project }) {
  return (
    <div className="vmall-smart-service-cover">
      <span className="vmall-smart-service-cover__flow vmall-smart-service-cover__flow--one" aria-hidden="true" />
      <span className="vmall-smart-service-cover__flow vmall-smart-service-cover__flow--two" aria-hidden="true" />
      <span className="vmall-smart-service-cover__flow vmall-smart-service-cover__flow--three" aria-hidden="true" />
      <span className="vmall-smart-service-cover__flow vmall-smart-service-cover__flow--four" aria-hidden="true" />
      <img
        className="vmall-smart-service-cover__logo"
        src={project.coverLogo}
        alt={project.coverLogoAlt}
      />
    </div>
  );
}

function VmallPolarisCover({ project }) {
  return (
    <div className="vmall-polaris-cover" aria-hidden="true">
      <span className="vmall-polaris-cover__flow vmall-polaris-cover__flow--one" />
      <span className="vmall-polaris-cover__flow vmall-polaris-cover__flow--two" />
      <span className="vmall-polaris-cover__flow vmall-polaris-cover__flow--three" />
      <img className="vmall-polaris-cover__logo" src={project.coverLogo} alt="" />
    </div>
  );
}

function PhotographyPage() {
  return (
    <>
      <Intro>
        <h1>摄影</h1>
      </Intro>
      <section className="photo-masonry" aria-label="摄影作品列表">
        {photographyItems.map((photo, index) => (
          <figure
            data-testid={photo.src ? 'photo-item' : 'photo-placeholder'}
            className={`photo-placeholder ${photo.src ? 'photo-item' : ''}`}
            key={photo.id}
            style={{
              '--photo-color': photo.color,
              aspectRatio: photo.aspectRatio,
              '--photo-index': `"${String(index + 1).padStart(2, '0')}"`
            }}
          >
            {photo.src && <img src={photo.src} alt={photo.alt || photo.title || '摄影作品'} />}
            {photo.title && <figcaption>{photo.title}</figcaption>}
          </figure>
        ))}
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <Intro className="text-page">
      <h2>{profile.about}</h2>
      <h3>{profile.aboutDetail}</h3>
    </Intro>
  );
}

function ContactPage() {
  return (
    <Intro className="text-page contact-page">
      <h2>
        欢迎联系我聊项目合作。
        <br />
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </h2>
    </Intro>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const project = findProjectById(projectId);

  if (!project) {
    return <Navigate to="/app" replace />;
  }

  if (project.caseStudy) {
    return <CaseStudyDetail project={project} />;
  }

  return (
    <Intro className="detail-page">
      <p className="detail-kicker">{project.section}</p>
      <h1>{project.title}</h1>
      <p className="detail-copy">
        这里是项目详情页占位。后续可以单独设计完整案例页，包括背景、目标、设计过程、核心界面和成果。
      </p>
      <div className="detail-cover" style={{ '--cover-color': project.color }} />
    </Intro>
  );
}

function CaseStudyDetail({ project }) {
  useSharedCaseMotion(project.id);

  if (project.caseStudy.template === 'statement-gallery') {
    return <StatementGalleryDetail project={project} />;
  }

  if (project.caseStudy.template === 'amazon-store-home') {
    return <AmazonStoreDetail project={project} />;
  }

  if (project.caseStudy.template === 'uom') {
    return <UomDetail project={project} />;
  }

  if (project.caseStudy.template === 'ideal-vmall') {
    return <IdealVmallDetail project={project} />;
  }

  if (project.coverVariant === 'app-icon-guide') {
    return <AppIconGuideDetail project={project} />;
  }

  if (project.coverVariant === 'vmall-language-system') {
    return <VmallLanguageDetail project={project} />;
  }

  const [causeSection, decisionSection, solutionSection, maintenanceSection] = project.caseStudy.sections;

  return (
    <article className="case-study">
      <CaseHero project={project} />

      <OriginAiTransition causeSection={causeSection} decisionSection={decisionSection} />
      <SolutionFlowSection section={solutionSection} />

      <section className="case-sticky-showcase" aria-label={`${project.title} UI 状态`}>
        <div className="case-sticky-copy">
          <h2>交互</h2>
          <h3>
            把内部工具需要遇到的状态提前设计清楚，降低使用和维护的不确定性。
            除了成功绑定状态，还覆盖多个 SPU、未绑定、加载中、异常反馈和折叠状态，方便团队安装后快速理解，也方便后续排查。
          </h3>
        </div>
        <AssetStateBoard />
      </section>

      <CaseNarrativeCard section={maintenanceSection} />
      <section className="case-visual-section case-visual-section--live" aria-label={`${project.title} 上线截图`}>
        <figure className="case-live-shot case-live-shot--mockup">
          <img src="/assets/product-assets-final-result.jpg" alt="插件上线后的产品页效果" />
        </figure>
      </section>
      <CodexWorkflowSection />
    </article>
  );
}

function CaseHero({ project, showFacts = true }) {
  const facts =
    project.caseStudy.facts ||
    [
      { label: '角色', value: project.caseStudy.role },
      { label: '用户', value: project.caseStudy.users },
      { label: '场景', value: project.caseStudy.scene },
      { label: '产出', value: project.caseStudy.output },
    ];

  return (
    <>
      <section className="case-hero">
        <div className="case-hero-grid">
          <div className="case-hero-copy">
            <h1>{project.title}</h1>
            <p>{project.caseStudy.intro}</p>
          </div>
          <CaseHeroCover project={project} />
        </div>
      </section>

      {showFacts && (
        <dl className="case-facts" aria-label={`${project.title} 项目概览`}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className={fact.linkLabel ? 'case-fact__linked-value' : undefined}>
                {fact.href && fact.linkLabel ? (
                  <>
                    <span>{fact.value}</span>
                    <a href={fact.href} title={fact.href} target="_blank" rel="noreferrer">
                      {fact.linkLabel}
                    </a>
                  </>
                ) : fact.href ? (
                  <a href={fact.href} title={fact.href} target="_blank" rel="noreferrer">
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );
}

function CaseHeroCover({ project }) {
  const className = `detail-cover detail-cover--${project.coverVariant || 'default'}`;

  return (
    <div className={className} style={{ '--cover-color': project.color }}>
      {project.coverVariant === 'asset-locator' && <AssetLocatorCover />}
      {project.coverVariant === 'app-icon-guide' && <AppIconGuideCover />}
      {project.coverVariant === 'vmall-language-system' && <VmallLanguageCover detail />}
      {project.coverVariant === 'uom' && <UomCover project={project} detail />}
      {project.coverVariant === 'amazon-store' && <AmazonStoreCover detail />}
      {project.coverVariant === 'huawei-cloud' && <HuaweiCloudCover project={project} />}
      {!project.coverVariant && project.coverImage && (
        <img className="project-cover__image" src={project.coverImage} alt={project.coverImageAlt} />
      )}
    </div>
  );
}

function useSharedCaseMotion(projectId) {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || navigator.userAgent.toLowerCase().includes('jsdom')
    ) return undefined;

    const scope = document.querySelector('main');
    if (!scope) return undefined;

    const context = gsap.context(() => {
      const heroTargets = gsap.utils.toArray('.case-hero-copy, .detail-cover');
      if (heroTargets.length) {
        gsap.fromTo(
          heroTargets,
          { autoAlpha: 0, y: CASE_MOTION.enterY },
          {
            autoAlpha: 1,
            y: 0,
            duration: CASE_MOTION.duration,
            ease: CASE_MOTION.ease,
            stagger: CASE_MOTION.stagger,
          }
        );
      }

      const revealTargets = Array.from(new Set([
        ...gsap.utils.toArray('.case-facts > div'),
        ...gsap.utils.toArray('.case-section-heading'),
        ...gsap.utils.toArray('.uom-reveal'),
        ...gsap.utils.toArray('.ideal-vmall-reveal'),
      ]));

      revealTargets.forEach((target) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0, y: CASE_MOTION.enterY * 0.72 },
          {
            autoAlpha: 1,
            y: 0,
            duration: CASE_MOTION.duration,
            ease: CASE_MOTION.ease,
            scrollTrigger: {
              trigger: target,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      const amazonRevealGroups = [
        ['.amazon-market__stats', ':scope > a'],
        ['.amazon-benchmark__grid', ':scope > a'],
        ['.amazon-benchmark__patterns-list', ':scope > div'],
        ['.amazon-before__visuals', ':scope > *'],
        ['.amazon-strategy__principles', '.amazon-strategy__node, .amazon-strategy__principle > div'],
        ['.amazon-framework__plans', ':scope > article'],
        ['.amazon-directions__grid', ':scope > article'],
        ['.amazon-results__grid', ':scope > article'],
      ];

      amazonRevealGroups.forEach(([groupSelector, itemSelector]) => {
        const group = scope.querySelector(groupSelector);
        if (!group) return;

        const items = gsap.utils.toArray(itemSelector, group);
        if (!items.length) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            ease: CASE_MOTION.ease,
            stagger: 0.075,
            scrollTrigger: {
              trigger: group,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });

      const amazonDevices = gsap.utils.toArray(
        '.amazon-directions__browser, .amazon-final__browser'
      );
      amazonDevices.forEach((device) => {
        gsap.fromTo(
          device,
          { autoAlpha: 0, y: 30, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.92,
            ease: CASE_MOTION.ease,
            scrollTrigger: {
              trigger: device,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });

      const researchCharts = gsap.utils.toArray('.ideal-vmall-chart');
      researchCharts.forEach((chart) => {
        const bars = gsap.utils.toArray('.ideal-vmall-chart__row b', chart);
        gsap.fromTo(
          bars,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.68,
            ease: 'power3.out',
            stagger: 0.055,
            scrollTrigger: {
              trigger: chart,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });

      const targetStages = scope.querySelector('.uom-target__stages');
      if (targetStages) {
        const timelineNodes = gsap.utils.toArray('.uom-target__timeline-node', targetStages);
        const timelineTracks = gsap.utils.toArray('.uom-target__timeline-track', targetStages);
        const targetTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: targetStages,
            start: 'top 82%',
            once: true,
          },
        });

        gsap.set(timelineNodes, { backgroundColor: '#d7ddea', boxShadow: 'none', scale: 0.72 });
        gsap.set(timelineTracks, { scaleX: 0, transformOrigin: 'left center' });

        timelineNodes.forEach((node, index) => {
          targetTimeline.to(node, {
            backgroundColor: '#6993ff',
            boxShadow: '0 0 0 5px rgba(105, 147, 255, .16)',
            scale: 1,
            duration: 0.22,
            ease: 'power2.out',
          });
          if (timelineTracks[index]) {
            targetTimeline.to(timelineTracks[index], {
              scaleX: 1,
              duration: 0.38,
              ease: 'power2.inOut',
            });
          }
        });
      }
    }, scope);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [projectId]);
}

function UomCover({ project, detail = false }) {
  return (
    <div
      className={`uom-cover ${detail ? 'uom-cover--detail' : ''}`}
      aria-label={project.coverImageAlt}
      role="img"
    >
      <img className="uom-cover__logo" src="/assets/uom/uom-vmall-portal.svg" alt="" aria-hidden="true" />
    </div>
  );
}

function AmazonStoreCover({ detail = false }) {
  return (
    <div className={`amazon-store-cover ${detail ? 'amazon-store-cover--detail' : ''}`} aria-hidden="true">
      <img src="/assets/amazon-store-home/cover.jpg" alt="" />
    </div>
  );
}

const AMAZON_RESEARCH = [
  {
    title: 'Chuckit!',
    tag: 'Pet category system',
    image: '/assets/amazon-store-home/research-amazon-chuckit-v2.jpg',
    href: 'https://www.thinknectar.com/case-studies/chuckit-gets-thrown-a-brand-store-makeover',
    body: '用鲜明的品牌色和真实玩耍场景建立品类认知，再按球类、发射器和户外玩法持续分流。'
  },
  {
    title: 'Petcube',
    tag: 'Feature + benefit',
    image: '/assets/amazon-store-home/research-amazon-petcube-v2.jpg',
    href: 'https://www.amazon.com/stores/page/8DF9B38B-C875-4B96-BE4B-01FEF2C72775',
    body: '把产品功能、使用结果和宠物陪伴场景放在同一条叙事里，让智能产品更容易理解。'
  },
  {
    title: 'Feetures',
    tag: 'Seasonal merchandising',
    image: '/assets/amazon-store-home/research-amazon-feetures-v2.jpg',
    href: 'https://www.amazon.com/stores/node/3028215011',
    body: '以稳定的品牌色组织节日主题、新品和产品网格，让运营变化不破坏页面识别度。'
  },
  {
    title: 'Teton Sports',
    tag: 'Lifestyle to product',
    image: '/assets/amazon-store-home/research-amazon-teton-v2.jpg',
    href: 'https://www.amazon.com/stores/TETONSports/TETONSports/page/BDCF8577-F2B1-4486-A01A-54B779E52D1C',
    body: '先用真实户外场景建立向往，再让产品在使用环境中成为视觉重点并承接购买。'
  },
  {
    title: 'Thrive Natural Care',
    tag: 'Bold brand expression',
    image: '/assets/amazon-store-home/research-amazon-thrive-v2.jpg',
    href: 'https://www.amazon.com/stores/node/14168115011',
    body: '用统一的大地色和生活方式摄影强化品牌个性，同时保持品类入口足够直接。'
  },
  {
    title: 'Yogi Tea',
    tag: 'Mood + category',
    image: '/assets/amazon-store-home/research-amazon-yogi-v2.jpg',
    href: 'https://www.amazon.com/stores/node/3050987011',
    body: '把季节氛围、产品体验和直观分类结合起来，让品牌感受自然过渡到商品浏览。'
  }
];

function AmazonSectionHeading({ title, body }) {
  return (
    <div className="case-section-heading amazon-case__heading">
      <h2 className="case-section-heading__title">{title}</h2>
      {body && <h3>{body}</h3>}
    </div>
  );
}

function AmazonScrollablePage({ src, alt, label, device = 'desktop', className = '' }) {
  return (
    <figure className={`amazon-scroll-page amazon-scroll-page--${device} ${className}`}>
      <figcaption>{label}</figcaption>
      <div className="amazon-scroll-page__card">
        <div className="amazon-scroll-page__device">
          {device === 'desktop' ? (
            <div className="amazon-scroll-page__browser-bar" aria-hidden="true">
              <span className="amazon-scroll-page__browser-dots"><i /><i /><i /></span>
              <span className="amazon-scroll-page__address">amazon.com/stores/FUNNYFUZZY</span>
              <span className="amazon-scroll-page__browser-action">•••</span>
            </div>
          ) : (
            <div className="amazon-scroll-page__phone-bar" aria-hidden="true">
              <span>9:41</span><i /><span>● ◒</span>
            </div>
          )}
          <div
            className="amazon-scroll-page__viewport"
            tabIndex="0"
            aria-label={`${label} 页面滚动预览`}
          >
            <img src={src} alt={alt} />
          </div>
        </div>
      </div>
    </figure>
  );
}

function AmazonStoreDetail({ project }) {
  const liveUrl = project.caseStudy.facts.find((fact) => fact.label === '状态')?.href;

  return (
    <article className="case-study amazon-case">
      <CaseHero project={project} />

      <section className="case-visual-section amazon-case__statement" aria-label="项目目标">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">
            把首页从“物料拼接”转变为品牌认知、品类发现与购买决策共同工作的商业入口，让用户先理解 FUNNYFUZZY 的生活方式主张，再沿着清晰的品类与商品路径完成探索和选择。
          </h2>
        </div>
      </section>

      <section className="case-visual-section amazon-market" aria-label="市场与平台背景">
        <AmazonSectionHeading
          title="市场分析"
          body="市场持续增长，但首页的竞争已从商品数量延伸到品牌理解、导航效率与移动端体验。首页需要快速回答三个问题：FUNNYFUZZY 是谁、从哪个品类开始、哪些商品值得继续了解。"
        />
        <div className="amazon-market__stats">
          <a href="https://americanpetproducts.org/news/u.s.-pet-industry-reaches-158-billion-in-2025-poised-for-continued-growth-in-2026" target="_blank" rel="noreferrer">
            <strong><i className="amazon-market__unit">$</i>158B</strong><span>2025 年美国宠物行业支出</span><small>APPA, 2026</small>
          </a>
          <a href="https://americanpetproducts.org/news/u.s.-pet-industry-reaches-158-billion-in-2025-poised-for-continued-growth-in-2026" target="_blank" rel="noreferrer">
            <strong>95M</strong><span>美国养宠家庭</span><small>APPA, 2026</small>
          </a>
          <a href="https://advertising.amazon.com/en-gb/library/expert-advice/six-tips-to-optimize-your-store-for-mobile" target="_blank" rel="noreferrer">
            <strong>69<i className="amazon-market__unit">%</i></strong><span>Brand Store 访问曾来自移动端</span><small>Amazon internal data, 2021</small>
          </a>
        </div>
      </section>

      <section className="case-visual-section amazon-benchmark" aria-label="竞品与行业样本">
        <AmazonSectionHeading
          title="成熟案例"
          body="只选取真实的 Amazon Brand Store 作为样本，比较它们如何在平台框架内组织首屏主张、品类分流、商品承接与品牌表达，避免把独立站的视觉规则直接套用到 Amazon 页面。"
        />
        <div className="amazon-benchmark__grid">
          {AMAZON_RESEARCH.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <div className="amazon-benchmark__image"><img src={item.image} alt={`${item.title} 参考案例`} /></div>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </a>
          ))}
        </div>
        <div className="amazon-benchmark__patterns">
          <div className="amazon-benchmark__patterns-heading">
            <span>研究结论</span>
            <p>成熟店铺不是堆叠更多素材，而是让品牌认知与购物路径在同一套顺序里发生。</p>
          </div>
          <div className="amazon-benchmark__patterns-list">
            {[
              ['品牌入口', '首屏先建立品牌与核心场景'],
              ['购物分流', '热销、新品与品类入口紧接首屏'],
              ['信息分工', '场景图建立感知，商品模块支持决策'],
              ['双端节奏', '桌面与移动端分别组织内容顺序']
            ].map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="case-sticky-showcase amazon-before" aria-label="改版前首页问题">
        <div className="case-sticky-copy amazon-before__copy">
          <h2>现网问题</h2>
          <h3>现网有足够多的视觉素材，但缺少帮助用户理解和选择的顺序。</h3>
          <ul>
            <li>WAP 直接缩放 Web 端物料，文字和商品细节难以识别</li>
            <li>插画、实景图、活动色和品牌色同时竞争注意力</li>
            <li>热销、品类、品牌故事和活动内容没有稳定的层级</li>
            <li>内容量很大，但首屏与中段都缺少清晰的购买路径</li>
          </ul>
        </div>
        <div className="amazon-before__visuals">
          <AmazonScrollablePage src="/assets/amazon-store-home/before-desktop.jpg" alt="FUNNYFUZZY Amazon 改版前桌面端首页" label="BEFORE / WEB" />
          <AmazonScrollablePage src="/assets/amazon-store-home/before-mobile.jpg" alt="FUNNYFUZZY Amazon 改版前移动端首页" label="BEFORE / H5" device="mobile" />
        </div>
      </section>

      <section className="case-visual-section amazon-strategy" aria-label="设计策略与页面框架">
        <AmazonSectionHeading
          title="设计策略"
          body="用“先定义任务，再选择形式”取代素材堆叠。设计策略被转译为可直接指导页面组织的原则，而不是单独的视觉设定。"
        />
        <div className="amazon-strategy__principles">
          <div className="amazon-strategy__ring" aria-hidden="true" />
          <div className="amazon-strategy__core"><span>品牌</span><span>转化</span></div>
          {[
            ['主', '购物导向', '新品、热销和核心品类成为稳定导航，每一屏都给出明确下一步。'],
            ['辅', '品牌并行', '首屏用真实场景和一句主张建立认知，避免对客户价值有限的装饰。'],
            ['异', '双端原生', '不在移动端上缩放桌面端，为阅读尺寸、内容顺序与图片裁切分别设计。'],
            ['简', '视觉克制', '品牌橙用于重点和行动，大面积使用黑白与真实场景，统一字体和圆角。']
          ].map(([key, title, body], index) => (
            <article className={`amazon-strategy__principle amazon-strategy__principle--${index + 1}`} key={title}>
              <span className="amazon-strategy__node" aria-hidden="true">{key}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
        <div className="amazon-framework">
          <AmazonSectionHeading
            title="页面框架"
            body="围绕品牌认知、商品发现与持续浏览重新组织内容顺序，让每个页面模块都有明确任务，并能自然引导用户进入下一步。"
          />
          <div className="amazon-framework__plans">
            {[
              {
                label: '方案 A',
                title: '品类分层型',
                body: '先用热门类目完成快速分流，再通过热销、新品和三个核心类目逐层展开商品。',
                items: [
                  ['主题场景', '建立季节氛围与第一印象'],
                  ['热门类目', '帮助用户从高频需求快速进入'],
                  ['热销＋新品', '集中承接高确定性与新鲜内容'],
                  ['品牌介绍', '补充品牌定位与核心价值'],
                  ['核心类目 1', '用场景大图与商品组合展开重点品类'],
                  ['核心类目 2', '延续统一结构承接第二类需求'],
                  ['核心类目 3', '覆盖第三个重点购物入口'],
                  ['品牌背书', '用品牌行动、媒体与社会信任收口']
                ]
              },
              {
                label: '方案 B',
                title: '主题运营型',
                body: '围绕主题场景组织关联商品，再进入常规热销与新品，最后用商品瀑布流承接持续浏览。',
                items: [
                  ['主题场景', '建立当期主题氛围与视觉入口'],
                  ['主题关联商品', '让首屏主题直接连接可购买商品'],
                  ['热销', '用高确定性商品降低选择成本'],
                  ['新品', '提供明确的新鲜内容入口'],
                  ['品牌介绍', '解释 FUNNYFUZZY 为谁设计'],
                  ['品牌背书', '用品牌行动和媒体建立信任'],
                  ['商品瀑布流', '以连续商品内容承接深度浏览']
                ]
              }
            ].map((plan) => (
              <article key={plan.label}>
                <header><span>{plan.label}</span><h4>{plan.title}</h4><p>{plan.body}</p></header>
                <ol>
                  {plan.items.map(([title, body], index) => (
                    <li key={title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div><h5>{title}</h5><p>{body}</p></div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-visual-section amazon-directions" aria-label="设计方向探索">
        <AmazonSectionHeading
          title="设计探索"
          body="两个方向分别采用不同的信息骨架，测试以商品分流为主和以主题场景为主的两种首页组织方式。"
        />
        <div className="amazon-directions__grid">
          <article>
            <div className="amazon-directions__copy">
              <span className="amazon-directions__eyebrow">DIRECTION 01</span>
              <span className="amazon-directions__watermark" aria-hidden="true">MOST PICKED</span>
              <h3>紧凑的购物编辑页</h3><p>用更短的页面、明确的分区标题和规则商品网格，优先测试信息密度与转化效率。</p>
            </div>
            <AmazonScrollablePage
              src="/assets/amazon-store-home/direction-01-desktop-hq.jpg"
              alt="Amazon 首页设计方向一完整页面"
              label="DIRECTION 01 / WEB"
              className="amazon-directions__browser"
            />
          </article>
          <article>
            <div className="amazon-directions__copy"><span className="amazon-directions__eyebrow">DIRECTION 02</span><h3>更强的生活方式叙事</h3><p>放大季节场景、品牌形象和产品使用画面，并用更活泼、跳跃的版式节奏强化 FUNNYFUZZY 的品牌辨识度。</p></div>
            <AmazonScrollablePage
              src="/assets/amazon-store-home/direction-02-desktop-hq.jpg"
              alt="Amazon 首页设计方向二完整页面"
              label="DIRECTION 02 / WEB"
              className="amazon-directions__browser"
            />
          </article>
        </div>
      </section>

      <section className="case-visual-section amazon-final-web" aria-label="最终 Web 端设计">
        <AmazonSectionHeading
          title="设计展示"
          body="利用桌面端的横向空间建立清晰分区，让主题场景、热销商品、品牌信息与核心类目支持快速比较和连续浏览。"
        />
        <AmazonScrollablePage
          src="/assets/amazon-store-home/final-desktop-hq.jpg"
          alt="FUNNYFUZZY Amazon 店铺首页最终 Web 端完整方案"
          label="最终 Web 端页面滚动预览"
          className="amazon-final__browser amazon-final-web__browser"
        />
      </section>

      <section className="case-visual-section amazon-final-mobile" aria-label="最终移动端设计">
        <div className="amazon-final-mobile__copy">
          <AmazonSectionHeading
            title="移动端设计"
            body="围绕移动端扫读重新组织图片比例、文字尺寸与内容顺序，让同一套内容在窄屏中保持清晰节奏，而不是对 Web 版等比缩放。"
          />
          {liveUrl && <a className="amazon-final__live" href={liveUrl} target="_blank" rel="noreferrer">查看已上线 Amazon 店铺 <ArrowRight aria-hidden="true" /></a>}
        </div>
        <AmazonScrollablePage
          src="/assets/amazon-store-home/final-mobile.jpg"
          alt="FUNNYFUZZY Amazon 店铺首页最终移动端完整方案"
          label="最终移动端页面滚动预览"
          device="mobile"
          className="amazon-final__browser amazon-final-mobile__browser"
        />
      </section>

      <section className="case-visual-section amazon-results" aria-label="项目数据结果">
        <AmazonSectionHeading title="数据结果" body="上线后的数据将在这里补充，并与改版前的同周期表现对比。" />
        <div className="amazon-results__grid">
          {['店铺访问量', '商品详情页点击率', '转化率', '新访客占比'].map((label) => (
            <article key={label}><span>{label}</span><strong>—</strong><small>待补充</small></article>
          ))}
        </div>
        <p className="amazon-results__note">建议后续统一填写“改版前 / 改版后 / 变化幅度 / 统计周期”，避免只展示没有基线的绝对数字。</p>
      </section>

      <section className="case-visual-section amazon-summary" aria-label="项目总结">
        <p className="amazon-case__kicker">项目总结</p>
        <h2>这次改版最重要的改变，不是让首页看起来更新，而是让每一类内容都有明确任务。</h2>
        <div>
          <p>品牌场景负责吸引和记忆，热销与品类负责分流，产品模块负责支持判断，品牌介绍和媒体背书负责建立信任。</p>
          <p>双端设计也不再是同一张图的放大与缩小，而是围绕同一内容目标，为不同屏幕重新组织节奏。</p>
        </div>
      </section>
    </article>
  );
}

function IdealVmallDetail({ project }) {
  const researchBars = [
    ['有购买需求', 714, 100],
    ['预约新品', 290, 41],
    ['比较商品价格', 270, 38],
    ['随便逛逛', 140, 20],
  ];
  const visualBars = [
    ['高级简约、内容密度低', 503, 100],
    ['促销热闹、优惠属性突出', 155, 31],
    ['年轻活力、营销品牌结合', 89, 18],
    ['其他', 36, 7],
  ];
  const satisfactionBars = [
    ['设计美观性', 6.19, 63],
    ['信息理解性', 6.26, 87],
    ['信息布局合理性', 6.17, 57],
    ['易操作性', 6.29, 97],
    ['系统流畅性', 6.23, 77],
  ];
  const userVoices = [
    ['李*', '希望页面更加简洁、大方、卡片化、年轻化，减少过度的信息量，也更能突出华为自己的风格。'],
    ['周**', '型号分类要明确，产品介绍更详尽；发货地和配件适配机型也要标得更清楚。'],
    ['陈*', '首页信息太多，希望信息更精简、推荐更精准；订单物流更新也需要更及时。'],
    ['张**', '希望 APP 和实体店能互动，线上线下账号互通；分类明确，能快速找到目标商品。'],
    ['王*', '页面动画切换有些生硬，反应速度偶尔卡顿；大量图片渲染时不够流畅。'],
    ['赵**', '高端机型应该高级简约，中端可以更年轻有活力，促销内容也要区分档次。'],
    ['林*', '希望整体更简约、更精致，做工与材质感更好，不需要打开页面就是满屏文字和图片。'],
    ['孙**', '希望增加老用户专属购买通道，服务可以更个性化，也能更快找到适合自己的产品。'],
    ['何*', '分类和导航再清楚一些，找商品时不需要在首页反复翻找。'],
    ['吴**', '希望产品页增加买家互动体验和机型对比，帮助判断不同型号的差异。'],
    ['郑*', 'V+ 权益、发货地和适配机型都是购买前关心的信息，希望能更直观地看到。'],
    ['黄**', '历史已购商品希望可以随时查看，订单状态和物流信息也要更新得更及时。'],
  ];
  const industryBrands = [
    ['Apple', '/assets/ideal-vmall/insights/apple.svg'],
    ['DJI', '/assets/ideal-vmall/insights/dji.svg'],
    ['CHANEL', '/assets/ideal-vmall/insights/chanel.svg'],
    ['Louis Vuitton', '/assets/ideal-vmall/insights/louisvuitton.svg'],
    ['Hermès', '/assets/ideal-vmall/insights/hermes.svg'],
  ];
  const insights = [
    ['清晰的浏览与导购体验', '通过新品吸引，引导探索、体验、购买、售后服务构建购买旅程，同时具备线上线下联动能力。'],
    ['主打新品，用户视角划分品类、页面定位清晰', '每一个页面定位界限清晰，不杂乱；符合用户的预期。'],
    ['极具视觉冲击力与品质感', '高品质橱窗式商品大卡展示，视音频结合；主次区别、用色克制、空间留白贯穿全流程。'],
    ['多端与线上线下体验的一致性', '统一线上多端与线下门店的内容、品牌表达和服务体验，让用户在浏览、体验、购买与售后之间保持连续。'],
  ];
  const materialStudies = [
    {
      brand: '华为商城',
      key: 'vmall',
      logo: '/assets/ideal-vmall/materials/vmall-logo.png',
      strip: '/assets/ideal-vmall/materials/vmall-strip-v2.png',
    },
    {
      brand: 'Apple',
      key: 'apple',
      logo: '/assets/ideal-vmall/materials/apple-logo.png',
      strip: '/assets/ideal-vmall/materials/apple-strip.png',
    },
    {
      brand: 'DJI',
      key: 'dji',
      logo: '/assets/ideal-vmall/materials/dji-logo.png',
      strip: '/assets/ideal-vmall/materials/dji-strip.png',
    },
  ];
  const colorStudies = [
    {
      brand: '华为商城',
      wheel: '/assets/ideal-vmall/colors/vmall-wheel-v2.png',
      samples: '/assets/ideal-vmall/colors/vmall-samples.png',
      points: ['全流程以红色为主', '红色承担过多视觉焦点', '品牌色在促销语境中被稀释'],
    },
    {
      brand: 'Apple',
      wheel: '/assets/ideal-vmall/colors/apple-wheel-v2.png',
      samples: '/assets/ideal-vmall/colors/apple-samples.png',
      points: ['全流程仅使用少量彩色', '黑白灰构成界面主体', '色彩只出现在产品与关键状态'],
    },
    {
      brand: 'DJI',
      wheel: '/assets/ideal-vmall/colors/dji-wheel-v2.png',
      samples: '/assets/ideal-vmall/colors/dji-samples.png',
      points: ['全流程仅使用少量彩色', '黑白灰构成界面主体', '蓝色与橙色用于操作和状态提示'],
    },
  ];
  const copyStudies = [
    {
      brand: '华为商城',
      mode: '权益驱动',
      headline: '全场景智慧生活',
      fragments: [
        ['品牌主张', '全场景智慧生活'],
        ['场景', '围绕五大智慧生活场景'],
        ['商品', '产品参数与核心卖点'],
        ['权益', '会员权益与以旧换新'],
        ['促销', '限时特惠与赠品信息'],
        ['行动', '了解更多 / 立即抢购'],
      ],
      summary: '愿景足够完整，但价格、权益与商品卖点常在同一层级出现，用户需要先筛选信息，才能理解产品价值。',
    },
    {
      brand: 'Apple',
      mode: '价值驱动',
      headline: '产品都称心，体验更如意。',
      fragments: [
        ['品牌主张', '产品都称心，体验更如意'],
        ['新品', '上新了，认识一下新朋友'],
        ['选购', '怎么选？看这里'],
        ['服务', '专家协助完成选择'],
        ['换购', '折抵换购与分期支持'],
        ['行动', '进一步了解 / 购买'],
      ],
      summary: '先用一句话建立价值，再把选择、服务与优惠分段表达；短句承担情绪，细节留给下一层。',
    },
    {
      brand: 'DJI',
      mode: '场景驱动',
      headline: '不仅仅是飞行',
      fragments: [
        ['品牌主张', '不仅仅是飞行'],
        ['新品', '正品保证，全球首发'],
        ['教程', '轻松上手，大师养成'],
        ['社区', '作品欣赏与同好交流'],
        ['服务', '设备管理与全面保障'],
        ['行动', '立即购买 / 了解详情'],
      ],
      summary: '把专业能力翻译为可感知的使用结果，让产品、教程、社区与服务形成连续的品牌叙事。',
    },
  ];
  const luxuryNarratives = [
    {
      brand: 'CHANEL',
      key: 'chanel',
      mode: '影像 × 文学',
      title: '把时装变成一场持续发生的文化对谈',
      summary: '以电影计划、文学对谈和人物栏目延伸时装的语境，让品牌不只在发布新品时出现，而是持续参与文化讨论。',
      formats: ['系列影片', '文学对谈', '人物栏目'],
      images: [
        ['/assets/ideal-vmall/luxury-narrative/chanel-literary.jpg', 'CHANEL 文学对谈栏目'],
        ['/assets/ideal-vmall/luxury-narrative/chanel-cinema.jpg', 'CHANEL 电影创作者内容'],
      ],
      source: 'CHANEL 官方专题',
      sourceUrl: 'https://www.chanel.com/us/fashion/event/literary-rendez-vous/',
    },
    {
      brand: 'LOUIS VUITTON',
      key: 'lv',
      mode: '共创 × 展览',
      title: '让经典符号成为全球创作者的共同画布',
      summary: '邀请不同领域的创作者重新诠释经典硬箱，再以巡展把作品带入城市空间；产品符号因此变成开放的文化媒介。',
      formats: ['艺术家共创', '主题巡展', '城市事件'],
      images: [
        ['/assets/ideal-vmall/luxury-narrative/lv-exhibition-02.jpg', 'Louis Vuitton 200 Trunks, 200 Visionaries 展览现场'],
        ['/assets/ideal-vmall/luxury-narrative/lv-exhibition-01.jpg', 'Louis Vuitton 创作者硬箱作品'],
      ],
      source: 'Louis Vuitton 官方展览',
      sourceUrl: 'https://eu.louisvuitton.com/eng-e1/magazine/articles/louis-200-exhibition',
    },
    {
      brand: 'HERMÈS',
      key: 'hermes',
      mode: '艺术 × 城市',
      title: '把商业橱窗变成城市里的微型剧场',
      summary: '由不同艺术家围绕年度主题创作橱窗，将产品、材料与想象编成可步入城市日常的故事，让每次路过都成为一次品牌接触。',
      formats: ['艺术橱窗', '年度主题', '在地创作'],
      images: [
        ['/assets/ideal-vmall/luxury-narrative/hermes-window-01.jpg', 'Hermès 大阪艺术橱窗'],
        ['/assets/ideal-vmall/luxury-narrative/hermes-window-02.jpg', 'Hermès 名古屋艺术橱窗'],
      ],
      source: 'Hermès 官方橱窗专题',
      sourceUrl: 'https://lanterne.hermes.com/en/local-window/local-window-26summer/',
    },
  ];

  return (
    <article className="case-study ideal-vmall-case">
      <CaseHero project={project} />

      <section className="case-visual-section ideal-vmall-opening" aria-label="项目愿景">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">
            从消费者对品质、秩序与体验的期待出发，以纯净、贴心、高品质的设计语言重塑华为商城：让产品更突出、决策更清晰，让每一次浏览、选择与服务自然衔接。
          </h2>
        </div>
      </section>

      <section className="case-visual-section ideal-vmall-trends" aria-label="消费者行为趋势">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">消费者行为趋势</h2>
          <h3>消费并未简单降级，而是转向更主动的产品研究、渠道比较与品质判断。商城因此需要让价格更透明、信息更易比较，并用评价、服务与克制的视觉建立旗舰价值感。</h3>
        </div>
        <div className="ideal-vmall-trends__grid">
          {[
            ['58%', '为不确定性预留空间', '受访城镇家庭希望“存点钱以备不时之需”。购买决策因此需要更明确的价值说明与更低的试错成本。'],
            ['47%', '寻找更好的价格', '消费者倾向更换零售渠道来获得低价或折扣，但不一定更换喜欢的品牌。优惠需要透明，而不是淹没产品。'],
            ['>75%', '口碑成为决策证据', '跨世代消费者将线上评论列为影响购买决策的三大因素之一。真实评价、体验内容与售后保障应更早出现。'],
            ['持续增长', '品质仍然值得溢价', '高端品牌依然跑赢大众品牌。旗舰商城需要用产品展示、内容质量和服务体验共同支撑品质感。'],
          ].map(([value, title, body]) => (
            <article className="ideal-vmall-trend-card ideal-vmall-reveal" key={title}>
              <header><strong>{value}</strong></header>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
        <p className="ideal-vmall-trends__source">
          趋势依据：
          <a href="https://www.mckinsey.com.cn/2023%E9%BA%A6%E8%82%AF%E9%94%A1%E4%B8%AD%E5%9B%BD%E6%B6%88%E8%B4%B9%E8%80%85%E6%8A%A5%E5%91%8A%EF%BC%9A%E9%9F%A7%E6%80%A7%E6%97%B6%E4%BB%A3/" target="_blank" rel="noreferrer">《2023 麦肯锡中国消费者报告》</a>
          与
          <a href="https://www.mckinsey.com.cn/%E9%BA%A6%E8%82%AF%E9%94%A1%E4%B8%AD%E5%9B%BD%E6%B6%88%E8%B4%B9%E8%80%85%E7%89%B9%E5%88%8A-%E4%B8%AD%E5%9B%BDz%E4%B8%96%E4%BB%A3%E5%88%9D%E9%95%BF%E6%88%90%EF%BC%8C%E5%A6%82%E4%BD%95%E4%BF%98/" target="_blank" rel="noreferrer">中国消费者专题研究</a>
        </p>
      </section>

      <section className="case-visual-section ideal-vmall-research" aria-label="用户研究">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">用户研究</h2>
          <h3>用短问卷确认访问动机、核心模块关注因素与视觉偏好，为后续体验方向提供量化依据。</h3>
        </div>
        <div className="ideal-vmall-research__meta ideal-vmall-reveal">
          {[['投放周期', '2023.08.23—08.27'], ['投放渠道', '短信推送'], ['总样本量', '796'], ['有效样本', '783'], ['体验满意度', '6.23 / 7']].map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
        <div className="ideal-vmall-research__charts">
          <ResearchBarCard title="浏览 VMALL 的主要目的" bars={researchBars} />
          <ResearchBarCard title="设计风格偏好" bars={visualBars} accent />
          <ResearchBarCard title="用户满意度评分" note="整体 6.23 / 7" bars={satisfactionBars} compact />
        </div>
        <section className="ideal-vmall-voices" aria-label="用户原声">
          <div className="case-section-heading">
            <h2 className="case-section-heading__title">用户原声</h2>
            <h3>在用户对理想商城的描述中，“高级”与“简约”反复出现。但它们并非单一的视觉偏好，而是一种关于品质、秩序与体验的共同期待。</h3>
          </div>
          <div className="ideal-vmall-voices__board">
            {[userVoices.slice(0, 6), userVoices.slice(6)].map((row, rowIndex) => (
              <div className={`ideal-vmall-voices__row ideal-vmall-voices__row--${rowIndex + 1}`} key={rowIndex}>
                {[0, 1].map((repeatIndex) => (
                  <div
                    className="ideal-vmall-voices__group"
                    aria-hidden={repeatIndex === 1 ? 'true' : undefined}
                    key={repeatIndex}
                  >
                    {row.map(([name, quote], index) => {
                      const voiceIndex = rowIndex * 6 + index + 1;

                      return (
                        <blockquote
                          className={`ideal-vmall-voice-card ideal-vmall-voice-card--${voiceIndex}${repeatIndex === 0 ? ' ideal-vmall-reveal' : ''}`}
                          key={`${name}-${repeatIndex}`}
                        >
                          <span className="ideal-vmall-voice-card__mark" aria-hidden="true">“</span>
                          <p>{quote}</p>
                          <footer><span aria-hidden="true">{name.slice(0, 1)}</span><cite>{name}</cite></footer>
                        </blockquote>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="case-visual-section ideal-vmall-materials" aria-label="素材图分析">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">素材图</h2>
          <h3>VMALL 相比 Apple、DJI 商城，使用了大量非官方或二次创作素材，品质感较弱。</h3>
        </div>
        <div className="ideal-vmall-materials__studies">
          {materialStudies.map((study) => (
            <article className="ideal-vmall-materials__study ideal-vmall-reveal" aria-label={`${study.brand}素材`} key={study.brand}>
              <div className="ideal-vmall-materials__identity">
                <img src={study.logo} alt={study.brand} />
              </div>
              <figure className="ideal-vmall-materials__strip">
                <img src={study.strip} alt={`${study.brand}素材组合`} loading="lazy" decoding="async" />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <section className="case-visual-section ideal-vmall-colors" aria-label="颜色分析">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">颜色</h2>
          <h3>VMALL 的色彩使用稍显繁杂，品牌红也缺少精确控制；Apple 与 DJI 则以中性色建立秩序，让少量强调色承担明确的产品与状态信息。</h3>
        </div>
        <div className="ideal-vmall-colors__grid">
          {colorStudies.map((study) => (
            <article className="ideal-vmall-color-card ideal-vmall-reveal" aria-label={`${study.brand}颜色分析`} key={study.brand}>
              <header>
                <ul>
                  {study.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <img className="ideal-vmall-color-card__wheel" src={study.wheel} alt={`${study.brand}色轮`} loading="lazy" decoding="async" />
              </header>
              <figure className="ideal-vmall-color-card__samples">
                <img src={study.samples} alt={`${study.brand}界面颜色样本`} loading="lazy" decoding="async" />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <section className="case-visual-section ideal-vmall-copy" aria-label="文案分析">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">文案</h2>
          <h3>同样在销售科技产品，三家品牌选择了不同的表达起点：VMALL 强调权益，Apple 提炼价值，DJI 则把专业能力放进使用场景。</h3>
        </div>
        <div className="ideal-vmall-copy__grid">
          {copyStudies.map((study) => (
            <article className="ideal-vmall-copy-card ideal-vmall-reveal" key={study.brand}>
              <header>
                <strong>{study.brand}</strong>
                <em>{study.mode}</em>
              </header>
              <blockquote>{study.headline}</blockquote>
              <div className="ideal-vmall-copy-card__fragments">
                {study.fragments.map(([label, fragment]) => (
                  <div key={label}><span>{label}</span><strong>{fragment}</strong></div>
                ))}
              </div>
              <p>{study.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-visual-section ideal-vmall-narrative" aria-label="奢侈品牌传播形式">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">品牌叙事</h2>
          <h3>高级感，不止被看见，更需要被持续讲述。奢侈品牌通过影像、文学、艺术共创、展览与城市空间，让同一套品牌价值进入不同文化场景。</h3>
        </div>
        <div className="ideal-vmall-narrative__chapters">
          {luxuryNarratives.map((study) => (
            <article className={`ideal-vmall-narrative-chapter ideal-vmall-narrative-chapter--${study.key} ideal-vmall-reveal`} key={study.brand}>
              <header className="ideal-vmall-narrative-chapter__header">
                <strong>{study.brand}</strong>
                <em>{study.mode}</em>
              </header>
              <div className="ideal-vmall-narrative-chapter__media">
                {study.images.map(([src, alt], imageIndex) => (
                  <figure className={imageIndex === 0 ? 'is-primary' : 'is-detail'} key={src}>
                    <img src={src} alt={alt} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
              <div className="ideal-vmall-narrative-chapter__copy">
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
                <ul>{study.formats.map((format) => <li key={format}>{format}</li>)}</ul>
                <a href={study.sourceUrl} target="_blank" rel="noreferrer">{study.source} ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-visual-section case-sticky-showcase ideal-vmall-insights" aria-label="业界洞察">
        <aside className="case-sticky-copy ideal-vmall-insights__intro">
          <h2>业界洞察</h2>
          <h3>吸收五个品牌在导购、视觉表达与品牌传播上的经验，收束为能够进入商城体验的四点启发。</h3>
          <div className="ideal-vmall-insights__brands ideal-vmall-reveal" aria-label="竞品品牌">
            {industryBrands.map(([brand, logo]) => (
              <figure key={brand}>
                <img src={logo} alt={`${brand} 品牌标识`} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </aside>
        <div className="case-visual-stack ideal-vmall-insights__cards">
          {insights.map(([title, body]) => (
            <article className="ideal-vmall-insight-card ideal-vmall-reveal" key={title}>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-visual-section ideal-vmall-direction" aria-label="设计方向">
        <div className="case-section-heading case-section-heading--statement ideal-vmall-direction__heading">
          <h2 className="case-section-heading__title">将“高端”拆解为纯净、贴心与高品质，打造贯穿页面、动线、动效与内容的精品旗舰体验。</h2>
        </div>
        <div className="ideal-vmall-direction__grid">
          {[
            ['纯净', '坚持少即是多', ['页面定位清晰', '净化页面空间', '以用户视角呈现信息', '减少重复页面与内容', '保留呼吸感留白'], '/assets/ideal-vmall/strategy/purity.jpg', '户外移动场景中的纯净产品体验'],
            ['贴心', '沉浸式且一致', ['构建 F 型浏览动线', '首屏提供 3D 裸眼体验', '强化 1+8+车互动体验', '保持小程序、Web 与 iOS 多端一致', '用微动效强化状态反馈'], '/assets/ideal-vmall/strategy/care.jpg', '鲜花与宠物主题的年轻生活方式影像'],
            ['高品质', '呈现质感打磨', ['降低信息密度', '控制颜色使用比例', '全面升级样式控件与组件', '规范内容质量标准', '减少二次创作素材'], '/assets/ideal-vmall/strategy/quality.jpg', '高端室内场景中的品质产品体验'],
          ].map(([title, subtitle, items, image, imageAlt]) => (
            <article className="ideal-vmall-direction__card ideal-vmall-reveal" key={title}>
              <figure className="ideal-vmall-direction__visual"><img src={image} alt={imageAlt} loading="lazy" decoding="async" /></figure>
              <div className="ideal-vmall-direction__content">
                <h3>{title}</h3><p>{subtitle}</p>
                <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-visual-section ideal-vmall-detail-analysis" aria-label="详情页现网分析">
        <div className="case-section-heading ideal-vmall-detail-analysis__heading">
          <h2 className="case-section-heading__title">详情页设计</h2>
          <h3>重排信息优先级，让产品成为决策起点。</h3>
        </div>

        <div className="ideal-vmall-detail-analysis__layout">
          <div className="ideal-vmall-detail-analysis__current ideal-vmall-reveal">
            <div className="ideal-vmall-detail-analysis__copy">
              <span>现网分析</span>
              <div>
                <h3>现网分析：信息认知负重大、制约易读性。</h3>
                <p>综合用户调研、竞品分析及数据结果，用户首要关注信息应为产品信息而非优惠。</p>
              </div>
            </div>
            <div className="ideal-vmall-detail-analysis__phones" aria-label="现网关键页面">
              {[
                ['/assets/ideal-vmall/detail-analysis/current-page.jpg', '商品详情基础页面', '基础页面', '产品、价格与促销在首屏同时争夺注意力'],
                ['/assets/ideal-vmall/detail-analysis/offer-sheet.jpg', '商品详情优惠弹窗', '优惠弹窗', '优惠券、赠品和促销规则形成新的信息层级'],
                ['/assets/ideal-vmall/detail-analysis/sku-sheet.jpg', '商品详情选配弹窗', '选配弹窗', '颜色、版本、套餐与赠品集中在一次选择中'],
              ].map(([image, alt, label, body]) => (
                <figure key={label}>
                  <div><img src={image} alt={alt} loading="lazy" decoding="async" /></div>
                  <figcaption><strong>{label}</strong><span>{body}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
          <DetailAnalysisScroller />
        </div>
      </section>

      <section className="case-visual-section ideal-vmall-plan" aria-label="方案对比">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">详情页方案对比</h2>
          <h3>将内容浏览与购买决策的两种路径并置验证，最终选择认知成本更低、转化更直接的主流电商方案。</h3>
        </div>
        <div className="ideal-vmall-plan__comparison">
          {[
            {
              label: '方案一',
              title: '看购分离',
              score: '42%',
              points: [
                ['专注用户体验，信息浏览不受购买信息干扰', true],
                ['分离式设计让信息分类更加明确', true],
                ['购买模块可相对独立地维护与更新', true],
                ['操作步骤更繁琐，学习成本相对较高', false],
              ],
              pages: [
                ['/assets/ideal-vmall/plan-comparison/separated-detail.jpg', '看购分离方案详情页'],
                ['/assets/ideal-vmall/plan-comparison/separated-purchase.jpg', '看购分离方案选购页'],
              ],
            },
            {
              label: '方案二',
              title: '主流电商',
              score: '58%',
              points: [
                ['快速完成购物流程，购买效率更高', true],
                ['符合用户既有习惯，无需重新学习', true],
                ['促销信息直接展示，能够有效刺激购买欲望', true],
                ['页面信息容易杂乱，体验深度不足', false],
              ],
              pages: [
                ['/assets/ideal-vmall/plan-comparison/mainstream-detail.jpg', '主流电商方案详情页'],
                ['/assets/ideal-vmall/plan-comparison/mainstream-purchase.jpg', '主流电商方案选购页'],
              ],
            },
          ].map(plan => (
            <article className="ideal-vmall-plan__card ideal-vmall-reveal" key={plan.title}>
              <header>
                <span>{plan.label}</span>
                <div>
                  <h3>{plan.title}</h3>
                  <p><strong>{plan.score}</strong> 用户选择</p>
                </div>
                <ul>
                  {plan.points.map(([point, positive]) => (
                    <li className={positive ? '' : 'is-negative'} key={point}>{point}</li>
                  ))}
                </ul>
              </header>
              <div className="ideal-vmall-plan__pages">
                {plan.pages.map(([src, alt]) => (
                  <figure key={src}>
                    <img src={src} alt={alt} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <DetailPositioningScroller />
      <DetailPageShowcase />
      <OrderCurrentAnalysis />
      <OrderPageShowcase />

      <section className="case-visual-section ideal-vmall-ending" aria-label="项目总结">
        <header className="ideal-vmall-ending__header">
          <p>项目结语</p>
          <div aria-label="设计策略关键词">
            <span>纯净</span>
            <span>贴心</span>
            <span>高品质</span>
          </div>
        </header>
        <div className="ideal-vmall-ending__statement">
          <p>高端，不是把所有信息藏起来，极致地留白、降噪，</p>
          <h2>而是在每一次决定发生前，只为用户呈现刚刚好的内容。</h2>
        </div>
      </section>
    </article>
  );
}

function DetailAnalysisScroller() {
  const [progress, setProgress] = useState(0);
  const stages = [
    ['产品展示', '以 3D、图片、视频和配件建立产品认知。'],
    ['功能分发', '机型对比与图文详情承接不同探索意图。'],
    ['核心信息', '产品价格、核心卖点与关键优惠集中出现。'],
    ['吸引刺激', '搭配优惠、以旧换新与补贴持续抢占注意力。'],
    ['决策加固', '用户评价、购买咨询与入手体验补充决策依据。'],
    ['关联分发', '相关好物与参数继续延长页面和购买链路。'],
  ];

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const distance = Math.max(scrollHeight - clientHeight, 1);
    setProgress(scrollTop / distance);
  };

  return (
    <section className="ideal-vmall-detail-analysis__scroller ideal-vmall-reveal" aria-label="现网详情页信息链路">
      <header>
        <div>
          <span>页面全貌</span>
          <h3>一条详情页，同时承担六类信息任务。</h3>
        </div>
        <p>在卡片内向下滚动</p>
      </header>
      <div className="ideal-vmall-detail-analysis__scroller-stage">
        <div className="ideal-vmall-detail-analysis__annotations" aria-live="polite">
          {stages.map(([title, body], index) => {
            const stageProgress = index / (stages.length - 1);
            const delta = stageProgress - progress;
            const opacity = Math.max(0, 1 - Math.abs(delta) * 3.2);

            return (
              <article
                className={index % 2 === 0 ? 'is-left' : 'is-right'}
                key={title}
                style={{
                  '--annotation-opacity': opacity,
                  '--annotation-y': `${delta * 560}px`,
                }}
              >
                <h4>{title}</h4>
                <p>{body}</p>
              </article>
            );
          })}
        </div>
        <div
          className="ideal-vmall-detail-analysis__scroll-viewport"
          onScroll={handleScroll}
          role="region"
          aria-label="滚动查看现网商品详情页完整长图"
          tabIndex="0"
        >
          <img src="/assets/ideal-vmall/detail-analysis/full-page.jpg" alt="现网商品详情页完整长图" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}

function DetailPositioningScroller() {
  const [activeStage, setActiveStage] = useState(0);
  const timelineRef = useRef(null);
  const interactionViewportRef = useRef(null);
  const visualViewportRef = useRef(null);
  const interactionImageRef = useRef(null);
  const visualImageRef = useRef(null);
  const updatePositioningRef = useRef(null);
  const stages = [
    {
      title: '立体与多维展示',
      body: '用 3D、视频与多角度图片建立第一眼认知，先讲清产品，再进入购买信息。',
      layout: 'products',
      assets: [
        ['/assets/ideal-vmall/detail-positioning/product-main.jpg', 'HUAWEI Pura 70 Ultra 产品正反面展示'],
        ['/assets/ideal-vmall/detail-positioning/product-3d.jpg', 'HUAWEI Pura 70 Ultra 三维探索入口'],
        ['/assets/ideal-vmall/detail-positioning/product-video.jpg', 'HUAWEI Pura 70 Ultra 镜头细节视频'],
      ],
    },
    {
      title: '优惠与卖点分层',
      body: '统一新品、拼团、价保与订金等活动表达，让价格、卖点和优惠在同一决策区内有序出现。',
      layout: 'strips',
      assets: [
        ['/assets/ideal-vmall/detail-positioning/promo-presale.jpg', '新品预售活动模块'],
        ['/assets/ideal-vmall/detail-positioning/promo-group.jpg', '拼团活动模块'],
        ['/assets/ideal-vmall/detail-positioning/promo-price.jpg', '价保活动模块'],
        ['/assets/ideal-vmall/detail-positioning/promo-deposit.jpg', '订金活动模块'],
      ],
    },
    {
      title: '选购与物流直显',
      body: '把已选配置、推荐搭配、换新与配送信息前置，让用户在离开页面前完成关键判断。',
      layout: 'delivery',
      assets: [
        ['/assets/ideal-vmall/detail-positioning/delivery-default.jpg', '默认配送信息'],
        ['/assets/ideal-vmall/detail-positioning/delivery-selected.jpg', '展开后的配送方式信息'],
      ],
    },
    {
      title: '服务保障',
      body: '将服务说明和资质证明放在可验证的独立层级，用真实凭证持续加固购买决策。',
      layout: 'services',
      assets: [
        ['/assets/ideal-vmall/detail-positioning/service-details.jpg', '服务说明页面'],
        ['/assets/ideal-vmall/detail-positioning/service-certificate.jpg', '服务资质证明页面'],
      ],
    },
    {
      title: '参数与规则说明',
      body: '参数负责确认性能，规则负责消除疑问；长文本分组承载，不与核心购买信息争夺注意力。',
      layout: 'rules',
      assets: [
        ['/assets/ideal-vmall/detail-positioning/rules-agreement.jpg', '华为商城服务协议'],
        ['/assets/ideal-vmall/detail-positioning/rules-notice.jpg', '商品参数与规则说明'],
      ],
    },
    {
      title: '快捷选配入口',
      body: '底部操作区根据预售、缺货、加购与立即购买状态响应，让下一步始终明确。',
      layout: 'actions',
      assets: [
        ['/assets/ideal-vmall/detail-positioning/action-buy.jpg', '立即购买状态'],
        ['/assets/ideal-vmall/detail-positioning/action-countdown.jpg', '预售倒计时状态'],
        ['/assets/ideal-vmall/detail-positioning/action-out-of-stock.jpg', '暂时缺货状态'],
        ['/assets/ideal-vmall/detail-positioning/action-cart.jpg', '加购与立即购买状态'],
      ],
    },
  ];
  const thresholds = [0, .14, .29, .46, .72, .9];

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const timeline = timelineRef.current;
      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();
      const distance = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const movePage = (viewport, image) => {
        if (!viewport || !image) return;
        const travel = Math.max(image.offsetHeight - viewport.clientHeight, 0);
        image.style.transform = `translate3d(0, ${-progress * travel}px, 0)`;
      };

      movePage(interactionViewportRef.current, interactionImageRef.current);
      movePage(visualViewportRef.current, visualImageRef.current);

      let nextStage = 0;
      thresholds.forEach((threshold, index) => {
        if (progress >= threshold) nextStage = index;
      });
      setActiveStage((current) => current === nextStage ? current : nextStage);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    updatePositioningRef.current = requestUpdate;
    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      updatePositioningRef.current = null;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <>
      <div className="case-section-heading ideal-vmall-positioning__intro">
        <h2 className="case-section-heading__title">详情页定位与交互</h2>
        <h3>以产品信息为主要承载、以业务转化为主战场，通过清晰的区域划分与克制的营销表达，让产品、优惠与履约信息在正确的决策节点出现。</h3>
      </div>
      <section className="case-visual-section ideal-vmall-positioning" aria-label="详情页定位与交互">
      <div className="ideal-vmall-positioning__timeline" ref={timelineRef}>
        <div className="ideal-vmall-positioning__sticky">
          <div className="ideal-vmall-positioning__pages" aria-label="同步浏览交互页面与视觉页面">
            <figure className="ideal-vmall-positioning__page-frame">
              <figcaption>交互页面</figcaption>
              <div className="ideal-vmall-positioning__page-viewport" ref={interactionViewportRef}>
                <img
                  ref={interactionImageRef}
                  src="/assets/ideal-vmall/detail-positioning/interaction-page.jpg"
                  alt="HUAWEI Pura 70 Ultra 交互页面"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => updatePositioningRef.current?.()}
                />
              </div>
            </figure>
            <figure className="ideal-vmall-positioning__page-frame">
              <figcaption>视觉页面</figcaption>
              <div className="ideal-vmall-positioning__page-viewport" ref={visualViewportRef}>
                <img
                  ref={visualImageRef}
                  src="/assets/ideal-vmall/detail-positioning/full-page.jpg"
                  alt="HUAWEI Pura 70 Ultra 视觉页面"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => updatePositioningRef.current?.()}
                />
              </div>
            </figure>
          </div>
          <div className="ideal-vmall-positioning__details" aria-live="polite">
            {stages.map((stage, index) => (
              <article
                className={`ideal-vmall-positioning__detail ${activeStage === index ? 'is-active' : ''}`}
                aria-hidden={activeStage !== index}
                key={stage.title}
              >
                <header>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </header>
                <div className={`ideal-vmall-positioning__visuals ideal-vmall-positioning__visuals--${stage.layout}`}>
                  {stage.assets.map(([src, alt]) => (
                    <figure key={src}><img src={src} alt={alt} loading="lazy" decoding="async" /></figure>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function DetailPageShowcase() {
  const columns = [
    [
      ['watch.png', '智能手表详情页'],
      ['reviews.png', '商品评价列表'],
      ['service-license.png', '服务资质证明'],
    ],
    [
      ['dark-content.png', '深色图文内容页'],
      ['laptop-config.png', '笔记本选配页面'],
      ['video-fullscreen.png', '商品视频全屏页面'],
    ],
    [
      ['phone.png', '手机商品详情页'],
      ['discount-calculation.png', '优惠算价方案'],
      ['experience.png', '用户入手体验'],
    ],
    [
      ['discount.png', '优惠信息页面'],
      ['service-info.png', '服务说明页面'],
      ['personalization-selected.png', '个性搭配选中状态'],
    ],
    [
      ['earbuds.png', '耳机商品详情页'],
      ['discount-1.png', '优惠赠品页面'],
      ['engraving.png', '镌刻服务未选中状态'],
    ],
    [
      ['main-zoom.png', '商品主图放大页面'],
      ['phone-scrolled.png', '手机详情页滚动状态'],
      ['reviews-1.png', '商品评价详情'],
    ],
  ];

  return (
    <>
      <div className="case-section-heading ideal-vmall-page-showcase__heading">
        <h2 className="case-section-heading__title">详情页呈现</h2>
        <h3>在统一的信息框架中适配手机、穿戴、耳机与电脑等不同品类，并覆盖主图、视频、优惠、选配、服务、评价与体验等关键状态。</h3>
      </div>
      <section className="case-visual-section ideal-vmall-page-showcase" aria-label="详情页呈现">
        <div className="ideal-vmall-page-showcase__grid">
          {columns.map((column, columnIndex) => (
            <div
              className={`ideal-vmall-page-showcase__column ideal-vmall-page-showcase__column--${columnIndex + 1} ideal-vmall-reveal`}
              key={columnIndex}
            >
              {column.map(([file, alt]) => (
                <figure key={file}>
                  <img
                    src={`/assets/ideal-vmall/detail-showcase/${file}`}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function OrderCurrentAnalysis() {
  const findings = [
    {
      title: '信息层级',
      body: '订单列表的文字、标签与操作密度较高，关键状态、金额和下一步任务不够突出。',
    },
    {
      title: '视觉负担',
      body: '详情页顶部强调色面积偏大，内容被拆分为多个零散卡片，影响连续阅读。',
    },
    {
      title: '履约反馈',
      body: '物流仍依赖一条冗长时间线，缺少地图与当前节点的直观位置反馈。',
    },
  ];
  const screens = [
    ['order-list.jpg', '订单列表', '现网订单列表页面'],
    ['order-complete.jpg', '完成态详情', '现网已完成订单详情页'],
    ['order-payment.jpg', '待支付详情', '现网待支付订单详情页'],
    ['order-tracking.jpg', '物流跟踪', '现网订单物流跟踪页'],
  ];

  return (
    <section className="case-visual-section ideal-vmall-order-analysis" aria-label="订单页现网分析">
      <div className="case-section-heading ideal-vmall-order-analysis__heading">
        <h2 className="case-section-heading__title">订单页现网分析</h2>
        <h3>核心状态与关键操作被高密度信息包围，订单列表、详情与物流难以建立清晰的浏览节奏。</h3>
      </div>
      <div className="ideal-vmall-order-analysis__body">
        <div className="ideal-vmall-order-analysis__findings">
          {findings.map((finding) => (
            <article className="ideal-vmall-order-analysis__finding ideal-vmall-reveal" key={finding.title}>
              <h3>{finding.title}</h3>
              <p>{finding.body}</p>
            </article>
          ))}
        </div>
        <div className="ideal-vmall-order-analysis__screens" aria-label="订单页现网截图">
          {screens.map(([file, label, alt], index) => (
            <figure
              className={`ideal-vmall-order-analysis__screen ideal-vmall-order-analysis__screen--${index + 1} ideal-vmall-reveal`}
              key={file}
            >
              <figcaption>{label}</figcaption>
              <div>
                <img
                  src={`/assets/ideal-vmall/order-current/${file}`}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderPageShowcase() {
  return (
    <>
      <div className="case-section-heading ideal-vmall-order-showcase__heading">
        <h2 className="case-section-heading__title">订单页面呈现</h2>
        <h3>将列表、详情、状态与物流地图连接成完整的履约旅程，让每个阶段的重点和下一步操作更明确。</h3>
      </div>
      <section className="case-visual-section ideal-vmall-order-showcase" aria-label="订单页面呈现">
        <img
          className="ideal-vmall-order-showcase__composite"
          src="/assets/ideal-vmall/order-showcase/order-pages-composite.jpg"
          alt="订单中心、订单详情与物流状态页面组合展示"
          loading="lazy"
          decoding="async"
        />
      </section>
    </>
  );
}

function ResearchBarCard({ title, bars, accent = false, note, compact = false }) {
  return <article className={`ideal-vmall-chart ideal-vmall-reveal ${accent ? 'ideal-vmall-chart--accent' : ''} ${compact ? 'ideal-vmall-chart--compact' : ''}`}><header className="ideal-vmall-chart__header"><h3>{title}</h3>{note && <strong>{note}</strong>}</header><div>{bars.map(([label, value, width]) => <div className="ideal-vmall-chart__row" key={label}><span>{label}</span><i><b style={{ '--bar-width': `${width}%` }} /></i><strong>{value}</strong></div>)}</div></article>;
}

function UomDetail({ project }) {
  const data = project.caseStudy;

  return (
    <article className="case-study uom-case">
      <CaseHero project={project} />

      <section className="case-visual-section uom-target-section" aria-label="UOM 项目目标">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">{data.target.title}</h2>
        </div>
        <div className="case-section-heading uom-target-section__plan-heading">
          <h2 className="case-section-heading__title">{data.target.cardTitle}</h2>
          <h3>{data.target.body}</h3>
        </div>
        <div className="uom-target">
          <ol className="uom-target__stages uom-reveal">
            {data.target.stages.map((stage, index) => (
              <li key={stage.title}>
                <span className="uom-target__number">{String(index + 1).padStart(2, '0')}</span>
                <div className="uom-target__timeline" aria-hidden="true">
                  <span className="uom-target__timeline-node" />
                  <span className="uom-target__timeline-track" />
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="case-visual-section uom-research" aria-label="用户研究与体验问题">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">用户调研与问题归因</h2>
          <h3>
            2024 年 7–9 月结合业务反馈和产品自检，盘点 UOM 运营管理台的组件、样式与高频任务，
            将零散抱怨归纳为四类可以被设计系统解决的问题。
          </h3>
        </div>
        <UomIssueExplorer issues={data.issueTypes} metrics={data.metrics.slice(0, 2)} />
      </section>

      <section className="case-visual-section uom-analysis" aria-label="根因分析与设计目标">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">{data.analysis.title}</h2>
          <h3>{data.analysis.body}</h3>
        </div>
        <UomAnalysisMap analysis={data.analysis} goals={data.goals} />
      </section>

      <section className="case-visual-section uom-tactic" aria-label="UOM 规范治理策略">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">分层治理页面，优先整改高频入口</h2>
          <h3>
            新页面直接使用最新组件与样式；存量页面按访问频率逐步整改。
            治理重点不是一次性翻新全部页面，而是让每次迭代都更接近同一套系统。
          </h3>
        </div>
        <div className="uom-tactic__grid uom-reveal">
          <div className="uom-page-types">
            <div className="uom-tactic__subheading">
              <h3>页面分级治理</h3>
              <span>覆盖占比 / 治理优先级</span>
            </div>
            <div className="uom-page-types__grid">
              {data.pageTypes.map((pageType, index) => (
                <article className={`uom-page-type uom-page-type--${index + 1}`} key={pageType.label}>
                  <header>
                    <span>{pageType.label}</span>
                    <strong>{pageType.value}<small>%</small></strong>
                  </header>
                  <div className="uom-page-type__scope">
                    <span>覆盖范围</span>
                    <p>{pageType.scope}</p>
                  </div>
                  <div className="uom-page-type__priority">
                    <span>治理优先级</span>
                    <strong>{pageType.priority}</strong>
                  </div>
                  <ol>
                    {pageType.actions.map((action) => <li key={action}>{action}</li>)}
                  </ol>
                </article>
              ))}
            </div>
          </div>
          <div className="uom-ranking">
            <div className="uom-ranking__heading">
              <div>
                <h3>TOP50 高频菜单</h3>
                <p>以平均访问量确定存量页面整改顺序</p>
              </div>
              <span>日均 PV</span>
            </div>
            {data.menuRanking.map(([label, value]) => (
              <div className="uom-ranking__row" key={label}>
                <span>{label}</span>
                <div><i style={{ '--uom-rank': `${(value / 290) * 100}%` }} /></div>
                <strong>{value}</strong>
              </div>
            ))}
            <p className="uom-ranking__note">这里只呈现附件中访问量最高的 6 个入口，作为优先级判断样本。</p>
          </div>
        </div>
      </section>

      <section className="case-visual-section uom-roadmap" aria-label="UOM 版本路线图">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">开发版本计划</h2>
          <h3>根据用户反馈优先级，用 25.1、25.3、25.5 三个版本逐步补齐公共组件能力，并让产研协作沿同一条链路推进。</h3>
        </div>
        <UomRoadmap versions={data.versions} flow={data.releaseFlow} />
      </section>

      <section className="case-visual-section uom-thinking" aria-label="UOM 设计系统思路">
        <UomThinking principles={data.principles} levels={data.atomicLevels} />
      </section>

      <section className="case-visual-section uom-system" aria-label="UOM 规范与组件">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">
            把分散的视觉语言沉淀为一致、可复用的基础规则
          </h2>
        </div>
        <div className="uom-system__modules">
          <section className="uom-system__module uom-reveal">
            <div className="uom-system__module-heading">
              <h3>颜色</h3>
              <p>主色采用具有沉稳、可靠含义的深蓝色，用于需要突出的文字、按钮和 ICON 等。</p>
            </div>
            <figure className="uom-system__media">
              <img src="/assets/uom/component-system/color-system.jpg" alt="UOM 主色、状态色与文字色规范" />
            </figure>
          </section>

          <section className="uom-system__module uom-reveal">
            <div className="uom-system__module-heading">
              <h3>字体</h3>
              <p>字体默认使用鸿蒙黑体；若涉及不同浏览器及系统无法应用鸿蒙黑体，则使用微软雅黑替代。</p>
            </div>
            <figure className="uom-system__media">
              <img src="/assets/uom/component-system/typography-system.svg" alt="UOM 中文、英文与数字字体规范" />
            </figure>
          </section>

          <section className="uom-system__module uom-reveal">
            <div className="uom-system__module-heading">
              <h3>图标</h3>
              <p>系统图标以 64 × 64 px 为设计参考；图标绘制区域为 64 × 64 px，图标比例约束参考下图。</p>
            </div>
            <figure className="uom-system__media">
              <img src="/assets/uom/component-system/icon-system.svg" alt="UOM 图标尺寸、比例与类型规范" />
            </figure>
          </section>

          <section className="uom-system__module uom-reveal">
            <div className="uom-system__module-heading">
              <h3>栅格</h3>
              <p>栅格系统用于辅助设计师进行页面布局。当前提供 Web 端 1700 px（1920 px 画布减去 220 px 左侧菜单）的布局参考。</p>
            </div>
            <figure className="uom-system__media">
              <img src="/assets/uom/component-system/grid-system.svg" alt="UOM Web 端十二列栅格布局规范" />
            </figure>
          </section>

          <section className="uom-system__module uom-reveal">
            <div className="uom-system__module-heading">
              <h3>侧边菜单与布局</h3>
              <p>布局样式是产品页面的重要构成。VMALL 运营管理后台统一采用固定侧边栏与自适应内容区，页面边距为 20 px，模块上下间距为 12 px。</p>
            </div>
            <figure className="uom-system__media">
              <img src="/assets/uom/component-system/sidebar-layout.png" alt="UOM 侧边菜单与后台页面布局规范" />
            </figure>
          </section>
        </div>
      </section>

      <section className="case-visual-section uom-controls" aria-label="UOM 设计控件">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">把高频交互沉淀为一致、可复用的设计控件</h2>
        </div>
        <div className="uom-controls__modules">
          <section className="uom-controls__module uom-reveal">
            <div className="uom-controls__module-heading">
              <h3>按钮</h3>
              <p>常规按钮最小宽度为 96 px，小尺寸按钮最小宽度为 52 px，最大宽度均为 220 px；按钮宽度随文字动态扩展，超长文字省略处理，多个按钮间的水平间距为 12 px。</p>
            </div>
            <figure className="uom-controls__media">
              <img src="/assets/uom/component-system/button-system.svg" alt="UOM 按钮类型、尺寸与交互状态规范" />
            </figure>
          </section>

          <section className="uom-controls__module uom-reveal">
            <div className="uom-controls__module-heading">
              <h3>输入框</h3>
              <p>输入框用于内容录入：在过滤框架中采用标签在上、输入区在下的上下结构；在表单框架中采用标签在左、输入区在右的左右结构。</p>
            </div>
            <figure className="uom-controls__media">
              <img src="/assets/uom/component-system/input-system.svg" alt="UOM 输入框结构、尺寸与状态规范" />
            </figure>
          </section>

          <section className="uom-controls__module uom-reveal">
            <div className="uom-controls__module-heading">
              <h3>下拉菜单</h3>
              <p>下拉菜单默认显示水印文本；点击下拉箭头并选中特定项目后，水印文本消失。置灰状态下，下拉菜单不可操作。</p>
            </div>
            <figure className="uom-controls__media">
              <img src="/assets/uom/component-system/select-system.svg" alt="UOM 下拉菜单单选、多选与搜索状态规范" />
            </figure>
          </section>

          <section className="uom-controls__module uom-reveal">
            <div className="uom-controls__module-heading">
              <h3>Checkbox</h3>
              <p>根据选项的功能属性，提供单选框与多选框两种样式；在最大宽度内最多展示一行，超长内容截断处理。</p>
            </div>
            <figure className="uom-controls__media">
              <img src="/assets/uom/component-system/checkbox-system.svg" alt="UOM 单选框与多选框状态及布局规范" />
            </figure>
          </section>

          <section className="uom-controls__module uom-reveal">
            <div className="uom-controls__module-heading">
              <h3>时间选择</h3>
              <p>时间选择器提供手动输入与选择输入两种方式，并支持时间段、快捷时间范围及时分秒的精确选择。</p>
            </div>
            <figure className="uom-controls__media">
              <img src="/assets/uom/component-system/date-time-system.svg" alt="UOM 时间段、快捷范围与时分秒选择规范" />
            </figure>
          </section>

          <section className="uom-controls__module uom-reveal">
            <div className="uom-controls__module-heading">
              <h3>地址选择</h3>
              <p>地址选择框与输入框保持一致；在最大宽度内最多展示一行，超长内容截断，悬停时可查看完整文案。实现时优先复用系统已有控件。</p>
            </div>
            <figure className="uom-controls__media">
              <img src="/assets/uom/component-system/address-system.svg" alt="UOM 地址选择器输入与多级选择规范" />
            </figure>
          </section>

          <section className="uom-controls__module uom-reveal">
            <div className="uom-controls__module-heading">
              <h3>文件上传</h3>
              <p>文件上传支持图片预览与文件列表两种展示形式；上传前明确提示支持的格式、文件数量和大小限制，上传后提供清晰的预览、修改与移除操作。</p>
            </div>
            <figure className="uom-controls__media">
              <img src="/assets/uom/component-system/upload-system.svg" alt="UOM 图片预览与文件列表上传规范" />
            </figure>
          </section>
        </div>
      </section>

      <section className="case-visual-section uom-pages" aria-label="UOM 页面成果">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">
            规范最终需要回到真实运营任务中：创建、审核、配置与批量维护，都应使用同一套可理解的操作逻辑。
          </h2>
        </div>
        <div className="uom-pages__gallery">
          {data.gallery.map((item) => (
            <figure className="uom-reveal" key={item.src}>
              <img src={item.src} alt={item.alt} />
            </figure>
          ))}
        </div>
      </section>

      <section className="case-visual-section uom-outcome" aria-label="UOM 项目推进结果">
        <header className="uom-outcome__header">
          <p>项目总结</p>
          <h2>规范不是终点，真正的价值是让团队持续用同一种方式解决问题。</h2>
          <p className="uom-outcome__intro">UOM 2.0 将分散的后台经验转化为可复用、可协作、可持续演进的产品能力，让设计规范真正进入页面生产与交付流程。</p>
        </header>

        <div className="uom-outcome__results">
          <article>
            <span>01</span>
            <h3>规范沉淀</h3>
            <p>统一基础规则与高频控件，减少跨业务设计中的重复判断和局部差异。</p>
          </article>
          <article>
            <span>02</span>
            <h3>工具协同</h3>
            <p>将规则同步到 PIXSO 与研发组件，让设计、产品和开发围绕同一套标准协作。</p>
          </article>
          <article>
            <span>03</span>
            <h3>持续治理</h3>
            <p>以高频任务为优先级持续整改存量页面，让规范随真实业务反馈不断完善。</p>
          </article>
        </div>

      </section>
    </article>
  );
}

function UomIssueExplorer({ issues, metrics }) {
  const [activeId, setActiveId] = useState(issues[0].id);
  const activeIssue = issues.find((issue) => issue.id === activeId) || issues[0];
  const activeIssueIndex = Math.max(0, issues.findIndex((issue) => issue.id === activeIssue.id));

  return (
    <div
      className="uom-issue-explorer uom-reveal"
      style={{ '--uom-issue-active': activeIssue.color }}
    >
      <div className="uom-issue-explorer__header">
        <div className="uom-issue-explorer__intro">
          <h3>内部调研</h3>
          <div className="uom-issue-explorer__metrics" aria-label="用户调研规模">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}<span>{metric.unit}</span></strong>
                <small>{metric.label}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="uom-issue-explorer__tabs" role="tablist" aria-label="体验问题类型">
          {issues.map((issue) => (
            <button
              aria-controls="uom-issue-panel"
              aria-label={issue.title}
              aria-selected={issue.id === activeId}
              className={issue.id === activeId ? 'is-active' : ''}
              id={`uom-issue-tab-${issue.id}`}
              key={issue.id}
              onClick={() => setActiveId(issue.id)}
              role="tab"
              style={{ '--uom-issue-color': issue.color }}
              type="button"
            >
              <strong>{issue.title}</strong>
              <span>{issue.body}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        aria-labelledby={`uom-issue-tab-${activeIssue.id}`}
        id="uom-issue-panel"
        className="uom-issue-explorer__panel"
        role="tabpanel"
      >
        <div className={`uom-feedback-cloud uom-feedback-cloud--${activeIssue.id}`}>
          {activeIssue.feedback.map((item, index) => (
            <blockquote className={`uom-feedback-card uom-feedback-card--${index + 1}`} key={item.quote}>
              <img
                aria-hidden="true"
                src={UOM_FEEDBACK_AVATARS[(index + activeIssueIndex * 2) % UOM_FEEDBACK_AVATARS.length]}
                alt=""
              />
              <p>{item.quote}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}

function UomAnalysisMap({ analysis, goals }) {
  const stages = [
    {
      id: 'roots',
      title: '根因分析',
      items: analysis.rootCauses,
      connectors: 2,
    },
    {
      id: 'pains',
      title: '痛点总结',
      items: analysis.painPoints,
      connectors: 1,
    },
    {
      id: 'appeals',
      title: '诉求拆解',
      items: analysis.appeals,
      connectors: 3,
    },
    {
      id: 'goals',
      title: '设计目标',
      items: goals.map(([title, body]) => ({ title, body })),
      connectors: 0,
    },
  ];

  return (
    <ol className="uom-analysis-map uom-reveal" aria-label="从根因到设计目标的分析路径">
      {stages.map((stage) => (
        <li className={`uom-analysis-map__stage uom-analysis-map__stage--${stage.id}`} key={stage.id}>
          <div className="uom-analysis-map__label">
            <h3>{stage.title}</h3>
          </div>
          <div className="uom-analysis-map__cards">
            {stage.items.map((item, itemIndex) => {
              const title = typeof item === 'string' ? null : item.title;
              const body = typeof item === 'string' ? item : item.body;
              return (
                <article key={title || body}>
                  {title && <h4>{title}</h4>}
                  {stage.id === 'appeals' && <span>{String(itemIndex + 1).padStart(2, '0')}</span>}
                  <p>{body}</p>
                </article>
              );
            })}
          </div>
          {stage.connectors > 0 && (
            <div
              aria-hidden="true"
              className="uom-analysis-map__connectors"
              style={{ '--uom-analysis-connectors': stage.connectors }}
            >
              {Array.from({ length: stage.connectors }, (_, index) => (
                <span key={index}><ChevronDown /></span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function UomRoadmap({ versions, flow }) {
  const [activeVersion, setActiveVersion] = useState(versions[0].version);
  const active = versions.find((item) => item.version === activeVersion) || versions[0];

  return (
    <div className="uom-roadmap__shell uom-reveal">
      <div className="uom-roadmap__flow" aria-label="产研协同流程">
        <h3>产研协同</h3>
        <ol>
          {flow.map((step, index) => (
            <li key={`${step.role}-${step.task}`}>
              <div><span>{step.role}</span><strong>{step.task}</strong></div>
              {index < flow.length - 1 && <ArrowRight aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
      <div className="uom-roadmap__content">
        <div className="uom-roadmap__tabs" role="tablist" aria-label="版本选择">
          {versions.map((version) => (
            <button
              aria-controls="uom-roadmap-panel"
              aria-selected={version.version === activeVersion}
              className={version.version === activeVersion ? 'is-active' : ''}
              id={`uom-roadmap-tab-${version.version.replace('.', '-')}`}
              key={version.version}
              onClick={() => setActiveVersion(version.version)}
              role="tab"
              type="button"
            >
              <span>{version.version}</span>
              <strong>{version.title}</strong>
            </button>
          ))}
        </div>
        <div
          aria-labelledby={`uom-roadmap-tab-${active.version.replace('.', '-')}`}
          id="uom-roadmap-panel"
          className="uom-roadmap__panel"
          role="tabpanel"
        >
          <div className="uom-roadmap__summary">
            <p>VERSION {active.version}</p>
            <h3>{active.title}</h3>
            <span>按反馈优先级逐项补齐，并同步沉淀到设计与研发规范。</span>
          </div>
          <div className="uom-roadmap__table-wrap">
            <table className="uom-roadmap__table">
              <thead>
                <tr>
                  <th scope="col">组件</th>
                  <th scope="col">现状痛点</th>
                  <th scope="col">重要交互效果</th>
                </tr>
              </thead>
              <tbody>
                {active.items.map((item) => (
                  <tr key={item.component}>
                    <th scope="row">{item.component}</th>
                    <td>{item.pain}</td>
                    <td>{item.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UomPrincipleDiagram({ principles }) {
  const classNames = ['consistency', 'efficiency', 'collaboration'];

  return (
    <div className="uom-thinking__diagram" role="img" aria-label="一致性、效率与协作三项规范升级价值">
      <div className="uom-cover__color-field" aria-hidden="true">
        <span className="uom-cover__color uom-cover__color--consistency" />
        <span className="uom-cover__color uom-cover__color--efficiency" />
        <span className="uom-cover__color uom-cover__color--collaboration" />
      </div>
      <div className="uom-cover__blur-field" aria-hidden="true">
        <div className="uom-cover__blur-clip uom-cover__blur-clip--collaboration">
          <div className="uom-cover__blur-sample">
            <span className="uom-cover__blur-source uom-cover__blur-source--efficiency" />
          </div>
        </div>
        <div className="uom-cover__blur-clip uom-cover__blur-clip--consistency">
          <div className="uom-cover__blur-sample">
            <span className="uom-cover__blur-source uom-cover__blur-source--efficiency" />
            <span className="uom-cover__blur-source uom-cover__blur-source--collaboration" />
          </div>
        </div>
      </div>
      {principles.map(([title, body], index) => (
        <div className={`uom-cover__principle uom-cover__principle--${classNames[index]}`} key={title}>
          <strong>{title}</strong>
          <span>{body}</span>
        </div>
      ))}
    </div>
  );
}

function UomThinking({ principles, levels }) {
  return (
    <div className="case-sticky-showcase uom-thinking__layout uom-reveal">
      <aside className="case-sticky-copy uom-thinking__why">
        <h2>用统一颗粒度，把规范组装成页面</h2>
        <h3>
          将抽象原则拆成可以组合、复用和共同维护的五级能力，让设计规则真正进入页面生产与交付流程。
        </h3>
        <UomPrincipleDiagram principles={principles} />
      </aside>

      <ol className="case-visual-stack uom-thinking__levels" aria-label="组件颗粒度五个层级">
        {levels.map((level) => (
          <li className="state-showcase-card__visual uom-thinking__level" key={level.title}>
            <div className="uom-thinking__level-content">
              <div className="uom-thinking__level-heading">
                <img src={level.icon} alt="" />
                <div>
                  <p>{level.english}</p>
                  <h3>{level.title}</h3>
                </div>
              </div>
              <p className="uom-thinking__level-definition">{level.definition}</p>
              <ul aria-label={`${level.title}包含内容`}>
                {level.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function VmallLanguageDetail({ project }) {
  const [principlesSection, editingSection, ...sceneSections] = project.caseStudy.sections;

  return (
    <article className="case-study vmall-language-case">
      <CaseHero project={project} />

      <section className="case-visual-section vmall-language-overview" aria-label="规范内容结构">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">
            把零散的界面写作经验，整理成团队可以共同判断、直接查用并持续扩展的语言设计系统。
          </h2>
        </div>
        <VmallLanguageArchitecture items={project.caseStudy.architecture} />
      </section>

      <section id="vmall-language-principles" className="case-sticky-showcase vmall-language-principles" aria-label={principlesSection.title}>
        <div className="case-sticky-copy vmall-language-principles__copy">
          <h2 className="case-section-heading__title">{principlesSection.title}</h2>
          <h3>{principlesSection.body}</h3>
        </div>
        <VmallWritingPrinciples
          principles={principlesSection.principles}
        />
      </section>

      <section className="case-sticky-showcase vmall-language-principles" aria-label={principlesSection.guidanceTitle}>
        <div className="case-sticky-copy vmall-language-principles__copy">
          <h2 className="case-section-heading__title">{principlesSection.guidanceTitle}</h2>
          <h3>{principlesSection.guidanceBody}</h3>
        </div>
        <VmallWritingPrinciples plainPoints principles={principlesSection.guidance} />
      </section>

      <VmallToneVoice tone={principlesSection.toneVoice} />

      <section id="vmall-language-editing" className="case-visual-section vmall-language-editing" aria-label={editingSection.title}>
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">
            {editingSection.title}，{editingSection.body}
          </h2>
        </div>
        <VmallEditingRules rules={editingSection.rules} />
      </section>

      <VmallScenarioGuide sections={sceneSections} />

      <section className="case-visual-section vmall-language-outcome" aria-label="项目价值">
        <div className="case-section-heading case-section-heading--statement">
          <h2 className="case-section-heading__title">
            让好的内容决策能够被持续复制。{project.caseStudy.outcome}
          </h2>
        </div>
        <div className="vmall-language-outcome__grid">
          {[
            ['统一', '跨页面、跨业务使用同一套写作依据'],
            ['提效', '减少相同场景的重复讨论与重新定义'],
            ['降险', '让异常和高风险操作更容易理解'],
            ['扩展', '为内容审核与规范迭代建立基础'],
          ].map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

function VmallLanguageArchitecture({ items }) {
  const targets = ['#vmall-language-principles', '#vmall-language-editing', '#vmall-language-scenarios'];

  return (
    <div className="vmall-language-architecture">
      {items.map(([title, body], index) => (
        <a className="vmall-language-architecture__card" href={targets[index]} key={title}>
          <h3>{title}</h3>
          <h4>{body}</h4>
        </a>
      ))}
    </div>
  );
}

function VmallWritingPrinciples({ principles, plainPoints = false }) {
  return (
    <div className="case-visual-stack vmall-writing-principles__grid">
      {principles.map((principle) => (
        <article className="state-showcase-card__visual vmall-writing-principle-card" key={principle.title}>
          <div>
            <h3>{principle.title}</h3>
            <p className="vmall-writing-principle-card__summary">{principle.summary}</p>
            <ul className={`vmall-writing-principle-card__points ${plainPoints ? 'vmall-writing-principle-card__points--plain' : ''}`}>
              {principle.details.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function VmallToneVoice({ tone }) {
  return (
    <section className="case-visual-section vmall-tone-voice" aria-label={tone.title}>
      <div className="case-section-heading case-section-heading--statement">
        <h2 className="case-section-heading__title">{tone.title}</h2>
      </div>

      <div className="vmall-tone-voice__intro">
        {tone.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      <div className="vmall-tone-voice__principles">
        <div className="vmall-tone-voice__guidance">
          <article>
            <h3>应避免</h3>
            <ul>{tone.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <h3>应考虑</h3>
            <ul>{tone.consider.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>

        <div className="vmall-tone-scale" aria-label="语气尺度">
          {tone.scale.map((item, index) => (
            <article style={{ '--tone-level': index }} key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.example}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="vmall-tone-taxonomy">
        <section>
          <div className="vmall-tone-taxonomy__heading">
            <h3>Pattern 示例</h3>
            <span>{tone.patterns.length}</span>
          </div>
          <div className="vmall-tone-taxonomy__grid vmall-tone-taxonomy__grid--patterns">
            {tone.patterns.map((item) => (
              <span className={item.tone ? `is-${item.tone}` : ''} key={item.label}>{item.label}</span>
            ))}
          </div>
        </section>
        <section>
          <div className="vmall-tone-taxonomy__heading">
            <h3>控件</h3>
            <span>{tone.controls.length}</span>
          </div>
          <div className="vmall-tone-taxonomy__grid">
            {tone.controls.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>
      </div>
    </section>
  );
}

function VmallEditingRules({ rules }) {
  return (
    <div className="vmall-editing-rules">
      {rules.map((rule) => (
        <article key={rule.title}>
          <div className="vmall-editing-rules__heading">
            <h3>{rule.title}</h3>
            <h4>{rule.body}</h4>
          </div>
          <div className="vmall-rule-table-wrap">
            <table className="vmall-rule-table">
              <thead>
                <tr>
                  {rule.columns.map((column) => <th key={column} scope="col">{column}</th>)}
                </tr>
              </thead>
              <tbody>
                {rule.rows.map((row) => (
                  <tr key={row.join('-')}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ))}
    </div>
  );
}

function VmallDeletionComparisons({ cards }) {
  const firstPairCount = cards[0]?.pairs.length;
  const secondPairCount = cards[1]?.pairs.length;
  const layoutClass = firstPairCount === 2 && secondPairCount === 1
    ? 'vmall-deletion-comparisons--2-1'
    : firstPairCount === 1 && secondPairCount === 1
      ? 'vmall-deletion-comparisons--1-1'
      : '';

  return (
    <div className={`vmall-deletion-comparisons ${layoutClass}`} aria-label="弹出框案例对比">
      {cards.map((card) => (
        <article className="vmall-deletion-comparison-card" key={card.title}>
          <h4>{card.title}</h4>
          <div className={`vmall-deletion-comparison-card__pairs ${card.pairs.length === 1 ? 'vmall-deletion-comparison-card__pairs--single' : ''}`}>
            {card.pairs.map((pair) => (
              <div className="vmall-deletion-comparison-pair" key={pair.alt}>
                <figure>
                  <img src={pair.current} alt={`${pair.alt}现网方案`} />
                  <figcaption>现网</figcaption>
                </figure>
                <figure>
                  <img src={pair.proposed} alt={`${pair.alt}建议方案`} />
                  <figcaption>建议方案</figcaption>
                </figure>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function VmallScenarioTable({ table, scene }) {
  if (!table) return null;

  return (
    <div className="vmall-rule-table-wrap vmall-scenario-table-wrap">
      <table className={`vmall-rule-table vmall-scenario-table ${table.variant ? `vmall-scenario-table--${table.variant}` : ''}`}>
        <thead>
          <tr>
            {table.columns.map((column, columnIndex) => <th key={`${column}-${columnIndex}`} scope="col">{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={`${scene}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}-${cell.text}`}
                  rowSpan={cell.rowSpan || undefined}
                >
                  {cell.text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VmallScenarioFeatureCards({ cards }) {
  return (
    <div className="vmall-scenario-feature-cards" aria-label="异常与帮助案例">
      {cards.map((card) => (
        <article className="vmall-scenario-feature-card" key={card.title}>
          <h4>{card.title}</h4>
          <img src={card.src} alt={card.alt} />
        </article>
      ))}
    </div>
  );
}

function VmallGuidanceTextCards({ cards }) {
  return (
    <div className="vmall-guidance-text-cards" aria-label="全屏引导文案结构示例">
      {cards.map((card) => (
        <article className="vmall-guidance-text-card" key={card.title}>
          <h4>{card.title}</h4>
          <div className="vmall-guidance-text-card__items">
            {card.items.map((item) => (
              <section className="vmall-guidance-text-card__item" key={item.label}>
                <span className="vmall-guidance-text-card__label">{item.label}</span>
                <p>{item.text}</p>
                <div className="vmall-guidance-text-card__notes">
                  {item.notes.map((note) => <span key={note}>{note}</span>)}
                </div>
              </section>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function VmallScenarioIntroColumns({ columns }) {
  return (
    <div className="vmall-scenario-intro-columns">
      {columns.map((column) => (
        <article key={column.title}>
          <h4>{column.title}</h4>
          {column.groups
            ? (
              <div className="vmall-scenario-intro-columns__groups">
                {column.groups.map((group) => (
                  <section key={group.label}>
                    <h5>{group.label}</h5>
                    <ul>
                      {group.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            )
            : <p>{column.body}</p>}
        </article>
      ))}
    </div>
  );
}

function VmallSettingCards({ cards }) {
  return (
    <div className="vmall-setting-cards" aria-label="设置文案案例">
      {cards.map((card) => (
        <article className="vmall-setting-card" key={card.title}>
          <h4>{card.title}</h4>
          <div className="vmall-setting-card__example">
            <h5>{card.exampleTitle}</h5>
            <p>{card.exampleBody}</p>
            <span>{card.note}</span>
          </div>
          <img src={card.src} alt={card.alt} />
        </article>
      ))}
    </div>
  );
}

function VmallScenarioGuide({ sections }) {
  return (
    <section id="vmall-language-scenarios" className="case-visual-section vmall-scenario-guide" aria-label="场景化写作指导">
      <div className="case-section-heading case-section-heading--statement vmall-scenario-guide__statement">
        <h2 className="case-section-heading__title">
          把统一的写作判断落到具体界面场景，让状态、操作与反馈都能清楚说明发生了什么，以及用户接下来可以做什么。
        </h2>
      </div>
      <div className="vmall-scenario-guide__sections">
        {sections.map((section) => (
          <article className="vmall-scenario-guide__section" key={section.scene}>
            <div className="case-section-heading">
              <h3 className="case-section-heading__title">{section.scene}</h3>
              {section.body && <h4>{section.body}</h4>}
            </div>
            {section.introColumns && <VmallScenarioIntroColumns columns={section.introColumns} />}
            <VmallScenarioTable
              table={section.table || sections.find((candidate) => candidate.scene === section.tableSource)?.table}
              scene={section.scene}
            />
            {section.comparisonCards
              ? <VmallDeletionComparisons cards={section.comparisonCards} />
              : section.featureCards
                ? <VmallScenarioFeatureCards cards={section.featureCards} />
                : section.textCards
                  ? <VmallGuidanceTextCards cards={section.textCards} />
                  : section.settingCards
                    ? <VmallSettingCards cards={section.settingCards} />
              : (
                <div
                  className={`vmall-scenario-guide__media ${section.showcaseImages ? 'vmall-scenario-guide__media--equal-height' : ''}`}
                  aria-label={`${section.scene}截图`}
                >
                  {section.showcaseImages
                    ? section.showcaseImages.map((image) => (
                        <figure className="vmall-scene-image" key={image.src}>
                          <figcaption>
                            <h4>{image.title}</h4>
                            <p>{image.body}</p>
                          </figcaption>
                          <img src={image.src} alt={image.alt} />
                        </figure>
                      ))
                    : Array.from({ length: 3 }).map((_, index) => (
                        <figure className="vmall-scene-placeholder" key={index}>
                          <span>截图 {String(index + 1).padStart(2, '0')}</span>
                        </figure>
                      ))}
                </div>
              )}
          </article>
        ))}
      </div>
    </section>
  );
}

function VmallLanguageCover({ detail = false }) {
  return (
    <div className={`vmall-language-cover ${detail ? 'vmall-language-cover--detail' : ''}`} aria-hidden="true">
      <img
        className="vmall-language-cover__image"
        src="/assets/vmall-language-system/cover-language-mockup.png"
        alt=""
      />
    </div>
  );
}

function StatementGalleryDetail({ project }) {
  const galleryImages = project.caseStudy.images;

  return (
    <article className="minimal-case statement-gallery-case">
      <section className="minimal-case__statement" aria-label="项目说明">
        <h1 className="minimal-case__statement-title">{project.caseStudy.statement}</h1>
      </section>
      {galleryImages ? (
        <section className="photo-masonry statement-gallery-case__masonry" aria-label={`${project.title} 项目图集`}>
          {galleryImages.map((image, index) => (
            <figure className="statement-gallery-case__masonry-item" key={image}>
              <img
                src={image}
                alt={`${project.caseStudy.imageAlt} ${String(index + 1).padStart(2, '0')}`}
              />
            </figure>
          ))}
        </section>
      ) : (
        <figure className="minimal-case__image">
          <img src={project.caseStudy.image} alt={project.caseStudy.imageAlt} />
        </figure>
      )}
    </article>
  );
}

function AppIconGuideDetail({ project }) {
  const [brandSection, geometrySection, lineSection, modifierSection, showcaseSection, applicationSection] = project.caseStudy.sections;

  return (
    <article className="case-study app-icon-case">
      <CaseHero project={project} showFacts={false} />

      <BrandSymbolEvolutionSection section={brandSection} />

      <section className="case-visual-section app-icon-geometry" aria-label="FunnFuzzy APP 图标几何结构">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">{geometrySection.title}</h2>
          <h3>{geometrySection.body}</h3>
        </div>
        <figure className="app-icon-geometry__card">
          <img
            className="app-icon-geometry__image"
            src="/assets/app-icon-guide/geometric-structure.svg"
            alt="FunnFuzzy APP 图标方形与圆形几何结构规范"
          />
        </figure>
      </section>

      <section className="case-sticky-showcase app-icon-lines" aria-label="FunnFuzzy APP 图标线条规范">
        <div className="case-sticky-copy app-icon-lines__copy">
          <h2>{lineSection.title}</h2>
          <h3>{lineSection.body}</h3>
        </div>
        <div className="case-visual-stack app-icon-lines__cards">
          {APP_ICON_LINE_CARDS.map((card) => (
            <CaseVisualStackCard key={card.src}>
              <div className="app-icon-lines__card">
                <img src={card.src} alt={card.alt} />
              </div>
            </CaseVisualStackCard>
          ))}
        </div>
      </section>

      <section className="case-sticky-showcase app-icon-modifiers" aria-label="FunnFuzzy APP 图标修饰符规范">
        <div className="case-sticky-copy app-icon-modifiers__copy">
          <h2>{modifierSection.title}</h2>
          <h3>{modifierSection.body}</h3>
        </div>
        <div className="case-visual-stack app-icon-modifiers__cards">
          {APP_ICON_MODIFIER_CARDS.map((card) => (
            <CaseVisualStackCard key={card.src}>
              <div className="app-icon-modifiers__card">
                <img src={card.src} alt={card.alt} />
              </div>
            </CaseVisualStackCard>
          ))}
        </div>
      </section>

      <section className="case-visual-section app-icon-showcase" aria-label="FunnFuzzy APP 图标设计展示">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">{showcaseSection.title}</h2>
          <h3>{showcaseSection.body}</h3>
        </div>
        <div className="app-icon-showcase__card">
          <div className="app-icon-showcase__grid">
            {APP_ICON_GUIDE_ICONS.map((icon, index) => (
              <span className="app-icon-showcase__item" key={icon}>
                <img src={icon} alt={`FunnFuzzy APP 图标展示 ${index + 1}`} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="case-visual-section app-icon-application" aria-label="FunnFuzzy APP 图标场景应用">
        <div className="case-section-heading">
          <h2 className="case-section-heading__title">{applicationSection.title}</h2>
          <h3>{applicationSection.body}</h3>
        </div>
        <figure className="app-icon-application__image">
          <img
            src="/assets/app-icon-guide/application-showcase.jpg"
            alt="FunnFuzzy APP 图标实际应用展示"
          />
        </figure>
      </section>
    </article>
  );
}

function BrandSymbolEvolutionSection({ section }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !visualRef.current) return undefined;

    const context = gsap.context(() => {
      const stages = gsap.utils.toArray('.brand-evolution-stage', visualRef.current);
      const finalSequence = visualRef.current.querySelector('.brand-evolution-final-sequence');
      const fragments = visualRef.current.querySelector('.brand-evolution-final-sequence__fragments');
      const iconGrid = visualRef.current.querySelector('.brand-evolution-icon-system__grid');
      const accentIcons = gsap.utils.toArray('.brand-evolution-icon-pair__accent', visualRef.current);

      gsap.set(stages, { opacity: 0 });
      gsap.set(stages[0], { opacity: 1 });
      gsap.set(finalSequence, { opacity: 0 });
      gsap.set(fragments, { left: '50%', xPercent: -50, yPercent: -50 });
      gsap.set(iconGrid, { opacity: 0 });
      gsap.set(accentIcons, { opacity: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: stickyRef.current,
          start: () => `top ${window.innerWidth <= 809 ? 12 : Math.min(80, Math.max(64, window.innerHeight * 0.07))}px`,
          end: () => `+=${Math.max(window.innerHeight * 6, 3600)}`,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(stages[0], { opacity: 0, duration: 0.65 }, 0.35)
        .to(stages[1], { opacity: 1, duration: 0.65 }, 0.35)
        .to(stages[1], { opacity: 0, duration: 0.65 }, 1.35)
        .to(stages[2], { opacity: 1, duration: 0.65 }, 1.35)
        .to(stages[2], { opacity: 0, duration: 0.65 }, 2.35)
        .to(finalSequence, { opacity: 1, duration: 0.65 }, 2.35)
        .to(fragments, { left: '0%', xPercent: 0, duration: 0.8 }, 3.35)
        .to(iconGrid, { opacity: 1, duration: 0.75 }, 4.25)
        .to(accentIcons, { opacity: 1, duration: 0.75 }, 4.25)
        .to(accentIcons, { opacity: 0, duration: 0.75 }, 5.25);
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      className="brand-evolution"
      ref={sectionRef}
      aria-label={section.title}
    >
      <div className="brand-evolution__sticky" ref={stickyRef}>
        <div className="case-section-heading brand-evolution__copy">
          <h2 className="case-section-heading__title">{section.title}</h2>
          <h3>{section.body}</h3>
        </div>
        <BrandEvolutionVisual visualRef={visualRef} />
      </div>
    </section>
  );
}

function BrandEvolutionVisual({ visualRef }) {
  return (
    <div className="brand-evolution-visual" data-animation="scrubbed" ref={visualRef} aria-hidden="true">
      <BrandEvolutionStage index={0} active>
        <BrandEvolutionLogo variant="black" />
      </BrandEvolutionStage>
      <BrandEvolutionStage index={1}>
        <BrandEvolutionLogo variant="mixed" />
      </BrandEvolutionStage>
      <BrandEvolutionStage index={2}>
        <BrandEvolutionLogo variant="accent" />
      </BrandEvolutionStage>
      <BrandEvolutionStage index={3} active={false} />
      <BrandEvolutionStage index={4} active={false} />
      <BrandEvolutionStage index={5} active={false} />
      <BrandEvolutionStage index={6} active={false} />
      <BrandEvolutionFinalSequence />
    </div>
  );
}

function BrandEvolutionStage({ index, active, children }) {
  return (
    <div
      className={`brand-evolution-stage brand-evolution-stage--${index + 1} ${active ? 'is-active' : ''}`}
      data-evolution-stage={index + 1}
    >
      {children}
    </div>
  );
}

function BrandEvolutionLogo({ variant }) {
  return (
    <div className="brand-evolution-logo">
      {(variant === 'black' || variant === 'mixed') && (
        <img className="brand-evolution-logo__black" src={`${BRAND_EVOLUTION_BASE}/word-logo.svg`} alt="" />
      )}
      {(variant === 'accent' || variant === 'mixed') && (
        <img
          className="brand-evolution-logo__accent"
          src={`${BRAND_EVOLUTION_BASE}/word-logo-accent.svg`}
          alt=""
        />
      )}
    </div>
  );
}

function BrandEvolutionAccentFragments() {
  const accentLogo = `${BRAND_EVOLUTION_BASE}/word-logo-accent.svg`;

  return (
    <div className="brand-evolution-fragments">
      <img className="brand-evolution-fragments__corner" src={accentLogo} alt="" />
      <img className="brand-evolution-fragments__round" src={accentLogo} alt="" />
    </div>
  );
}

function BrandEvolutionFinalSequence() {
  return (
    <div className="brand-evolution-final-sequence">
      <div className="brand-evolution-final-sequence__fragments">
        <BrandEvolutionAccentFragments />
      </div>
      <div className="brand-evolution-icon-system__grid">
        {BRAND_EVOLUTION_ICONS.map((icon) => (
          <span className="brand-evolution-icon-pair" key={icon.black}>
            <img
              className="brand-evolution-icon-pair__accent"
              src={icon.accent}
              alt=""
            />
            <img className="brand-evolution-icon-pair__black" src={icon.black} alt="" />
          </span>
        ))}
      </div>
    </div>
  );
}

function AppIconGuideBoard() {
  return (
    <div className="app-icon-board">
      <div className="app-icon-board__brand">
        <img src="/assets/app-icon-guide/ff-logo.svg" alt="FunnFuzzy logo" />
      </div>
      <AnimatedIconGrid className="app-icon-board__grid" />
    </div>
  );
}

function AppIconUsageCard({ title, icons }) {
  return (
    <section className="app-icon-usage-card">
      <div className="app-icon-usage-card__bar">
        <strong>{title}</strong>
        <span />
      </div>
      <div className="app-icon-usage-card__icons">
        {icons.map((icon) => (
          <img key={icon} src={icon} alt="" aria-hidden="true" />
        ))}
      </div>
    </section>
  );
}

function CaseNarrativeCard({ section }) {
  return (
    <section className="case-section case-section--inline case-section--plain">
      <h2>{section.title}</h2>
      <div className="case-section__description">
        {section.body.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function OriginAiTransition({ causeSection, decisionSection }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const scrollRange = Math.max(1, rect.height - viewportHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollRange));

      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const revealProgress = Math.min(1, Math.max(0, (progress - 0.16) / 0.74));
  const easedReveal = 1 - Math.pow(1 - revealProgress, 3);
  const causeStyle = {
    opacity: 1 - easedReveal * 0.68,
    filter: `grayscale(${easedReveal})`,
    transform: `translateY(${-easedReveal * 18}px) scale(${1 - easedReveal * 0.035})`,
  };
  const decisionStyle = {
    opacity: easedReveal,
    transform: `translateY(${(1 - easedReveal) * 36}px) scale(${0.985 + easedReveal * 0.015})`,
    boxShadow: `0 ${14 + easedReveal * 20}px ${30 + easedReveal * 24}px rgba(31, 35, 40, ${0.05 + easedReveal * 0.1})`,
  };

  return (
    <section className="origin-ai-transition" ref={sectionRef} aria-label="从原始需求到 AI 插件方案">
      <div className="origin-ai-transition__sticky">
        <div className="origin-ai-transition__track">
          <article className="origin-ai-card origin-ai-card--cause" style={causeStyle}>
            <OriginTransitionCard section={causeSection} variant="cause" />
          </article>
          <article className="origin-ai-card origin-ai-card--decision" style={decisionStyle}>
            <OriginTransitionCard section={decisionSection} variant="decision" />
          </article>
        </div>
      </div>
    </section>
  );
}

function OriginTransitionCard({ section, variant }) {
  return (
    <>
      <div className={`origin-browser origin-browser--${variant}`} aria-hidden="true">
        <div className="origin-browser__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="origin-browser__image" />
        <div className="origin-browser__content">
          <span />
          <span />
          <span />
          <span />
          <i />
        </div>
        {variant === 'decision' && <div className="origin-browser__plugin" />}
      </div>
      <div className="origin-ai-copy">
        {section.eyebrow && <p>{section.eyebrow}</p>}
        <h2>{section.title}</h2>
        <ul>
          {section.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function SolutionFlowSection({ section }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const rect = sectionNode.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const scrollRange = Math.max(1, rect.height - viewportHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollRange));

      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const showSpu = progress > 0.34;
  const showNas = progress > 0.68;

  return (
    <section className="solution-flow" ref={sectionRef} aria-label="从产品页到素材库的最短路径">
      <div className="solution-flow__sticky">
        <div className="solution-flow__heading">
          <h2>{section.title}</h2>
          <div className="solution-flow__description">
            {section.body.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="solution-flow__screens">
          <SolutionBrowserFrame title="Product page" variant="product" showSpu={showSpu} showNas={showNas} />
          <SolutionBrowserFrame title="Feishu asset sheet" variant="spu" active={showSpu} />
          <SolutionBrowserFrame title="NAS" variant="nas" active={showNas} />
        </div>
      </div>
    </section>
  );
}

function SolutionBrowserFrame({ title, variant, active = true, showSpu = false, showNas = false }) {
  return (
    <figure className={`solution-screen solution-screen--${variant} ${active ? 'is-active' : ''}`}>
      <div className="solution-screen__bar">
        <span />
        <span />
        <span />
        <strong>{title}</strong>
      </div>
      {variant === 'product' && (
        <div className="solution-product">
          <div className="solution-product__image" />
          <div className="solution-product__copy">
            <span />
            <span />
            <span />
          </div>
          <div className="solution-plugin">
            <strong>SPU003</strong>
            <em>Dog bed</em>
            <button className={showSpu ? 'is-pressed' : ''} type="button">
              View SPU
            </button>
            <button className={showNas ? 'is-pressed' : ''} type="button">
              NAS assets
            </button>
          </div>
        </div>
      )}
      {variant === 'spu' && (
        <div className="solution-table">
          <span />
          <span />
          <strong>SPU003</strong>
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      {variant === 'nas' && (
        <div className="solution-nas-grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className={index === 4 ? 'is-selected' : ''}>
              {index === 4 ? 'Cooling Dog bed' : ''}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}

function AssetStateBoard() {
  const multipleItems = [
    ['FF00003', '树叶垫'],
    ['FF00115', '纯色雪尼尔防刮人字纹沙发套'],
    ['FF00324', '大号加厚防抓护脊狗狗垫子床护脊...'],
  ];

  return (
    <div className="case-visual-stack state-board">
      <StateShowcaseCard caption="已绑定 / 多个 SPU：同一产品页可以展示多个关联 SPU，同时保留 NAS 素材入口。">
        <AssetPanelReplica variant="bound" items={multipleItems} />
      </StateShowcaseCard>
      <StateShowcaseCard caption="未绑定：明确告诉同事当前商品还没有关联 NAS，下一步应该反馈绑定关系。">
        <AssetPanelReplica variant="unbound" />
      </StateShowcaseCard>
      <StateShowcaseCard caption="加载中：保留面板结构，避免同事误判插件未安装或页面没有响应。">
        <AssetPanelReplica variant="loading" />
      </StateShowcaseCard>
      <StateShowcaseCard caption="异常：把故障原因和处理对象前置，方便后续维护和排查。">
        <AssetPanelReplica variant="error" />
      </StateShowcaseCard>
      <StateShowcaseCard caption="折叠：不用时收起到右侧，不遮挡产品页主要信息。">
        <AssetPanelReplica variant="collapsed" />
      </StateShowcaseCard>
    </div>
  );
}

function StateShowcaseCard({ children, caption }) {
  return (
    <CaseVisualStackCard caption={caption} className="state-showcase-card">
      <div className="state-showcase-card__visual">{children}</div>
    </CaseVisualStackCard>
  );
}

function CaseVisualStackCard({ children, caption, className = '' }) {
  return (
    <figure className={`case-visual-stack__item ${className}`.trim()}>
      {children}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function CodexWorkflowSection() {
  const items = [
    {
      title: '把模糊需求拆成系统边界',
      body: '用 Codex 辅助梳理「产品页识别、飞书绑定查询、NAS 路径打开、SPU 表定位」四段链路，把原本只是在页面加编号的需求，转成内部插件 + 查询服务的方案。',
      image: '/assets/codex-summary-system-boundary.png',
      imageAlt: '文件卡片收纳盒图形'
    },
    {
      title: '把异常和维护前置',
      body: '从原项目中沉淀加载中、未绑定、服务异常、错误诊断复制、NAS 路径跨平台处理等状态，让非技术同事和管理员都知道下一步该做什么。',
      image: '/assets/codex-summary-workflow.png',
      imageAlt: '流程节点转化图形'
    },
    {
      title: '用测试约束 AI 生成结果',
      body: '项目包含面板、产品页识别、NAS 路径、飞书客户端、绑定解析和接口服务 6 组测试，用可验证的用例校准 Codex 输出，避免只停留在原型。',
      image: '/assets/codex-summary-validation.png',
      imageAlt: '数据分析放大镜图形'
    }
  ];

  return (
    <section className="codex-workflow" aria-label="AI 与 Codex 协作实现">
      <div className="case-section-heading case-section-heading--statement">
        <h2 className="case-section-heading__title">
          我把 Codex 当成可以协作落地的工程伙伴，而不只是生成文案或草图。这个项目里，AI
          参与了需求拆解、字段关系梳理、异常状态补全、测试用例设计和维护说明整理；我负责判断业务边界、验收体验细节，并把结果收敛成团队能长期使用的内部工具。
        </h2>
      </div>
      <div className="codex-workflow__grid">
        {items.map((item) => (
          <section className="codex-workflow__item" key={item.title}>
            <img src={item.image} alt={item.imageAlt} />
            <div className="codex-workflow__copy">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function AssetPanelReplica({ variant, items = [] }) {
  if (variant === 'collapsed') {
    return (
      <aside className="ff-assets-panel ff-assets-panel--demo ff-assets-panel--collapsed" aria-label="资产内容折叠状态">
        <button className="ff-assets-panel__button ff-assets-panel__toggle" type="button">
          ‹ 资产内容
        </button>
      </aside>
    );
  }

  const isBound = variant === 'bound';
  const isUnbound = variant === 'unbound';
  const isLoading = variant === 'loading';
  const isError = variant === 'error';
  const statusTitle = isUnbound ? '暂无数据' : isLoading ? '加载中' : '内部素材加载失败';
  const statusSubtitle = isUnbound ? '暂未关联数据源' : isLoading ? '正在获取素材信息' : '请联系管理员';
  const actionLabel = isBound ? 'NAS素材' : isUnbound ? '暂未关联NAS，去反馈' : isLoading ? '正在加载' : '内部素材加载失败';

  return (
    <aside className="ff-assets-panel ff-assets-panel--demo" aria-label={`资产内容${variant}状态`}>
      <button className="ff-assets-panel__button ff-assets-panel__toggle" type="button">
        ›
      </button>
      <div className="ff-assets-panel__content">
        <div className="ff-assets-panel__heading">资产内容</div>
        <div className="ff-assets-panel__top-actions">
          <button
            className="ff-assets-panel__button ff-assets-panel__button--primary ff-assets-panel__button--wide"
            type="button"
            disabled={!isBound}
          >
            {actionLabel}
          </button>
        </div>
        {isBound ? (
          <div className="ff-assets-panel__list">
            {items.map(([code, name]) => (
              <div className="ff-assets-panel__spu-card" key={`${code}-${name}`}>
                <div className="ff-assets-panel__spu-row">
                  <button className="ff-assets-panel__button ff-assets-panel__title-button ff-assets-panel__title" type="button">
                    {code}
                  </button>
                  <button className="ff-assets-panel__button ff-assets-panel__button--secondary ff-assets-panel__button--spu" type="button">
                    查看SPU
                  </button>
                </div>
                <div className="ff-assets-panel__subtitle">{name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ff-assets-panel__spu-card ff-assets-panel__spu-card--status">
            <div className="ff-assets-panel__title">{statusTitle}</div>
            <div className="ff-assets-panel__subtitle">{statusSubtitle}</div>
          </div>
        )}
      </div>
    </aside>
  );
}

function HeroBrowserChrome({ children, className = '' }) {
  return (
    <div className={`hero-browser ${className}`}>
      <div className="hero-browser__bar">
        <div className="hero-browser__traffic" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-browser__address" />
        <div className="hero-browser__share" aria-hidden="true" />
      </div>
      <div className="hero-browser__canvas">{children}</div>
      <div className="hero-browser__cursor" aria-hidden="true" />
    </div>
  );
}

function AssetLocatorCover() {
  return (
    <div className="asset-cover" aria-hidden="true">
      <HeroBrowserChrome>
        <div className="asset-cover__product-page">
          <span />
          <span />
          <span />
        </div>
        <AssetPanelReplica variant="bound" items={[['FF02649', '大型冷却可清洗犬垫']]} />
      </HeroBrowserChrome>
    </div>
  );
}

function HuaweiCloudCover({ project }) {
  if (project.coverVideo) {
    return (
      <div className="huawei-cloud-cover huawei-cloud-cover--video">
        <div className="huawei-cloud-cover__logo-zone">
          <img
            className="huawei-cloud-cover__logo"
            src={project.coverLogo}
            alt={project.coverLogoAlt || ''}
          />
        </div>
        <div className="huawei-cloud-cover__video-zone">
          <video
            className="huawei-cloud-cover__video"
            src={project.coverVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    );
  }

  const src = project.coverImage || '/assets/huawei-cloud/cover.jpg';
  const alt = project.coverImageAlt || '';

  if (project.coverLogo) {
    return (
      <div className="huawei-cloud-cover huawei-cloud-cover--split-image">
        <div className="huawei-cloud-cover__logo-zone">
          <img
            className="huawei-cloud-cover__logo"
            src={project.coverLogo}
            alt={project.coverLogoAlt || ''}
          />
        </div>
        <div className="huawei-cloud-cover__image-zone">
          <img className="huawei-cloud-cover__split-image" src={src} alt={alt} />
        </div>
      </div>
    );
  }

  return (
    <div className="huawei-cloud-cover">
      <img className="huawei-cloud-cover__image" src={src} alt={alt} />
    </div>
  );
}

function AppIconGuideCover() {
  return (
    <div className="app-icon-cover" aria-hidden="true">
      <div className="app-icon-cover__brand">
        <img src="/assets/app-icon-guide/ff-logo.svg" alt="" />
      </div>
      <AnimatedIconGrid className="app-icon-cover__panel" />
    </div>
  );
}

function AnimatedIconGrid({ className = '' }) {
  return (
    <div className={`animated-icon-grid ${className}`}>
      <IconGridLayer icons={APP_ICON_GUIDE_SET_A} />
      <IconGridLayer icons={APP_ICON_GUIDE_SET_B} isAlternate />
    </div>
  );
}

function IconGridLayer({ icons, isAlternate = false }) {
  return (
    <div className={`animated-icon-grid__layer ${isAlternate ? 'animated-icon-grid__layer--alternate' : ''}`}>
      {icons.map((icon, index) => (
        <span className="animated-icon-grid__cell" key={icon} style={{ '--icon-index': index }}>
          <img src={icon} alt="" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default App;
