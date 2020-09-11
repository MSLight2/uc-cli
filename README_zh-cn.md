### UC-CLI

[English Documents](https://github.com/MSLight2/uc-cli/blob/master/README.md)

**一个基于`Webpack4`的用户自定义cli工具**

一个可以快速构建`Vue/React`项目的工具。目前，只支持`Vue`项目构造

有手动构建和默认构建两种模式

在手动构建模式下，你根据自定义选项构建出你自己的项目。例如：是否添加`vue-router`、`vuex`等

项目构建成功后，你这在`build`文件夹下的更改`webpack`的配置

使用方式和`vue-cli`类似

- 可以在[Github](https://github.com/MSLight2/uc-cli)的`template`分支中查看webpack配置模板

#### 使用: 
> npm install -g uc-cli
> 
> uc create my-project

#### 构建成功后，跳转到项目文加下运行：
> npm run serve
> 
> npm run build
