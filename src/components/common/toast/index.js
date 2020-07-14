import Toast from './Toast'
const obj = {}
obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.使用new的方式根据组件构造器可以创建一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象手动挂载都某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div,再将div添加到body上面
  document.body.appendChild(toast.$el)
  // 5.将Toast添加到Vue原型上
  Vue.prototype.$toast = toast
}
export default obj
