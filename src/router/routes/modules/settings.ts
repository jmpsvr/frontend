import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const settings: AppRouteModule = {
  path: '/settings',
  name: 'Settings',
  component: LAYOUT,
  redirect: '/settings/index',
  meta: {
    orderNo: 100,
    icon: 'ion:settings-outline',
    title: t('sys.settings.title'),
  },
  children: [
    {
      path: 'index',
      name: 'SettingsIndex',
      meta: {
        title: t('sys.settings.config'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/settings/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('sys.settings.password'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/settings/ChangePassword.vue'),
    },
  ],
};

export default settings;
