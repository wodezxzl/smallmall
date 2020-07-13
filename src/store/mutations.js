export const mutations = {
  // 将每个函数的功能写少,方便跟踪不同的改变数据行为

  // 1.增加购买数量
  addCount(state, payload) {
    payload.count += 1
  },
  // 2.添加新商品
  addToCart(state, payload) {
    state.cartLists.push(payload)
  },
}
