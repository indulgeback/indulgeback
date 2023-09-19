---
title: TypeScript 进阶语法
date: 2023-9-14
author: liuwy
categories:
 - 技术
tags:
 - TypeScript
---

> 目标：学习并掌握进阶语法，实现简单的Demo

## 六、类型断言 联合类型 交叉类型

### 1.联合类型

```ts
//例如我们的手机号通常是13XXXXXXX 为数字类型 这时候产品说需要支持座机
//所以我们就可以使用联合类型支持座机字符串
let myPhone: number | string  = '010-820'

//这样写是会报错的应为我们的联合类型只有数字和字符串并没有布尔值
let myPhone: number | string  = true
```

> 函数使用联合类型

```ts
const fn = (something:number | boolean):boolean => {
     return !!something
}
```

### 2.交叉类型

> 多种类型的集合，联合对象将具有所联合类型的所有成员

```ts
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => {
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
xiaoman({age: 18,height: 180,sex: 'male'});
```

### 3.类型断言

> 语法：　　
>
> 值 as 类型或<类型>值  value as string  string value

> 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：

### 4.使用any临时断言

```ts
window.abc = 123
//这样写会报错因为window没有abc这个东西
```

```ts
(window as any).abc = 123
//可以使用any临时断言在 any 类型的变量上，访问任何属性都是允许的。
```

> as const
> 是对字面值的断言，与const直接定义常量是有区别的
>
> 如果是普通类型跟直接const 声明是一样的

```ts
const names = '小满'
names = 'aa' //无法修改

let names2 = '小满' as const
names2 = 'aa' //无法修改
```

```ts
// 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];

a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针
```

### 5.类型断言是不具影响力的

> 在下面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用 并不会影响结果, 因为编译过程中会删除类型断言

```ts
function toBoolean(something: any): boolean {
    return something as boolean;
}

toBoolean(1);
// 返回值为 1
```

## 七、内置对象

> JavaScript 中有很多内置对象，它们可以直接在 TypeScript中当做定义好了的类型。

### 1.ECMAScript 的内置对象

> Boolean、Number、string、RegExp、Date、Error

```ts
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('哔哩哔哩')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error("error!")
console.log(e)
```

### 2.DOM 和 BOM 的内置对象

> Document、HTMLElement、Event、NodeList 等

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
// 读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {
    
});
// dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}
```

### 3.定义Promise

> 如果我们不指定返回的类型TS是推断不出来返回的是什么类型
>
> 指定返回的类型，函数定义返回promise 语法规则:Promise T 类型

```ts
function promise():Promise<number>{
   return new Promise<number>((resolve,reject)=>{
       resolve(1)
   })
}

promise().then(res=>{
    console.log(res)
})
```

> 当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了
>
> 而他们的定义文件，则在 TypeScript 核心库的定义文件中

### 4.案例：TS + Canvas 实现代码雨

> 该案例需要关闭 TS 的严格模式，方法在之前提到过

```ts
let canvas = document.querySelector('#canvas') as HTMLCanvasElement
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
canvas.height = screen.availHeight; //可视区域的高度
canvas.width = screen.availWidth; //可视区域的宽度
let str: string[] = 'XMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSB'.split('')
let Arr = Array(Math.ceil(canvas.width / 10)).fill(0) //获取宽度例如1920 / 10 192
console.log(Arr);
 
const rain = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)'//填充背景颜色
    ctx.fillRect(0, 0, canvas.width, canvas.height)//背景
    ctx.fillStyle = "#0f0"; //文字颜色
    Arr.forEach((item, index) => {
        ctx.fillText(str[ Math.floor(Math.random() * str.length) ], index * 10, item + 10)
        Arr[index] = item >= canvas.height || item > 10000 *  Math.random() ? 0 : item + 10; //添加随机数让字符随机出现不至于那么平整
    })
    console.log(Arr);
    
}
setInterval(rain, 40)
```

## 八、Class  类

> ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。用ES6的“类”写，就是下面这样。

### 1.类的概念

```ts
//定义类
class Person {
    constructor () {
 
    }
    run () {
        
    }
}
```

> 在TypeScript是不允许直接在constructor 定义变量的 需要在constructor上面先声明

```ts
class Person{
    name:string
    age:number
    constructor (name:string,age:number){
        this.name = name
    }
    run(){
        
    }
}

// 这样引发了第二个问题你如果了定义了变量不用,也会报错。
// 通常是给个默认值 或者 进行赋值

class Person{
    name:string
    age:number = 0
    constructor (name:string,age:number){
        this.name = name
    }
    run(){
        
    }
}
```

### 2.类的修饰符

> 总共有三个 public private protected

> 使用public 修饰符 可以让你定义的变量 内部访问 也可以外部访问 如果不写默认就是public

> 使用 private 修饰符 代表定义的变量私有的只能在内部访问 不能在外部访问

> 使用 protected 修饰符 代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问

### 3.static 静态属性 和 静态方法

> 我们用static 定义的属性 不可以通过this 去访问 只能通过类名去调用

> static 静态函数 同样也是不能通过this 去调用 也是通过类名去调用

> 需注意： 如果两个函数都是static 静态的是可以通过this互相调用

### 4.interface 定义 类

> ts interface 定义类 使用关键字 implements  后面跟interface的名字多个用逗号隔开 继承还是用extends

```ts
 
interface PersonClass {
    get(type: boolean): boolean
}
 
interface PersonClass2{
    set():void,
    asd:string
}
 
class A {
    name: string
    constructor() {
        this.name = "123"
    }
}
 
class Person extends A implements PersonClass,PersonClass2 {
    asd: string
    constructor() {
        super()
        this.asd = '123'
    }
    get(type:boolean) {
        return type
    }
    set () {
 
    }
}
```

### 5.抽象类

> 应用场景如果你写的类实例化之后毫无用处此时我可以把他定义为抽象类

> 或者你也可以把他作为一个基类-> 通过继承一个派生类去实现基类的一些方法

> 我们看例子

> 下面这段代码会报错抽象类无法被实例化

```ts
abstract class A {
   public name:string
}
 
new A()
```

> 我们在A类定义了 getName 抽象方法但不实现
>
> 我们B类实现了A定义的抽象方法 如不实现就不报错
>
> 我们定义的抽象方法必须在派生类实现

```ts
abstract class A {
   name: string
   constructor(name: string) {
      this.name = name;
   }
   print(): string {
      return this.name
   }
 
   abstract getName(): string
}
 
class B extends A {
   constructor() {
      super('小满')
   }
   getName(): string {
      return this.name
   }
}
 
let b = new B();
 
console.log(b.getName());
```

### 6.案例：手写 Vue 虚拟 Dom

```ts
interface Options {
  el: string | HTMLElement
}
interface VueCls {
  options: Options,
  init(): void
}

interface Vnode {
  tag: string // div section header
  text?: string // 123
  children?: Vnode[]
}

// 虚拟 DOM
class Dom {
  constructor(name: string) {

  }
  // 创建节点的方法
  createElement(el: string) {
    return document.createElement(el)
  }

  // 填充文本的方法
  setText(el: HTMLElement, text: string | null) {
    el.textContent = text
  }

  // 渲染函数
  render(data: Vnode) {
    let root = this.createElement(data.tag)
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach(item => {
        let child = this.render(item)
        root.appendChild(child)
      })
    } else {
      this.setText(root, data.text)
    }
    return root
  }
}

class Vue extends Dom implements VueCls {
  options: Options
  static author: string = 'Liuwy' // 静态变量
  constructor(options: Options) {
    super('小玉') // super 传参
    this.options = options
    this.init()
  }
  static version() { // 静态方法
    // 静态方法的 this 只能指到其他的静态方法或静态变量
    this.author
    return '1.0.0'
  }
  init(): void {
    // 虚拟 DOM 就是通过 js 去渲染我们这个真实的 DOM
    let data: Vnode = {
      tag: 'div',
      children: [
        {
          tag: 'section',
          text: '我是子节点1'
        },
        {
          tag: 'section',
          text: '我是子节点2'
        }
      ]
    }
    let app = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el
    app.appendChild(this.render(data))
  }
}

let vue = new Vue({
  el: '#app'
})
```

## 九、元组类型

> 如果需要一个固定大小的不同类型值的集合，我们需要使用元组。

### 1.元组就是数组的变种

> 元组（Tuple）是固定数量的不同类型的元素的组合。

> 元组与集合的不同之处在于，元组中的元素类型可以是不同的，而且数量固定。元组的好处在于可以把多个元素作为一个单元传递。如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示。

```ts
let arr:[number,string] = [1,'string']
 
let arr2: readonly [number,boolean,string,undefined] = [1,true,'sring',undefined]
```

> 当赋值或访问一个已知索引的元素时，会得到正确的类型：

```ts
let arr:[number,string] = [1,'string']
arr[0].length //error
arr[1].length //success
 
//数字是没有length 的
```

> 元组类型还可以支持自定义名称和变为可选的

```ts
let a:[x:number,y?:boolean] = [1]
```

### 2.越界元素

```ts
let arr:[number,string] = [1,'string']
 
arr.push(true)  //error
```

### 3.应用场景

> 定义 excel 返回的数据

```ts
let excel: [string, string, number, string][] = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
]
```

## 十、枚举类型

> 在JavaScript中是没有枚举的概念的
>
> TS帮我们定义了枚举这个类型

### 1.数字枚举

> 例如 红绿蓝 Red = 0 Green = 1 Blue= 2 分别代表红色0 绿色为1 蓝色为2

```ts
enum Types{
   Red,
   Green,
   BLue
}
```

> 这样写就可以实现
>
> 因为ts定义的枚举中的每一个组员默认都是从0开始的

```ts
enum Types{
   Red = 0,
   Green = 1,
   BLue = 2
}
// 默认就是从0开始的 可以不写值
```

> 增长枚举

```ts
enum Types{
   Red = 1,
   Green,
   BLue
}
```

> 如上，我们定义了一个数字枚举， Red使用初始化为 1。 其余的成员会从 1 开始自动增长。 换句话说， Type.Red的值为 1， Green为 2， Blue为 3。

### 2.字符串枚举

> 字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```ts
enum Types{
   Red = 'red',
   Green = 'green',
   BLue = 'blue'
}
```

> 由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息，字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

### 3.异构枚举

> 枚举可以混合字符串和数字成员

```ts
enum Types{
   No = "No",
   Yes = 1,
}
```

### 4.接口枚举

> 定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds

> 声明对象的时候要遵循这个规则

```ts
   enum Types {
      yyds,
      dddd
   }
   interface A {
      red:Types.yyds
   }

   let obj:A = {
      red:Types.yyds
   }
```

### 5.const枚举

> let  和 var 都是不允许的声明只能使用const

> 大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举。 常量枚举通过在枚举上使用 const修饰符来定义

> const 声明的枚举会被编译成常量

> 普通声明的枚举编译完后是个对象

```ts
const enum Types{
   No = "No",
   Yes = 1,
}
```

### 6.反向映射

> 它包含了正向映射（ name -> value）和反向映射（ value -> name）
>
> 要注意的是 不会为字符串枚举成员生成反向映射。

```ts
enum Enum {
   fall
}
let a = Enum.fall;
console.log(a); //0
let nameOfA = Enum[a]; 
console.log(nameOfA); //fall
```
