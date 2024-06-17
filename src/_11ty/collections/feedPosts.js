export default function (collection) {
  return collection.getFilteredByGlob('./src/content/posts/**/*.md')
}
