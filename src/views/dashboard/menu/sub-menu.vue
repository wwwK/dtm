<template>
  <template v-for="menu of menus">
    <a-menu-item
      v-if="menu.childs == null || menu.childs.length === 0"
      :key="menu.key"
      @click="$emit('on-click-menu', menu)"
    >
      <template #icon>
        <component :is="menu.icon" v-if="menu.icon"></component>
        <MenuOutlined v-else />
      </template>
      <router-link v-if="menu.url" :to="menu.url">
        <span>{{ menu.name }}</span>
      </router-link>
      <span v-else>{{ menu.name }}</span>
    </a-menu-item>

    <a-sub-menu v-else :key="menu.key">
      <template v-slot:title>
        <component :is="menu.icon" v-if="menu.icon"></component>
        <MenuOutlined v-else />
        <span>{{ menu.name }}</span>
      </template>
      <sub-menu
        :menus="menu.childs"
        @on-click-menu="$emit('on-click-menu', $event)"
      />
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  BellOutlined,
  ApartmentOutlined,
  VerifiedOutlined,
  AppstoreOutlined,
  MenuOutlined
} from '@ant-design/icons-vue';
import { MenuDTO } from '@/dto/base/menu';

export default defineComponent({
  name: 'sub-menu',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    BellOutlined,
    ApartmentOutlined,
    VerifiedOutlined,
    AppstoreOutlined,
    MenuOutlined
  },
  props: {
    menus: Array
  },
  setup(props, context) {
    const clickMenu = (menu: MenuDTO) => {
      console.log(menu);
      context.emit('on-click-menu');
    };
    return { clickMenu };
  },
  emits: ['on-click-menu']
});
</script>
