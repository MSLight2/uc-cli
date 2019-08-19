### 一个基于 webpack4 配置的vue开发环境 ###
    git clone (this project)
    
    cd  vue-cli-forLog
    
    npm i
    
    npm run dev
    
    open http://localhost:8080/
    
    build: npm run build
#### 具体配置请看`build`文件夹 ####

`webpack.base.conf.js` ---- 最基本配置

`webpack.dev.conf.js`  ---- 开发环境配置

`webpack.prod.conf.js` ---- 生产环境打包配置

`config.js`            ---- 可自定义的配置，覆盖原有配置（dev: 开发环境，build: 生产环境）

#### config.js ####
`dev.host`: 开发环境启动地址。默认`localhost`

`dev.port`: 启动端口。默认`8080`

`dev.terminalProcess`: 开发环境启动时查看编译进度；有两种可选模式：bar为进度条模式，default以百分比显示进度

`dev.autoOpenBrowser`: 编译完成是否自动在浏览器打开。默认false

`dev.showsErrFullScreen`: eslint的校验错误是否在浏览器屏幕上显示（类似遮罩层的效果）。默认false

`dev.proxy`: 前端代理配置。默认{}

`build.sourceMap`: 是否启用sourceMap。默认false


>遗留问题：config.js下有个`portIsOccupied`方法检测端口是否被占用，占用则用新端口；本意用于解决webpack-dev-server端口占用问题，但并未生效。（暂时没找到解决办法，有知道的希望可以指点一下~）
