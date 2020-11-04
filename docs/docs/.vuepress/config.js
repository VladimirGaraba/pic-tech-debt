module.exports = {
  title: 'PICSI user manual',
  description: '',
  base: '/docs/',
  evergreen: true,
  theme: "picsi",
  themeConfig: {
    displayAllHeaders: true, // Default: false
    sidebar: [
      '/',
      '/finding-and-viewing/',
      '/working-with-files/',
      '/viewing-live-data/',
      '/analytics/'
    ]
  },
  plugins: {
    'disqus': { name: 'Disqus' }
	},
  markdown: {
    // options for markdown-it-anchor
    //anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: md => {
      // use more markdown-it plugins!
      md.use(require('mdfigcaption')),
      md.use(require('markdown-it-deflist'))
    }
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-AU', // this will be set as the lang attribute on <html>
    }
  }
}
