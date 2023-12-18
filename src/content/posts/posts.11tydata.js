const getPermalinkForPost = (data) => {
  if (data.permalink) return data.permalink
  return process.env.ELEVENTY_ENV === 'production' && data.draft
    ? false
    : `/notes/${data.page.fileSlug}/index.html`
}

export default {
  layout: 'page.njk',
  type: 'post',
  eleventyComputed: {
    permalink: (data) => getPermalinkForPost(data),
    eleventyNavigation: {
      key: (data) => data.title,
      parent: 'Notes',
    },
  },
}
