import { get } from '@/utils/request'

const api: any = {
  // 获取首页数据
  getIndex: 'getIndex'
}

/**
 * 获取首页数据
 * @param parameter
 * @returns {*}
 */
export const getIndex = () => {
  return get(api.getIndex)
}
