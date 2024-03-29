import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './routerGuards'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    meta: {}
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('@/views/Form.vue'),
    meta: {}
  },
  {
    path: '/tinify',
    name: 'Tinify',
    component: () => import('@/views/Tinify.vue'),
    meta: {
      title: '波波牌-Tinify'
    }
  },
  {
    path: '/wedding',
    name: 'Weeding',
    component: () => import('@/views/Wedding.vue'),
    meta: {
      title: '婚礼海报'
    }
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(String(process.env.VUE_APP_BASE_URL)),
  routes
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
