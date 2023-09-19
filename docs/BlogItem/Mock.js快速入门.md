---
title: Mock.js快速入门
date: 2023-09-12
author: liuwy
categories:
 - 专题
tags:
 - Javascript
---

## 一、什么是Mock.js

> Mock.js 是一款模拟数据生成器，旨在帮助前端攻城师独立于后端进行开发，帮助编写单元测试。提供了以下模拟功能：
>
> - 根据数据模板生成模拟数据
> - 模拟 Ajax 请求，生成并返回模拟数据
> - 基于 HTML 模板生成模拟数据

## 二、安装 Mock.js

### 1.通过 npm 安装 Mock.js

```sh
npm install mockjs
```

### 2.通过 yarn 安装 Mock.js

```sh
yarn add mockjs
```

### 3.通过 pnpm 安装 Mock.js

```sh
pnpm add mockjs
```

## 三、使用 Mock.js

```js
// src/mock/index.js

// 导入 mock 
import Mock from 'mockjs'


// src/main.js
 
// 在 main.js 中导入 Mock
import '@/mock/index.js'
```

## 四、使用 Mock 生成数据的语法

### 1.生成指定类型

```js
// string 表示生成字符串 
// 1-4 表示重复次数 
// 格式 'string|1-4' 或 'string|7'
// '哎呦！' 表示要重复生成的字符串
const data = Mock.mock({
  'string|1-4': '哎哟！'
})
// number 表示生成数字
// 50-99 表示要生成的数字的取值范围
// 格式 'number|20-50' 或 'number|8'
// 例子中的 10 表示要被覆盖的初始值
const data = Mock.mock({
  'number|50-99': 10
})
```

### 2.生成文字

```js
// 函数中的 c 表示生成中文 去掉c 会生成英文
// 函数可传入 指定字数 或者 字数范围
// 生成词
// 函数 @cword() @ctitle() @csentence() @cparagraph()
const data = Mock.mock({
  string: '@cword(3,10)'
})

// 生成标题和句子
const data = Mock.mock({
  title: '@ctitle(5)',
  sentence: '@csentence()'
})

// 生成段落
const data = Mock.mock({
  content: '@cparagraph()'
})
```

### 3.生成增量id

```js
// 参数表示起始量和增量的大小
// 函数 @increment()
const data = Mock.mock({
  'list|20': [
    {
      id: '@increment(2)' 
    }
  ]
})
```

### 4.生成姓名-地址-身份证号

```js
// 函数 @cname() @id() @city() 
// 函数 @city() 的 参数 true 表示是否生成省
const data = Mock.mock({
  name: '@cname()',
  idCard: '@id()',
  address: '@city(true)' // true 是否显示省
})
```

### 5.生成随机图片

```js
// 函数 @image()
// 参数 1. 图片大小 2. 图片背景色 3. 图片前景色 4. 图片格式 5. 图片文字
const data = Mock.mock({
  img_url: "@image('250x250','#bcbcbc','#666666','png','坤坤')"
})
```

### 6.生成时间

```js
// 函数 @date
// 参数 时间格式 yyyy-MM-dd or yyyy-MM-dd hh:mm:ss
const data = Mock.mock({
  date: '@date(yyyy-MM-dd hh:mm:ss)'
})
```

### 7.生成列表

```js
// 指定数组返回条数
// 格式 'list|20-50'
const data = Mock.mock({
  'list|20-50': [
    {
      name: '@cname()',
      idCard: '@id()',
      address: '@city(true)'
    }
  ]
})
```

## 五、使用 Mock 拦截请求

### 1.定义拦截 GET 请求

```js
// /src/mock/index.js
// 三个参数 (路径，请求方式，返回的数据或者返回数据的回调函数)
Mock.mock('/api/get/news', 'get', {
  code: 1,
  msg: '获取数据成功'
})

// 请求方式
axios({
  method: 'GET',
  url: '/api/get/news'
})
```

### 2.定义拦截 POST 请求

```js
Mock.mock('/api/post/news', 'post', {
  code: 1,
  msg: '获取数据成功'
})

// 请求方式
axios({
  method: 'POST',
  url: '/api/post/news'
})
```

### 3.回调函数形式

```js
// 也可以写成回调函数的形式
Mock.mock('/api/post/news', 'post',() => {
    return {
        code: 1,
        msg: '获取数据成功'
    }
})
```

### 4.请求的接口地址可以使用正则表达式

```js
// 当 GET 请求携带参数时
axios({
    method:'GET',
    url:'/api/get/news',
    params:{
        pageIndex: 1,
        pageSize: 20
    }
})

// 实际请求 url 为 http://localhost:5500/api/get/news?pageIndex=1&pageSize=20
// Mock 无法拦截 
// 使用正则匹配带有 /api/get/news 的请求，实现 GET 请求的拦截

// Mock 拦截
Mock.mock(/\/api\/get\/news/, 'get',() => {
    return {
        code: 1,
        msg: '获取数据成功'
    }
})
```

### 5.自定义函数获取url中的参数

```js
// 当 GET 请求携带参数时
axios({
    method:'GET',
    url:'/api/get/news',
    params:{
        pageIndex: 1,
        pageSize: 20
    }
})

// 实际请求 url 为 http://localhost:5500/api/get/news?pageIndex=1&pageSize=20
// Mock

// 封装：根据 请求的 url 获取 以参数 name 为 key 的 value 
const getQuery = (url,name) => {
    // 得到 url 中 ? 的位置
    const index = url.indexOf('?')
    // 如果 ? 不存在 则 index 的值为 -1
    // 当 index 的值不为 -1 时，该请求一定有参数
    if(index !== -1){
        // 通过 substr 方法截取字符串 得到 url 中带有参数的部分
        // 再通过 split 方法 传参为 & 分割字符串为每项为参数的字符串数组
        const queryStrArr = url.substr(index+1).split('&')
        // 通过 for in 迭代 queryStrArr
        for(index in queryStrArr){
            // 调用 split 方法分割字符串 
            const itemArr = queryStrArr[index].split('=')
            // 判断
            if(itemArr[0] === name){
                // 返回值
                return itemArr[1]
            }
        }
    }
    // 该字符串没有参数 返回 null
    return null
}

Mock.mock(/\/api\/get\/news/, 'get', (options) => {
    const pageIndex = getQuery(options.url,options.name)
    return {
        code: 1,
        msg: '获取数据成功'
    }
})
```

### 6.获取 POST 请求中的 body

```js
// 当 POST 请求携带参数时
axios({
    method:'POST',
    url:'/api/post/news',
    body:{
        title: 1,
        content: 20
    }
})

// 通过 options.body 来接收 POST 参数

Mock.mock('/api/get/news', 'get', (options) => {
    const body = JSON.parse(options.body)
    return {
        code: 1,
        msg: '获取数据成功',
        data: {
            title: body.title,
         content: body.content
        }
    }
})
```
