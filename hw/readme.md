# 第一周作业
## 1. 矩阵乘法
请实现一个矩阵乘法函数，它带有如下API
```js
function Product(M1: Matrix<W1, H>， M2: Matrix<H, W2>): Matrix<H, H>
```
或者
```js
function Product(M1: Matrix<W, H1>， M2: Matrix<H2, W>): Matrix<W, W>
```
`Matrix`类型的实现可以自定义，通常是二维数组。

```
[[1, 2, 3]
 [4, 5, 6]]
3 x 2 // Width = 3, Height = 2

[[1,2]
 [3,4]
 [5,6]]
2 x 3 // Width =
```

## 2. Shuffle 洗牌
在第一节课中我们讲到了洗牌算法。并且最后展示了一个递归的实现。请你使用一个不同的算法，用递归的方式实现一个`Shuffle`。

实现完成之后，请分析或者统计算法的随机分布以及标准差。分析可以写成注释。

## 3. 链表（附加题）
请使用递归的方式实现链表。
```ts
interface LinkedList {
    length(): number        // 得到链表长度
    append(element)         // 在链表末尾追加元素
    append_head(element)    // 在链表头部追加元素
    insert(element, index)  // 在链表 index-1 和 index 之间插入一个元素
                            // insert(element, 0) 等于 append_head(element)
                            // insert(element, length()) 等于 append(element)
    get(index)              // 得到 index 位的元素
}
```


## 备注
所有代码请写到同一个文件，并且一定要附上 __复杂度分析__ 以及 __测试__。