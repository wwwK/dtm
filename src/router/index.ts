import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeRoutes from '@/views/dashboard';
import Dashboard from '@/views/dashboard/dashboard.vue';
import Initializer from '@/views/initializer/initializer.vue';
import _404Page from '@/views/error/404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/initializer',
    name: 'initializer',
    component: Initializer
  },
  {
    path: '/404',
    name: '404',
    component: _404Page
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    children: HomeRoutes
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
