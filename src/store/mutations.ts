export default {
  addPersistedsData(state: any, data: { id: number; res: string }): void {
    state.persistedsData[data.id] = data.res
  }
}
