import { defineNuxtModule, createResolver, addServerScanDir } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Enable or disable the module
   * @default true
   */
  enabled?: boolean

  /**
   * The route suffix to trigger markdown rendering
   * @default '.md'
   */
  suffix?: string

  /**
   * Custom turndown options
   */
  turndownOptions?: {
    headingStyle?: 'setext' | 'atx'
    hr?: string
    bulletListMarker?: '-' | '+' | '*'
    codeBlockStyle?: 'indented' | 'fenced'
    fence?: '```' | '~~~'
    emDelimiter?: '_' | '*'
    strongDelimiter?: '**' | '__'
    linkStyle?: 'inlined' | 'referenced'
    linkReferenceStyle?: 'full' | 'collapsed' | 'shortcut'
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-markdown-renderer',
    configKey: 'markdownRenderer',
    compatibility: {
      nuxt: '^4.0.0',
    },
  },
  defaults: {
    enabled: true,
    suffix: '.md',
    turndownOptions: {
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      fence: '```',
      bulletListMarker: '-',
      emDelimiter: '_',
      strongDelimiter: '**',
      linkStyle: 'inlined',
    },
  },
  setup(options, nuxt) {
    // Skip if module is disabled
    if (options.enabled === false) {
      return
    }

    const resolver = createResolver(import.meta.url)

    // Add server directory for routes
    addServerScanDir(resolver.resolve('./runtime/server'))

    // Add Nitro plugin and config
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.plugins = nitroConfig.plugins || []
      nitroConfig.plugins.push(resolver.resolve('./runtime/server/plugin'))

      // Pass module options to runtime config
      nitroConfig.runtimeConfig = nitroConfig.runtimeConfig || {}
      nitroConfig.runtimeConfig.markdownRenderer = {
        suffix: options.suffix,
        turndownOptions: options.turndownOptions,
      }
    })
  },
})
