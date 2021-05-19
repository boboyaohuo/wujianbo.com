import { getIndex } from '@/api/index'
export default {
  async getIndex({ state, commit }: any, id: number | string) {
    return await getIndex({ id })
  }
}
