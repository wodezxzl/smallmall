import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import less from 'less'
import toast from '@/components/common/toast/index'

import fastclick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'

// 解决移动端300ms延迟
fastclick.attach(document.body)

Vue.use(less)
// 使用toast插件(遮罩弹窗)
Vue.use(toast)
// 使用图片懒加载
Vue.use(VuelazyLoad)

Vue.config.productionTip = false

// 事件总线默认没有需要在vue原型上添加(非父子组件的通信)
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
