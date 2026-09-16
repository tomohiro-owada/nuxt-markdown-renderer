import { defineEventHandler, getRequestURL, sendRedirect, setResponseHeader } from 'h3'
import { htmlToMarkdown, extractBodyContent, cleanHtml } from '../utils/html-to-markdown'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const config = useRuntimeConfig(event)
  const suffix = config.markdownRenderer?.suffix || '.md'

  // Check if URL ends with the suffix (e.g., .md)
  if (!url.pathname.endsWith(suffix)) {
    return // Let other handlers process this request
  }

  // Get the original path without the suffix
  const originalPath = url.pathname.slice(0, -suffix.length)

  // If the original path is empty, redirect to home
  if (!originalPath || originalPath === '') {
    return sendRedirect(event, '/', 302)
  }

  try {
    // Fetch the original HTML page
    const baseUrl = `${url.protocol}//${url.host}`
    const originalUrl = `${baseUrl}${originalPath}${url.search}`

    const response = await fetch(originalUrl, {
      headers: {
        'User-Agent': 'nuxt-markdown-renderer',
        'Accept': 'text/html',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch original page: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()

    // Clean and extract body content
    const cleanedHtml = cleanHtml(html)
    const bodyContent = extractBodyContent(cleanedHtml)

    // Convert to markdown
    const turndownOptions = config.markdownRenderer?.turndownOptions || {}
    const markdown = htmlToMarkdown(bodyContent, turndownOptions)

    // Add frontmatter with metadata
    const frontmatter = `---
source: ${originalUrl}
generated: ${new Date().toISOString()}
---

`

    const fullMarkdown = frontmatter + markdown

    // Set response headers
    setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    setResponseHeader(event, 'X-Markdown-Renderer', 'nuxt-markdown-renderer')

    return fullMarkdown
  }
  catch (error) {
    console.error('[nuxt-markdown-renderer] Error:', error)

    // Return error as markdown
    setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    return `# Error

Failed to render page as markdown.

**Error:** ${error instanceof Error ? error.message : String(error)}

**Original Path:** ${originalPath}
`
  }
})
