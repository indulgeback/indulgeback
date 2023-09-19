---
title: vue3与组合式API
date: 2023-5-15
author: liuwy
categories:
 - 技术
tags:
 - Vue
---

## 认识Vue3

### 1. Vue3组合式API体验

> 通过 Counter 案例 体验Vue3新引入的组合式API

```vue
<script>
export default {
  data(){
    return {
      count:0
    }
  },
  methods:{
    addCount(){
      this.count++
    }
  }
}
</script>
```

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
const addCount = ()=> count.value++
</script>
```

特点：

1. 代码量变少
2. 分散式维护变成集中式维护

### 2. Vue3更多的优势

> 更容易维护
>
> - 组合式API
> - 更好的Typescript支持

> 更快的速度
>
> - 重写diff算法
> - 模板编译优化
> - 更高效的组件初始化

> 更小的体积
>
> - 良好的TreeShaking
> - 按需引入

> 更优的数据响应式
>
> - Proxy

## 使用create-vue搭建Vue3项目

### 1. 认识create-vue
>
> create-vue是Vue官方新的脚手架工具，底层切换到了 vite （下一代前端工具链），为开发提供极速响应

### 2. 使用create-vue创建项目
>
> 前置条件 - 已安装16.0或更高版本的Node.js

执行如下命令，这一指令将会安装并执行 create-vue

```bash
npm init vue@latest
```

## 熟悉项目和关键文件

> 关键文件
>
> 1. vite.config.js - 项目的配置文件 基于 vite 的配置
> 2. package.json - 项目包文件 核心依赖项变成了 Vue3.x 和 vite
> 3. main.js - 入口文件 createApp函数创建应用实例
> 4. app.vue - 根组件 SFC单文件组件 script - template - style
>    1. 脚本script和模板template顺序调整
>    2. 模板template不再要求唯一根元素
>    3. 脚本script添加setup标识支持组合式API
> 5. index.html - 单页入口 提供id为app的挂载点

## 组合式API - setup选项

### 1. setup选项的写法和执行时机

写法

```vue
<script>
  export default {
    setup(){
      
    },
    beforeCreate(){
      
    }
  }
</script>
```

执行时机
> 在beforeCreate钩子之前执行

### 2. setup中写代码的特点
>
> 在setup函数中写的数据和方法需要在末尾以对象的方式return，才能给模版使用

```vue
<script>
  export default {
    setup(){
      const message = 'this is message'
      const logMessage = ()=>{
        console.log(message)
      }
      // 必须return才可以
      return {
        message,
        logMessage
      }
    }
  }
</script>
```

### 3. script setup 语法糖
>
> script标签添加 setup标记，不需要再写导出语句，默认会添加导出语句

```vue
<script setup>
  const message = 'this is message'
  const logMessage = ()=>{
    console.log(message)
  }
</script>
```

## 组合式API - reactive和ref函数

### 1. reactive
>
> 接受对象类型数据的参数传入并返回一个响应式的对象

```vue
<script setup>
 // 导入
 import { reactive } from 'vue'
 // 执行函数 传入参数 变量接收
 const state = reactive({
   msg:'this is msg'
 })
 const setSate = ()=>{
   // 修改数据更新视图
   state.msg = 'this is new msg'
 }
</script>

<template>
  {{ state.msg }}
  <button @click="setState">change msg</button>
</template>
```

### 2. ref
>
> 接收简单类型或者对象类型的数据传入并返回一个响应式的对象

```vue
<script setup>
 // 导入
 import { ref } from 'vue'
 // 执行函数 传入参数 变量接收
 const count = ref(0)
 const setCount = ()=>{
   // 修改数据更新视图必须加上.value
   count.value++
 }
</script>

<template>
  <button @click="setCount">{{count}}</button>
</template>
```

### 3. reactive 对比 ref

1. 都是用来生成响应式数据
2. 不同点
   1. reactive不能处理简单类型的数据
   2. ref参数类型支持更好，但是必须通过.value做访问修改
   3. ref函数内部的实现依赖于reactive函数
3. 在实际工作中的推荐
   1. 推荐使用ref函数，减少记忆负担，小兔鲜项目都使用ref

## 组合式API - computed
>
> 计算属性基本思想和Vue2保持一致，组合式API下的计算属性只是修改了API写法

```vue
<script setup>
// 导入
import {ref, computed } from 'vue'
// 原始数据
const count = ref(0)
// 计算属性
const doubleCount = computed(()=>count.value * 2)

// 原始数据
const list = ref([1,2,3,4,5,6,7,8])
// 计算属性list
const filterList = computed(item=>item > 2)
</script>
```

## 组合式API - watch
>
> 侦听一个或者多个数据的变化，数据变化时执行回调函数，俩个额外参数 immediate控制立刻执行，deep开启深度侦听

### 1. 侦听单个数据

```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  // 2. 调用watch 侦听变化
  watch(count, (newValue, oldValue)=>{
    console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
  })
</script>
```

### 2. 侦听多个数据
>
> 侦听多个数据，第一个参数可以改写成数组的写法

```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  const name = ref('cp')
  // 2. 调用watch 侦听变化
  watch([count, name], ([newCount, newName],[oldCount,oldName])=>{
    console.log(`count或者name变化了，[newCount, newName],[oldCount,oldName])
  })
</script>
```

### 3. immediate
>
> 在侦听器创建时立即出发回调，响应式数据变化之后继续执行回调

```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  // 2. 调用watch 侦听变化
  watch(count, (newValue, oldValue)=>{
    console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
  },{
    immediate: true
  })
</script>
```

### 4. deep
>
> 通过watch监听的ref对象默认是浅层侦听的，直接修改嵌套的对象属性不会触发回调执行，需要开启deep

```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const state = ref({ count: 0 })
  // 2. 监听对象state
  watch(state, ()=>{
    console.log('数据变化了')
  })
  const changeStateByCount = ()=>{
    // 直接修改不会引发回调执行
    state.value.count++
  }
</script>

<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const state = ref({ count: 0 })
  // 2. 监听对象state 并开启deep
  watch(state, ()=>{
    console.log('数据变化了')
  },{deep:true})
  const changeStateByCount = ()=>{
    // 此时修改可以触发回调
    state.value.count++
  }
</script>

<script setup>
  // 精确侦听对象的某个属性
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const info = ref({
      name: 'cp',
      age: 18
  })
  // 2. 在不开启deep的前提下，侦听age的变化，只有age变化时才执行回调
  watch(
   () => info.value.age,
    () => console,log('age发生变化了')
  )
  const changeStateByCount = ()=>{
    // 此时修改可以触发回调
    info.value.age++
  }
</script>

```

## 组合式API - 生命周期函数

### 1. 选项式对比组合式

|      选项式API       |    组合式API    |
| :------------------: | :-------------: |
| beforeCreate/created |      setup      |
|     beforeMount      |  onBeforeMount  |
|       mounted        |    onMounted    |
|     beforeUpdate     | onBeforeUpdate  |
|       updated        |    onUpdated    |
|    beforeUnmount     | onBeforeUnmount |
|      unmounted       |   onUnmounted   |

### 2. 生命周期函数基本使用
>
> 1. 导入生命周期函数
> 2. 执行生命周期函数，传入回调

```vue
<scirpt setup>
import { onMounted } from 'vue'
onMounted(()=>{
  // 自定义逻辑
})
</script>
```

### 3. 执行多次
>
> 生命周期函数执行多次的时候，会按照顺序依次执行

```vue
<scirpt setup>
import { onMounted } from 'vue'
onMounted(()=>{
  // 自定义逻辑
})

onMounted(()=>{
  // 自定义逻辑
})
</script>
```

## 组合式API - 父子通信

### 1. 父传子
>
> 基本思想
>
> 1. 父组件中给子组件绑定属性
> 2. 子组件内部通过props选项接收数据

```vue
<script setup>
// 引入子组件
import sonComVue from './son-com.vue'
</script>
<template>
    <!-- 1.绑定属性 message -->
    <sonComVue message="this is app message">
</template>
```

```vue
<script setup>
// 2. 通过 defineProps "编译器宏" 接收子组件传递的数据
const props = defineProps({
    message: String
})
</script>
<template>
	{{ message }}
</template>
```

### 2. 子传父
>
> 基本思想
>
> 1. 父组件中给子组件标签通过@绑定事件
> 2. 子组件内部通过 emit 方法触发事件

```vue
<script setup>
// 引入子组件
import sonComVue from './son-com.vue'
const getMessage = (msg) => {
  console.log(msg)
}
</script>
<template>
  <!-- 1.绑定自定义事件 -->
  <sonComVue @get-message="getMessage" />
</template>
```

```vue
<script setup>
// 2. 通过 defineEmits编译器宏生成emit方法
const emit = defineEmits(['get-message'])

const sendMsg = () => {
  // 3. 触发自定义事件，并传递参数
  emit('get-message', 'this is son msg')
}
</script>

<template>
  <button @click="sendMsg">sendMsg</button>
</template>
```

## 组合式API - 模版引用
>
> 概念：通过 ref标识 获取真实的 dom对象或者组件实例对象

### 1. 基本使用
>
> 实现步骤：
>
> 1. 调用ref函数生成一个ref对象
> 2. 通过ref标识绑定ref对象到标签

```vue
<script setup>
import { ref } from 'vue'
// 1. 调用 ref 函数得到 ref 对象
const h1Ref = ref(null)
</script>

<template>
  <!-- 2. 通过 ref 标识绑定 ref 对象 -->
  <h1 ref="h1Ref">我是dom标签</h1>
</template>
```

### 2. defineExpose
>默认情况下在 script setup 语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过defineExpose编译宏指定哪些属性和方法容许访问
> 说明：指定testMessage属性可以被访问到

```vue
<script setup>
import { ref } from 'vue'
const testMessage = ref('this is test msg')
defineExpose({
  testMessage
})
</script>
```

## 组合式API - provide和inject

### 1. 作用和场景
>
> 顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信

### 2. 跨层传递普通数据
>
> 实现步骤
>
> 1. 顶层组件通过 `provide` 函数提供数据
> 2. 底层组件通过 `inject` 函数提供数据

```vue
<script setup>
provide('key',顶层组件中的数据)
</script>
```

```vue
<script setup>
const message = inject('key')
</script>
```

### 3. 跨层传递响应式数据
>
> 在调用provide函数时，第二个参数设置为ref对象

### 4. 跨层传递方法
>
> 顶层组件可以向底层组件传递方法，底层组件调用方法修改顶层组件的数据
