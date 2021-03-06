import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import jwtDecode from 'jwt-decode';
import { User } from '@/types/models/User';
import { Roles } from '@/enums/roles.enum';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MapPage',
    component: () => import(/* webpackChunkName: "MapGl" */ '@/views/MapPage.vue'),
  },
  {
    path: '/chart-line',
    name: 'ChartLine',
    meta: { roles: [Roles.ADMIN, Roles.ECOLOGIST] },
    component: () => import('@/views/ChartLine.vue'),
  },
  {
    path: '/chart-radar',
    name: 'ChartRadar',
    meta: { layout: 'Empty', roles: [Roles.ADMIN, Roles.ECOLOGIST] },
    component: () => import('@/views/ChartRadar.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * Проверка у пользователя соответствующей роли
 */
router.beforeEach((to, from, next) => {
  const requireRoles = to?.meta?.roles;
  if (requireRoles) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const user: User = jwtDecode(token);
      if (requireRoles.includes(user.role?.value)) next();
      else next('/login');
    } else next('/login');
  } else next();
});

export default router;
