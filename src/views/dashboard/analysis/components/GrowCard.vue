<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';
  // import { growCardList } from '../data';

  export interface GrowCardItem {
    icon: string;
    title: string;
    value: number;
    color: string;
    action: string;
  }

  const props = defineProps({
    loading: {
      type: Boolean,
    },
    analysis: {
      type: Object,
    },
  });

  const growCardList: GrowCardItem[] = [
    {
      title: '用户数',
      icon: 'user|svg',
      value: props.analysis?.user || 0,
      color: 'green',
      action: '总',
    },
    {
      title: '设备数',
      icon: 'device|svg',
      value: props.analysis?.device || 0,
      color: 'blue',
      action: '总',
    },
    {
      title: '动作数',
      icon: 'action|svg',
      value: props.analysis?.action || 0,
      color: 'orange',
      action: '总',
    },
    {
      title: '动态数',
      icon: 'notice|svg',
      value: props.analysis?.notice || 0,
      color: 'purple',
      action: '总',
    },
  ];
</script>
