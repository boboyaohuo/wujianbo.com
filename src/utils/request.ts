// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
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
service.interceptors.request.use((config: any) => {
  // config.headers['Set-Cookie'] = 'widget_session=abc123'
  // config.headers['SameSite'] = 'none'
  // config.headers['Secure']

  // const token = Vue.$ls.get(ACCESS_TOKEN)
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

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params: {} = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url: string, params: {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function postData(url: string, params: any) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export { get, post, postData }
