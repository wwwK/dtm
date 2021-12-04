<template>
  <!-- 最外层包一个节点，处理ant-design国际化 -->
  <a-config-provider :locale="locale" :autoInsertSpaceInButton="false">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
// 导入中文国际化资源
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default {
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>
