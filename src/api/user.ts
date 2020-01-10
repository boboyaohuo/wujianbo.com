import { axios } from '@/utils/request'
// import qs from 'qs'

/**
 *
 * @param parameter
 * @returns {*}
 */
export function login(parameter: object) {
  return new Promise((resolve: any, reject: any) => {
    const res: any = { status: 0, data: { token: 'token' } }
    resolve(res)
  })
}
