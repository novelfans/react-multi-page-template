1. 目录结构
   ----dist 打包发布由 webpack 自动生成该目录，无需上传到 git 上
   ----network 网络请求
   ----node_modules
   ----src
   ---------pages 自动会扫描 pages 目录，生成对应的 webpack 入口信息及其 HtmlWebpackPlugin
   -------------页面名
   ---------------------index.js
   ---------------------页面.tsx
   ---------------------config.js 导出 title 属性用于 HtmlWebpackPlugin
   ----dev-server.js 本地调试启动服务器
   ----utils.js 生成多页面的逻辑或一些优化配置
   ----webpack.config.js webapck 的配置文件
   ----tsconfig.json typescript 配置文件
   ----.babelrc babel 转换 ES6 语法的配置文件
   ----.gitignore git 忽略文件

支持：

```
1. webpack+typescript+babel+react
2. 多页面生成
3. css/less 模块化
4. 图片转 base64(<=3kb)或原样打包
5. production下代码压缩 Uglify
6. development 下开启 inline-source-map
```

2. 命令
   2.1 本地调试：

```
npm run dev
```

2.2 打包发布

```
npm run build
```
