export const mutations = {
  ShopInfo (state, obj) {
    state.shopInfo = obj
  },
  sumNum (state, num) {
    state.sumNum = num
  },
  sumPrice (state, num) {
    state.sumPrice = num
  },
  ShopCat (state, bool) {
    state.shopCatBool = bool
  },
  CartBtn (state, bool) {
    state.cartBtnBool = bool
  },
  CheckState (state, num) {
    state.checkState = num
  },
  HasContext (state, bool) {
    state.hasContext = bool
  }
}
