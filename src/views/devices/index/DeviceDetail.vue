<template>
  <PageWrapper :title="device?.name" :content="device?.remark" contentBackground @back="goBack">
    <!-- <template #extra>
      <a-button type="primary" danger> 禁用账号 </a-button>
      <a-button type="primary"> 修改密码 </a-button>
    </template> -->
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="详细信息" />
        <a-tab-pane
          key="location"
          tab="设备位置"
          v-if="device?.var?.filter((item) => item.key === 'coord')[0]?.value"
        />
        <!-- <a-tab-pane key="logs" tab="操作日志" /> -->
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
        <!-- RTSP Device -->
        <div v-if="device?.type === 1">
          <canvas id="canvas" style="width: 100%; height: 100%"></canvas>
          <!-- deprecated method -->
          <!-- <iframe
            :src="'/api/v1/rtsp/' + deviceId + ',' + token"
            style="width: 100%; height: 40vw"
          ></iframe> -->
        </div>
      </template>
      <template v-if="currentKey == 'location'">
        <iframe
          :src="
            'https://apis.map.qq.com/uri/v1/geocoder?coord=' +
            device?.var?.filter((item) => item.key === 'coord')[0]?.value
          "
          style="width: 100%; height: 40vw"
        ></iframe>
      </template>
      <!-- <template v-if="currentKey == 'logs'">
        <div v-for="i in 10" :key="i">这是设备{{ deviceId }}操作日志Tab</div>
      </template> -->
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
  import { getToken } from '/@/utils/auth';

  export default defineComponent({
    name: 'DeviceDetail',
    components: { PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane },
    setup() {
      const route = useRoute();
      const go = useGo();
      const { setTitle } = useTabs();
      const token = getToken();

      // 此处可以得到用户ID
      const deviceId = ref(route.params?.id);
      const currentKey = ref('detail');
      const device = ref(null);
      getDeviceDetail({ id: deviceId.value }).then((data) => {
        device.value = data;
        setTitle(device.value?.name);
        if (device.value.type === 0) {
          // 每10秒刷新一次
          setInterval(() => {
            getDeviceDetail({ id: deviceId.value }).then((data) => {
              device.value = data;
            });
          }, 10 * 1000);
        } else if (device.value.type === 1) {
          setTimeout(() => {
            // console.log(document.getElementById('canvas'));
            loadPlayer({
              url: `ws://${location.host}/api/v1/rtsp/stream/${deviceId.value}?jwt=${token}`,
              canvas: document.getElementById('canvas'),
              videoBufferSize: 1024 * 1024 * 4,
            });
          }, 10);
        }
      });

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

      return { device, deviceId, currentKey, goBack, sendCmd, token };
    },
  });
</script>
