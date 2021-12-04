<template>
  <template v-if="iconName">
    <svg aria-hidden="true">
      <use :xlink:href="'#' + iconName"></use>
    </svg>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="less" scoped>
svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
  &.link:hover {
    color: #color[primary];
  }
}
</style>
