import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    title: ' ',
    artist: '未在播放',
    src: ' ',
    pic: ' ',
    usersNow: ' ',
    historyChat: [],
    user: {}
  }
})

export default store