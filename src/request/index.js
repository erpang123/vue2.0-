export const Axios = axios.create({
  baseURL: '/',
  timeout: 30000,
  responseType: 'json',
    // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true
})
// 添加请求拦截器
Axios.interceptors.request.use(config => {
  config.method = config.method || 'get'
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  }
  config.headers = headers
  return config
}, err => {
  alert(err)
  return Promise.reject(err)
})
// 添加响应拦截器
Axios.interceptors.response.use(res => {
  const { data } = res
  // const { body } = data
    // const { errorCode, errorMsg } = body
  return data
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址未找到: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  if (err.response) {
    alert(err.response.status + ':' + err.message)
  } else {
    alert(err)
  }
  return Promise.reject(err)
})
