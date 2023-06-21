<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import { keepalive } from '/@/api/sys/user';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  import 'dayjs/locale/zh-cn';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();

  // keepalive
  setInterval(async () => {
    const userStore = useUserStoreWithOut();
    if (userStore.getToken) {
      const data = await keepalive();
      userStore.setToken(data.token);
      console.log('keepalive');
    }
  }, 10 * 60 * 1000); // 10min
</script>
