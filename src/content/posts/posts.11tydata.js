const getPermalinkForPost = (data) => {
  return process.env.ELEVENTY_ENV === "production" && data.draft
    ? false
    : `/notes/${data.page.fileSlug}/index.html`;
};

module.exports = {
  layout: "page.njk",
  type: "post",
  eleventyComputed: {
    permalink: (data) => getPermalinkForPost(data),
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Notes",
    },
  },
};
