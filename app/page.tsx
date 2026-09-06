import type { Metadata } from "next";
import StrokeText from "./StrokeText";

export const metadata: Metadata = {
  title: "KAIROS — 陈扬波 AI 创意设计师",
  description: "陈扬波（KAIROS）的 AI 写真、商业视觉、PPT 网页与空间设计作品集。",
};

const abilities = [
  { no: "01", icon: "◇", title: "AI写真与视觉创作", lines: ["AI人物写真 / 场景生成", "IP视觉 / 艺术创作"], visual: "portrait", href: "#works" },
  { no: "02", icon: "♙", title: "商业视觉设计", lines: ["海报设计 / 电商视觉", "品牌设计 / 营销内容"], visual: "commercial", href: "#commercial-cases" },
  { no: "03", icon: "▣", title: "PPT与网页设计", lines: ["演示设计 / 信息可视化", "网页设计 / 数字作品"], visual: "digital", href: "#ppt-web-cases" },
  { no: "04", icon: "◇", title: "空间设计", lines: ["室内设计 / 效果图表现", "展示空间 / 方案设计"], visual: "space", href: "#spatial-cases" },
];

const journey = [
  { icon: "⌂", period: "2016 - 2020", title: "室内设计学习", lines: ["系统学习室内设计专业知识", "建立空间与美学基础"] },
  { icon: "⌘", period: "2020 - 2022", title: "空间设计实践", lines: ["参与多项室内设计项目", "提升方案与落地能力"] },
  { icon: "▤", period: "2022 - 2023", title: "商业设计探索", lines: ["接触品牌与电商视觉设计", "积累多领域设计经验"] },
  { icon: "AI", period: "2023 - 2024", title: "AI视觉创作探索", lines: ["深入研究AI工具应用", "创作大量视觉作品"] },
  { icon: "☼", period: "2024 - 至今", title: "AI创意设计师", lines: ["将AI与设计深度融合", "探索工作流与教育方向"] },
];

const casePages = [
  { id: "works", title: "AI写真与视觉创作", image: "/cases/ai-portrait-169.png", variant: "ai" },
  { id: "commercial-cases", title: "商业视觉设计", image: "/cases/commercial-visual-169.png", variant: "commercial" },
  { id: "ppt-web-cases", title: "PPT与网页设计", image: "/cases/ppt-web-design-169.png", variant: "ppt-web" },
  { id: "spatial-cases", title: "空间设计与场景营造", image: "/cases/spatial-design-169.png", variant: "spatial" },
];

export default function Home() {
  return (
    <main className="portfolio-v2" id="home">
      <header className="v2-header">
        <a className="v2-logo" href="#home" aria-label="KAIROS 首页">KAIROS</a>
        <nav className="v2-nav" aria-label="主要导航">
          <a className="is-active" href="#home">首页</a>
          <a href="#works">作品案例</a>
          <a href="#about">关于我</a>
          <a href="#contact">联系我</a>
        </nav>
        <a className="v2-download v2-download--small" href="/chen-yangbo-aigc-designer.pdf" download="陈扬波AIGC设计师.pdf">
          下载简历 <span className="download-icon" aria-hidden="true">↓</span>
        </a>
      </header>

      <section className="v2-hero" id="about">
        <div className="v2-hero__copy">
          <p className="v2-eyebrow">AI CREATIVE DESIGNER</p>
          <h1>
            <StrokeText
              text="KAIROS"
              strokeColor="#c7a36b"
              gradientStops={["#b5905f", "#836543", "#4c4035", "#9d7b51", "#5d4835"]}
              strokeWidth={1.15}
              drawDuration={1.35}
              fillDelay={0.05}
              stagger={0.07}
              fontSize={138}
              fontWeight={400}
              letterSpacing={19.3}
              className="v2-title-effect"
            />
          </h1>
          <div className="v2-name">
            <span className="v2-signature"><img src="/chen-yangbo-signature-transparent.png" alt="陈扬波手写签名" /></span>
            <span>YANGBO CHEN</span>
          </div>
          <span className="v2-rule" aria-hidden="true" />
          <h2>从空间设计到 AI 创作<br />探索人工智能时代的商业视觉设计</h2>
          <p className="v2-scope">AI写真&nbsp;&nbsp;×&nbsp;&nbsp;商业视觉&nbsp;&nbsp;×&nbsp;&nbsp;PPT网页&nbsp;&nbsp;×&nbsp;&nbsp;空间设计</p>
          <div className="v2-actions">
            <a className="v2-primary" href="#works">查看作品</a>
            <a className="v2-secondary" href="/chen-yangbo-aigc-designer.pdf" download="陈扬波AIGC设计师.pdf">下载简历 <span className="button-icon button-icon--download" aria-hidden="true">↓</span></a>
          </div>
          <div className="v2-tools" aria-label="常用 AI 与设计工具">
            <span className="tool-icon tool-icon--openai" title="ChatGPT"><img src="/tool-icons/openai.svg" alt="ChatGPT" /></span>
            <span className="tool-icon tool-icon--hermes" title="Hermès"><img src="/tool-icons/hermes.svg" alt="Hermès" /></span>
            <span className="tool-icon tool-icon--photoshop" title="Adobe Photoshop"><img src="/tool-icons/adobephotoshop.svg" alt="Adobe Photoshop" /></span>
            <span className="tool-icon tool-icon--midjourney" title="Midjourney"><img src="/tool-icons/midjourney.svg" alt="Midjourney" /></span>
            <span className="tool-icon tool-icon--illustrator" title="Adobe Illustrator"><img src="/tool-icons/adobeillustrator.svg" alt="Adobe Illustrator" /></span>
          </div>
          <a className="v2-scroll" href="#skills">SCROLL <span /></a>
        </div>
      </section>

      <div className="v2-content-landscape">
      <section className="v2-skills glass-section" id="skills">
        <div className="v2-section-title"><span>⟶</span><div><h2>我的设计能力</h2><p>WHAT I DO</p></div><span>⟵</span></div>
        <div className="v2-ability-grid">
          {abilities.map((item) => (
            <a className="v2-ability-card" href={item.href} aria-label={`查看${item.title}案例`} key={item.no}>
              <div className="v2-ability-copy">
                <span className="v2-number">{item.no}</span>
                <span className="v2-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                {item.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
              <div className={`v2-ability-visual v2-ability-visual--${item.visual}`} role="img" aria-label={`${item.title}示例`} />
            </a>
          ))}
        </div>
      </section>

      <section className="v2-journey glass-section" id="journey">
        <div className="v2-section-title"><span>⟶</span><div><h2>我的设计历程</h2><p>MY JOURNEY</p></div><span>⟵</span></div>
        <div className="v2-timeline">
          {journey.map((item) => (
            <article className="v2-milestone" key={item.period}>
              <span className="v2-milestone__icon" aria-hidden="true">{item.icon}</span>
              <strong>{item.period}</strong>
              <h3>{item.title}</h3>
              {item.lines.map((line) => <p key={line}>{line}</p>)}
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <div className="v2-case-pages" aria-label="作品案例">
        {casePages.map((item) => (
          <section className={`v2-case-page v2-case-page--${item.variant}`} id={item.id} aria-labelledby={`${item.id}-title`} key={item.id}>
            <h2 className="sr-only" id={`${item.id}-title`}>{item.title}</h2>
            <div className={`v2-case-shot v2-case-shot--${item.variant}`}>
              <div className="v2-case-art">
                <img src={item.image} alt={`${item.title}案例设计稿`} loading={item.id === "works" ? "eager" : "lazy"} decoding="async" />
              </div>
            </div>
          </section>
        ))}
      </div>
      </div>

      <footer className="v2-footer" id="contact">
        <div className="v2-socials" aria-label="联系方式">
          <a href="mailto:ywhklilv02389@163.com" aria-label="电子邮箱">✉</a>
          <a href="tel:13426928529" aria-label="电话">↗</a>
          <a href="#home" aria-label="返回顶部">◎</a>
          <a href="#works" aria-label="查看作品">▧</a>
        </div>
        <p>© 2024 KAIROS. All Rights Reserved.</p>
        <blockquote>“&nbsp;&nbsp;选择有温度的工具，创造更多美好。设计是连接人与未来的桥梁。&nbsp;&nbsp;”</blockquote>
      </footer>
    </main>
  );
}
