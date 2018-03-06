export const getters = {
  getShopInfo (state) {
    return state.shopInfo
  },
  getSumNum (state) {
    return state.sumNum
  },
  getPrice (state) {
    return state.sumPrice
  },
  getShopCat (state) {
    return state.shopCatBool
  },
  getCartBtn (state) {
    return state.cartBtnBool
  },
  getCheckState (state) {
    return state.checkState
  },
  getHasContext (state) {
    return state.hasContext
  }
}
