import axios from 'axios'

const service = axios.create({
  baseURL: 'http://192.168.233.128:5000' + '/api',
  timeout: 30000
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
)

// http response 拦截器
service.interceptors.response.use(
  response => {
    if (response.data.statusCode === 100000) {
      return response
    } else if (response.data.statusCode === undefined) {
      return response
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
