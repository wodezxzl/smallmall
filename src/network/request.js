import axios from 'axios'

export function request(config) {
  // 1.创建axios实例,配置基本选项
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000,
  })

  // 2.响应拦截
  instance.interceptors.response.use(
    res => {
      // 只接受主要的data数据
      return res.data
    },
    err => {
      console.log(err)
    },
  )

  return instance(config)
}
