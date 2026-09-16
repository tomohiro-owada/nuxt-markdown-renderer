import TurndownService from 'turndown'

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

/**
 * Convert HTML string to Markdown
 */
export function htmlToMarkdown(html: string, options: TurndownOptions = {}): string {
  const turndownService = new TurndownService(options)

  // Add custom rules if needed
  turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement: content => `~~${content}~~`,
  })

  // Convert and return
  return turndownService.turndown(html)
}

/**
 * Extract body content from full HTML document
 */
export function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : html
}

/**
 * Clean HTML before conversion
 */
export function cleanHtml(html: string): string {
  // Remove script tags
  let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove style tags
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')

  // Remove comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')

  return cleaned
}
