module.exports = {
  layout: "page.njk",
  permalink: "/blog/{{ page.fileSlug }}/index.html",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Blog",
    },
  },
};
