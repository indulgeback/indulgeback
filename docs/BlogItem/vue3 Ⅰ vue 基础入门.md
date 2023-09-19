---
title: vue3 Ⅰ vue 基础入门
date: 2023-04-16
author: liuwy
categories:
 - 技术
tags:
 - Javascript
 - Vue
---
|            目标             |             目录             |
| :-------------------------: | :--------------------------: |
|           了解Vue           |         一、Vue简介          |
| 能够知道 Vue 的基本使用步骤 |      二、Vue的基本使用       |
| 掌握六种指令与过滤器的使用  |    三、Vue的指令和过滤器     |
|   案例实战——提高熟练程度    | 四、第一个案例——品牌列表案例 |
|     对Vue基础入门的总结     |     五、Vue基础入门总结      |

## 一、Vue简介

### 1.Vue数据驱动

#### 1.1数据驱动

> 使用了vue的页面中，vue会**监听数据的变化**，从而**自动重新渲染**页面结构。
>
> 好处：当页面数据发生变化时，页面会自动渲染！
>
> 注意：数据驱动视图是**单向的数据绑定**

#### 1.2双向数据绑定

> 在填写表单时，双向数据绑定可以辅助开发者在不操作 DOM 的前提下，自动把用户填写的内容同步到数据源中。
>
> 好处：开发者不再需要手动操作 DOM 元素，来获取表单元素最新的值！

#### 1.3MVVM

> MVVM 是 vue 实现数据驱动视图和双向数据绑定的核心原理。它把每个 HTML 页面都拆分成了如下三个部分：

> 在 **MVVM** 概念中：
>
> - **View** 表示当前页面所渲染的 DOM 结构。
> - **Model** 表示当前页面渲染时所依赖的数据源。
> - **ViewModel** 表示 vue 的实例，它是 MVVM 的核心。

#### 1.4MVVM的工作原理

> ViewModel 作为 MVVM 的核心，是它把当前页面的数据源（Model）和页面的结构（View）连接在了一起。
>
> 当数据源发生变化时，会被 ViewModel 监听到，VM 会根据最新的数据源自动更新页面的结构
>
> 当表单元素的值发生变化时，也会被 VM 监听到，VM 会把变化过后最新的值自动同步到 Model 数据源中

### 2.Vue的版本

> 当前，vue 共有 3 个大版本，其中：
>
> - 2.x 版本的 vue 是目前企业级项目开发中的主流版本
> - 3.x 版本的 vue 于 2020-09-19 发布，生态还不完善，尚未在企业级项目开发中普及和推广
> - 1.x 版本的 vue 几乎被淘汰，不再建议学习与使用

> **vue3.x 和 vue2.x 版本的对比**
>
> > vue2.x 中绝大多数的 API 与特性，在 vue3.x 中同样支持。同时，vue3.x 中还新增了 3.x 所特有的功能、并废弃了某些 2.x 中的旧功能：
> >
> > **新增的功能**例如：
> >
> > 组合式 API、多根节点组件、更好的 TypeScript 支持等
> >
> > **废弃的旧功能**如下：
> >
> > 过滤器、不再支持 $on，$off 和 $once 实例方法等

## 二、Vue的基本使用

### 1.基本使用步骤

> **①** 导入 vue.js 的 script 脚本文件
>
> **②** 在页面中声明一个将要被 vue 所控制的 DOM 区域
>
> **③** 创建 vm 实例对象（vue 实例对象）

### 2.基本代码与 MVVM 的对应关系

### 3.安装 Vue-devtools 调试工具

> 收藏猫chrome插件资源，下载安装：<https://chrome.pictureknow.com/>

> 扩展迷chrome插件资源，下载安装：<https://www.extfans.com/>

## 三、Vue的指令和过滤器

### 1.指令的概念

> **指令（Directives）**是 vue 为开发者提供的模板语法，用于辅助开发者渲染页面的基本结构。
>
> vue 中的指令按照不同的用途可以分为如下 6 大类：
>
> **① 内容渲染指令**
>
> **② 属性绑定指令**
>
> **③ 事件绑定指令**
>
> **④ 双向绑定指令**
>
> **⑤ 条件渲染指令**
>
> **⑥ 列表渲染指令**
>
> 注意：指令是 vue 开发中最基础、最常用、最简单的知识点。

#### 1.1内容渲染指令

> 内容渲染指令用来辅助开发者渲染 DOM 元素的文本内容。常用的内容渲染指令有如下 3 个：
>
> - **v-text**
> - **{{ }}**
> - **v-html**

##### v-text

```html
<div id="app">
    <p v-text="username"></p>
    <p v-text="gender">性别</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: 'zs',
            gender: '男'
        }
    })
</script>
```

> **注意：v-text 指令会覆盖元素内默认的值。**

##### {{}}

> vue 提供的 **{{ }}** 语法，**专门用来解决 v-text 会覆盖默认文本内容的问题**。这种 {{ }} 语法的专业名称是**插值表达式**（英文名为：Mustache）。

```html
<div id="app">
    <p>姓名：{{username}}</p>
    <p>性别：{{gender}}</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: 'zs',
            gender: '男'
        }
    })
</script>
```

> 注意：相对于 v-text 指令来说，插值表达式在开发中更常用一些！因为**它不会覆盖元素中默认的文本内容**。

##### v-html

> **v-text 指令和插值表达式只能渲染纯文本内容**。如果要**把包含 HTML 标签的字符串渲染为页面的 HTML 元素**，则需要用到 **v-html** 这个指令：

```html
<div id="app">
    <p v-text="desc"></p>
    <p>{{desc}}</p>
    <p v-html="desc"></p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: 'zs',
            gender: '男',
            desc: '<i>abc</i>'
        }
    })
</script>
```

#### 1.2属性绑定指令

##### v-bind

> 如果需要为元素的属性动态绑定属性值，则需要用到 **v-bind** 属性绑定指令。用法示例如下：

```html
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
    <input type="text" v-bind:placeholder="inputValue">
    <hr>
    <img v-bind:src="imgSrc" alt="">
</div>

<!-- 导入 vue 脚本文件 -->
<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 创建 VM 实例对象
    const vm = new Vue({
        // 指定当前 VM 要控制的区域
        el: '#app',
        // 数据源
        data: {
            // 文本框的占位符内容
            inputValue: '请输入内容',
            // 图片的 src 地址
            imgSrc: './images/logo.png',
        },
    })
</script>
```

##### 属性绑定指令的简写形式

> 由于 v-bind 指令在开发中使用频率非常高，vue 官方为其提供了简写形式（简写为英文的 **:** ）。

##### 使用 Javascript 表达式

> 在 vue 提供的模板渲染语法中，除了支持绑定简单的数据值之外，还支持 Javascript 表达式的运算，例如：

```html
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
    <p>{{number + 1}}</p>
    <p>{{ok ? 'True' : 'False'}}</p>
    <p>{{message.split('').reverse().join('')}}</p>
    <p :id="'list-' + id">xxx</p>
    <p>{{user.name}}</p>
</div>

<!-- 导入 vue 脚本文件 -->
<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 创建 VM 实例对象
    const vm = new Vue({
        // 指定当前 VM 要控制的区域
        el: '#app',
        // 数据源
        data: {
            // 数值
            number: 9,
            // 布尔值
            ok: false,
            // 字符串
            message: 'ABC',
            // id 值
            id: 3,
            // 用户的信息对象
            user: {
                name: 'zs',
            },
        },
    })
</script>
```

#### 1.3事件绑定指令

##### v-on

> vue 提供了 v-on 事件绑定指令，用来辅助程序员为 DOM 元素绑定事件监听。通过 v-on 绑定的事件处理函数，需要在 methods 节点中进行声明，语法格式如下：

```html
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
    <h3>count 的值为：{{count}}</h3>
    <!-- TODO：点击按钮，让 data 中的 count 值自增 +1 -->
    <button v-on:click="addCount">+1</button>
</div>

<!-- 导入 vue 脚本文件 -->
<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 创建 VM 实例对象
    const vm = new Vue({
        // 指定当前 VM 要控制的区域
        el: '#app',
        // 数据源
        data: {
            // 计数器的值
            count: 0,
        },
        methods: {
            // 点击按钮，让 count 自增 +1
            addCount() {
                // this 访问当前的实例对象vm
                this.count += 1
            },
        },
    })
</script>
```

> 注意：原生 DOM 对象有 **onclick、oninput、onkeyup** 等原生事件，替换为 vue 的事件绑定形式后，分别为：**v-on:click、v-on:input、v-on:keyup**

##### 事件绑定的简写形式

> 由于 v-on 指令在开发中使用频率非常高，vue 官方为其提供了简写形式（简写为英文的 **@** ）。

```html
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
    <h3>count 的值为：{{count}}</h3>
    <!-- TODO：点击按钮，让 data 中的 count 值自增 +1 -->
    <!-- 简写到行内的事件处理 -->
    <button @click="count+=1">+1</button>
</div>

<!-- 导入 vue 脚本文件 -->
<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 创建 VM 实例对象
    const vm = new Vue({
        // 指定当前 VM 要控制的区域
        el: '#app',
        // 数据源
        data: {
            // 计数器的值
            count: 0,
        },
        methods: {
            // 点击按钮，让 count 自增 +1
            // 如果事件处理函数中的代码足够简单，只有一行代码，则可以简写到行内
            // addCount() {
            //   this.count += 1
            // },
        },
    })
</script>
```

##### 事件对象 event

> 在原生的 DOM 事件绑定中，可以在事件处理函数的形参处，接收事件对象 event。同理，在 v-on 指令（简写为 @ ）所绑定的事件处理函数中，同样可以接收到事件对象 event，示例代码如下：

```html
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
    <h3>count 的值为：{{count}}</h3>
    <button v-on:click="addCount">+1</button>
</div>

<!-- 导入 vue 脚本文件 -->
<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 创建 VM 实例对象
    const vm = new Vue({
        // 指定当前 VM 要控制的区域
        el: '#app',
        // 数据源
        data: {
            // 计数器的值
            count: 0,
        },
        methods: {
            // 点击按钮，让 count 自增 +1
            addCount(e) {
                const nowBgColor = e.target.style.backgroundColor
                e.target.style.backgroundColor = nowBgColor === 'red' ? '' : 'red'
                this.count += 1
            },
        },
    })
</script>
```

##### 绑定事件并传参

> 在使用 v-on 指令绑定事件时，可以使用 **( )** 进行传参，示例代码如下：

```html
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
    <h3>count 的值为：{{count}}</h3>
    <button @click="addCount(2, $event)">+2</button>
</div>

<!-- 导入 vue 脚本文件 -->
<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 创建 VM 实例对象
    const vm = new Vue({
        // 指定当前 VM 要控制的区域
        el: '#app',
        // 数据源
        data: {
            // 计数器的值
            count: 0,
        },
        methods: {
            addCount(step, e) {
                const bgColor = e.target.style.backgroundColor
                e.target.style.backgroundColor = bgColor === 'red' ? '' : 'red'
                this.count += step
            },
        },
    })
</script>
```

##### 事件修饰符

> 在事件处理函数中调用 preventDefault() 或 stopPropagation() 是非常常见的需求。因此，vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。常用的 5 个事件修饰符如下：

| 事件修饰符 |                         **说明**                          |
| :--------: | :-------------------------------------------------------: |
|  .prevent  | 阻止默认行为（例如：阻止 a 连接的跳转、阻止表单的提交等） |
|   .stop    |                       阻止事件冒泡                        |
|  .capture  |             以捕获模式触发当前的事件处理函数              |
|   .once    |                    绑定的事件只触发1次                    |
|   .self    |   只有在 event.target 是当前元素自身时触发事件处理函数    |

```html
<!-- 在页面中声明一个将要被 vue 所控制的 DOM 区域 -->
<div id="app">
    <h4>① .prevent 事件修饰符的应用场景</h4>
    <a href="https://www.baidu.com" @click.prevent="onLinkClick">百度首页</a>

    <hr />

    <h4>② .stop 事件修饰符的应用场景</h4>
    <div class="outer" @click="onOuterClick">
        外层的 div
        <div class="inner" @click.stop="onInnerClick">内部的 div</div>
    </div>

    <hr />

    <h4>③ .capture 事件修饰符的应用场景</h4>
    <div class="outer" @click.capture="onOuterClick">
        外层的 div
        <div class="inner" @click="onInnerClick">内部的 div</div>
    </div>

    <hr />

    <h4>④ .once 事件修饰符的应用场景</h4>
    <div class="inner" @click.once="onInnerClick">内部的 div</div>

    <hr />

    <h4>⑤ .self 事件修饰符的应用场景</h4>
    <div class="box" @click="onBoxClick">
        最外层的 box
        <div class="outer" @click.self="onOuterClick">
            中间的 div
            <div class="inner" @click="onInnerClick">内部的 div</div>
        </div>
    </div>

    <hr />
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        // 声明处理函数的节点
        methods: {
            // 超链接的点击事件处理函数
            onLinkClick() {
                alert('ok')
            },
            // 点击了外层的 div
            onOuterClick() {
                console.log('触发了 outer 的 click 事件处理函数')
            },
            // 点击了内部的 div
            onInnerClick() {
                console.log('触发了 inner 的 click 事件处理函数')
            },
            onBoxClick() {
                console.log('触发了 box 的 click 事件处理函数')
            }
        },
    })
</script>
```

##### 按键修饰符

> 在监听键盘事件时，我们经常需要判断详细的按键。此时，可以为键盘相关的事件添加按键修饰符，例如：

```html
<div id="app">
    <input type="text" @keyup.enter="submit" @keyup.esc="clearInput" />
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            // 获取文本框最新的值
            submit(e) {
                console.log('摁下了 enter 键，最新的值是：' + e.target.value)
            },
            // 清空文本框的值
            clearInput(e) {
                e.target.value = ''
            },
        },
    })
</script>
```

#### 1.4双向绑定指令

##### v-model

> vue 提供了 v-model 双向数据绑定指令，用来辅助开发者在不操作 DOM 的前提下，快速获取表单的数据。

```html
<div id="app">
    <p>用户名是：{{username}}</p>
    <input type="text" v-model="username" />

    <hr />

    <p>选中的省份是：{{province}}</p>
    <select v-model="province">
        <option value="">请选择</option>
        <option value="1">北京</option>
        <option value="2">河北</option>
        <option value="3">黑龙江</option>
    </select>
</div>

<script src="./lib/vue-2.6.12.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 姓名
            username: 'zs',
            // 省份
            province: '1',
        },
    })
</script>
```

> 注意：v-model 指令只能配合表单元素一起使用！

##### v-model 指令的修饰符

> 为了方便对用户输入的内容进行处理，vue 为 v-model 指令提供了 3 个修饰符，分别是：

| **修饰符** |            **作用**            |            **示例**            |
| :--------: | :----------------------------: | :----------------------------: |
|  .number   | 自动将用户的输入值转为数值类型 | <input v-model.number="age" /> |
|   .trim    | 自动过滤用户输入的首尾空白字符 |  <input v-model.trim="msg" />  |
|   .lazy    | 在“change”时而非“input”时更新  |  <input v-model.lazy="msg" />  |

```html
<div id="app">
    姓名：<input type="text" v-model.trim="username" />

    <hr />

    年龄：<input type="text" v-model.number="age" />

    <hr />

    地址：<input type="text" v-model.lazy="address" />
</div>

<script src="./lib/vue-2.6.12.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 姓名
            username: 'zs',
            // 年龄
            age: 1,
            // 地址
            address: '北京市',
        },
    })
</script>
```

#### 1.5条件渲染指令

> 条件渲染指令用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是：
>
> - **v-if**
> - **v-show**

```html
<div id="app">
    <button @click="flag = !flag">Toggle Flag</button>

    <p v-if="flag">请求成功 --- 被 v-if 控制</p>
    <p v-show="flag">请求成功 --- 被 v-show 控制</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // flag 用来控制元素的显示与隐藏
            // 值为 true 时显示元素
            // 值为 false 时隐藏元素
            flag: false,
        },
    })
</script>
```

##### v-if 和 v-show 的区别

> **实现原理不同：**
>
> - v-if 指令会动态地创建或移除 DOM 元素，从而控制元素在页面上的显示与隐藏；
> - v-show 指令会动态为元素添加或移除 style="display: none;" 样式，从而控制元素的显示与隐藏；
>
> **性能消耗不同：**
>
> **v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。**
>
> - 如果需要非常频繁地切换，则使用 v-show 较好
> - 如果在运行时条件很少改变，则使用 v-if 较好

##### v-else 和 v-else-if

> **v-if** 可以单独使用，**或配合 v-else 指令一起使用**：
>
> **v-else-if** 指令，顾名思义，充当 v-if 的“else-if 块”，可以**连续使用**：

```html
<div id="app">
    <p v-if="num > 0.5">随机数 ＞ 0.5</p>
    <p v-else>随机数 ≤ 0.5</p>

    <hr />

    <p v-if="type === 'A'">优秀</p>
    <p v-else-if="type === 'B'">良好</p>
    <p v-else-if="type === 'C'">一般</p>
    <p v-else>差</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 生成 1 以内的随机数
            num: Math.random(),
            // 类型
            type: 'A'
        },
    })
</script>
```

#### 1.6列表渲染指令

##### v-for

> vue 提供了 v-for 指令，用来辅助开发者基于一个数组来循环渲染相似的 UI 结构。
>
> v-for 指令需要使用 item in items 的特殊语法，其中：
>
> - items 是待循环的数组
> - item 是当前的循环项

##### v-for 中的索引

> v-for 指令还支持一个可选的第二个参数，即当前项的索引。语法格式为 (item, index) in items，示例代码如下：

```html
<div id="app">
    <ul>
        <li v-for="(user, i) in list">索引是：{{i}}，姓名是：{{user.name}}</li>
    </ul>
</div>

<script src="./lib/vue-2.6.12.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 用户列表的数据
            list: [
                { id: 1, name: 'zs' },
                { id: 2, name: 'ls' },
            ],
        },
    })
</script>
```

> 注意：v-for 指令中的 item 项和 index 索引都是形参，可以根据需要进行重命名。例如 (user, i) in userlist

##### 使用 key 维护列表的状态

> 当**列表的数据变化**时，默认情况下，vue 会**尽可能的复用**已存在的 DOM 元素，从而**提升渲染的性能**。但这种默认的性能优化策略，会导致**有状态的列表无法被正确更新**。
>
> 为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证**有状态的列表被正确更新**的前提下，**提升渲染的性能**。此时，需要为每项提供一个**唯一的 key 属性**：

```html
<!-- 在页面中声明一个将要被 vue 所控制的 DOM 区域 -->
<div id="app">

    <!-- 添加用户的区域 -->
    <div>
        <input type="text" v-model="name">
        <button @click="addNewUser">添加</button>
    </div>

    <!-- 用户列表区域 -->
    <ul>
        <li v-for="(user, index) in userlist" :key="user.id">
            <input type="checkbox" />
            姓名：{{user.name}}
        </li>
    </ul>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 用户列表
            userlist: [
                { id: 1, name: 'zs' },
                { id: 2, name: 'ls' }
            ],
            // 输入的用户名
            name: '',
            // 下一个可用的 id 值
            nextId: 3
        },
        methods: {
            // 点击了添加按钮
            addNewUser() {
                this.userlist.unshift({ id: this.nextId, name: this.name })
                this.name = ''
                this.nextId++
            }
        },
    })
</script>
```

##### key 的注意事项

> 1. key 的值只能是**字符串**或**数字**类型
> 2. key 的值**必须具有唯一性**（即：key 的值不能重复）
> 3. 建议把**数据项 id 属性的值**作为 key 的值（因为 id 属性的值具有唯一性）
> 4. 使用 **index 的值**当作 key 的值**没有任何意义**（因为 index 的值不具有唯一性）
> 5. 建议使用 v-for 指令时**一定要指定 key 的值**（既提升性能、又防止列表状态紊乱）

### 2.过滤器

> **过滤器（Filters）**常用于文本的格式化。例如：
>
> **hello -> Hello**
>
> ***过滤器从本质上可以理解为一个函数*** **：即“管道符”前待处理的参数作为过滤器函数的参数，返回值为处理后的值。**
>
> 过滤器应该被添加在 JavaScript 表达式的尾部，由“管道符”进行调用，示例代码如下：

#### 2.1过滤器的简单使用

```html
<div id="app"> <!-- 通过 过滤器 将 title 和 message 转换为 "首字符大写的形式" --> 
    <p :title="info | capitalize">{{message | capitalize}}</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            message: 'hello vue.js',
            info: 'title info',
        },
        filters: {
            capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        }
    })
</script>
```

#### 2.2私有过滤器和全局过滤器

> 在 filters 节点下定义的过滤器，称为“**私有过滤器**”，因为它**只能在当前 vm 实例所控制的 el 区域内使用**。如果希望在**多个 vue 实例之间共享过滤器**，则可以按照如下的格式定义**全局过滤器**：

```html
<div id="app">
    <p :title="info | capitalize">{{message | capitalize}}</p>
</div>

<div id="app2">
    <p>{{abc | capitalize}}</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 全局过滤器
    Vue.filter('capitalize', (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1) + '~~~'
    })
</script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            message: 'hello vue.js',
            info: 'title info',
        },
        // 私有过滤器，只能被当前 vm 所控制的区域所使用
        filters: {
            capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            },
        },
    })
</script>

<script>
    const vm2 = new Vue({
        el: '#app2',
        data: {
            abc: 'abc'
        }
    })
</script>
```

> **注意：如果全局过滤器与私有过滤器函数名冲突，则以私有过滤器为准——（就近原则）**

#### 2.3连续调用多个过滤器

> 过滤器可以**串联地进行调用**，例如：

```html
<div id="app">
    <p :title="info | capitalize">{{message | capitalize | maxLength}}</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 全局过滤器
    // 首字母转大写的过滤器
    Vue.filter('capitalize', (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    })

    // 定义控制文本长度的过滤器
    Vue.filter('maxLength', (str) => {
        if(str.length <= 10) return str
        return str.slice(0, 10) + '...'
    })
</script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            message: 'hello vue.js',
            info: 'title info',
        },
    })
</script>
```

#### 2.4过滤器传参

> 过滤器的**本质**是 **JavaScript 函数**，因此可以接收参数，格式如下：

```html
<div id="app">
    <p :title="info | capitalize">{{message | capitalize | maxLength(3)}}</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
    // 全局过滤器
    // 首字母转大写的过滤器
    Vue.filter('capitalize', (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    })

    // 定义控制文本长度的过滤器
    // 这个位置的 len = 10 是在没有传递第二个参数时，给 len 一个默认值为 10 。
    Vue.filter('maxLength', (str, len = 10) => {
        if(str.length <= len) return str
        return str.slice(0, len) + '...'
    })
</script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            message: 'hello vue.js',
            info: 'title info',
        },
    })
</script>
```

#### 2.5过滤器的兼容性

> 过滤器**仅在 vue 2.x 和 1.x 中受支持**，**在 vue 3.x 的版本中剔除了过滤器**相关的功能。
>
> 在企业级项目开发中：
>
> **如果使用的是 2.x 版本的 vue，则依然可以使用过滤器相关的功能**
>
> **如果项目已经升级到了 3.x 版本的 vue，官方建议使用计算属性或方法代替被剔除的过滤器功能**
>
> 具体的迁移指南，请参考 vue 3.x 的官方文档给出的说明：
>
> **<https://v3.vuejs.org/guide/migration/filters.html#migration-strategy>**

## 四、第一个案例——品牌列表案例

### 1.案例描述

#### 1.1案例效果

#### 2.2用到的知识点

| bootstrap 4.x 相关的知识点                                   | vue 指令与过滤器 相关的知识点                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 卡片（Card）、表单相关（Forms）、按钮（Buttons）、表格（Tables） | 插值表达式、属性绑定、事件绑定、双向数据绑定、修饰符、条件渲染、列表渲染、全局过滤器 |

#### 2.3整体实现步骤

> 1. 创建基本的 vue 实例
> 2. 基于 vue 渲染表格数据
> 3. 实现添加品牌的功能
> 4. 实现删除品牌的功能
> 5. 实现修改品牌状态的功能

### 2.案例实现

#### 2.1创建基本的 Vue 实例

> **步骤1：导入 vue 的 js 文件**
>
> ```html
> <script src="./lib/vue-2.6.12.js"></script>
> ```

> **步骤2：在 body标签中声明 el 区域**
>
> ```html
> <div id="app">
> ```

> **步骤3：创建 vue 实例对象**
>
> ```html
> <script>
>  const vm = new Vue({
>      el: '#app',
>      data: {
>          brandlist: [
>              { id: 1, name: '宝马', state: true, addtime: new Date() },
>              { id: 2, name: '奥迪', state: true, addtime: new Date() },
>              { id: 3, name: '奔驰', state: true, addtime: new Date() },
>          ],
>      },
>  })
> </script>
> ```

#### 2.2基于 Vue 渲染表格数据

> **步骤1：使用 v-for 指令循环渲染表格的数据：**
>
> ```html
> <!-- TODO：循环渲染表格的每一行数据 -->
> <tr v-for="(item, index) in brandlist" :key="item.id">
>  <td>{{index + 1}}</td>
>  <td>{{item.brandname}}</td>
>  <td>{{item.state}}</td>
>  <td>{{item.addtime}}</td>
>  <td>
>      <a href="#">删除</a>
>  </td>
> </tr>
> ```

> **步骤2：将品牌的状态渲染为 Switch 开关效果：**
>
> ```html
> <td>
>  <div class="custom-control custom-switch">
>      <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.state">
>      <label class="custom-control-label" :for="item.id" v-if="item.state">已启用</label>
>      <label class="custom-control-label" :for="item.id" v-else>已禁用</label>
>  </div>
> </td>
> ```
>
> **Switch 开关效果的官方文档地址：**<https://v4.bootcss.com/docs/components/forms/#switches>

> **步骤3：使用全局过滤器对时间进行格式化：**
>
> ```html
> <!-- 对 创建时间 这一项调用 dateFormat 过滤器 -->
> <td>{{item.addtime | dateFormat}}</td>
> 
> <script>
>  // 创建全局的过滤器 dateFormat
>  Vue.filter('dateFormat', (dateStr) => {
>  const dt = new Date(dateStr)
> 
>  const y = dt.getFullYear()
>  const m = padZero(dt.getMonth() + 1)
>  const d = padZero(dt.getDate())
> 
>  const hh = padZero(dt.getHours())
>  const mm = padZero(dt.getMinutes())
>  const ss = padZero(dt.getSeconds())
> 
>  // 模板字符串进行时间的格式拼接
>  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
>  })
> 
>  // 补零函数
>  padZero = (n) => {
>   return n > 9 ? n : '0' + n
>  }
> 
> </script>
> ```

#### 2.3添加品牌

> **步骤1：阻止表单的默认提交行为：**
>
> ```html
> <form class="form-inline" @submit.prevent>
> ```

> **步骤2：为 input 输入框进行 v-model 双向数据绑定：**
>
> ```html
> <input type="text" class="form-control" placeholder="请输入品牌名称" v-model.trim="brandname" />
> ```
>
> **注意：需要在 data 数据中声明 brandname 属性字段。**
>
> ```vue
> data: {
>  brandname: '',
> },
> ```

> **步骤3：为“添加品牌”的 button 按钮绑定 click 事件处理函数：**
>
> ```html
> <button type="submit" class="btn btn-primary mb-2" @click="addNewbrand">添加品牌</button>
> ```

> **步骤4：在 data 中声明 nextId 属性（用来记录下一个可用的 id 值），并在 methods 中声明**
>
> **addNewBrand 事件处理函数：**
>
> ```js
> data: {
>  nextId: 4,
> },
> methods: {
>  // 添加新的品牌数据
>  addNewbrand() {
>   if (!this.brandname) return alert('品牌名称不能为空！')
>   this.brandlist.push({
>    id: this.nextId,
>    brandname: this.brandname,
>    state: true,
>    addtime: new Date()
>   })
>   this.brandname = ''
>   this.nextId++
>  },
> },
> ```

> **步骤5：监听 input 输入框的 keyup 事件，通过 .esc 按键修饰符快速清空文本框中的内容：**
>
> ```html
> <input type="text" class="form-control" placeholder="请输入品牌名称" v-model.trim="brandname" @keyup.esc="brandname = ''" />
> ```

#### 2.4删除品牌

> 步骤1：为删除的 a 链接绑定 click 点击事件处理函数，并阻止其默认行为：
>
> ```html
> <a href="#" @click.prevent="removeBrand(item.id)">删除</a>
> ```

> 步骤2：在 methods 节点中声明 removeBrand 事件处理函数如下：
>
> ```js
> // 删除品牌 根据id删除对应的数据
> removeBrand() {
>  this.brandlist = this.brandlist.filter(x => x.id !== id)
> },
> ```

### 3.案例最终代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 导入 bootstrap 的样式表 -->
    <!-- https://v4.bootcss.com/docs/components/forms/#switches -->
    <link rel="stylesheet" href="./lib/bootstrap.css" />
    <style>
        :root {
            font-size: 13px;
        }

        body {
            padding: 8px;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 卡片区域 -->
        <div class="card">
            <h5 class="card-header">添加品牌</h5>
            <div class="card-body">
                <!-- 添加品牌的表单 -->
                <form class="form-inline" @submit.prevent>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">品牌名称</div>
                        </div>
                        <!-- 文本输入框 -->
                        <input type="text" class="form-control" placeholder="请输入品牌名称" v-model.trim="brandname"
                            @keyup.esc="brandname = ''" />
                    </div>

                    <!-- 提交表单的按钮 -->
                    <button type="submit" class="btn btn-primary mb-2" @click="addNewbrand">添加品牌</button>
                </form>
            </div>
        </div>
        <!-- 品牌列表 -->
        <table class="table table-bordered table-striped mt-2">
            <thead>
                <tr>
                    <th>#</th>
                    <th>品牌名称</th>
                    <th>状态</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <!-- 表格的主体区域 -->
            <tbody>
                <!-- TODO：循环渲染表格的每一行数据 -->
                <tr v-for="(item, index) in brandlist" :key="item.id">
                    <td>{{index + 1}}</td>
                    <td>{{item.brandname}}</td>
                    <td>
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.state">
                            <label class="custom-control-label" :for="item.id" v-if="item.state">已启用</label>
                            <label class="custom-control-label" :for="item.id" v-else>已禁用</label>
                        </div>
                    </td>
                    <td>{{item.addtime | dateFormat}}</td>
                    <td>
                        <a href="#" @click.prevent="removeBrand(item.id)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script src="./lib/vue-2.6.12.js"></script>
    <script>

        // 创建全局的过滤器 dateFormat
        Vue.filter('dateFormat', (dateStr) => {
            const dt = new Date(dateStr)

            const y = dt.getFullYear()
            const m = padZero(dt.getMonth() + 1)
            const d = padZero(dt.getDate())

            const hh = padZero(dt.getHours())
            const mm = padZero(dt.getMinutes())
            const ss = padZero(dt.getSeconds())

            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        })

        // 补零函数
        padZero = (n) => {
            return n > 9 ? n : '0' + n
        }

        const vm = new Vue({
            el: '#app',
            data: {
                brandname: '',
                nextId: 4,
                brandlist: [
                    { id: 1, brandname: '宝马', state: true, addtime: new Date() },
                    { id: 2, brandname: '奥迪', state: false, addtime: new Date() },
                    { id: 3, brandname: '奔驰', state: true, addtime: new Date() },

                ],
            },
            methods: {
                // 添加新的品牌数据
                addNewbrand() {
                    if (!this.brandname) return alert('品牌名称不能为空！')
                    this.brandlist.push({
                        id: this.nextId,
                        brandname: this.brandname,
                        state: true,
                        addtime: new Date()
                    })
                    this.brandname = ''
                    this.nextId++
                },
                // 删除品牌
                removeBrand(id) {
                    this.brandlist = this.brandlist.filter(x => x.id !== id)
                },
            },
        })
    </script>
</body>

</html>
```

## 五、Vue基础入门总结

> 一、能够知道 vue 的基本使用步骤
>
> - 导入 vue.js 文件
> - new Vue() 构造函数，得到 vm 实例对象
> - 声明 el 和 data 数据节点
> - MVVM 的对应关系

> 二、掌握 vue 中常见指令的基本用法
>
> - 插值表达式、v-bind、v-on、v-if 和 v-else
> - v-for 和 :key、v-model

> 三、掌握 vue 中过滤器的基本用法
>
> - 全局过滤器 Vue.filter('过滤器名称', function)
> - 私有过滤器 filters 节点
