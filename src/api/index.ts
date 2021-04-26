import Service from '@/utils/request'

// api
export enum Api {
  // 获取险种详情
  getIndex = '/getIndex'
}

// 获取详情
export function getIndex(params: object) {
  return Service({
    url: Api.getIndex,
    method: 'GET',
    params
  })
}
