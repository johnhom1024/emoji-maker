const postcss = require('postcss');
/**
 * 样式处理器
 * @param {*} params 
 */
function styleHander(rawSource = '', options = {}) {
  const root = postcss.parse(rawSource);
  root.walk((node, idx) => {
    // 如果node的类型是规则
    if (node.type === 'rule') {
      // 去掉一些不支持的rule
      
    }
  })
}


module.exports = styleHander;