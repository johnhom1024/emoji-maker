/*
 * @Date: 2022-03-23 21:57:22
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */
const UniappTailwindcssWebpackPlugin = require('./plugins/tailwindcss-webpack-plugin/UniappTailwindcssWebpackPluginV4');

module.exports = {
  transpileDependencies: ['uview-ui'],
  configureWebpack: {
    plugins: [new UniappTailwindcssWebpackPlugin()]
  }
}