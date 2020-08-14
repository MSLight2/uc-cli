let config = {
  dev: {
    host: 'localhost',
    port: portIsOccupied(8082),
    // 查看编译进度，可选值: (bar | default)
    terminalProcess: 'default',
    // 是否自动在浏览器打开
    autoOpenBrowser: false,
    // 错误信息是否在屏幕上显示
    showsErrFullScreen: false,
    proxy: {}
  },
  build: {
    sourceMap: false
  }
}

module.exports = config

function portIsOccupied (port) {
  const net = require('net')
  const server = net.createServer().listen(port)
  let noOccPort = port
  server.on('listening',() => {
    noOccPort = port
    server.close()
  })
  server.on('error',(err)=>{
    if (err.code === 'EADDRINUSE') {
      console.log(`${port}端口已被占用，自动启用端口:${port + 1}`)
      portIsOccupied(port + 1)
    }
  })
  return noOccPort
}