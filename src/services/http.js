import axios from 'axios'
import { AppError } from '../services/error'

function throwIfHasError (response) {
  if (response.data.statusCode !== 200) {
    throw new AppError({
      name: 'HttpError',
      message: 'error in http service'
    })
  }
}

const http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {}
})

http.interceptors.request.use((config) => {
  // request interceptors here
  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(response => {
  // response interceptors here
  return response
}, (error) => {
  return Promise.reject(error)
})

export default {
  async request (config) {
    try {
      const response = await http.request(config)
      throwIfHasError(response)
      return response.data.payload
    } catch (error) {
      const customError = {
        status: error?.response?.status || 500,
        message: error?.response?.statusText || error?.response?.data?.statusMessage,
        response: {data: error?.response?.data}
      }
      throw customError
    }
  },

  get (config) {
    const getConf = Object.assign({}, config, { method: 'get' })
    return this.request(getConf)
  },

  post (config) {
    const postConf = Object.assign({}, config, { method: 'post' })
    return this.request(postConf)
  },

  put (config) {
    const putConf = Object.assign({}, config, { method: 'put' })
    return this.request(putConf)
  },

  patch (config) {
    const putConf = Object.assign({}, config, { method: 'patch' })
    return this.request(putConf)
  },

  delete (config) {
    const deleteConf = Object.assign({}, config, { method: 'delete' })
    return this.request(deleteConf)
  }
}
