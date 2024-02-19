export default function (collection) {
  return collection
    .getFilteredByGlob('./src/content/posts/**/*.md')
    .sort((a, b) => {
      return b.data.date - a.data.date
    })
    .reverse()
}
