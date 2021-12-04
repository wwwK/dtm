<template>
  <div class="dict">
    <div class="dtm-content-btns">
      <a-button type="link">
        <template #icon>
          <img-icon iconName="icon-add" />
        </template>
        字典
      </a-button>
      <a-button type="link">
        <template #icon>
          <img-icon iconName="icon-dowmload" />
        </template>
        导入
      </a-button>
      <a-button type="link">
        <template #icon>
          <img-icon iconName="icon-upload" />
        </template>
        导出
      </a-button>
      <a-button type="link">
        <template #icon>
          <img-icon iconName="icon-delete" />
        </template>
        删除
      </a-button>
    </div>
  </div>
  <!-- <div v-for="i of 50" :key="i">{{i}}</div> -->
</template>

<script lang="ts">
import store from '@/store';
import HomeRoutes from '@/views/dashboard';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {}
});
</script>

<style lang="less" scope>
div.dict {
}
</style>
