import { Axios } from './index'
// 获取产品列表
export const GetGoods = () => {
  return Axios({
    url: '/api/goods',
    method: 'get'
  })
}
// 获取产品评价列表
export const GetMessage = () => {
  return Axios({
    url: '/api/message',
    method: 'get'
  })
}
// 获取产品详情信息
export const GetSeller = () => {
  return Axios({
    url: '/api/seller',
    method: 'get'
  })
}
