<template>
  <div class="home">
    <div class="left" :class="collapsed ? 'toggle-fold' : 'toggle-open'">
      <div class="logo">
        <img alt="DTM" src="@/assets/images/logo.png" />
      </div>
      <!-- 菜单 -->
      <Menu
        class="menu"
        :menus="menus"
        :collapsed="collapsed"
        :activeTabKey="activeTabKey"
        @open-tab="tabOpen"
      />
      <!-- 菜单折叠按钮 -->
      <a-button type="primary" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
    </div>
    <div class="right">
      <!-- 头部内容 -->
      <Head />
      <!-- body -->
      <div class="content">
        <div class="tabs-close-icon" @click="closeAll">
          <CloseOutlined />
        </div>
        <a-tabs
          type="editable-card"
          hide-add
          v-model:activeKey="activeTabKey"
          @edit="tabClose"
          @tabClick="tabClick"
        >
          <a-tab-pane key="home" :closable="false">
            <template #tab>
              <HomeFilled />
            </template>
            <Home />
          </a-tab-pane>
          <a-tab-pane v-for="tab of tabs" :key="tab.key" :tab="tab.name">
            <keep-alive>
              <component :is="currentTabComponent"></component>
            </keep-alive>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeFilled
} from '@ant-design/icons-vue';

import Home from './home/home.vue';
import Menu from './menu/menu.vue';
import Head from './head/head.vue';
import DashboardTabs from './dashboard-tabs';
import DashboardMenu from './dashboard-menu';

export default defineComponent({
  components: {
    CloseOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeFilled,
    Home,
    Head,
    Menu
  },
  setup() {
    /** 引入左边menu逻辑 */
    const { ...menuProps } = DashboardMenu();
    /** 引入右边tab页逻辑 */
    const { ...tabProps } = DashboardTabs(menuProps);
    return {
      ...menuProps,
      ...tabProps
    };
  }
});
</script>

<style lang="less" scoped>
div.home {
  display: flex;
  height: 100%;
  overflow: hidden;
  > div.left {
    max-width: 136px;
    display: flex;
    flex-direction: column;
    > div.logo {
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #color[primary];
      > img {
        width: 40px;
        height: 28px;
      }
    }
    .menu {
      flex: 1 auto;
      background-color: #color[menu-bg];
    }
    > button {
      border-radius: 0px;
      background-color: #color[menu-bg];
      border-color: #color[menu-bg];
    }
  }
  > div.right {
    display: flex;
    flex-direction: column;
    flex: 1 auto;
    > div.content {
      flex: 1 auto;
      margin: 20px;
      overflow: auto;
      > .ant-tabs-card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      > .ant-tabs-card .ant-tabs-nav > .ant-tabs-nav-wrap {
        .ant-tabs-tab .anticon-home {
          margin-right: 0px;
          padding: 0 3.5px;
          font-size: 14px;
        }
      }
      > .tabs-close-icon {
        position: absolute;
        z-index: 1;
        right: 30px;
        padding: 5px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: #color[primary];
        }
      }
    }
  }
  // 切换按钮折叠动画
  .toggle-fold {
    width: 68px;
    animation-name: menu-fold;
    animation-duration: 0.3s;
  }
  // 切换按钮展开动画
  .toggle-open {
    width: 136px;
    animation-name: menu-open;
    animation-duration: 0.3s;
  }
}

@keyframes menu-fold {
  from {
    width: 136px;
  }
  to {
    width: 68px;
  }
}
@keyframes menu-open {
  from {
    width: 68px;
  }
  to {
    width: 136px;
  }
}
</style>

<style lang="less">
div.home > div.right > div.content {
  @primary-color: #color[primary];
  #tabs-bg() {
    background-color: white;
  }
  #tabs-tab-style(@bg,@color) {
    background-color: @bg;
    color: @color;
    > button {
      color: @color;
    }
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white;
  }
  > .ant-tabs-card {
    > .ant-tabs-nav {
      #tabs-bg();
      // height: 30px;
      margin-bottom: 12px;
      .ant-tabs-tab {
        #tabs-bg();
        margin-left: 0px;
        margin-right: 0px;
        border: none;
        border-radius: 0px;
        #tabs-bg();
        > button {
          margin-left: 0px;
        }
        &:not(:first-child) {
          border-left: 1px solid #color[menu-border-color];
        }
        &:hover:not(.ant-tabs-tab-active) {
          #tabs-tab-style(#deeeff,@primary-color);
        }
      }
      .ant-tabs-tab-active {
        #tabs-tab-style(@primary-color,white);
      }
    }
    > .ant-tabs-content-holder {
      flex: 1 auto;
      overflow: auto;
      #tabs-bg();
      > .ant-tabs-content {
        height: 100%;
        > .ant-tabs-tabpane {
          display: flex;
          flex-direction: column;
          > div {
            flex: 1 auto;
          }
        }
      }
    }
  }
}
</style>
