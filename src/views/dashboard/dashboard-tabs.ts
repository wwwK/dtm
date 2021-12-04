import { computed, ref } from 'vue';

import { SafeAny } from '@/core/types';
import { MenuDTO } from '@/dto/base/menu';
import store from '@/store';
import HomeRoutes from '.';
import { useRoute, useRouter } from 'vue-router';

export default function DashboardTabs(menuProps) {
  const route = useRoute();
  const router = useRouter();
  /** 主页tab key */
  const homeTabKey = 'home';
  /** 当前激活的tab key */
  let activeTabKey = ref('');
  let tabs = ref<SafeAny>([]);

  // 获取当前页面路由信息
  const activePath = route.path;
  // 匹配tab页，处理默认选中tab
  if (activePath === '/') {
    activeTabKey.value = homeTabKey;
  } else {
    const menu = menuProps.menus.value.find(m => m.url === activePath);
    if (menu) {
      tabs.value.push(menu);
      activeTabKey.value = menu.key as string;
    }
  }
  /** 回首页 */
  const goHome = () => {
    activeTabKey.value = homeTabKey;
    router.push('/');
  };
  return {
    activeTabKey,
    tabs,
    /** 获取跟当前路由匹配的组件 */
    currentTabComponent: computed(() => {
      const activeData = HomeRoutes.find(
        r => r.path === store.state.activePath
      );
      if (activeData) {
        return activeData.component;
      }
    }),
    /** 打开一个标签页 */
    tabOpen(menu: MenuDTO) {
      const tab = tabs.value.find((tab: MenuDTO) => tab.key === menu.key);
      if (tab == null && menu.key !== homeTabKey) {
        tabs.value.push(menu);
      }
      activeTabKey.value = menu.key as string;
    },
    /** 关闭一个标签页 */
    tabClose(key: string) {
      const index = tabs.value.findIndex((tab: MenuDTO) => tab.key === key);
      if (index !== -1) {
        if (activeTabKey.value === key) {
          goHome();
        }
        tabs.value.splice(index, 1);
      }
    },
    /** 关闭所有标签页，只保留主页页签 */
    closeAll() {
      tabs.value = [];
      if (activeTabKey.value !== homeTabKey) {
        goHome();
      }
    },
    /** 点击页签，激活页签操作 */
    tabClick(key: string) {
      const activeTab = tabs.value.find((tab: MenuDTO) => tab.key === key);
      if (activeTab?.url) {
        router.push(activeTab.url);
      } else if (key === homeTabKey) {
        goHome();
      }
    }
  };
}
