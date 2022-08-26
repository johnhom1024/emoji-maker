const pluginName = require("./shared");
const getOptions = require('./defaults');
const styleHander = require('./postcss/index');
const { ConcatSource } = require('webpack-sources');
class UniappTailwindcssWebpackPlugin {
  options = {};
  constructor(options) {
    this.options = getOptions(options);
  }
  apply(compiler) {
    const { cssMatcher, htmlMatcher, isMainChunk, mainCssChunkMatcher } = this.options;
    
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      const entries = Object.entries(compilation.assets)
      for (const [filename, originalSource] of entries) {
        if (cssMatcher(filename)) {
          const rawSource = originalSource.source().toString()
          const css = styleHander(rawSource, {
            isMainChunk: mainCssChunkMatcher(filename)
          })
          const source = new ConcatSource(css);
          compilation.updateAsset(filename, source);
        } else if (htmlMatcher) {
          const rawSource = originalSource.source().toString()
        }
      }
    })
  }
}

module.exports = UniappTailwindcssWebpackPlugin;
