import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/vant.js'
import Aplayer from 'vue-aplayer'
import VueSocketIO from 'vue-socket.io'
import {http, upload} from './http'

import '@/assets/scss/style.scss'
import '@/assets/icon/iconfont.css'


import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc') // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
Vue.prototype.dayjs = dayjs

Vue.config.productionTip = false

//axios实例
Vue.prototype.$http = http
Vue.prototype.$upload = upload

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
