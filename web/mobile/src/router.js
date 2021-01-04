import Vue from 'vue'
import Router from 'vue-router'
import TabBar from './components//common/TabBar.vue'
import Home from './views/Home/Home.vue'
import Discover from './views/Discover/Discover.vue'
import Chat from './views/Chat.vue'
import Profile from './views/Profile.vue'
import Album from './views/Album.vue'
import Radio from './views/Radio/Radio.vue'

import Desc from './components/content/Desc.vue'

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
        { path: '/profile', name: 'Profile', component: Profile },
        { path: '/albums', name: 'album', component: Album },
        { path: '/radios', name: 'radio', component: Radio },
      ]
    },
    { path: '/:res/desc/:id', name: 'desc', component: Desc, props: true },
  ]
})
