export default {
  type: 'atom',
  outputPath: './public/notes/rss.xml',
  collection: {
    name: 'feedPosts',
    limit: 0,
  },
  stylesheet: '/notes/rss-style.xsl',
  metadata: {
    title: 'Notes de Jean-Rémy Praud',
    subtitle: 'Le flux RSS des dernieres notes',
    language: 'fr',
    base: 'https://www.jeanremypraud.com/',
    author: {
      name: 'Jean-Rémy Praud',
      email: 'hello@jeanremypraud.com',
    },
  },
}
