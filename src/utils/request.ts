// import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'
// 创建 axios 实例
const service = axios.create({
  baseURL: '',
  withCredentials: false,
  timeout: 6000 // 请求超时时间
})

const err = (error: any) => {
  if (error.response) {
    const { status, data } = error.response
    if (status === 400 || status === 403 || status === 404 || status === 500 || status === 999) {
      console.log(status, data)
    }
  } else {
    console.log(error)
  }
  return Promise.resolve(error.response)
}

// request interceptor
service.interceptors.request.use((config: Object) => {
  console.log(config)
  // const token = Vue.ls.get(ACCESS_TOKEN)
  // if (token) {
  //   config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  // }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response: any) => {
  if (!response.data) {
    response.data = {
      status: -1,
      data: null,
      message: '请求服务器失败，请稍后再试'
    }
  }
  if (response.data.status !== 0) {
    console.log(response.data.message)
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue: any) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }
