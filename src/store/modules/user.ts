import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { login } from '@/api/user'

const user: any = {
  namespaced: true,
  state: {
    token: 'token'
  },
  mutations: {
    SET_TOKEN: (state: any, token: string | number) => {
      state.token = token
    }
  },
  actions: {
    // 登录
    Login({ commit }: any, userInfo: object) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response: any) => {
            const result = response.data
            Vue.$ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
