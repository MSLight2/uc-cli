#!/usr/bin/env node

'use strict';

const chalk = require('chalk')
const commander = require('commander')
const envinfo = require('envinfo')
let packageJson = require('../package.json')
const { init } = require('../lib/cu.js')

let cmdOption = null
const program = new commander.Command(packageJson.name)
program
  .version(packageJson.version)
  .arguments('[cmd-option]')
  .usage(`${chalk.green('<cmd-option>')} [args]`)
  .action(cmd => {
    cmdOption = cmd
  })
  .option('-I, --info', 'print environment debug info')
  .allowUnknownOption()
  .on('--help', () => {
    console.log()
    console.log(
      `  ${chalk.green('<cmd-option>: ')}           可选：create add`
    )
    console.log(
      `  ${chalk.green('<arg>: ')}                  例如create: create后面的参数为项目名称)`
    )
    console.log()
    console.log(
      `  ${chalk.green('create projectName')}       projectName: 项目名称`
    )
    console.log(
      `  ${chalk.green('add arg')}                  arg: 动态条件配置 (vuex, vue-router等)`
    )
    console.log()
  })
  .parse(process.argv)

if (program.info) {
  console.log(chalk.bold('\nEnvironment Info:'))
  console.log(
    `\n  current version of ${packageJson.name}: ${packageJson.version}`
  )
  console.log(`  running from ${__dirname}`)
  return envinfo
    .run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'npm', 'Yarn'],
        Browsers: [
          'Chrome',
          'Edge',
          'Internet Explorer',
          'Firefox',
          'Safari',
        ],
        npmPackages: ['vue', 'react'],
        npmGlobalPackages: ['uc-cli'],
      },
      {
        duplicates: true,
        showNotFound: true,
      }
    )
    .then(console.log);
}

if (typeof cmdOption === 'undefined') {
  console.log(`\n${chalk.red('uc-cli error: 请输入正确的指令')}`)
  console.log('例如: cu create projectName. 使用--help指令查看详情')
  process.exit(1)
}

if (cmdOption === 'create') {
  init()
} else if (cmdOption === 'add') {
  // add()
  console.log('开发中...')
  process.exit(1)
} else {
  process.exit(1)
}
