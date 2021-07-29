<template>
  <div>首页=-{{ _sysUserStore.counter }}</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { sysUserStore } from "/@/store/modules/sys-user";
export default defineComponent({
  setup() {
    const _sysUserStore = sysUserStore();

    return {
      _sysUserStore: _sysUserStore,
    };
  },
});
</script>
