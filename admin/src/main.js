import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

import router from './router'

import http from './http'


Vue.config.productionTip = false

Vue.prototype.$http = http
window.axios = http

Vue.use(Avue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
