const fs = require("fs");
const CleanCSS = require("clean-css");
const sass = require("sass");
const { minify } = require("terser");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/img");

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addFilter("format", require("./src/_11ty/filters/format.js"));
  eleventyConfig.addFilter(
    "console",
    require("./src/_11ty/filters/console.js")
  );

  eleventyConfig.addCollection(
    "posts",
    require("./src/_11ty/collections/posts.js")
  );

  eleventyConfig.addCollection(
    "tags",
    require("./src/_11ty/collections/tags.js")
  );

  return {
    dir: {
      input: "src",
      output: "docs",
    },
    passthroughFileCopy: true,
  };
};
