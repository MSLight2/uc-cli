const chalk = require('chalk')

let qustions = {
  createType: {
    name: 'createType',
    type: 'list',
    message: '选择创建项目类型: ',
    choices: ['vue', 'react']
  },
  createMode: {
    name: 'createMode',
    type: 'list',
    message: '选择创建项目的方式: ',
    choices: ['manual', 'default']
  },
  cssPreName: {
    name: 'cssPreName',
    type: 'list',
    message: '请选择你要添加的CSS预处理器: ',
    choices: ['none', 'sass', 'less', 'stylus']
  },
  eslint: {
    name: 'eslint',
    type: 'list',
    message: 'eslint配置：',
    choices: ['none', 'standard', 'prettier', 'airbnb']
  },
  router: {
    name: 'router',
    type: 'input',
    message: '是否添加router (y/n)?',
    validate: (input) => {
      if (!qustions.isYorN(input)) return
      return true
    }
  },
  vuex: {
    name: 'vuex',
    type: 'input',
    message: '是否添加vuex (y/n)?',
    validate: (input) => {
      if (!qustions.isYorN(input)) return
      return true
    }
  },
  requestFrame: {
    name: 'requestFrame',
    type: 'input',
    message: '是否添加axios (y/n)?',
    validate: (input) => {
      if (!qustions.isYorN(input)) return
      return true
    }
  },
  installCommand: {
    name: 'installCommand',
    type: 'list',
    message: '选择包管理器：',
    choices: ['auto', 'yarn', 'npm', 'cnpm']
  },
  isYorN: (val) => {
    val = val && val.toLowerCase()
    let v = ['y', 'yes', 'n', 'no']
    if (v.indexOf(val) === -1) {
      console.log(chalk.red(' 请输入 y 或 n'))
      return false
    }
    return true
  }
}

module.exports = qustions