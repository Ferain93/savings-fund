<template>
  <main class="login-page">
    <div class="login-card">
      <!-- Logo / Marca -->
      <div class="login-brand">
        <div class="login-brand__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07C9.02 16.48 7.5 15.11 7 13h2.1c.41 1.17 1.52 2 2.9 2s2.49-.83 2.9-2c.48-1.39-.39-3-2.9-3-2.96 0-5-1.68-5-4 0-1.93 1.48-3.55 3.5-3.93V5h2v1.07C14.98 6.52 16.5 7.89 17 10h-2.1c-.41-1.17-1.52-2-2.9-2s-2.49.83-2.9 2c-.48 1.39.39 3 2.9 3 2.96 0 5 1.68 5 4 0 1.93-1.48 3.55-3.5 3.93z"/>
          </svg>
        </div>
        <h1 class="login-brand__title">Fondo de Ahorro</h1>
        <p class="login-brand__subtitle">Inicia sesión para continuar</p>
      </div>

      <!-- Alerta de error -->
      <transition name="slide-down">
        <div v-if="errorMessage" class="login-error" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </transition>

      <!-- Formulario -->
      <form class="login-form" @submit.prevent="handleSubmit" novalidate>
        <!-- Email -->
        <div class="form-group" :class="{ 'form-group--error': errors.email }">
          <label class="form-label" for="login-email">Correo electrónico</label>
          <div class="form-input-wrapper">
            <svg class="form-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"/>
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"/>
            </svg>
            <input
              id="login-email"
              v-model.trim="form.email"
              type="email"
              class="form-input"
              placeholder="usuario@ejemplo.com"
              autocomplete="email"
              @blur="validateEmail"
            />
          </div>
          <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
        </div>

        <!-- Contraseña -->
        <div class="form-group" :class="{ 'form-group--error': errors.password }">
          <label class="form-label" for="login-password">Contraseña</label>
          <div class="form-input-wrapper">
            <svg class="form-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
            <input
              id="login-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="••••••••"
              autocomplete="current-password"
              @blur="validatePassword"
            />
            <button
              type="button"
              class="form-toggle-password"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clip-rule="evenodd" />
                <path d="M10.748 13.93l2.523 2.523a10.003 10.003 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L4.462 7.643a4 4 0 005.286 6.287z" />
              </svg>
            </button>
          </div>
          <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
        </div>

        <!-- Botón submit -->
        <button
          id="login-submit-btn"
          type="submit"
          class="login-btn"
          :disabled="isLoading"
          :class="{ 'login-btn--loading': isLoading }"
        >
          <span v-if="!isLoading">Iniciar sesión</span>
          <span v-else class="login-btn__spinner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4" stroke-dashoffset="10" stroke-linecap="round"/>
            </svg>
            Ingresando…
          </span>
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

// Validaciones individuales
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'El correo es requerido'
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Ingresa un correo electrónico válido'
  } else {
    errors.email = ''
  }
}

function validatePassword() {
  if (!form.password) {
    errors.password = 'La contraseña es requerida'
  } else {
    errors.password = ''
  }
}

function isFormValid() {
  validateEmail()
  validatePassword()
  return !errors.email && !errors.password
}

async function handleSubmit() {
  errorMessage.value = ''
  if (!isFormValid()) return

  isLoading.value = true
  try {
    await auth.login(form.email, form.password)
    // La redirección la maneja el store
  } catch (err) {
    errorMessage.value =
      err.response?.data?.error || 'Credenciales incorrectas. Inténtalo de nuevo.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss">
@use 'sass:color';

// ── Variables ────────────────────────────────────────────────────
$color-bg: #0f1117;
$color-surface: #1a1d27;
$color-surface-hover: #21263a;
$color-border: #2e3347;
$color-primary: #6c63ff;
$color-primary-hover: #7d75ff;
$color-primary-glow: rgba(108, 99, 255, 0.35);
$color-error: #ff6b6b;
$color-error-bg: rgba(255, 107, 107, 0.1);
$color-text: #e4e6f0;
$color-text-muted: #7a7e9a;

// ── Página ───────────────────────────────────────────────────────
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-bg;
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(108, 99, 255, 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(99, 179, 255, 0.07), transparent);
  padding: 1.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

// ── Card ─────────────────────────────────────────────────────────
.login-card {
  width: 100%;
  max-width: 440px;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 24px 48px rgba(0, 0, 0, 0.4);
  animation: card-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(20px) }
  to   { opacity: 1; transform: translateY(0) }
}

// ── Brand ─────────────────────────────────────────────────────────
.login-brand {
  text-align: center;
  margin-bottom: 2rem;

  &__icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 1rem;
    background: linear-gradient(135deg, $color-primary, #a78bfa);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px $color-primary-glow;

    svg {
      width: 28px;
      height: 28px;
      color: #fff;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $color-text;
    margin: 0 0 0.375rem;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    font-size: 0.9rem;
    color: $color-text-muted;
    margin: 0;
  }
}

// ── Error global ──────────────────────────────────────────────────
.login-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: $color-error-bg;
  border: 1px solid rgba($color-error, 0.3);
  color: $color-error;
  border-radius: 0.625rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;

  svg { width: 18px; height: 18px; flex-shrink: 0; }
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

// ── Formulario ────────────────────────────────────────────────────
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  &--error .form-input {
    border-color: $color-error;
    &:focus { box-shadow: 0 0 0 3px rgba($color-error, 0.2); }
  }
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: $color-text;
}

.form-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input-icon {
  position: absolute;
  left: 0.875rem;
  width: 18px;
  height: 18px;
  color: $color-text-muted;
  pointer-events: none;
  flex-shrink: 0;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid $color-border;
  border-radius: 0.625rem;
  color: $color-text;
  font-size: 0.9375rem;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  outline: none;
  font-family: inherit;

  &::placeholder { color: $color-text-muted; }

  &:hover {
    border-color: color.adjust($color-border, $lightness: 8%);
    background: rgba(255, 255, 255, 0.06);
  }

  &:focus {
    border-color: $color-primary;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 3px $color-primary-glow;
  }
}

.form-toggle-password {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: $color-text-muted;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 0.375rem;
  transition: color 0.2s;

  &:hover { color: $color-text; }

  svg { width: 18px; height: 18px; }
}

.form-error {
  font-size: 0.8rem;
  color: $color-error;
}

// ── Botón submit ──────────────────────────────────────────────────
.login-btn {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, $color-primary, #a78bfa);
  border: none;
  border-radius: 0.625rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 16px $color-primary-glow;

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px $color-primary-glow;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
      animation: spin 0.8s linear infinite;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
