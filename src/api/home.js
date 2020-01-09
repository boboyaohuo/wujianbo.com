import { axios } from '@/utils/request'
import qs from 'qs'

/**
 *
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: 'https://www.baidu.com/sugrec',
    method: 'get',
    params: parameter
  })
}
