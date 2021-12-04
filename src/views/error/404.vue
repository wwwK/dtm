<template>
  <a-result status="404" title="404" sub-title="您访问的页面走丢了">
    <template #extra>
      <router-link :to="{ name: 'dashboard' }">
        <a-button type="primary">回主页</a-button>
      </router-link>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      name: '页面走丢了'
    };
  }
});
</script>

<style lang="less" scope>
div.page404 {
  width: 100%;
  height: 100%;
}
</style>
