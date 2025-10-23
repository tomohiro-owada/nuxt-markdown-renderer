export default defineNuxtConfig({
  modules: ['../src/module'],

  markdownRenderer: {
    enabled: true,
    suffix: '.md'
  },

  devtools: { enabled: true },

  compatibilityDate: '2025-01-15'
})
