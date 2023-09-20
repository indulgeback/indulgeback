---
title: Java中Arrays的静态方法
date: 2023-09-19
author: liuwy
categories:
 - 技术
tags:
 - Java
 - Arrays
---

### 1.tostring

> 将数组变成字符串的方法

```java
int[] arr = {1,2,3,4,5,6,7,8,9,10};
System.out.println(Arrays.toString(arr)); // [1,2,3,4,5,6,7,8,9,10]
```

### 2.binarySearch

> 二分查找法查找元素
>
> 细节一：二分查找的前提：数组中的元素必须是有序的，数组中的元素必须是升序的
> 细节二：如果要查找的元素是存在的，那么返回的是真实的索引
>
> 但是，如果要查找的元素是不存在的，返回的是：-插入点 - 1

```java
System.out.println(Arrays.binarySearch(arr,10)); // 9
System.out.println(Arrays.binarySearch(arr,2)); // 1
System.out.println(Arrays.binarySearch(arr,20)); // -11
```

### 3.copyOf

> 拷贝数组
>
> 底层使用：System.arraycopy
>
> 实现了深拷贝
>
> 参数一：老数组
>
> 参数二：新数组的长度
>
> 细节一：如果新数组的长度小于老数组，会实现部分拷贝
>
> 细节二：如果新数组的长度大于老数组，会补上默认初始值

```java
int[] newArr1 = Arrays.copyOf(arr,10);
System.out.println(Arrays.toString(newArr1)); // [1,2,3,4,5,6,7,8,9,10]
```

### 4.copyOfRange

> 拷贝数组（指定范围）
>
> 细节：范围左闭右开

```java
int[] newArr2 = Arrays.copyOfRange(arr,0,9);
System.out.println(Arrays.toString(newArr2)); // [1,2,3,4,5,6,7,8,9]
```

### 5.fill

> 填充数组

```java
Arrays.fill(arr,100);
System.out.println(Arrays.toString(arr)); // [100,100,100,100,100,100,100,100,100,100]
```

### 6.sort

> 排序：默认对数据进行升序排序
>
> 底层使用：快速排序法

```java
int[] arr2 = {10,2,3,5,6,1,7,8,4,9};
Arrays.sort(arr2);
System.out.println(Arrays.toString(arr2)); // [1,2,3,4,5,6,7,8,9,10]
```

### 7.重载的sort方法

> 参数一：要排序的数组
>
> 参数二：排序的规则
>
> 细节：只能给引用数据类型的数组进行排序，如果数组是基本数据类型的，需要变成其对应的包装类

```java
Integer[] arr = {10,2,3,5,6,1,7,8,4,9};

// 第二个参数是一个接口，所以我们在调用方法的时候，需要传递这个接口的实现类对象，作为排序的规则
// 但是，这个实现类只会使用一次，所以没有必要去写一个类，直接采取匿名内部类的方式就可以了
// 底层原理：利用插入排序 + 二分查找的方式进行排序的，默认把 0 索引的数据当作是有序的序列，1 索引到最后认为是无序的序列。
// 遍历无序的序列得到里面的每一个元素，假设当前遍历得到的元素是 A 元素
// 把 A 往有序序列中进行插入，在插入的时候，是利用二分查找确定 A 元素的插入点
// 拿着 A 元素，跟插入点的元素进行比较，比较的规则就是 compare 方法的方法体
// 如果方法的返回值是负数，拿着 A 继续跟前面的数据进行比较
// 如果方法的返回值是正数，拿着 A 继续跟后面的数据进行比较
// 如果方法的返回值是 0 ，拿着 A 跟后面的数据进行比较
// 直到能确定 A 的最终位置为止

// compare 方法的形式参数：
// 参数一：o1：表示在无序序列中，遍历得到的每一个元素
// 参数二：o2：有序序列中的元素

// 返回值：
// 负数：表示当前要插入的元素是小的，放在前面
// 正数：表示当前要插入的元素是大的，放在后面
// 0：表示当前要插入的元素跟现在的元素比是一样的，也会放在后面

// 简单理解：
// o1 - o2：升序排列
// o2 - o1：降序排列

Arrays.sort(arr, new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
     return o1 - o2;
    }
});
```
