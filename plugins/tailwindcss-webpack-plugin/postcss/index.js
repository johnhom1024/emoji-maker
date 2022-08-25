const postcss = require('postcss');
const transformSync = require('./selectorParser');

/**
 * 样式处理器
 * @param {*} params 
 */
function styleHander(rawSource = '', options = {}) {
  const root = postcss.parse(rawSource);
  root.walk((node, idx) => {
    // 如果node的类型是规则
    if (node.type === 'rule') {
      // console.log('----------johnhomLogDebug node', node)
      // 去掉一些不支持的rule
      transformSync(node, options);
    }
  })

  return root.toString()
}


module.exports = styleHander;