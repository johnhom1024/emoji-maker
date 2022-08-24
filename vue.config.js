/*
 * @Date: 2022-03-23 21:57:22
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 
 */

const { UniAppWeappTailwindcssWebpackPluginV4 } = require('weapp-tailwindcss-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new UniAppWeappTailwindcssWebpackPluginV4()]
  },
  transpileDependencies: ['uview-ui']
}