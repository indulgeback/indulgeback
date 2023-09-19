---
title: vue3 Ⅲ vue 组件基础（下）
date: 2023-04-20
author: liuwy
categories:
 - 技术
tags:
 - Javascript
 - Vue
---

|               目标               |             目录             |
| :------------------------------: | :--------------------------: |
|  能够知道如何对 props 进行验证   |       十三、props 验证       |
|     能够知道如何使用计算属性     |        十四、计算属性        |
|   能够知道如何为组件自定义事件   |       十五、自定义事件       |
| 能够知道如何在组件上使用 v-model |    十六、组件上的 v-model    |
|         实现任务列表案例         |      十七、任务列表案例      |
|            总结和概括            | 十八、vue 组件基础（下）总结 |

## 十三、props验证

### 1.什么是 props 验证

> props 验证指的是：在封装组件时**对外界传递过来的 props 数据进行合法性的校验**，从而防止数据不合法的问题。

> 使用**数组类型的 props 节点**的缺点：**无法为每个 prop 指定具体的数据类型**。

### 2.对象类型的 props 节点

> 使用**对象类型的 props 节点**，可以对每个 prop 进行**数据类型**的校验，示意图如下：

### 3.props 验证

> 对象类型的 props 节点提供了**多种数据验证方案**，例如：
>
> **①** 基础的类型检查
>
> **②** 多个可能的类型
>
> **③** 必填项校验
>
> **④** 属性默认值
>
> **⑤** 自定义验证函数

#### 3.1 基础的类型检查

> 可以直接为组件的 prop 属性指定基础的校验类型，从而防止组件的使用者为其绑定错误类型的数据：

```vue
<script>
export default{
    props:{
        propA: String,  // 字符串类型
        propB: Number,  // 数字类型
        propC: Boolean, // 布尔值类型
        propD: Array, // 数组类型
        propE: Object, // 对象类型
        propF: Date, // 日期类型
        propG: Function,// 函数类型
        propH: Symbol, // 符号类型
    }
}
</script>
```

#### 3.2 多个可能的类型

> 如果某个 prop 属性值的类型不唯一，此时可以通过数组的形式，为其指定多个可能的类型：

```vue
<script>
export default{
    props:{
        // propA 属性的值可以是“字符串”或“数字”
        propA: [String,Number]  
    }
}
</script>
```

#### 3.3 必填项校验

> 如果组件的某个 prop 属性是必填项，必须让组件的使用者为其传递属性的值。此时，可以通过如下的方式将其设置为必填项：

```vue
<script>
export default{
   props: {
        // 通过“配置对象”的形式，来定义 propB 属性的“验证规则”
     propB: {
        type: Number, // 当前属性的值必须是 String 字符串类型
        required: true, // 当前属性的值是必填项，如果使用者没指定 propB 属性的值，则在终端进行警告提示
     },
   }  
}
</script>
```

#### 3.4 属性默认值

> 在封装组件时，可以为某个 prop 属性指定默认值：

```vue
<script>
export default{
   props: {
        // 通过“配置对象”的形式，来定义 propC 属性的“验证规则”
     propC: {
        type: Number,
        default: 100, // 如果使用者没有指定 propC 的值，则 propC 属性的默认值为 100
     },
   }  
}
</script>
```

#### 3.5 自定义验证函数

> 在封装组件时，可以为 prop 属性指定自定义的验证函数，从而对 prop 属性的值进行更加精确的控制：

```vue
<script>
export default{
    props: {
        // 通过“配置对象”的形式，来定义 propC 属性的“验证规则”
        propD: {
            // 通过 calidator 函数，对 propD 属性的值进行校验，“属性的值”可以通过形参 value 进行接收
            validator(value) {
                // propD 属性的值，必须匹配下列字符串中的一个
                // validator 函数的返回值为 true 表示验证通过，false 表示验证失败
                return ['success', 'warning', 'danger'].indexOf(value) !== -1
            }
        }
    }
}
</script>
```

## 十四、计算属性

### 1.什么是计算属性

> 计算属性本质上就是一个 function 函数，它可以实时监听 data 中数据的变化，并 return 一个计算后的新值，供组件渲染 DOM 时使用。

### 2.如何声明计算属性

> 计算属性需要以 function 函数的形式声明到组件的 computed 选项中：

```vue
<template>
  <div>
    <input type="text" v-model.number="count" />
    <p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  data() {
    return {
      count: 1,
    }
  },
  computed: {
    plus() {
      console.log('计算属性被执行了')
      return this.count * 2
    },
  },
}
</script>
```

> 注意：**计算属性侧重于得到一个计算的结果**，因此计算属性中**必须有 return 返回值**！

### 3.计算属性的使用注意点

> ① 计算属性**必须定义在 computed 节点中**
>
> ② 计算属性**必须是一个 function 函数**
>
> ③ 计算属性**必须有返回值**
>
> ④ 计算属性**必须当做普通属性使用**

### 4.计算属性和方法的区别

> 相对于方法来说，**计算属性会缓存计算的结果**，只有计算属性的**依赖项发生变化**时，才会**重新进行运算**。因此计算属性的性能更好：

```vue
<script>
export default{  
computed: {
 plus() {
  console.log('计算属性被执行了')
  return this.count * 2
 },
},
methods: {
 plus() {
  console.log('方法被执行了')
  return this.count * 2
 }
}
}  
</script>
```

### 5.计算属性案例

#### 5.1 动态计算已勾选商品的总数量

```vue
<template>
    <!-- TODO: 1. 动态计算已勾选的商品的总数量 -->
    <span>总数量：{{ total }}</span>
</template>

<script>
export default {  
  computed: {
    // 动态计算出勾选水果的总数量
    total() {
      let t = 0;
      this.fruitlist.forEach((x) => {
        if (x.state) {
          t += x.count;
        }
      })
      return t;
    },
  },
}
</script>
```

#### 5.2 动态计算已勾选的商品的总价

```vue
<template>
      <!-- TODO: 2. 动态计算已勾选的商品的总价 -->
      <span>总价：{{ amount }}</span>
</template>

<script>
export default {  
  computed: {
    // 动态计算已勾选的商品的总价
    amount(){
  let a = 0;
        this.fruitlist
         .filter((x) => x.state)
         .forEach((x) => {
             a += x.price * x.count;
         });
        return a;
    },
  },
}
</script>
```

#### 5.3 控制按钮的禁用状态

```vue
<template>
      <!-- TODO: 3. 动态计算按钮的禁用状态 -->
      <button type="button" class="btn btn-primary" :disabled="isdisabled">
</template>

<script>
export default {  
  computed: {
 // 控制按钮的禁用状态
    isdisabled() {
      return this.total === 0;
    },
  },
};
</script>
```

## 十五、自定义事件

### 1.什么是自定义事件

> 在封装组件时，为了让组件的使用者可以监听到组件内状态的变化，此时需要用到组件的自定义事件。

### 2.自定义事件的3个使用步骤

> 在**封装组件**时：
>
> ① **声明**自定义事件
>
> ② **触发**自定义事件
>
> 在**使用组件**时：
>
> ③ **监听**自定义事件

#### 2.1 声明自定义事件

> 开发者为自定义组件封装的自定义事件，必须事先在 emits 节点中声明：

```vue
<template>
  <div>
    <p>count 的值是：{{ count }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  // 1. 声明自定义事件
  emits: ['countChange'],
  data() {
    return {
      count: 0,
    }
  },
}
</script>
```

#### 2.2 触发自定义事件

> 在 emits 节点下声明的自定义事件，可以通过 this.$emit('自定义事件的名称') 方法进行触发：

```vue
<template>
  <div>
    <p>count 的值是：{{ count }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  methods: {
    add() {
      this.count++
      // 2. this.$emit() 触发自定义事件
      this.$emit('countChange')
    },
  },
}
</script>
```

#### 2.3 监听自定义事件

> 在使用自定义的组件时，可以通过 v-on 的形式监听自定义事件：

```vue
<template>
  <div>
    <h1>app 根组件</h1>
    <hr />
    <my-counter @countChange="getCount"></my-counter>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  methods: {
    getCount() {
      console.log('触发了 countChange 自定义事件')
    },
  },
  components: {
    MyCounter,
  },
}
</script>
```

### 3.自定义事件传参

> 在调用 this.$emit() 方法触发自定义事件时，可以通过第 2 个参数为自定义事件传参，示例代码如下：

```vue
<script>      
this.$emit('countChange', this.count) // 触发自定义事件时，通过第二个参数传参
</script>

<script>
export default {
  name: 'MyApp',
  methods: {
    getCount(val) {
      console.log('触发了 countChange 自定义事件', val)
    },
  },
  components: {
    MyCounter,
  },
}
</script>
```

## 十六、组件上的 v-model

### 1. 为什么需要在组件上使用 v-model

> v-model 是双向数据绑定指令，**当需要维护组件内外数据的同步时**，可以在组件上使用 v-model 指令。示意图如下：

> - **外界数据的变化**会**自动同步**到 counter 组件中
> - counter 组件中数据的变化，也会**自动同步到外界**

### 2. 在组件上使用 v-model 的步骤

> **父  -》子**  同步数据
>
> **①** 父组件通过 v-bind: 属性绑定的形式，把数据传递给子组件
>
> **②** 子组件中，通过 props 接收父组件传递过来的数据

> **子  -》父**  同步数据
>
> **①** 在 v-bind: 指令之前添加 v-model 指令
>
> **②** 在子组件中声明 emits 自定义事件，格式为 update:xxx
>
> **③** 调用 $emit() 触发自定义事件，更新父组件中的数据

## 十七、第三个案例——任务列表案例

### 1.案例效果

### 2.用到的知识点

> **① vite 创建项目**
>
> **② 组件的封装与注册**
>
> **③ props**
>
> **④ 样式绑定**
>
> **⑤ 计算属性**
>
> **⑥ 自定义事件**
>
> **⑦ 组件上的 v-model**

### 3.整体实现步骤

> **① 使用 vite 初始化项目**
>
> **② 梳理项目结构**
>
> **③ 封装 todo-list 组件**
>
> **④ 封装 todo-input 组件**
>
> **⑤ 封装 todo-button 组件**

### 4.具体实现

#### 4.1 初始化项目

> 1.在终端运行以上的命令，初始化 vite 项目：
>
> ```bash
> npm init vite-app todo
> ```
>
> 2.使用 vscode 打开项目，并安装依赖项：
>
> ```bash
> npm install
> ```
>
> 3.安装 less 语法相关的依赖项：
>
> ```bash
> npm i less -D
> ```

#### 4.2 梳理项目结构

> 1.重置 index.css 中的全局样式如下：
>
> ```css
> :root {
> font-size: 12px;
> }
> 
> body {
> padding: 8px;
> }
> ```
>
> 2.重置 App.vue 组件的代码结构如下：
>
> ```vue
> <template>
> <div>
>  <h1>App 根组件</h1>
> </div>
> </template>
> 
> <script>
> export default {
> name: "MyApp",
> data() {
>  return {
>    // 任务列表数据
>    todolist: [
>      { id: 1, task: "周一早晨9点开会", done: false },
>      { id: 2, task: "周一晚上8点聚餐", done: false },
>      { id: 3, task: "准备周三上午的演讲稿", done: true },
>    ],
>  };
> },
> };
> </script>
> 
> <style lang="less" scoped></style>
> ```
>
> 3.删除  components  目录下的  HelloWorld.vue  组件。
>
> 4.在终端运行以下的命令，把项目运行起来：
>
> ```bash
> npm run dev
> ```

#### 4.3 封装 todo-list 组件

> **4.3.1 创建并注册 TodoList 组件**
>
> 1.在 ==src/components/todo-list/== 目录下新建 TodoList.vue 组件：
>
> ```vue
> <template>
> <div>TodoList 组件</div>
> </template>
> 
> <script>
> export default {
> name: "TodoListVue",
> };
> </script>
> 
> <style lang="less" scoped>
> </style>
> ```
>
> 2.在 App.vue 组件中导入并注册 TodoList.vue 组件：
>
> ```vue
> <template>
>  <!-- 使用 TodoList 组件 -->
>  <todo-list-vue></todo-list-vue>
> </template>
> 
> <script>
> // 导入 TodoList 组件
> import TodoListVue from "./components/TodoList.vue";
> 
> export default {
> name: "MyApp",
> // 注册 TodoList 组件   
> components: {
>  TodoListVue,
> },
> };
> </script>
> ```

> **4.3.2 基于 bootstrap 渲染列表组件**
>
> 1.在 main.js 入口文件中，导入 ==src/assets/css/bootstrap.css== 样式表：
>
> ```js
> import { createApp } from 'vue'
> import App from './App.vue'
> 
> // 导入 bootstrap.css 样式表
> import './assets/css/bootstrap.css'
> import './index.css'
> 
> createApp(App).mount('#app')
> ```
>
> 2.根据 bootstrap 提供的**列表组**（<https://v4.bootcss.com/docs/components/list-group/#with-badges）和**复选框**（https://v4.bootcss.com/docs/components/forms/#checkboxes-and-radios-1）渲染列表组件和基本效果：>
>
> ```vue
> <template>
> <!-- 列表组 -->
> <ul class="list-group">
>  <li class="list-group-item d-flex justify-content-between align-items-center">
>    <!-- 复选框 -->
>    <div class="custom-control custom-checkbox">
>      <input type="checkbox" class="custom-control-input" id="customCheck1">
>      <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
>    </div>
>    <!-- 徽标 badge 效果 -->
>    <span class="badge badge-success badge-pill">完成</span>
>    <span class="badge badge-warning badge-pill">未完成</span>
>  </li>    
> </ul>
> </template>
> ```

> **4.3.3 为 TodoList 声明 props 属性**
>
> 1.为了接受外界传递过来的列表数据，需要在 TodoList 组件中声明如下的 props 属性：
>
> ```vue
> <script>
> export default {
> name: "TodoListVue",
> props: {
>  // 列表数据
>  list: {
>    type: Array,
>    required: true,
>    default: [],
>  }
> }
> };
> </script>
> ```
>
> 2.在 App 组件中通过 list 属性，将数据传递到 TodoList 组件之中：
>
> ```vue
> <template>
> <div>
>  <h1>App 根组件</h1>
> 
>  <todo-list-vue :list="todolist"></todo-list-vue>
> </div>
> </template>
> ```

> **4.3.4 渲染列表的 DOM 结构**
>
> 1.通过 v-for 指令，循环渲染列表的 DOM 结构：
>
> ```vue
> <template>
> <!-- 列表组 -->
> <ul class="list-group">
>  <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in list" :key="item.id">
>    <!-- 复选框 -->
>    <div class="custom-control custom-checkbox">
>      <input type="checkbox" class="custom-control-input" :id="item.id" >
>      <label class="custom-control-label" for="customCheck1">{{item.task}}</label>
>    </div>
>    <!-- 徽标 -->
>    <span class="badge badge-success badge-pill">完成</span>
>    <span class="badge badge-warning badge-pill">未完成</span>
>  </li>
> </ul>
> </template>
> ```
>
> 2.通过 v-if 和 v-else 指令，按需渲染 badge 效果：
>
> ```vue
>    <!-- 徽标 -->
>    <span class="badge badge-success badge-pill" v-if="item.done">完成</span>
>    <span class="badge badge-warning badge-pill" v-else>未完成</span>
> ```
>
> 3.通过 v-model 指令，双向绑定任务的完成状态：
>
> ```vue
>    <!-- 复选框 -->
>    <div class="custom-control custom-checkbox">
>      <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.done">
>      <label class="custom-control-label" :for="item.id">{{item.task}}</label>
>    </div>
> ```
>
> 4.通过 v-bind 属性绑定，动态切换元素的 class 类名：
>
> ```vue
> <label class="custom-control-label" :class="item.done ? 'delete' : ''" :for="item.id">{{item.task}}</label>
> ```
>
> 在 TodoList 组件中声明如下的样式，美化当前组件的 UI 结构：
>
> ```vue
> <style lang="less" scoped>
> .list-group{
> width: 400px;
> }
> 
> .delete{
> text-decoration: line-through;
> color: gray;
> font-style: italic;
> }
> </style>
> ```
>
>

#### 4.4 封装 todo-input 组件

> **4.4.1 创建并注册 TodoInput 组件**
>
> 1.在 ==src /components/todo-input/== 目录下新建 TodoInput 组件：
>
> ```vue
> <template>
> <div>TodoInputVue 组件</div>
> </template>
> 
> <script>
> export default {
> name: 'TodoInputVue',
> }
> </script>
> 
> <style lang="less" scoped>
> </style>
> ```
>
> 2.在 App.vue 组件中导入并注册 TodoInput.vue 组件：
>
> ```vue
> <script>
> // 导入 TodoList 组件
> import TodoList from "./components/todo-list/TodoList.vue";
> // 导入 TodoInput 组件
> import TodoInput from "./components/todo-input/TodoInput.vue";
> 
> export default {
>  name: "MyApp",
>  // 注册私有组件
>  components: {
>   TodoList,
>   TodoInput,
>  },
> };
> </script>
> ```
>
> 3.在 App.vue 的 template 模板结构中使用注册的 TodoInput 组件：
>
> ```vue
> <template>
> <div>
> <h1>App 根组件</h1>
> 
> <hr>
> 
> 
> <!-- 使用 TodoInput 组件 -->
> <todo-input></todo-input>
> <!-- 使用 TodoList 组件 -->
> <todo-list :list="todolist" class="mt-2"></todo-list>
> 
> </div>
> </template>
> ```

> **4.4.2 基于bootstrap 渲染组件结构**
>
> 1.根据 bootstrap 提供的 inline-forms（<https://v4.bootcss.com/docs/components/forms/#inline-forms）渲染> TodoInput 组件的基本结构。
>
> 2.在 TodoInput 组件中渲染如下的 DOM 结构：
>
> ```vue
> <template>
>  <!-- form 表单 -->
>  <form class="form-inline">
>      <div class="input-group mb-2 mr-sm-2">
>          <!-- 输入框前缀 -->
>          <div class="input-group-prepend">
>              <div class="input-group-text">任务</div>
>          </div>
>          <!-- 文本输入框 -->
>          <input type="text" class="form-control" placeholder="请输入任务信息" style="width: 356px;">
>      </div>
>      <!-- 添加按钮 -->
>      <button type="submit" class="btn btn-primary mb-2">添加新任务</button>‘
>  </form>
> </template>
> ```

> **4.4.3 通过自定义事件向外传递数据**
>
> ==需求描述：==
>
> ==在 App 组件中，监听 TodoInput 组件的自定义事件，获取到要添加的任务名称。示例代码如下：==
>
> ```vue
> <todo-input @add="onAddNewTask"></todo-input>
> ```
>
> 1.在 TodoInput 组件的 data 中声明如下的数据：
>
> ```vue
> <script>
> export default {
>  name: 'TodoInput',
>  data() {
>      return {
>          // 新任务的名称
>          taskname: '',
>      }
>  },
> }
> </script>
> ```
>
> 2.为 input 输入框进行 v-model 的双向数据绑定
>
> ```vue
> <input type="text" class="form-control" placeholder="请输入任务信息" style="width: 356px;" v-model.trim="taskname" />
> 
> ```
>
> 3.监听 form 表单的 submit 事件，阻止默认提交行为并指定事件处理函数：
>
> ```vue
>  <form class="form-inline" @submit.prevent="onFormSubmit">
>  </form>
> ```
>
> 4.在 methods 中声明 onFormSubmit 事件处理函数:
>
> ```js
>  methods: {
>      // 表单提交的事件处理函数
>      onFormSubmit() {
>          // 1.判断任务名称是否为空
>          if (!this.taskname) return alert('任务名称不能为空');
> 
>          // 2.触发自定义的 add 事件，并向外界传递数据
>          // 3.清空文本框
>      },
>  },
> ```
>
> 5.声明自定义事件如下:
>
> ```js
> export default {
>  name: 'TodoInput',
>  emits: ['add'],
> }
> ```
>
> 6.进一步完善 onFormSubmit 事件处理函数:
>
> ```js
>  methods: {
>      // 表单提交的事件处理函数
>      onFormSubmit() {
>          // 1.判断任务名称是否为空
>          if (!this.taskname) return alert('任务名称不能为空');
> 
>          // 2.触发自定义的 add 事件，并向外界传递数据
>    this.$emit('add', this.taskname)
> 
>          // 3.清空文本框
>          this.taskname = ''
>      },
>  },
> ```

> **4.4.4 实现添加任务的功能**
>
> 1.在 App.vue 组件中监听 TodoInput 组件自定义的 add 事件:
>
> ```vue
>  <!-- 使用 TodoInput 组件 -->
>  <!-- 监听 TodoInput 的 add 自定义事件 -->
>  <todo-input @add="onAddNewTask"></todo-input>
> ```
>
> 2.在 App.vue 组件的 data 中声明 nextId 来模拟 id 自增 +1 的操作:
>
> ```js
> data() {
>  return {
>    // 任务列表数据
>    todolist: [
>      { id: 1, task: "周一早晨9点开会", done: false },
>      { id: 2, task: "周一晚上8点聚餐", done: false },
>      { id: 3, task: "准备周三上午的演讲稿", done: true },
>    ],
>    // 下一个可用 Id 值
>    nextId: 4,
>  };
> },
> ```
>
> 3.在 App.vue 组件的 methods 中声明 onAddNewTask 事件处理函数:
>
> ```js
> methods: {
>  // TodoInput 组件 add 事件的处理函数
>  onAddNewTask(taskname) {
>    // 1.向任务列表中新增任务信息
>    this.todolist.push({
>      id: this.nextId,
>      task: taskname,
>      done: false, // 完成状态默认为 false
>    })
> 
>    //2.让 nextId 自增+1
>    this.nextId++
>  }
> },
> ```

#### 4.5 封装 todo-button 组件

> **4.5.1 创建并注册 TodoButton 组件**
>
> 1.在 ==src/components/todo-button/== 目录下新建 TodoButton.vue 组件:
>
> ```vue
> <template>
>  <div>TodoButton 组件</div>
> </template>
> 
> 
> <script>
> export default {
>  name: 'TodoButton',
> }
> </script>
> 
> <style lang="less" scoped></style>
> ```
>
> 2.在 App.vue 组件中导入并注册 TodoButton.vue 组件:
>
> ```vue
> <script>
> // 导入 TodoList 组件
> import TodoList from "./components/todo-list/TodoList.vue";
> // 导入 TodoInput 组件
> import TodoInput from "./components/todo-input/TodoInput.vue";
> // 导入 TodoButton 组件
> import TodoButton from "./components/todo-button/TodoButton.vue";
> 
> export default {
>  name: "MyApp",
>  // 注册私有组件
>  components: {
>   TodoList,
>   TodoInput,
>   TodoButton,
>  },
> };
> </script>
> ```
>
> 3.在 App.vue 的 template 模板结构中使用注册的 TodoButton 组件：
>
> ```vue
> <template>
> <div>
> <h1>App 根组件</h1>
> 
> <hr>
> 
> 
> <!-- 使用 TodoInput 组件 -->
> <todo-input></todo-input>
> <!-- 使用 TodoList 组件 -->
> <todo-list :list="todolist" class="mt-2"></todo-list>
> <!-- 使用 TodoButton 组件 -->
> <todo-button></todo-button>
> 
> </div>
> </template>
> ```

> **4.5.2 基于 bootstrap 渲染组件结构**
>
> 1.根据 bootstrap 提供的 Button group（<https://v4.bootcss.com/docs/components/forms/button-group）渲染> TodoButton 组件的基本结构。
>
> 2.在 TodoButton 组件中渲染如下的 DOM 结构:
>
> ```vue
> <template>
> <div class="button-container mt-3">
>   <div class="btn-group">
>       <button type="button" class="btn btn-primary">全部</button>
>       <button type="button" class="btn btn-secondary">已完成</button>
>       <button type="button" class="btn btn-secondary">未完成</button>
>   </div>
> </div>
> </template>
> ```
>
> 3.通过 button-container 类名美化组件的样式:
>
> ```less
> <style lang="less" scoped>
> .button-container {
> // 添加固定宽度
> width: 400px;
> // 文本居中效果
> text-align: center;
> }
> </style>
> ```

> **4.5.3 通过 props 指定默认激活的按钮**
>
> 1.在 TodoButton 组件中声明如下的 props ，用来指定默认激活的按钮的索引：
>
> ```vue
> <script>
> export default {
>  name: 'TodoButton',
>  props: {
>      // 激活项的索引值
>      active: {
>          type: Number,
>          required: true,
>          // 默认激活索引值为 0 的按钮（全部：0，已完成：1，未完成：2）
>          default: 0,
>      },
>  },
> }
> </script>
> ```
>
> 2.通过 动态绑定 class 类名 的方式控制按钮的激活状态：
>
> ```vue
> <template>
>  <div class="button-container mt-3">
>      <div class="btn-group">
>          <button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'">全部</button>
>          <button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'">已完成</button>
>          <button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'">未完成</button>
>      </div>
>  </div>
> </template>
> 
> ```
>
> 3.在 App 组件中声明默认激活项的索引，并通过属性绑定的方式传递给 TodoButton 组件：
>
> ```vue
>  <!-- 使用 TodoButton 组件 -->
>  <todo-button :active="activeBtnIndex"></todo-button>
> <script>
> export default {
> name: "MyApp",
> data() {
>  return {
>    // 任务列表数据
>    todolist: [
>      { id: 1, task: "周一早晨9点开会", done: false },
>      { id: 2, task: "周一晚上8点聚餐", done: false },
>      { id: 3, task: "准备周三上午的演讲稿", done: true },
>    ],
>    // 下一个可用 Id 值
>    nextId: 4,
>    // 激活的按钮的索引
>    activeBtnIndex: 0,
>  };
> },
> }
> </script>
> ```

> **4.5.4 通过 v-model 更新激活项的索引**
>
> > ==需求分析：==
> >
> > **父  -》 子**  ==通过 props 传递了激活项的索引（active）==
> >
> > **子  -》 父**  ==需要更新父组件中激活项的索引==
> >
> > ==这种场景下适合在组件上使用 v-model 指令，维护组件内外数据的同步。==
>
> 1.为 TodoButton 组件中的三个按钮分别绑定 click 事件处理函数：
>
> ```vue
> <template>
>     <div class="button-container mt-3">
>         <div class="btn-group">
>             <button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'"
>                 @click="onBtnClick(0)">全部</button>
>             <button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'"
>                 @click="onBtnClick(1)">已完成</button>
>             <button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'"
>                 @click="onBtnClick(2)">未完成</button>
>         </div>
>     </div>
> </template>
> ```
>
> 2.在 TodoButton 组件中声明如下的自定义事件，用来更新父组件通过 v-model 指令传递过来的 props 数据：
>
> ```js
> export default {
>     name: 'TodoButton',
>     // 声明和 v-model 相关的自定义事件
>     emits: ['update:active'],
>     props: {
>         // 激活项的索引值
>         active: {
>             type: Number,
>             required: true,
>             // 默认激活索引值为 0 的按钮（全部：0，已完成：1，未完成：2）
>             default: 0,
>         },
>     },
> }
> ```
>
> 3.在 TodoButton 组件的 methods 节点中声明 onBtnClick 事件处理函数：
>
> ```vue
> <script>
> methods: {
>     // 按钮的点击事件处理函数
>     onBtnClick(index) {
>         // 如果当前点击的按钮的索引值，等于 props 传递过来的索引值，则没必要触发 update:active 自定义事件
>         if (index === this.active) return
>         // 通过 this.$emit() 方法触发自定义事件
>         this.$emit('update:active', index)
>     },
> },
> </script>
> 
> <!-- 使用 TodoButton 组件，使用 v-model 指令双向绑定 -->
> <todo-button v-model:active="activeBtnIndex"></todo-button>
> ```

> **4.5.5 通过计算属性动态切换列表的数据**
>
> > 需求分析：
> >
> > 点击不同的按钮，切换显示不同的列表数据。此时可以根据当前激活按钮得到索引，动态计算出要显示的列表数据并返回即可！
> >
> > 1.在 App 根组件中声明如下的计算属性：
>
> ```js
> computed: {
>  // 根据激活按钮的索引值，动态计算要展示的列表数据
>  tasklist() {
>   // 对“源数据”进行 switch...case 的匹配，并返回“计算之后的结果”
>   switch (this.activeBtnIndex) {
>    case 0: // 全部
>     return this.todolist
>    case 1: // 已完成
>     return this.todolist.filter(x => x.done)
>    case 2: // 未完成
>     return this.todolist.filter(x => !x.done)
>   }
>  },
> },
> ```
>
> 2.在 App 根组件的 DOM 结构中，将 TodoList 组件的 :list="todolist" 修改为：
>
> ```vue
>     <!-- 使用 TodoList 组件 -->
>     <todo-list :list="tasklist" class="mt-2"></todo-list>
> ```

## 十八、vue组件基础（下）总结

> ① 能够知道如何对 props 进行验证
>
> - 数组格式、对象格式
> - type、default、required、validator
>
> ② 能够知道如何使用计算属性
>
> - computed 节点、必须 return 一个结果、缓存计算结果
>
> ③ 能够知道如何为组件绑定自定义事件
>
> - v-on 绑定自定义事件、emits、$emit()
>
> ④ 能够知道如何在组件上使用 v-model
>
> - 应用场景：实现组件内外的数据同步
> - v-model:props名称、emits、$emit('update:props名称')
