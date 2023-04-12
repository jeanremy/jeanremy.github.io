/**
 * Blogposts collections
 * @param {*} collection
 * @returns published posts in reverse chronological order
 */

module.exports = function (collection) {
  return collection.getFilteredByGlob("./src/content/posts/**/*.md").reverse();
};
