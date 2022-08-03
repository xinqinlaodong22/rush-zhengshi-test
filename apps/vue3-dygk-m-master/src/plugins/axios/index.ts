import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://apiv4.diyigaokao.com/',
  timeout: 60000,
  withCredentials: true //跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
})

instance.interceptors.request.use(config => {})
