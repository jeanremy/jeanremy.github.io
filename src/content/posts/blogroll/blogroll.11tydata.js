const { XMLParser } = require('fast-xml-parser')
const { readFileSync } = require('fs')

module.exports = function () {
  const xmlFile = readFileSync(`${process.cwd()}/blogroll.opml`, 'utf8')
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  })
  const json = parser.parse(xmlFile)
  console.log('json:', json.opml.body.outline.outline)
  return { blogroll: json.opml.body.outline.outline }
}
