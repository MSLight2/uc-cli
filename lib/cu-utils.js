const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const Command = require('./command')

class CuUtils {
  constructor () {
    this.cmd = new Command()
  }

  getProjectName (check = true) {
    let cmdArg = process.argv
    let projectName = cmdArg[3]
    if (!check) return projectName
    if (fs.existsSync(projectName)) {
      console.log(chalk.red('uc-cli error: 项目已存在，请换个项目名称'))
      process.exit(1)
    } else if (!projectName) {
      console.log(chalk.red('uc-cli error: 请输入项目名称。例如：' + chalk.blue('myProject')))
      process.exit(1)
    }
    return projectName
  }
  
  // 获取项目路径
  getProjectPath (pathArray = []) {
    // 获取当前命令的执行目录
    const originalDirectory = process.cwd()
    return path.join(originalDirectory, ...pathArray)
  }

  // 目录拷贝
  copyDir (fromDirPath, toDirPath) {
    this.cmd.spawn('cp', ['-r', fromDirPath, toDirPath])
  }
}

module.exports = CuUtils 
