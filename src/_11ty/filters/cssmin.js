import CleanCSS from 'clean-css'

export default function (code) {
  return new CleanCSS({}).minify(code).styles
}
