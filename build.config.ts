import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/module'],
  externals: ['@nuxt/kit', '@nuxt/schema', 'nuxt', 'h3', 'turndown'],
  declaration: false,
  rollup: {
    emitCJS: true,
  },
})
