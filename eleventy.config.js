import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import { feedPlugin } from '@11ty/eleventy-plugin-rss'
import EleventyPluginRss from '@11ty/eleventy-plugin-rss';
import faviconPlugin from 'eleventy-favicon'
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { resolve } from 'path';

import { cssmin, format, console } from './src/_11ty/filters/index.js'
import { feedPosts, posts } from './src/_11ty/collections/index.js'
import { markdownit } from './src/_11ty/libraries/index.js'
import { rss } from './src/_11ty/plugins/index.js'

export default async function (eleventyConfig) {
  // ---------- PLUGINS --------------------
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(faviconPlugin, {
    destination: './public'
  })
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(EleventyPluginRss)
  eleventyConfig.addPlugin(EleventyVitePlugin, {

		// Options passed to the Eleventy Dev Server
		// Defaults
		serverOptions: {
			module: "@11ty/eleventy-dev-server",
			domDiff: false,
		},

		// Defaults
		viteOptions: {
      publicDir: 'public',
			clearScreen: false,
			server: {
				mode: 'development',
				middlewareMode: true,
			},
			appType: 'custom',

			build: {
				mode: 'production',
				// manifest: true,
				// This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
				
			}
		},
	});

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
