import { get, postData } from '@/utils/request'

const api: any = {
  // 获取首页数据
  getIndex: 'getIndex',
  // 增加首页数据
  addIndex: 'addIndex'
}

/**
 * 获取首页数据
 * @param parameter
 * @returns {*}
 */
export const getIndex = () => {
  return get(api.getIndex)
}

/**
 * 增加首页数据
 * @param parameter
 * @returns {*}
 */
export const addIndex = (params: any) => {
  return postData(api.addIndex, params)
}
