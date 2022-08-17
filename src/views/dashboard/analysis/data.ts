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
    icon: 'user|svg',
    value: 0,
    color: 'green',
    action: '总',
  },
  {
    title: '设备数',
    icon: 'device|svg',
    value: 0,
    color: 'blue',
    action: '总',
  },
  {
    title: '动作数',
    icon: 'action|svg',
    value: 0,
    color: 'orange',
    action: '总',
  },
  {
    title: '动态数',
    icon: 'notice|svg',
    value: 0,
    color: 'purple',
    action: '总',
  },
];
