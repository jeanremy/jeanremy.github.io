/**
 * Blogposts collections
 * @param {*} collection
 * @returns published posts in reverse chronological order
 */

module.exports = function (collection) {
  return collection
    .getFilteredByGlob("./src/content/posts/**/*.md")
    .sort((a, b) => {
      return b.data.date - a.data.date;
    })
    .reverse();
};
