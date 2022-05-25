import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../App.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomePage.vue')
      },
      {
        path: 'filters',
        name: 'Filters',
        component: () => import('../views/Filters.vue')
      },
      {
        path: 'country/:id',
        name: 'Country',
        component: () => import('../views/Country.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
