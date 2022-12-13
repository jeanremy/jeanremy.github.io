const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const faviconPlugin = require("eleventy-favicon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const esbuild = require("esbuild");

const { console, format, cssmin } = require("./src/_11ty/filters");
const { posts, tags } = require("./src/_11ty/collections");
const { markdownit } = require("./src/_11ty/libraries");

module.exports = function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: ["src/assets/js/index.js"],
      bundle: true,
      outfile: "_site/assets/js/bundle.js",
      sourcemap: true,
      minify: true,
    });
  });

  // ---------- PLUGINS --------------------
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(faviconPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ---------- PASSTHROUGH --------------------
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("CNAME");

  // ---------- FILTERS --------------------
  eleventyConfig.addFilter("cssmin", cssmin);
  eleventyConfig.addFilter("format", format);
  eleventyConfig.addFilter("console", console);

  // ---------- COLLECTIONS --------------------
  eleventyConfig.addCollection("posts", posts);
  eleventyConfig.addCollection("tags", tags);

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
