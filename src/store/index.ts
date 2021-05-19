import { App } from 'vue'
import { createStore } from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

const vuex = createStore({
  state,
  mutations,
  actions
})

export function setupVuex(app: App) {
  app.use(vuex)
}
