---
title: vue3 V vue 组件高级（下）
date: 2023-04-24
author: liuwy
categories:
 - 技术
tags:
 - Javascript
 - Vue
---

|                          目标                          |              目录              |
| :----------------------------------------------------: | :----------------------------: |
| 如何使用 ref 引用 DOM 和组件实例、$nextTick 的调用时机 |        二十五、ref 引用        |
|                 keep-alive 元素的作用                  |        二十六、动态组件        |
|                     插槽的基本用法                     |          二十七、插槽          |
|                     如何自定义指令                     |       二十八、自定义指令       |
|                   以上内容的复习巩固                   | 二十九、第五个案例——Table 案例 |
|                       总结与概括                       |  三十、vue组件高级（下）总结   |

## 二十五、ref 引用

### 1.什么是 ref 引用

> ref 用来辅助开发者在==不依赖于 jQuery 的情况下==，获取 DOM 元素或组件的引用。
>
> 每个 vue 的组件实例上，都包含一个 ==$refs 对象==，里面存储着对应的 DOM 元素或组件的引用。默认情况下，==组件的 $refs 指向一个空对象==。

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <hr>

    <button type="button" class="btn btn-primary" @click="getRefs">获取 $refs 引用</button>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  methods: {
    getRefs() {
      // this 代表当前组件的实例对象，this.$refs 默认指向空对象 
      console.log(this)
    }
  },
}
</script>

<style lang="less" scoped></style>
```

### 2.使用 ref 引用 DOM 元素

> 如果想要使用 ref 引用页面上的 DOM 元素，则可以按照如下的方式进行操作：

```vue
<template>
  <div>
    <h1 ref="myh1">App 根组件</h1>
    <hr>

    <button type="button" class="btn btn-primary" @click="getRefs">获取 $refs 引用</button>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  methods: {
    getRefs() {
      this.$refs.myh1.style.color = 'red'
    }
  },
}
</script>

<style lang="less" scoped></style>
```

### 3.使用 ref 引用组件实例

> 如果想要使用 ref 引用页面上的组件实例，则可以按照如下的方式进行操作：

```vue
// 根组件
<template>
  <div>
    <h1 ref="myh1">App 根组件</h1>
    <hr>

    <button type="button" class="btn btn-primary" @click="getRefs">获取 $refs 引用</button>

    <my-counter ref="counterRef"></my-counter>
  </div>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  name: 'MyApp',
  methods: {
    getRefs() {
      this.$refs.counterRef.reset()
    }
  },
  components: {
    MyCounter,
  }
}
</script>

<style lang="less" scoped></style>

// 子组件
<template>
  <div class="counter-container">
    <h3>Counter 组件 --- {{ count }}</h3>
    <hr />
    <button type="button" class="btn btn-info" @click="count += 1">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    reset() {
      this.count = 0
    }
  },
}
</script>

<style lang="less" scoped>
.counter-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #efefef;
  border-radius: 4px;
  box-shadow: 0px 1px 10px #efefef;
}
</style>
```

### 4.控制文本框和按钮的按需切换

> 通过布尔值 inputVisible 来控制组件中的文本框与按钮的按需切换：

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <hr />

    <input type="text" class="form-control" v-if="inputVisible" ref="ipt" />
    <button type="button" class="btn btn-primary" v-else @click="showInput">展示 input 输入框</button>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  data() {
    return {
      inputVisible: false,
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
input.form-control {
  width: 280px;
  display: inline;
  vertical-align: bottom;
}
</style>
```

### 5.让文本框自动获得焦点

> ==错误写法==：当文本框展示出来之后，希望它立即获得焦点，为其添加 ref 引用，并调用原生 DOM 对象的.focus() 方法：

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <hr />

    <input type="text" class="form-control" v-if="inputVisible" ref="ipt" />
    <button type="button" class="btn btn-primary" v-else @click="showInput">展示 input 输入框</button>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  data() {
    return {
      inputVisible: false,
    }
  },
  methods: {
    showInput() {
      // 展示文本框
      this.inputVisible = true
      // 获取到文本框的引用对象，然后调用 focus() 方法
      this.$refs.ipt.focus()
    }
  }
}
</script>

<style lang="less" scoped>
input.form-control {
  width: 280px;
  display: inline;
  vertical-align: bottom;
}
</style>
```

> ==正确写法==：使用组件的 $nextTick(cb) 方法，会把 cb 回调推迟到下一个 DOM 更新周期之后执行。通俗的理解是：等组件的DOM 异步地重新渲染完成后，再执行 cb 回调函数。从而能保证 cb 回调函数可以操作到最新的 DOM 元素。

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <hr />

    <input type="text" class="form-control" v-if="inputVisible" ref="ipt" />
    <button type="button" class="btn btn-primary" v-else @click="showInput">展示 input 输入框</button>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  data() {
    return {
      inputVisible: false,
    }
  },
  methods: {
    showInput() {
      // 展示文本框
      this.inputVisible = true
      // 把对 input 文本框的操作，推迟到下次 DOM 更新之后，否则页面上根本不存在文本框元素
      this.$nextTick(() => {
        // 获取到文本框的引用对象，然后调用 focus() 方法
        this.$refs.ipt.focus()
      })
    },
  },
}
</script>

<style lang="less" scoped>
input.form-control {
  width: 280px;
  display: inline;
  vertical-align: bottom;
}
</style>
```

## 二十六、动态组件

### 1.什么是动态组件

> 动态组件指的是动态切换组件的显示与隐藏。vue 提供了一个内置的 component 组件，专门用来实现组件的动态渲染。
>
> ① component 是组件的占位符
>
> ② 通过 ==is 属性==动态指定要渲染的组件名称
>
> ③ <//component is="要渲染的组件的名称"></>

### 2.如何实现动态组件渲染

```vue
<template>
  <div>
    <h1 class="mb-4">App 根组件</h1>
    <button type="button" class="btn btn-primary" @click="comName = 'MyHome'">首页</button>
    <button type="button" class="btn btn-info ml-2" @click="comName = 'MyMovie'">电影</button>
    <hr />
    <component :is="comName"></component>
  </div>
</template>

<script>
// 导入组件
import MyHome from './Home.vue'
import MyMovie from './Movie.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      comName: 'MyHome'
    }
  },
  // 注册组件
  components: {
    MyHome,
    MyMovie,
  },
}
</script>

<style lang="less" scoped></style>
```

### 3.使用 keep-alive 保持状态

> ==默认==情况下，切换动态组件时==无法保持组件的状态==。此时可以使用 vue 内置的 ==keep-alive== 组件==保持动态组件的状态==。

```vue
<template>
  <div>
    <h1 class="mb-4">App 根组件</h1>
    <button type="button" class="btn btn-primary" @click="comName = 'MyHome'">首页</button>
    <button type="button" class="btn btn-info ml-2" @click="comName = 'MyMovie'">电影</button>
    <hr />
    <!-- 使用 keep-alive 组件 -->
    <keep-alive>
     <component :is="comName"></component>
    </keep-alive>
  </div>
</template>
```

## 二十七、插槽

### 1.什么是插槽

> ==插槽==（==Slot==）是 vue 为==组件的封装者==提供的能力。允许开发者在封装组件时，把==不确定的、希望由用户指定的部分==定义为==插槽==。

> 可以把插槽认为是组件封装期间，为用户预留的内容的占位符。

### 2.插槽的基础用法

> 在封装组件时，可以通过 ==slot== 元素==定义插槽==，从而==为用户预留内容占位符==：

#### 2.1 没有预留插槽的内容会被丢弃

> 如果在封装组件时没有预留任何 slot 插槽，则用户提供的任何自定义内容都会被丢弃。

#### 2.2 后备内容

> 封装组件时，可以为预留的 slot 插槽提供后备内容（默认内容）。如果组件的使用者没有为插槽提供任何内容，则后备内容会生效。

### 3.具名插槽

> 如果在封装组件时==需要预留多个插槽节点==，则需要为每个 slot 插槽指定==具体的 name 名称==。这种==带有具体名称的插槽==叫做“具名插槽”：

```vue
<template>
  <div>
    <!-- 我们希望把页头放到这里 -->
    <header>
      <slot name="header"></slot>
    </header>
    <!-- 我们希望把主要内容放到这里，没有指定 name 名称的插槽，会有隐含的名称叫做 "default" -->
    <main>
      <slot></slot>
    </main>
    <!-- 我们希望把页脚放到这里 -->
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

#### 3.1 为具名插槽提供内容

> 在向具名插槽提供内容的时候，我们可以在一个 template 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <hr />

    <!-- 使用组件 -->
    <my-article>
      <template #header>
        <h1>滕王阁序</h1>
      </template>
      <template #default>
        <p>豫章故郡，洪都新府。</p>
        <p>星分翼轸，地接衡庐</p>
        <p>襟三江而带五湖，控蛮荆而引瓯越。</p>
      </template>
      <template #footer>
        <p>落款：王勃</p>
      </template>
    </my-article>
  </div>
</template>
```

#### 3.2 具名插槽的简写形式

> 跟 ==v-on== 和 ==v-bind== 一样，==v-slot== 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 ==#==。例如 v-slot:header可以被重写为 ==#header==

### 4.作用域插槽

> 在封装组件的过程中，可以为预留的 slot 插槽绑定 props 数据，这种带有 props 数据的 slot 叫做“作用域插槽”：

```vue
<!-- 子组件 -->
<div>
    <h3>这是 TEST 组件</h3>
    <slot :info="infomation"></slot>
</div>

<!-- 使用组件 -->
<my-test>
 <template v-slot:default="scope">
     {{ scope }}
    </template>
</my-test>
```

#### 4.1 解构作用域插槽的 Prop

> 作用域插槽对外提供的数据对象，可以使用解构赋值简化数据的接收过程：

```vue
<!-- 使用自定义组件 -->
<my-test>
    <template #default="{ msg, info }">
<p>{{ msg }}</p>
<p>{{ info.address }}</p>
    </template>
</my-test>
```

#### 4.2 声明作用域插槽

> 在封装 MyTable 组件的过程中，可以通过作用域插槽把表格每一行的数据传递给组件的使用者：

```vue
<!-- 表格主体区域 -->
<tbody>
 <!-- 循环渲染表格数据 -->
 <tr v-for="item in list" :key="item.id">
  <slot :user="item"></slot>
 </tr>
</tbody>
```

#### 4.3 使用作用域插槽

> 在使用 MyTable 组件时，自定义单元格的渲染方式，并接收作用域插槽对外提供的数据：

```vue
<!-- 表格主体区域 -->
<tbody>
 <!-- 循环渲染表格数据 -->
 <tr v-for="item in list" :key="item.id">
  <slot :user="item"></slot>
 </tr>
</tbody>
<!-- 使用组件，填充插槽 -->
<my-table>
 <template #default="{ user }">
  <td>{{ user.id }}</td>
  <td>{{ user.name }}</td>
  <td>
   <input type="checkbox" :checked="user.state" />
  </td>
 </template>
</my-table>
```

## 二十八、自定义指令

### 1.什么是自定义指令

> vue 官方提供了 v-for、v-model、v-if 等常用的内置指令。除此之外 vue 还允许开发者自定义指令。
>
> vue 中的自定义指令分为两类，分别是：
>
> - 私有自定义指令
> - 全局自定义指令

### 2.声明私有自定义指令的语法

> 在每个 vue 组件中，可以在 directives 节点下声明私有自定义指令：

```js
directives: {
 // 自定义私有指令
 focus: {
        // 当被绑定的元素插入到 DOM 中时，自动触发 mounted 函数
  mounted(el) {
            // 被绑定的元素自动获取焦点
   el.focus()
  },
 },
},
```

### 3.使用自定义指令

> 在使用自定义指令时，需要加上v-前缀：

```vue
<input v-focus />
```

### 4.声明全局自定义指令

> 全局共享的自定义指令需要通过“单页面应用程序的实例对象”进行声明：

```js
app.directive('focus', {
  mounted(el) {
    console.log('mounted')
    el.focus()
  },
})
```

### 5.updeated 函数

> mounted 函数只在元素第一次插入 DOM 时被调用，当 DOM 更新时 mounted 函数不会被触发。 updated 函数会在每次 DOM 更新完成后被调用。示例代码如下：

```js
app.directive('focus', {
  // 第一次插入 DOM 时触发这个函数
  mounted(el) {
    console.log('mounted')
    el.focus()
  },
  // 每次 DOM 更新时都会触发 updated 函数
  updated(el) {
    console.log('updated')
    el.focus()
  },
})
```

> 注意：在 ==vue2== 的项目中使用自定义指令时，【 mounted -> ==bind== 】【 updated -> ==update== 】

### 6.函数简写

> 如果 mounted 和updated 函数中的逻辑完全相同，则可以简写成如下格式：

```js
app.directive('focus', (el) => {
  // 在 mounted 和 updated 时都会触发相同的业务处理
  el.focus()
})
```

### 7.指令的参数值

> 在绑定指令时，可以通过“==等号==”的形式为指令绑定==具体的参数值==：

```vue
<!-- 在使用 v-color 指令时，可以通过 “等号” 绑定指令的值 -->
<h3 v-color="'red'">MyHome 组件 --- {{ count }}</h3>

<input type="text" class="form-control" v-focus v-color="'cyan'" />

<!-- 自定义 v-color 指令 -->
app.directive('color', (el, binding) => {
  <!-- binding.value 就是通过 “等号” 为指令绑定的值 -->
  el.style.color = binding.value
})
```

## 二十九、第五个案例——Table 案例

### 1.案例描述

#### 1.1 案例效果

#### 1.2 用到的知识点

> - 组件封装
> - 具名插槽
> - 作用域插槽
> - 自定义指令

#### 1.3 实现步骤

> 1. 搭建项目的基本结构
> 2. 请求商品列表的数据
> 3. 封装 MyTable 组件
> 4. 实现删除功能
> 5. 实现添加标签的功能

### 2.具体实现

#### 2.1 搭建项目基本结构

> 1.初始化项目
>
> ```bash
> 1 初始化项目
> npm init vite-app case-table
> 2 cd 到项目根目录
> cd case-table
> 3 安装项目依赖项
> npm install
> 4 安装 less 依赖包
> npm i less -D
> 5 项目运行
> npm run dev
> ```
>
> 2.梳理项目结构
>
> - 重置 App.vue 根组件的代码结构
> - 删除 components 目录下 HelloWorld.vue 组件
> - 重置 index.css 中的样式
> - 在 main.js 入口文件中导入 bootstrap 样式文件

#### 2.2 请求商品列表数据

> 1.运行如下命令，安装 Ajax 的请求库：
>
> ```bash
> npm i axios -S
> ```
>
> 2.在 main.js 入口模块中导入并全局配置axios：
>
> ```js
> // 1.导入 axios
> import axios from 'axios'
> 
> const app = createApp(App)
> 
> // 2.将 axios 挂载到全局，今后，每个组件中，都可以直接通过this.$http 代替 axios 发起 Ajax 请求
> app.config.globalProperties.$http = axios
> 
> // 3. 配置请求的根路径
> axios.defaults.baseURL = 'https://www.escook.cn'
> // 此网站接口已废弃
> 
> app.mount('#app')
> ```
>
> 3.在 App.vue 组件的 data 中声明 goodslist 商品列表数据：
>
> ```js
> data() {
>  return {
>     // 商品列表数据
>     goodslist:[]
>  }
> }
> ```
>
> 4.在 App.vue 组件的 methods 中声明 getGoodsList 方法，用来从服务器请求商品列表的数据：
>
> ```js
> methods: {
>  // 初始化商品列表数据
>  async getGoodsList() {
>   // 发起 Ajax 请求
>   const { data: res } = await this.$http.get('/api/goods')
>   // 请求失败
>   if (res.status !== 0) return console.log('获取商品列表失败！')
>   // 请求成功
>   this.goodslist = res.data
>  }
> }
> ```
>
> 5.在 App.vue 组件中，声明 created 生命周期函数，并调用 getGoodsList 方法：
>
> ```js
> created() {
>  this.getGoodsList()
> }
> ```

#### 2.3 封装 MyTable 组件

> ==封装要求==：
>
> 1.用户通过名为 data 的 prop 属性，为 MyTable.vue 组件指定数据源
>
> 2.在 MyTable.vue 组件中，预留名称为 header 的具名插槽
>
> 3.在 MyTable.vue 组件中，预留名称为 body 的作用域插槽

> 1.创建并使用 MyTable 组件
>
> 1. 在 components/my-table 目录下新建 MyTable.vue 组件
> 2. 在 App.vue 组件中导入并注册 MyTable.vue 组件
> 3. 在 App.vue 组件的 DOM 结构中使用 MyTable.vue 组件

> 2.为表格声明 data 数据源
>
> 2.1 在 MyTable.vue 组件的 props 节点中声明表格的 data 数据源
>
> ```vue
> <script>
> export default {
>  name: 'MyTable',
>  props: {
>      // 表格的数据源
>      data: {
>          type: Array,
>          required: true,
>          default: [],
>      }
>  },
> }
> </script>
> ```
>
> 2.2 在 App.vue 组件中使用 MyTable.vue 组件时，通过属性绑定的形式为表格指定 data 数据源
>
> ```vue
> <!-- 使用表格组件 -->
> <my-table :data="goodslist"></my-table>
> ```

> 3.封装 MyTable 组件的模板结构
>
> 3.1 基于 bootstrap 提供的 Tables( <https://v4.bootcss.com/docs/content/tables/> )，在 MyTable.vue 组件中渲染最基本的模板结构：
>
> ```vue
> <template>
>  <table class="table table-bordered table-striped">
>      <!-- 表格的标题区域 -->
>      <thead>
>          <tr>
>              <th>#</th>
>              <th>商品名称</th>
>              <th>价格</th>
>              <th>标签</th>
>              <th>操作</th>
>          </tr>
>      </thead>
>      <!-- 表格的主体区域 -->
>      <tbody></tbody>
>  </table>
> </template>
> ```
>
> 3.2 为了提高组件的复用性，最好把表格的 标题区域 预留为 slot **具名插槽**，方便使用者自定义表格的标题：
>
> ```vue
> <template>
>  <table class="table table-bordered table-striped">
>      <!-- 表格的标题区域 -->
>      <thead>
>          <tr>
>              <!-- 命名插槽 -->
>              <slot name="header"></slot>
>          </tr>
>      </thead>
>      <!-- 表格的主体区域 -->
>      <tbody></tbody>
>  </table>
> </template>
> ```
>
> 3.3 在 App.vue 组件中，通过**具名插槽**的形式，为 MyTable.vue 组件指定标题名称：
>
> ```vue
> <!-- 使用表格组件 -->
> <my-table :data="goodslist">
>  <!-- 表格的标题 -->
>  <template #header>
>   <th>#</th>
>   <th>商品名称</th>
>   <th>价格</th>
>   <th>标签</th>
>   <th>操作</th>
>  </template>
> </my-table>
> ```

> 4.预留名称为 body 的作用域插槽
>
> 4.1 在 MyTable.vue 组件中，通过 v-for 指令循环渲染表格的数据行：
>
> ```vue
> <template>
>  <table class="table table-bordered table-striped">
>      <!-- 表格的标题区域 -->
>      <thead>
>          <tr>
>              <!-- 命名插槽 -->
>              <slot name="header"></slot>
>          </tr>
>      </thead>
>      <!-- 表格的主体区域 -->
>      <tbody>
>          <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
>          <tr v-for="(item, i) in data" :key="item.id"></tr>
>      </tbody>
>  </table>
> </template>
> ```
>
> 4.2 为了提高 MyTable.vue 组件的复用性，最好把表格数据行里面的 td 单元格预留为 slot 具名插槽：
>
> ```vue
> <template>
>  <table class="table table-bordered table-striped">
>      <!-- 表格的标题区域 -->
>      <thead>
>          <tr>
>              <!-- 命名插槽 -->
>              <slot name="header"></slot>
>          </tr>
>      </thead>
>      <!-- 表格的主体区域 -->
>      <tbody>
>          <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
>          <tr v-for="(item, i) in data" :key="item.id">
>              <!-- 为数据行的 td 预留的插槽 -->
>              <slot name="body"></slot>
>          </tr>
>      </tbody>
>  </table>
> </template>
> ```
>
> 4.3 为了让组件的使用者在提供 body 插槽的内容时，能够自定义内容的渲染方式，需要把 body **具名插槽**升级为 作用域插槽 ：
>
> ```vue
> <template>
>  <table class="table table-bordered table-striped">
>      <!-- 表格的标题区域 -->
>      <thead>
>          <tr>
>              <!-- 命名插槽 -->
>              <slot name="header"></slot>
>          </tr>
>      </thead>
>      <!-- 表格的主体区域 -->
>      <tbody>
>          <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
>          <tr v-for="(item, i) in data" :key="item.id">
>              <!-- 为数据行的 td 预留的 "作用域插槽" -->
>              <slot name="body" :row="item" :index="index"></slot>
>          </tr>
>      </tbody>
>  </table>
> </template>
> ```
>
> 4.4 在 App.vue 组件中，基于**作用域插槽**的方式渲染表格的数据：
>
> ```vue
>  <!-- 使用表格组件 -->
>  <my-table :data="goodslist">
>   <!-- 表格的标题 -->
>   <template #header>
>    <th>#</th>
>    <th>商品名称</th>
>    <th>价格</th>
>    <th>标签</th>
>    <th>操作</th>
>   </template>
> 
>   <template #body="{ row, index }">
>    <td>{{ index + 1 }}</td>
>    <td>{{ row.goods_name }}</td>
>    <td>￥{{ row.goods_price }}</td>
>    <td>{{ row.tags }}</td>
>    <td>
>     <button type="button" class="btn btn-danger btn-sm">删除</button>
>    </td>
>   </template>
>  </my-table>
> ```

#### 2.4 实现删除功能

> 1.为删除按钮绑定 click 事件处理函数：
>
> ```vue
> <button type="button" class="btn btn-danger btn-sm" @click="onRemove(row.id)">删除</button>
> ```
>
> 2.在 App.vue 组件的 methods 中声明事件处理函数如下：
>
> ```js
> methods: {
>  // 根据 id 删除商品信息
>  onRemove(id) {
>   this.goodslist = this.goodslist.filter(x => x.id !== id)
>  },
> },
> ```

#### 2.5 实现添加标签功能

> 1.自定义渲染标签列
>
> 根据 bootstrap 提供的 Badge ( <https://v4.bootcss.com/docs/components/badge/#contextual-variations> )效果，**循环渲染**商品的标签信息如下：
>
> ```vue
> <td>
>  <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{ item }}</span></td>
> ```

> 2.实现 input 和 button 的按需展示
>
> 2.1 使用 v-if 结合 v-else 指令，控制 input 和 button 的按需展示：
>
> ```vue
> <td>
>  <!-- 基于当前行的 inputVisible，来控制 input 和 button 的按需展示-->
>  <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible">
>  <button type="button" class="btn btn-primary btn-sm" v-else>+Tag</button>
>  <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{ item }}</span>
> </td>
> ```
>
> 2.2 点击按钮，控制 input 和 button 的切换：
>
> ```vue
> <td>
>  <!-- 基于当前行的 inputVisible，来控制 input 和 button 的按需展示-->
>  <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible">
>  <button type="button" class="btn btn-primary btn-sm" @click="row.inputVisible = true" v-else>+Tag</button>
>  <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{ item }}</span>
> </td>
> ```

> 3.让 input 自动获取焦点
>
> 3.1 在 App.vue 组件中，通过 directives 节点自定义 v-focus 指令如下：
>
> ```js
> directives: {
>  // 封装自动获得焦点的指令
>  focus(el) {
>   el.focus()
>  },
> },
> ```
>
> 3.2 为 input 输入框应用 v-focus 指令：
>
> ```vue
> <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" v-focus>
> ```

> 4.文本框失去焦点自动隐藏
>
> 4.1 使用 v-model 指令把 input 输入框的值双向绑定到 row.inputValue 中：
>
> ```vue
> <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" v-focus
> v-model.trim="row.inputValue">
> ```
>
> 4.2 监听文本框的 blur 事件，在触发其事件处理函数时，把 当前行的数据 传递进去：
>
> ```vue
> <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" v-focus v-model.trim="row.inputValue" @blur="onInputConfirm(row)">
> ```
>
> 4.3 在 App.vue 组件的 methods 节点下声明 onInputConfirm 事件处理函数：
>
> ```js
> onInputConfirm(row) {
>  // 1. 把用户在文本框中输入的值，预先转存到常量 val 中
>  const val = row.inputValue
>  // 2. 清空文本框的值
>  row.inputValue = ''
>  // 3. 隐藏文本框
>  row.inputVisible = false
> }
> ```

> 5.为商品添加新的 tag 标签
>
> 进一步修改 onInputConfirm 事件处理函数如下：
>
> ```js
> onInputConfirm(row) {
>  // 1. 把用户在文本框中输入的值，预先转存到常量 val 中
>  const val = row.inputValue
>  // 2. 清空文本框的值
>  row.inputValue = ''
>  // 3. 隐藏文本框
>  row.inputVisible = false
> 
>  // 1.1 判断 val 的值是否为空，如果为空，则不进行添加
>  // 1.2 判断 val 的值是否已存在于 tags 数组中，防止重复添加
>  if (!val || row.tags.indexOf(val) !== -1) return
>  // 2. 将用户输入的内容，作为新标签 push 到当前行的 tags 数组中
>  row.tags.push(val)
> }
> ```

> 6.响应文本框的回车按键
>
> 当用户在文本框中敲击了 回车键 的时候，也希望能够把当前输入的内容添加为 tag 标签。此时，可以为文本框绑定 keyup 事件如下：
>
> ```vue
> <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" v-focus v-model.trim="row.inputValue" @blur="onInputConfirm(row)" @keyup.enter="onIputConfirm(row)" >
> ```

> 7.响应文本框的 esc 按键
>
> 当用户在文本框中敲击了 esc 按键的时候，希望能够快速清空文本框的内容。此时，可以为文本框绑定 keyup 事件如下：
>
> ```vue
> <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" v-focus v-model.trim="row.inputValue" @blur="onInputConfirm(row)" @keyup.enter="onIputConfirm(row)" @keyup.esc="row.inputValue = ''">
> ```

### 3.完整代码

> ==App 根组件==
>
> ```vue
> <template>
>  <div>
>   <h1>App 根组件</h1>
>  </div>
>  <hr>
>  <!-- 使用表格组件 -->
>  <my-table :data="goodslist">
>   <!-- 表格的标题 -->
>   <template #header>
>    <th>#</th>
>    <th>商品名称</th>
>    <th>价格</th>
>    <th>标签</th>
>    <th>操作</th>
>   </template>
> 
>   <template #body="{ row, index }">
>    <td>{{ index + 1 }}</td>
>    <td>{{ row.goods_name }}</td>
>    <td>￥{{ row.goods_price }}</td>
>    <td>
>     <!-- 基于当前行的 inputVisible，来控制 input 和 button 的按需展示-->
>     <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" v-focus
>      v-model.trim="row.inputValue" @blur="onInputConfirm(row)" @keyup.enter="onInputConfirm(row)"
>      @keyup.esc="row.inputValue = ''">
>     <button type="button" class="btn btn-primary btn-sm" @click="row.inputVisible = true" v-else>+Tag</button>
>     <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{ item }}</span>
>    </td>
>    <td>
>     <button type="button" class="btn btn-danger btn-sm" @click="onRemove(row.id)">删除</button>
>    </td>
>   </template>
>  </my-table>
> </template>
> 
> <script>
> import MyTable from './components/my-table/MyTable.vue'
> 
> 
> export default {
>  name: 'MyApp',
>  data() {
>   return {
>    goodslist: []
>   }
>  },
>  created() {
>   this.getGoodsList()
>  },
>  methods: {
>   async getGoodsList() {
>    const { data: res } = await this.$http.get('/api/goods')
>    if (res.status !== 0) return console.log('获取商品列表失败！')
>    this.goodslist = res.data
>   },
>   // 根据 id 删除商品信息
>   onRemove(id) {
>    this.goodslist = this.goodslist.filter(x => x.id !== id)
>   },
>   onInputConfirm(row) {
>    // 1. 把用户在文本框中输入的值，预先转存到常量 val 中
>    const val = row.inputValue
>    // 2. 清空文本框的值
>    row.inputValue = ''
>    // 3. 隐藏文本框
>    row.inputVisible = false
> 
>    // 1.1 判断 val 的值是否为空，如果为空，则不进行添加
>    // 1.2 判断 val 的值是否已存在于 tags 数组中，防止重复添加
>    if (!val || row.tags.indexOf(val) !== -1) return
>    // 2. 将用户输入的内容，作为新标签 push 到当前行的 tags 数组中
>    row.tags.push(val)
>   }
>  },
>  directives: {
>   // 封装自动获得焦点的指令
>   focus(el) {
>    el.focus()
>   },
>  },
>  components: {
>   MyTable,
>  }
> }
> </script>
> 
> <style lang="less" scoped></style>
> ```
>
> ==MyTable 子组件==
>
> ```vue
> <template>
>  <table class="table table-bordered table-striped">
>      <!-- 表格的标题区域 -->
>      <thead>
>          <tr>
>              <!-- 命名插槽 -->
>              <slot name="header"></slot>
>          </tr>
>      </thead>
>      <!-- 表格的主体区域 -->
>      <tbody>
>          <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
>          <tr v-for="(item, index) in data" :key="item.id">
>              <!-- 为数据行的 td 预留的 "作用域插槽" -->
>              <slot name="body" :row="item" :index="index"></slot>
>          </tr>
>      </tbody>
>  </table>
> </template>
> 
> <script>
> export default {
>  name: 'MyTable',
>  props: {
>      // 表格的数据源
>      data: {
>          type: Array,
>          required: true,
>          default: [],
>      }
>  },
> }
> </script>
> 
> <style lang="less" scoped></style>
> ```
>
> ==main.js 入口文件==
>
> ```js
> import { createApp } from 'vue'
> import App from './App.vue'
> import './index.css'
> import './assets/css/bootstrap.css'
> import axios from 'axios'
> 
> const app = createApp(App)
> 
> app.config.globalProperties.$http = axios
> 
> axios.defaults.baseURL = 'https://applet-base-api-t.itheima.net'
> 
> app.mount('#app')
> ```

## 三十、vue 组件高级（下）总结

> ① 能够知道如何使用 ref 引用 DOM 和组件实例
>
> - 通过 ref 属性指定引用的名称、使用 this.$refs 访问引用实例
>
> ② 能够知道 $nextTick 的调用时机
>
> - 组件的 DOM 更新之后，才执行 $nextTick 中的回调
>
> ③ 能够说出 keep-alive 元素的作用
>
> - 保持动态组件的状态
>
> ④ 能够掌握插槽的基本用法
>
> - slot 标签、具名插槽、作用域插槽、v-slot: 简写为 #
>
> ⑤ 能够知道如何自定义指令
>
> - 私有自定义指令、全局自定义指令
