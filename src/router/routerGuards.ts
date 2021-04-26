import { Router } from 'vue-router'

export function createRouterGuards(router: Router) {
  router.beforeEach((to: any, _from: any, next: any) => {
    document.title = to?.meta.title || document.title
    next()
  })
}
