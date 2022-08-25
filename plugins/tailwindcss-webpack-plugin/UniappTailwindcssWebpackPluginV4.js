const pluginName = require("./shared");
const getOptions = require('./defaults');
const styleHander = require('./postcss/index');

class UniappTailwindcssWebpackPlugin {
  options = {};
  constructor(options) {
    this.options = getOptions(options);
  }
  apply(compiler) {
    const { cssMatcher, htmlMatcher } = this.options;
    
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      const entries = Object.entries(compilation.assets)
      for (const [filename, originalSource] of entries) {
        if (cssMatcher(filename)) {
          const rawSource = originalSource.source().toString()
          const css = styleHander(rawSource)
        } else if (htmlMatcher) {
          const rawSource = originalSource.source().toString()
        }
      }
    })
  }
}

module.exports = UniappTailwindcssWebpackPlugin;
