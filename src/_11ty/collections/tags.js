module.exports = function (collection) {
  let tagSet = new Set();
  collection.getFilteredByGlob("./src/content/posts/*.md").forEach((item) => {
    (item.data.tags || []).forEach((tag) => tagSet.add(tag));
  });

  return [...tagSet];
};
