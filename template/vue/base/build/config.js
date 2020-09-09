let config = {
  base: {
    // css预处理器
    cssPre: ''
  },
  dev: {
    host: 'localhost',
    port: 8080,
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
