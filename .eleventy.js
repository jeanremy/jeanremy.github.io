const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const faviconPlugin = require("eleventy-favicon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const { console, format, cssmin } = require("./src/_11ty/filters");
const { posts } = require("./src/_11ty/collections");
const { markdownit } = require("./src/_11ty/libraries");

module.exports = function (eleventyConfig) {
  // ---------- PLUGINS --------------------
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(faviconPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ---------- PASSTHROUGH --------------------
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("CNAME");

  // ---------- FILTERS --------------------
  eleventyConfig.addFilter("cssmin", cssmin);
  eleventyConfig.addFilter("format", format);
  eleventyConfig.addFilter("console", console);

  // ---------- COLLECTIONS --------------------
  eleventyConfig.addCollection("posts", posts);

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
};
