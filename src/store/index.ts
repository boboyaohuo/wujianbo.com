import Vue from 'vue'
import Vuex from 'vuex'

// 引入所有vuex模块
import app from './modules/app'
import user from './modules/user'

// 引入
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
