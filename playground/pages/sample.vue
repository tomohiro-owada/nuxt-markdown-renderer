<script setup>
defineOptions({
  name: 'SamplePage',
})

useHead({
  title: 'My Pimpin Website - Sample Page',
  meta: [
    { name: 'description', content: 'A sample website, nothin fancy. This is a demo page showcasing HTML to Markdown conversion.' },
    { name: 'keywords', content: 'html, css, web, design, sample, practice, markdown, nuxt' },
    { name: 'author', content: 'Francisco Campos Arias' },
    { property: 'og:title', content: 'My Pimpin Website - Sample Page' },
    { property: 'og:description', content: 'A sample website demonstrating HTML to Markdown conversion with Nuxt' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'http://localhost:3001/sample' },
    { property: 'og:image', content: 'http://localhost:3001/sample-image.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'My Pimpin Website - Sample Page' },
    { name: 'twitter:description', content: 'A sample website demonstrating HTML to Markdown conversion' },
    { name: 'twitter:image', content: 'http://localhost:3001/sample-image.jpg' },
  ],
})
</script>

<template>
  <div class="container-sample">
    <header>
      <div class="header">
        <h1>Welcome</h1>
      </div>
    </header>
    <div class="main">
      <h2>This is just an example with some web content. This is the Hero Unit.</h2>
    </div>
    <div class="feature">
      <h3>Featured Content 1</h3>
      <p>lorem ipsum dolor amet lorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum.</p>
    </div>
    <div class="feature">
      <h3>Featured Content 2</h3>
      <p>lorem ipsum dolor amet lorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor.</p>
    </div>
    <footer>
      &copy;2012 Francisco Campos Arias, All Rights Reserved.
    </footer>
  </div>
</template>

<style scoped>
.container-sample {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}

.main {
  background: #4CAF50;
  color: white;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
}

.main h2 {
  margin: 0;
}

.feature {
  background: #f4f4f4;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #4CAF50;
}

.feature h3 {
  margin-top: 0;
  color: #333;
}

.feature p {
  color: #666;
  line-height: 1.6;
}

footer {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
}
</style>
