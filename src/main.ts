import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/style/reset.css'

// element-ui 按需加载 css文件在cdn引入
import '@/core/element-ui-use.ts'

// 引入vue.$ls
import '@/core/ls-use.ts'

import '@/utils/filter' // global filter

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
