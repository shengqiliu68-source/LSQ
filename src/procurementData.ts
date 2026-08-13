export const procurementStatuses = [
  "代购信息确认",
  "代购确认中",
  "代购中",
  "发货中",
  "已收货",
] as const;
export type ProcurementStatus = (typeof procurementStatuses)[number];
export type ProcurementRecord = {
  orderNumber: string;
  createdAt: string;
  currentStatus: ProcurementStatus;
  country: string;
  product: string;
  specification: string;
  updatedAt: string;
  timeline: Array<{ status: ProcurementStatus; time?: string; note?: string }>;
};

// 后续你提供新单号、状态和时间后，在这里新增或更新记录即可。
export const procurementOrders: ProcurementRecord[] = [
  {
    orderNumber: "DG20260813001",
    createdAt: "2026-08-13 14:20",
    currentStatus: "代购中",
    country: "日本",
    product: "限定款商务腕表",
    specification: "黑色表盘 / 42mm / 原装包装",
    updatedAt: "2026-08-16 11:30",
    timeline: [
      { status: "代购信息确认", time: "2026-08-13 14:20", note: "需求与收件资料已完整提交。" },
      { status: "代购确认中", time: "2026-08-14 09:15", note: "已确认货源、价格及预计采购周期。" },
      { status: "代购中", time: "2026-08-16 11:30", note: "采购专员正在执行购买与商品核验。" },
      { status: "发货中" },
      { status: "已收货" },
    ],
  },
];
