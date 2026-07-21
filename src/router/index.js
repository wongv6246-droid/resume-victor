import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Portfolio from '../views/Portfolio.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: '个人简介' } },
  { path: '/portfolio', name: 'Portfolio', component: Portfolio, meta: { title: '作品集' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
