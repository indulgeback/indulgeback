---
title: vue3 Ⅳ vue 组件高级（上）
date: 2023-04-22
author: liuwy
categories:
 - 技术
tags:
 - Javascript
 - Vue
---

|                   目标                    |               目录               |
| :---------------------------------------: | :------------------------------: |
|    监视数据的变化，从而做出对应的操作     |        十九、watch 侦听器        |
|        在最合适的周期，做最对的事         |       二十、组件的生命周期       |
| 组件之间如何进行数据共享，没有详细的 vuex |    二十一、组件之间的数据共享    |
|         vue 3.x 中全局配置 axios          | 二十二、vue 3.x 中全局配置 axios |
|           对以上内容的复习巩固            |  二十三、第四个案例——购物车案例  |
|                总结与概括                 |  二十四、vue组件高级（上）总结   |

## 十九、watch 侦听器

### 1.什么是 watch 侦听器

> ==watch 侦听器==允许开发者监视数据的变化，从而==针对数据的变化做特定的操作==。例如，监视用户名的变化并发起请求，判断用户名是否可用。

### 2.watch 侦听器的基本语法

> 开发者需要==在 watch 节点==下，定义自己的侦听器：
>

### 3.使用 watch 检测用户名是否可用

> 监听 username 值的变化，并使用 axios 发起 Ajax 请求，==检测当前输入的用户名是否可用==：
>

### 4.immediate 选项

> 默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器==立即被调用==，则需要使用 ==immediate== 选项：
>

### 5.deep 选项

> 当 ==watch 侦听的是一个对象==，如果==对象中的属性值发生了变化==，则==无法被监听到==。此时需要使用 ==deep 选项==：
>

### 6.监听对象单个属性的变化

> 如果==只想监听对象中单个属性的变化==，则可以按照如下的方式定义 watch 侦听器：
>

### 7.计算属性 vs 侦听器

> 计算属性和侦听器==侧重的应用场景不同==：
>
> 计算属性侧重于监听==多个值==的变化，最终计算并==返回一个新值==
>
> 侦听器侧重于监听==单个数据==的变化，最终==执行特定的业务处理，不需要有任何返回值==

## 二十、组件的生命周期

### 1.组件的运行过程

> ==组件的生命周期==指的是：组件从==创建== -> ==运行==（渲染） -> ==销毁==的整个过程，强调的是一个==时间段==。

### 2.如何监听组件的不同时刻

> ==vue 框架==为组件==内置了==不同时刻的==生命周期函数==，生命周期函数会==伴随着==组件的运行而==自动调用==。例如：
>
> ① 当组件==在内存中被创建完毕==之后，会自动调用 ==created== 函数
>
> ② 当组件被成功的==渲染到页面上==之后，会自动调用 ==mounted== 函数
>
> ③ 当组件==被销毁完毕==之后，会自动调用 ==unmounted== 函数

### 3.如何监听组件的更新

> 当组件的 ==data 数据更新==之后，vue 会自==动重新渲染组件==的 DOM 结构，从而保证 ==View 视图==展示的数据和 ==Model 数据源== 保持一致。
>
> 当组件被==重新渲染完毕==之后，会自动调用 ==updated== 生命周期函数。

### 4.组件中主要的生命周期函数

> 注意：在实际开发中，==created== 是==最常用的==生命周期函数！

### 5.组件中全部的生命周期函数

### 6.完整的生命周期图示

> 可以参考 vue 官方文档给出的“生命周期图示”，进一步理解组件生命周期执行的过程：
>
> <https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram>

## 二十一、组件之间的数据共享

### 1.组件之间的关系

> 在项目开发中，组件之间的关系分为如下 3 种：
>
> ① 父子关系
>
> ② 兄弟关系
>
> ③ 后代关系

### 2.父子组件之间的数据共享

> 父子组件之间的数据共享又分为：
>
> ① 父 -> 子共享数据
>
> ② 子 -> 父共享数据
>
> ③ 父 <-> 子双向数据同步

#### 2.1 父组件向子组件共享数据

> 父组件通过 v-bind 属性绑定向子组件共享数据。同时，子组件需要使用 props 接收数据：
>

#### 2.2 子组件向父组件共享数据

> 子组件通过自定义事件的方式向父组件共享数据：
>

#### 2.3 父子组件之间数据的双向同步

> 父组件在使用子组件期间，可以使用 ==v-model== 指令维护组件内外数据的双向同步：
>

### 3.兄弟组件之间的数据共享

> ==兄弟组件之间==实现数据共享的方案是 ==EventBus==。可以借助于第三方的包 ==mitt== 来创建 ==eventBus 对象==，从而实现兄弟组件之间的数据共享：
>

#### 3.1 安装 mitt 依赖包

```bash
npm i mitt
```

#### 3.2 创建公共的 EventBus 模块

> 在项目中创建公共的 ==eventBus== 模块：

```js
// 创建 eventBus.js 文件

// 导入 mitt 包
import mitt from 'mitt'

// 创建 EventBus 的实例对象
const bus = mitt()

// 将 EventBus 的实例对象共享出去
export default bus
```

#### 3.3 在数据接收方自定义事件

> 在数据接收方，调用 bus.on('事件名称', 事件处理函数) 方法==注册一个自定义事件==：
>
> ```vue
> <script>
> // 导入 eventBus.js 模块，得到共享的 bus 对象
> import bus from './eventBus.js'
> 
> export default {
> name: 'MyRight',
> data() {
>  return {
>    num: 0,
>  }
> },
> created() {
>  // 调用 bus.on() 方法注册一个自定义事件，通过事件处理函数的形参接收数据
>  bus.on('countChange', count => {
>    this.num = count
>  })
> },
> }
> </script>
> ```

#### 3.4 在数据接发送方触发事件

> 在数据发送方，调用 ==bus.emit==('事件名称', 要发送的数据) 方法==触发自定义事件==：
>
> ```vue
> <script>
> // 导入 eventBus.js 模块，得到共享的 bus 对象
> import bus from './eventBus.js'
> 
> export default {
> name: 'MyLeft',
> data() {
>  return {
>    count: 0,
>  }
> },
> methods: {
>  add() {
>    this.count++
>    // 调用 bus.emit() 方法触发自定义事件，并发送数据
>    bus.emit('countChange', this.count)
>  },
> },
> }
> </script>
> ```

### 4.后代关系组件之间的数据共享

> 后代关系组件之间共享数据，指的是==父节点的组件==向其==子孙组件==共享数据。此时组件之间的嵌套关系比较复杂，可以使用 ==provide== 和 ==inject== 实现后代关系组件之间的数据共享。

#### 4.1 父节点通过 provide 共享数据

> 父节点的组件可以通过 ==provide== 方法，对其==子孙组件==共享数据：
>

#### 4.2 子孙节点通过 inject 接收数据

> 子孙节点可以使用 ==inject== 数组，接收父级节点==向下共享的数据==。示例代码如下：
>

#### 4.3 父节点对外共享响应式数据

> 父节点使用 provide 向下共享数据时，可以结合 ==computed 函数==向下共享==响应式的数据==：
>

#### 4.4 子孙节点使用响应式数据

> 如果父级节点共享的是==响应式的数据==，则子孙节点必须以 ==.value== 的形式进行使用：
>

### 5.vuex

> vuex 是==终极==的组件之间的数据共享方案。在企业级的 vue 项目开发中，vuex 可以让组件之间的数据共享变得==高效==、==清晰==、且==易于维护==。
>

### 6.总结

> ==父子关系==
>
> ① 父 -> 子 属性绑定
>
> ② 子 -> 父 事件绑定
>
> ③ 父 <-> 子 组件上的 v-model
>
> ==兄弟关系==
>
> ④ EventBus
>
> ==后代关系==
>
> ⑤ provide & inject
>
> ==全局数据共享==
>
> ⑥ vuex

## 二十二、vue 3.x 中全局配置 axios

### 1.为什么要全局配置 axios

> 在实际项目开发中，几乎每个组件中都会用到 axios 发起数据请求。此时会遇到如下两个问题：
>
> ① 每个组件中都需要导入 axios（代码臃肿）
>
> ② 每次发请求都需要填写完整的请求路径（不利于后期的维护）
>

### 2.如何全局配置 axios

> 在 main.js 入口文件中，通过 app.config.globalProperties 全局挂载 axios：
>

### 3.使用 axios

```js
// npm 安装 axios 包
npm i axios -S
// -S 表示项目运行期间仍需使用的包
// -D 表示项目开发期间需要使用的包


// main.js 配置文件中
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/css/bootstrap.css'

// 导入 axios
import axios from 'axios'

const app = createApp(App)

// 配置请求的根路径
axios.defaults.baseURL = 'http://www.esbook.cn'
// 将 axios 挂载为全局的 $http 自定义属性
app.config.globalProperties.$http = axios

app.mount('#app')


// 使用 axios 发起 Ajax 数据请求
methods: {
 // 请求商品列表的数据
 async getGoodsList() {
     // 1.通过组件实例 this 访问到全局挂载的 $http 属性，并发起 Ajax 数据请求
     const { data: res } = await this.$http.get('/api/cart')
     // 2.判断请求是否成功
     if (res.status !== 200) return alert('请求商品列表数据失败！')
     // 3.将请求到的数据存储到 data 中，供页面渲染期间使用
     this.goodslist = res.list
 }
},
    
// 使用 axios 发起 get 请求传参
    async getBrandList() {
        // 在 vue 的 选项式api 中，通过组件实例 this 访问到全局挂载的 $http 属性，并发起 Ajax 数据请求
        // 在 vue 的 组合式api 中，vue3.0中是没有this的。使用getCurrentInstance来获取上下文
        // const { proxy } = getCurrentInstance() 这里的proxy相当于this
        // 1.通过组件实例 this 访问到全局挂载的 $http 属性，并发起 Ajax 数据请求
      const { data: res } = await this.$http.get('/selectById',{
            params:{
                id: 4,
            }
        })
      // 2.判断请求是否成功
      if (res.status !== 200) return alert('请求商品列表数据失败！')
      // 3.将请求到的数据存储到 data 中，供页面渲染期间使用
      this.goodslist = res.list
    }
```

## 二十三、第四个案例——购物车案例

### 1.案例效果

<img style="zoom:50%;" />

### 2.实现步骤

> ① 初始化项目基本结构
>
> ② 封装 EsHeader 组件
>
> ③ 基于 axios 请求商品列表数据（ GET 请求，地址为 <https://www.escook.cn/api/cart> ）
>
> ④ 封装 EsFooter 组件
>
> ⑤ 封装 EsGoods 组件
>
> ⑥ 封装 EsCounter 组件

### 3.具体实现

#### 3.1 初始化项目结构

> 1.初始化 vite 项目：
>
> ```bash
> npm init vite-app code-cart
> cd code-cart
> npm i
> ```
>
> 2.清理项目结构：
>
> - 把 bootstrap 相关文件放入 src/assets 目录下
> - 在 main.js 中导入 bootstrap.css
> - 清空 App.vue 组件
> - 删除 components 目录下的 HelloWorld.vue 组件
>
> 3.为组件的样式启用 less 语法
>
> ```bash
> npm i less -D
> ```
>
> 4.初始化 index.css 全局样式如下：
>
> ```less
> :root{
>  font-size: 12px;
> }
> ```

#### 3.2 封装 es-header 组件

##### 3.2.1 创建并注册 EsHeader 组件

> 1.在 src/components/es-header/ 目录下新建 EsHeader.vue 组件：
>
> ```vue
> <template>
>  <div>EsHeader 组件</div>
> </template>
> 
> <script>
> export default {
>  name: 'EsHeader',
> }
> </script>
> 
> <style lang="less" scoped></style>
> ```
>
> 2.在 App.vue 组件中导入、注册并在模板结构中使用 EsHeader.vue 组件：
>
> ```vue
> <template>
>  <h1>App 根组件</h1>
>  <hr>
>  <!-- 使用 EsHeader 组件 -->
>  <es-header></es-header>
> </template>
> 
> <script>
> import EsHeader from './components/es-header/EsHeader.vue';
> 
> export default {
>  name: 'MyApp',
>  components: {
>      // 注册 header 组件
>      EsHeader,
>  }
> }
> </script>
> ```

##### 3.2.2 封装 es-header 组件

> ==封装需求==：
>
> - 允许用户自定义 title 标题内容
> - 允许用户自定义 color 文字颜色
> - 允许用户自定义 bgcolor 背景颜色
> - 允许用户自定义 fsize 字体大小
> - es-header 组件必须**固定定位**到页面的顶部位置，高度为 45px，文本居中，z-index 为 999

> 1.在 es-header 组件中封装以下的 props 属性：
>
> ```vue
> <script>
> export default {
>  name: 'EsHeader',
>  props: {
>      title: {
>          // 标题内容
>          type: String,
>          default: 'es-header',
>      },
>      bgcolor: {
>          // 背景颜色
>          type: String,
>          default: '#007bff',
>      },
>      color: {
>          // 文字颜色
>          type: String,
>          default: '#ffffff',
>      },
>      fsize: {
>          // 文字大小
>          type: Number,
>          default: 12,
>      },
>  }，
> }
> </script>
> ```
>
> 2.渲染标题，并动态为 DOM 元素绑定行内的 style 样式对象：
>
> ```vue
> <template>
>  <div class="header-container" :style="{ backgroundColor: bgcolor, color: color, fontSize: fsize + 'px' }">
>      {{ title }}
>  </div>
> </template>
> 
> <style lang="less" scoped>
> .header-container {
>  position: fixed;
>  top: 0;
>  left: 0;
>  width: 100%;
>  height: 45px;
>  text-align: center;
>  line-height: 45px;
>  z-index: 999;
> }
> </style>
> ```
>
> 3.调整 App.vue 根组件的样式，并传入 title 属性：
>
> ```vue
> <template>
>  <div class="app-container">
>      <h1>App 根组件</h1>
>      <hr>
>      <!-- 使用 EsHeader 组件 -->
>      <es-header title="购物车案例"></es-header>
>  </div>
> </template>
> 
> <style lang="less">
> .app-container {
>  padding-top: 45px;
> }
> </style>
> ```

#### 3.3 基于 axios 请求商品列表数据

##### 3.3.1 全局配置 axios

> 1.运行如下的命令安装 axios：
>
> ```bash
> npm i axios -S
> ```
>
> 2.在 main.js 入口文件中导入并全局配置 axios：
>
> ```js
> import { createApp } from 'vue'
> import App from './App.vue'
> import './index.css'
> import './assets/css/bootstrap.css'
> 
> // 导入 axios
> import axios from 'axios'
> 
> const app = createApp(App)
> 
> // 配置请求的根路径
> axios.defaults.baseURL = 'https://applet-base-api-t.itheima.net'
> // 将 axios 挂载为全局的 $http 自定义属性
> app.config.globalProperties.$http = axios
> 
> app.mount('#app')
> ```

##### 3.3.2 请求商品列表数据

> 1.在 App.vue 根组件中声明如下的 data 数据：
>
> ```js
> data() {
>  return {
>      // 商品列表的数据
>      goodslist: [],
>  }
> },
> ```
>
> 2.在 App.vue 根组件的 created 生命周期函数中，**预调用**获取商品列表数据的 methods 方法：
>
> ```js
> // 组件实例创建完毕之后的生命周期函数
> created() {
>  // 调用 methods 中的 getGoodsList 方法，请求商品列表的数据
>  this.getGoodsList()
> },
> ```
>
> 3.在 App.vue 根组件的 methods 节点中，声明刚才预调用的 getGoodsList 方法：
>
> ```js
> methods: {
>  // 请求商品列表的数据
>  async getGoodsList() {
>      // 1.通过组件实例 this 访问到全局挂载的 $http 属性，并发起 Ajax 数据请求
>      const { data: res } = await this.$http.get('/api/cart')
>      // 2.判断请求是否成功
>      if (res.status !== 200) return alert('请求商品列表数据失败！')
>      // 3.将请求到的数据存储到 data 中，供页面渲染期间使用
>      this.goodslist = res.list
>  }
> },
> ```

#### 3.4 封装 es-footer 组件

##### 3.4.1 创建并注册 EsFooter 组件

> 1.在 src/component/es-footer/ 目录下新建 EsFooter.vue 组件：
>
> ```vue
> <template>
>  <div>
>      EsFooter 组件
>  </div>
> </template>
> 
> <script>
> export default {
>  name: 'EsFooter',
> }
> </script>
> 
> <style lang="less" scoped></style>
> ```
>
> 2.在 App.vue 组件中导入并注册 EsFooter.vue 组件：
>
> ```vue
> <template>
> <h1>App 根组件</h1>
> <hr>
> <!-- 使用 EsHeader 组件 -->
> <es-header></es-header>
> <!-- 使用 EsFooter 组件 -->
> <es-footer></es-footer>
> </template>
> 
> <script>
> import EsHeader from './components/es-header/EsHeader.vue';
> import EsFooter from './components/es-footer/EsFooter.vue';
> 
> export default {
> name: 'MyApp',
> components: {
>   // 注册 header 组件
>   EsHeader,
>   // 注册 footer 组件
>   EsFooter,
> }
> }
> </script>
> ```

##### 3.4.2 封装 es-footer 组件

> 封装需求：
>
> 1.es-footer 组件必须固定定位到页面底部的位置，高度为 50px，内容两端贴边对齐，z-index 为 999
>
> 2.允许用户自定义 amount 总价格（单位是元），并在渲染时保留两位小数
>
> 3.允许用户自定义 total 总数量，并渲染到结算按钮中；如果要结算的商品数量为0，则禁用结算按钮
>
> 4.允许用户自定义 isfull 全选按钮的选中状态
>
> 5.允许用户通过自定义事件的形式，监听全选按钮选中状态的变化，并获取到最新的选中状态
>
> ```
> 
> ```

> 1.将 EsFooter.vue 组件在页面底部进行固定定位，基于 bootstrap 渲染左侧全选按钮：
>
> ```vue
> <template>
>  <div class="footer-container">
>      <div class="custom-control custom-checkbox">
>          <input type="checkbox" class="custom-control-input" id="fullCheck">
>          <label class="custom-control-label" for="fullCheck">全选</label>
>      </div>
>  </div>
> </template>
> 
> <script>
> export default {
>  name: 'EsFooter',
> }
> </script>
> 
> <style lang="less" scoped>
> .footer-container {
>  height: 50px;
>  width: 100%;
>  background-color: white;
>  border-top: 1px solid #efefef;
>  position: fixed;
>  bottom: 0;
>  left: 0;
>  display: flex;
>  justify-content: space-between;
>  align-items: center;
>  padding: 0 10px;
> }
> 
> :root {
>  font-size: 12px;
> }
> </style>
> ```
>
> 2.全局样式表更改属性：
>
> ```css
> .custom-control .custom-control-label::before {
>  border-radius: 1.25em;
> }
> ```
>
> 3.渲染合计区域和结算按钮：
>
> ```vue
> <template>
>  <div class="footer-container">
>      <!-- 全选框 -->
>      <div class="custom-control custom-checkbox">
>          <input type="checkbox" class="custom-control-input" id="fullCheck">
>          <label class="custom-control-label" for="fullCheck">全选</label>
>      </div>
> 
>      <!-- 合计部分 -->
>      <div>
>          <span>合计：</span>
>          <span class="amount">￥0.00</span>
>      </div>
> 
>      <!-- 结算按钮 -->
>      <button type="button" class="btn btn-primary btn-settle">结算（0）</button>
>  </div>
> </template>
> 
> <script>
> export default {
>  name: 'EsFooter',
> }
> </script>
> 
> <style lang="less" scoped>
> .footer-container {
>  height: 50px;
>  width: 100%;
>  background-color: white;
>  border-top: 1px solid #efefef;
>  position: fixed;
>  bottom: 0;
>  left: 0;
>  display: flex;
>  justify-content: space-between;
>  align-items: center;
>  padding: 0 10px;
> }
> 
> :root {
>  font-size: 12px;
> }
> 
> .custom-control .custom-control-label::before {
>  border-radius: 1.25em;
> }
> 
> .amount {
>  font-weight: bold;
>  color: red;
> }
> 
> .btn-settle {
>  min-width: 90px;
>  height: 38px;
>  border-radius: 19px;
> }
> </style>
> ```

##### 3.4.3 封装自定义属性 amount

> ==amount 是已勾选商品的总价格==
>
> 1.在 EsFooter.vue 组件的 props 节点中，声明如下自定义属性：
>
> ```vue
> <script>
> export default {
>  name: 'EsFooter',
>  props: {
>      // 已勾选商品的总价格
>      amount: {
>          type: Number,
>          default: 0,
>      },
>  },
> }
> </script>
> ```
>
> 2.在 EsFooter.vue 组件的 DOM 结构中渲染 amount 的值：
>
> ```vue
> <!-- 合计部分 -->
> <div>
>  <span>合计：</span>
>  <!-- 将 amount 的值保留为两位小数 -->
>  <span class="amount">￥{{ amount.toFixed(2) }}</span>
> </div>
> ```

##### 3.4.4 封装自定义属性 total

> ==total是已勾选商品的总数量==
>
> 1.在 EsFooter.vue 组件的 props 节点中，声明如下自定义属性：
>
> ```vue
> <script>
> export default {
>  name: 'EsFooter',
>  props: {
>      // 已勾选商品的总价格
>      amount: {
>          type: Number,
>          default: 0,
>      },
>      // 已勾选商品的总数量
>      total: {
>          type: Number,
>          default: 0,
>      }
>  },
> }
> </script>
> ```
>
> 2.结算按钮动态控制
>
> ```vue
> <!-- disabled 的值为 true，禁用按钮 -->
> <button type="button" class="btn btn-primary btn-settle" :disabled="total === 0">结算({{ total }})</button>
> ```

##### 3.4.5 封装自定义属性 isfull

> isfull 是全选按钮的选中状态，true 表示选中，false 表示未选中
>
> 1.在 EsFooter.vue 组件的 props 节点中，声明如下自定义属性：
>
> ```vue
> <script>
> export default {
>  name: 'EsFooter',
>  props: {
>      // 已勾选商品的总价格
>      amount: {
>          type: Number,
>          default: 0,
>      },
>      // 已勾选商品的总数量
>      total: {
>          type: Number,
>          default: 0,
>      },
>      // 全选按钮的选中状态
>      isFull: {
>          type: Boolean,
>          default: false,
>      }
>  },
> }
> </script>
> ```
>
> 2.动态绑定选中状态
>
> ```vue
> <!-- 全选框 -->
> <div class="custom-control custom-checkbox">
>  <input type="checkbox" class="custom-control-input" id="fullCheck" :checked="isfull">
>  <label class="custom-control-label" for="fullCheck">全选</label>
> </div>
> ```

##### 3.4.6 封装自定义事件 fullChange

> ==通过自定义事件 fullChange，把最新的选中状态传递给组件的使用者==
>
> 1.监听复选框选中状态变化的 change 事件：
>
> ```vue
> <!-- 全选框 -->
> <div class="custom-control custom-checkbox">
>  <input type="checkbox" class="custom-control-input" id="fullCheck" :checked="isfull" @change="onCheckBoxChange">
>  <label class="custom-control-label" for="fullCheck">全选</label>
> </div>
> ```
>
> 2.在 methods 中声明 onCheckBoxChange，并通过事件对象 e 获取到最新的选中状态：
>
> ```js
>  methods: {
>      // 监听复选框选中状态的变化
>      onCheckBoxChange(e) {
>          // e.target.checked 是复选框最新的选中状态
>          this.$emit('fullChange', e.target.checked)
>      }
>  },
> ```
>
> 3.在 emits 中声明自定义事件：
>
> ```js
>  // 声明自定义事件
>  emits: ['fullChange'],
> ```
>
> 4.在 App.vue 根组件中测试 EsFooter.vue 组件：
>
> ```vue
>     <!-- 使用 EsFooter 组件 -->
>      <es-footer :total="0" :amount="0" @fullChange="onFullStateChange"></es-footer>
> ```
>
> 5.在methods 中声明 onFullStateChange 处理函数，通过形参获取到全选按钮最新的选中状态：
>
> ```json
>  methods: {
>      // 监听选中状态变化的事件
>      onFullStateChange(isfull) {
>          console.log(isfull)
>      }
>  },
> ```

#### 3.5 封装 es-goods 组件

##### 3.5.1 创建并注册 EsGoods 组件

```vue
<template>
    <div>
        EsGoods 组件
    </div>
</template>

<script>
export default {
    name: 'EsGoods',
}   
</script>

<style lang="less" scoped></style>
```

##### 3.5.2 封装 es-goods 组件

> ==封装需求==：
>
> 1.实现 EsGoods 组件的基础布局
>
> 2.封装组件的 6 个自定义属性 (id, thumb, title, price, count, checked)
>
> 3.封装组件的自定义事件 stateChange，允许外界监听组件选中状态的变化
>
> ```vue
> <!-- 使用 goods 组件 -->
> <es-goods
> v-for="item in goodslist"
> :key="item.id"
> :id="item.id"
> :thumb="item.goods_img"
> :title="item.goods_name"
> :price="item.goods_price"
> :count="item.goods_count"
> :checked="item.goods_state"
> @stateChange="onGoodsStateChange"
> ></es-goods>
> ```

> 1.渲染组件的基础布局
>
> 1.1 渲染 EsGoods 组件的基础 DOM 结构：
>
> ```vue
> <template>
>  <div class="goods-container">
>      <!-- 左侧图片区域 -->
>      <div class="left">
>          <!-- 商品的缩略图 -->
>          <img src="" alt="商品图片" class="thumb" />
>      </div>
>      <!-- 右侧信息区域 -->
>      <div class="right">
>          <!-- 商品名称 -->
>          <div class="top">xxxx</div>
>          <div class="bottom">
>              <!-- 商品价格 -->
>              <div class="price">￥0.00</div>
>              <!-- 商品数量 -->
>              <div class="count">数量</div>
>          </div>
>      </div>
>  </div>
> </template>
> ```
>
> 1.2 美化布局样式：
>
> ```less
> .goods-container {
>  display: flex;
>  padding: 10px;
> 
>  // 左侧图片的样式
>  .left {
>      margin-right: 10px;
> 
>      // 商品图片
>      .thumb {
>          display: block;
>          width: 100px;
>          height: 100px;
>          background-color: #efefef;
>      }
>  }
> 
>  // 右侧商品名称、单价、数量的样式
>  .right {
>      display: flex;
>      flex-direction: column;
>      justify-content: space-between;
>      flex: 1;
> 
>      .top {
>          font-weight: bold;
>      }
> 
>      .bottom {
>          display: flex;
>          justify-content: space-between;
>          align-items: center;
> 
>          .price {
>              color: red;
>              font-weight: bold;
>          }
>      }
>  }
> }
> ```
>
> 1.3 在商品缩略图之外包裹**复选框**( <https://v4.bootcss.com/docs/components/forms/#checkboxes> )效果：
>
> ```vue
> <!-- 左侧图片和复选框区域 -->
> <div class="left">
>  <!-- 复选框 -->
>  <div class="custom-control custom-checkbox">
>   <input type="checkbox" class="custom-control-input" id="customCheck1" />
>   <!-- 将商品图片包裹于 label 之中，点击图片可以切换“复选框”的选中状态 -->
>   <label class="custom-control-label" for="customCheck1">
>    <img src="" alt="商品图片" class="thumb" />
>   </label>
>  </div>
> </div>
> ```
>
> 1.4 覆盖**复选框**的默认样式：
>
> ```less
> .custom-control-label::before,
> .custom-control-label::after {
>  top: 3.4rem;
> }
> 
> .custom-control .custom-control-label::before {
>  border-radius: 1.25em;
> }
> ```
>
> 1.5 在 App.vue 组件中循环渲染 EsGoods.vue 组件：
>
> ```vue
> <!-- 使用 EsGoods 组件 -->
> <es-goods v-for="item in goodslist"></es-goods>
> ```
>
> 1.6 为 EsGoods.vue 添加顶边框：
>
> ```less
> .goods-container {
>  display: flex;
>  padding: 10px;
>  // 最终生成的选择器为 .goods-container + .goods-container
>  // 在 css 中，（+）是“相邻兄弟选择器”，表示：选择紧连着另一元素后的元素，二者具有相同的父元素。
>  + .goods-container {
>   border-top: 1px solid #efefef;
>  }
>  // ...省略其他样式
> }
> ```

> 2.封装自定义属性 id
>
> 2.1 在 EsGoods.vue 组件的 props 节点中，声明如下的自定义属性：
>
> ```js
> export default {
>  name: 'EsGoods',
>  props: {
>      // 唯一的 key 值
>      id: {
>          // id 的值可以是“字符串”也可以是“数值”
>          type: [String, Number],
>          required: true,
>      },
>  },
> }  
> ```
>
> 2.2 在渲染复选框时动态绑定 input 的 id 属性和 label 的 for 属性值：
>
> ```vue
> <!-- 复选框 -->
> <div class="custom-control custom-checkbox">
>  <input type="checkbox" class="custom-control-input" :id="id" />
>  <label class="custom-control-label" :for="id">
>   <img src="" alt="商品图片" class="thumb" />
>  </label>
> </div>
> ```
>
> 2.3 在 App.vue 中使用 EsGoods.vue 组件时，动态绑定 id 属性的值：
>
> ```vue
> <!-- 使用 goods 组件 -->
> <es-goods v-for="item in goodslist" :id="item.goods_id"></es-goods>
> ```

> 3.封装其他属性
>
> ==除了 id 属性之外，EsGoods 组件还需要封装：**缩略图**（thumb）、**商品名称**（title）、**单价**（price）、**数量**（count）、**勾选状态**（checked）这 5 个属性==
>
> 3.1 在 EsGoods.vue 组件的 props 节点中，声明如下的自定义属性：
>
> ```js
> export default {
>  name: 'EsGoods',
>  props: {
>      // 唯一的 key 值
>      id: {
>          type: [String, Number],
>          required: true,
>      },
>      // 1. 商品的缩略图
>      thumb: {
>          type: String,
>          required: true,
>      },
>      // 2. 商品的名称
>      title: {
>          type: String,
>          required: true,
>      },
>      // 3. 单价
>      price: {
>          type: Number,
>          required: true,
>      },
>      // 4. 数量
>      count: {
>          type: Number,
>          required: true,
>      },
>      // 5. 商品的勾选状态
>      checked: {
>          type: Boolean,
>          required: true,
>      },
>  },
> }
> ```
>
> 3.2 在 EsGoods.vue 组件的 DOM 结构中渲染商品的信息数据：
>
> ```vue
> <template>
>  <div class="goods-container">
>      <!-- 左侧图片和复选框区域 -->
>      <div class="left">
>          <!-- 复选框 -->
>          <div class="custom-control custom-checkbox">
>              <input type="checkbox" class="custom-control-input" id="id" :checked="checked" />
>              <!-- 将商品图片包裹于 label 之中，点击图片可以切换“复选框”的选中状态 -->
>              <label class="custom-control-label" for="id">
>                  <img :src="thumb" alt="商品图片" class="thumb" />
>              </label>
>          </div>
>      </div>
>      <!-- 右侧信息区域 -->
>      <div class="right">
>          <!-- 商品名称 -->
>          <div class="top">{{ title }}</div>
>          <div class="bottom">
>              <!-- 商品价格 -->
>              <div class="price">￥{{ price.toFixed(2) }}</div>
>              <!-- 商品数量 -->
>              <div class="count">{{ count }}</div>
>          </div>
>      </div>
>  </div>
> </template>
> ```
>
> 3.3 在 App.vue 组件中使用 EsGoods.vue 组件时，动态绑定对应属性的值：
>
> ```vue
> <!-- 使用 EsGoods 组件 -->
> <es-goods v-for="item in goodslist" :key="item.goods_id" :id="item.goods_id" :thumb="item.goods_img" :title="item.goods_name" :price="item.goods_price" :count="item.goods_count" :checked="item.goods_state"></es-goods>
> ```

> 4.封装自定义事件 stateChange
>
> ==**点击复选框**时，可以把**最新的勾选状态**，通过**自定义事件**的方式传递给组件的使用者。==
>
> 4.1 在 EsGoods.vue 组件中，监听 checkbox 选中状态变化的事件：
>
> ```vue
> <!-- 监听复选框的 change 事件 -->
> <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" @change="onCheckBoxChange" />
> ```
>
> 4.2 在 EsGoods.vue 组件的 methods 中声明对应的事件处理函数：
>
> ```js
> methods: {
>  // 监听复选框选中状态变化的事件
>  onCheckBoxChange(e) {
>   // e.target.checked 是最新的勾选状态
>   console.log(e.target.checked)
>  },
> },
> ```
>
> 4.3 在 EsGoods.vue 组件中声明自定义事件：
>
> ```js
> emits: ['stateChange'],
> ```
>
> 4.4 完善 onCheckBoxChange 函数的处理逻辑，调用 $emit() 函数触发自定义事件：
>
> ```js
> methods: {
>  // 监听复选框选中状态变化的事件
>  onCheckBoxChange(e) {
>   // 向外发送的数据是一个对象，包含了 { id, value } 两个属性
>   this.$emit('stateChange', {
>    id: this.id,
>    value: e.target.checked,
>   })
>  },
> },
> ```
>
> 4.5 在 App.vue 根组件中使用 EsGoods.vue 组件时，监听它的 stateChange 事件：
>
> ```vue
> <!-- 使用 goods 组件 -->
> <es-goods
>  v-for="item in goodslist"
>  :key="item.id"
>  :id="item.id"
>  :thumb="item.goods_img"
>  :title="item.goods_name"
>  :price="item.goods_price"
>  :count="item.goods_count"
>  :checked="item.goods_state"
>  @stateChange="onGoodsStateChange"
> ></es-goods>
> ```
>
> 4.6 在 App.vue 的 methods 中声明如下的事件处理函数：
>
> ```js
> methods: {
>  // 监听商品选中状态变化的事件
>  onGoodsStateChange(e) {
>      // 1. 根据 id 进行查找（注意：e 是一个对象，包含了 id 和 value 两个属性）
>      const findResult = this.goodslist.find(x => x.id === e.id)
>      // 2. 找到了对应的商品，则更新其选中状态
>      if (findResult) {
>       findResult.goods_state = e.value
>      }
>  },
> }
> ```

#### 3.6 实现合计、结算数量、全选功能

##### 3.6.1 动态统计已勾选商品的总价格

> ==需求分析==：
>
> 合计的商品总价格，依赖于 goodslist 数组中每一件商品信息的变化，此场景下适合使用**计算属性**。

> 1.在 App.vue 中声明如下的计算属性：
>
> ```js
> computed: {
>  // 已勾选商品的总价
>      amount() {
>      // 1. 定义商品总价格
>      let a = 0
>      // 2. 循环累加商品总价格
>      this.goodslist
>          .filter(x => x.goods_state)
>          .forEach(x => a += x.goods_price * x.goods_count)
>      // 3. 返回累加的结果
>      return a
>  },
> },
> ```
>
> 2.在 App.vue 中使用 EsFooter.vue 组件时，动态绑定**已勾选商品的总价格**：
>
> ```vue
> <!-- 使用 footer 组件 -->
> <es-footer :total="0" :amount="amount" @fullChange="onFullStateChange"></es-footer>
> ```

##### 3.6.2 动态统计已勾选商品的总数量

> 1.在 App.vue 中声明如下的计算属性：
>
> ```js
> computed: {
>  // 已勾选商品的总数量
>  total() {
>      // 1. 定义已勾选的商品总数量
>      let t = 0
>      // 2. 循环累加
>      this.goodslist
>          .filter(x => x.goods_state)
>          .forEach(x => (t += x.goods_count))
>      // 3. 返回计算的结果
>      return t
>  },
> },
> ```
>
> 2.在 App.vue 中使用 EsFooter.vue 组件时，动态绑定**已勾选商品的总数量**：
>
> ```vue
> <!-- 使用 footer 组件 -->
> <es-footer :total="total" :amount="amount"
> @fullChange="onFullStateChange"></es-footer>
> ```

##### 3.6.3 实现全选功能

> 1.在 App.vue 组件中监听到 EsFooter.vue 组件的选中状态发生变化时，立即更新 goodslist 中每件商品的选中状态即可：
>
> ```vue
> <!-- 使用 footer 组件 -->
> <es-footer :total="total" :amount="amount"
> @fullChange="onFullStateChange"></es-footer>
> ```
>
> 2.在 onFullStateChange 的事件处理函数中修改每件商品的选中状态：
>
> ```js
> methods: {
>  // 监听全选按钮状态的变化
>  onFullStateChange(isFull) {
>   this.goodslist.forEach(x => x.goods_state = isFull）
>  },
> }
> ```

#### 3.7 封装 es-counter 组件

##### 3.7.1 创建并注册 EsCounter 组件

> 1.在 src/components/es-counter/ 目录下新建 EsCounter.vue 组件：
>
> ```vue
> <template>
>  <div>EsCounter 组件</div>
> </template>
> 
> <script>
> export default {
>  name: 'EsCounter',
> }
> </script>
> 
> <style lang="less" scoped>
> </style>
> ```
>
> 2.在 EsGoods.vue 组件中导入并注册 EsCounter.vue 组件：
>
> ```js
> // 导入 counter 组件
> import EsCounter from '../es-counter/EsCounter.vue'
> 
> export default {
>  name: 'EsGoods',
>  components: {
>   // 注册 counter 组件
>   EsCounter,
>  }
> }
> ```
>
> 3.在 EsGoods.vue 的 template 模板结构中使用 EsCounter.vue 组件：
>
> ```vue
> <div class="bottom">
>  <!-- 商品价格 -->
>  <div class="price">￥{{ price.toFixed(2) }}</div>
>  <!-- 商品数量 -->
>  <div class="count">
>      <!-- 使用 es-counter 组件 -->
>      <es-counter></es-counter>
>  </div>
> </div>
> ```

##### 3.7.2 封装 EsCounter 组件

> ==封装要求==：
>
> 1. 渲染组件的 基础布局
>
> 2. 实现数量值的 加减操作
>
> 3. 处理 min 最小值
>
> 4. 使用 watch 侦听器处理文本框输入的结果
>
> 5. 封装 numChange 自定义事件
>
> ```vue
> <es-counter :num="count" :min="1" @numChange="getNumber"></es-counter>
> ```

> 2.1 渲染组件基础布局
>
> 1.基于 bootstrap 提供的 Buttons <https://v4.bootcss.com/docs/components/buttons/#examples> 和 form-control 渲染组件的基础布局：
>
> ```vue
> <template>
>  <div class="counter-container">
>      <!-- 数量 -1 按钮 -->
>      <button type="button" class="btn btn-light btn-sm">-</button>
>      <!-- 输入框 -->
>      <input type="number" class="form-control form-control-sm ipt-num" />
>      <!-- 数量 +1 按钮 -->
>      <button type="button" class="btn btn-light btn-sm">+</button>
>  </div>
> </template>
> ```
>
> 2.美化当前组件的样式：
>
> ```less
> .counter-container {
>  display: flex;
> 
>  // 按钮的样式
>  .btn {
>      width: 25px;
>  }
> 
>  // 输入框的样式
>  .ipt-num {
>      width: 34px;
>      text-align: center;
>      margin: 0 4px;
>  }
> }
> ```

> 2.2 实现数值的渲染及加减操作
>
> ==思路分析：==
>
> 1. ==加减操作需要依赖于 EsCounter 组件的 data 数据==
>
> 2. ==初始数据依赖于父组件通过 props 传递进来==
>
> ==将父组件传递进来的 props 初始值转存到 data 中，形成 EsCounter 组件的内部状态！==
>
> 1.在 EsCounter.vue 组件中声明如下的 props：
>
> ```js
> props: {
>     // 数量值
>     num: {
>         type: Number,
>         default: 0,
>     },
> },
> ```
>
> 2.在 EsGoods.vue 组件中通过属性绑定的形式，将数据传递到 EsCounter.vue 组件中：
>
> ```vue
> <!-- 商品数量 -->
> <div class="count">
>      <es-counter :num="count"></es-counter>
> </div>
> ```
>
> 注意：不要直接把 num 通过 v-model 指令双向绑定到 input 输入框，因为 vue 规定：props **的值只读的！**例如下面的做法是错误的：
>
> ```vue
> <!-- Warning 警告：不要模仿下面的操作 -->
> <input type="number" class="form-control form-control-sm ipt-num" v-model.number="num" />
> ```
>
> 3.正确的做法：将 props 的初始值**转存**到 data 中，因为 data **中的数据是可读可写的！**示例代码如下：
>
> ```js
> export default {
>     name: 'EsCounter',
>     props: {
>         // 初始数量值【只读数据】
>         num: {
>             type: Number,
>             default: 0,
>         },
>     },
>     data() {
>         return {
>             // 内部状态值【可读可写的数据】
>             // 通过 this 可以访问到 props 中的初始值
>             number: this.num,
>         }
>     },
> }
> ```
>
> 并且把 data 中的 number 双向绑定到 input 输入框：
>
> ```vue
> <input type="number" class="form-control form-control-sm ipt-num" v-model.number="number" />
> ```
>
> 4.为 -1 和 +1 按钮绑定响应的点击事件处理函数：
>
> ```vue
> <button type="button" class="btn btn-light btn-sm" @click="onSubClick">-</button>
> <input type="number" class="form-control form-control-sm ipt-num" v-model.number="number" />
> <button type="button" class="btn btn-light btn-sm" @click="onAddClick">+</button>
> ```
>
> 并在 methods 中声明对应的事件处理函数如下：
>
> ```js
> methods: {
>     // -1 按钮的事件处理函数
>     onSubClick() {
>      this.number -= 1
>     },
>     // +1 按钮的事件处理函数
>     onAddClick() {
>      this.number += 1
>     },
> },
> ```

> 2.3 实现 min 最小值的处理
>
> ==需求分析：==
>
> ==购买商品时，购买的数量最小值为 1==
>
> 1.在 EsCounter.vue 组件中封装如下的 props：
>
> ```js
> export default {
>  name: 'EsCounter',
>  props: {
>      // 数量值
>      num: {
>          type: Number,
>          default: 0,
>      },
>      // 最小值
>      min: {
>          type: Number,
>          // min 属性的值默认为 NaN，表示不限制最小值
>          default: NaN,
>      },
>  },
> }
> ```
>
> 2.在 -1 按钮的事件处理函数中，对 min 的值进行判断和处理：
>
> ```js
> methods: {
>  // -1 按钮的事件处理函数
>  onSubClick() {
>      // 判断条件：min 的值存在，且 number - 1 之后小于 min
>      if (!isNaN(this.min) && this.number - 1 < this.min) return
>      this.number -= 1
>  },
> }
> ```
>
> 3.在 EsGoods.vue 组件中使用 EsCounter.vue 组件时指定 min 最小值：
>
> ```vue
> <!-- 商品数量 -->
> <div class="count">
>  <!-- 指定数量的最小值为 1 -->
>  <es-counter :num="count" :min="1"></es-counter>
> </div>
> ```

> 2.4 处理输入框的输入结果
>
> ==思路分析：==
>
> 1. ==将输入的新值转化为整数==
>
> 2. ==如果转换的结果不是数字，或小于1，则强制 number 的值等于1==
>
> 3. ==如果新值为小数，则把转换的结果赋值给 number==
>
> 1.为输入框的 v-model 指令添加 .lazy 修饰符（当输入框触发 change 事件时更新 v-model 所绑定到的数据源）：
>
> ```vue
> <input type="number" class="form-control form-control-sm ipt-num" v-model.number.lazy="number" />
> ```
>
> 2.通过 watch 侦听器监听 number 数值的变化，并按照分析的步骤实现代码：
>
> ```js
> export default {
>     name: 'EsCounter',
>     watch: {
>         // 监听 number 数值的变化
>         number(newVal) {
>             // 1. 将输入的新值转化为整数
>             const parseResult = parseInt(newVal)
>             // 2. 如果转换的结果不是数字，或小于1，则强制 number 的值等于 1
>             if (isNaN(parseResult) || parseResult < 1) {
>                 this.number = 1
>                 return
>             }
>             // 3. 如果新值为小数，则把转换的结果赋值给 number
>             if (String(newVal).indexOf('.') !== -1) {
>                 this.number = parseResult
>                 return
>             }
>             console.log(this.number)
>      },
>     },
> }
> ```

> 2.5 把最新的数据传递给使用者
>
> ==需求分析：==
>
> ==当 EsGoods 组件使用 EsCounter 组件时，期望能够监听到**商品数量**的变化，此时需要使用**自定**==
>
> ==**义事件**的方式，把最新的数据**传递给组件的使用者**。==
>
> 1.在 EsCounter.vue 组件中声明自定义事件如下：
>
> ```js
> emits: ['numChange'],
> ```
>
> 2.在 EsCounter.vue 组件的 watch 侦听器中触发自定义事件：
>
> ```js
>  watch: {
>      // 监听 number 数值的变化
>      number(newVal) {
>          // 1.将输入的新值转换为整数
>          const parseResult = parseInt(newVal)
>          // 2.如果转换的结果不是数字，或小于1，则强制 number 的值等于 1 
>          if (isNaN(parseResult) || parseResult < 1) {
>              this.number = 1
>              return
>          }
>          // 3.如果新值为小数，则把转换的结果赋值给 number
>          if (String(newVal).indexOf('.') !== -1) {
>              this.number = parseResult
>              return
>          }
>          // 触发自定义事件，把最新的 number 数值传递给组件的使用者
>          this.$emit('numChange', this.number)
>      }
>  },
> ```
>
> 3.在 EsGoods.vue 组件中监听 EsCounter.vue 组件的自定义事件：
>
> ```vue
> <!-- 商品数量 -->
> <div class="count">
>  <es-counter :num="count" :min="1" @numChange="getNumber"></escounter>
> </div>
> ```
>
> 并声明对应的事件处理函数如下：
>
> ```js
> methods: {
>  // 监听数量变化的事件
>  getNumber(num) {
>   console.log(num)
>  },
> }
> ```

> 2.6 更新购物车中商品的数量
>
> ==思路分析：==
>
> 1. ==在 EsGoods 组件中**获取到最新的商品数量**==
>
> 2. ==在 EsGoods 组件中**声明**自定义事件==
>
> 3. ==在 EsGoods 组件中**触发**自定义事件，向外传递数据对象 { id, value }==
>
> 4. ==在 App 根组件中监听 EsGoods 组件的自定义事件，并根据 id 更新对应商品的数量==
>
> 1.在 EsGoods.vue 组件中声明自定义事件 countChange ：
>
> ```js
> emits: ['numChange', 'countChange'],
> ```
>
> 2.在 EsCounter.vue 组件的 numChange 事件处理函数中，触发**步骤**1声明的自定义事件：
>
> ```vue
> <es-counter :num="count" :min="1" @numChange="getNumber"></es-counter>
> 
> <script>
> methods: {
>     // 监听数量变化的事件
>     getNumber(num) {
>         // 触发自定义事件，向外传递数据对象 { id, value }
>         this.$emit('countChange', {
>             // 商品的 id
>             id: this.id,
>             // 最新的数量
>             value: num,
>         })
>     },
> }
> </script>
> ```
>
> 3.在 App.vue 根组件中使用 EsGoods.vue 组件时，监听它的自定义事件 countChange ：
>
> ```vue
> <!-- 使用 goods 组件 -->
> <es-goods
>  v-for="item in goodslist"
>  :key="item.id"
>  :id="item.id"
>  :thumb="item.goods_img"
>  :title="item.goods_name"
>  :price="item.goods_price"
>  :count="item.goods_count"
>  :checked="item.goods_state"
>  @stateChange="onGoodsStateChange"
>  @countChange="onGoodsCountChange"
> ></es-goods>
> ```
>
> 并在 methods 中声明对应的事件处理函数：
>
> ```js
> methods: {
>     // 监听商品数量变化的事件
>     onGoodsCountChange(e) {
>         // 根据 id 进行查找
>         const findResult = this.goodslist.find(x => x.id === e.id)
>         // 找到了对应的商品，则更新其数量
>         if (findResult) {
>             findResult.goods_count = e.value
>         }
>     }
> }
> ```

## 二十四、vue组件高级（上）总结

> ① 能够掌握 watch 侦听器的基本使用
>
> - 定义最基本的 watch 侦听器
> - immediate、 deep、监听对象中单个属性的变化
>
> ② 能够知道 vue 中常用的生命周期函数
>
> - 创建阶段、运行阶段、销毁阶段
> - created、mounted
>
> ③ 能够知道如何实现组件之间的数据共享
>
> - 父子组件、兄弟组件、后代组件
>
> ④ 能够知道如何在 vue3 的项目中全局配置 axios
>
> - main.js 入口文件中进行配置
> - app.config.globalProperties.$http = axios
