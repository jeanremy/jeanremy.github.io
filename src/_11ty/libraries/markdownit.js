const markdownIt = require("markdown-it");
const anchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  return markdownIt({ html: true })
    .use(anchor, {
      permalink: anchor.permalink.ariaHidden({
        placement: "after",
        class: "title-anchor",
        symbol: "#",
      }),
      level: [2],
      slugify: eleventyConfig.getFilter("slugify"),
    })
    .use(require("markdown-it-eleventy-img"), {
      imgOptions: {
        widths: [320, 640],
        formats: ["webp"],
        urlPath: "/assets/img/posts/",
        outputDir: "./_site/assets/img/posts/",
      },
      globalAttributes: {
        loading: "lazy",
        decoding: "async",
        sizes: "100vw",
      },
    })
    .disable("code");
};
