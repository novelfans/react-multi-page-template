const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 抽取react到另外一个chunk钟
const vendor_react = 'vendors/react'
const optimization = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /react/i,
        priority: 1,
        name: vendor_react,
        enforce: true
      },
      default: false
    }
  }
}

/**搜索src/pages目录下子路径 */
const src = path.resolve(__dirname, 'src')
const pages = glob.sync('pages/**/index.js', { cwd: src })
let entries = {}
let htmls = []
pages.forEach(page => {
  const m = page.match(/(pages\/.*)\//)
  if (m && m.length === 2) {
    // 动态生成webpack 入口配置
    const pageName = m[1]
    entries[pageName] = path.resolve(src, page)
    // 动态生成对应的htmlwebpackplugin配置
    const config = require(path.resolve(src, pageName, 'config.js'))
    let plugin = new HtmlWebpackPlugin({
      title: config.title,
      template: './src/index.html',
      inject: 'body',
      filename: `${pageName}/index.html`,
      favicon: './src/assets/favicon.png',
      chunks: [pageName, vendor_react]
    })
    htmls.push(plugin)
  }
})
console.log('entries: ', entries)

const publicPath = process.env.NODE_ENV === 'debug' ? '/' : '/yqt/'
const output = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name]/index.bundle.js',
  publicPath
}

module.exports = {
  entries,
  htmls,
  output,
  optimization
}
