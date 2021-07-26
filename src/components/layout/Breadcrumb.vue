<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="item in breadCrumbArray">{{item.meta.title}}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    breadCrumbArray: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
});
</script>


<style lang="scss" scoped>
.breadcrumb {
  padding: 10px;
  border-bottom: 1px #ccc solid;
}
</style> 