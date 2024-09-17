import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import { feedPlugin } from '@11ty/eleventy-plugin-rss'
import EleventyPluginRss from '@11ty/eleventy-plugin-rss';
import faviconPlugin from 'eleventy-favicon'
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

import { cssmin, format, console } from './src/_11ty/filters/index.js'
import { feedPosts, posts } from './src/_11ty/collections/index.js'
import { markdownit } from './src/_11ty/libraries/index.js'
import { rss, image, vite } from './src/_11ty/plugins/index.js'
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  // ---------- PLUGINS --------------------
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(faviconPlugin, {
    destination: './src/public'
  })
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(EleventyPluginRss)
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, image);

  eleventyConfig.addPlugin(EleventyVitePlugin, vite);

  // ---------- PASSTHROUGH --------------------
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/public/!(**/*.njk)')

  // ---------- FILTERS --------------------
  eleventyConfig.addFilter('cssmin', cssmin)
  eleventyConfig.addFilter('format', format)
  eleventyConfig.addFilter('console', console)

  // ---------- COLLECTIONS --------------------
  eleventyConfig.ignores.add('**/_*.md')
  eleventyConfig.addCollection('posts', posts)
  eleventyConfig.addCollection('feedPosts', feedPosts)

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
