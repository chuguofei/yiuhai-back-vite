<template>
  <div>
    首页=-
    {{ store.msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "/@/store/index";
export default defineComponent({
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
});
</script>