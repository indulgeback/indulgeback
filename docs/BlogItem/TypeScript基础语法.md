---
title: TypeScript 基础语法
date: 2023-9-13
author: liuwy
categories:
 - 技术
tags:
 - TypeScript
---

> 目标：学习并掌握基础语法，进行简单的类型标注

## 一、TypeScript基础类型

### 1.TypeScript 简介

> TS是JS的超集，所以JS基础的类型都包含在内
>
> 基础类型：Boolean、Number、String、null、undefined 以及 ES6 的  Symbol 和 ES10 的 BigInt。

### 2.学习 TS 必须要知道的命令

```sh
# 起步安装 
npm install typescript -g

# 创建 TS 配置文件
tsc --init

# 实时编译 会在同文件夹下创建同名 JS 文件
tsc -w

# 用 node 运行 TS 编译后生成的 JS 文件
node index.js

# 编译 TS 文件为 JS 文件
tsc 文件名

# nodejs 环境执行ts
npm i @types/node --save-dev #（node环境支持的依赖必装）

# 安装
npm i ts-node --g

# 编译并同时运行 TS 文件
ts-node 文件名
```

### 3.字符串类型

```ts
let a: string = '123'
// 普通声明
 
// 也可以使用es6的字符串模板
let str: string = `dddd${a}`
```

> 其中用来定义 [ES6 中的模板字符串]，${expr} 用来在模板字符串中嵌入表达式。

### 4.数字类型

> 支持十六进制、十进制、八进制和二进制；

```ts
let notANumber: number = NaN; // Nan
let num: number = 123; // 普通数字
let infinityNumber: number = Infinity; // 无穷大
let decimal: number = 6; // 十进制
let hex: number = 0xf00d; // 十六进制
let binary: number = 0b1010; // 二进制
let octal: number = 0o744; // 八进制
```

### 5.布尔类型

> 注意，使用构造函数 Boolean 创造的对象不是布尔值：

```ts
let createdBoolean: boolean = new Boolean(1)
// 这样会报错 
// 因为事实上 new Boolean() 返回的是一个 Boolean 对象 
```

> 事实上 new Boolean() 返回的是一个 Boolean 对象 需要改成

```ts
let createdBoolean: Boolean = new Boolean(1)
```

```ts
let booleand: boolean = true // 可以直接使用布尔值

let booleand2: boolean = Boolean(1) // 也可以通过函数返回布尔值
```

### 6.空值类型

> JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数

```ts
function voidFn(): void {
    console.log('test void')
}
```

> void 类型的用法，主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的异步回调函数

> void也可以定义undefined 和 null类型

```ts
let u: void = undefined
let n: void = null;
```

### 7.Null和undefined类型

```ts
let u: undefined = undefined; // 定义undefined
let n: null = null; // 定义null
```

> void 和 undefined 和 null 最大的区别：
> 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 string 类型的变量：

```ts
// 这样写会报错 void类型不可以分给其他类型
let test: void = undefined
let num2: string = "1"

num2 = test
// 这样是没问题的
let test: null = null
let num2: string = "1"

num2 = test

// 或者这样的
let test: undefined = undefined
let num2: string = "1"

num2 = test
```

> TIPS 注意：
> 如果你配置了tsconfig.json 开启了严格模式

```json
{
    "compilerOptions":{
        "strict": true
    }
}
```

> null 不能赋予 void 类型

## 二、任意类型

### 1.any 类型

> 没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型

```ts
let anys:any = 123
anys = '123'
anys = true
```

> 声明变量的时候没有指定任意类型默认为any

```ts
let anys;
anys = '123'
anys = true
```

> 弊端如果使用any 就失去了TS类型检测的作用

### 2.unknown 顶级类型

> TypeScript 3.0中引入的 unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给unknown

> unknow类型比any更加严格当你要使用any 的时候可以尝试使用unknow

```ts
// unknown 可以定义任何类型的值
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK

// 这样写会报错 unknow 类型不能作为子类型只能作为父类型 any 可以作为父类型和子类型
// unknown 类型不能赋值给其他类型
let names:unknown = '123'
let names2:string = names

// 这样就没问题 any 类型是可以的
let names:any = '123'
let names2:string = names   

// unknown 可赋值对象只有 unknown 和 any
let bbb:unknown = '123'
let aaa:any= '456'

aaa = bbb
```

> 区别2

```ts
// 如果是 any 类型在对象没有这个属性的时候还在获取是不会报错的
let obj:any = {b:1}
obj.a

// 如果是 unknow 是不能调用属性和方法
let obj:unknown = {b:1,ccc:():number=>213}
obj.b
obj.ccc()
```

## 三、接口和对象类型

### 1.对象的类型

> 在 TypeScript 中，我们定义对象的方式要用关键字 interface（接口），我的理解是使用 interface 来定义一种约束，让数据的结构满足约束的格式。定义方式如下：

```ts
// 这样写是会报错的 因为我们在person定义了a，b但是对象里面缺少b属性
// 使用接口约束的时候不能多一个属性也不能少一个属性
// 必须与接口保持一致
interface Person {
    b:string,
    a:string
}

const person:Person  = {
    a:"213"
}
```

```ts
// 重名interface  可以合并
interface A{name:string}
interface A{age:number}
var x:A={name:'xx',age:20}
// 继承
interface A{
    name:string
}

interface B extends A{
    age:number
}

let obj:B = {
    age:18,
    name:"string"
}
```

### 2.可选属性   使用 ? 操作符

```ts
// 可选属性的含义是该属性可以不存在
// 所以说这样写也是没问题的
interface Person {
    b?:string,
    a:string
}

const person:Person  = {
    a:"213"
}
```

### 3.任意属性 [propName: string]

> 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

```ts
// 在这个例子当中我们看到接口中并没有定义C但是并没有报错
// 应为我们定义了[propName: string]: any;
// 允许添加新的任意属性
interface Person {
    b?:string,
    a:string,
 [propName: string]: any;
}

const person:Person  = {
    a:"213",
    c:"123"
}
```

### 4.只读属性 readonly

> readonly 只读属性是不允许被赋值的只能读取

```tsx
// 这样写是会报错的
// 应为a是只读的不允许重新赋值
interface Person {
    b?: string,
    readonly a: string,
 [propName: string]: any;
}

const person: Person = {
    a: "213",
    c: "123"
}

person.a = 123
```

### 5.添加函数

```ts
interface Person {
    b?: string,
    readonly a: string,
 [propName: string]: any;
    cb:()=>void
}

const person: Person = {
    a: "213",
    c: "123",
    cb:()=>{
        console.log(123)
    }
}
```

## 四、数组类型

### 1.基础写法[ ]

```ts
// 类型加中括号
let arr:number[] = [123]
// 这样会报错定义了数字类型出现字符串是不允许的
let arr:number[] = [1,2,3,'1']
// 操作方法添加也是不允许的
let arr:number[] = [1,2,3,]
arr.unshift('1')

var arr: number[] = [1, 2, 3]; // 数字类型的数组
var arr2: string[] = ["1", "2"]; // 字符串类型的数组
var arr3: any[] = [1, "2", true]; // 任意类型的数组
```

### 2.数组泛型

```ts
// 规则 Array<类型>
let arr:Array<number> = [1,2,3,4,5]
```

### 3.用接口表示数组

```ts
// 一般用来描述类数组 
interface NumberArray {
 [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// 表示：只要索引的类型是数字时，那么值的类型必须是数字。
```

### 4.多维数组

```ts
let data:number[][] = [[1,2], [3,4]];
```

### 5.arguments类数组

```ts
function Arr(...args:any): void {
    console.log(arguments)
    // 错误的arguments 是类数组不能这样定义
    let arr:number[] = arguments
}
Arr(111, 222, 333) 

function Arr(...args:any): void {
    console.log(arguments) 
    // ts内置对象IArguments 定义
    let arr:IArguments = arguments
}
Arr(111, 222, 333)

// 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

### 6.any 在数组中的应用

```ts
// 一个常见的例子数组中可以存在任意类型
let list: any[] = ['test', 1, [],{a:1}]
```

## 五、函数扩展

### 1.函数的类型

```ts
// 注意，参数不能多传，也不能少传 必须按照约定的类型来
const fn = (name: string, age:number): string => {
    return name + age
}
fn('张三',18)
```

### 2.函数的可选参数?

```ts
// 通过?表示该参数为可选参数
const fn = (name: string, age?:number): string => {
    return name + age
}
fn('张三')
```

### 3.函数参数的默认值

```ts
const fn = (name: string = "我是默认值"): string => {
    return name
}
fn()
```

### 4.接口定义函数

```ts
//定义参数 num 和 num2  ：后面定义返回值的类型
interface Add {
    (num:  number, num2: number): number
}

const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
fn(5, 5)

interface User{
    name: string;
    age: number;
}
function getUserInfo(user: User): User {
  return user
}
```

### 5.定义剩余参数

```ts
const fn = (array:number[],...items:any[]):any[] => {
       console.log(array,items)
       return items
}

let a:number[] = [1,2,3]

fn(a,'4','5','6')
```

### 6.函数重载

> 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
>
> 如果参数类型不同，则参数类型应设置为 any。
>
> 参数数量不同你可以将不同的参数设置为可选。

```ts
function fn(params: number): void

function fn(params: string, params2: number): void

function fn(params: any, params2?: any): void {

    console.log(params)

    console.log(params2)

}

 

fn(123)

fn('123',456)
```
