<template>
  <PageWrapper
    :title="`设备` + deviceId"
    content="这是设备信息界面，当然UI还没设计完善，仅简略展示功能"
    contentBackground
    @back="goBack"
  >
    <!-- <template #extra>
      <a-button type="primary" danger> 禁用账号 </a-button>
      <a-button type="primary"> 修改密码 </a-button>
    </template> -->
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="详细信息" />
        <a-tab-pane key="logs" tab="操作日志" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'detail'">
        <!-- Common Device -->
        <div v-if="device?.type === 0">
          <div v-for="i in device?.var" :key="i">{{ i.name }} : {{ i.value }}</div>
          <span v-for="i in device?.action" :key="i">
            <a-button @click="sendCmd(i.cmd)" :id="i.cmd">{{ i.name }}</a-button>
            &nbsp;
          </span>
        </div>
        <!-- Onvif Device -->
        <div v-if="device?.type === 1"> Camera Here </div>
      </template>
      <template v-if="currentKey == 'logs'">
        <div v-for="i in 10" :key="i">这是用户{{ deviceId }}操作日志Tab</div>
      </template>
    </div>
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs } from 'ant-design-vue';
  import { getDeviceDetail, sendMQCmd } from '/@/api/devices';

  export default defineComponent({
    name: 'DeviceDetail',
    components: { PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const deviceId = ref(route.params?.id);
      const currentKey = ref('detail');
      const device = ref(null);
      getDeviceDetail({ id: deviceId.value }).then((data) => {
        device.value = data;
      });
      // 每10秒刷新一次
      setInterval(() => {
        getDeviceDetail({ id: deviceId.value }).then((data) => {
          device.value = data;
        });
      }, 10 * 1000);
      const { setTitle } = useTabs();
      setTitle('详情：设备' + deviceId.value);

      // 页面左侧点击返回链接时的操作
      const goBack = () => {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/devices/list');
      };
      const sendCmd = (cmd) => {
        sendMQCmd({
          id: deviceId.value,
          cmd,
        });
      };
      return { device, deviceId, currentKey, goBack, sendCmd };
    },
  });
</script>
