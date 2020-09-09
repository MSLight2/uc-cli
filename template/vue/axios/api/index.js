import axios from '@/axios/index'

export function api (params) {
  return axios({
    url: '/api',
    method: 'get',
    params: params
  })
}
