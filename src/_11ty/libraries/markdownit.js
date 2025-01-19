import markdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItFootnotes from 'markdown-it-footnote'

export default function (eleventyConfig) {

  return markdownIt({ html: true })
    .use(markdownItFootnotes)
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
