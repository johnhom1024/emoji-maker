const cssSelectorReplacer = require('./shared')


function mpRulePreflight(node = {}, options = {}) {
  node.selector = cssSelectorReplacer(node.selector)
}

module.exports = {
  mpRulePreflight
}