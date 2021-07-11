import axios from 'axios'
// create an axios instance
const Service = axios.create({
  baseURL: process.env.VUE_APP_API_URL as string, // url = base api url + request url
  withCredentials: true,
  timeout: 10000 // request timeout
})

// request拦截器 request interceptor
Service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error.response || error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
Service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status && res.status !== 200) {
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default Service
