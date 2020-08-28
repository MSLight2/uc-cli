const spawn = require('cross-spawn')
const portfinder = require('portfinder');
const config =  require('./config');

let defaultPort = config.dev.port
portfinder.getPort({ port: defaultPort }, function(err, port) {
  console.log(defaultPort, '--', port)
  if (!err) {
    let portConfig = []
    if (defaultPort !== port) {
      // 加此配置会覆盖devServer中的配置
      portConfig = ['--port', port]
    }
    // npm: set NODE_ENV=development && webpack-dev-server --config build/webpack.dev.conf.js
    spawn('webpack-dev-server', ['--config', 'build/webpack.dev.conf.js', ...portConfig], { stdio: 'inherit'})
  }
})