import { RouteRecordRaw } from 'vue-router';
import Resource from '../components/system/resource/resource.vue';
import Dict from '../components/system/dict/dict.vue';

const HomeRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system/resource',
    name: 'Resource',
    component: Resource
  },
  {
    path: '/system/dict',
    name: 'Dict',
    component: Dict
  }
];

export default HomeRoutes;
