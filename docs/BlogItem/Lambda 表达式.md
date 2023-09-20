---
title: Lambda 表达式
date: 2023-09-19
author: liuwy
categories:
 - 专题
tags:
 - Java
 - Lambda
---

### 1.Lambda表达式的标准格式

> Lambda表达式是 JDK8 开始后的一种新语法形式

```java
// 使用匿名内部类，未使用 Lambda 表达式
Arrays.sort(arr, new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
     return o1 - o2;
    }
});

// 使用了 Lambda 表达式
Arrays.sort(arr, (Integer o1, Integer o2) -> {
    return o1 - o2;
});
```

> 注意点
>
> - Lambda 表达式可以用来简化匿名内部类的书写
>
> - Lambda 表达式只能简化函数式接口的匿名内部类的写法
>
> - 函数式接口：有且仅有一个抽象方法的接口叫做函数式接口，接口上方可以加@FunctionalInterface 注解

### 2.Lambda 表达式的具体使用场景

```java
public class LambdaDemo2 {

    public static void main(String[] args) {

        // 1. 利用匿名内部类的形式去调用下面的方法
        // 调用一个方法的时候，如果方法的形参是一个接口，那么我们要传递这个接口的实现类对象
        // 如果实现类对象只要用到一次，就可以用匿名内部类的形式进行书写

        method(new Swim() {
            @Override
            public void swimming() {
                System.out.println("正在游泳~~");
            }
        });

        // 2. 利用 Lambda 表达式进行改写
        method(() -> {
            System.out.println("正在游泳~~");
        });

    }

    public static void method(Swim s) {
        s.swimming();
    }
}

@FunctionalInterface // 可以判断是否为函数式接口：是否为只有一个抽象方法的接口
interface Swim {
    public abstract void swimming();
}
```

### 3.Lambda 表达式的省略规则

> 1.如果只有一个参数，参数类型可以省略不写，同时 ( ) 也可以省略
>
> 2.多个参数，如果顺序正确，类型也可以不写
>
> 3..如果 Lambda 表达式的方法体只有一行，大括号，分号，return 可以省略不写，需要同时省略

### 4.Lambda 表达式使用示例

```java
// 按字符串长度进行排序
String[] arr = {"a", "aaa", "aa", "aaaa"};

Arrays.sort(arr, (o1, o2) -> {
return o1.length() - o2.length();
});

System.out.println(Arrays.toString(arr));
```
