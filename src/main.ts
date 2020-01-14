import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

// 引入全局样式
import '@/assets/style/index.styl'

// element-ui 按需加载 css文件在cdn引入
import '@/core/element-ui-use.ts'

// 引入vue.$ls
import '@/core/ls-use.ts'

// 引入vue挂载filter
import '@/utils/filter' // global filter

// vue-lazyload init
Vue.use(VueLazyload, {
  preLoad: 1.5,
  attempt: 3
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
