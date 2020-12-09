import Vue from 'vue'
import Router from 'vue-router'
import TabBar from './views/TabBar.vue'
import Home from './views/Home.vue'
import Discover from './views/Discover.vue'
import Chat from './views/Chat.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TabBar,
      children: [
        { path: '/', component: Home },
        { path: '/discover', component: Discover },
        { path: '/chat', component: Chat },
        { path: '/profile', component: Profile }
      ]
    },
  ]
})
