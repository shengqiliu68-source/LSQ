import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./components/BorderGlow";
import casesJson from "./caseData.json";

type CaseItem = {
  index: string;
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  summary: string;
  description: string;
  contents: string[];
  materials: string[] | string;
  design: string;
  customization: string;
  cover: string;
  gallery: string[];
  detail: string;
};

const cases = casesJson as CaseItem[];
const glow = {
  edgeSensitivity: 24,
  glowColor: "12 100 62",
  backgroundColor: "rgba(7, 8, 11, .72)",
  borderRadius: 3,
  glowRadius: 32,
  glowIntensity: 0.85,
  coneSpread: 26,
  fillOpacity: 0.28,
  colors: ["#ff2c1f", "#ff641c", "#ffad32"],
};

function splitMaterials(value: string[] | string) {
  return Array.isArray(value) ? value : value.split(/[、，。]/).filter(Boolean);
}

function CasesHeader() {
  return (
    <header className="casesNav contentShell">
      <a className="brand" href="/" aria-label="返回大表哥首页">
        <img src="/dabiaoge-logo-transparent.webp" width="64" height="64" alt="" />
        <span>
          大表哥<small>产品组合定制</small>
        </span>
      </a>
      <nav aria-label="案例导航">
        <a href="/cases">案例总览</a>
        <a className="casesNavCta" href="/custom/packaging">
          开始定制 →
        </a>
      </nav>
    </header>
  );
}

function CaseOverview() {
  const [filter, setFilter] = useState("全部案例");
  const categories = useMemo(
    () => ["全部案例", ...new Set(cases.map((item) => item.category))],
    []
  );
  const visible = filter === "全部案例" ? cases : cases.filter((item) => item.category === filter);

  return (
    <>
      <section className="casesHero contentShell casesReveal">
        <p className="eyebrow">SELECTED PROJECTS / 精选案例</p>
        <h1>
          以真实交付，<span>证明定制能力。</span>
        </h1>
        <div className="casesHeroFoot">
          <p>
            从商务礼赠、户外套装到纪念收藏，每一个案例都记录了从创意、选品、包装到最终交付的完整思考。
          </p>
          <strong>
            {String(cases.length).padStart(2, "0")}
            <small>个真实项目</small>
          </strong>
        </div>
      </section>

      <section className="casesListing contentShell">
        <div className="caseFilters casesReveal" aria-label="按案例类别筛选">
          {categories.map((category) => (
            <button
              className={filter === category ? "isActive" : ""}
              onClick={() => setFilter(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="casesGrid">
          {visible.map((item) => (
            <BorderGlow {...glow} className="projectCard casesReveal" key={item.slug}>
              <a href={`/cases/${item.slug}`}>
                <figure>
                  <img src={item.cover} alt={item.name} loading="lazy" />
                </figure>
                <div className="projectCardCopy">
                  <span>
                    {item.index} / {item.category}
                  </span>
                  <h2>{item.name}</h2>
                  <p>{item.summary}</p>
                  <div>
                    <small>{item.nameEn}</small>
                    <b>查看完整案例 ↗</b>
                  </div>
                </div>
              </a>
            </BorderGlow>
          ))}
        </div>
      </section>
    </>
  );
}

function CaseDetail({ item }: { item: CaseItem }) {
  const current = cases.findIndex((entry) => entry.slug === item.slug);
  const previous = cases[(current - 1 + cases.length) % cases.length];
  const next = cases[(current + 1) % cases.length];
  const materials = splitMaterials(item.materials);

  return (
    <article className="caseDetail">
      <section className="caseDetailHero casesReveal">
        <img src={item.cover} alt={item.name} />
        <div className="caseDetailShade" />
        <div className="contentShell caseDetailTitle">
          <a href="/cases">← 返回案例总览</a>
          <p>
            {item.index} / {item.category}
          </p>
          <h1>{item.name}</h1>
          <span>{item.nameEn}</span>
        </div>
      </section>

      <section className="caseStory contentShell casesReveal">
        <div>
          <p className="eyebrow">PROJECT STORY / 项目概览</p>
          <h2>让每一件礼赠，准确表达品牌心意。</h2>
        </div>
        <p>{item.description}</p>
      </section>

      <section className="caseSpecs contentShell">
        <BorderGlow {...glow} className="caseSpecCard casesReveal">
          <div>
            <span>01</span>
            <h3>礼盒内容</h3>
            <ul>
              {item.contents.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </BorderGlow>
        <BorderGlow {...glow} className="caseSpecCard casesReveal">
          <div>
            <span>02</span>
            <h3>材质与工艺</h3>
            <ul>
              {materials.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </BorderGlow>
        <BorderGlow {...glow} className="caseSpecCard casesReveal">
          <div>
            <span>03</span>
            <h3>设计策略</h3>
            <p>{item.design}</p>
            <h4>可定制说明</h4>
            <p>{item.customization}</p>
          </div>
        </BorderGlow>
      </section>

      <section className="caseGallery contentShell">
        <div className="caseSectionTitle casesReveal">
          <p className="eyebrow">VISUAL ARCHIVE / 项目图集</p>
          <h2>从整体呈现，到每一处工艺细节。</h2>
        </div>
        <div className="caseGalleryGrid">
          {item.gallery.map((image, index) => (
            <figure className="casesReveal" key={image}>
              <img src={image} alt={`${item.name} 案例图 ${index + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="caseFilm contentShell casesReveal">
        <video autoPlay muted loop playsInline preload="metadata" poster={item.cover}>
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="caseFilmShade" />
        <div>
          <span>PROJECT FILM</span>
          <h2>让案例，在镜头里完整发生。</h2>
          <p>这里已预留项目视频展示区域，后续可随时替换为开箱、工艺细节或成品交付视频。</p>
          <i>▶</i>
        </div>
      </section>

      <section className="caseLongDetail contentShell casesReveal">
        <div className="caseSectionTitle">
          <p className="eyebrow">FULL DETAILS / 完整详情</p>
          <h2>项目详情长图</h2>
        </div>
        <img src={item.detail} alt={`${item.name}完整详情`} loading="lazy" />
      </section>

      <nav className="casePager contentShell" aria-label="浏览其他案例">
        <a href={`/cases/${previous.slug}`}>
          <span>← 上一个案例</span>
          <strong>{previous.name}</strong>
        </a>
        <a href={`/cases/${next.slug}`}>
          <span>下一个案例 →</span>
          <strong>{next.name}</strong>
        </a>
      </nav>
    </article>
  );
}

export default function CasesPage() {
  const pageRef = useRef<HTMLElement>(null);
  const slug = decodeURIComponent(window.location.pathname.replace(/^\/cases\/?/, ""));
  const selected = cases.find((item) => item.slug === slug);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".casesReveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          }
        );
      });
    }, pageRef);
    return () => context.revert();
  }, [slug]);

  return (
    <main className="casesPage" ref={pageRef}>
      <CasesHeader />
      {selected ? <CaseDetail item={selected} /> : <CaseOverview />}
      <footer className="casesFooter contentShell">
        <span>大表哥 · 后勤多盘定制</span>
        <a href="/custom/packaging">开始你的定制项目 →</a>
      </footer>
    </main>
  );
}
