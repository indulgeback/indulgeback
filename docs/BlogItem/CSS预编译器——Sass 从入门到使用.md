---
title: CSS预编译器——Sass 从入门到熟练使用
date: 2023-10-20
author: liuwy
categories:
 - 技术
tags:
 - Sass
---

## 一、Sass是什么？

Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 [Compass](http://compass-style.org/)）有助于更好地组织管理样式文件，以及更高效地开发项目。

### 1.特色功能

- 完全兼容 CSS3
- 在 CSS 基础上增加变量、嵌套 (nesting)、混合 (mixins) 等功能
- 通过[函数](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html)进行颜色值与属性值的运算
- 提供[控制指令 (control directives)](https://www.sass.hk/docs/#t8)等高级功能
- 自定义输出格式

### 2.语法格式

Sass 有两种语法格式。首先是 SCSS (Sassy CSS) —— 也是本文示例所使用的格式 —— 这种格式仅在 CSS3 语法的基础上进行拓展，所有 CSS3 语法在 SCSS 中都是通用的，同时加入 Sass 的特色功能。此外，SCSS 也支持大多数 CSS hacks 写法以及浏览器前缀写法 (vendor-specific syntax)，以及早期的 IE 滤镜写法。这种格式以 `.scss` 作为拓展名。

> ps: 一般不会写下面这种语法格式，了解一下 -- liuwy

另一种也是最早的 Sass 语法格式，被称为缩进格式 (Indented Sass) 通常简称 "Sass"，是一种简化格式。它使用 “缩进” 代替 “花括号” 表示属性属于某个选择器，用 “换行” 代替 “分号” 分隔属性，很多人认为这样做比 SCSS 更容易阅读，书写也更快速。缩进格式也可以使用 Sass 的全部功能，只是与 SCSS 相比个别地方采取了不同的表达方式，具体请查看 [the indented syntax reference](http://sass-lang.com/docs/yardoc/file.INDENTED_SYNTAX.html)。这种格式以 `.sass` 作为拓展名。

## 二、Sass 的使用

### 1.安装 sass

```bash
npm i sass -D
```

### 2.编写 npm script

> 在 package.json 中加入此命令

```json
"compile:sass": "sass sass/main.scss css/style.css -w"
```

> 使用命令
>
> ```bash
> npm run compile:sass
> ```

> 命令描述
>
> - sass : 执行 sass
> - sass/main.scss : 待编译的 sass 文件相对路径
> - css/style.css : 编译后的 css 目标文件相对路径
> - -w : --watch 监听文件变化，执行命令

## 三、Sass 对 CSS 的功能扩展

### 1.嵌套规则

```scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

### 2.父选择器`&`

使用方式可以尽情想象

```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
```

### 3.属性嵌套

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

### 4.占位符选择器 `%foo`

> Sass 额外提供了一种特殊类型的选择器：占位符选择器 (placeholder selector)。与常用的 id 与 class 选择器写法相似，只是 `#` 或 `.` 替换成了 `%`。必须通过 [@extend](https://www.sass.hk/docs/#t7-3) 指令调用, 当占位符选择器单独使用时（未通过 `@extend` 调用），不会编译到 CSS 文件中。

### 5.注释

```scss
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. */
body { color: black; }

// These comments are only one line long each.
// They won't appear in the CSS output,
// since they use the single-line comment syntax.
a { color: green; }
```

### 6.SassScript

> ps: 这部分用到的基本只有变量，了解一下

#### 6.1 变量 `$`

SassScript 最普遍的用法就是变量，变量以美元符号开头，赋值方法与 CSS 属性的写法一样：

```scss
$width: 5em;
```

直接使用即调用变量：

```css
#main {
  width: $width;
}
```

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 `!global` 声明：

```scss
#main {
  $width: 5em !global;
  width: $width;
}

#sidebar {
  width: $width;
}
```

#### 6.2 数据类型

SassScript 支持 6 种主要的数据类型：

- 数字，`1, 2, 13, 10px`
- 字符串，有引号字符串与无引号字符串，`"foo", 'bar', baz`
- 颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型，`true, false`
- 空值，`null`
- 数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

> SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集，或 `!important` 声明。然而Sass 不会特殊对待这些属性值，一律视为无引号字符串。

##### 6.2.1 字符串

> SassScript 支持 CSS 的两种字符串类型：有引号字符串 (quoted strings)，如 `"Lucida Grande"` `'http://sass-lang.com'`；与无引号字符串 (unquoted strings)，如 `sans-serif` `bold`，在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 `#{}` (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名：
>
> ```scss
> @mixin firefox-message($selector) {
>   body.firefox #{$selector}:before {
>     content: "Hi, Firefox users!";
>   }
> }
> @include firefox-message(".header");
> ```
>
> 编译为
>
> ```css
> body.firefox .header:before {
>   content: "Hi, Firefox users!";
> }
> ```

##### 6.2.2 数组

> 数组 (lists) 指 Sass 如何处理 CSS 中 `margin: 10px 15px 0 0` 或者 `font-face: Helvetica, Arial, sans-serif` 这样通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组。

> 数组本身没有太多功能，但 [Sass list functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#list-functions) 赋予了数组更多新功能：`nth` 函数可以直接访问数组中的某一项；`join` 函数可以将多个数组连接在一起；`append` 函数可以在数组中添加新值；而 `@each` 指令能够遍历数组中的每一项。

> 数组中可以包含子数组，比如 `1px 2px, 5px 6px` 是包含 `1px 2px` 与 `5px 6px` 两个数组的数组。如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，所以也可以写成 `(1px 2px) (5px 6px)`。变化是，之前的 `1px 2px, 5px 6px` 使用逗号分割了两个子数组 (comma-separated)，而 `(1px 2px) (5px 6px)` 则使用空格分割(space-separated)。

> 当数组被编译为 CSS 时，Sass 不会添加任何圆括号（CSS 中没有这种写法），所以 `(1px 2px) (5px 6px)` 与 `1px 2px, 5px 6px` 在编译后的 CSS 文件中是完全一样的，但是它们在 Sass 文件中却有不同的意义，前者是包含两个数组的数组，而后者是包含四个值的数组。

> 用 `()` 表示不包含任何值的空数组（在 Sass 3.3 版之后也视为空的 map）。空数组不可以直接编译成 CSS，比如编译 `font-family: ()` Sass 将会报错。如果数组中包含空数组或空值，编译时将被清除，比如 `1px 2px () 3px` 或 `1px 2px null 3px`。

> 基于逗号分隔的数组允许保留结尾的逗号，这样做的意义是强调数组的结构关系，尤其是需要声明只包含单个值的数组时。例如 `(1,)` 表示只包含 `1` 的数组，而 `(1 2 3,)` 表示包含 `1 2 3` 这个以空格分隔的数组的数组。

#### 6.3 运算

数字运算

```scss
p {
  width: 1in + 8pt;
}
```

#### 6.4 函数

> SassScript 定义了多种函数，有些甚至可以通过普通的 CSS 语句调用：
>
> ```scss
> p {
>   color: hsl(0, 100%, 50%);
> }
> ```
>
> 编译为
>
> ```css
> p {
>   color: #ff0000; 
> }
> ```

> Sass 函数允许使用关键词参数 (keyword arguments)，上面的例子也可以写成：
>
> ```scss
> p {
>   color: hsl($hue: 0, $saturation: 100%, $lightness: 50%);
> }
> ```
>
> 虽然不够简明，但是阅读起来会更方便。关键词参数给函数提供了更灵活的接口，以及容易调用的参数。关键词参数可以打乱顺序使用，如果使用默认值也可以省缺，另外，参数名被视为变量名，下划线、短横线可以互换使用。

> 通过 [Sass::Script::Functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html) 查看完整的 Sass 函数列表，参数名，以及如何自定义函数。

#### 6.5 插值语句

> 通过 `#{}` 插值语句可以在选择器或属性名中使用变量：
>
> ```scss
> $name: foo;
> $attr: border;
> p.#{$name} {
>   #{$attr}-color: blue;
> }
> ```
>
> 编译为
>
> ```css
> p.foo {
>   border-color: blue; 
> }
> ```
>
> `#{}` 插值语句也可以在属性值中插入 SassScript，大多数情况下，这样可能还不如使用变量方便，但是使用 `#{}` 可以避免 Sass 运行运算表达式，直接编译 CSS。
>
> ```scss
> p {
>   $font-size: 12px;
>   $line-height: 30px;
>   font: #{$font-size}/#{$line-height};
> }
> ```
>
> 编译为
>
> ```css
> p {
>   font: 12px/30px; 
> }
> ```

## 四、指令系统

### 1.@-Rules 与 延伸指令

> ps: 注意力集中于`@extend`与`@mixin` -- liuwy

> Sass 支持所有的 CSS3 @-Rules，以及 Sass 特有的 “指令”（directives）

#### 1.1 导入指令 `@import`

Sass 拓展了 `@import` 的功能，允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

通常，`@import` 寻找 Sass 文件并将其导入，但在以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件。

- 文件拓展名是 `.css`；
- 文件名以 `http://` 开头；
- 文件名是 `url()`；
- `@import` 包含 media queries。

如果不在上述情况内，文件的拓展名是 `.scss` 或 `.sass`，则导入成功。没有指定拓展名，Sass 将会试着寻找文件名相同，拓展名为 `.scss` 或 `.sass` 的文件并将其导入。

> ```scss
> @import "foo.scss";
> ```
>
> 或
>
> ```scss
> @import "foo";
> ```
>
> 都会导入文件 foo.scss，但是
>
> ```scss
> @import "foo.css";
> @import "foo" screen;
> @import "http://foo.com/bar";
> @import url(foo);
> ```
>
> 编译为
>
> ```css
> @import "foo.css";
> @import "foo" screen;
> @import "http://foo.com/bar";
> @import url(foo);
> ```

> Sass 允许同时导入多个文件，例如同时导入 rounded-corners 与 text-shadow 两个文件：
>
> ```scss
> @import "rounded-corners", "text-shadow";
> ```
>
> 导入文件也可以使用 `#{ }` 插值语句，但不是通过变量动态导入 Sass 文件，只能作用于 CSS 的 `url()` 导入方式：
>
> ```scss
> $family: unquote("Droid+Sans");
> @import url("http://fonts.googleapis.com/css?family=\#{$family}");
> ```
>
> 编译为
>
> ```css
> @import url("http://fonts.googleapis.com/css?family=Droid+Sans");
> ```

> 大多数情况下，一般在文件的最外层（不在嵌套规则内）使用 `@import`，其实，也可以将 `@import` 嵌套进 CSS 样式或者 `@media` 中，与平时的用法效果相同，只是这样导入的样式只能出现在嵌套的层中。
>
> 假设 example.scss 文件包含以下样式：
>
> ```scss
> .example {
>   color: red;
> }
> ```
>
> 然后导入到 `#main` 样式内
>
> ```scss
> #main {
>   @import "example";
> }
> ```
>
> 将会被编译为
>
> ```css
> #main .example {
>   color: red;
> }
> ```

#### 1.2 媒体查询指令 `@media`

> Sass 中 `@media` 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 `@media` 嵌套在 CSS 规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 `@media` 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。
>
> ```scss
> .sidebar {
>   width: 300px;
>   @media screen and (orientation: landscape) {
>     width: 500px;
>   }
> }
> ```
>
> 编译为
>
> ```css
> .sidebar {
>   width: 300px; }
>   @media screen and (orientation: landscape) {
>     .sidebar {
>       width: 500px; } }
> ```

> `@media` 的 queries 允许互相嵌套使用，编译时，Sass 自动添加 `and`
>
> ```scss
> @media screen {
>   .sidebar {
>     @media (orientation: landscape) {
>       width: 500px;
>     }
>   }
> }
> ```
>
> 编译为
>
> ```css
> @media screen and (orientation: landscape) {
>   .sidebar {
>     width: 500px; } }
> ```

> `@media` 甚至可以使用 SassScript（比如变量，函数，以及运算符）代替条件的名称或者值：
>
> ```scss
> $media: screen;
> $feature: -webkit-min-device-pixel-ratio;
> $value: 1.5;
> 
> @media #{$media} and ($feature: $value) {
>   .sidebar {
>     width: 500px;
>   }
> }
> ```
>
> 编译为
>
> ```css
> @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
>   .sidebar {
>     width: 500px; } }
> ```

#### 1.3 延伸指令 `@extend`

> 在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。通常会在 HTML 中给元素定义两个 class，一个通用样式，一个特殊样式。假设现在要设计一个普通错误样式与一个严重错误样式，一般会这样写：
>
> ```html
> <div class="error seriousError">
>   Oh no! You've been hacked!
> </div>
> ```
>
> 样式如下
>
> ```css
> .error {
>   border: 1px #f00;
>   background-color: #fdd;
> }
> .seriousError {
>   border-width: 3px;
> }
> ```
>
> 麻烦的是，这样做必须时刻记住使用 `.seriousError` 时需要参考 `.error` 的样式，带来了很多不便：比如加重维护负担，导致 bug，或者给 HTML 添加无语意的样式。

> 使用 `@extend` 可以避免上述情况，告诉 Sass 将一个选择器下的所有样式继承给另一个选择器。
>
> ```scss
> .error {
>   border: 1px #f00;
>   background-color: #fdd;
> }
> .seriousError {
>   @extend .error;
>   border-width: 3px;
> }
> ```
>
> 上面代码的意思是将 `.error` 下的所有样式继承给 `.seriousError`，`border-width: 3px;` 是单独给 `.seriousError` 设定特殊样式，这样，使用 `.seriousError` 的地方可以不再使用 `.error`。
>
> 其他使用到 `.error` 的样式也会同样继承给 `.seriousError`，例如，另一个样式 `.error.intrusion` 使用了 `hacked.png` 做背景，`<div class="seriousError intrusion">` 也同样会使用 `hacked.png` 背景。
>
> ```css
> .error.intrusion {
>   background-image: url("/image/hacked.png");
> }
> ```

##### 1.3.1 `@extend`原理

> `@extend` 的作用是将重复使用的样式 (`.error`) 延伸 (extend) 给需要包含这个样式的特殊样式（`.seriousError`），刚刚的例子：
>
> ```scss
> .error {
>   border: 1px #f00;
>   background-color: #fdd;
> }
> .error.intrusion {
>   background-image: url("/image/hacked.png");
> }
> .seriousError {
>   @extend .error;
>   border-width: 3px;
> }
> ```
>
> 编译为
>
> ```css
> .error, .seriousError {
>   border: 1px #f00;
>   background-color: #fdd; }
> 
> .error.intrusion, .seriousError.intrusion {
>   background-image: url("/image/hacked.png"); }
> 
> .seriousError {
>   border-width: 3px; }
> ```
>
> 当合并选择器时，`@extend` 会很聪明地避免无谓的重复，`.seriousError.seriousError` 将编译为 `.seriousError`，不能匹配任何元素的选择器（比如 `#main#footer` ）也会删除。

##### 1.3.2 延伸复杂的选择器

> Class 选择器并不是唯一可以被延伸 (extend) 的，Sass 允许延伸任何定义给单个元素的选择器，比如 `.special.cool`，`a:hover` 或者 `a.user[href^="http://"]` 等，例如：
>
> ```scss
> .hoverlink {
>   @extend a:hover;
> }
> ```
>
> 同 class 元素一样，`a:hover` 的样式将继承给 `.hoverlink`。
>
> ```scss
> .hoverlink {
>   @extend a:hover;
> }
> a:hover {
>   text-decoration: underline;
> }
> ```
>
> 编译为
>
> ```css
> a:hover, .hoverlink {
>   text-decoration: underline; }
> ```
>
> 与上面 `.error.intrusion` 的例子一样，所有 `a:hover` 的样式将继承给 `.hoverlink`，包括其他使用到 `a:hover` 的样式，例如：
>
> ```scss
> .hoverlink {
>   @extend a:hover;
> }
> .comment a.user:hover {
>   font-weight: bold;
> }
> ```
>
> 编译为
>
> ```css
> .comment a.user:hover, .comment .user.hoverlink {
>   font-weight: bold; }
> ```

##### 1.3.3 多重延伸

> 同一个选择器可以延伸给多个选择器，它所包含的属性将继承给所有被延伸的选择器：
>
> ```scss
> .error {
>   border: 1px #f00;
>   background-color: #fdd;
> }
> .attention {
>   font-size: 3em;
>   background-color: #ff0;
> }
> .seriousError {
>   @extend .error;
>   @extend .attention;
>   border-width: 3px;
> }
> ```
>
> 编译为
>
> ```css
> .error, .seriousError {
>   border: 1px #f00;
>   background-color: #fdd; }
> 
> .attention, .seriousError {
>   font-size: 3em;
>   background-color: #ff0; }
> 
> .seriousError {
>   border-width: 3px; }
> ```
>
> 每个 `.seriousError` 将包含 `.error` 与 `.attention` 下的所有样式，这时，后定义的样式享有优先权：`.seriousError` 的背景颜色是 `#ff0` 而不是 `#fdd`，因为 `.attention` 在 `.error` 之后定义。
>
> 多重延伸可以使用逗号分隔选择器名，比如 `@extend .error, .attention;` 与 `@extend .error;` `@extend.attention` 有相同的效果。

##### 1.3.4 继续延伸

> 当一个选择器延伸给第二个后，可以继续将第二个选择器延伸给第三个，例如：
>
> ```scss
> .error {
>   border: 1px #f00;
>   background-color: #fdd;
> }
> .seriousError {
>   @extend .error;
>   border-width: 3px;
> }
> .criticalError {
>   @extend .seriousError;
>   position: fixed;
>   top: 10%;
>   bottom: 10%;
>   left: 10%;
>   right: 10%;
> }
> ```
>
> 现在，每个 `.seriousError` 选择器将包含 `.error` 的样式，而 `.criticalError` 不仅包含 `.seriousError` 的样式也会同时包含 `.error` 的所有样式，上面的代码编译为：
>
> ```css
> .error, .seriousError, .criticalError {
>   border: 1px #f00;
>   background-color: #fdd; }
> 
> .seriousError, .criticalError {
>   border-width: 3px; }
> 
> .criticalError {
>   position: fixed;
>   top: 10%;
>   bottom: 10%;
>   left: 10%;
>   right: 10%; }
> ```

##### 1.3.5 `@extend-Only` 选择器

> 有时，需要定义一套样式并不是给某个元素用，而是只通过 `@extend` 指令使用，尤其是在制作 Sass 样式库的时候，希望 Sass 能够忽略用不到的样式。
>
> 如果使用普通的 CSS 规则，最后会编译出很多用不到的样式，也容易与其他样式名冲突，所以，Sass 引入了“占位符选择器” (placeholder selectors)，看起来很像普通的 `id` 或 `class` 选择器，只是 `#` 或 `.` 被替换成了 `%`。可以像 class 或者 id 选择器那样使用，当它们单独使用时，不会被编译到 CSS 文件中。
>
> ```scss
> // This ruleset won't be rendered on its own.
> #context a%extreme {
>   color: blue;
>   font-weight: bold;
>   font-size: 2em;
> }
> ```
>
> 占位符选择器需要通过延伸指令使用，用法与 class 或者 id 选择器一样，被延伸后，占位符选择器本身不会被编译。
>
> ```scss
> .notice {
>   @extend %extreme;
> }
> ```
>
> 编译为
>
> ```css
> #context a.notice {
>   color: blue;
>   font-weight: bold;
>   font-size: 2em; }
> ```

### 2.混合指令

#### 2.1 定义混合指令 `@mixin`

> 混合指令的用法是在 `@mixin` 后添加名称与样式，比如名为 `large-text` 的混合通过下面的代码定义：
>
> ```scss
> @mixin large-text {
>   font: {
>     family: Arial;
>     size: 20px;
>     weight: bold;
>   }
>   color: #ff0000;
> }
> ```
>
> 混合也需要包含选择器和属性，甚至可以用 `&` 引用父选择器：
>
> ```scss
> @mixin clearfix {
>   display: inline-block;
>   &:after {
>     content: ".";
>     display: block;
>     height: 0;
>     clear: both;
>     visibility: hidden;
>   }
>   * html & { height: 1px }
> }
> ```

#### 2.2 引用混合样式 `@include`

> 使用 `@include` 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）：
>
> ```scss
> .page-title {
>   @include large-text;
>   padding: 4px;
>   margin-top: 10px;
> }
> ```
>
> 编译为
>
> ```css
> .page-title {
>   font-family: Arial;
>   font-size: 20px;
>   font-weight: bold;
>   color: #ff0000;
>   padding: 4px;
>   margin-top: 10px; 
> }
> ```

> 也可以在最外层引用混合样式，不会直接定义属性，也不可以使用父选择器。
>
> ```scss
> @mixin silly-links {
>   a {
>     color: blue;
>     background-color: red;
>   }
> }
> @include silly-links;
> ```
>
> 编译为
>
> ```css
> a {
>   color: blue;
>   background-color: red; 
> }
> ```

> 混合样式中也可以包含其他混合样式，比如
>
> ```scss
> @mixin compound {
>   @include highlighted-background;
>   @include header-text;
> }
> @mixin highlighted-background { background-color: #fc0; }
> @mixin header-text { font-size: 20px; }
> ```
>
> 混合样式中应该只定义后代选择器，这样可以安全的导入到文件的任何位置。

#### 2.3 参数

> 参数用于给混合指令中的样式设定变量，并且赋值使用。在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。引用指令时，按照参数的顺序，再将所赋的值对应写进括号：
>
> ```scss
> @mixin sexy-border($color, $width) {
>   border: {
>     color: $color;
>     width: $width;
>     style: dashed;
>   }
> }
> p { @include sexy-border(blue, 1in); }
> ```
>
> 编译为
>
> ```css
> p {
>   border-color: blue;
>   border-width: 1in;
>   border-style: dashed; }
> ```

> 混合指令也可以使用给变量赋值的方法给参数设定默认值，然后，当这个指令被引用的时候，如果没有给参数赋值，则自动使用默认值：
>
> ```scss
> @mixin sexy-border($color, $width: 1in) {
>   border: {
>     color: $color;
>     width: $width;
>     style: dashed;
>   }
> }
> p { @include sexy-border(blue); }
> h1 { @include sexy-border(blue, 2in); }
> ```
>
> 编译为
>
> ```css
> p {
>   border-color: blue;
>   border-width: 1in;
>   border-style: dashed; 
> }
> 
> h1 {
>   border-color: blue;
>   border-width: 2in;
>   border-style: dashed; 
> }
> ```

##### 2.3.1 关键词参数

> 混合指令也可以使用关键词参数，上面的例子也可以写成：
>
> ```scss
> p { @include sexy-border($color: blue); }
> h1 { @include sexy-border($color: blue, $width: 2in); }
> ```
>
> 虽然不够简明，但是阅读起来会更方便。关键词参数给函数提供了更灵活的接口，以及容易调用的参数。关键词参数可以打乱顺序使用，如果使用默认值也可以省缺，另外，参数名被视为变量名，下划线、短横线可以互换使用。

##### 2.3.2 参数变量

> 有时，不能确定混合指令需要使用多少个参数，比如一个关于 `box-shadow` 的混合指令不能确定有多少个 'shadow' 会被用到。这时，可以使用参数变量 `…` 声明（写在参数的最后方）告诉 Sass 将这些参数视为值列表处理：
>
> ```scss
> @mixin box-shadow($shadows...) {
>   -moz-box-shadow: $shadows;
>   -webkit-box-shadow: $shadows;
>   box-shadow: $shadows;
> }
> .shadows {
>   @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
> }
> ```
>
> 编译为
>
> ```css
> .shadowed {
>   -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
>   -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
>   box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
> }
> ```

> 参数变量也可以用在引用混合指令的时候 (`@include`)，与平时用法一样，将一串值列表中的值逐条作为参数引用：
>
> ```scss
> @mixin colors($text, $background, $border) {
>   color: $text;
>   background-color: $background;
>   border-color: $border;
> }
> $values: #ff0000, #00ff00, #0000ff;
> .primary {
>   @include colors($values...);
> }
> ```
>
> 编译为
>
> ```css
> .primary {
>   color: #ff0000;
>   background-color: #00ff00;
>   border-color: #0000ff;
> }
> ```

> > You can use variable arguments to wrap a mixin and add additional styles without changing the argument signature of the mixin. If you do so, even keyword arguments will get passed through to the wrapped mixin. For example:
>
> ```scss
> @mixin wrapped-stylish-mixin($args...) {
>   font-weight: bold;
>   @include stylish-mixin($args...);
> }
> .stylish {
>   // The $width argument will get passed on to "stylish-mixin" as a keyword
>   @include wrapped-stylish-mixin(#00ff00, $width: 100px);
> }
> ```
>
> 上面注释内的意思是：`$width` 参数将会传递给 `stylish-mixin` 作为关键词。

### 3.控制指令

> SassScript 提供了一些基础的控制指令，比如在满足一定条件时引用样式，或者设定范围重复输出格式。控制指令是一种高级功能，日常编写过程中并不常用到，主要与混合指令 (mixin) 配合使用，尤其是用在 [Compass](http://compass-style.org/) 等样式库中。

#### 3.1 `@if`

> 当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码：
>
> ```scss
> p {
>   @if 1 + 1 == 2 { border: 1px solid; }
>   @if 5 < 3 { border: 2px dotted; }
>   @if null  { border: 3px double; }
> }
> ```
>
> 编译为
>
> ```css
> p {
>   border: 1px solid; }
> ```
>
> `@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。如果 `@if` 声明失败，Sass 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明，例如：
>
> ```scss
> $type: monster;
> p {
>   @if $type == ocean {
>     color: blue;
>   } @else if $type == matador {
>     color: red;
>   } @else if $type == monster {
>     color: green;
>   } @else {
>     color: black;
>   }
> }
> ```
>
> 编译为
>
> ```css
> p {
>   color: green; }
> ```

#### 3.2 `@for`

> `@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：`@for $var from <start> through <end>`，或者 `@for $var from <start> to <end>`，区别在于 `through` 与 `to` 的含义：*当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值*。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。
>
> ```scss
> @for $i from 1 through 3 {
>   .item-#{$i} { width: 2em * $i; }
> }
> ```
>
> 编译为
>
> ```css
> .item-1 {
>   width: 2em; }
> .item-2 {
>   width: 4em; }
> .item-3 {
>   width: 6em; }
> ```

#### 3.3 `@each`

> `@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。
>
> `@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果，例如：
>
> ```scss
> @each $animal in puma, sea-slug, egret, salamander {
>   .#{$animal}-icon {
>     background-image: url('/images/#{$animal}.png');
>   }
> }
> ```
>
> 编译为
>
> ```css
> .puma-icon {
>   background-image: url('/images/puma.png'); }
> .sea-slug-icon {
>   background-image: url('/images/sea-slug.png'); }
> .egret-icon {
>   background-image: url('/images/egret.png'); }
> .salamander-icon {
>   background-image: url('/images/salamander.png'); }
> ```

#### 3.4 `@while`

> `@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到。例如：
>
> ```scss
> $i: 6;
> @while $i > 0 {
>   .item-#{$i} { width: 2em * $i; }
>   $i: $i - 2;
> }
> .item-6 {
>   width: 12em; }
> 
> .item-4 {
>   width: 8em; }
> 
> .item-2 {
>   width: 4em; }
> ```

### 4.函数指令

> Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用：
>
> 定义函数 `@function`
>
> 返回值 `@return`
>
> ```scss
> $grid-width: 40px;
> $gutter-width: 10px;
> 
> @function grid-width($n) {
>   @return $n * $grid-width + ($n - 1) * $gutter-width;
> }
> 
> #sidebar { width: grid-width(5); }
> ```
>
> 编译为
>
> ```css
> #sidebar {
>   width: 240px; 
> }
> ```
>
> 与 mixin 相同，也可以传递若干个全局变量给函数作为参数。一个函数可以含有多条语句，需要调用 `@return` 输出结果。

> 自定义的函数也可以使用关键词参数，上面的例子还可以这样写：
>
> ```scss
> #sidebar { width: grid-width($n: 5); }
> ```
>
> > 建议在自定义函数前添加前缀避免命名冲突，其他人阅读代码时也会知道这不是 Sass 或者 CSS 的自带功能。
> >
> > 自定义函数与 mixin 相同，都支持 variable arguments
