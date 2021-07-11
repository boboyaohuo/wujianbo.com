import Service from '@/utils/request'

// api
export enum Api {
  // 获取险种详情
  getIndex = '/getIndex',
  // 获取349
  getLatestOrder = '/getLatestOrder'
}

// 获取详情
export function getIndex(params: object) {
  return Service({
    url: Api.getIndex,
    method: 'GET',
    params
  })
}

// 获取详情
export function getLatestOrder(params: object) {
  return Service({
    url: Api.getLatestOrder,
    method: 'POST',
    params
  })
}
