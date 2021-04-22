import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import TOOL from './utils/util'
import './assets/js/live2d.min.js'

// 引入全局样式
import '@/assets/style/index.styl'

// 引入主题样式
import '@/assets/style/theme/index.css'

// element-ui 按需加载 css文件在cdn引入
import '@/core/element-ui-use.ts'

// 引入vue.$ls
import '@/core/ls-use.ts'

// 引入vue挂载filter
import '@/utils/filter' // global filter

// 环境log
console.log(`当前环境--${process.env.NODE_ENV}--${process.env.VUE_APP_API_BASE_URL}`)

// vue-lazyload init
Vue.use(VueLazyload, {
  preLoad: 1.5,
  attempt: 3
})

Vue.config.productionTip = false

// api util 挂载
Vue.prototype.$TOOL = TOOL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
