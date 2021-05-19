import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupVuex } from './store'
import './assets/stylus/index.styl'
import 'amfe-flexible'

const app = createApp(App)

// 安装router
setupRouter(app)

// 安装store
setupVuex(app)

router.isReady().then(() => {
  app.mount('#app', true)
})
