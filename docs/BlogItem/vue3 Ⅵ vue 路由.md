---
title: vue3 Ⅵ vue 路由
date: 2023-04-26
author: liuwy
categories:
 - 技术
tags:
 - Javascript
 - Vue
---

|                       目标                       |               目录               |
| :----------------------------------------------: | :------------------------------: |
|            前端路由的工作方式以及原理            |   三十一、前端路由的概念与原理   |
|            vue-router 4.x 的基本使用             |  三十二、vue-router 的基本用法   |
| 重定向、高亮、嵌套、动态、编程式导航、命名、守卫 |  三十三、vue-router 的高级用法   |
|              巩固 vue-router 的使用              | 三十四、第六个案例——后台管理案例 |
|                    概括与总结                    |         三十五、路由总结         |

## 三十一、前端路由的概念与原理

### 1.什么是路由

> 路由（英文：router）就是==对应关系==。路由分为两大类：
>
> - 后端路由
> - 前端路由

### 2.回顾：后端路由

> 后端路由指的是：请求方式、请求地址与 function 处理函数之间的对应关系。在 node.js 课程中，express 路由的基本用法如下：

### 3.SPA 与前端路由

> SPA 指的是一个 web 网站只有唯一的一个 HTML 页面，==所有组件的展示与切换==都在这唯一的一个页面内完成。此时，==不同组件之间的切换==需要通过==前端路由==来实现。
>
> 结论：在 SPA 项目中，==不同功能之间的切换==，要==依赖于前端路由==来完成！

### 4.什么是前端路由

> 通俗易懂的概念：==Hash 地址==与==组件==之间的==对应关系==。

### 5.前端路由的工作方式

> ① 用户==点击了==页面上的==路由链接==
>
> ② 导致了 ==URL 地址栏==中的 ==Hash 值==发生了变化
>
> ③ ==前端路由监听了到 Hash 地址的变化==
>
> ④ 前端路由把当前 ==Hash 地址对应的组件==渲染都浏览器中
>

>
> 结论：前端路由，指的是 ==Hash 地址==与==组件==之间的==对应关系==！

### 6.实现简易的前端路由

> 6.1 ==导入并注册== MyHome、MyMovie、MyAbout 三个组件：

```vue
<script>
import MyHome from './MyHome.vue'
import MyMovie from './MyMovie.vue'
import MyAbout from './MyAbout.vue'

export default {
  name: 'MyApp',
  components: {
    MyHome,
    MyMovie,
    MyAbout,
  },
}
</script>
```

> 6.2 通过 component 标签的 ==is 属性==，动态切换要显示的组件：

```vue
<template>
  <div>
    <h1>App 根组件</h1>
    <component :is="comName"></component>
  </div>
</template>

<script>
import MyHome from './MyHome.vue'
import MyMovie from './MyMovie.vue'
import MyAbout from './MyAbout.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      comName: 'MyHome',
    }
  },
}
</script>
```

> 6.3 在组件的结构中声明如下 3 个 a 链接，通过点击不同的 a 链接，切换浏览器地址栏中的 Hash 值：

```vue
<a href="#/home">Home</a>&nbsp; 
<a href="#/movie">Movie</a>&nbsp; 
<a href="#/about">About</a>&nbsp;
```

> 6.4 在 created 生命周期函数中监听浏览器地址栏中 Hash 地址的变化，动态切换要展示的组件的名称：

```js
created() {
    // 监听 hash 值变化的事件
    window.onhashchange = () => {
        // 通过 location.hash 获取到最新的 hash 值，并进行匹配
        switch (location.hash) {
            case '#/home':
            this.comName = 'MyHome'
            break
            case '#/movie':
            this.comName = 'MyMovie'
            break
            case '#/about':
            this.comName = 'MyAbout'
            break
        }
    }
},
```

## 三十二、vue-router 的基本用法

### 1.什么是 vue-router

> ==vue-router== 是 vue.js 官方给出的==路由解决方案==。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目中组件的切换。

### 2.vue-router 的版本

> vue-router 目前有 ==3.x== 的版本和 ==4.x== 的版本。其中：
>
> - vue-router 3.x 只能结合 ==vue2== 进行使用
> - vue-router 4.x 只能结合 ==vue3== 进行使用
>
> vue-router 3.x 的官方文档地址：<https://router.vuejs.org/zh/>
>
> vue-router 4.x 的官方文档地址：<https://next.router.vuejs.org/>

### 3.vue-router 4.x 的基本使用步骤

> ① 在项目中安装 vue-router
>
> ② 定义路由组件
>
> ③ 声明路由链接和占位符
>
> ④ 创建路由模块
>
> ⑤ 导入并挂载路由模块

#### 3.1 在项目中安装 vue-router

> 在 vue3 的项目中，只能安装并使用 vue-router 4.x

```bash
npm install vue-router@next -S
```

#### 3.2 定义路由组件

> 在项目中定义 MyHome.vue、MyMovie.vue、MyAbout.vue 三个组件，将来要使用 vue-router 来控制它们的展示与切换。

#### 3.3 声明路由链接和占位符

> 可以使用 router-link 标签来声明路由链接，并使用 router-view 标签来声明路由占位符：

```vue
<template>
  <div>
    <h1>vue-router 的基本使用</h1>
    <!-- 声明路由链接 -->
    <router-link to="/home">首页</router-link>&nbsp;
    <router-link to="/movie">电影</router-link>&nbsp;
    <router-link to="/about">关于</router-link>
    <hr />

    <!-- 路由的占位符 -->
    <router-view></router-view>
  </div>
</template>
```

#### 3.4 创建路由模块

> 在项目中==创建 router.js== 路由模块，在其中按照如下 ==4 个步骤==创建并得到路由的实例对象：
>
> ① 从 vue-router 中按需导入两个方法
>
> ② 导入需要使用路由控制的组件
>
> ③ 创建路由实例对象
>
> ④ 向外共享路由实例对象
>
> ⑤ 在 main.js 中导入并挂载路由模块

```js
// 1.从 vue-router 中按需导入两个方法
// createRouter 方法用于创建路由的实例对象
// createWebHashHistory 用于指定路由的工作模式（hash 模式）
import { createRouter, createWebHashHistory } from 'vue-router'
```

```js
// 2.导入组件，这些组件将要以路由的方式，来控制它们的切换
import Home from './MyHome.vue'
import Movie from './MyMovie.vue'
import About from './MyAbout.vue'
```

```js
// 3.创建路由实例对象
const router = createRouter({
  // 3.1 通过 history 属性指定路由的工作模式
  history: createWebHashHistory(),
  // 3.2 通过 routes 数组，声明路由的匹配规则
  routes: [
    // path 是 hash 地址，component 是要展示的组件
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```

```js
// 4.向外共享路由实例对象
// 供其他模块导入并使用
export default router
```

```js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
// 5.导入路由模块
import router from './router'

const app = createApp(App)

// 6.挂载路由模块
// app.use() 方法用来挂载“第三方的插件模块”
app.use(router)

app.mount('#app')
```

## 三十三、vue-router 的高级用法

### 1.路由重定向

> 路由重定向指的是：用户在访问地址 A 的时候，强制用户跳转到地址 C ，从而展示特定的组件页面。通过路由规则的 redirect 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

```js
// 创建路由对象
const router = createRouter({
  // 指定路由的工作模式
  history: createWebHashHistory(),
  // 声明路由的匹配规则
  routes: [
   // 其中，path 表示需要被重定向的“原地址”，redirect 表示将要被重定向到的“新地址”
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```

### 2.路由高亮

> 可以通过如下的两种方式，将==激活的路由链接==进行高亮显示：
>
> ① 使用==默认的==高亮 class 类
>
> ② ==自定义==路由高亮的 class 类

#### 2.1 默认的高亮 class 类

> 被激活的路由链接，默认会应用一个叫做 ==router-link-active== 的类名。开发者可以使用此==类名选择器==，为==激活的路由链接==设置高亮的样式：

```css
/* 在 index.css 全局样式表中，重新设置 router-link-active 的样式 */
.router-link-active {
  background-color: red;
  color: white;
  font-weight: bold;
}
```

#### 2.2 自定义路由的高亮的 class 类

> 在创建路由的实例对象时，开发者可以基于 ==linkActiveClass== 属性，自定义路由链接被激活时所应用的类名：

```js
// 创建路由对象
const router = createRouter({
  // 指定路由的工作模式
  history: createWebHashHistory(),
  // 指定被激活的路由链接，会应用 router-active 这个类名
  // 默认的 router-link-active 类名会被覆盖掉
  // 自定义路由高亮的 class 类
  linkActiveClass: 'active-router',
  // 声明路由的匹配规则
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```

### 3.嵌套路由

> 通过路由实现组件的嵌套展示，叫做嵌套路由。
>
> ① 声明子路由链接和子路由占位符
>
> ② 在父路由规则中，通过 children 属性嵌套声明子路由规则

#### 3.1 声明子路由链接和子路由占位符

> 在 About.vue 组件中，声明 tab1 和 tab2 的子路由链接以及子路由占位符：

```vue
<template>
  <div>
    <h3>MyAbout 组件</h3>

    <!-- 声明子路由链接 -->
    <router-link to="/about/tab1">Tab1</router-link>&nbsp;
    <router-link to="/about/tab2">Tab2</router-link>
    <hr>

    <!-- 声明子路由占位符 -->
    <router-view></router-view>
  </div>
</template>
```

#### 3.2 通 children 属性声明子路由规则

> 在 router.js 路由模块中，导入需要的组件，并使用 children 属性声明子路由规则：

```js
// 创建路由对象
const router = createRouter({
  // 指定路由的工作模式
  history: createWebHashHistory(),
  // 自定义路由高亮的 class 类
  linkActiveClass: 'active-router',
  // 声明路由的匹配规则
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    {
      path: '/about',
      component: About,
      // 嵌套路由的重定向
      redirect: '/about/tab1',
      // 通过 children 属性嵌套声明子级路由规则
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 },
      ],
    },
  ],
})
```

### 4.动态路由匹配

#### 4.1 动态路由的概念

> 动态路由指的是：把 Hash 地址中可变的部分定义为参数项，从而提高路由规则的复用性。在 vue-router 中使用英文的冒号（**:**）来定义路由的参数项：

```js
// 路由中的动态参数以 : 进行声明，冒号后面的是动态参数的名称
{ path: './movie/:id', component: Movie }

// 将以下 3 个路由规则，合并成了一个，提高了路由规则的复用性
{ path: './movie/1', component: Movie }
{ path: './movie/2', component: Movie }
{ path: './movie/3', component: Movie }
```

#### 4.2 $route.params 参数对象

> 通过动态路由匹配的方式渲染出来的组件中，可以使用 $route.params 对象访问到动态匹配的参数值。

```vue
<template>
  <div>
   <!-- $route.params 是路由的"参数对象" -->
    <h3>MyMovie 组件 --- {{ $route.params.id }}</h3>
  </div>
</template>

<script>
export default {
  name: 'MyMovie',
}
</script>
```

#### 4.3 使用 props 接收路由参数

> 为了简化路由参数的获取形式，vue-router 允许在路由规则中开启 props 传参：

```js
// 1.定义路由规则时，声明 props: true 选项
// 即可在 Movie 组件中，以 props 的形式接收到路由规则匹配到的参数项
{ path: '/movie/:mid', component: Movie, props: true },
```

```vue
<template>
  <div>
    <!-- 3.直接使用 props 中接收的路由参数 -->
    <h3>MyMovie 组件 --- {{ id }}</h3>
  </div>
</template>

<script>
export default {
  name: 'MyMovie',
  // 2.使用 props 接收路由匹配规则中匹配到的参数项
  props: ['id'],
}
</script>
```

### 5.编程式导航

> 通过调用 API 实现导航的方式，叫做编程式导航。与之对应的，通过点击链接实现导航的方式，叫做声明式导航。例如：
>
> - 普通网页中点击 a 链接、vue 项目中点击 router-link 都属于声明式导航
> - 普通网页中调用 location.href 跳转到新页面的方式，属于编程式导航

#### 5.1 vue-router 中的编程式导航 API

> vue-router 提供了许多编程式导航的 API，其中最常用的两个 API 分别是：
>
> ① this.$router.push('hash 地址')    跳转到指定 Hash 地址，从而展示对应的组件
>
> ② this.$router.go(数值 n)    实现导航历史的前进、后退

#### 5.2 $router.push

> 调用 this.$router.push() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面：

```vue
<template>
  <div>
    <h3>MyHome 组件</h3>
    <button type="button" class="btn btn-primary" @click="goToMovie(3)">导航到Movie页面</button>
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  methods: {
    goToMovie(id) {
      this.$router.push('/movie/' + id)
    },
  },
}
</script>
```

#### 5.3 $router.go

> 调用 this.$router.go() 方法，可以在浏览历史中进行前进和后退：

```vue
<template>
 <h3>MyMovie --- {{id}}</h3>
 <button @click="goBack">后退</button>
</template>

<script>
export default {
    props: ['id'],
    methods:{
        // 后退到之前的组件页面
        goBack() {
            this.$router.go(-1)
        }
    },
}
</script>
```

### 6.命名路由

> 通过 ==name 属性==为路由规则==定义名称==的方式，叫做==命名路由==：

```js
{
    path: '/movie/:id',
    // 使用 name 属性为当前的路由规则定义一个“名称”
    name: 'mov',
    component: Movie,
    props: true,
}
```

> 注意：命名路由的 ==name 值不能重复==，==必须保证唯一性==！

#### 6.1 使用命名路由实现声明式导航

> 为 router-link 标签动态绑定 to 属性的值，并通过 name 属性指定要跳转到的路由规则。期间还可以用 params 属性指定跳转期间要携带的路由参数：

```vue
<router-link :to="{ name: 'mov', params: { mid: 2 } }">go to movie</router-link>
```

#### 6.2 使用命名路由实现编程式导航

> 调用 push 函数期间指定一个配置对象，name 是要跳转到的路由规则、params 是携带的路由参数：

```vue
<template>
  <div>
    <h3>MyHome 组件</h3>
    <!-- 命名路由声明式导航 -->
    <router-link :to="{ name: 'mov', params: { mid: 2 } }">go to movie</router-link>
    <!-- 命名路由编程式导航 -->
    <button type="button" class="btn btn-primary" @click="goToMovie(1)">go to movie</button>
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  methods: {
    goToMovie(id) {
      this.$router.push({
        name: 'mov',
        params: {
          mid: id,
        },
      })
    },
  },
}
</script>
```

### 7.导航守卫

> 导航守卫可以控制路由的访问权限：

#### 7.1 如何声明全局导航首位

> 全局导航守卫会拦截每个路由规则，从而对每个路由进行访问权限的控制。可以按照如下的方式定义全局导航守卫：

```js
// 声明全局的导航守卫
// 调用路由实例对象的 beforeEach 函数，声明“全局前置守卫”
// fn 必须是一个函数，每次拦截到路由的请求，都会调用 fn 进行处理
// 因此 fn 叫做 “守卫方法”
router.beforeEach( () => {
  console.log('ok')
})
```

#### 7.2 守卫方法的 3 个形参

> 全局导航守卫的守卫方法中接收 3 个形参，格式为：

```js
// 声明全局的导航守卫
router.beforeEach((to, from, next) => {
 // to 目标路由对象
    // from 当前导航正要离开的路由对象
    // next 是一个函数，表示放行
})
```

> 注意：
>
> ① 在守卫方法中如果==不声明 next 形参==，则默认允==许用户访问每一个路由==！
>
> ② 在守卫方法中如果==声明了 next 形参==，则==必须调用 next() 函数==，==否则不允许用户访问任何一个路由==！

#### 7.3 next 函数的 3 中调用方式

> 参考示意图，分析 next 函数的 3 种调用方式最终导致的结果：

> 直接放行：next()
>
> 强制其停留在当前页面：next(false)
>
> 强制其跳转到登录页面：next('/login')

```js
// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/main', component: Main },
    { path: '/login', component: Login },
  ],
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/main') {
    // 证明用户要访问后台主页
    next('/login')
  } else {
    // 访问的不是后台主页
    next()
  }
})
```

#### 7.4 结合 token 控制后台主页的访问权限

```js
// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/main', component: Main },
    { path: '/login', component: Login },
  ],
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
// 1.读取 token
const tokenStr = localStorage.getItem('token')
// 2.想要访问 “后台主页” 且 token 值不存在
  if (to.path === '/main' && !tokenStr) {
   // 3.1 不允许跳转
 // next(false)
 // 3.2 强行跳转到 “登录页面”
    next('/login')
  } else {
    // 3.3 直接放行，允许访问 “后台主页” 
    next()
  }
})
```

## 三十四、第六个案例——后台管理案例

### 1.案例效果

### 2.案例用到的知识点

> - 命名路由
> - 路由重定向
> - 导航守卫
> - 嵌套路由
> - 动态路由匹配
> - 编程式导航

### 3.具体实现

> 1. 安装并配置 vue-router 4.x
>
> 2. 展示 Login.vue 登录组件
>
> 3. 模拟并实现登录功能
>
> 4. 通过路由渲染 Home.vue
>
> 5. 实现退出登录的功能
>
> 6. 全局控制路由的访问权限
>
> 7. 将左侧菜单改造为路由链接
>
> 8. 渲染用户管理页面的数据
>
> 9. 实现跳转到用户详情页的功能
>
> 10. 开启路由的 props 传参
>
> 11. 通过编程式导航实现后退功能

#### 3.1 安装并配置 vue-router 4.x

> 1.运行如下的安装，安装 vue-router ：
>
> ```bash
> npm i vue-router@next -S
> ```
>
> 2.在 src 目录下新建 router.js 路由模块：
>
> ```js
> // 1. 按需导入对应的函数
> import { createRouter, createWebHashHistory } from 'vue-router'
> 
> // 2. 创建路由对象
> const router = createRouter({
>  history: createWebHashHistory(),
>  routes: [],
> })
> 
> // 3. 向外共享路由实例对象
> export default router
> ```
>
> 3.在 main.js 入口文件中导入并挂载路由对象：
>
> ```js
> // 1.导入路由模块
> import router from './router'
> 
> const app = createApp(App)
> 
> // 2.挂载路由对象
> app.use(router)
> 
> app.mount('#app')
> ```

#### 3.2 展示 Login.vue 登录组件

> 1.在 router.js 模块中导入 Login.vue 组件：
>
> ```js
> import Login from './components/MyLogin.vue'
> ```
>
> 2.声明路由规则如下：
>
> ```js
> routes: [
>  // 路由重定向
>  { path: '/', redirect: '/login' },
>  { path: '/login', component: Login },
> ]
> ```
>
> 3.在 App.vue 组件中声明**路由占位符**：
>
> ```vue
> <template>
>  <!-- 路由的占位符 -->
>  <router-view></router-view>
> </template>
> 
> <script>
> export default {
>  name: 'MyApp',
> }
> </script>
> 
> <style lang="less" scoped>
> </style>
> ```

#### 3.3 模拟并实现登录功能

> 1.在 MyLogin.vue 组件中声明如下的 data 数据：
>
> ```js
> data() {
>  return {
>   username: '',
>   password: '',
>  }
> }
> ```
>
> 2.为**用户名**和**密码**的文本框进行 v-model 双向数据绑定：
>
> ```vue
> <!-- 登录名称 -->
> <div class="form-group form-inline">
>  <label for="username">登录名称</label>
>  <input type="text" class="form-control ml-2" id="username" placeholder="请输入登录名称" autocomplete="off" v-model="username">
> </div>
> 
> <!-- 登录密码 -->
> <div class="form-group form-inline">
>  <label for="password">登录密码</label>
>  <input type="password" class="form-control ml-2" id="password" placeholder="请输入登录密码" v-model="password">
> </div>
> ```
>
> 3.为 **登录按钮** 绑定点击事件处理函数：
>
> ```vue
> <button type="button" class="btn btn-primary" @click="onLoginClick">登录</button>
> ```
>
> 4.在 methods 中声明 onLoginClick 事件处理函数如下：
>
> ```js
> methods: {
>  onLoginClick() {
>      // 判断用户名和密码是否正确
>      if (this.username === 'admin' && this.password === '123456') {
>          // 登录成功，跳转到后台主页
>          this.$router.push('/home')
>          // 模拟存储 Token 的操作
>          return localStorage.setItem('token', 'Bearer xxx')
>      }
>      // 登录失败，清除 Token
>      localStorage.removeItem('token')
>  },
> },
> ```

#### 3.4 通过路由渲染 Home.vue

> 1.在 router.js 中导入 Home.vue 组件：
>
> ```js
> import Home from './components/MyHome.vue'
> ```
>
> 2.在 routes 路由规则的数组中，声明对应的路由规则：
>
> ```js
> routes: [
>  { path: '/', redirect: '/login' },
>  { path: '/login', component: Login },
>  // Home 组件的路由规则
>  { path: '/home', component: Home },
> ]
> ```
>
> 3.渲染 Home.vue 组件的基本结构：
>
> ```vue
> <template>
>  <div class="home-container">
>   <!-- 头部组件 -->
>   <my-header></my-header>
>   <!-- 主体区域 -->
>   <div class="home-main-box">
>          <!-- 左侧边栏区域 -->
>          <my-aside></my-aside>
>          <!-- 右侧内容主体区域 -->
>          <div class="home-main-body"></div>
>     </div>
>  </div>
> </template>
> ```

#### 3.5 实现退出登录的功能

> 1.在 MyHeader.vue 组件中，为 退出登录 按钮绑定 click 事件处理函数：
>
> ```vue
> <button type="button" class="btn btn-light" @click="onLogout">退出登录</button>
> ```
>
> 2.在 methods 中声明如下的事件处理函数：
>
> ```js
> methods: {
>  onLogout() {
>      localStorage.removeItem('token')
>      this.$router.push('/login')
>  }
> }
> ```

#### 3.6 全局控制路由的访问权限

> 1.在 router.js 模块中，通过 router 路由实例对象，全局挂载路由导航守卫：
>
> ```js
> // 全局路由导航守卫
> router.beforeEach((to, from, next) => {
>  // 如果用户访问的是登录页面，直接放行
>  if (to.path === '/login') return next()
>  // 获取 Token 值
>  const token = localStorage.getItem('token')
>  if (!token) {
>      // Token 值不存在，强制跳转到登录页面
>      return next('/login')
>  }
>  // 存在 Token 值，直接放行
>  next()
> })
> ```

#### 3.7 将左侧菜单改造为路由链接

> 1.打开 MyAside.vue 组件，把 li 内部的纯文本升级改造为 router-link 组件：
>
> ```vue
> <template>
>  <div class="layout-aside-container">
>      <!-- 左侧边栏列表 -->
>      <ul class="user-select-none menu">
>          <li class="menu-item">
>           <router-link to="/home/users">用户管理</router-link>
>          </li>
>          <li class="menu-item">
>           <router-link to="/home/rights">权限管理</router-link>
>          </li>
>          <li class="menu-item">
>           <router-link to="/home/goods">商品管理</router-link>
>          </li>
>          <li class="menu-item">
>           <router-link to="/home/orders">订单管理</router-link>
>          </li>
>          <li class="menu-item">
>           <router-link to="/home/settings">系统设置</router-link>
>       </li>
>      </ul>
>  </div>
> </template>
> ```
>
> 2.打开 Home.vue 组件，在 **右侧内容主体区域** 中声明子路由的占位符：
>
> ```vue
> <template>
>  <div class="home-container">
>      <!-- 头部组件 -->
>      <my-header></my-header>
>      <!-- 主体区域 -->
>      <div class="home-main-box">
>          <!-- 左侧边栏区域 -->
>          <my-aside></my-aside>
>          <!-- 右侧内容主体区域 -->
>          <div class="home-main-body">
>              <!-- **子路由的占位符** -->
>              <router-view></router-view>
>          </div>
>      </div>
>  </div>
> </template>
> ```
>
> 3.在 router.js 中导入左侧菜单对应的组件：
>
> ```js
> import Users from './components/menus/MyUsers.vue'
> import Rights from './components/menus/MyRights.vue'
> import Goods from './components/menus/MyGoods.vue'
> import Orders from './components/menus/MyOrders.vue'
> import Settings from './components/menus/MySettings.vue'
> ```
>
> 4.通过 children 属性，为 home 规则定义子路由规则如下：
>
> ```js
> {
>  path: '/home',
>  component: Home,
>  // 用户访问 /home 时，重定向到 /home/users
>  redirect: '/home/users',
>  // 子路由规则
>  children: [
>      { path: 'users', component: Users },
>      { path: 'rights', component: Rights },
>      { path: 'goods', component: Goods },
>      { path: 'orders', component: Orders },
>      { path: 'settings', component: Settings },
>  ],
> },
> ```

#### 3.8 渲染用户管理页面的数据

> 1.在 MyUsers.vue 组件中，通过 v-for 指令循环渲染用户列表的数据：
>
> ```vue
> <tbody>
>  <tr v-for="(item, i) in userlist" :key="item.id">
>      <td>{{ i + 1 }}</td>
>      <td>{{ item.name }}</td>
>      <td>{{ item.age }}</td>
>      <td>{{ item.position }}</td>
>      <td>详情</td>
>  </tr>
> </tbody>
> ```

#### 3.9 实现跳转到用户详细页的功能

> 1.在 MyUsers.vue 组件中，渲染详情页的**路由链接**如下：
>
> ```vue
> <td>
>  <router-link :to="'/home/users/' + item.id">详情</router-link>
> </td>
> ```
>
> 2.在 router.js 中导入**用户详情页**组件：
>
> ```js
> import UserDetail from './components/user/MyUserDetail.vue'
> ```
>
> 3.在 home 规则的 children 节点下，声明 **用户详情页** 的路由规则：
>
> ```js
> {
>  path: '/home',
>  component: Home,
>  redirect: '/home/users',
>  children: [
>      { path: 'users', component: Users },
>      { path: 'rights', component: Rights },
>      { path: 'goods', component: Goods },
>      { path: 'orders', component: Orders },
>      { path: 'settings', component: Settings },
>      // 用户详情页的路由规则
>      { path: 'users/:id', component: UserDetail },
>  ],
> },
> ```

#### 3.10 开启路由的 props 传参

> 1.在 router.js 模块中，为 **用户详情页** 的路由规则开启 props 传参：
>
> ```js
> { path: 'users/:id', component: UserDetail, props: true },
> ```
>
> 2.在 MyUserDetail.vue 组件中声明 props 参数：
>
> ```js
> export default {
>  name: 'MyUserDetail',
>  props: ['id'],
> }
> ```
>
> 3.在 MyUserDetail.vue 组件的结构中直接使用路由参数：
>
> ```vue
> <template>
>  <button type="button" class="btn btn-light btn-sm">后退</button>
>  <h4 class="text-center">用户详情 --- {{id}}</h4>
> </template>
> ```

#### 3.11 通过编程式导航实现后退功能

> 1.在 MyUserDetail.vue 组件中，为**后退按钮**绑定点击事件处理函数：
>
> ```vue
> <template>
>  <button type="button" class="btn btn-light btn-sm" @click="goBack">后退</button>
>  <h4 class="text-center">用户详情 --- {{id}}</h4>
> </template>
> ```
>
> 2.在 methods 中声明 goBack 事件处理函数如下：
>
> ```js
> export default {
>  name: 'MyUserDetail',
>  props: ['id'],
>  methods: {
>      // 编程式导航实现后退功能
>      goBack() {
>          this.$router.go(-1)
>      },
>  },
> }
> ```

## 三十五、路由总结

> ① 能够知道如何在 vue 中配置路由
>
> - createRouter、app.use(router)
>
> ② 能够知道如何使用嵌套路由
>
> - 通过 children 属性进行路由嵌套、子路由的 hash 地址不要以 / 开头
>
> ③ 能够知道如何实现动态路由匹配
>
> - 使用冒号声明参数项、this.$route.params、props: true
>
> ④ 能够知道如何使用编程式导航
>
> - this.$router.push、this.$router.go(-1)
>
> ⑤ 能够知道如何使用全局导航守卫
>
> - 路由实例.beforeEach((to, from, next) => { })
