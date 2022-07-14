import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'TrainHome',
    component: Home,
    meta: { displayName: '首页' }
  },
  {
    path: '/login',
    name: 'TrainLogin',
    component: () => import('../views/Login.vue'),
    meta: { displayName: '登陆页面' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router