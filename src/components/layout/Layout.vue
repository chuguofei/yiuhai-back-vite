<template>
  <a-layout style="width: 100%; height: 100%">
    <a-layout class="flex height--100">
      <a-layout-sider
        :style="{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }"
      >
        <div class="text-center">
          <img src="../../assets/logo.png" width="130" />
        </div>
        <MenuComponent :menuBarArr="menuBarArr"></MenuComponent>
      </a-layout-sider>
      <a-layout :style="{ marginLeft: '200px', width: `calc(100% - 200px)` }">
        <a-layout-header :style="{ background: '#fff', padding: 0 }">
          <BreadcrumbComponent :breadCrumbArray="breadCrumbArray"></BreadcrumbComponent>
        </a-layout-header>
        <a-layout-content
          :style="{
            background: '#fff',
            margin: 0,
            minHeight: '280px',
            width: '100%',
            paddingTop: '10px',
          }"
        >
          <a-config-provider :locale="zh_CN">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </a-config-provider>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  getCurrentInstance,
  onMounted,
  watch,
  computed,
} from "vue";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
// components
import MenuComponent from "./Menu.vue";
import BreadcrumbComponent from "./Breadcrumb.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { MenuComponent, BreadcrumbComponent },
  data() {
    return {
      zh_CN,
    };
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const currentPath = proxy.$router.currentRoute.value.path;

    // 获取路由
    const Router = useRouter();

    // 面包屑
    const breadCrumbComputed = () => {
      let matched = Router.currentRoute.value.matched.filter(
        (item) => item.meta && item.meta.title
      );
      breadCrumbArray.value = matched;
    };

    const breadCrumbArray = ref<Array<any>>([]);
    watch(
      () => Router.currentRoute.value,
      (val) => {
        breadCrumbComputed();
      }
    );

    onMounted(() => {
      breadCrumbComputed();
    });

    const state = reactive({
      menuBarArr: [
        {
          label: "博客",
          children: [
            { label: "首页", router: "/blog/home" },
            { label: "文章管理", router: "/blog/article" },
            { label: "分类管理", router: "/blog/category" },
            { label: "标签管理", router: "/blog/tags" },
            { label: "友链", router: "/blog/firend" },
            { label: "快捷导航", router: "/blog/quickNav" },
          ],
        },
        {
          label: "测试",
          router: "/blog/quickNav",
        },
      ],
    });
    const currentMenu = ref<string[]>([currentPath]); // 当前选中的菜单

    return {
      ...toRefs(state),
      currentMenu,
      breadCrumbArray,
    };
  },
});
</script>

<style scope>
.ant-layout-sider {
  background: #fff !important;
  border-right: 1px #f0f0f0 solid;
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 0px solid #f0f0f0 !important;
}
</style>
