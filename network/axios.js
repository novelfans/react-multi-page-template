import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8075',
  timeout: 10000
})

instance.interceptors.response.use(
  resp => {
    if (resp.data) {
      return resp.data
    }
    return resp
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance
