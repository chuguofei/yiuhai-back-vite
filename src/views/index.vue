<template>
  <div>首页=-
  <div>
     {{ _sysUserStore.token }}
    </div> 
    <div>
      {{ _sysUserStore.userInfo }}
    </div>
  </div>
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
