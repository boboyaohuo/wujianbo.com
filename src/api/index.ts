import Service from '@/utils/request'

// api
export enum Api {
  // 获取首页单条
  getIndex = '/getIndex',
  // 获取首页数组
  getIndexList = '/getIndexList',
  // 获取349
  getLatestOrder = '/getLatestOrder',
  // 获取tinify
  postTinify = '/postTinify'
}

// 获取首页单条
export function getIndex(params: object) {
  return Service({
    url: Api.getIndex,
    method: 'GET',
    params
  })
}

// 获取首页数组
export function getIndexList() {
  return Service({
    url: Api.getIndexList,
    method: 'GET'
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

// 获取tinify
export function postTinify(data: object) {
  return Service({
    url: Api.postTinify,
    method: 'POST',
    data
  })
}
