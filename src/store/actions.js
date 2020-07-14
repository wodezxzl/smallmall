export const actions = {
  // 第一个参数为content(与store实例具有相同方法和属性),采用了对象的解构
  addCart({ state, commit }, payload) {
    return new Promise(resolve => {
      let oldProduct = state.cartLists.find(item => payload.iid === item.iid)
      // 如果之前就有了这个对象,就将数量加一,否则添加到数组并且count设置为一
      if (oldProduct) {
        commit('addCount', oldProduct)
        resolve(1)
      } else {
        payload.count = 1
        commit('addToCart', payload)
        resolve(2)
      }
    })
  },
}
