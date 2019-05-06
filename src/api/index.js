import axios from '@/network/axios'

export const login = async any => {
  return axios.request({
    url: '/login'
  })
}
