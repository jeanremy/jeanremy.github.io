export default function (collection) {
  return collection
    .getFilteredByGlob('./src/content/posts/**/*.md')
    .sort((a, b) => {
      return b.data.created_at - a.data.created_at
    })
}
