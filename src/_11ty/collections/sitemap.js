export default function (collection) {
  return collection
    .getAll()
    .filter((item)=> 'html' === item.page.outputFileExtension)
}
