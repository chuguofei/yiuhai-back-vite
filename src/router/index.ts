import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '/@/components/layout/Layout.vue';

const route = [
  {
    path: "/login",
    name: "Login",
    component: () => import('/@/views/system/login')
  },
  {
    path: "/",
    component: () => import('/@/views/index')
  },
  {
    path: "/blog",
    component: Layout,
    redirect: "/blog/home",
    children: [
      { path: 'home', component: () => import('/@/views/blog/Home.vue') },
      { path: 'article', component: () => import('/@/views/blog/Article/index.vue') },
      { path: 'category', component: () => import('/@/views/blog/Category.vue') },
      { path: 'tags', component: () => import('/@/views/blog/Tags.vue') },
      { path: 'firend', component: () => import('/@/views/blog/Firend.vue') },
      { path: 'quickNav', component: () => import('/@/views/blog/QuickNav/index.vue') },
    ]
  }
]


export default createRouter({
  history: createWebHashHistory(),
  routes: route
})
