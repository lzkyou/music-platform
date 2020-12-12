import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import axios from 'axios'
import Aplayer from 'vue-aplayer'

import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/'
})


Vue.component('aplayer', Aplayer)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
