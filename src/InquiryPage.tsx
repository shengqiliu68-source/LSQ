import { FormEvent, useState } from "react";

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const reference = `MSG${Date.now().toString().slice(-10)}`;
    localStorage.setItem(
      `inquiry-${reference}`,
      JSON.stringify({ reference, createdAt: new Date().toISOString(), ...data })
    );
    form.reset();
    setSubmitted(true);
  };

  return (
    <main className="inquiryPage">
      <header className="inquiryHeader contentShell">
        <a className="brand" href="/">
          <img src="/dabiaoge-logo-transparent.webp" width="68" height="68" alt="" />
          <span>
            大表哥<small>留言咨询中心</small>
          </span>
        </a>
        <a href="/">← 返回首页</a>
      </header>
      <section className="inquiryHero contentShell">
        <p>MESSAGE & INQUIRY / 留言咨询</p>
        <h1>
          有任何问题，
          <br />
          <span>都可以告诉我们。</span>
        </h1>
        <p>
          无论是产品定制、报价、物流、代购还是合作咨询，请留下你的需求，我们会根据内容尽快回复。
        </p>
      </section>
      <section className="inquiryContent contentShell">
        {submitted ? (
          <div className="inquirySuccess">
            <i>✓</i>
            <p>MESSAGE RECEIVED / 留言已收到</p>
            <h2>感谢你的留言。</h2>
            <p>
              我们会通过你填写的联系方式回复。如果问题紧急，也可以直接通过 Telegram 或邮箱联系我们。
            </p>
            <div>
              <a href="https://t.me/llllsssqqq" target="_blank" rel="noreferrer">
                打开 Telegram →
              </a>
              <a href="mailto:shengqiliu68@gmail.com">发送邮件 →</a>
            </div>
            <button type="button" onClick={() => setSubmitted(false)}>
              继续提交留言
            </button>
          </div>
        ) : (
          <form className="inquiryForm" onSubmit={submit}>
            <div className="inquiryFormHead">
              <span>01</span>
              <div>
                <h2>填写咨询信息</h2>
                <p>带有 * 的项目为必填信息。</p>
              </div>
            </div>
            <div className="inquiryFields">
              <label>
                姓名 / 称呼 *<input name="name" required placeholder="如何称呼你" />
              </label>
              <label>
                国家或地区 *<input name="country" required placeholder="例如：中国、美国、新加坡" />
              </label>
              <label>
                联系方式 *<input name="contact" required placeholder="Telegram、邮箱、电话或微信" />
              </label>
              <label>
                咨询类型 *
                <select name="type" required defaultValue="">
                  <option value="" disabled>
                    请选择咨询类型
                  </option>
                  <option>产品定制咨询</option>
                  <option>价格与报价</option>
                  <option>订单与物流</option>
                  <option>代购 / 代拍</option>
                  <option>商务合作</option>
                  <option>其他问题</option>
                </select>
              </label>
              <label className="isWide">
                问题主题 *<input name="subject" required placeholder="请用一句话概括你的问题" />
              </label>
              <label className="isWide">
                详细留言 *
                <textarea
                  name="message"
                  required
                  rows={7}
                  placeholder="请描述产品、数量、预算、目的国家、时间要求或你遇到的问题……"
                />
              </label>
            </div>
            <label className="inquiryConsent">
              <input type="checkbox" required /> 我确认以上联系方式准确，并同意工作人员联系我。
            </label>
            <button className="inquirySubmit" type="submit">
              提交留言与咨询 →
            </button>
          </form>
        )}
        <aside className="inquiryAside">
          <p>DIRECT CONTACT / 快速联系</p>
          <h2>需要即时沟通？</h2>
          <p>工作时间内可通过 Telegram 或邮箱直接联系我们。</p>
          <a href="https://t.me/llllsssqqq" target="_blank" rel="noreferrer">
            <span>TELEGRAM</span>
            <strong>@llllsssqqq</strong>
            <b>打开 →</b>
          </a>
          <a href="mailto:shengqiliu68@gmail.com">
            <span>EMAIL</span>
            <strong>shengqiliu68@gmail.com</strong>
            <b>发送 →</b>
          </a>
        </aside>
      </section>
    </main>
  );
}
