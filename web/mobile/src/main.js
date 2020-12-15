import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/vant.js'
import Aplayer from 'vue-aplayer'
import VueSocketIO from 'vue-socket.io'
import http from './http'

import '@/assets/scss/style.scss'
import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false

//axios实例
Vue.prototype.$http = http


//全局事件总线
Vue.prototype.$bus = new Vue();

//全局组件
Aplayer.disableVersionBadge = true
Vue.component('aplayer', Aplayer)

//Socket.io
Vue.use(new VueSocketIO({
  // debug: true,
  connection: 'http://localhost:3003'
}))

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
