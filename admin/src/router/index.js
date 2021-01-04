import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import ResourceCrud from '../views/ResourceCrud.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { name: 'rest', path: '/:resource/list', component: ResourceCrud, props: true }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: { isPublic: true }
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
