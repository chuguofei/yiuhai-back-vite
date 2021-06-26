import { createRouter, createWebHashHistory } from 'vue-router';


const route = [
    { path: '/',  component: () => import('@/views/Home.vue') },
    { path: '/article',  component: () => import('@/views/Article.vue') },
    { path: '/category',  component: () => import('@/views/Category.vue') },
    { path: '/tags',  component: () => import('@/views/Tags.vue') },
    { path: '/firend',  component: () => import('@/views/Firend.vue') },
]


export default createRouter({
  history: createWebHashHistory(),
  routes: route
})
