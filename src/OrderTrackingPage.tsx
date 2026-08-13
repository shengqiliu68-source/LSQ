import { FormEvent, useState } from "react";
import { orders, orderStatuses, type OrderRecord } from "./orderData";

function OrderResult({ order }: { order: OrderRecord }) {
  const currentIndex = orderStatuses.indexOf(order.currentStatus);
  return (
    <section className="trackingResult" aria-live="polite">
      <div className="trackingSummary">
        <div>
          <span>当前状态</span>
          <strong>{order.currentStatus}</strong>
          <small>最后更新：{order.updatedAt}</small>
        </div>
        <dl>
          <div>
            <dt>订单编号</dt>
            <dd>{order.orderNumber}</dd>
          </div>
          <div>
            <dt>下单时间</dt>
            <dd>{order.createdAt}</dd>
          </div>
          <div>
            <dt>订单项目</dt>
            <dd>{order.productName}</dd>
          </div>
          <div>
            <dt>目的仓库</dt>
            <dd>{order.destination}</dd>
          </div>
        </dl>
      </div>
      <div className="trackingProgress" aria-label={`当前进度：${order.currentStatus}`}>
        {orderStatuses.map((status, index) => (
          <div
            className={index < currentIndex ? "isDone" : index === currentIndex ? "isCurrent" : ""}
            key={status}
          >
            <i>{index < currentIndex ? "✓" : String(index + 1).padStart(2, "0")}</i>
            <span>{status}</span>
          </div>
        ))}
      </div>
      <div className="trackingTimeline">
        <div className="trackingSectionTitle">
          <p>ORDER TIMELINE / 订单轨迹</p>
          <h2>每一步流转，清晰可见。</h2>
        </div>
        {order.timeline.map((event, index) => {
          const reached = Boolean(event.time);
          return (
            <article
              className={index === currentIndex ? "isCurrent" : reached ? "isDone" : "isPending"}
              key={event.status}
            >
              <div className="trackingNode">
                {reached ? (index === currentIndex ? "●" : "✓") : "·"}
              </div>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{event.status}</h3>
                <p>{event.note || "等待上一流程完成后更新"}</p>
              </div>
              <time>{event.time || "待更新"}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function OrderTrackingPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<OrderRecord>();
  const [searched, setSearched] = useState(false);
  const search = (event: FormEvent) => {
    event.preventDefault();
    const normalized = query.trim().toUpperCase();
    setResult(orders.find((order) => order.orderNumber.toUpperCase() === normalized));
    setSearched(true);
  };
  return (
    <main className="trackingPage">
      <header className="trackingHeader contentShell">
        <a className="brand" href="/">
          <img src="/dabiaoge-logo-transparent.webp" alt="" width="60" height="60" />
          <span>
            大表哥<small>订单追踪中心</small>
          </span>
        </a>
        <a href="/">← 返回首页</a>
      </header>
      <section className="trackingHero contentShell">
        <p>ORDER TRACKING / 订单追踪</p>
        <h1>
          查询你的
          <br />
          <span>订单状态。</span>
        </h1>
        <div className="trackingSearchWrap">
          <form onSubmit={search}>
            <label htmlFor="order-number">输入你的订单编号</label>
            <div>
              <input
                id="order-number"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="例如：DBG20260813001"
                autoComplete="off"
              />
              <button type="submit">立即查询 →</button>
            </div>
          </form>
          <button className="trackingDemo" type="button" onClick={() => setQuery("DBG20260813001")}>
            填写演示订单号
          </button>
        </div>
        {searched && !result && (
          <div className="trackingEmpty">
            <strong>暂未查询到该订单</strong>
            <p>请核对订单编号是否完整，或联系你的项目顾问确认。</p>
          </div>
        )}
      </section>
      {result && (
        <div className="contentShell">
          <OrderResult order={result} />
        </div>
      )}
      <footer className="trackingFooter contentShell">
        <span>订单状态由项目团队持续更新</span>
        <a href="mailto:hello@example.com">需要帮助？联系项目顾问 →</a>
      </footer>
    </main>
  );
}
