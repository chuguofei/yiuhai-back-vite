<template>
  <a-layout-header class="header-layout-box">
    <div class="flex align-center justify-between header-layout">
      <div>
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item :key="item.router" v-for="item in breadCrumbArray">{{
            item.meta.title
          }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div>
        <HeaderInfoComponent></HeaderInfoComponent>
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderInfoComponent from "./HeaderInfo.vue";
export default defineComponent({
  components: { HeaderInfoComponent },
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
.header-layout-box {
  .header-layout {
    border-bottom: 1px #ccc solid;
    padding: 10px;
  }
}
</style>
