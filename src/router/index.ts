import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "/@/components/layout/Layout.vue";

const route = [
  {
    path: "/login",
    name: "Login",
    component: () => import("/@/views/system/login/index.vue"),
  },
  {
    path: "/",
    component: () => import("/@/views/index.vue"),
  },
  {
    path: "/blog",
    component: () => import("/@/components/layout/Layout.vue"),
    meta: { title: "博客" },
    redirect: "/blog/home",
    children: [
      {
        path: "home",
        meta: { title: "首页" },
        component: () => import("/@/views/blog/Home.vue"),
      },
      {
        path: "article",
        meta: { title: "文章管理" },
        component: () => import("/@/views/blog/Article/index.vue"),
      },
      {
        path: "category",
        meta: { title: "分类管理" },
        component: () => import("/@/views/blog/Category.vue"),
      },
      {
        path: "tags",
        meta: { title: "标签管理" },
        component: () => import("/@/views/blog/Tags.vue"),
      },
      {
        path: "firend",
        meta: { title: "友链" },
        component: () => import("/@/views/blog/Firend.vue"),
      },
      {
        path: "quickNav",
        meta: { title: "快捷导航" },
        component: () => import("/@/views/blog/QuickNav/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: route,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
