var path = require('path');
const os = require('os');
const merge = require('webpack-merge');
const WebpackBaseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DevWebpackConfig = merge(WebpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    compress: true,
    // // 控制台初始启动信息之外都不显示
    // quiet: true,
    host: '0.0.0.0',
    noInfo: true,
    stats: "errors-only",
    open: true,
    clientLogLevel: 'none',
    hot: true,
    port: 8040,
    // // 是否在屏幕上显示错误
    // overlay: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 500,
      poll: 500
    },
    after (app, server) {
      terminalLog(server)
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '..', 'public/index.html')
    }),
    // 热更新
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = DevWebpackConfig

function getIPAdress () {
  let localIPAddress = '';
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        localIPAddress = alias.address;
      }
    }
  }
  return localIPAddress
}

function terminalLog (server) {
  /**
   * \033[背景色编号;字色编号m
   * 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
   * 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
   * \033[0m 关闭所有属性
   * \033[1m 设置高亮度
   * \033[4m 下划线
   * \033[5m 闪烁
   * \033[7m 反显
   * \033[8m 消隐
   * \033[nA 光标上移n行
   * \033[nB 光标下移n行
   * \033[nC 光标右移n列
   * \033[nD 光标左移n列
   * \033[y;xH 设置光标位置（y列x行）
   * \033[2J 清屏
   * \033[K 清除从光标到行尾的内容
   */
  let devServer = server.compiler.options.devServer;
  console.log('Use \033[40;33mCtrl+C\033[0m to close it\r\n')
  console.log(
    'App running at:\n' +
    '- Local:   \033[40;35mhttp://localhost:' + devServer.port +'/\033[0m\n' +
    '           \033[40;35mhttp://' + devServer.host + ':' + devServer.port +'/\033[0m\n' +
    '- Network: \033[40;35mhttp://' + getIPAdress() + ':' + devServer.port +'/\033[0m\r\n'
  )
  console.log('In production mode you need to run\033[40;34m npm run build\033[0m\n')
}

const compiler = webpack({...DevWebpackConfig});
compiler.run((err, stats) => {
})