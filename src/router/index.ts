import Vue from 'vue'
import VueRouter from 'vue-router'
import page from './page'
import Component from 'vue-class-component'

Vue.use(VueRouter)

Component.registerHooks([
  'beforeRouteEnter', //进入路由之前
  'beforeRouteLeave', //离开路由之前
  'beforeRouteUpdate'
])

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...page],
  scrollBehavior(to: any, from: any, savedPosition: any) {
    // 切换路由后滚动到顶部或者锚点
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

router.beforeEach((to: any, from: any, next: any) => {
  if (to.meta.title) {
    // 设置title
    document.title = to.meta.title
  }
  next()
})

export default router
