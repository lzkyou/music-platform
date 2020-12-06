import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

import axios from 'axios'
import router from './router'


Vue.config.productionTip = false

const http = axios.create({
  baseURL: 'http://localhost:3002/'
})
Vue.prototype.$http = http
window.axios = http

Vue.use(Avue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
