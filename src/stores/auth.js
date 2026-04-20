import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

/**
 * SCRUM-9: Store centralizado de autenticación.
 * Gestiona usuario, token y estado de sesión en toda la app.
 */
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // Estado — token persiste en localStorage (SCRUM-10)
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  /**
   * SCRUM-9: login — llama al API, guarda token y datos del usuario.
   * @param {string} email
   * @param {string} password
   */
  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    token.value = data.accessToken
    user.value = data.user
    localStorage.setItem('token', data.accessToken)
    router.push('/')
  }

  /**
   * SCRUM-9: logout — limpia estado, localStorage y redirige al login.
   */
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  /**
   * SCRUM-10: fetchCurrentUser — verifica el token al cargar la app.
   * Decodifica el JWT guardado en localStorage para restaurar la sesión.
   * Si el token está expirado, limpia la sesión.
   */
  async function fetchCurrentUser() {
    const savedToken = localStorage.getItem('token')
    if (!savedToken) return

    try {
      // Verificar token haciendo refresh-token (valida con el servidor)
      const { data } = await api.post('/auth/refresh-token')
      token.value = data.accessToken
      localStorage.setItem('token', data.accessToken)

      // Decodificar payload del token para obtener datos del usuario
      const payload = JSON.parse(atob(data.accessToken.split('.')[1]))
      user.value = { id: payload.id, email: payload.email, role: payload.role }
    } catch {
      // Token expirado o inválido → limpiar sesión
      logout()
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    fetchCurrentUser,
  }
})
