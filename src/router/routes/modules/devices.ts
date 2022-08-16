import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const devices: AppRouteModule = {
  path: '/devices',
  name: 'Devices',
  component: LAYOUT,
  redirect: '/devices/list',
  meta: {
    orderNo: 30,
    icon: 'ion:ios-game-controller-b-outline',
    title: t('routes.devices.moduleName'),
  },
  children: [
    {
      path: 'list',
      name: 'DeviceManagement',
      meta: {
        title: t('routes.devices.management'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/devices/index/index.vue'),
    },
    {
      path: 'r/:id',
      name: 'DeviceDetail',
      meta: {
        hideMenu: true,
        title: t('routes.devices.detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/devices/list',
      },
      component: () => import('/@/views/devices/index/DeviceDetail.vue'),
    },
    {
      path: 'area',
      name: 'AreaManagement',
      meta: {
        title: t('routes.devices.area'),
        ignoreKeepAlive: true,
        roles: [RoleEnum.ADMIN],
      },
      component: () => import('/@/views/devices/area/index.vue'),
    },
    {
      path: 'action',
      name: 'ActionManagement',
      meta: {
        title: t('routes.devices.action'),
        ignoreKeepAlive: true,
        roles: [RoleEnum.ADMIN],
      },
      component: () => import('/@/views/devices/action/index.vue'),
    },
  ],
};

export default devices;
