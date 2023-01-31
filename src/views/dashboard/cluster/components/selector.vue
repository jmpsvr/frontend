<template>
  <a-dropdown>
    <a class="ant-dropdown-link" :key="current">
      {{ current }}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu id="menu">
        <a-menu-item v-for="i in devices" :key="i.id">
          <a href="javascript:;" @click="select(i)">{{ i.name }}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <div v-if="camera_id > 0">
    <iframe
      :src="'/api/v1/rtsp/' + camera_id + ',' + token"
      style="width: 100%; height: 25vw"
    ></iframe>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';

  import { DownOutlined } from '@ant-design/icons-vue';
  import { Menu, Dropdown } from 'ant-design-vue';
  import { getDeviceList } from '/@/api/devices';

  import { getToken } from '/@/utils/auth';

  export default defineComponent({
    name: 'Selector',
    components: { AMenu: Menu, ADropdown: Dropdown, AMenuItem: Menu.Item, DownOutlined },
    setup() {
      const current = ref('选择摄像头');
      const devices = ref([]);
      const camera_id = ref(0);
      const token = getToken();
      return { devices, current, camera_id, token };
    },
    created() {
      this.update();
    },
    methods: {
      update() {
        getDeviceList({
          page: 1,
          pageSize: 10000, // support front 10000 devices (could be optimized)
        }).then((deviceList) => {
          for (const i of deviceList?.items) {
            if (i?.type === 1) {
              // RTSP device
              this.devices.push(i);
            }
          }
        });
      },
      select(item) {
        console.log('select', item);
        this.camera_id = item?.id;
        this.current = item?.name;
      },
    },
  });
</script>

<style>
  .selector {
    margin-left: 1em;
  }
</style>
