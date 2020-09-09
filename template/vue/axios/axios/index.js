import axios from 'axios'
import qs from 'qs'

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// interceptors
instance.interceptors.request.use(config => {
  if (config.method.toUpperCase() === 'POST') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  let data = response.data
  // TODO: handler custome error
  // TODO: get token and save token
  return data
}, error => {
  return Promise.reject(error)
})

export default instance
