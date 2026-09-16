import { defineEventHandler, getRequestURL, setResponseHeader } from 'h3'
import { htmlToMarkdown, extractBodyContent, cleanHtml } from '../utils/html-to-markdown'
import { extractMetadata, metadataToFrontmatter } from '../utils/extract-metadata'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const config = useRuntimeConfig(event)

  // Get the path without .md extension
  const fullPath = event.context.params?.path || ''

  // Construct the original path
  let originalPath = fullPath ? `/${fullPath}` : '/'

  // Handle /index.md -> /
  if (originalPath === '/index') {
    originalPath = '/'
  }

  const fetchPath = originalPath

  try {
    // Fetch the original HTML page
    const baseUrl = `${url.protocol}//${url.host}`
    const originalUrl = `${baseUrl}${fetchPath}${url.search}`

    console.log(`[nuxt-markdown-renderer] Fetching: ${originalUrl}`)

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

    // Extract metadata from HTML
    let metadata = {}
    let frontmatter = `---
source: ${originalUrl}
generated: ${new Date().toISOString()}
---

`

    try {
      metadata = extractMetadata(html)
      console.log('[nuxt-markdown-renderer] Extracted metadata:', JSON.stringify(metadata, null, 2))
      frontmatter = metadataToFrontmatter(metadata, originalUrl)
    }
    catch (error) {
      console.error('[nuxt-markdown-renderer] Error extracting metadata:', error)
    }

    // Clean and extract body content
    const cleanedHtml = cleanHtml(html)
    const bodyContent = extractBodyContent(cleanedHtml)

    // Convert to markdown
    const turndownOptions = config.markdownRenderer?.turndownOptions || {}
    const markdown = htmlToMarkdown(bodyContent, turndownOptions)

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
