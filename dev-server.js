const path = require('path')

const mode = process.env.NODE_ENV === 'debug' ? 'development' : 'production'

const devTool = mode === 'development' ? 'inline-source-map' : 'none'

function getLocalIP() {
  const os = require('os')
  const ifaces = os.networkInterfaces()
  let locatIp = ''
  for (let dev in ifaces) {
    if (/en\d+/.test(dev) || /(本地链接|local)/i.test(dev)) {
      for (let j = 0; j < ifaces[dev].length; j++) {
        if (ifaces[dev][j].family === 'IPv4') {
          locatIp = ifaces[dev][j].address
          break
        }
      }
    }
  }
  return locatIp
}

const devServer = () => {
  if (mode === 'development') {
    return {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      progress: true,
      port: 8080,
      hot: true,
      open: true,
      inline: true,
      useLocalIp:true,
      openPage: 'pages/home'
    }
  } else {
    return undefined
  }
}

module.exports = {
  mode,
  devTool,
  devServer
}
