import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import faviconPlugin from "eleventy-favicon";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import EleventyPluginOgImage from 'eleventy-plugin-og-image';
import accessibleExternalLinks from 'eleventy-plugin-accessible-external-links'

import { cssmin, format, console } from "./src/_11ty/filters/index.js";
import { feedPosts, posts, sitemap } from "./src/_11ty/collections/index.js";
import { markdownit } from "./src/_11ty/libraries/index.js";
import { rss, image, css, js, ogimage, externalLinks } from "./src/_11ty/plugins/index.js";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  // ---------- PLUGINS --------------------
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(faviconPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, rss);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, image);
  eleventyConfig.addPlugin(EleventyPluginOgImage, await ogimage());
  eleventyConfig.addPlugin(css);
  eleventyConfig.addPlugin(js);
  eleventyConfig.addPlugin(accessibleExternalLinks, externalLinks);

  // ---------- PASSTHROUGH --------------------
  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy('src/assets/img')
  eleventyConfig.addPassthroughCopy('CNAME')
  eleventyConfig.addPassthroughCopy('robots.txt')
  eleventyConfig.addPassthroughCopy('*.opml')

  // ---------- FILTERS --------------------
  eleventyConfig.addFilter("cssmin", cssmin);
  eleventyConfig.addFilter("format", format);
  eleventyConfig.addFilter("console", console);

  // ---------- COLLECTIONS --------------------
  eleventyConfig.ignores.add("**/_*.md");
  eleventyConfig.addCollection("posts", posts);
  eleventyConfig.addCollection("feedPosts", feedPosts);
  eleventyConfig.addCollection("sitemap", sitemap);

  eleventyConfig.setLibrary("md", markdownit(eleventyConfig));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    passthroughFileCopy: true,
  };
}
