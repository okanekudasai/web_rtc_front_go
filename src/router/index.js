import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/temp',
    name: 'temp',
    component: () => import('@/views/TempView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
