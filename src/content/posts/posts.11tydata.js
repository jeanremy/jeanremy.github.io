module.exports = {
  layout: "page.njk",
  permalink: "/notes/{{ page.fileSlug }}/index.html",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Notes",
    },
  },
};
