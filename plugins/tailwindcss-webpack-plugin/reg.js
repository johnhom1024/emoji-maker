// 匹配vuetemplate中的class的值
const vueTemplateClassRegexp =
  /(?:(?:hover-)?class)=(?:["']\W+\s*(?:\w+)\()?["']([^"]+)['"]/gs;

const tagWithEitherClassAndHoverClassRegexp =
  /<(?:[a-z][-a-z]*[a-z]*)\s+[^>]*?(?:(?:hover-)?class="(?:[^"]*)")[^>]*?\/?>/g;

// 匹配变量的正则
const variableRegExp = /{{(.*?)}}/gs;

function variableMatch(original) {
  return variableRegExp.exec(original);
}


module.exports = {
  vueTemplateClassRegexp,
  tagWithEitherClassAndHoverClassRegexp,
  variableMatch,
  variableRegExp,
};
