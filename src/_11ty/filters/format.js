const dayjs = require("dayjs");
require("dayjs/locale/fr");

module.exports = function (date, format) {
  return dayjs(date).locale("fr").format(format);
};
