import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import less from 'less'

Vue.use(less)
Vue.config.productionTip = false
// 事件总线默认没有需要在vue原型上添加(非父子组件的通信)
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
