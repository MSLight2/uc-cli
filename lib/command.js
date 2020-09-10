const spawn = require('cross-spawn')
const which = require('which')
const chalk = require('chalk')
const { exec, execSync } = require('child_process');

class Command {
  constructor () {
  }

  getCommand (command) {
    let npms = ['yarn', 'npm', 'cnpm']
    try {
      if (command && which.sync(command)) return command
      for (let i = 0; i < npms.length; i++) {
        let npmPath = which.sync(npms[i])
        if (npmPath) return npms[i]
      }
    } catch (error) {
      console.log(chalk.red(`cu-cli error: ${command}指令不可用`))
      console.log(error)
      process.exit(1)
    }
  }

  spawn (command, args, options = { stdio: 'inherit' }) {
    return spawn(command, args, options)
  }

  pkgInstall (command, pkgName, development = false, options) {
    let installDepend = '--save'
    if (development) installDepend += '-dev'
    return spawn(command, ['install', ...pkgName, installDepend, ], options)
  }

  exec (commandStr, options, cb) {
    return exec(commandStr, options, cb)
  }

  execSync (commandStr, options) {
    return execSync(commandStr, options)
  }
}

module.exports = Command
