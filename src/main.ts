import { createApp } from 'vue';

// -----------第三方插件-------------
// 引入ant-design
import Antd from 'ant-design-vue';
// 引入ant-design 样式
import 'ant-design-vue/dist/antd.css';

// -----------项目功能-------------
// 引入全局样式
import './assets/styles/index.less';

// 引入主页面
import App from './app.vue';
import router from './router';
import store from './store';
import ImgIcon from './components/image-icon.vue';
// 初始化js
import './core/initialize';

const mv = createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  // 注册全局组件
  .component('img-icon', ImgIcon)
  .mount('#app');

// 监听路由
router.beforeEach(to => {
  // 记录要跳转页面的path值，在dashboard页需根据
  store.commit('setPath', to.path);
  return true;
});
