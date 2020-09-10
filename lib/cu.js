const chalk = require('chalk')
const inquirer = require('inquirer')
const CuUtils = require('./cu-utils')
const Creator = require('./creator')
let packageJson = require('../package.json')
let Constant = require('./constant')
let promptQuestions = require('./questions/questio')

let options = {}
let creatot = null

function init () {
  let cuUtils = new CuUtils()
  options.name = cuUtils.getProjectName()

  console.log()
  console.log(chalk.hex('#f3ec00')(`欢迎使用cu-cli version: ${packageJson.version}`))
  console.log()
  console.log(chalk.white(`项目创建在: ${process.cwd()}`))
  console.log()

  createType().then(creatProjectMode).then(mode => {
    options = Object.assign({}, options, mode)
    creatot = new Creator(options)
    if (mode.createMode === Constant.CREATE_MODE_MANUAL) {
      manualCreate()
    } else {
      inquirer.prompt([promptQuestions['installCommand']]).then(cmd => {
        options = Object.assign({}, options, cmd)
        defaultCreate()
      })
    }
  })
}

// 创建项目类型
function createType () {
  return inquirer.prompt([promptQuestions['createType']])
}

// 创建项目的方式
function creatProjectMode (type) {
  if (type.createType === 'react') {
    console.log()
    console.log(chalk.red('cu-cli error: 暂不支持创建react项目'))
    process.exit(1)
  }
  options = Object.assign({}, options, type)
  return inquirer.prompt([promptQuestions['createMode']])
}

// 手动配置创建项目
function manualCreate () {
  getUserOption().then(answers => {
    options = Object.assign({}, options, answers)
    creatot.copyTemplate(options, Constant.CREATE_MODE_MANUAL)
  })
}

// 默认创建项目
function defaultCreate () {
  creatot.copyTemplate(options)
}

// 和用户交互，获取用户配置
function getUserOption () {
  let qustions = []
  qustions.push(promptQuestions['cssPreName'])
  qustions.push(promptQuestions['eslint'])
  qustions.push(promptQuestions['router'])
  qustions.push(promptQuestions['vuex'])
  qustions.push(promptQuestions['requestFrame'])
  qustions.push(promptQuestions['installCommand'])

  return inquirer.prompt(qustions)
}

module.exports = {
  init
}
