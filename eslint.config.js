import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier/recommended'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettier,
  {
    name: 'app/vue-rules',
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-unused-vars': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
]
