import Vue from 'vue'
import Router from 'vue-router'
import TabBar from './views/TabBar.vue'
import Home from './views/Home/Home.vue'
import Discover from './views/Discover.vue'
import Chat from './views/Chat.vue'
import Profile from './views/Profile.vue'

import Desc from './components/Desc.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TabBar,
      children: [
        { path: '/', name: 'homeContent', component: Home, },
        { path: '/discover', name: 'Discover', component: Discover },
        { path: '/chat', name: 'Chat', component: Chat },
        { path: '/profile', name: 'Profile', component: Profile }
      ]
    },
    { path: '/:res/desc/:id', name: 'desc', component: Desc, props: true }
  ]
})
