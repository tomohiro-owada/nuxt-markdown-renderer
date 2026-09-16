/**
 * Extract metadata from HTML
 */
export interface PageMetadata {
  title?: string
  description?: string
  keywords?: string
  author?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
  [key: string]: string | undefined
}

/**
 * Extract meta tags and other metadata from HTML
 */
export function extractMetadata(html: string): PageMetadata {
  const metadata: PageMetadata = {}

  // Extract title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
  if (titleMatch) {
    metadata.title = titleMatch[1].trim()
  }

  // Extract meta tags
  const metaRegex = /<meta\b([^>]*)>/gi
  let match

  while ((match = metaRegex.exec(html)) !== null) {
    const metaTag = match[1]

    // Extract name and content
    const nameMatch = metaTag.match(/name=["']([^"']+)["']/i)
    const propertyMatch = metaTag.match(/property=["']([^"']+)["']/i)
    const contentMatch = metaTag.match(/content=["']([^"']+)["']/i)

    if (contentMatch) {
      const content = contentMatch[1]

      if (nameMatch) {
        const name = nameMatch[1].toLowerCase()

        switch (name) {
          case 'description':
            metadata.description = content
            break
          case 'keywords':
            metadata.keywords = content
            break
          case 'author':
            metadata.author = content
            break
          default:
            // Store other meta tags
            metadata[`meta_${name}`] = content
        }
      }

      if (propertyMatch) {
        const property = propertyMatch[1].toLowerCase()

        switch (property) {
          case 'og:title':
            metadata.ogTitle = content
            break
          case 'og:description':
            metadata.ogDescription = content
            break
          case 'og:image':
            metadata.ogImage = content
            break
          case 'og:url':
            metadata.ogUrl = content
            break
          case 'og:type':
            metadata.ogType = content
            break
          case 'twitter:card':
            metadata.twitterCard = content
            break
          case 'twitter:title':
            metadata.twitterTitle = content
            break
          case 'twitter:description':
            metadata.twitterDescription = content
            break
          case 'twitter:image':
            metadata.twitterImage = content
            break
          default:
            // Store other OG/Twitter tags
            metadata[`meta_${property.replace(':', '_')}`] = content
        }
      }
    }
  }

  // Extract canonical URL
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)
  if (canonicalMatch) {
    metadata.canonical = canonicalMatch[1]
  }

  return metadata
}

/**
 * Convert metadata object to YAML frontmatter string
 */
export function metadataToFrontmatter(metadata: PageMetadata, sourceUrl: string): string {
  const lines: string[] = ['---']

  // Always include source and timestamp
  lines.push(`source: ${sourceUrl}`)
  lines.push(`generated: ${new Date().toISOString()}`)

  // Add title
  if (metadata.title) {
    lines.push(`title: "${metadata.title.replace(/"/g, '\\"')}"`)
  }

  // Add description
  if (metadata.description) {
    lines.push(`description: "${metadata.description.replace(/"/g, '\\"')}"`)
  }

  // Add keywords
  if (metadata.keywords) {
    lines.push(`keywords: "${metadata.keywords.replace(/"/g, '\\"')}"`)
  }

  // Add author
  if (metadata.author) {
    lines.push(`author: "${metadata.author.replace(/"/g, '\\"')}"`)
  }

  // Add Open Graph data
  if (metadata.ogTitle || metadata.ogDescription || metadata.ogImage || metadata.ogUrl || metadata.ogType) {
    lines.push('openGraph:')
    if (metadata.ogTitle) lines.push(`  title: "${metadata.ogTitle.replace(/"/g, '\\"')}"`)
    if (metadata.ogDescription) lines.push(`  description: "${metadata.ogDescription.replace(/"/g, '\\"')}"`)
    if (metadata.ogImage) lines.push(`  image: "${metadata.ogImage.replace(/"/g, '\\"')}"`)
    if (metadata.ogUrl) lines.push(`  url: "${metadata.ogUrl.replace(/"/g, '\\"')}"`)
    if (metadata.ogType) lines.push(`  type: "${metadata.ogType.replace(/"/g, '\\"')}"`)
  }

  // Add Twitter Card data
  if (metadata.twitterCard || metadata.twitterTitle || metadata.twitterDescription || metadata.twitterImage) {
    lines.push('twitter:')
    if (metadata.twitterCard) lines.push(`  card: "${metadata.twitterCard.replace(/"/g, '\\"')}"`)
    if (metadata.twitterTitle) lines.push(`  title: "${metadata.twitterTitle.replace(/"/g, '\\"')}"`)
    if (metadata.twitterDescription) lines.push(`  description: "${metadata.twitterDescription.replace(/"/g, '\\"')}"`)
    if (metadata.twitterImage) lines.push(`  image: "${metadata.twitterImage.replace(/"/g, '\\"')}"`)
  }

  // Add canonical URL
  if (metadata.canonical) {
    lines.push(`canonical: "${metadata.canonical.replace(/"/g, '\\"')}"`)
  }

  // Add any other metadata
  for (const [key, value] of Object.entries(metadata)) {
    if (
      key.startsWith('meta_')
      && value
      && !key.includes('og_')
      && !key.includes('twitter_')
    ) {
      const cleanKey = key.replace('meta_', '')
      lines.push(`${cleanKey}: "${value.replace(/"/g, '\\"')}"`)
    }
  }

  lines.push('---')
  lines.push('')

  return lines.join('\n')
}
