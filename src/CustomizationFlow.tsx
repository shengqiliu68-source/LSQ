import { useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  craft: string;
  image?: string;
  video?: string;
};

type Selection = { packaging?: Item; products: Item[]; card?: Item };

const emptySelection: Selection = { products: [] };

const packaging: Item[] = [
  {
    id: "pkg-01",
    name: "基础天地盖纸盒",
    category: "50元以下",
    price: 38,
    description: "适合常规礼品组合与批量活动物料。",
    craft: "四色印刷、覆哑膜、成型内托",
    image: "/case-business-gift-box.webp",
  },
  {
    id: "pkg-02",
    name: "轻量抽屉礼盒",
    category: "50元以下",
    price: 48,
    description: "抽拉式开箱结构，简洁轻便。",
    craft: "专色印刷、抽拉丝带、纸质内托",
  },
  {
    id: "pkg-03",
    name: "磁吸精品礼盒",
    category: "51-100元",
    price: 78,
    description: "适合商务赠礼与品牌活动。",
    craft: "磁吸翻盖、烫金 LOGO、EVA 内托",
  },
  {
    id: "pkg-04",
    name: "双层组合礼盒",
    category: "51-100元",
    price: 96,
    description: "可容纳多件产品并形成分层展示。",
    craft: "双层结构、UV 印刷、植绒内托",
  },
  {
    id: "pkg-05",
    name: "高端木质礼盒",
    category: "100元以上",
    price: 168,
    description: "高质感收藏级包装，可反复使用。",
    craft: "木质结构、金属铭牌、激光雕刻",
  },
  {
    id: "pkg-06",
    name: "定制异形礼盒",
    category: "100元以上",
    price: 228,
    description: "根据项目主题定制专属结构。",
    craft: "异形开模、复合材质、灯光或机关结构",
  },
];

const products: Item[] = [
  {
    id: "pro-01",
    name: "商务签字笔套装",
    category: "商务办公类",
    price: 58,
    description: "适合会议、签约与客户答谢。",
    craft: "激光雕刻、丝印、专属笔盒",
  },
  {
    id: "pro-02",
    name: "商务笔记本",
    category: "商务办公类",
    price: 45,
    description: "多种封面材质与内页版式可选。",
    craft: "压印、烫金、彩色插页",
  },
  {
    id: "pro-03",
    name: "便携咖啡机",
    category: "家电类",
    price: 299,
    description: "适合高端员工礼与客户赠礼。",
    craft: "机身丝印、包装定制",
  },
  {
    id: "pro-04",
    name: "桌面香薰机",
    category: "家电类",
    price: 128,
    description: "办公桌与居家场景均可使用。",
    craft: "UV 印刷、激光雕刻",
  },
  {
    id: "pro-05",
    name: "户外保温杯",
    category: "户外休闲类",
    price: 89,
    description: "大容量、防漏，适合户外活动。",
    craft: "激光雕刻、丝网印刷",
  },
  {
    id: "pro-06",
    name: "便携野餐垫",
    category: "户外休闲类",
    price: 75,
    description: "可折叠收纳，适合活动套装。",
    craft: "织唛、刺绣、热转印",
  },
  {
    id: "pro-07",
    name: "居家护理套装",
    category: "居家护理类",
    price: 118,
    description: "日常护理用品组合，可按需求调整。",
    craft: "瓶身贴标、外盒印刷",
  },
  {
    id: "pro-08",
    name: "护颈热敷仪",
    category: "居家护理类",
    price: 189,
    description: "轻便舒适的居家健康礼品。",
    craft: "机身印刷、定制说明书",
  },
];

const cards: Item[] = [
  {
    id: "card-01",
    name: "简约品牌卡",
    category: "品牌宣传",
    price: 3,
    description: "用于品牌介绍、欢迎语和联系方式。",
    craft: "350g 特种纸、双面印刷、圆角",
  },
  {
    id: "card-02",
    name: "烫金感谢卡",
    category: "品牌宣传",
    price: 6,
    description: "适合高端礼盒内的感谢与祝福文案。",
    craft: "棉感纸、烫金、压凹",
  },
  {
    id: "card-03",
    name: "折页项目介绍卡",
    category: "项目宣传",
    price: 8,
    description: "提供更完整的公司或项目内容展示。",
    craft: "三折页、覆膜、局部 UV",
  },
  {
    id: "card-04",
    name: "多语言说明卡",
    category: "项目宣传",
    price: 5,
    description: "适配不同国家收件人与产品说明。",
    craft: "双语排版、二维码、环保纸张",
  },
];

const steps = [
  ["/custom/packaging", "01", "外包装"],
  ["/custom/products", "02", "产品"],
  ["/custom/cards", "03", "卡片"],
  ["/custom/summary", "04", "结算"],
];

function loadSelection() {
  try {
    return JSON.parse(localStorage.getItem("custom-selection") || "") as Selection;
  } catch {
    return emptySelection;
  }
}

function ProductCard({
  item,
  selected,
  onSelect,
  onDetail,
}: {
  item: Item;
  selected: boolean;
  onSelect: () => void;
  onDetail: () => void;
}) {
  return (
    <article className={`shopCard${selected ? " isSelected" : ""}`}>
      <button
        className="shopImage"
        type="button"
        onClick={onDetail}
        aria-label={`查看${item.name}详情`}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <span>
            <b>图片位置</b>
            <small>后续上传产品主图</small>
          </span>
        )}
        <i>查看详情</i>
      </button>
      <div className="shopCardBody">
        <span>{item.category}</span>
        <h3>{item.name}</h3>
        <p>
          预估单价 <strong>¥{item.price}</strong>
        </p>
        <button type="button" onClick={onSelect}>
          {selected ? "✓ 已选择" : "选择此项"}
        </button>
      </div>
    </article>
  );
}

function DetailModal({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <div
      className="detailModal"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name}详情`}
      onClick={onClose}
    >
      <div className="detailPanel" onClick={(e) => e.stopPropagation()}>
        <button className="detailClose" type="button" onClick={onClose}>
          关闭 ×
        </button>
        <div className="detailMedia">
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <span>
              详情图片位置
              <br />
              <small>可上传多张工艺详情图</small>
            </span>
          )}
          <div className="videoSlot">
            {item.video ? (
              <video src={item.video} controls />
            ) : (
              <span>
                视频位置
                <br />
                <small>后续上传工艺或产品视频</small>
              </span>
            )}
          </div>
        </div>
        <div className="detailCopy">
          <p>{item.category}</p>
          <h2>{item.name}</h2>
          <strong>预估单价 ¥{item.price}</strong>
          <h3>产品介绍</h3>
          <p>{item.description}</p>
          <h3>工艺介绍</h3>
          <p>{item.craft}</p>
        </div>
      </div>
    </div>
  );
}

export default function CustomizationFlow() {
  const path = window.location.pathname;
  const [selection, setSelection] = useState<Selection>(loadSelection);
  const [detail, setDetail] = useState<Item>();
  const [filter, setFilter] = useState("全部");
  useEffect(() => {
    localStorage.setItem("custom-selection", JSON.stringify(selection));
  }, [selection]);

  const page = path.endsWith("/products")
    ? "products"
    : path.endsWith("/cards")
      ? "cards"
      : path.endsWith("/summary")
        ? "summary"
        : "packaging";
  const config =
    page === "packaging"
      ? {
          eyebrow: "STEP 01 / PACKAGING",
          title: "选择外包装",
          desc: "先按预算区间筛选包装。点击图片可查看详情图、工艺介绍和视频位置。",
          items: packaging,
          filters: ["全部", "50元以下", "51-100元", "100元以上"],
        }
      : page === "products"
        ? {
            eyebrow: "STEP 02 / PRODUCTS",
            title: "选择产品",
            desc: "像逛电商一样选择礼盒内的产品，可以添加多个不同产品。",
            items: products,
            filters: ["全部", "商务办公类", "家电类", "户外休闲类", "居家护理类"],
          }
        : {
            eyebrow: "STEP 03 / CARDS",
            title: "选择宣传卡片",
            desc: "选择放入包装内的公司、品牌或项目宣传卡片。",
            items: cards,
            filters: ["全部", "品牌宣传", "项目宣传"],
          };
  const visibleItems = useMemo(
    () => config.items.filter((item) => filter === "全部" || item.category === filter),
    [config.items, filter]
  );
  const total =
    (selection.packaging?.price || 0) +
    selection.products.reduce((sum, item) => sum + item.price, 0) +
    (selection.card?.price || 0);
  const choose = (item: Item) =>
    setSelection((current) =>
      page === "packaging"
        ? { ...current, packaging: item }
        : page === "cards"
          ? { ...current, card: item }
          : {
              ...current,
              products: current.products.some((product) => product.id === item.id)
                ? current.products.filter((product) => product.id !== item.id)
                : [...current.products, item],
            }
    );

  return (
    <main className="customFlow">
      <header className="flowHeader contentShell">
        <a className="brand" href="/">
          <img src="/dabiaoge-logo-transparent.webp" alt="" />
          <span>
            大表哥<small>产品组合定制</small>
          </span>
        </a>
        <nav>
          {steps.map(([href, no, name]) => (
            <a
              className={
                path === href || (page === "packaging" && href.endsWith("packaging"))
                  ? "isActive"
                  : ""
              }
              href={href}
              key={href}
            >
              <span>{no}</span>
              {name}
            </a>
          ))}
        </nav>
      </header>
      {page !== "summary" ? (
        <>
          <section className="flowIntro contentShell">
            <p className="eyebrow">{config.eyebrow}</p>
            <h1>{page === "packaging" ? "定制你的外包装！" : config.title}</h1>
            <p>
              {page === "packaging" ? (
                <>
                  好的包装可以很好的提升<span className="goldText">入金率</span>！
                </>
              ) : (
                config.desc
              )}
            </p>
          </section>
          <section className="catalogSection contentShell">
            <div className="catalogFilters">
              {config.filters.map((name) => (
                <button
                  className={filter === name ? "isActive" : ""}
                  type="button"
                  onClick={() => setFilter(name)}
                  key={name}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="shopGrid">
              {visibleItems.map((item) => (
                <ProductCard
                  item={item}
                  key={item.id}
                  selected={
                    page === "products"
                      ? selection.products.some((product) => product.id === item.id)
                      : page === "packaging"
                        ? selection.packaging?.id === item.id
                        : selection.card?.id === item.id
                  }
                  onSelect={() => choose(item)}
                  onDetail={() => setDetail(item)}
                />
              ))}
            </div>
          </section>
          <div className="selectionBar">
            <a
              className="previousStep"
              href={
                page === "packaging"
                  ? "/"
                  : page === "products"
                    ? "/custom/packaging"
                    : "/custom/products"
              }
            >
              ← {page === "packaging" ? "返回首页" : "上一步"}
            </a>
            <div>
              <span>当前组合预估</span>
              <strong>¥{total}</strong>
            </div>
            <a
              href={
                page === "packaging"
                  ? "/custom/products"
                  : page === "products"
                    ? "/custom/cards"
                    : "/custom/summary"
              }
            >
              下一步 →
            </a>
          </div>
        </>
      ) : (
        <Summary selection={selection} total={total} />
      )}
      {detail && <DetailModal item={detail} onClose={() => setDetail(undefined)} />}
    </main>
  );
}

function Summary({ selection, total }: { selection: Selection; total: number }) {
  const rows = [selection.packaging, ...selection.products, selection.card].filter(
    Boolean
  ) as Item[];
  const productionDate = new Date();
  productionDate.setDate(productionDate.getDate() + 25);
  return (
    <section className="summaryPage contentShell">
      <div className="flowIntro">
        <p className="eyebrow">STEP 04 / SUMMARY</p>
        <h1>确认你的组合</h1>
        <p>这里汇总前三步选择的内容、预估价格和预计出厂日期。</p>
      </div>
      <div className="summaryLayout">
        <div className="summaryItems">
          {rows.length ? (
            rows.map((item) => (
              <article key={item.id}>
                <div>{item.image ? <img src={item.image} alt="" /> : <span>图片</span>}</div>
                <p>
                  <small>{item.category}</small>
                  <strong>{item.name}</strong>
                </p>
                <b>¥{item.price}</b>
              </article>
            ))
          ) : (
            <div className="emptyCart">
              <h2>还没有选择产品</h2>
              <p>请从外包装开始完成你的定制组合。</p>
              <a href="/custom/packaging">开始选择</a>
            </div>
          )}
        </div>
        <aside className="orderSummary">
          <p>组合预估</p>
          <div>
            <span>已选项目</span>
            <strong>{rows.length} 项</strong>
          </div>
          <div>
            <span>预估总价 / 套</span>
            <strong>¥{total}</strong>
          </div>
          <div>
            <span>预计出厂日期</span>
            <strong>{productionDate.toLocaleDateString("zh-CN")}</strong>
          </div>
          <small>最终价格与交期将在数量、工艺和收货地区确认后由方案顾问报价。</small>
          <a className="summaryPrevious" href="/custom/cards">
            ← 上一步，修改卡片
          </a>
          <button type="button">提交组合给方案顾问</button>
        </aside>
      </div>
    </section>
  );
}
