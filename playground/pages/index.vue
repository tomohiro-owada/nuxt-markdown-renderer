<script setup>
defineOptions({
  name: 'HomePage',
})
</script>

<template>
  <div class="container">
    <h1>nuxt-markdown-renderer Demo</h1>

    <section>
      <h2>Welcome</h2>
      <p>
        This is a demo page for the <strong>nuxt-markdown-renderer</strong> module.
        You can view this page as Markdown by adding <code>.md</code> to the URL.
      </p>
    </section>

    <section>
      <h2>How to Use</h2>
      <ul>
        <li>Current page: <a href="/">http://localhost:3000/</a></li>
        <li>Markdown version: <a href="/index.md">http://localhost:3000/index.md</a></li>
        <li>About page: <a href="/about">http://localhost:3000/about</a></li>
        <li>About in Markdown: <a href="/about.md">http://localhost:3000/about.md</a></li>
      </ul>
    </section>

    <section>
      <h2>Features</h2>
      <ul>
        <li><em>Automatic conversion</em> of HTML to Markdown</li>
        <li><strong>Customizable</strong> Turndown options</li>
        <li>Works with <code>server-side rendering</code></li>
        <li>Nuxt 4 compatible</li>
      </ul>
    </section>

    <section>
      <h2>Code Example</h2>
      <pre><code>export default defineNuxtConfig({
  modules: ['nuxt-markdown-renderer'],
  markdownRenderer: {
    enabled: true,
    suffix: '.md'
  }
})</code></pre>
    </section>

    <section>
      <h2>Links</h2>
      <p>
        Visit <a href="https://github.com/yourusername/nuxt-markdown-renderer">GitHub repository</a> for more information.
      </p>
    </section>
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

pre {
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
}

pre code {
  background: none;
  color: inherit;
  padding: 0;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
