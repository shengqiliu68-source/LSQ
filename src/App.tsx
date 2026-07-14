const customizationItems = [
  {
    label: "外包装",
    title: "外包装系统",
    description: "磁吸礼盒、抽屉盒、环保纸盒、运输外箱一体设计，兼顾开箱质感和跨境保护。",
  },
  {
    label: "内置产品",
    title: "内置产品组合",
    description: "保温杯、咖啡杯、笔记本、签字笔、工牌、数码配件等按预算和场景灵活搭配。",
  },
  {
    label: "介绍卡片",
    title: "产品介绍卡片",
    description: "为每套礼盒配置品牌卡、说明卡、感谢卡或多语言介绍卡，让交付更完整。",
  },
  {
    label: "标识工艺",
    title: "LOGO 定制工艺",
    description: "支持丝印、激光、烫金、压印、UV、刺绣和包装贴标，保证品牌呈现稳定一致。",
  },
];

const cases = [
  {
    title: "年度客户答谢礼盒",
    tag: "礼盒定制",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "企业咖啡杯伴手礼",
    tag: "杯具伴手礼",
    image:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "海外会议随行套装",
    tag: "会议套装",
    image:
      "https://images.unsplash.com/photo-1517502166878-35c93a0072f0?auto=format&fit=crop&w=1200&q=80",
  },
];

const strengths = [
  "从产品选型、打样、包装到交付，单一窗口推进",
  "适配不同国家、文化和活动场景的礼品组合方案",
  "支持小批量验证与批量生产，降低项目试错成本",
  "采购、生产、质检、包装全链路保密管理",
];

const logistics = [
  {
    title: "全球仓储协同",
    text: "根据收件国家和交付节奏安排前置仓、集货仓或分批出库，减少跨境等待。",
  },
  {
    title: "精准快递派送",
    text: "支持企业名单级别的多地址派送，适合员工礼包、客户答谢和国际会议物料。",
  },
  {
    title: "安全可追踪",
    text: "关键节点留痕，运输状态可追踪，包装与收件信息按项目要求保密处理。",
  },
  {
    title: "复杂目的地覆盖",
    text: "不局限单一市场，可为不同国家提供匹配当地时效、清关和末端派送的方案。",
  },
];

function App() {
  return (
    <main>
      <section className="hero" id="top">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/3184291/3184291-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="heroShade" />

        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#top" aria-label="大表哥后勤多盘定制首页">
            <img src="/dabiaoge-logo-transparent.png" alt="" aria-hidden="true" />
            <span>
              大表哥
              <small>后勤多盘定制</small>
            </span>
          </a>
          <div className="navLinks">
            <a href="#custom">[ 盘子周边定制 ]</a>
            <a href="#cases">[ 定制案例 ]</a>
            <a href="#logistics">[ 仓储物流 ]</a>
            <a href="#contact">[ 全平台代购 ]</a>
          </div>
          <div className="navRight">
            <a className="navButton" href="#contact">
              联系方案顾问
            </a>
            <span className="menuMark" aria-hidden="true" />
          </div>
        </nav>

        <div className="heroFrame contentShell">
          <div className="heroPoster">
            <div className="heroCopy">
              <div className="heroWordmark" aria-label="搞金融就认准大表哥，万千同行的选择">
                <span>
                  <span className="heroLeadText">搞金融就认准</span>
                  <span className="highlight" data-text="大表哥">
                    大表哥
                  </span>
                </span>
                <span>万千同行的选择</span>
              </div>

              <div className="heroMicrocopy">
                <strong>多盘后勤定制</strong>
                <span>盘子周边定制 ｜ 工艺匠心品质 ｜ 全球仓储物流 ｜ 后勤一步到位</span>
              </div>
            </div>

            <img
              className="heroLogoImage"
              src="/dabiaoge-mark-transparent.png"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="heroMetric">
            <span className="slashes" aria-hidden="true" />
            <strong>87+</strong>
            <p>覆盖国家与地区，按项目匹配仓储、清关和末端派送方案</p>
          </div>

          <div className="heroActions" aria-label="首屏快捷入口">
            <a className="heroProjectButton isPrimary" href="#contact">
              定制你的产品
            </a>
            <a className="heroProjectButton" href="#cases">
              过往优秀定制案例
            </a>
            <a className="heroProjectButton" href="#contact">
              查询你的订单状态
            </a>
            <a className="heroProjectButton" href="#contact">
              我需要代购/代拍
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="custom">
        <div className="contentShell sectionHeader">
          <p className="eyebrow">周边定制</p>
          <h2>周边定制模块化组合</h2>
          <p>
            从外部第一眼到内部每件产品，都围绕品牌、预算、场景和交付国家做整体设计。
          </p>
        </div>
        <div className="contentShell customGrid">
          {customizationItems.map((item) => (
            <article className="featureCard" key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section casesSection" id="cases">
        <div className="contentShell sectionHeader">
          <p className="eyebrow">精选案例</p>
          <h2>定制案例展示</h2>
          <p>用大画面呈现项目气质，后续可替换为你的真实工厂、产品和交付案例图片。</p>
        </div>
        <div className="contentShell caseGrid">
          {cases.map((item) => (
            <article className="caseCard" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="contentShell splitLayout">
          <div className="sectionHeader compact">
            <p className="eyebrow">为什么选择大表哥</p>
            <h2>业务优势</h2>
            <p>
              面向非标准化企业礼品项目，我们更关注稳定执行、细节保密和最终交付体验。
            </p>
          </div>
          <div className="strengthGrid">
            {strengths.map((item, index) => (
              <article className="numberCard" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section logisticsSection" id="logistics">
        <div className="contentShell sectionHeader">
          <p className="eyebrow">全球交付</p>
          <h2>全球物流与仓储优势</h2>
          <p>
            不管收件人在哪个国家，都以项目为单位规划仓储、清关、末端派送与状态反馈。
          </p>
        </div>
        <div className="contentShell logisticsGrid">
          {logistics.map((item) => (
            <article className="logisticsCard" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contentShell contactInner">
          <p className="eyebrow">开始项目</p>
          <h2>把你的企业礼盒需求、目标国家和预算发给我们。</h2>
          <p>
            我们可以先给出产品组合建议、包装方向、LOGO 工艺和全球配送路径，再进入打样与报价。
          </p>
          <div className="contactPanel">
            <a href="mailto:hello@example.com">hello@example.com</a>
            <span>WhatsApp / WeChat: +86 000 0000 0000</span>
            <span>多盘后勤定制、仓储与全球快递交付</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
