<template>
  <div class="menu">
    <a-menu
      :class="collapsed ? 'toggle-fold' : 'toggle-open'"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <SubMenu :menus="menus" @on-click-menu="$emit('open-tab', $event)" />
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import SubMenu from './sub-menu.vue';

export default defineComponent({
  components: {
    SubMenu
  },
  props: {
    collapsed: Boolean,
    menus: Array,
    activeTabKey: String
  },
  setup(props) {
    const state = reactive({
      selectedKeys: [props.activeTabKey],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1']
    });

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    return {
      ...toRefs(state)
    };
  },
  emits: ['open-tab']
});
</script>

<style lang="less" scoped>
> div.menu {
  max-width: 136px;
  display: flex;
  flex-direction: column;
  .ant-menu-root {
    flex: 1 auto;
    font-size: 12px;
  }
  > button {
    border-radius: 0px;
    background: #color[menu-submenu-bg];
    border-color: #color[menu-submenu-bg];
  }
  > div.right {
    flex: 1 auto;
  }
}
</style>

<style lang="less">
// div.menu {
//   .ant-menu {
//     > .ant-menu-item,
//     > .ant-menu-submenu {
//       background-color: #color[menu-item-bg];
//     }
//   }
// }
</style>
