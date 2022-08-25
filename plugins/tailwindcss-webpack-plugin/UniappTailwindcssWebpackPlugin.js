const pluginName = require("./shared");
const getOptions = require('./defaults');
class UniappTailwindcssWebpackPlugin {
  options = {};
  constructor(options) {
    this.options = getOptions(options);
  }
  apply(compiler) {
    // 可以从编译器对象访问 webpack 模块实例
    // 并且可以保证 webpack 版本正确
    const { webpack } = compiler;
    // 获取 Compilation 后续会用到 Compilation 提供的 stage
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          state: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const entries = Object.entries(assets)

          for (const [filename, originalSource] of entries) {

            console.log('----------johnhomLogDebug filename', filename)
            console.log('----------johnhomLogDebug originalSource', originalSource)
          }
        }
      );
    });
  }
}

module.exports = UniappTailwindcssWebpackPlugin;
