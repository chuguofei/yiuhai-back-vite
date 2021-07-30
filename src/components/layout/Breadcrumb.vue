<template>
  <a-layout-header>
    <div style="border: 1px red solid">
      <div>
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item v-for="item in breadCrumbArray">{{
            item.meta.title
          }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            Button
          </a-button>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
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