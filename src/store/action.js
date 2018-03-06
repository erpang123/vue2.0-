export const actions = {
  // 添加商品列表
  setShopInfo ({ commit }, obj) {
    commit('ShopInfo', obj)
  },
  // 增加总数量
  setNum ({ commit }, num) {
    commit('sumNum', num)
  },
  // 增加总价格
  setPrice ({ commit }, num) {
    commit('sumPrice', num)
  },
  // 是否显示购物车
  setShopCat ({ commit }, bool) {
    commit('ShopCat', bool)
  },
  // 是否显示购物车按钮
  setCartBtn ({ commit }, bool) {
    commit('CartBtn', bool)
  },
  // 筛选条件
  setCheckState ({ commit }, num) {
    commit('CheckState', num)
  },
  // 是否显示内容
  setHasContext ({ commit }, bool) {
    commit('HasContext', bool)
  }
}
