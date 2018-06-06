import axios from 'axios'
import {getCsrfToken} from './common'
import history from './history'
import * as storage from '../store/localstorage'
axios.defaults.headers['x-csrf-token'] = getCsrfToken()

export default function request (config) {
  if (config.token) {
    config.headers = {
      'x-access-token': storage.getItem('JWTTOKEN')
    }
  }
  delete config.token
  const baseConfig = {
    baseURL: 'http://localhost:3000',
    validateStatus: function (status) {
      return status >= 200 && status < 300
    }
  }
  const mergedConfig = Object.assign({}, baseConfig, config)
  return new Promise ((resolve, reject) => {
    axios(mergedConfig)
      .then(response => {
        resolve(response.data)
      })
      .catch (error => {
        const status = error.response.status
        switch (status) {
          case 401:
            reject({
              status
            })
            history.push('/login')
            return
          default:
            reject({
              status,
              msg: error.msg
            })
        }
      })
  })
} 