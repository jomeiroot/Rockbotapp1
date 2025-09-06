import { createRouter, createWebHistory } from 'vue-router'
import PortfolioPage from '../components/PortfolioPage.vue'
import AppDetail from '../components/AppDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Portfolio',
    component: PortfolioPage
  },
  {
    path: '/app/:id',
    name: 'AppDetail',
    component: AppDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
