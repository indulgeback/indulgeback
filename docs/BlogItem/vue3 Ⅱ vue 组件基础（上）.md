---
title: vue3 Ⅱ vue 组件基础（上）
date: 2023-04-18
author: liuwy
categories:
 - 技术
tags:
 - Javascript
 - Vue
---

|                   目标                    |              目录              |
| :---------------------------------------: | :----------------------------: |
|         了解什么是单页面应用程序          |       六、单页面应用程序       |
|         了解如何用 vite 创建项目          |      七、vite 的基本使用       |
|          组件化开发的优点与好处           |       八、组件化开发思想       |
|      template、script、style三个节点      |       九、vue 组件的构成       |
| 组件的注册、样式冲突、props、动态绑定样式 |       十、组件的基本使用       |
|          实现一个简单组件的封装           | 十一、第二个案例——封装组件案例 |
|                总结与概括                 |  十二、vue 组件基础（上）总结  |

## 六、单页面应用程序

### 1.什么是单页面应用程序

> **单页面应用程序**（英文名：**S**ingle **P**age **A**pplication）简称 **SPA**，顾名思义，指的是**一个 Web 网站中只有唯一的一个 HTML 页面**，所有的**功能与交互**都在这唯一的**一个页面内完成**。

### 2.单页面应用程序的特点

> 单页面应用程序将所有的功能局限于一个 web 页面中，**仅在该 web 页面初始化时加载相应的资源**（ HTML、JavaScript 和 CSS）。
>
> 一旦页面加载完成了，SPA **不会**因为用户的操作而**进行页面的重新加载或跳转**。而是利用 JavaScript 动态地变换HTML 的内容，从而实现页面与用户的交互。

### 3.单页面应用程序的优缺点

> SPA 单页面应用程序最显著的 3 个优点如下：
>
> ① 良好的交互体验
>
> ​ 🤞单页应用的内容的改变不需要重新加载整个页面
>
> ​ 🤞获取数据也是通过 Ajax 异步获取
>
> ​ 🤞没有页面之间的跳转，不会出现“白屏现象”
>
> ② 良好的前后端工作分离模式
>
> ​ 🤞后端专注于提供 API 接口，更易实现 API 接口的复用
>
> ​ 🤞前端专注于页面的渲染，更利于前端工程化的发展
>
> ③ 减轻服务器的压力
>
> ​ 🤞服务器只提供数据，不负责页面的合成与逻辑的处理，吞吐能力会提高几倍

> 任何一种技术都有自己的局限性，对于 SPA 单页面应用程序来说，主要的缺点有如下两个：
>
> ① 首屏加载慢
>
> 解决方式：
>
> ​ 🤞路由懒加载
>
> ​ 🤞代码压缩
>
> ​ 🤞CDN 加速
>
> ​ 🤞网络传输压缩
>
> ② 不利于 SEO
>
> 解决方式：
>
> ​ 🤞SSR 服务器端渲染

### 4.如何快速创建Vue的SPA项目

> vue 官方提供了**两种**快速创建工程化的 SPA 项目的方式：
>
> **①** 基于 **vite** 创建 SPA 项目
>
> **②** 基于 **vue-cli** 创建 SPA 项目

|                            |          vite          |        vue-cli         |
| :------------------------: | :--------------------: | :--------------------: |
|      支持的 vue 版本       |   **仅支持 vue3.x**    |    支持 3.x 和 2.x     |
|      是否基于 webpack      |           否           |           是           |
|          运行速度          |         **快**         |          较慢          |
|         功能完整度         | **小而巧（逐渐完善）** |         大而全         |
| 是否建议在企业级开发中使用 |       目前不建议       | 建议在企业级开发中使用 |

## 七、vite的基本使用

### 1.创建 vite 项目

> **基于  vite  创建  vue 3.x 的工程化项目**

> **在你想创建项目的位置打开 PowerShell 窗口，输入：**
>
> npm  init  vite-app  项目名称
>
> **然后  cd  到项目目录中：**
>
> cd  项目名称
>
> **安装 npm 依赖包：**
>
> npm  i
>
> **运行 dev 启动项目：**
>
> npm  run  dev

### 2.梳理项目的结构

> 其中：
>
> 🤞node_modules 目录用来存放第三方依赖包
>
> 🤞public 是公共的静态资源目录
>
> 🤞src 是项目的源代码目录（程序员写的所有代码都要放在此目录下）
>
> 🤞assets 目录用来存放项目中所有的静态资源文件（css、fonts等）
>
> 🤞components 目录用来存放项目中所有的自定义组件
>
> 🤞App.vue 是项目的根组件
>
> 🤞index.css 是项目的全局样式表文件
>
> 🤞main.js 是整个项目的打包入口文件
>
> 🤞.gitignore 是 Git 的忽略文件
>
> 🤞index.html 是 SPA 单页面应用程序中唯一的 HTML 页面
>
> 🤞package.json 是项目的包管理配置文件

### 3. vite 项目的运行流程

> 在工程化的项目中，vue 要做的事情很单纯：通过 **main.js** 把 **App.vue** 渲染到 **index.html** 的指定区域中。
>
> 其中：
>
> ① **App.vue** 用来编写待渲染的**模板结构**
>
> ② **index.html** 中需要预留一个 **el 区域**
>
> ③ **main.js** 把 App.vue **渲染**到了 index.html 所预留的区域中

#### 3.1 在 App.vue 中编写模板结构

```vue
<template>
  <h1>这是app.vue根组件</h1> 
  <h3>avc</h3>
</template>
```

#### 3.2 在 index.html 中预留 el 区域

```html
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body
```

#### 3.3 在 main.js 中把 App.vue 渲染到 index.html 所预留的区域中

```js
// 1.按需导入 createApp 函数
import { createApp } from 'vue'
// 2.导入待渲染的 App.vue 组件
import App from './App.vue'

// 3.调用 createApp 函数，创建 SPA 应用的实例
const app = createApp(App)

// 4.调用 mount() 方法把 App 组件的模板结构，渲染到指定的 el 区域中
app.mount('#app')
```

## 八、组件化开发思想

### 1.什么是组件化开发思想

> 组件化开发指的是：根据封装的思想，把页面上可重用的部分封装为组件，从而方便项目的开发和维护。
>
> 例如：<http://www.ibootstrap.cn/> 所展示的效果，就契合了组件化开发的思想。用户可以通过拖拽组件的方式，快速生成一个页面的布局结构。

### 2.前端组件化开发的好处

> 前端组件化开发的好处主要体现在以下两方面：
>
> - 提高了前端代码的复用性和灵活性
> - 提升了开发效率和后期的可维护性

### 3.vue中的组件化开发

> **vue** 是一个**完全支持组件化开发的框架**。**vue** 中规定组件的**后缀名**是 **.vue**。之前接触到的 **App.vue 文件本质上就是一个 vue 的组件**。

## 九、vue 组件的构成

### 1.vue 组件组成结构

> 每个 .vue 组件都由 3 部分构成，分别是：
>
> - template -> 组件的模板结构
> - script -> 组件的 JavaScript 行为
> - style -> 组件的样式
>
> 其中，每个组件中必须包含 template 模板结构，而 script 行为和 style 样式是可选的组成部分。

### 2.组件的 template 节点

> vue 规定：每个组件对应的模板结构，需要定义到 template 节点中。

```vue
<template>
<!-- 当前组件的 DOM 结构，需要定义到 template 标签的内部 -->
</template>
```

> 注意：template 是 vue 提供的容器标签，只起到包裹性质的作用，它不会被渲染为真正的 DOM 元素。

#### 2.1 在 template 中使用指令

> 在组件的 template>节点中，支持使用前面所学的**指令语法**，来辅助开发者渲染当前组件的 DOM 结构。

#### 2.2 在 template 中定义根节点

> 在 vue 2.x 的版本中，template 节点内的 DOM 结构仅支持**单个**根节点
>
> 但是，在 vue 3.x 的版本中，template 中支持定义**多个**根节点

### 3.组件的 script 节点

vue 规定：组件内的 script 节点是可选的，开发者可以在 script 节点中封装组件的 JavaScript 业务逻辑。

script 节点的基本结构如下：

```html
<script>
    // 今后，组件相关的 data 数据， methods 方法等
    // 都需要的定义到 export default 所导出的对象中。
    export default {}
</script>
```

#### 3.1 script 中的 name 节点

> 可以通过 name 节点为当前组件定义一个名称：**每个首字在使用 vue-devtools 进行项目调试的时候，自定义的组件名称可以**清晰的区分每个组件**：
le="zoom:150%;" />

#### 3.2 script 中的 data 节点

> vue 组件渲染期间需要用到的数据，可以定义在 data**vue 规定**：组件中的 **data 必须是一个函数**，不能直接指向一个数据对象。

#### 3.3 script 中的 methods 节点

> 组件中的**事件处理函数**，必须定义到 **methods # 4.组件的 style 节点

> vue 规定：组件内的 style 节点是可选的，开发者可以在 style 节点中编写样式美化当前组件的 UI 结构。

```vue
<style lang="css">
    h1{
        font-weight: normal;
    }
</style>
```

> 其中 style 标签上的 lang="css" 属性是可选的，它表示所使用的样式语言。默认只支持普通的 css 语法，可选值还有 less、scss 等。

#### 4.1 让 style 中支持 less 语法

> 如果希望使用 less 语法编写组件的 style 样式，可以按照如下两个步骤进行配置：
>
> ① 运行 **npm install less -D** 命令安装依赖包，从而提供 less 语法的编译支持
>
> ② 在 style 标签上添加 **lang="less"** 属性，即可使用 less 语法编写组件的样式

```vue
<style lang="less">
    h1{
        font-weight: normal;
        i{
            color: red;
            font-style: normal;
        }
    }
</style>
```

## 十、组件的基本使用

### 1.组件的注册

> 组件之间可以进行vue 中组件的**引用**原则：**先注册后使用**。

#### 1.1 注册组件的两种方式

> vue 中注册组件的方式分为“**全局注册**”和“**局部注册**”两种，其中：
>
> - 被**全局**注册的组件，**可以在全局任何一个组件内使用**
> - 被**局部**注册的组件，**只能在当前注册的范围## 1.2 全局注册组件

```js
// 1.按需导入 createApp 函数
import { createApp } from 'vue'
// 2.导入待渲染的 App.vue 组件
import App from './App.vue'

// ① 导入需要被全局注册的组件
import Swiper from './components/01.globalReg/Swiper.vue'
import Test from './components/01.globalReg/Test.vue'

// 3.调用 createApp 函数，创建 SPA 应用的实例
const app = createApp(App)

// ② 全局注册组件
app.component('my-swiper', Swiper)
app.component('my-test', Test)
// 4.调用 mount() 方法把 App 组件的模板结构，渲染到指定的 el 区域中
app.mount('#app')
```

#### 1.3 使用全局注册组件

> 使用app.component() 方法注册的全局组件，直接以**标签**的形式进行使用即可

```vue
<my-swiper></my-swiper>
<my-test></my-test>
```

#### 1.4 局部注册组件

```vue
<template>
<my-search></my-search>
</template>
export default {
 components: {
     "my-search": Search,
 },
}
```

#### 1.5 全局注册和局部注册的区别

> - 被**全局**注册的组件，**可以在全局任何一个组件内使用**
> - 被**局部**注册的组件，**只能在当前注册的范围内使用**
>
> 应用场景：
>
> 如果某些组件在开发期间的**使用频率很高**，推荐进行**全局**注册；
>
> 如果某些组件**只在特定的情况下会被用到**，推荐进行**局部**注册。

#### 1.6 组件注册时名称的大小写

> 在进行组件的注册时，定义组件注册名称的方式有两种：
>
> ①使用kebab-case命名法（俗称短横线命名法，例如my-swiper 和my-search）
>
> ②使用PascalCase命名法（俗称帕斯卡命名法或大驼峰命名法，例如MySwiper和MySearch）
>
> 短横线命名法的特点：
>
> - 必须严格按照短横线名称进行使用
>
> 帕斯卡命名法的特点：
>
> - 既可以严格按照帕斯卡名称进行使用，又可以转化为短横线名称进行使用
>
> 注意：在实际开发中，推荐使用帕斯卡命名法为组件注册名称，因为它的适用性更强。

#### 1.7 通过 name 属性注册组件

> 在注册组件期间，除了可以**直接提供组件的注册名称**之外，还可以**把组件的name 属性**作为注册后**组件的名称**，示例代码如下：

```vue
app.component(Test.name, Test)
```

### 2.组件之间的样式冲突问题

> 默认情况下，写在.vue 组件中的样式会全局生效，因此很容易造成多个组件之间的样式冲突问题。导致组件
>
> 之间样式冲突的根本原因是：
>
> ①单页面应用程序中，所有组件的DOM 结构，都是基于唯一的index.html 页面进行呈现的
>
> ②每个组件中的样式，都会影响整个index.html 页面中的DOM 元素

#### 2.1 解决样式冲突的问题

> **为每个组件分配唯一的自定义属性**，在编写组件样式时，通过**属性选择器**来控制**样式的作用域**，示例代码如下：

```vue
<template>
 <div class="container" data-v-001>
  <h3 data-v-001>轮播图组件</h3>
 </div>
</template>

<style>
    /*  通过中括号“属性选择器”，来防止组件之间的样式冲突问题，
     因为每个组件分配的自定义属性是“唯一”的  */
    .container[data-v-001]{
        border: 1px solid red;
    }
</style>
```

#### 2.2 style 节点的 scoped 属性

> 为了提高开发效率和开发体验，vue 为**style** 节点提供了**scoped**属性，从而防止组件之间的样式冲突问题：

```vue
<style lang="less" scoped>
p {
  color: red;
}
</style>
```

#### 2.3 /deep/ 样式穿透

> 如果给当前组件的style 节点添加了scoped 属性，则当前组件的样式对其子组件是不生效的。如果想让某些样式对子组件生效，可以使用**/deep/ 深度选择器**。

> 注意：/deep/是vue2.x 中实现样式穿透的方案。在vue3.x 中推荐使用:**deep()**替代/deep/。

```vue
<style lang="less" scoped>
p {
  color: red;
}

/* /deep/ .title {
   color: blue;
 }*/

:deep(.title) {
  color: blue;
}
</style>
```

### 3.组件的 props

> 为了提高组件的**复用性**，在封装vue 组件时需要遵守如下的原则：
>
> - 组件的**DOM 结构**、**Style 样式**要尽量复用
> - 组件中**要展示的数据**，尽量由组件的使用者提供
>
> 为了方便使用者为组件提供要展示的数据，vue 组件提供了props 的概念。

#### 3.1 什么是组件的 props

> **props** 是组件的**自定义属性**，组件的**使用者**可以通过props **把数据传递到子组件内部**，供子组件内部进行使用。
>
> props 的作用：父组件通过props 向子组件传递要展示的数据。
>
> props 的好处：提高了组件的复用性。
>
> 代码示例如下：

```vue
<!-- 通过自定义 props，把文章的标题和作者，传递到 my-article -->
<my-article title="面朝大海，春暖花开" author="海子"></my-article>
```

#### 3.2 在组件中声明 props

> 在封装vue 组件时，可以把动态的数据项声明为props自定义属性。自定义属性可以在当前组件的模板结构中被直接使用。

```vue
<!-- my-article 组件的定义如下： -->
<template>
 <h3>标题：{{title}}</h3>
    <h3>作者：{{author}}</h3>
</template>

<script>
export default {
    props: ['title','author'], //父组件传递 my-article 组件的数据，必须在 props 节点中声明
}
</script>
```

#### 3.3 无法使用未声明的 props

> 如果父组件给子组件传递了未声明的props 属性，则这些属性会被忽略，无法被子组件使用

```vue
<!-- my-article 组件的定义如下： -->
<template>
 <h3>标题：{{title}}</h3>
    <h3>作者：{{author}}</h3>
</template>

<script>
export default {
    name: 'MyArticle',
    // 外界可以传递指定的数据，到当前的组件中
    props: ['title'], // author 属性没有声明，因此子组件中无法访问到 author 的值
}
</script>
```

#### 3.4 动态绑定 props 的值

> 可以使用v-bind 属性绑定的形式，为组件动态绑定props 的值

```vue
<my-article :title="info.title" :author="'post by ' + info.author" pub-time="1989"></my-article>
```

#### 3.5 props 的大小写命名

> 组件中如果使用“camelCase(驼峰命名法)”声明了props 属性的名称，则有两种方式为其绑定属性的值

```vue
<template>
    <!-- 两种都可以 -->
 <!-- 短横线分割命名 -->
    <my-article :title="info.title" :author="'post by ' + info.author" pub-time="1989"></my-article>
 <!-- 驼峰命名 -->
    <my-article :title="info.title" :author="'post by ' + info.author" pubTime="1989"></my-article>
</template>

<script>
export default {
  name: 'MyArticle',
  // 外界可以传递指定的数据，到当前的组件中
  props: ['title', 'author', 'pubTime']
}
</script>
```

### 4. Class 和 Style 绑定

> 在实际开发中经常会遇到动态操作元素样式的需求。因此，vue 允许开发者通过 v-bind 属性绑定指令，为元素动态绑定 class 属性的值和行内的 style 样式。

#### 4.1 动态绑定 HTML 的 class

> 可以通过三元表达式，动态的为元素绑定 class## 4.2 以数组语法绑定 HTML 的 class

> 如果元素需要动态绑定多个 class 的类名，此时可以使用数组的语法格式：

```vue
<h3 class="thin" :class="[isItalic ? 'italic' : '', isDelete ? 'delete' : '']">MyStyle 组件</h3>

<script>
export default {
  name: 'MyStyle',
  data() {
    return {
      // 字体是否倾斜
      isItalic: false,
      // 是否应用删除效果
      isDelete: false,
    }
  },
}
</script>

<style lang="less">
// 字体变细
.thin {
  font-weight: 200;
}

// 倾斜字体
.italic {
  font-style: italic;
}

.delete {
  text-decoration: line-through;
}
</style>
```

#### 4.3 以对象语法绑定 HTML 的 class

```vue
<template>
<h3 class="thin" :class="classObj">MyStyle 组件</h3>
<button @click="classObj.italic = !classObj.italic">Toggle Italic</button>
<button @click="classObj.delete = !classObj.delete">Toggle Delete</button>
</template>

<script>
export default {
  name: 'MyStyle',
  data() {
    return {
      // 字体是否倾斜
      isItalic: false,
      // 是否应用删除效果
      isDelete: false,]
      classObj: {
        italic: false,
        delete: false,
      },
    }
  },
}
</script>

<style lang="less">
// 字体变细
.thin {
  font-weight: 200;
}

// 倾斜字体
.italic {
  font-style: italic;
}

.delete {
  text-decoration: line-through;
}
</style>
```

#### 4.4 以对象语法绑定内联的 style

```vue
<template>
<div :style="{ color: active, fontSize: fsize + 'px', 'background-color': bgcolor }">黑马程序员</div>
 <button @click="fsize+=1">字号 +1</button>
 <button @click="fsize-=1">字号 -1</button>
</template>

<script>
export default {
  name: 'MyStyle',
  data() {
    return {
      // 高亮时的文本颜色
      active: 'red',
      // 文字的大小
      fsize: 30,
      // 背景颜色
      bgcolor: 'pink',
      },
    }
  },
}
</script>
```

## 十一、第二个案例——封装组件案例

### 1.案例描述

#### 1.1封装要求
>
> 1. 允许用户自定义 title 标题
> 2. 允许用户自定义 bgcolor 背景色
> 3. 允许用户自定义 color 文本颜色
> 4. MyHeader 组件需要在页面顶部进行 fixed 固定定位，且 z-index 等于 999

> 使用示例如## 1.2 用到的知识点

> - 组件的封装与注册
> - props
> - 样式绑定

#### 1.3 整体实现步骤

> - 创建 MyHeader 组件
> - 渲染 MyHeader 组件的基本结构
> - 在 App 组件中注册并使用 MyHeader 组件
> - 通过 props 为组件传递数据

### 2.案例实现代码

```vue
<!-- MyHeader.vue组件部分 -->
<template>
  <div
    class="header-container"
    :style="{ backgroundColor: bgcolor, color: color }"
  >
    xxx
  </div>
  {{ title || "Header 组件" }}
</template>

<script>
export default {
  name: "MyHeader",
  props: ["title", "bgcolor", "color"],
};
</script>

<style lang="less" scoped>
.header-container {
  height: 45px;
  background-color: pink;
  text-align: center;
  line-height: 45px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
```

```vue
<!-- app.vue部分 -->
<template>
  <div class="app-container">
    <h1>App根组件</h1>
  </div>
  <hr />
  <MyHeader title="黑马程序员" bgcolor="blue" color="white"></MyHeader>
</template>

<script>
import MyHeader from "./06.MyHeader/MyHeader.vue";
export default {
  name: "MyApp",
  components: {
    MyHeader,
  },
};
</script>

<style lang="less" scoped>
.app-container {
  margin-top: 45px;
}
</style>
```

## 十二、vue 组件基础（上）总结

> ① 能够说出什么是单页面应用程序及组件化开发
>
> 🤞SPA、只有一个页面、组件是对 UI 结构的复用
>
> ② 能够说出 .vue 单文件组件的组成部分
>
> 🤞template、script、style（scoped、lang）
>
> ③ 能够知道如何注册 vue 的组件
>
> 🤞全局注册（app.component）、局部注册（components）
>
> ④ 能够知道如何声明组件的 props 属性
>
> 🤞props 数组
>
> ④ 能够知道如何在组件中进行样式绑定
>
> 🤞动态绑定 class、动态绑定 style
