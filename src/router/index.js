import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Auth
import LoginView from '../views/LoginView.vue'

// Compartidas
import HomeView from '../views/HomeView.vue'
import SavingsView from '../views/SavingsView.vue'
import LoansView from '../views/LoansView.vue'
import ProfitsView from '../views/ProfitsView.vue'

// Solo socio
import LoanRequestView from '../views/LoanRequestView.vue'

// Solo admin
import MembersView from '../views/MembersView.vue'

// Errores
import Error403View from '../views/Error403View.vue'

const routes = [
  // ── Pública ──────────────────────────────────────────────────────
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { public: true },
  },

  // ── Error ─────────────────────────────────────────────────────────
  {
    path: '/403',
    name: 'forbidden',
    component: Error403View,
    meta: { public: true },
  },

  // ── Compartidas (socio y admin) ───────────────────────────────────
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/ahorros',
    name: 'savings',
    component: SavingsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/prestamos',
    name: 'loans',
    component: LoansView,
    meta: { requiresAuth: true },
  },
  {
    path: '/ganancias',
    name: 'profits',
    component: ProfitsView,
    meta: { requiresAuth: true },
  },

  // ── Solo socio ───────────────────────────────────────────────────
  {
    path: '/solicitar-prestamo',
    name: 'loanRequest',
    component: LoanRequestView,
    meta: { requiresAuth: true, role: 'socio' },
  },

  // ── Solo admin ───────────────────────────────────────────────────
  {
    path: '/admin/socios',
    name: 'members',
    component: MembersView,
    meta: { requiresAuth: true, role: 'admin' },
  },

  // ── Fallback ─────────────────────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * SCRUM-8: Guard global de rutas.
 * - requiresAuth → redirige a /login si no hay token
 * - meta.role → redirige a /403 si el rol no coincide
 * - Si ya autenticado visita /login → redirige al home
 */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Ya autenticado intentando ir al login → redirigir al home
  if (to.meta.public && auth.isAuthenticated) {
    return next('/')
  }

  // Ruta protegida sin autenticación
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }

  // Ruta restringida por rol
  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return next('/403')
  }

  next()
})

export default router
