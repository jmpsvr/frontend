import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const log: AppRouteModule = {
  path: '/log',
  name: 'Log',
  component: LAYOUT,
  redirect: '/log/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:timer-outline',
    title: t('routes.log.moduleName'),
    orderNo: 50,
  },
  children: [
    {
      path: 'index',
      name: 'LogIndex',
      component: () => import('/@/views/log/index.vue'),
      meta: {
        title: t('routes.log.moduleName'),
        icon: 'ion:timer-outline',
        hideMenu: true,
      },
    },
  ],
};

export default log;
