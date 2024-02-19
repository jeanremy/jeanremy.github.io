import dayjs from 'dayjs'
import 'dayjs/locale/fr.js'

export default function (date, format) {
  return dayjs(date).locale('fr').format(format)
}
