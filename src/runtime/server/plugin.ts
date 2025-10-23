export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()
  const suffix = config.markdownRenderer?.suffix || '.md'

  console.log(`[nuxt-markdown-renderer] Plugin loaded. Suffix: ${suffix}`)

  nitroApp.hooks.hook('request', (event) => {
    const url = getRequestURL(event)
    if (url.pathname.endsWith(suffix)) {
      console.log(`[nuxt-markdown-renderer] Markdown request: ${url.pathname}`)
    }
  })
})
