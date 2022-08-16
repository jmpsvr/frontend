export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '用户数',
    icon: 'visit-count|svg',
    value: 2000,
    color: 'green',
    action: '总',
  },
  {
    title: '设备数',
    icon: 'total-sales|svg',
    value: 20000,
    color: 'blue',
    action: '总',
  },
  {
    title: '下载数',
    icon: 'download-count|svg',
    value: 8000,
    color: 'orange',
    action: '周',
  },
  {
    title: '成交数',
    icon: 'transaction|svg',
    value: 5000,
    color: 'purple',
    action: '年',
  },
];
