const getters = {
  theme: (state: any) => state.app.theme,
  tokenB: (state: any) => `${state.user.token}波`
}

export default getters
