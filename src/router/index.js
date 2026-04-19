// import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '../stores/auth'

// // Auth
// import LoginView from '../views/LoginView.vue'

// // Compartidas
// import HomeView from '../views/HomeView.vue'
// import SavingsView from '../views/SavingsView.vue'
// import LoansView from '../views/LoansView.vue'
// import ProfitsView from '../views/ProfitsView.vue'

// // Socio
// import LoanRequestView from '../views/LoanRequestView.vue'

// // Admin
// import MembersView from '../views/MembersView.vue'

// const authMiddleware = (to, from, next) => {
//   const auth = useAuthStore()
//   if (!auth.isAuthenticated) return next('/login')
//   return next()
// }

// const adminMiddleware = (to, from, next) => {
//   const auth = useAuthStore()
//   if (!auth.isAuthenticated) return next('/login')
//   if (auth.user?.role !== 'admin') return next('/')
//   return next()
// }

// const routes = [
//   // Pública
//   {
//     path: '/login',
//     name: 'login',
//     component: LoginView
//   },

//   // Compartidas (socio y admin)
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView,
//     beforeEnter: authMiddleware
//   },
//   {
//     path: '/ahorros',
//     name: 'savings',
//     component: SavingsView,
//     beforeEnter: authMiddleware
//   },
//   {
//     path: '/prestamos',
//     name: 'loans',
//     component: LoansView,
//     beforeEnter: authMiddleware
//   },
//   {
//     path: '/ganancias',
//     name: 'profits',
//     component: ProfitsView,
//     beforeEnter: authMiddleware
//   },

//   // Solo socio
//   {
//     path: '/solicitar-prestamo',
//     name: 'loanRequest',
//     component: LoanRequestView,
//     beforeEnter: authMiddleware
//   },

//   // Solo admin
//   {
//     path: '/admin/socios',
//     name: 'members',
//     component: MembersView,
//     beforeEnter: adminMiddleware
//   },

//   // Fallback
//   {
//     path: '/:pathMatch(.*)*',
//     redirect: '/login'
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import SavingsView from '../views/SavingsView.vue'
import LoansView from '../views/LoansView.vue'
import ProfitsView from '../views/ProfitsView.vue'
import LoanRequestView from '../views/LoanRequestView.vue'
import MembersView from '../views/MembersView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/', name: 'home', component: HomeView },
  { path: '/ahorros', name: 'savings', component: SavingsView },
  { path: '/prestamos', name: 'loans', component: LoansView },
  { path: '/ganancias', name: 'profits', component: ProfitsView },
  {
    path: '/solicitar-prestamo',
    name: 'loanRequest',
    component: LoanRequestView,
  },
  { path: '/admin/socios', name: 'members', component: MembersView },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
