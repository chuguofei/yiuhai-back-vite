import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '/@/components/layout/Layout.vue';

const route = [
  {
    path: "/login",
    name: "Login",
    component: () => import('/@/views/framework/login')
  },
  {
    path: "/",
    component: () => import('/@/views/index')
  },
  {
    path: "/blog",
    component: Layout,
    meta: { title: "博客" },
    redirect: "/blog/home",
    children: [
      { path: 'home', meta: { title: "首页" }, component: () => import('/@/views/blog/Home.vue') },
      { path: 'article', meta: { title: "文章管理" }, component: () => import('/@/views/blog/Article/index.vue') },
      { path: 'category', meta: { title: "分类管理" }, component: () => import('/@/views/blog/Category.vue') },
      { path: 'tags', meta: { title: "标签管理" }, component: () => import('/@/views/blog/Tags.vue') },
      { path: 'firend', meta: { title: "友链" }, component: () => import('/@/views/blog/Firend.vue') },
      { path: 'quickNav', meta: { title: "快捷导航" }, component: () => import('/@/views/blog/QuickNav/index.vue') },
    ]
  }
]


export default createRouter({
  history: createWebHashHistory(),
  routes: route
})
