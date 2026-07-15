import { useEffect, useMemo, useState } from "react";
import BorderGlow from "./components/BorderGlow";

type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  craft: string;
  image?: string;
  video?: string;
  source?: string;
};

type Selection = { packaging?: Item; products: Item[]; card?: Item };

const emptySelection: Selection = { products: [] };

const giftImages = {
  black: "/packaging/magnetic-03.webp",
  coin: "/packaging/wood-01.webp",
  redRibbon: "/packaging/drawer-01.webp",
  festive: "/packaging/wood-02.webp",
  darkGift: "/packaging/book-01.webp",
  wrapped: "/packaging/magnetic-02.webp",
};

const giftGalleries = {
  magnetic: [1, 2, 3, 4, 5, 6].map((index) => `/packaging/magnetic-0${index}.webp`),
  drawer: [1, 2, 3, 4, 5].map((index) => `/packaging/drawer-0${index}.webp`),
  wood: [1, 2, 3, 4, 5, 6].map((index) => `/packaging/wood-0${index}.webp`),
  book: [1, 2, 3, 4].map((index) => `/packaging/book-0${index}.webp`),
};

const sourceUrls = {
  magnetic:
    "https://www.alibaba.com/product-detail/Custom-Luxury-Magnetic-Gift-box-Thick_1601266962215.html",
  drawer:
    "https://www.alibaba.com/product-detail/Luxury-Custom-Printed-Logo-Pull-Out_1601041027937.html",
  wood: "https://www.alibaba.com/product-detail/Wood-packing-boxes-custom-logo-box_1600438652360.html",
  book: "https://www.alibaba.com/product-detail/Book-shaped-gift-packaging-box-decorative_60652890042.html",
};

const packaging: Item[] = [
  {
    id: "pkg-01",
    name: "基础厂家自带礼盒",
    category: "50元以下",
    price: 0,
    description: "厂家原配礼盒，不需要 DIY。",
    craft: "采用产品厂家原装配套包装，不增加定制包装工艺。",
    image: giftImages.black,
  },
  {
    id: "pkg-02",
    name: "轻量抽屉礼盒",
    category: "50元以下",
    price: 48,
    description: "抽拉式开箱结构，简洁轻便。",
    craft: "专色印刷、抽拉丝带、纸质内托",
    image: giftImages.redRibbon,
  },
  {
    id: "pkg-03",
    name: "环保牛皮纸礼盒",
    category: "50元以下",
    price: 32,
    description: "自然质朴，适合环保主题与大批量活动。",
    craft: "再生牛皮纸、单色丝印、瓦楞内衬",
    image: giftImages.wrapped,
  },
  {
    id: "pkg-04",
    name: "折叠便携礼盒",
    category: "50元以下",
    price: 42,
    description: "平板运输后快速组装，有效降低仓储成本。",
    craft: "折叠结构、双面胶固定、局部 UV",
    image: giftImages.festive,
  },
  {
    id: "pkg-05",
    name: "开窗展示礼盒",
    category: "50元以下",
    price: 46,
    description: "透明窗口直接展示核心产品，适合零售与活动场景。",
    craft: "PET 开窗、覆哑膜、彩色印刷",
    image: giftImages.darkGift,
  },
  {
    id: "pkg-06",
    name: "手提伴手礼盒",
    category: "50元以下",
    price: 49,
    description: "包装与手提功能一体，方便会议或活动现场派发。",
    craft: "棉绳提手、专色印刷、纸托分隔",
    image: giftImages.redRibbon,
  },
  {
    id: "pkg-07",
    name: "磁吸精品礼盒",
    category: "51-100元",
    price: 78,
    description: "适合商务赠礼与品牌活动。",
    craft: "磁吸翻盖、烫金 LOGO、EVA 内托",
    image: giftImages.black,
    video: "/hero-background.mp4",
  },
  {
    id: "pkg-08",
    name: "双层组合礼盒",
    category: "51-100元",
    price: 96,
    description: "可容纳多件产品并形成分层展示。",
    craft: "双层结构、UV 印刷、植绒内托",
    image: giftImages.festive,
    video: "/hero-background.mp4",
  },
  {
    id: "pkg-09",
    name: "书型翻盖礼盒",
    category: "51-100元",
    price: 82,
    description: "像书本一样展开，适合讲述品牌与项目故事。",
    craft: "书型结构、隐藏磁扣、内外四色印刷",
    image: giftImages.darkGift,
  },
  {
    id: "pkg-10",
    name: "肩颈式精品盒",
    category: "51-100元",
    price: 88,
    description: "内肩结构形成精致层次，开合稳定且具有仪式感。",
    craft: "三件式灰板、撞色内肩、烫金或压印",
    image: giftImages.redRibbon,
  },
  {
    id: "pkg-11",
    name: "圆筒卷边礼盒",
    category: "51-100元",
    price: 68,
    description: "圆筒造型具有强识别度，适合杯具、香氛与纪念品。",
    craft: "卷边圆筒、金属盖或纸盖、环绕印刷",
    image: giftImages.wrapped,
  },
  {
    id: "pkg-12",
    name: "皮纹商务礼盒",
    category: "51-100元",
    price: 98,
    description: "细腻皮纹触感与稳重配色，适合商务礼赠。",
    craft: "触感纸裱糊、金属铭牌、植绒内托",
    image: giftImages.black,
  },
  {
    id: "pkg-13",
    name: "高端木质礼盒",
    category: "100元以上",
    price: 168,
    description: "高质感收藏级包装，可反复使用。",
    craft: "木质结构、金属铭牌、激光雕刻",
    image: giftImages.wrapped,
    video: "/hero-background.mp4",
  },
  {
    id: "pkg-14",
    name: "定制异形礼盒",
    category: "100元以上",
    price: 228,
    description: "根据项目主题定制专属结构。",
    craft: "异形开模、复合材质、灯光或机关结构",
    image: giftImages.darkGift,
    video: "/hero-background.mp4",
  },
  {
    id: "pkg-15",
    name: "灯光展示礼盒",
    category: "100元以上",
    price: 258,
    description: "开盒自动亮灯，突出核心产品并强化开箱记忆点。",
    craft: "感应灯带、隐藏线路、亚克力展示层",
    image: giftImages.black,
    video: "/hero-background.mp4",
  },
  {
    id: "pkg-16",
    name: "亚克力悬浮礼盒",
    category: "100元以上",
    price: 198,
    description: "透明结构营造产品悬浮感，适合限量收藏与发布会。",
    craft: "高透亚克力、金属连接件、定制展示底座",
    image: giftImages.black,
  },
  {
    id: "pkg-17",
    name: "金属收藏礼盒",
    category: "100元以上",
    price: 288,
    description: "耐用且具有收藏属性，适合纪念币与高价值产品。",
    craft: "铝合金外壳、阳极氧化、激光雕刻",
    image: giftImages.darkGift,
    video: "/hero-background.mp4",
  },
  {
    id: "pkg-18",
    name: "多层机关礼盒",
    category: "100元以上",
    price: 328,
    description: "通过旋转、抽拉或展开形成多阶段开箱体验。",
    craft: "多层联动结构、异形内托、磁吸定位",
    image: giftImages.festive,
    video: "/hero-background.mp4",
  },
  {
    id: "pkg-19",
    name: "手提抽屉首饰礼盒",
    category: "51-100元",
    price: 72,
    description: "抽屉与手提结构结合，适合首饰、小型纪念品和活动伴手礼。",
    craft: "抽拉结构、织带提手、烫金 LOGO、EVA 内托",
  },
  {
    id: "pkg-20",
    name: "翻盖丝带收藏礼盒",
    category: "100元以上",
    price: 138,
    description: "大开合翻盖搭配丝带闭合，兼顾展示效果与收藏属性。",
    craft: "硬质灰板、磁吸翻盖、缎带闭合、植绒内托",
    video: "/hero-background.mp4",
  },
];

packaging.forEach((item, index) => {
  item.image = `/packaging/catalog-${String(index + 1).padStart(2, "0")}.webp`;
});

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
    const saved = JSON.parse(localStorage.getItem("custom-selection") || "") as Selection;
    return {
      packaging: packaging.find((item) => item.id === saved.packaging?.id),
      products: saved.products
        .map((savedItem) => products.find((item) => item.id === savedItem.id))
        .filter((item): item is Item => Boolean(item)),
      card: cards.find((item) => item.id === saved.card?.id),
    };
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
    <BorderGlow
      className={`shopCard${selected ? " isSelected" : ""}`}
      edgeSensitivity={26}
      glowColor="12 100 62"
      backgroundColor="rgba(5, 7, 10, 0.72)"
      borderRadius={4}
      glowRadius={30}
      glowIntensity={0.82}
      coneSpread={24}
      fillOpacity={0.38}
      colors={["#ff2c1f", "#ff5a18", "#ff9d2a"]}
    >
      <article className="shopCardContent">
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
    </BorderGlow>
  );
}

function getPackagingFamily(item: Item): keyof typeof giftGalleries | undefined {
  if (/抽屉|双层|多层|机关/.test(item.name)) return "drawer";
  if (/木质|木盒/.test(item.name)) return "wood";
  if (/书型|皮纹/.test(item.name)) return "book";
  return "magnetic";
}

function getAttributes(item: Item, family?: keyof typeof giftGalleries) {
  const common: Array<[string, string]> = [
    ["盒型", item.name],
    ["参考价格", `¥${item.price} / 个`],
    ["定制范围", "尺寸、颜色、LOGO、内托"],
  ];
  if (family === "magnetic")
    return [
      ...common,
      ["主要材质", "艺术纸 / 灰板 / 铜版纸"],
      ["印刷方式", "胶印、CMYK、Pantone 专色"],
      ["表面处理", "覆膜、烫金、UV、压凹凸"],
      ["闭合结构", "隐藏式磁吸翻盖"],
      ["参考起订量", "200 个"],
      ["参考生产周期", "15–25 天"],
    ];
  if (family === "drawer")
    return [
      ...common,
      ["主要材质", "1200–1500g 灰板裱艺术纸"],
      ["印刷方式", "四色胶印 / 专色印刷"],
      ["表面处理", "哑膜、烫金、丝印、局部 UV"],
      ["开启方式", "抽拉丝带 / 指槽"],
      ["可选内托", "纸托、EVA、海绵、吸塑"],
      ["参考起订量", "300 个"],
    ];
  if (family === "wood")
    return [
      ...common,
      ["主要材质", "松木 / 竹木 / 胶合板"],
      ["LOGO 工艺", "激光雕刻、丝印、金属铭牌"],
      ["表面处理", "清漆、木蜡油、染色"],
      ["开启方式", "天地盖 / 合页翻盖"],
      ["可选内衬", "木丝、植绒、EVA、布艺"],
      ["适用场景", "纪念品、酒具、收藏品"],
    ];
  if (family === "book")
    return [
      ...common,
      ["主要材质", "灰板裱艺术纸 / 特种纸"],
      ["印刷方式", "CMYK、Pantone、丝网印刷"],
      ["表面处理", "覆膜、烫金银、压纹、UV"],
      ["结构", "书型翻盖 / 磁吸闭合"],
      ["参考起订量", "300 个"],
      ["参考打样周期", "3–5 天"],
    ];
  return [...common, ["工艺", item.craft], ["交期", "按结构、数量与工艺确认"]];
}

function DetailModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const family = getPackagingFamily(item);
  const gallery = family ? giftGalleries[family] : item.image ? [item.image] : [];
  const attributes = getAttributes(item, family);
  const source = item.source || (family ? sourceUrls[family] : undefined);
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
          {gallery.length ? (
            <div className="detailGallery">
              {gallery.map((image, index) => (
                <img src={image} alt={`${item.name}详情图 ${index + 1}`} key={image} />
              ))}
            </div>
          ) : (
            <span>
              详情图片位置
              <br />
              <small>可上传多张工艺详情图</small>
            </span>
          )}
          <div className="videoSlot">
            {item.video ? (
              <div className="cinematicVideo">
                <video
                  src={item.video}
                  poster={item.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
                <span>
                  <small>CRAFT FILM / 2026</small>
                  沉浸式工艺展示
                </span>
              </div>
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
          <h3>产品属性</h3>
          <dl className="attributeGrid">
            {attributes.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {source && (
            <a className="sourceLink" href={source} target="_blank" rel="noreferrer">
              查看课堂素材来源 ↗
            </a>
          )}
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
            <h1>
              {page === "packaging" ? (
                <>
                  定制你的<span className="accentTitle">外包装</span>！
                </>
              ) : (
                config.title
              )}
            </h1>
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
