<template>
  <main class="error-page">
    <div class="error-card">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
        </svg>
      </div>
      <h1 class="error-code">403</h1>
      <p class="error-title">Acceso denegado</p>
      <p class="error-message">No tienes permisos para ver esta página.</p>
      <RouterLink to="/" class="error-btn">Volver al inicio</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
$color-bg: #0f1117;
$color-surface: #1a1d27;
$color-border: #2e3347;
$color-primary: #6c63ff;
$color-error: #ff6b6b;
$color-text: #e4e6f0;
$color-text-muted: #7a7e9a;

.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-bg;
  padding: 1.5rem;
}

.error-card {
  text-align: center;
  padding: 3rem 2.5rem;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: 1.25rem;
  max-width: 420px;
  width: 100%;
  animation: card-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(20px) }
  to   { opacity: 1; transform: translateY(0) }
}

.error-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: rgba($color-error, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
    color: $color-error;
  }
}

.error-code {
  font-size: 4rem;
  font-weight: 800;
  color: $color-error;
  margin: 0 0 0.5rem;
  letter-spacing: -0.04em;
  line-height: 1;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $color-text;
  margin: 0 0 0.5rem;
}

.error-message {
  color: $color-text-muted;
  margin: 0 0 2rem;
  font-size: 0.9375rem;
}

.error-btn {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  background: linear-gradient(135deg, $color-primary, #a78bfa);
  border-radius: 0.625rem;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}
</style>
