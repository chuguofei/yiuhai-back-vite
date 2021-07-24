<template>
  <div>
    <a-menu v-model:selectedKeys="currentMenu" mode="horizontal">
      <a-menu-item :key="item.router" v-for="item in menuBarArr">
        <router-link :to="item.router">
          {{ item.label }}
        </router-link>
      </a-menu-item>
    </a-menu>
    <div class="padding-5">
      <!-- <router-view></router-view> -->
      <a-config-provider :locale="zh_CN">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </a-config-provider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, getCurrentInstance } from "vue";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
export default defineComponent({
  data() {
    return {
      zh_CN,
    };
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const currentPath = proxy.$router.currentRoute.value.path;
    const state = reactive({
      menuBarArr: [
        { label: "首页", router: "/blog/home" },
        { label: "文章管理", router: "/blog/article" },
        { label: "分类管理", router: "/blog/category" },
        { label: "标签管理", router: "/blog/tags" },
        { label: "友链", router: "/blog/firend" },
        { label: "快捷导航", router: "/blog/quickNav" },
      ],
    });
    const currentMenu = ref<string[]>([currentPath]); // 当前选中的菜单

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
