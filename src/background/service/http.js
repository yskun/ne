import axios from 'axios'
import qs from 'qs'
import cache from './cache'

export class Http {
  lockConfig = false
  constructor() {
    this.ins = axios.create()
    this.ins.interceptors.response.use(response => {
      return response
    }, error => {
      this._authErrorHandler(error.response)
      return error
    })
  }

  setConfig(config = {}) {
    if (this.lockConfig) {
      console.warn(`Http类lockConfig被打开`)
      return
    }
    this.ins.defaults = config
  }

  get(url, param = {}, config = {}) {
    config.params = param
    config.params.token = cache.getToken()
    return this.ins.get(url, config)
  }

  post(url, data = {}, config = {}) {
    const tokenUrl = `${url}?token=${cache.getToken()}`
    return this.ins.post(tokenUrl, data, config)
  }

  delete(url, param = {}, config = {}) {
    config.params = param
    const tokenUrl = `${url}?token=${cache.getToken()}`
    return this.ins.delete(tokenUrl, config)
  }

  put(url, body = {}, config = {}) {
    const tokenUrl = `${url}?token=${cache.getToken()}`
    return this.ins.put(tokenUrl, body, config)
  }

  toFormData(obj) {
    let form = new FormData()
    for (let o in obj) {
      if (obj.hasOwnProperty(o)) {
        form.set(o, obj[o])
      }
    }
    return form
  }

  _authErrorHandler(response) {
    if (!response || !response.status) {
      window.$message.error('系统错误')
      return
    }
    const errorCode = response.status
    if (errorCode === 401) {
      cache.clear()
      window.$message.error('未登录')
      location.replace('/')
    } else if (errorCode === 403) {
      window.$message.error('没有访问权限')
    } else {
      window.$message.error('系统错误')
    }
  }

  sendFile(url, data = {}, config = {}) {
    config.url = url
    const formData = new FormData()
    for (const s in data) {
      if (data.hasOwnProperty(s)) {
        formData.append(s, data[s])
      }
    }
    config.data = formData
    config.method = 'post'

    return this.ins.request(config)
  }

  errorHandler(resp) {
    if (!resp.data) {
      return false
    } else if (resp.data.F_responseNo !== 10000) {
      this.$message.error(resp.data.F_responseMsg)
      return false
    }
    return true
  }
}

export const http = new Http()
http.lockConfig = true
