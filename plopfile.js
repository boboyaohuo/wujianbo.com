const viewGenerator = require('./template/index')
module.exports = plop => {
  plop.setGenerator('view', viewGenerator)
}
