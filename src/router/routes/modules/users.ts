import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
import { t } from '/@/hooks/web/useI18n';

const users: AppRouteModule = {
  path: '/users',
  name: 'Users',
  component: LAYOUT,
  redirect: '/users/list',
  meta: {
    orderNo: 20,
    icon: 'ion:person-circle-outline',
    title: t('routes.users.moduleName'),
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'list',
      name: 'UserManagement',
      meta: {
        title: t('routes.users.management'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/users/index/index.vue'),
    },
    {
      path: 'r/:id',
      name: 'UserDetail',
      meta: {
        hideMenu: true,
        title: t('routes.users.account'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/users/list',
      },
      component: () => import('/@/views/users/index/UserDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.users.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/users/role/index.vue'),
    },
  ],
};

export default users;
