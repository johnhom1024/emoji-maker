const { MappingChars2String : dic } = require('../dic');

function cssSelectorReplacer(selector) {
  return (
    selector
      .replace(/\\\[/g, dic['[']) // \[
      .replace(/\\\]/g, dic[']']) // \]
      .replace(/\\\(/g, dic['(']) // \(
      .replace(/\\\)/g, dic[')']) // \)
      .replace(/\\#/g, dic['#']) // \# : hex
      .replace(/\\!/g, dic['!']) // \! : !important
      .replace(/\\\//g, dic['/']) // \/ : w-1/2 -> width:50%
      .replace(/\\\./g, dic['.']) // \. : w-1.5
      .replace(/\\:/g, dic[':']) // colon for screen
      // https://github.com/sonofmagic/weapp-tailwindcss-webpack-plugin/issues/8
      .replace(/\\%/g, dic['%'])
      // .replace(/\\,/g, '_d_')
      .replace(/\\2c /g, dic[','])
      .replace(/\\\\/g, dic['\\'])
      .replace(/\\'/g, dic["'"])
      .replace(/\\"/g, dic['"'])
      .replace(/\\\*/g, dic['*'])
      .replace(/\\&/g, dic['&'])
      .replace(/\\@/g, dic['@'])
      .replace(/\\{/g, dic['{'])
      .replace(/\\}/g, dic['}'])
  )
}

module.exports = cssSelectorReplacer;