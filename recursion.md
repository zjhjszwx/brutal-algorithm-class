递归（Recursion）作为大多数数据结构和算法的思维模型，同学们需要深入理解。本文从数学以及函数式编程的角度，深入讲解递归。

本文使用 JavaScript 举例子，但只会用到几乎所有语言都有的功能。所以你可以容易地将代码翻译成 Python、C、C++、Go 或者其他语言。

__希望同学们跟着文章，在编程环境中编写。__

# 最简单的递归：计数器
首先看这个函数
```js
// n: Int
function countDown(n) {
    console.log(n);
    if (n > 1) {
        countDown(n - 1);
    }
}
```
这是一个简单的递归函数，从 n 数到 1。
```js
countDown(5)
```
打印
```
5
4
3
2
1
```
最简单地理解，你可以认为递归（Recursion）是循环迭代（Loop & Iteration）的函数式写法。
```js
function countDownInLoop(n) {
    for(let i = n; i > 1; i--) {
        console.log(n);
    } 
}
```
实现了一摸一样的效果。

现在同学们需要问自己：
1. 什么样的函数可以同时有循环的写法和递归的写法？
2. 在上述例子里，循环写法更简短也更快。什么情况下会选择递归写法呢？

__第一个问题：__ 简单地讲，如果一个循环每一个步骤干的事情都一摸一样，只是输入数据越来越接近结束条件，那么就可以用递归方式重写。从数学上讲，满足归纳法（Reduction）的都可以用递归（递减归纳）实现。Recursion 的英文本意是“重复发生”。“递归”这个翻译是意译，而不是直译。

__第二个问题：__ 当一个函数的控制流变得发杂之后，递归写法通常比循环写法更简洁也更易懂。因为递归要求程序员将部分逻辑封装为函数，而不是“散装”在 For Loop 或者 While Loop 里。这就是软件工程的模组化思维。至于运行效率，这是一个优化问题，与递归还是循环没有因果关系。

# 更复杂一点的递归函数
```js
// 阶乘 n!
function factorial(n) {
    if( n === 0 ) {
        return 1
    }
    return n * factorial(n-1)
}

function factorialInLoop(n) {
    let product = 1
    for(let i = 1; i <= n; i++) {
        product = product * i
    }
    return product
}
```
这里我们可以有两个观察：
1. 阶乘和计数器在递归形式下，几乎没有区别。但是其循环形式却差很多。
2. 这里的循环实现已经开始比递归复杂了。不仅仅是代码量更多，理解逻辑步骤也变得更费脑了。

# 再复杂一点的递归
```js
// 斐波那契数列
// 1 1 2 3 5 8 ...
function fibonacci(n) {
    if(n === 0 || n === 1) {
        return 1
    }
    return fibonacci(n - 2) + fibonacci(n - 1)
}

function fibonacciInLoop(n) {
    let sequence = [1, 1];
    if( n < sequence.length ) {
        return sequence[n]
    }
    for(let i = sequence.length; i <= n; i++ ) {
        sequence.push(sequence[i - 2] + sequence[i - 1])
    }
    return sequence[n];
}
```
你会发现，如果递归函数调用自己两次，它的循环版本就更加复杂了，而且这个转变更加不直接明了。

这里有一个小小的副作用：`fibonacci`的递归实现是不高效的，`n`变大了之后，会特别慢。而翻译成循环版本之后，效率奇迹般地提高了。这就是所谓的 __动态规划__。很多同学觉得动态规划很难。其实，它不过是将递归翻译成循环的副产物。一旦你理解了递归，动态规划就是很简单的“翻译”而已，因为，__一切递归函数都可以模板式地翻译成循环__。事实上，这个步骤可以用编译器自动完成。所以，假设一个语言的编译器足够聪明，程序员可以总是写递归的实现，然后编译器会自动地动态规划。

当然，本文不讲动态规划。同学们如果暂时不理解上一段话，不用深究。

但是上文讲到，运行效率是一个优化问题，与递归还是循环没有因果关系。我们如何优化递归版本的`fibonacci`呢？

我们可以借鉴`fibonacciInLoop`，将数列存起来，这样就可以避免很多重复运算。
```js
function fibonacciOptimized(n, seq) {
    if(n === 0) {
        return [1, [1]]
    }
    if(n === 1) {
        return [1, [1, 1]]
    }
    if(n < seq.length) {
        return [seq[n], seq]
    }
    let [n2, seq2] = fibonacciOptimized(n - 2, seq)
    let [n1, seq1] = fibonacciOptimized(n - 1, seq2)
    seq1.push(n2+n1)
    return [seq1[seq1.length - 1], seq1]
}
```
现在
```js
fibonacciOptimized(100, [])
fibonacciInLoop(100)
```
几乎一样快了。
