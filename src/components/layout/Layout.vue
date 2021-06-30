<template>
  <a-menu v-model:selectedKeys="currentMenu" mode="horizontal">
    <a-menu-item :key="item.router" v-for="item in menuBarArr">
      <router-link :to="item.router">
        {{ item.label }}
      </router-link>
    </a-menu-item>
  </a-menu>
  <div class="padding-5">
    <!-- <transition name="transitionRouter" mode="out-in">
      <router-view />
    </transition> -->
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      menuBarArr: [
        { label: "首页", router: "/" },
        { label: "文章管理", router: "/article" },
        { label: "分类管理", router: "/category" },
        { label: "标签管理", router: "/tags" },
        { label: "友链", router: "/firend" },
      ],
    });
    const currentMenu = ref<string[]>(["/article"]); // 当前选中的菜单

    return {
      ...toRefs(state),
      currentMenu,
    };
  },
});
</script>

<style>
.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 0.1s ease-in;
}

.transitionRouter-enter,
.transitionRouter-leave {
  transform: translate3d(100%, 0, 0);
}
</style>
