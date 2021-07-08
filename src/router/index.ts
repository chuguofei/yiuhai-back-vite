import { createRouter, createWebHashHistory } from 'vue-router';


const route = [
  { path: '/', component: () => import('/@/views/blog/Home.vue') },
  { path: '/article', component: () => import('/@/views/blog/Article/index.vue') },
  { path: '/category', component: () => import('/@/views/blog/Category.vue') },
  { path: '/tags', component: () => import('/@/views/blog/Tags.vue') },
  { path: '/firend', component: () => import('/@/views/blog/Firend.vue') },
]


export default createRouter({
  history: createWebHashHistory(),
  routes: route
})
