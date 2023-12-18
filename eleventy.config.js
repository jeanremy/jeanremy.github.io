import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import pluginRss from '@11ty/eleventy-plugin-rss'
import faviconPlugin from 'eleventy-favicon'
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'

import { cssmin, format, console } from './src/_11ty/filters/index.js'
import { posts } from './src/_11ty/collections/index.js'
import { markdownit } from './src/_11ty/libraries/index.js'

export default async function (eleventyConfig) {
  // ---------- PLUGINS --------------------
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(faviconPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)

  // ---------- PASSTHROUGH --------------------
  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy('src/assets/img')
  eleventyConfig.addPassthroughCopy('CNAME')
  eleventyConfig.addPassthroughCopy('robots.txt')
  eleventyConfig.addPassthroughCopy('*.opml')

  // ---------- FILTERS --------------------
  eleventyConfig.addFilter('cssmin', cssmin)
  eleventyConfig.addFilter('format', format)
  eleventyConfig.addFilter('console', console)

  // ---------- COLLECTIONS --------------------
  eleventyConfig.ignores.add('**/_*.md')
  eleventyConfig.addCollection('posts', posts)

  eleventyConfig.setLibrary('md', markdownit(eleventyConfig))

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
    },

    passthroughFileCopy: true,
  }
}
