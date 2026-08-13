export const orderStatuses = [
  "厂家制作中",
  "厂家已出货",
  "跨国航运中",
  "清关中",
  "进仓中",
  "上架中",
  "已进仓",
] as const;
export type OrderStatus = (typeof orderStatuses)[number];
export type OrderRecord = {
  orderNumber: string;
  createdAt: string;
  currentStatus: OrderStatus;
  productName: string;
  destination: string;
  updatedAt: string;
  timeline: Array<{ status: OrderStatus; time?: string; note?: string }>;
};

// 后续新增或更新订单时，只需维护此数组；页面会自动呈现当前进度与节点时间。
export const orders: OrderRecord[] = [
  {
    orderNumber: "DBG20260813001",
    createdAt: "2026-08-13 10:30",
    currentStatus: "清关中",
    productName: "企业定制礼盒项目",
    destination: "美国 · 洛杉矶仓",
    updatedAt: "2026-09-02 16:45",
    timeline: [
      { status: "厂家制作中", time: "2026-08-13 10:30", note: "订单确认，进入排产与定制制作。" },
      { status: "厂家已出货", time: "2026-08-25 14:10", note: "完成质检与装箱，已由厂家发出。" },
      { status: "跨国航运中", time: "2026-08-27 09:20", note: "货物已装运，正在前往目的国。" },
      { status: "清关中", time: "2026-09-02 16:45", note: "货物抵达口岸，正在办理清关手续。" },
      { status: "进仓中" },
      { status: "上架中" },
      { status: "已进仓" },
    ],
  },
];
