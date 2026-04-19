import axios from 'axios'

// 仅用于第三方 API 请求
const request = axios.create({
  timeout: 10000,
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default request
