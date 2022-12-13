const CleanCSS = require("clean-css");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const faviconPlugin = require("eleventy-favicon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // ---------- PLUGINS --------------------
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(faviconPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ---------- PASSTHROUGH --------------------
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("CNAME");

  // ---------- FILTERS --------------------
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addFilter("format", require("./src/_11ty/filters/format.js"));
  eleventyConfig.addFilter(
    "console",
    require("./src/_11ty/filters/console.js")
  );

  // ---------- COLLECTIONS --------------------
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
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },

    passthroughFileCopy: true,
  };
};
