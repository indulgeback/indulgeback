---
title: Node.js教程
date: 2023-04-12
author: liuwy
categories:
 - 技术
tags:
 - Javascript
---


## 一、初识Node.js

## 1.初识Node.js

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
>
> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
>
> Node.js 作为一个 JavaScript 的运行环境，仅仅提供了基础的功能和 API。然而，基于 Node.js 提供的这些基础能，很多强大的工具和框架如雨后春笋，层出不穷，所以学会了 Node.js ，可以让前端程序员胜任更多的工作和岗位：
>
> ① 基于 Express 框架（<http://www.expressjs.com.cn/），可以快速构建> Web 应用
>
> ② 基于 Electron 框架（<https://electronjs.org/），可以构建跨平台的桌面应用>
>
> ③ 基于 restify 框架（<http://restify.com/），可以快速构建> API 接口项目
>
> ④ 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc…

## 2.fs文件系统模块

### 1.fs.readFile() 方法

> 用来读取指定文件中的内容

```js
// 1. 导入 fs 模块，来操作文件
const fs = require('fs')
// 2. 调用 fs.readFile() 方法读取文件
//    参数1：读取文件的存放路径
//    参数2：读取文件时候采用的编码格式，一般默认指定 utf8
//    参数3：回调函数，拿到读取失败和成功的结果  err  dataStr
fs.readFile('./files/1.txt', 'utf8', function(err, dataStr) {
  // 2.1 打印失败的结果
  // 如果读取成功，则 err 的值为 null
  // 如果读取失败，则 err 的值为 错误对象，dataStr 的值为 undefined
  console.log(err)
  console.log('-------')
  // 2.2 打印成功的结果
  console.log(dataStr)
})
//---------------------------------------判断文件是否读取成功---------------------------------------------
const fs = require('fs')
fs.readFile('./files/成绩-ok.txt', 'utf8', function(err, dataStr) {
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }
  console.log('读取文件成功！' + dataStr)
})
```

### 2.fs.writeFile() 方法

> 用来向指定的文件中写入内容

```js
// 1. 导入 fs 文件系统模块
const fs = require('fs')

// 2. 调用 fs.writeFile() 方法，写入文件的内容
//    参数1：表示文件的存放路径
//    参数2：表示要写入的内容
//    参数3：回调函数
fs.writeFile('./files/3.txt', 'ok123', function(err) {
  // 2.1 如果文件写入成功，则 err 的值等于 null
  // 2.2 如果文件写入失败，则 err 的值等于一个 错误对象
  // console.log(err)

  if (err) {
    return console.log('文件写入失败！' + err.message)
  }
  console.log('文件写入成功！')
})
```

## 3.path路径模块

### 1.path.join() 方法

> 用来将多个路径片段拼接成一个完整的路径字符串

```js
//解决路径问题
const path = require('path')
const fs = require('fs')

// 注意：  ../ 会抵消前面的路径
// const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
// console.log(pathStr)  // \a\b\d\e

// fs.readFile(__dirname + '/files/1.txt')

fs.readFile(path.join(__dirname, '/files/1.txt'), 'utf8', function (err, dataStr) {
  if (err) {
    return console.log(err.message)
  }
  console.log(dataStr)
})
```

### 2.path.basename() 方法

> 用来从路径字符串中，将文件名解析出来

```js
const path = require('path')

// 定义文件的存放路径
const fpath = '/a/b/c/index.html'
// 得到最后路径文件名，包括扩展名
const fullName = path.basename(fpath)
console.log(fullName)
// 得到最后路径文件名，去掉扩展名
const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt)
```

### 3.path.extname() 方法

> 可以获取路径中的扩展名部分

```js
const path = require('path')

// 这是文件的存放路径
const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext)
```

### 4.综合案例——时钟

```js
// 1.1 导入 fs 模块
const fs = require('fs')
// 1.2 导入 path 模块
const path = require('path')

// 1.3 定义正则表达式，分别匹配 <style></style> 和 <script></script> 标签
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 2.1 调用 fs.readFile() 方法读取文件
fs.readFile(path.join(__dirname, '../素材/index.html'), 'utf8', function(err, dataStr) {
  // 2.2 读取 HTML 文件失败
  if (err) return console.log('读取HTML文件失败！' + err.message)
  // 2.3 读取文件成功后，调用对应的三个方法，分别拆解出 css, js, html 文件
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})

// 3.1 定义处理 css 样式的方法
function resolveCSS(htmlStr) {
  // 3.2 使用正则提取需要的内容
  const r1 = regStyle.exec(htmlStr)
  // 3.3 将提取出来的样式字符串，进行字符串的 replace 替换操作
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
  // 3.4 调用 fs.writeFile() 方法，将提取的样式，写入到 clock 目录中 index.css 的文件里面
  fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, function(err) {
    if (err) return console.log('写入 CSS 样式失败！' + err.message)
    console.log('写入样式文件成功！')
  })
}

// 4.1 定义处理 js 脚本的方法
function resolveJS(htmlStr) {
  // 4.2 通过正则，提取对应的 <script></script> 标签内容
  const r2 = regScript.exec(htmlStr)
  // 4.3 将提取出来的内容，做进一步的处理
  const newJS = r2[0].replace('<script>', '').replace('</script>', '')
  // 4.4 将处理的结果，写入到 clock 目录中的 index.js 文件里面
  fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, function(err) {
    if (err) return console.log('写入 JavaScript 脚本失败！' + err.message)
    console.log('写入 JS 脚本成功！')
  })
}

// 5.1 定义处理 HTML 结构的方法
function resolveHTML(htmlStr) {
  // 5.2 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
  const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
  // 5.3 写入 index.html 这个文件
  fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function(err) {
    if (err) return console.log('写入 HTML 文件失败！' + err.message)
    console.log('写入 HTML 页面成功！')
  })
}
```

## 4.http服务器模块

### 1.创建最基本的web服务器

```js
// 1. 导入 http 模块
const http = require('http')
// 2. 创建 web 服务器实例
const server = http.createServer()
// 3. 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', function (req, res) {
  console.log('Someone visit our web server.')
})
// 4. 启动服务器
server.listen(8080, function () {
  console.log('server running at http://127.0.0.1:8080')
})
```

### 2.req 请求对象 res 响应对象

```js
server.on('request', (req, res) => {
  // 定义一个字符串，包含中文的内容
  const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`
  // res.end() 将内容响应给客户端
  res.end(str)
})
```

### 3.解决中文乱码

```js
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  // 定义一个字符串，包含中文的内容
  const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`
  // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // res.end() 将内容响应给客户端
  res.end(str)
})
server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
```

### 4.根据不同的 url 响应不同的 html 内容

> ① 获取请求的 url 地址
>
> ② 设置默认的响应内容为 404 Not found
>
> ③ 判断用户请求的是否为 / 或 /index.html 首页
>
> ④ 判断用户请求的是否为 /about.html 关于页面
>
> ⑤ 设置 Content-Type 响应头，防止中文乱码
>
> ⑥ 使用 res.end() 把内容响应给客户端

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  // 1. 获取请求的 url 地址
  const url = req.url
  // 2. 设置默认的响应内容为 404 Not found
  let content = '<h1>404 Not found!</h1>'
  // 3. 判断用户请求的是否为 / 或 /index.html 首页
  // 4. 判断用户请求的是否为 /about.html 关于页面
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>'
  }
  // 5. 设置 Content-Type 响应头，防止中文乱码
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // 6. 使用 res.end() 把内容响应给客户端
  res.end(content)
})

server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
```

### 5.综合案例——实现 clock 时钟的 web 服务器

> ① 导入需要的模块
>
> ② 创建基本的 web 服务器
>
> ③ 将资源的请求 url 地址映射为文件的存放路径
>
> ④ 读取文件内容并响应给客户端
>
> ⑤ 优化资源的请求路径

```js
// 1.1 导入 http 模块
const http = require('http')
// 1.2 导入 fs 模块
const fs = require('fs')
// 1.3 导入 path 模块
const path = require('path')

// 2.1 创建 web 服务器
const server = http.createServer()
// 2.2 监听 web 服务器的 request 事件
server.on('request', (req, res) => {
  // 3.1 获取到客户端请求的 URL 地址
  //     /clock/index.html
  //     /clock/index.css
  //     /clock/index.js
  const url = req.url
  // 3.2 把请求的 URL 地址映射为具体文件的存放路径
  // const fpath = path.join(__dirname, url)
  // 5.1 预定义一个空白的文件存放路径
  let fpath = ''
  if (url === '/') {
    fpath = path.join(__dirname, './clock/index.html')
  } else {
    //     /index.html
    //     /index.css
    //     /index.js
    fpath = path.join(__dirname, '/clock', url)
  }

  // 4.1 根据“映射”过来的文件路径读取文件的内容
  fs.readFile(fpath, 'utf8', (err, dataStr) => {
    // 4.2 读取失败，向客户端响应固定的“错误消息”
    if (err) return res.end('404 Not found.')
    // 4.3 读取成功，将读取成功的内容，响应给客户端
    res.end(dataStr)
  })
})
// 2.3 启动服务器
server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
```

## 二、模块化

## 1.模块化的基本概念

### 1.模块化

#### 1.1 什么是模块化

> **模块化**是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。

#### 1.2 编程领域中的模块化

> 编程领域中的模块化，就是**遵守固定的规则**，把一个大文件拆成独立并互相依赖的多个小模块。
>
> 把代码进行模块化拆分的好处：
>
> ① 提高了代码的复用性
>
> ② 提高了代码的可维护性
>
> ③ 可以实现按需加载

### 2.模块化规范

> **模块化规范**就是对代码进行模块化的拆分与组合时，需要遵守的那些规则。
>
> 例如：
>
> - 使用什么样的语法格式来引用模块
> - 在模块中使用什么样的语法格式向外暴露成员
>
> **模块化规范的好处**：大家都遵守同样的模块化规范写代码，降低了沟通的成本，极大方便了各个模块之间的相互调用，利人利己。

## 2.Node.js 中的模块化

### 1.Node.js 中的模块分类

> Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是：
>
> - 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
> - 自定义模块（用户创建的每个 .js 文件，都是自定义模块）
> - 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

### 2.加载模块

> 使用强大的 require() 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。
>
> 注意：使用 require() 方法加载其它模块时，会执行被加载模块中的代码。

### 3.Node.js 中的模块作用域

#### 3.1 什么是模块作用域

> 和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做==模块作用域==。

#### 3.2 模块作用域的好处

> 防止了全局变量污染的问题

### 4.向外共享模块作用域中的成员

#### 4.1 module 对象

> 在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息。

#### 4.2 module.exports 对象

> 在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
>
> 外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

#### 4.3 共享成员时的注意点

> 使用 require() 方法导入模块时，导入的结果，**永远以 module.exports 指向的对象为准**。

#### 4.4 exports 对象

> 由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。默认情况下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准。

> ==exports 和 module.exports 的使用误区==

> 时刻谨记，require() 模块时，得到的永远是 module.exports 指向的对象：
>
> **注意：**为了防止混乱，建议大家不要在同一个模块中同时使用 exports 和 module.exports

### 5.Node.js 中的模块化规范

> Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。
>
> CommonJS 规定：
>
> ① 每个模块内部，module 变量代表当前模块。
>
> ② module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。
>
> ③ 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。

## 3.npm 与 包

### 1.包

#### 1.1 什么是包

> Node.js 中的第三方模块又叫做包。
>
> 就像电脑和计算机指的是相同的东西，第三方模块和包指的是同一个概念，只不过叫法不同。

#### 1.2 包的来源

> 不同于 Node.js 中的内置模块与自定义模块，包是由第三方个人或团队开发出来的，免费供所有人使用。
>
> **注意**：Node.js 中的包都是免费且开源的，不需要付费即可免费下载使用。

#### 1.3 为什么需要包

> 由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。
>
> 包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。
>
> 包和内置模块之间的关系，类似于 jQuery 和 浏览器内置 API 之间的关系。

#### 1.4 从哪里下载包

> 国外有一家 IT 公司，叫做 **npm, Inc.** 这家公司旗下有一个非常著名的网站： <https://www.npmjs.com/> ，它是全球最大的包共享平台，你可以从这个网站上搜索到任何你需要的包，只要你有足够的耐心！
>
> 到目前为止，全球约 1100 多万的开发人员，通过这个包共享平台，开发并共享了超过 120 多万个包 供我们使用。
>
> **npm, Inc. 公司**提供了一个地址为 <https://registry.npmjs.org/> 的服务器，来对外共享所有的包，我们可以从这个服务
>
> 器上下载自己所需要的包。
>
> **注意：**
>
> - 从 <https://www.npmjs.com/> 网站上搜索自己所需要的包
> - 从 <https://registry.npmjs.org/> 服务器上下载自己需要的包

#### 1.5 如何下载包

> **npm, Inc. 公司**提供了一个包管理工具，我们可以使用这个包管理工具，从 <https://registry.npmjs.org/> 服务器把需要的包下载到本地使用。
>
> 这个包管理工具的名字叫做 Node Package Manager（简称 npm 包管理工具），这个包管理工具随着 Node.js 的安装包一起被安装到了用户的电脑上。
>
> 大家可以在终端中执行 **npm -v** 命令，来查看自己电脑上所安装的 npm 包管理工具的版本号

### 2.npm 初体验

#### 2.1 体验：手撸格式化时间模块

> ① 创建格式化时间的自定义模块
>
> ② 定义格式化时间的方法
>
> ③ 创建补零函数
>
> ④ 从自定义模块中导出格式化时间的函数
>
> ⑤ 导入格式化时间的自定义模块
>
> ⑥ 调用格式化时间的函数

```js
// 1. 定义格式化时间的方法
function dateFormat(dtStr) {
  const dt = new Date(dtStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

// 定义补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

module.exports = {
  dateFormat
}
```

```js
// 测试：
// 导入自定义的格式化时间的模块
const TIME = require('./15.dateFormat')

// 调用方法，进行时间的格式化
const dt = new Date()
// console.log(dt)
const newDT = TIME.dateFormat(dt)
console.log(newDT)
```

#### 2.2 起飞：使用 moment 包格式化时间

> ① 使用 npm 包管理工具，在项目中安装格式化时间的包 moment
>
> ② 使用 require() 导入格式化时间的包
>
> ③ 参考 moment 的官方 API 文档对时间进行格式化

```js
// 1. 导入需要的包
// 注意：导入的名称，就是装包时候的名称
const moment = require('moment')

const dt = moment().format('YYYY-MM-DD HH:mm:ss')
console.log(dt)
```

#### 2.3 在项目中安装包的命令

> 如果想在项目中安装指定名称的包，需要运行如下的命令：
>
> ```bash
> npm install 包的完整名称
> ```
>
> 可以简写为：
>
> ```bash
> npm i 包的完整名称
> ```

#### 2.4 初次装包后多了哪些文件

> 初次装包完成后，在项目文件夹下多一个叫做 node_modules 的文件夹和 package-lock.json 的配置文件。
>
> 其中：
>
> node_modules 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。
>
> package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。
>
> 注意：程序员不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们。

#### 2.5 安装指定版本的包

> 默认情况下，使用 npm install 命令安装包的时候，会自动安装最新版本的包。如果需要安装指定版本的包，可以在包名之后，通过 @ 符号指定具体的版本：
>
> ```bash
> npm i moment@2.22.2
> ```

#### 2.6 包的语义化版本规范

> 包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，例如 **2.24.0**
>
> 其中每一位数字所代表的的含义如下：
>
> 第1位数字：大版本
>
> 第2位数字：功能版本
>
> 第3位数字：Bug修复版本
>
> 版本号提升的规则：只要前面的版本号增长了，则后面的版本号归零。

### 3.包管理配置文件

> npm 规定，在项目根目录中，**必须**提供一个叫做 package.json 的包管理配置文件。用来记录与项目有关的一些配置信息。例如：
>
> - 项目的名称、版本号、描述等
> - 项目中都用到了哪些包
> - 哪些包只在开发期间会用到
> - 那些包在开发和部署时都需要用到

#### 3.1 多人协作问题

> 整个项目的体积是 30.4M
>
> 第三方包的体积是 28.8M
>
> 项目源代码的体积 1.6M
>
> 遇到的问题：第三方包的体积过大，不
>
> 方便团队成员之间共享项目源代码。
>
> 解决方案：共享时剔除node_modules

#### 3.2 如何记录项目中安装了哪些包

> 在项目根目录中，创建一个叫做 package.json 的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除node_modules 目录之后，在团队成员之间共享项目的源代码。
>
> **注意**：今后在项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中。

#### 3.3 快速创建 package.json

> npm 包管理工具提供了一个快捷命令，可以在执行命令时所处的目录中，快速创建 package.json 这个包管理配置文件：

```js
// 作用：在执行命令所处的目录中，快速新建 package.json 文件
npm init -y
```

> 注意：
>
> ① 上述命令只能在英文的目录下成功运行！所以，项目文件夹的名称一定要使用英文命名，不要使用中文，不能出现空格。
>
> ② 运行 npm install 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中。

#### 3.4 dependencies 节点

> package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install 命令安装了哪些包。

#### 3.5 一次性安装所有的包

> 当我们拿到一个剔除了 node_modules 的项目之后，需要先把所有的包下载到项目中，才能将项目运行起来。可以运行 npm install 命令（或 npm i）一次性安装所有的依赖包。

#### 3.6 卸载包

> 可以运行 npm uninstall 命令，来卸载指定的包：
>
> ```js
> // 使用 npm uninstall 具体的包名
> npm uninstall moment
> ```
>
> 注意：npm uninstall 命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 中移除掉。

#### 3.7 devDependencies 节点

> 如果某些包**只在项目开发阶段**会用到，在**项目上线之后不会用到**，则建议把这些包记录到 devDependencies 节点中。
>
> 与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。您可以使用如下的命令，将包记录到 devDependencies 节点中：

```bash
npm i 包名 -D
```

### 4.解决下包速度慢的问题

#### 4.1 为什么下包速度慢

> 在使用 npm 下包的时候，默认从国外的 <https://registry.npmjs.org/> 服务器进行下载，此时，网络数据的传输需要经过漫长的海底光缆，因此下包速度会很慢。

#### 4.2 淘宝 NPM 镜像服务器

> 淘宝在国内搭建了一个服务器，专门把国外官方服务器上的包同步到国内的服务器，然后在国内提供下包的服务。从而极大的提高了下包的速度。
>
> 扩展：
>
> **镜像**（Mirroring）是一种文件存储形式，一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像。

#### 4.3 切换 npm 的下包镜像源

> 下包的镜像源，指的就是下包的服务器地址。

```bash
# 查看当前下包的镜像源
npm config get registry
# 将下包的镜像源切换为淘宝镜像源
npm config set registry = https://registry.npm.taobao.org/
# 检查镜像源是否下载成功
npm config get registry
```

#### 4.4 nrm

> 为了更方便的切换下包的镜像源，我们可以安装 **nrm** 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下包的镜像源。

```bash
# 通过 npm 包管理器，将 nrm 安装为全局可用的工具
npm i nrm -g
# 查看所有可用的镜像源
nrm ls
# 将下包的镜像源切换为 taobao 镜像
nrm use taobao
```

> nrm 折磨了作者我很久，先是 npm 工具全局包的文件夹位置移动，还得配置 npm 全局环境变量，而且最新版本的 nrm 工具，居然适配不了最新版的 CommonJS 中的 required 方法。
>
> 原因：应该使用 open 的 CommonJs规范的包 ，现在 open v9.0.0 是 ES Module 版本的包
>
> 解决方法：将报错的第九行 require 改为 import
>
> 会出一期全局包配置的教程。

### 5.包的分类

> 使用 npm 包管理工具下载的包，共分为两大类，分别是：
>
> - 项目包
> - 全局包

#### 5.1 项目包

> 那些被安装到项目的 node_modules 目录中的包，都是项目包。
>
> 项目包又分为两类，分别是：
>
> - 开发依赖包（被记录到 devDependencies 节点中的包，只在开发期间会用到）
> - 核心依赖包（被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）

```bash
npm i 包名 -D  # 开发依赖包（会被记录到 devDependencies 节点下）
npm i 包名     # 核心依赖包（会被记录到 dependencies 节点下）
```

#### 5.2 全局包

> 在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。
>
> 全局包会被安装到 C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下。

```bash
npm i 包名 -g          # 全局安装指定的包
npm uninstall 包名 -g  # 卸载全局安装的包
```

> 注意：
>
> ① 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。
>
> ② 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。

#### 5.3 i5ting_toc

> i5ting_toc 是一个可以把 md 文档转为 html 页面的小工具，使用步骤如下：

```bash
# 将 i5ting_toc 安装为全局包
npm install -g i5ting_toc
# 调用 i5ting_toc，轻松实现 md 转 html 的功能
i5ting_toc -f 要转换的 md 文件路径 -o
```

### 6.规范的包结构

> 在清楚了包的概念、以及如何下载和使用包之后，接下来，我们深入了解一下包的内部结构。
>
> 一个规范的包，它的组成结构，必须符合以下 3 点要求：
>
> ① 包必须以单独的目录而存在
>
> ② 包的顶级目录下要必须包含 package.json 这个包管理配置文件
>
> ③ package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口。
>
> 注意：以上 3 点要求是一个规范的包结构必须遵守的格式，关于更多的约束，可以参考如下网址：
>
> <https://yarnpkg.com/zh-Hans/docs/package-json>

## 4.模块加载机制

### 1.优先从缓存中加载

> **模块在第一次加载后会被缓存**。 这也意味着多次调用 require() 不会导致模块的代码被执行多次。
>
> 注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

### 2.内置模块的加载机制

> 内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。
>
> 例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。

### 3.自定义模块的加载机制

> 使用 require() 加载自定义模块时，必须指定以 ./ 或 ../ 开头的路径标识符。在加载自定义模块时，如果没有指定 ./ 或 ../ 这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。
>
> 同时，在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：
>
> ① 按照确切的文件名进行加载
>
> ② 补全 .js 扩展名进行加载
>
> ③ 补全 .json 扩展名进行加载
>
> ④ 补全 .node 扩展名进行加载
>
> ⑤ 加载失败，终端报错

### 4.第三方模块的加载机制

> 如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父
>
> 目录开始，尝试从 /node_modules 文件夹中加载第三方模块。
>
> 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。
>
> 例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：
>
> ① C:\Users\itheima\project\node_modules\tools
>
> ② C:\Users\itheima\node_modules\tools
>
> ③ C:\Users\node_modules\tools
>
> ④ C:\node_modules\tools

### 5.目录作为模块

> 当把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：
>
> ① 在被加载的目录下查找一个叫做 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口
>
> ② 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
>
> ③ 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失：Error: Cannot find module 'xxx'

## 三、Express

## 1.初识 Express

### 1.Express 简介

#### 1.1 什么是 Express

> 官方给出的概念：Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。
>
> 通俗的理解：Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。
>
> **Express 的本质**：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。
>
> Express 的中文官网： <http://www.expressjs.com.cn/>

#### 1.2 进一步理解 Express

> 思考：不使用 Express 能否创建 Web 服务器？
>
> 答案：能，使用 Node.js 提供的原生 http 模块即可。
>
> 思考：既生瑜何生亮（有了 http 内置模块，为什么还有用 Express）？
>
> 答案：http 内置模块用起来很复杂，开发效率低；Express 是基于内置的 http 模块进一步封装出来的，能够极大的提高开发效率。
>
> 思考：http 内置模块与 Express 是什么关系？
>
> 答案：类似于浏览器中 Web API 和 jQuery 的关系。后者是基于前者进一步封装出来的。

#### 1.3 Express 能做什么

> 对于前端程序员来说，最常见的两种服务器，分别是：
>
> - Web 网站服务器：专门对外提供 Web 网页资源的服务器。
> - API 接口服务器：专门对外提供 API 接口的服务器。
>
> 使用 Express，我们可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。

### 2.Express 的基本使用

#### 2.1 安装

> 在项目所处的目录中，运行如下的终端命令，即可将 express 安装到项目中使用：

```bash
npm i express
```

#### 2.2 创建基本的 web 服务器

```js
// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()

// 4. 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
  res.send({ name: 'zs', age: 20, gender: '男' })
})
app.post('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
  res.send('请求成功')
})
app.get('/', (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的 查询参数
  // 注意：默认情况下，req.query 是一个空对象
  console.log(req.query)
  res.send(req.query)
})
// 注意：这里的 :id 是一个动态的参数
app.get('/user/:ids/:username', (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
  console.log(req.params)
  res.send(req.params)
})

// 3. 启动 web 服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

### 3.托管静态资源

#### 3.1 express.static()

> express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器，例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```js
app.use(express.static('public'))
```

> 现在，你就可以访问 public 目录中的所有文件了：
>
> <http://localhost:3000/images/bg.jpg>
>
> <http://localhost:3000/css/style.css>
>
> <http://localhost:3000/js/login.js>
>
> **注意：**Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。
>
> 因此，存放静态文件的目录名不会出现在 URL 中。

#### 3.2 托管多个静态资源

> 如果要托管多个静态资源目录，请多次调用 express.static() 函数：

```js
const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
app.use(express.static('./clock'))

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

> 访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。
>

#### 3.3 挂载路径前缀

> 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```js
app.use('/files', express.static('./files'))
```

> 现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：
>
> <http://localhost:3000/public/images/kitten.jpg>
>
> <http://localhost:3000/public/css/style.css>
>
> <http://localhost:3000/public/js/app.js>

### 4.nodemon

#### 4.1 为什么要使用 nodemon

> 在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。现在，我们可以使用 nodemon（<https://www.npmjs.com/package/nodemon）> 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

#### 4.2 安装 nodemon

> 在终端中，运行如下命令，即可将 nodemon 安装为全局可用的工具：

```bash
npm i nodemon -g
```

#### 4.3 使用 nodemon

> 当基于 Node.js 编写了一个网站应用的时候，传统的方式，是运行 ==node app.js== 命令，来启动项目。这样做的坏处是：代码被修改之后，需要手动重启项目。
>
> 现在，我们可以将 node 命令替换为 nodemon 命令，使用 ==nodemon app.js== 来启动项目。这样做的好处是：代码被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果。

## 2.Express 路由

### 1.路由的概念

#### 1.1 什么是路由

> 广义上来讲，路由就是==映射关系==。

#### 1.2 现实中的路由

> 按键 1 -> 业务查询
>
> 按键 2 -> 手机充值
>
> 按键 3 -> 业务办理
>
> 按键 4 -> 密码服务与停复机
>
> 按键 5 -> 家庭宽带
>
> 按键 6 -> 话费流量
>
> 按键 8 -> 集团业务
>
> 按键 0 -> 人工服务
>
> 在这里，路由是==按键==与==服务==之间的==映射关系==

#### 1.3 Express 中的路由

> 在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。
>
> Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下：

```css
app.METHOD(PATH,HANDLER)
```

#### 1.4 Express 中路由的例子

```js
app.get('/', (req, res) => {
  res.send('hello world.')
})

app.post('/', (req, res) => {
  res.send('Post Request.')
})
```

#### 1.5 路由的匹配过程

> 每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。
>
> 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。
>
> 路由匹配的注意点：
>
> ① 按照==定义的先后顺序==进行匹配
>
> ② ==请求类型==和请求的==URL==同时==匹配成功==，才会调用对应的==处理函数==

### 2.路由的使用

#### 2.1 最简单的用法

> 在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上：

```js
const express = require('express')
const app = express()

// 挂载路由
app.get('/', (req, res) => {
  res.send('hello world.')
})
app.post('/', (req, res) => {
  res.send('Post Request.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

#### 2.2 模块化路由

> 为了方便对路由进行模块化的管理，Express **不建议**将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。
>
> 将路由抽离为单独模块的步骤如下：
>
> ① 创建路由模块对应的 .js 文件
>
> ② 调用 express.Router() 函数创建路由对象
>
> ③ 向路由对象上挂载具体的路由
>
> ④ 使用 module.exports 向外共享路由对象
>
> ⑤ 使用 app.use() 函数注册路由模块

#### 2.3 创建路由模块

```js
// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()

// 3. 挂载获取用户列表的路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})
// 4. 挂载添加用户的路由
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})

// 5. 向外导出路由对象
module.exports = router
```

#### 2.4 注册路由

```js
// 1. 导入路由模块
const router = require('./03.router')

// 2. 注册路由模块
app.use(router)
```

#### 2.5 为路由模块添加前缀

> 类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

```js
// 1. 导入路由模块
const router = require('./03.router')

// 2. 使用 app.use() 注册路由模块，并添加统一的访问前缀 /api
app.use('/api', router)
```

## 3.Express 中间件

### 1.中间件的概念

#### 1.1 什么是中间件

> 中间件（Middleware ），特指业务流程的中间处理环节。

#### 1.2 中间件的例子

> 在处理污水的时候，一般都要经过三个处理环节，从而保证处理过后的废水，达到排放标准。
>
> 处理污水的这三个中间处理环节，就可以叫做中间件。

#### 1.3 Express 中间件的调用流程

> 当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

#### 1.4 Express 中间件的格式

> Express 的中间件，本质上就是一个 **function 处理函数**，Express 中间件的格式如下：
>

>
> 注意：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。

#### 1.5 next 函数的作用

> **next 函数**是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。
>

### 2.Express 中间件的初体验

#### 2.1 定义中间件函数

> 可以通过如下的方式，定义一个最简单的中间件函数：

```js
// 定义一个最简单的中间件函数
const mw = function (req, res, next) {
  console.log('这是最简单的中间件函数')
  // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数
  // 把流转关系，转交给下一个中间件或路由
  next()
}
```

#### 2.2 全局生效的中间件

> 客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件：

```js
// 定义一个最简单的中间件函数
const mw = function (req, res, next) {
  console.log('这是最简单的中间件函数')
  // 把流转关系，转交给下一个中间件或路由
  next()
}

// 将 mw 注册为全局生效的中间件
app.use(mw)
```

#### 2.3 定义全局中间件的简化形式

```js
// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
  console.log('这是最简单的中间件函数')
  next()
})
```

#### 2.4 中间件的作用

> 多个中间件之间，**共享同一份** **req** **和** **res**。基于这样的特性，我们可以在上游的中间件中，**统一**为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

```js
const express = require('express')
const app = express()

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
  // 获取到请求到达服务器的时间
  const time = Date.now()
  // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
  req.startTime = time
  next()
})

app.get('/', (req, res) => {
  res.send('Home page.' + req.startTime)
})
app.get('/user', (req, res) => {
  res.send('User page.' + req.startTime)
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

#### 2.5 定义多个全局中间件

> 可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用：

```js
const express = require('express')
const app = express()

// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log('调用了第1个全局中间件')
  next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log('调用了第2个全局中间件')
  next()
})

// 定义一个路由
app.get('/user', (req, res) => {
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

#### 2.6 局部生效的中间件

> **不使用** app.use() 定义的中间件，叫做局部生效的中间件：

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义中间件函数
// mw1 这个中间件只在 “当前路由中生效” ，这种用法属于 “局部生效的中间件”
const mw1 = (req, res, next) => {
  console.log('调用了局部生效的中间件')
  next()
}

// 2. 创建路由
app.get('/', mw1, (req, res) => {
  res.send('Home page.')
})
// mw1 这个中间件不会影响下面下面这个路由
app.get('/user', (req, res) => {
  res.send('User page.')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

#### 2.7 定义多个局部中间件

> 可以在路由中，通过如下两种等价的方式，使用多个局部中间件：

```js
// 以下两种写法是 “完全等价” 的，可根据自己的喜好，选择任意一种方式进行使用 
app.get('/', [mw1, mw2], (req, res) => {
  res.send('Home page.')
})
app.get('/user', mw1, mw2, (req, res) => {
  res.send('User page.')
})
```

#### 2.8 了解中间件的5个注意事项

> ① 一定要在路由之前注册中间件
>
> ② 客户端发送过来的请求，可以连续调用多个中间件进行处理
>
> ③ 执行完中间件的业务代码之后，不要忘记调用 next() 函数
>
> ④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
>
> ⑤ 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

### 3.中间件的分类

> 为了方便大家理解和记忆中间件的使用，Express 官方把常见的中间件用法，分成了 5 大类，分别是：
>
> ① 应用级别的中间件
>
> ② 路由级别的中间件
>
> ③ 错误级别的中间件
>
> ④ Express 内置的中间件
>
> ⑤ 第三方的中间件

#### 3.1 应用级别的中间件

> 通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件：

```js
// 应用级别的中间件（全局中间件）
app.use((req, res, next) => {
 next()
})
// 应用级别的中间件（局部中间件）
app.get('/', mw1, (req, res) =>{
 res.send('Home page')
})
```

#### 3.2 路由级别的中间件

> 绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上：

```js
const app = express()
const router = express.Router()

// 路由级别的中间件
router.use(function (req, res, next) {
 console.log('Time:', Date.now())
 next()
})

app.use('/', router)
```

#### 3.3 错误级别的中间件

> 错误级别中间件的**作用**：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
>
> **格式**：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义路由
app.get('/', (req, res) => {
  // 1.1 人为的制造错误
  throw new Error('服务器内部发生了错误！')
  res.send('Home page.')
})

// 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

> **注意：**错误级别的中间件，必须注册在所有路由之后！

#### 3.4 Express 内置的中间件

> 自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：
>
> ① express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
>
> ② express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
>
> ③ express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())
// 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

app.post('/book', (req, res) => {
  // 在服务器端，可以通过 req,body 来获取 JSON 格式的表单数据和 url-encoded 格式的数据
  console.log(req.body)
  res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

#### 3.5 第三方的中间件

> 非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。
>
> 例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下：
>
> ① 运行 npm install body-parser 安装中间件
>
> ② 使用 require 导入中间件
>
> ③ 调用 app.use() 注册并使用中间件
>
> **注意：**Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')
// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  // 如果没有配置任何解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

### 4.综合案例——自定义中间件

#### 4.1 需求描述与实现步骤

> 自己手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据。
>
> 实现步骤：
>
> ① 定义中间件
>
> ② 监听 req 的 data 事件
>
> ③ 监听 req 的 end 事件
>
> ④ 使用 querystring 模块解析请求体数据
>
> ⑤ 将解析出来的数据对象挂载为 req.body
>
> ⑥ 将自定义中间件封装为模块

#### 4.2 具体实现

> 在中间件中，需要监听 req 对象的 ==data== 事件，来获取客户端发送到服务器的数据。如果==数据量比较大==，==无法一次性发送完毕==，则客户端会把数据==切割==后，==分批==发送到服务器。所以 ==data 事件可能会触发多次==，每一次触发 ==data== 事件时，获取到数据==只是完整数据的一部分==，需要手动对接收到的==数据进行拼接==。
>
> 当请求体数据==接收完毕==之后，会自动触发 req 的 end 事件。因此，我们可以在 req 的 end 事件中，==拿到并处理完整的请求体数据==。
>
> Node.js 内置了一个 ==querystring== 模块，==专门用来处理查询字符串==。通过这个模块提供的 ==parse()== 函数，可以轻松把查询字符串，解析成对象的格式。
>
> ==上游的中间件和下游的中间件及路由之间==，**共享同一份 req 和 res**。因此，我们可以将解析出来的数据，挂载为 req 的自定义属性，命名为 ==req.body==，供下游使用。

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')

// 这是解析表单数据的中间件
app.use((req, res, next) => {
  // 定义中间件具体的业务逻辑
  // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
  let str = ''
  // 2. 监听 req 的 data 事件
  req.on('data', (chunk) => {
    str += chunk
  })
  // 3. 监听 req 的 end 事件
  req.on('end', () => {
    // 在 str 中存放的是完整的请求体数据
    // console.log(str)
    // TODO: 把字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str)
    req.body = body
    next()
  })
})

app.post('/user', (req, res) => {
  res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

#### 4.3 模块化拆分

> 为了优化代码的结构，我们可以把自定义的中间件函数，==封装为独立的模块==。

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 导入自己封装的中间件模块
const customBodyParser = require('./14.custom-body-parser')
// 2. 将自定义的中间件函数，注册为全局可用的中间件
app.use(customBodyParser)

app.post('/user', (req, res) => {
  res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

```js
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')

const bodyParser = (req, res, next) => {
  // 定义中间件具体的业务逻辑
  // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
  let str = ''
  // 2. 监听 req 的 data 事件
  req.on('data', (chunk) => {
    str += chunk
  })
  // 3. 监听 req 的 end 事件
  req.on('end', () => {
    // 在 str 中存放的是完整的请求体数据
    // console.log(str)
    // TODO: 把字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str)
    req.body = body
    next()
  })
}

module.exports = bodyParser
```

## 4.使用 Express 写接口

### 1.创建基本的服务器

```js
// 导入 express
const express = require('express')
// 创建服务器实例
const app = express()

// write your code here

// 启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

### 2.创建 API 路由模块

```js
// apiRouter.js【路由模块】
const express = require('express')
const router = express.Router()

module.exports = router

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// app.js 【导入并注册路由模块】
const apiRouter = require('./apiRouter.js')
app.use('/api', apiRouter)
```

### 3.编写 GET 接口

```js
// 在这里挂载对应的路由
apiRouter.get('/get', (req, res) => {
  // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 调用 res.send() 方法，向客户端响应处理的结果
  res.send({
    status: 0, // 0 表示处理成功，1 表示处理失败
    msg: 'GET 请求成功！', // 状态的描述
    data: query, // 需要响应给客户端的数据
  })
})
```

### 4.编写 POST 接口

```js
// 定义 POST 接口
apiRouter.post('/post', (req, res) => {
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  const body = req.body
  // 调用 res.send() 方法，向客户端响应结果
  res.send({
    status: 0,
    msg: 'POST 请求成功！',
    data: body,
  })
})
```

> 注意：如果要获取URL-encoded 格式的请求体数据，必须配置中间件
>
> app.use(express.urlencoded({
>
> extended: false
>
> }))

### 5.CORS 跨域资源共享

#### 5.1 接口的跨域问题

> 刚才编写的 GET 和 POST接口，存在一个很严重的问题：不支持跨域请求。
>
> 解决接口跨域问题的方案主要有两种：
>
> ① CORS（主流的解决方案，推荐使用）
>
> ② JSONP（有缺陷的解决方案：只支持 GET 请求）

#### 5.2 使用 cors 中间件解决跨域问题

> cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。
>
> 使用步骤分为如下 3 步：
>
> ① 运行 npm install cors 安装中间件
>
> ② 使用 const cors = require('cors') 导入中间件
>
> ③ 在路由之前调用 app.use(cors()) 配置中间件

#### 5.3 什么是 CORS

> CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 **HTTP 响应头**组成，**这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源**。
>
> 浏览器的==同源安全策略==默认会阻止网页“跨域”获取资源。但如果接口服务器==配置了 CORS 相关的 HTTP 响应头==，就可以==解除浏览器端的跨域访问限制==。

#### 5.4 CORS 的注意事项

> ① CORS 主要在==服务器端==进行配置。客户端浏览器**无须做任何额外的配置**，即可请求开启了 CORS 的接口。
>
> ② CORS 在浏览器中==有兼容性==。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。

#### 5.5 CORS 响应头部 - Access-Control-Allow-Origin

> 响应头部中可以携带一个 **Access-Control-Allow-Origin** 字段，其语法如下:

```dart
Access-Control-Allow-Origin:<origin> | *
```

> 其中，origin 参数的值指定了允许访问该资源的外域 URL。
>
> 例如，下面的字段值将**只允许**来自 <http://itcast.cn> 的请求：

```js
res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn')
```

> 如果指定了 Access-Control-Allow-Origin 字段的值为通配符 *****，表示允许来自任何域的请求。

```js
res.setHeader('Access-Control-Allow-Origin', '*')
```

#### 5.6  CORS 响应头部 - Access-Control-Allow-Headers

> 默认情况下，CORS **仅**支持客户端向服务器发送如下的 9 个==请求头==：
>
> Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
>
> 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！

```js
// 允许客户端向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
// 注意：多个请求头之间使用英文的逗号进行分割
res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Custom-Header')
```

#### 5.7  CORS 响应头部 - Access-Control-Allow-Headers

> 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。
>
> 如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods来指明实际请求所允许使用的 HTTP 方法。

```js
// 只允许 GET、POST、DELETE、HEAD 请求方法
res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, HEAD')
```

#### 5.8 CORS 请求的分类

> 客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类，分别是：
>
> ① 简单请求
>
> ② 预检请求

#### 5.9 简单请求

> 同时满足以下两大条件的请求，就属于简单请求：
>
> ① 请求方式：GET、POST、HEAD 三者之一
>
> ② HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）

#### 5.10 预检请求

> 只要符合以下任何一个条件的请求，都需要进行预检请求：
>
> ① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
>
> ② 请求头中包含自定义头部字段
>
> ③ 向服务器发送了 application/json 格式的数据
>
> 在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

#### 5.11 简单请求和预检请求的区别

> **简单请求的特点**：客户端与服务器之间只会发生一次请求。
>
> **预检请求的特点**：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求。

### 6.JSONP 接口

#### 6.1 回顾 JSONP 的概念与特点

> 概念：浏览器端通过 script 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。
>
> 特点：
>
> ① JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。
>
> ② JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。

#### 6.2 创建 JSONP 接口的注意事项

> 如果项目中已经配置了 CORS 跨域资源共享，为了**防止冲突**，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口：

```js
// 优先创建 JSONP 接口 【这个接口不会被处理成 CORS 接口】
app.get('/api/jsonp', (req, res) => { })

// 再配置 CORS 中间件 【后续所有接口，都会被处理为 CORS 接口】
app.use(cors())

// 这是一个开启了 CORS 的接口
app.get('/api/get', (req, res) => { })
```

#### 6.3 实现 JSONP 接口的步骤

> ① 获取客户端发送过来的回调函数的名字
>
> ② 得到要通过 JSONP 形式发送给客户端的数据
>
> ③ 根据前两步得到的数据，拼接出一个函数调用的字符串
>
> ④ 把上一步拼接得到的字符串，响应给客户端的 script 标签进行解析执行

#### 6.4 实现 JSONP 接口

```js
app.get('/api/get', (req, res) => {
 // 1.获取客户端发过来的回调函数的名字
    const funcName = req.query.callback
    // 2.得到要通过 JSONP 形式发送给客户端的数据
    const data = { name: 'zs', age: 22 }
    // 3.根据前两步得到的数据，拼接出一个函数调用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4.把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行
    res.send(scriptStr)
})
```

#### 6.5 在网页中使用 jQuery 发起 JSONP 请求

> 调用 $.ajax() 函数，提供 JSONP 的配置选项，从而发起 JSONP 请求：

```js
// 为 JSONP 按钮绑定点击事件处理函数
$('#btnJSONP').on('click', function () {
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1/api/jsonp',
        dataType: 'jsonp',
        success: function (res) {
         console.log(res)
     },
    })
})
```

## 四、数据库与身份认证

## 1.数据库的基本概念

### 1.什么是数据库

> 数据库（database）是用来组织、存储和管理数据的仓库。
>
> 当今世界是一个充满着数据的互联网世界，充斥着大量的数据。数据的来源有很多，比如出行记录、消费记录、浏览的网页、发送的消息等等。除了文本类型的数据，图像、音乐、声音都是数据。
>
> 为了方便管理互联网世界中的数据，就有了数据库管理系统的概念（简称：数据库）。用户可以对数据库中的数据进行新增、查询、更新、删除等操作。

### 2.常见的数据库及分类

> 市面上的数据库有很多种，最常见的数据库有如下几个：
>
> - MySQL 数据库（目前使用最广泛、流行度最高的开源免费数据库；Community + Enterprise）
> - Oracle 数据库（收费）
> - SQL Server 数据库（收费）
> - Mongodb 数据库（Community + Enterprise）
>
> 其中，MySQL、Oracle、SQL Server 属于**传统型数据库**（又叫做：关系型数据库 或 SQL 数据库），这三者的设计理念相同，用法比较类似。
>
> 而 Mongodb 属于**新型数据库**（又叫做：非关系型数据库 或 NoSQL 数据库），它在一定程度上弥补了传统型数据库的缺陷

### 3.传统型数据库的数据组织结构

> 数据的组织结构：指的就是数据以什么样的结构进行存储。
>
> 传统型数据库的数据组织结构，与 Excel 中数据的组织结构比较类似。
>
> 因此，我们可以对比着 Excel 来了解和学习传统型数据库的数据组织结构。

#### 3.1 Excel 的数据组织结构

> 每个 Excel 中，数据的组织结构分别为工作簿、工作表、数据行、列这 4 大部分组成。

| 编号 | 用户名 |  密码  | 年龄 | 性别 | 用户状态 |
| :--: | :----: | :----: | :--: | :--: | :------: |
|  1   |   zs   | 123456 |  22  |  男  |    1     |
|  2   |   ls   | 000000 |  25  |  女  |    0     |
|  3   | admin  | abc123 |  28  |  男  |    0     |

> ① 整个 Excel 叫做工作簿
>
> ② users 和 books 是工作表
>
> ③ users 工作表中有 3 行数据
>
> ④ 每行数据由 6 列信息组成
>
> ⑤ 每列信息都有对应的数据类型

#### 3.2 传统型数据库的数据组织结构

> 在传统型数据库中，数据的组织结构分为数据库(database)、数据表(table)、数据行(row)、字段(field)这 4 大部分组成。

> ① 数据库类似于 Excel 的工作簿
>
> ② 数据表类似于 Excel 的工作表
>
> ③ 数据行类似于 Excel 的每一行数据
>
> ④ 字段类似于 Excel 的列
>
> ⑤ 每个字段都有对应的数据类型

#### 3.3 实际开发中库、表、行、字段

> ① 在实际项目开发中，一般情况下，每个项目都对应独立的数据库。
>
> ② 不同的数据，要存储到数据库的不同表中，例如：用户数据存储到 users 表中，图书数据存储到 books 表中。
>
> ③ 每个表中具体存储哪些信息，由字段来决定，例如：我们可以为 users 表设计 id、username、password 这 3 个字段。
>
> ④ 表中的行，代表每一条具体的数据。

## 2.安装并配置 MySql

> 对于开发人员来说，只需要安装 MySQL Server 和 MySQL Workbench 这两个软件，就能满足开发的需要了。
>
> - MySQL Server：专门用来提供数据存储和服务的软件。
> - Navicat：可视化的 MySQL 管理工具，通过它，可以方便的操作存储在 MySQL Server 中的数据。
>

## 3.MySQL 的基本使用

> ① 从数据库中查询数据
>
> ② 向数据库中插入新的数据
>
> ③ 更新数据库中的数据
>
> ④ 从数据库删除数据
>
> ⑤ 可以创建新数据库
>
> ⑥ 可在数据库中创建新表
>
> ⑦ 可在数据库中创建存储过程、视图
>
> ⑧ etc…

> 重点掌握如何使用 SQL 从数据表中：
>
> 查询数据（select） 、插入数据（insert into） 、更新数据（update） 、删除数据（delete）
>
> 额外需要掌握的 4 种 SQL 语法：
>
> where 条件、and 和 or 运算符、order by 排序、count(*) 函数

### 1. SQL 的 SELECT 语句

> SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。语法格式如下：

```sql
-- 从 FROM 指定的表中，查询出【所有的】数据。* 表示【所有列】
SELECT * FROM 表名称

-- 从 FROM 指定的表中，查询出指定 列名称（字段）的数据
SELECT 列名称 FROM 表名称
```

> 注意：SQL 语句中的关键字对**大小写不敏感**。SELECT 等效于 select，FROM 等效于 from。
>

### 2.SQL 的 INSERT INTO 语句

> INSERT INTO 语句用于向数据表中插入新的数据行，语法格式如下：

```sql
-- 语法解读：向指定的表中，插入如下几列数据，列的值通过 values ————指定
-- 注意：列和值要一一对应，多个列和多个值之间，使用英文的逗号分割
INSERT INTO table_name (列1, 列2, ...) VALUES (值1, 值2, ...)
```

### 3.SQL 的 UPDATE 语句

> Update 语句用于修改表中的数据。语法格式如下：

```sql
-- 1.用 UPDATE 指定要更新哪个表中的数据
-- 2.用 SET 指定列对应的新值
-- 3.用 WHERE 指定更新的条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```

### 4.SQL 的 DELETE 语句

> DELETE 语句用于删除表中的行。语法格式如下：

```sql
-- 从指定的表中，根据 WHERE 条件，删除对应的数据行
DELETE FROM 表名称 WHERE 列名称 = 值
```

### 5.SQL 的 WHERE 子句

> WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准。

> 下面的运算符可在 WHERE 子句中使用，用来限定选择的标准：

| 操作符  |     描述     |
| :-----: | :----------: |
|    =    |     等于     |
|   <>    |    不等于    |
|    >    |     大于     |
|    <    |     小于     |
|   >=    |   大于等于   |
|   <=    |   小于等于   |
| BETWEEN | 在某个范围内 |
|  LIKE   | 搜索某种模式 |

> 注意：在某些版本的 SQL 中，操作符 <> 可以写为 !=

### 6.SQL 的 AND 和 OR 运算符

> AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。
>
> AND 表示必须同时满足多个条件，相当于 JavaScript 中的 && 运算符，例如 if (a !== 10 && a !== 20)
>
> OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 || 运算符，例如 if(a !== 10 || a !== 20)

### 7.SQL 的 ORDER BY 子句

> ORDER BY 语句用于根据指定的列对结果集进行排序。
>
> ORDER BY 语句**默认**按照升序对记录进行排序。
>
> 如果您希望按照**降序**对记录进行排序，可以使用 DESC 关键字。

```sql
SELECT * FROM user ORDER BY status ASC;
SELECT * FROM user ORDER BY id DESC;
SELECT * FROM user ORDER BY status ASC, id DESC;
```

### 8.SQL 的 COUNT(*)函数

> COUNT(*) 函数用于返回查询结果的总数据条数，语法格式如下：

```sql
SELECT COUNT(*) FROM 表名称
```

> 如果希望给查询出来的列名称设置别名，可以使用 AS 关键字，示例如下：

```sql
SELECT COUNT(*) AS total FROM user WHERE status = 0;
```

## 4.在项目中操作 MySQL

### 1.在项目中操作数据库的步骤

> ① 安装操作 MySQL 数据库的第三方模块（mysql）
>
> ② 通过 mysql 模块连接到 MySQL 数据库
>
> ③ 通过 mysql 模块执行 SQL 语句

### 2.安装与配置 mysql 模块

#### 2.1 安装 mysql 模块

> mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。想要在项目中使用它，需要先运行如下命令，将 mysql 安装为项目的依赖包：

```bash
npm i mysql
```

#### 2.2 配置 mysql 模块

> 在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

```js
// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: 'l145236789.', // 登录数据库的密码
  database: 'MyDataBase', // 指定要操作哪个数据库
})
```

#### 2.3 测试 mysql 模块能否正常工作

> 调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果：

```js
db.query('select 1', (err, results) => {
    if (err) return console.log(err.message)
    // 只要能打印出 [ RowDataPacket { '1': 1 } ] 的结果，就证明数据库连接正常
    console.log(results)
})
```

### 3.使用 mysql 模块操作 MySQL 数据库

#### 3.1 查询数据

```js
db.query('select * from users', (err, results) => {
 // 查询失败
    if (err) return console.log(err.message)
    // 查询成功
    console.log(results)
})
```

#### 3.2 插入数据

```js
// 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
const user = { username: 'Spider-Man', password: 'pcc123' }
// 定义待执行的 SQL 语句 ，? 表示占位符
const sqlStr = 'insert into users (username, password) values (?, ?)'
// 执行 SQL 语句 使用数组形式，依次为 ? 占位符具体的值
db.query(sqlStr, [user.username, user.password], (err, results) => {
    // 执行 SQL 语句失败了
    if (err) return console.log(err.message)
    // 成功了
    // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
    // 可以通过 affectedRows 属性，来判断是否插入数据成功
    if (results.affectedRows === 1) {
        console.log('插入数据成功!')
    }
}) 
```

```js
// 演示插入数据的便捷方式
const user = { username: 'Spider-Man2', password: 'pcc4321' }
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users set ?'
// 执行 SQL 语句 直接将数据对象当作占位符的值
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('插入数据成功')
  }
})
```

#### 3.3 更新数据

```js
// 演示如何更新用户的信息
const user = { id: 6, username: 'aaa', password: '000' }
// 定义 SQL 语句
const sqlStr = 'update users set username=?, password=? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
  if (results.affectedRows === 1) {
    console.log('更新成功')
  }
})
```

```js
// 演示更新数据的便捷方式
const user = { id: 6, username: 'aaaa', password: '0000' }
// 定义 SQL 语句
const sqlStr = 'update users set ? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('更新数据成功')
  }
})
```

#### 3.4 删除数据

```js
// 删除 id 为 5 的用户
const sqlStr = 'delete from users where id=?'
db.query(sqlStr, 5, (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
  if (results.affectedRows === 1) {
    console.log('删除数据成功')
  }
})
```

#### 3.5 标记删除

```js
// 标记删除：使用 UPDATE 语句替代 DELETE 语句，更新数据的状态，并没有真正的删除
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr, [1, 6], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('标记删除成功')
  }
})
```

## 5.前后端身份认证

### 1.Web 开发模式

> 目前主流的 Web 开发模式有两种，分别是：
>
> ① 基于服务端渲染的传统 Web 开发模式
>
> ② 基于前后端分离的新型 Web 开发模式

#### 1.1 服务端渲染的 Web 开发模式

> 服务端渲染的概念：服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不需要使用 Ajax 这样的技术额外请求页面的数据。

#### 1.2 服务端渲染的优缺点

> 优点：
>
> ① **前端耗时少。**因为服务器端负责动态生成 HTML 内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
>
> ② **有利于SEO。**因为服务器端响应的是完整的 HTML 页面内容，所以爬虫更容易爬取获得信息，更有利于 SEO。
>
> 缺点：
>
> ① **占用服务器端资源。**即服务器端完成 HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。
>
> ② **不利于前后端分离，开发效率低。**使用服务器端渲染，则**无法进行分工合作**，尤其对于**前端复杂度高**的项目，不利于项目高效开发。

#### 1.3  前后端分离的 Web 开发模式

> 前后端分离的概念：前后端分离的开发模式，**依赖于 Ajax 技术的广泛应用**。简而言之，前后端分离的 Web 开发模式，就是**后端只负责提供 API 接口，前端使用 Ajax 调用接口**的开发模式。

#### 1.4 前后端分离的优缺点

> 优点：
>
> ① **开发体验好。**前端专注于 UI 页面的开发，后端专注于api 的开发，且前端有更多的选择性。
>
> ② **用户体验好。**Ajax 技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
>
> ③ **减轻了服务器端的渲染压力。**因为页面最终是在每个用户的浏览器中生成的。
>
> 缺点：
>
> ① **不利于 SEO。**因为完整的 HTML 页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。（解决方案：利用 Vue、React 等前端框架的 **SSR** （server side render）技术能够很好的解决 SEO 问题！）

#### 1.5 如何选择 Web 开发模式

> **不谈业务场景而盲目选择使用何种开发模式都是耍流氓。**
>
> - 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的 SEO，则这时我们就需要使用服务器端渲染；
> - 而类似后台管理项目，交互性比较强，不需要考虑 SEO，那么就可以使用前后端分离的开发模式。
>
> 另外，具体使用何种开发模式并不是绝对的，为了**同时兼顾**了**首页的渲染速度**和**前后端分离的开发效率**，一些网站采用了首屏服务器端渲染 + 其他页面前后端分离的开发模式。

### 2.身份认证

#### 2.1 什么是身份认证

> **身份认证**（Authentication）又称“身份验证”、“鉴权”，是指**通过一定的手段，完成对用户身份的确认**。
>
> - 日常生活中的身份认证随处可见，例如：高铁的验票乘车，手机的密码或指纹解锁，支付宝或微信的支付密码等。
> - 在 Web 开发中，也涉及到用户身份的认证，例如：各大网站的**手机验证码登录**、**邮箱密码登录**、**二维码登录**等。

#### 2.2 为什么需要身份认证

> 身份认证的目的，是为了**确认当前所声称为某种身份的用户，确实是所声称的用户**。例如，你去找快递员取快递，你要怎么证明这份快递是你的。
>
> 在互联网项目开发中，如何对用户的身份进行认证，是一个值得深入探讨的问题。例如，如何才能保证网站不会错误的将“马云的存款数额”显示到“马化腾的账户”上。

#### 2.3 不同开发模式下的身份认证

> 对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案：
>
> ① 服务端渲染推荐使用 **Session 认证机制**
>
> ② 前后端分离推荐使用 **JWT 认证机制**

### 3.Session 认证机制

#### 3.1 HTTP 协议的无状态性

> 了解 HTTP 协议的无状态性是进一步学习 Session 认证机制的必要前提。
>
> HTTP 协议的无状态性，指的是客户端的**每次 HTTP 请求都是独立的**，连续多个请求之间没有直接的关系，**服务器不会主动保留每次 HTTP 请求的状态**。

#### 3.2 如何突破 HTTP 无状态的限制

> 对于超市来说，为了方便收银员在进行结算时给 VIP 用户打折，超市可以为每个 VIP 用户发放会员卡。
>
> 注意：现实生活中的**会员卡身份认证方式**，在 Web 开发中的专业术语叫做 **Cookie**。

#### 3.3 什么是 Cookie

> Cookie 是**存储在用户浏览器中的一段不超过 4 KB 的字符串**。它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。
>
> 不同域名下的 Cookie 各自独立，每当客户端发起请求时，会**自动**把**当前域名下**所有**未过期的 Cookie** 一同发送到服务器。
>
> **Cookie的几大特性：**
>
> ① 自动发送
>
> ② 域名独立
>
> ③ 过期时限
>
> ④ 4KB 限制

#### 3.4 Cookie 在身份认证中的作用

> 客户端第一次请求服务器的时候，服务器**通过响应头的形式**，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中。
>
> 随后，当客户端浏览器每次请求服务器的时候，浏览器会**自动**将身份认证相关的 Cookie，**通过请求头的形式**发送给服务器，服务器即可验明客户端的身份。

#### 3.5 Cookie 不具有安全性

> 由于 Cookie 是存储在浏览器中的，而且**浏览器也提供了读写 Cookie 的 API**，因此 **Cookie 很容易被伪造**，不具有安全性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。
>
> 注意：**千万不要使用 Cookie 存储重要且隐私的数据**！比如用户的身份信息、密码等。

#### 3.6 提高身份认证的安全性

> 为了防止客户伪造会员卡，收银员在拿到客户出示的会员卡之后，可以**在收银机上进行刷卡认证**。只有收银机确认存在的会员卡，才能被正常使用。
>
> 这种“**会员卡** **+** **刷卡认证**”的设计理念，就是 Session 认证机制的精髓。

#### 3.7 Session 的工作原理

### 4.在 Express 中使用 Session 认证

#### 4.1 安装 express-session 中间件

> 在 Express 项目中，只需要安装 express-session 中间件，即可在项目中使用 Session 认证：

```bash
npm i express-session
```

#### 4.2 配置 express-session 中间件

> express-session 中间件安装成功后，需要通过 app.use() 来注册 session 中间件：

```js
// 1.导入 session 中间件
const session = require('express-session')

// 2.配置 session 中间件
app.use(
  session({
    secret: 'indugle back',       // secret 属性的值可以为任意字符串，用来对 session 进行加密
    resave: false,           // 固定写法
    saveUninitialized: true, // 固定写法
  })
)
```

#### 4.3 向 session 中存数据

> 当 express-session 中间件配置成功后，即可通过 **req.session** 来访问和使用 session 对象，从而存储用户的关键信息：

```js
// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body // 用户的信息
  req.session.islogin = true // 用户的登录状态

  res.send({ status: 0, msg: '登录成功' })
})
```

#### 4.4 从 session 中取数据

> 可以直接从 **req.session** 对象上获取之前存储的数据：

```js
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // 判断用户是否登录
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})
```

#### 4.5 清空 session

> 调用 **req.session.destroy()** 函数，即可清空服务器保存的 session 信息：

```js
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // 清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})
```

### 5.JWT 认证机制

#### 5.1 了解 Session 认证的局限性

> Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接
>
> 口的时候，**需要做很多额外的配置**，才能实现跨域 Session 认证。
>
> 注意：
>
> - 当前端请求后端接口**不存在跨域问题**的时候，**推荐使用 Session** 身份认证机制。
> - 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。

#### 5.2 什么是 JWT

> JWT（英文全称：JSON Web Token）是目前**最流行**的**跨域认证解决方案**。

#### 5.3 JWT 的工作原理

>
> 总结：用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

#### 5.4 JWT 的组成部分

> JWT 通常由三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名）。
>
> 三者之间使用英文的“.”分隔，格式如下：

```js
Header.Payload.Signature
```

#### 5.5 JWT 的三个部分各自代表的含义

> JWT 的三个组成部分，从前到后分别是 Header、Payload、Signature。
>
> 其中：
>
> - **Payload** 部分**才是真正的用户信息**，它是用户信息经过加密之后生成的字符串。
> - Header 和 Signature 是**安全性相关**的部分，只是为了保证 Token 的安全性。

#### 5.6 JWT 的使用方式

> 客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。
>
> 此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是**把 JWT 放在 HTTP 请求头的 Authorization 字段中**，格式如下：

```js
Authorization: Bearer <token>
```

### 6.在 Express 中使用 JWT

#### 6.1 安装 JWT 相关的包

> 运行如下命令，安装如下两个 JWT 相关的包：
>
> ```bash
> npm i jsonwebtoken express-jwt
> ```
>
> 其中：
>
> - **jsonwebtoken** 用于**生成 JWT 字符串**
> - **express-jwt** 用于**将 JWT 字符串解析还原成 JSON 对象**

#### 6.2 导入 JWT 相关的包

> 使用 require() 函数，分别导入 JWT 相关的两个包：

```js
// 1.导入用于生成 JWT 字符串的包
const jwt = require('jsonwebtoken')
// 2.导入用于将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
const expressJWT = require('express-jwt')
```

#### 6.3 定义 secret 密钥

> 为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于**加密**和**解密**的 secret 密钥：
>
> ① 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
>
> ② 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

```js
// 3.定义 secret 密钥，建议将密钥命名为 secretKey ，本质为一个字符串
const secretKey = 'indulge back'
```

#### 6.4 在登陆成功后生成 JWT 字符串

> 调用 **jsonwebtoken** 包提供的 **sign()** 方法，将用户的信息加密成 JWT 字符串，响应给客户端：

```js
// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！',
    })
  }
  // 登录成功
  // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串
  })
})
```

#### 6.5 将 JWT 字符串还原为 JSON 对象

> 客户端每次在访问那些有权限接口的时候，都需要主动通过**请求头中的 Authorization 字段**，将 Token 字符串发送到服务器进行身份认证。
>
> 此时，服务器可以通过 **express-jwt** 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象：

```js
// 注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```

#### 6.6 使用 req.user 获取用户信息

> 当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 **req.user** 对象，来访问从 JWT 字符串中解析出来的用户信息了：

```js
// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  })
})
```

#### 6.7 捕获解析 JWT 失败后产生的错误

> 当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串**过期**或**不合法**，会产生一个**解析失败**的错误，影响项目的正常运行。我们可以通过 **Express 的错误中间件**，捕获这个错误并进行相关的处理：

```js
// 使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})
```
