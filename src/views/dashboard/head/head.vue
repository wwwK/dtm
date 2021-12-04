<template>
  <div class="head">
    <div class="head-system-name">数字孪生管理系统</div>
    <div class="head-date">2021-11-10 18:30:59</div>
    <div class="head-notice">
      <a-badge :count="999">
        <BellOutlined />
      </a-badge>
    </div>
    <div class="head-user-info">
      <img alt="头像" src="@/assets/images/head-portrait.png" />
      {{ name }}
      <DownOutlined />
      <!-- <UpOutlined /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BellOutlined, DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    BellOutlined,
    DownOutlined
  },
  setup() {
    let name = ref('超级管理员');
    return {
      name
    };
  }
});
</script>

<style lang="less" scoped>
div.head {
  height: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  color: #color[top-font-color];
  background: #color[top-bg-color];
  > div.head-system-name {
    flex: 1 auto;
    font-size: 16px;
    margin-left: 13px;
  }
  > div.head-notice {
    margin-left: 30px;
    margin-right: 50px;
    > .ant-badge {
      color: #color[top-font-color];
    }
  }
  > div.head-user-info {
    margin-right: 50px;
    display: flex;
    align-items: center;
    > img {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
    > span.anticon {
      font-size: 8px;
      margin-left: 8px;
    }
  }
}
</style>

<style lang="less">
div.head > div.head-notice {
  > .ant-badge .ant-badge-count {
    height: 10px;
    line-height: 10px;
    padding: 0 3px;
  }
}
</style>
