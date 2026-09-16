export default defineNuxtConfig({
  modules: ['../src/module'],

  devtools: { enabled: true },

  compatibilityDate: '2025-01-15',

  markdownRenderer: {
    enabled: true,
    suffix: '.md',
  },
})
