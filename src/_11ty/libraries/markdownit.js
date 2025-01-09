import markdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'

export default function (eleventyConfig) {

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
    .use(markdownItAttrs)
    .disable('code')
}
