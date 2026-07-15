import { useState } from "react";

const categories = [
  ["01", "礼盒套装", "围绕活动主题搭配产品、内托与外包装"],
  ["02", "杯具定制", "保温杯、咖啡杯与随行杯，多种材质工艺"],
  ["03", "办公周边", "笔记本、签字笔、工牌及桌面用品组合"],
  ["04", "纪念收藏", "纪念币、徽章、奖牌与限量收藏套装"],
  ["05", "数码配件", "充电、收纳、出行与智能设备周边"],
  ["06", "来图定制", "已有想法或参考图，由我们完成落地评估"],
];

const process = ["提交需求", "方案与报价", "设计打样", "批量生产", "质检包装", "全球交付"];

export default function ProductCustomPage() {
  const [selected, setSelected] = useState("礼盒套装");

  return (
    <main className="productPage">
      <header className="innerNav contentShell">
        <a className="brand" href="/" aria-label="返回大表哥首页">
          <img src="/dabiaoge-logo-transparent.webp" width="64" height="64" alt="" />
          <span>
            大表哥<small>后勤多盘定制</small>
          </span>
        </a>
        <nav className="innerNavLinks" aria-label="内页导航">
          <a href="#category">[ 选择品类 ]</a>
          <a href="#craft">[ 定制工艺 ]</a>
          <a href="#process">[ 服务流程 ]</a>
        </nav>
        <a className="navButton" href="#brief">
          提交定制需求
        </a>
      </header>

      <section className="productHero contentShell">
        <div className="productHeroCopy">
          <p className="eyebrow">CUSTOM YOUR PRODUCT / 01</p>
          <h1>
            把一个想法，
            <br />
            <span>做成真正的产品。</span>
          </h1>
          <p>
            从单品选型、视觉设计、包装打样到全球交付，一位方案顾问跟进全部环节。你只需要告诉我们使用场景、数量和预算。
          </p>
          <div className="productHeroActions">
            <a className="primaryButton" href="#brief">
              开始定制
            </a>
            <a className="secondaryButton" href="#category">
              查看可定制品类
            </a>
          </div>
        </div>
        <div className="productHeroVisual">
          <span className="visualIndex">DABIAOGE® / CUSTOM</span>
          <img src="/case-business-gift-box.webp" alt="商务礼盒定制案例" />
          <div className="visualBadge">
            <strong>1 对 1</strong>
            <span>专属方案顾问</span>
          </div>
        </div>
      </section>

      <section className="productSection" id="category">
        <div className="contentShell">
          <div className="innerSectionHeader">
            <div>
              <p className="eyebrow">PRODUCT CATEGORY</p>
              <h2>先选择你想定制的产品</h2>
            </div>
            <p>没有明确方向也没关系，我们会根据活动场景、受众和单套预算提供组合建议。</p>
          </div>
          <div className="categoryGrid">
            {categories.map(([index, title, text]) => (
              <button
                className={selected === title ? "categoryCard isSelected" : "categoryCard"}
                key={title}
                onClick={() => setSelected(title)}
                type="button"
              >
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="craftSection productSection" id="craft">
        <div className="contentShell craftLayout">
          <div className="craftImage">
            <img src="/case-gold-commemorative-coin.webp" alt="纪念币定制工艺展示" />
          </div>
          <div className="craftCopy">
            <p className="eyebrow">CRAFT & PACKAGING</p>
            <h2>每一个细节，都可以成为品牌识别。</h2>
            <p>根据材质与呈现效果选择合适工艺，在质感、耐用度、预算和交期之间取得平衡。</p>
            <div className="craftTags">
              {[
                "丝网印刷",
                "激光雕刻",
                "烫金 / 烫银",
                "UV 彩印",
                "压凹 / 压凸",
                "刺绣",
                "专属内托",
                "多语言卡片",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="productSection" id="process">
        <div className="contentShell">
          <div className="innerSectionHeader">
            <div>
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>从需求到交付，六步完成</h2>
            </div>
            <p>关键节点确认后再进入下一阶段，进度清晰、成本透明、结果可控。</p>
          </div>
          <ol className="processGrid">
            {process.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="briefSection" id="brief">
        <div className="contentShell briefLayout">
          <div>
            <p className="eyebrow">START YOUR PROJECT</p>
            <h2>告诉我们，你想做什么。</h2>
            <p>提交基础信息后，方案顾问会与你确认产品组合、工艺、预算与交期。</p>
          </div>
          <form className="briefForm" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>定制品类</span>
              <input value={selected} onChange={(event) => setSelected(event.target.value)} />
            </label>
            <label>
              <span>预计数量</span>
              <input type="number" min="1" placeholder="例如：500" />
            </label>
            <label>
              <span>目标国家 / 地区</span>
              <input placeholder="例如：新加坡" />
            </label>
            <label>
              <span>单套预算</span>
              <input placeholder="例如：¥200 - ¥300" />
            </label>
            <label className="isWide">
              <span>需求说明</span>
              <textarea rows={4} placeholder="使用场景、期望交期、参考产品或其他要求" />
            </label>
            <button className="primaryButton isWide" type="submit">
              提交需求，获取初步方案 →
            </button>
          </form>
        </div>
      </section>

      <footer className="innerFooter contentShell">
        <a className="brand" href="/">
          <img src="/dabiaoge-logo-transparent.webp" alt="" />
          <span>
            大表哥<small>后勤多盘定制</small>
          </span>
        </a>
        <p>产品定制 · 仓储协同 · 全球交付</p>
        <a href="/">返回首页 ↑</a>
      </footer>
    </main>
  );
}
