---
title: vue3 Ⅷ vue 常见优化手段
date: 2023-04-30
author: liuwy
categories:
 - 技术
tags:
 - Javascript
 - Vue
---

### 0.永远不要过早优化

> 所有命运馈赠的礼物，早已在暗中标好了价格。               ——茨威格
>
> 优化解决了一个问题，也许就会带来新的问题。

### 1.使用 key

> 对于通过循环生成的列表，应给每个列表项一个==稳定且唯一==的 key ，这有利于在列表变动时，尽量少的删除、新增、改动元素。

### 2.使用冻结的对象

> 将不需要遍历的数据冻结，这样 vue 便不会将这些数据响应化，可以节省时间

```js
let obj = {
  a: 1,
  b: 2,
}

// 冻结一个对象，他的属性值无法被更改
Object.freeze(obj)

// 判断一个对象是否被冻结，该函数返回值为 Boolean
console.log(Object.isFrozen(obj))
```

### 3.使用函数式组件

> 函数式组件比较简单，没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法，只接受一些 prop 的函数，我们可以将组件标记为 functional ，这意味着它无状态（没有响应式数据），也没有实例（没有 this 上下文）：

```js
// vue2
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

> 函数式组件是一种定义自身没有任何状态的组件的方式。它们很像纯函数：接收 props，返回 vnodes。函数式组件在渲染过程中不会创建组件实例 (也就是说，没有 `this`)，也不会触发常规的组件生命周期钩子。
>
> 我们用一个普通的函数而不是一个选项对象来创建函数式组件。该函数实际上就是该组件的渲染函数。
>
> 而因为函数式组件里没有 `this` 引用，Vue 会把 `props` 当作第一个参数传入：
>
> 第二个参数 `context` 包含三个属性：`attrs`、`emit` 和 `slots`。它们分别相当于组件实例的 [`$attrs`](https://cn.vuejs.org/api/component-instance.html#attrs)、[`$emit`](https://cn.vuejs.org/api/component-instance.html#emit) 和 [`$slots`](https://cn.vuejs.org/api/component-instance.html#slots) 这几个属性。
>
> 大多数常规组件的配置选项在函数式组件中都不可用，除了 [`props`](https://cn.vuejs.org/api/options-state.html#props) 和 [`emits`](https://cn.vuejs.org/api/options-state.html#emits)。我们可以给函数式组件添加对应的属性来声明它们：

```js
// vue3
function MyComponent(props, context) {
  // ...
}
```

> 原因：对于函数式组件 vue 是不会为它创建组件实例，函数式组件是用来进行纯渲染的！
>
> vue 会对每一个组件创建一个 vueComponent 组件

### 4.使用计算属性

> 如果模板中某个数据会使用多次，并且该数据是通过计算得到的，使用计算属性以缓存它们
>

### 5.非实时绑定的表单项

> 当使用 ==v-model== 绑定一个表单项时，当用户改变表单项的状态时，也会随之改变数据，从而导致 ==vue== 发生重新渲染（==rerender==），这会带来一些性能的开销。
>
> 我们可以通过使用 ==lazy== 或不使用 ==v-model== 的方式解决该问题，但要注意，这样可能会导致在某一个时间段内数据和表单项的值是不一致的。

### 6.保持对象引用稳定

> 在绝大部分情况下， ==vue== 触发 ==rerender== 的时机是其依赖的数据发生变化
>
> 若数据发生变化，哪怕给数据重新赋值了，==vue== 也是不会做出任何处理的
>
> 下面是 ==vue== 判断数据没有变化的源码

```js
function hasChanged(x, y) {
    if (x === y) {
        // === 也不一定相等
        // +0 === -0 返回为 true  1 / +0 值为 Infinity  1 / -0 值为 -Infinity
        return x === 0 && 1 / x !== 1 / y
    // x !== y    
    } else {
        // 判断 x 和 y 是否为 NaN
        // 原理： NaN === NaN 返回为 false  NaN !== NaN 返回为 true
        return x === x || y === y
    }
}
```

> 因此，如果需要，只要能保证组件的依赖数据不发生变化，组件就不会重新渲染。
>
> 对于原始数据类型，保持其值不变即可
>
> 对于对象类型，保持其引用不变即可
>
> 从另一方面来说，由于可以通过保持属性引用稳定来避免子组件的重渲染，那么我们应该细分组件来尽量避免多余的渲染。

### 7.使用 v-show 替代 v-if

> 对于频繁切换显示状态的元素，使用 v-show 可以保证虚拟 DOM 树的稳定，避免频繁的新增和删除元素，特别是对于那些内部包含大量 DOM 元素的节点，这一点极其重要。
>
> 关键字：频繁切换显示状态，内部包含大量 DOM 元素。

### 8.使用延迟装载（defer）

> JS 传输完成后，浏览器开始执行 JS 构造页面。
>
> 但可能一开始要渲染的组件太多，不仅 JS 执行的时间很长，而且执行完后浏览器要渲染的元素过多，从而导致页面白屏
>
> 一个可行的办法就是延迟装载组件，让组件按照指定的先后顺序依次一个一个渲染出来
>
> > 延迟装载是一个思路，本质就是利用 requestAnimationFrame 事件分批渲染内容，它的具体实现多种多样。
