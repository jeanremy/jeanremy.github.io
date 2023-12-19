const markdownIt = require('markdown-it')
const anchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')

const path = require('path')
module.exports = function (eleventyConfig) {
  const pathResolver = (filepath, env) => {
    let resolvedPath = filepath

    // if path is remote, just return path
    const isRemoteRegExp = /^https?:\/\//i
    if (typeof filepath === 'string' && !isRemoteRegExp.test(filepath)) {
      resolvedPath = path.join(path.dirname(env.page.inputPath), filepath)
    }

    return resolvedPath
  }

  return markdownIt({ html: true })
    .use(anchor, {
      permalink: anchor.permalink.ariaHidden({
        placement: 'after',
        class: 'title-anchor',
        symbol: '#',
      }),
      level: [2],
      slugify: eleventyConfig.getFilter('slugify'),
    })
    .use(require('markdown-it-eleventy-img'), {
      imgOptions: {
        widths: [320, 640],
        formats: ['webp'],
        urlPath: '/assets/img/',
        outputDir: './_site/assets/img',
      },
      globalAttributes: {
        loading: 'lazy',
        decoding: 'async',
        sizes: '(max-width: 640px) 320px, 640px',
      },
      resolvePath: pathResolver,
    })
    .use(markdownItAttrs)
    .disable('code')
}
