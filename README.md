# nuxt-markdown-renderer

A Nuxt 4 module that converts HTML pages to Markdown by appending `.md` to any URL.

## Features

- Convert any HTML page to Markdown by adding `.md` to the URL
- Powered by [Turndown](https://github.com/mixmark-io/turndown) for reliable HTML-to-Markdown conversion
- Customizable Markdown output options
- Works with server-side rendering (SSR)
- Nuxt 4 compatible
- TypeScript support

## Installation

```bash
npm install nuxt-markdown-renderer
```

## Usage

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-markdown-renderer']
})
```

Now you can access any page in Markdown format by appending `.md` to the URL:

```
http://localhost:3000/about        -> HTML page
http://localhost:3000/about.md     -> Markdown version
http://localhost:3000/blog/post-1  -> HTML page
http://localhost:3000/blog/post-1.md -> Markdown version
```

## Configuration

You can customize the module behavior in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-markdown-renderer'],

  markdownRenderer: {
    // Enable or disable the module
    enabled: true,

    // Custom suffix (default: '.md')
    suffix: '.md',

    // Turndown options
    turndownOptions: {
      headingStyle: 'atx',        // 'atx' or 'setext'
      hr: '---',
      bulletListMarker: '-',      // '-', '+', or '*'
      codeBlockStyle: 'fenced',   // 'fenced' or 'indented'
      fence: '```',               // '```' or '~~~'
      emDelimiter: '_',           // '_' or '*'
      strongDelimiter: '**',      // '**' or '__'
      linkStyle: 'inlined'        // 'inlined' or 'referenced'
    }
  }
})
```

## Module Options

### `enabled`

- Type: `boolean`
- Default: `true`

Enable or disable the module.

### `suffix`

- Type: `string`
- Default: `'.md'`

The URL suffix that triggers Markdown rendering.

### `turndownOptions`

- Type: `object`
- Default: See configuration example above

Options passed to [Turndown](https://github.com/mixmark-io/turndown#options) for customizing the Markdown output.

## Examples

### Basic Example

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-markdown-renderer']
})
```

Visit `http://localhost:3000/index.md` to see your homepage in Markdown format.

### Custom Suffix

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-markdown-renderer'],

  markdownRenderer: {
    suffix: '.markdown'
  }
})
```

Now use `http://localhost:3000/index.markdown` instead.

### Customize Markdown Style

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-markdown-renderer'],

  markdownRenderer: {
    turndownOptions: {
      headingStyle: 'setext',
      bulletListMarker: '*',
      codeBlockStyle: 'indented'
    }
  }
})
```

## Output Format

The generated Markdown includes frontmatter with metadata:

```markdown
---
source: http://localhost:3000/about
generated: 2025-01-15T12:00:00.000Z
---

# About Us

This is the about page content...
```

## How It Works

1. User requests a URL ending with `.md` (e.g., `/about.md`)
2. The module intercepts the request
3. Fetches the original HTML page (e.g., `/about`)
4. Converts the HTML to Markdown using Turndown
5. Returns the Markdown with appropriate headers

## Use Cases

- Export documentation pages as Markdown
- Create Markdown backups of your content
- Enable easy content migration
- Provide alternative content format for API clients
- Debug and inspect rendered HTML structure

## Development

```bash
# Install dependencies
npm install

# Build the module
npm run prepack

# Run development server (if you have a playground)
npm run dev

# Run tests
npm run test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Credits

Built with:
- [Nuxt 4](https://nuxt.com)
- [Turndown](https://github.com/mixmark-io/turndown)
- [Nitro](https://nitro.unjs.io)
