const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function cssPreRule (name, env) {
  let exp = ''
  let extractLoader = env !== 'production'
    ? 'vue-style-loader'
    : MiniCssExtractPlugin.loader
  let useLoader = [extractLoader, 'css-loader', 'postcss-loader']
  switch (name) {
    case 'sass':
      exp = '\.scss$'
      useLoader.push('sass-loader')
      break
    case 'less':
      exp = '\.less$'
      useLoader.push('less-loader')
      break
    case 'stylus':
      exp = '\.styl(us)?$'
      useLoader.push('stylus-loader')
      break
    default:
      break
  }
  if (exp) {
    exp = new RegExp(exp)
  } else {
    return {}
  }
  return {
    test: exp,
    use: useLoader
  }
}

module.exports = {
  cssPreRule: cssPreRule
}
