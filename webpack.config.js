const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const devServer = require('./dev-server')
const tool = require('./utils')

module.exports = {
  mode: devServer.mode,
  entry: tool.entries,
  output: tool.output,
  devtool: devServer.devTool,
  devServer: devServer.devServer(),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.less'],
    alias: {
      '@': path.resolve(__dirname)
    }
  },
  optimization: tool.optimization,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]--[local]--[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]--[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 3,
              fallback: {
                loader: 'file-loader',
                options: {
                  outputPath: (url, resourcePath, context) => {
                    let matchs = resourcePath.match(/src\/(.*)/)
                    if (matchs && matchs.length >= 2) {
                      return `images/${matchs[1]}`
                    } else {
                      return `images/common/${url}`
                    }
                  }
                }
              }
            }
          }
        ]
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    ...tool.htmls,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new UglifyJsPlugin()
  ]
}
