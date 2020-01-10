import Vue from 'vue'

import { DEFAULT_THEME } from '../mutation-types'

const app = {
  namespaced: true,
  state: {
    theme: ''
  },
  mutations: {
    TOGGLE_THEME: (state: any, theme: string) => {
      Vue.ls.set(DEFAULT_THEME, theme)
      state.theme = theme
    }
  }
}

export default app
