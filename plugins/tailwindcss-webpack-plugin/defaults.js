const { defu } = require('defu');

const defaultOptions = {
  // 匹配后缀名是wxss|css的文件名
  cssMatcher: (file) => /.+\.(?:wx|c)ss$/.test(file),
  // 匹配后缀名是 html|wxml的文件名
  htmlMatcher: (file) => /.+\.(?:ht|wx)ml$/.test(file),
  // 转换通配符 *
  replaceUniversalSelectorWith: 'view',
  mainCssChunkMatcher: (file, appType) => {
    switch (appType) {
      case 'uni-app': {
        return /^common\/main/.test(file)
      }
      default: {
        return true
      }
    }
  },
}


function getOptions(options = {}) {
  return defu(options, defaultOptions);
}

module.exports = getOptions;