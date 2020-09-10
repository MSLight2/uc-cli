const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const memFs = require('mem-fs')
const memEditor = require('mem-fs-editor')

const CuUtils = require('./cu-utils')
const Command = require('./command')
let Constant = require('./constant')

class Creator {
  constructor (options) {
    // 获取当前命令的执行目录
    const originalDirectory = process.cwd()
    this.cuUtils = new CuUtils()
    this.projectPath = this.cuUtils.getProjectPath([options.name])
    this.cmd = new Command()
    this.pakCommand = this.cmd.getCommand('npm') // 默认使用npm

    this.store = memFs.create()
    this.fs = memEditor.create(this.store)
  }

  /**
   * @method copyTemplate
   * @param {创建方式} mode 
   */
  copyTemplate (options, mode = 'default') {
    this.pakCommand = this.cmd.getCommand(
      options.installCommand === 'auto' ? null : options.installCommand
    )
    if (!this.pakCommand) this.pakCommand = 'npm'

    let vueTmplPath = 'template/vue/base/.',
        reactTmplPath = 'template/react/base/.'
    let templatePath = vueTmplPath
    if (options.createType === 'vue') {
      templatePath = vueTmplPath
    } else if (options.createType === 'react') {
      templatePath = reactTmplPath
    }

    fs.mkdirSync(this.projectPath)
    this.cuUtils.copyDir(templatePath, this.projectPath)

    let projectSrc = path.join(this.projectPath, '/src')
    let installPkgName = []
    let addRouter = false
    let addVuex = false
    let inDev = false

    // 配置vue-router、vuex、axios
    if (options.router === 'y') {
      this.cuUtils.copyDir('template/vue/vue-router/.', projectSrc)
      installPkgName.push(Constant.VUE_ROUTER)
      addRouter = true
    }
    if (options.vuex === 'y') {
      this.cuUtils.copyDir('template/vue/vue-vuex/.', projectSrc)
      installPkgName.push(Constant.VUEX)
      addVuex = true
    }
    if (options.requestFrame === 'y') {
      this.cuUtils.copyDir('template/vue/axios/.', projectSrc)
      installPkgName.push(Constant.AXIOS)
      installPkgName.push(Constant.QS)
    }
    if (mode === Constant.CREATE_MODE_DEFAULT) {
      addRouter = false
      addVuex = false
    }

    // 复制App.vue和main.js
    this.copyDynamicFile('template/vue/App.vue', path.join(projectSrc, 'App.vue'), {
      addRouter
    })
    this.copyDynamicFile('template/vue/main.js', path.join(projectSrc, 'main.js'), {
      addRouter,
      addVuex
    })
    // package.json
    this.copyDynamicFile('template/vue/package.json', path.join(this.projectPath, 'package.json'), {
      name: options.name,
    })

    // 配置CSS预处理器
    if (options.cssPreName !== 'none') {
      inDev = true
      let preName = options.cssPreName
      if (preName === 'sass') {
        installPkgName = installPkgName.concat(['sass', 'sass-loader'])
      } else if (preName === 'less') {
        installPkgName = installPkgName.concat(['less', 'less-loader'])
      } else if (preName === 'stylus') {
        installPkgName = installPkgName.concat(['stylus', 'stylus-loader'])
      }
      this.copyDynamicFile('template/vue/webpack/config.js', path.join(this.projectPath, '/build/config.js'), {
        cssPreName: preName
      })
    }

    // 配置eslint
    if (options.eslint !== 'none') {
      inDev = true
      let eslintFormat = options.eslint
      if (eslintFormat === 'standard') {
        installPkgName.push('standard')
      } else if (eslintFormat === 'prettier') {
        installPkgName = installPkgName.concat([
          'prettier', 'eslint-plugin-prettier', 'eslint-config-prettier'
        ])
      } else if (eslintFormat === 'airbnb') {
        installPkgName = installPkgName.concat(['eslint-config-airbnb-base'])
      }
      this.copyDynamicFile('template/vue/\.eslintrc.js', path.join(this.projectPath, '\.eslintrc.js'), {
        eslintFormat: eslintFormat
      })
    }

    this.fs.commit(() => {
      this.installPackage(mode, installPkgName, inDev)
    })
  }

  installPackage (mode, installPkgName, inDev = false) {
    if (mode === Constant.CREATE_MODE_MANUAL) {
      if (installPkgName.length > 0) {
        console.log()
        console.log('正在安装必要的包，请不要关闭终端。耐心等待...')
        let pkg = this.cmd.pkgInstall(
          this.pakCommand,
          installPkgName,
          inDev,
          { stdio: 'inherit', cwd: this.projectPath }
        )
        pkg.on('close', (code) => {
          console.log()
          this.buildFinshed(false, false)
        })
      } else {
        this.defaultInstall()
      }
    } else {
      // 默认模式创建时，执行install
      this.defaultInstall()
    }
  }

  // 默认安装
  defaultInstall () {
    console.log()
    console.log('默认安装中。请耐心等待...')
    let ls = this.cmd.spawn(this.pakCommand, ['i'],  { stdio: 'inherit', cwd: this.projectPath })
    ls.on('close', (code) => {
      console.log()
      this.buildFinshed(true)
    })
  }

  buildFinshed (install = false, showInsTip = false) {
    console.log()
    if (install) {
      console.log(chalk.green('包安装完成 √'))
    }
    console.log(chalk.green('cu-cli 构建完成 √'))
    console.log()
    console.log('开始项目：')
    console.log(chalk.blue(`  $ cd ${this.cuUtils.getProjectName(false)}${install || showInsTip ? '' : ` && ${this.pakCommand} install`}`))
    console.log(chalk.blue('  $ npm run serve'))
    console.log()
  }
  
  copyFile (from, to) {
    this.fs.copy(from, to)
  }

  copyDynamicFile (from, to, data = {}) {
    this.fs.copyTpl(from, to, data)
  }
}

module.exports = Creator
