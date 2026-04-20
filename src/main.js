import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// SCRUM-10: Restaurar sesión desde localStorage al cargar la app
const auth = useAuthStore()
auth.fetchCurrentUser().finally(() => {
  app.mount('#app')
})
