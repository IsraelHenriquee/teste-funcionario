import { createRouter, createWebHistory } from 'vue-router'
import TestePage from '../views/TestePage.vue'
import HomeView from '../views/HomeView.vue'
import FuncionariosView from '../views/FuncionariosView.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: '/funcionarios',
        name: 'funcionarios',
        component: FuncionariosView
      },
      {
        path: '/teste',
        name: 'teste',
        component: TestePage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
