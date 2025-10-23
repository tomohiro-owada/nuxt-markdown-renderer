<template>
  <div class="container">
    <h1>About This Module</h1>

    <section>
      <h2>What is nuxt-markdown-renderer?</h2>
      <p>
        <strong>nuxt-markdown-renderer</strong> is a Nuxt 4 module that automatically
        converts your HTML pages to Markdown format when you append <code>.md</code> to any URL.
      </p>
    </section>

    <section>
      <h2>Why Use This Module?</h2>
      <ol>
        <li><strong>Export Documentation:</strong> Easily export your documentation pages as Markdown files</li>
        <li><strong>Content Backup:</strong> Create Markdown backups of your web content</li>
        <li><strong>Content Migration:</strong> Migrate content between different systems</li>
        <li><strong>API Integration:</strong> Provide Markdown format for API clients</li>
      </ol>
    </section>

    <section>
      <h2>Technical Details</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Conversion Engine</td>
            <td>Turndown.js</td>
          </tr>
          <tr>
            <td>Nuxt Version</td>
            <td>4.0+</td>
          </tr>
          <tr>
            <td>TypeScript</td>
            <td>Full support</td>
          </tr>
          <tr>
            <td>SSR</td>
            <td>Compatible</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Try It Now</h2>
      <p>
        View this page in Markdown format: <a href="/about.md">http://localhost:3000/about.md</a>
      </p>
    </section>

    <nav>
      <p>
        <a href="/">← Back to Home</a>
      </p>
    </nav>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
}

h2 {
  color: #42b983;
  margin-top: 2rem;
}

section {
  margin: 2rem 0;
}

code {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Courier New', monospace;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #42b983;
  color: white;
  font-weight: 600;
}

tr:hover {
  background: #f5f5f5;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ol {
  line-height: 1.8;
}
</style>
