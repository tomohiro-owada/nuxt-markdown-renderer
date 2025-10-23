export interface TurndownOptions {
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

export interface MarkdownRendererConfig {
  suffix: string
  turndownOptions?: TurndownOptions
}

declare module 'nitropack' {
  interface NitroRuntimeConfig {
    markdownRenderer?: MarkdownRendererConfig
  }
}

export {}
