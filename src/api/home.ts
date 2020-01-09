import { axios } from '@/utils/request'
// import qs from 'qs'

/**
 *
 * @param parameter
 * @returns {*}
 */
export function login(parameter: object) {
  return axios({
    url: 'https://www.baidu.com/sugrec',
    method: 'POST',
    data: parameter
  })
}
