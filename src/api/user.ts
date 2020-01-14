import { get } from '@/utils/request'

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
