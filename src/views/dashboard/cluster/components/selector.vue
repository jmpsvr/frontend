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
  <!-- <div v-if="camera_id > 0"> -->
  <div :id="'camera' + propsid">
    <canvas :id="'canvas' + camerahash" style="width: 99%; height: 95%"></canvas>
  </div>
  <!-- deprecated method -->
  <!-- <iframe
      :src="'/api/v1/rtsp/' + camera_id + ',' + token"
      style="width: 100%; height: 25vw"
    ></iframe> -->
  <!-- </div> -->
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
    props: {
      id: Number,
    },
    setup(props) {
      let tempCurrent = '';
      const devices = ref([]);
      let tempCameraId = 0;
      const token = getToken();
      // eslint-disable-next-line vue/no-setup-props-destructure
      const propsid = props.id;
      const camerahash = propsid + '_' + Math.round(new Date().getTime() / 1000);
      // this.addCamera(camerahash);
      const cdefault = localStorage.getItem('cdefault' + props.id);
      if (cdefault) {
        const item = JSON.parse(cdefault);
        tempCameraId = item?.id;
        tempCurrent = item?.name;
        setTimeout(() => {
          loadPlayer({
            url: `ws://${location.host}/api/v1/rtsp/stream/${tempCameraId}?jwt=${token}`,
            canvas: document.getElementById('canvas' + camerahash),
            videoBufferSize: 1024 * 1024 * 4,
          });
        }, 1000);
      }
      const current = ref(tempCurrent || '选择摄像头');
      const camera_id = ref(tempCameraId);
      return { devices, current, camera_id, token, propsid, camerahash };
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
      clearCamera() {
        const list = document.getElementById('camera' + this.propsid);
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
      },
      addCamera(hash) {
        const list = document.getElementById('camera' + this.propsid);
        const li = document.createElement('canvas');
        li.setAttribute('id', 'canvas' + hash);
        li.setAttribute('style', 'width: 99%; height: 95%');
        console.log(li);
        list.appendChild(li);
      },
      select(item) {
        console.log('select', item);
        this.clearCamera();
        this.camerahash = this.propsid + '_' + Math.round(new Date().getTime() / 1000);
        this.addCamera(this.camerahash);
        this.camera_id = item?.id;
        this.current = item?.name;
        localStorage.setItem('cdefault' + this.propsid, JSON.stringify(item));
        setTimeout(() => {
          // console.log(document.getElementById('canvas'));
          loadPlayer({
            url: `ws://${location.host}/api/v1/rtsp/stream/${this.camera_id}?jwt=${this.token}`,
            canvas: document.getElementById('canvas' + this.camerahash),
            videoBufferSize: 1024 * 1024 * 4,
          });
        }, 10);
      },
    },
  });
</script>

<style>
  .selector {
    margin-left: 1em;
  }
</style>
