import { FormEvent, useState } from "react";
import { procurementOrders, procurementStatuses, type ProcurementRecord } from "./procurementData";

function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const number = `REQ${Date.now().toString().slice(-10)}`;
    localStorage.setItem(
      `procurement-request-${number}`,
      JSON.stringify({ number, createdAt: new Date().toISOString(), ...data })
    );
    setSubmitted(true);
    form.reset();
  };
  if (submitted)
    return (
      <div className="procurementSuccess">
        <span>✓</span>
        <p>REQUEST RECEIVED / 需求已提交</p>
        <h2>我们已经收到你的代购需求。</h2>
        <p>项目顾问确认商品与报价后，会通过你填写的联系方式发送正式代购单号。</p>
        <button type="button" onClick={() => setSubmitted(false)}>
          继续提交新需求
        </button>
      </div>
    );
  return (
    <form className="procurementForm" onSubmit={submit}>
      <div className="formSectionHead">
        <span>01</span>
        <div>
          <h2>采购需求</h2>
          <p>请尽可能准确地描述希望采购的产品。</p>
        </div>
      </div>
      <div className="procurementFields">
        <label>
          采购国家或地区
          <input name="country" required placeholder="例如：日本、美国、德国" />
        </label>
        <label>
          代购产品
          <input name="product" required placeholder="请输入品牌与产品名称" />
        </label>
        <label className="isWide">
          型号与规格
          <textarea
            name="specification"
            required
            rows={4}
            placeholder="型号、颜色、尺寸、数量、版本或商品链接等"
          />
        </label>
        <label className="isWide">
          联系方式
          <input name="contact" required placeholder="WhatsApp、微信、电话或邮箱" />
        </label>
      </div>
      <div className="formSectionHead addressHead">
        <span>02</span>
        <div>
          <h2>客户收件信息</h2>
          <p>用于核算物流和完成最终配送。</p>
        </div>
      </div>
      <div className="procurementFields">
        <label>
          收件人
          <input name="recipient" required />
        </label>
        <label>
          收件电话
          <input name="phone" required />
        </label>
        <label>
          国家
          <input name="addressCountry" required />
        </label>
        <label>
          省 / 州<input name="province" required />
        </label>
        <label>
          城市
          <input name="city" required />
        </label>
        <label className="isWide">
          详细地址
          <textarea name="address" required rows={3} placeholder="街道、门牌号、公寓或邮政编码" />
        </label>
      </div>
      <label className="procurementConsent">
        <input type="checkbox" required /> 我确认以上信息准确，并同意项目顾问联系我确认报价。
      </label>
      <button className="procurementSubmit" type="submit">
        提交代购需求 →
      </button>
    </form>
  );
}

function ProcurementResult({ order }: { order: ProcurementRecord }) {
  const current = procurementStatuses.indexOf(order.currentStatus);
  return (
    <div className="procurementResult">
      <div className="procurementResultTop">
        <div>
          <span>当前进度</span>
          <strong>{order.currentStatus}</strong>
          <small>最后更新：{order.updatedAt}</small>
        </div>
        <dl>
          <div>
            <dt>代购单号</dt>
            <dd>{order.orderNumber}</dd>
          </div>
          <div>
            <dt>提交时间</dt>
            <dd>{order.createdAt}</dd>
          </div>
          <div>
            <dt>采购国家</dt>
            <dd>{order.country}</dd>
          </div>
          <div>
            <dt>代购产品</dt>
            <dd>{order.product}</dd>
          </div>
          <div className="isWide">
            <dt>型号规格</dt>
            <dd>{order.specification}</dd>
          </div>
        </dl>
      </div>
      <div className="procurementSteps">
        {procurementStatuses.map((status, index) => (
          <div
            className={index < current ? "isDone" : index === current ? "isCurrent" : ""}
            key={status}
          >
            <i>{index < current ? "✓" : index + 1}</i>
            <span>{status}</span>
          </div>
        ))}
      </div>
      <div className="procurementTimeline">
        {order.timeline.map((event, index) => (
          <article
            className={event.time ? (index === current ? "isCurrent" : "isDone") : "isPending"}
            key={event.status}
          >
            <i>{event.time ? (index === current ? "●" : "✓") : "·"}</i>
            <div>
              <h3>{event.status}</h3>
              <p>{event.note || "等待上一流程完成后更新"}</p>
            </div>
            <time>{event.time || "待更新"}</time>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProgressSearch() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<ProcurementRecord>();
  const search = (event: FormEvent) => {
    event.preventDefault();
    setResult(
      procurementOrders.find(
        (item) => item.orderNumber.toUpperCase() === query.trim().toUpperCase()
      )
    );
    setSearched(true);
  };
  return (
    <div className="procurementSearch">
      <div className="procurementSearchIntro">
        <p>PROCUREMENT TRACKING / 代购进度</p>
        <h2>
          输入单号，
          <br />
          <span>查看采购进度。</span>
        </h2>
        <p>正式单号将在采购信息与报价确认后，由项目顾问发送给你。</p>
      </div>
      <form onSubmit={search}>
        <label htmlFor="procurement-number">代购单号</label>
        <div>
          <input
            id="procurement-number"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：DG20260813001"
          />
          <button type="submit">查询进度 →</button>
        </div>
        <button type="button" onClick={() => setQuery("DG20260813001")}>
          填写演示单号
        </button>
      </form>
      {searched && !result && (
        <div className="procurementNotFound">
          <strong>没有找到该代购订单</strong>
          <p>请核对单号，或联系项目顾问确认。</p>
        </div>
      )}
      {result && <ProcurementResult order={result} />}
    </div>
  );
}

export default function ProcurementPage() {
  const [tab, setTab] = useState<"request" | "tracking">("request");
  return (
    <main className="procurementPage">
      <header className="procurementHeader contentShell">
        <a className="brand" href="/">
          <img src="/dabiaoge-logo-transparent.webp" width="60" height="60" alt="" />
          <span>
            大表哥<small>全球代购 / 代拍</small>
          </span>
        </a>
        <a href="/">← 返回首页</a>
      </header>
      <section className="procurementHero contentShell">
        <p>GLOBAL PROCUREMENT / 全球代购</p>
        <h1>
          告诉我们，
          <br />
          <span>你想买什么。</span>
        </h1>
        <p>从寻找货源、核实规格、代购验货到跨境配送，我们按你的实际需求推进每一步。</p>
      </section>
      <nav className="procurementTabs contentShell">
        <button className={tab === "request" ? "isActive" : ""} onClick={() => setTab("request")}>
          01 / 提交代购需求
        </button>
        <button className={tab === "tracking" ? "isActive" : ""} onClick={() => setTab("tracking")}>
          02 / 查询代购进度
        </button>
      </nav>
      <section className="procurementContent contentShell">
        {tab === "request" ? <RequestForm /> : <ProgressSearch />}
      </section>
      <footer className="procurementFooter contentShell">
        <span>信息仅用于采购确认与订单配送</span>
        <a href="mailto:hello@example.com">联系代购顾问 →</a>
      </footer>
    </main>
  );
}
