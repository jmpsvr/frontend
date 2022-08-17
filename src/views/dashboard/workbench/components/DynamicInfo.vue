<template>
  <Card title="最新动态" v-bind="$attrs">
    <!-- <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template> -->
    <List item-layout="horizontal" :data-source="dynamicInfoItems">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta>
            <template #description>
              {{ new Date(item.createTime).toLocaleString() }}
            </template>
            <!-- eslint-disable-next-line -->
            <template #title> {{ item.event }} 相关设备ID: <span v-html="item.did"> </span> </template>
            <template #avatar>
              <Icon :icon="(item.icon || 'info') + '|svg'" :size="30" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, List } from 'ant-design-vue';
  // import { dynamicInfoItems } from './data';
  import { Icon } from '/@/components/Icon';

  import { getNoticeList } from '/@/api/devices';

  interface DynamicInfoItem {
    uuid: string;
    event: string;
    did: number;
    finish: boolean;
    icon: string;
    createTime: string;
  }

  const dynamicInfoItems: DynamicInfoItem[] = [];

  const update = () =>
    getNoticeList()
      .then((res) => {
        for (let i of res as unknown as DynamicInfoItem[]) {
          dynamicInfoItems.push(i);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  update();

  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;
</script>
