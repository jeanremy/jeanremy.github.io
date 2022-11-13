const CleanCSS = require("clean-css");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const faviconPlugin = require("eleventy-favicon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const esbuild = require("esbuild");

const markdownIt = require("markdown-it");
const anchor = require("markdown-it-anchor");

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
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./src/_11ty/shortcodes/image.js")
  );

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true })
      .use(anchor, {
        permalink: anchor.permalink.ariaHidden({
          placement: "after",
          class: "title-anchor",
          symbol: "#",
        }),
        level: [2],
        slugify: eleventyConfig.getFilter("slugify"),
      })
      .disable("code")
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
