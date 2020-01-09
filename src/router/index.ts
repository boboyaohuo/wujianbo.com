import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: { name: 'home' }
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/Form/Form.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
