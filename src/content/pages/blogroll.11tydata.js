import { XMLParser } from 'fast-xml-parser'
import { readFileSync } from 'fs'

export default function () {
  const xmlFile = readFileSync(`${process.cwd()}/blogroll.opml`, 'utf8')
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  })
  const json = parser.parse(xmlFile)
  const sources = json.opml.body.outline.outline

  return { blogroll: sources }
}
