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

这里有一个小小的副作用：`fibonacci`的递归实现是不高效的，`n`变大了之后，会特别慢。而翻译成循环版本之后，效率奇迹般地提高了。这就是所谓的 __动态规划__。很多同学觉得动态规划很难。其实，它不过是将递归翻译成循环的副产物。一旦你理解了递归，动态规划就是很简单的“翻译”而已，因为，__一切递归函数都可以模板式地翻译成循环__。事实上，这个步骤可以用编译器自动完成。所以，假设一个语言的编译器足够聪明，程序员可以总是写递归的实现，然后编译器会自动地动态规划。当然，本文不讲动态规划。同学们如果暂时不理解上一段话，不用深究。

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

现在问题来了，我们破坏了函数原来的接口。记录数列仅仅是一个实现细节，不应该暴露给外层。不然外层可以传入一个错误的数列值，始得我们的函数出错。让我们再来封装一下。
```js
function fibonacciOptimized2(n) {
    let seq = [1, 1];
    function internal(n, seq) {
        if(n < seq.length) {
            return [seq[n], seq]
        }
        let [n2, seq2] = internal(n - 2, seq)
        let [n1, seq1] = internal(n - 1, seq2)
        seq1.push(n2+n1)
        return [seq1[seq1.length - 1], seq1]
    }
    return internal(n, seq)[0];
}
```
这里我们在函数内部定义了一个内部函数，将记录数列这个细节封装了起来。同时代码量也减少了。这就是模组化的力量。

Python、Go 都允许定义内部函数。有些语言不允许，那么你可以将这个函数写在外部。

---------------
Warning: 从这里开始的内容对你日常编程几乎没有任何帮助，除非你的工作是：框架作者、语言作者等底层系统作者。

# 能更简洁吗？
`internal`只在内部被使用，能不能作为一个匿名函数呢？比如
```js
function fibonacciOptimized2(n) {
    let seq = [1, 1];
    return (function(n, seq) {
        if(n < seq.length) {
            return [seq[n], seq]
        }
        let [n2, seq2] = ???(n - 2, seq)    // 但如果是匿名函数，这里放什么呢？
        let [n1, seq1] = ???(n - 1, seq2)
        seq1.push(n2+n1)
        return [seq1[seq1.length - 1], seq1]
    })(n, seq)[0];
}
```

## 一个匿名函数如何引用它自己？
`fibonacciOptimized2`可能过于复杂，我们还是拿`countDown`来举例吧。
```js
function(n) {
    console.log(n);
    if (n > 1) {
        ???(n - 1); // 如何引用自己？
    }
}
```
最简单的方式是将自己作为一参数传进去。
```js
(
    function(self, n) {
        console.log(n);
        if (n > 1) {
            self(self, n - 1);
        }
    }
)(
    function(self, n) {
        console.log(n);
        if (n > 1) {
            self(self, n - 1);
        }
    }
)
```
我们使用简洁一点的语法重写一遍，去掉视觉干扰。
```js
(
    (self, n) => { 
        if (n > 1) { self(self, n - 1); }
    }
)(
    (self, n) => { 
        if (n > 1) { self(self, n - 1); }
    }
)
```
```js
/* 语言小课堂 */
// 在 JS 中，
function(a, b) { return a + b }     // 1
(a, b) => { return a + b }          // 2
(a, b) => ( a + b )                 // 3
(a, b) => a + b                     // 4
// 都是匿名函数的写法。

// 类比 Python 就是
def add(a, b):
    return a + b
lambda a, b: a + b
// 不一样的是，Python的def必须跟名字。匿名必须lambda。

// Python的def和lambda在语义上完全相同。
// 但是JS的箭头函数=>和function函数在语义上略微不同，但是对本文内容没有影响。
```

我们写了重复代码。这也是从小到大计算机教育告诉我们要避免的事情。我们能不能进一步抽象，将代码写的更简洁呢？为了将递归的逻辑和计数器本身的逻辑分开，我们还需要做一件事。首先你需要理解
```js
function add(a, b) {
    return a + b;
}
add(1, 2)
```
可以改写为
```js
function add(a) {
    return function(b) {
        return a + b;
    }
}
add(1)(2)
```
JS、Python、Go、C# 都允许这个写法。定义一个内部函数，然后返回给外层。这个特性叫做闭包（Closure）。

理解了以上操作后，我们可以来改写计数器的实现。
```js
function(self, n) {
    console.log(n);
    if (n > 1) {
        self(self, n - 1);
    }
}
// 改为
function(self) {
    return function(n) {
        console.log(n);
        if (n > 1) {
            self(self)(n - 1);
        }
    }
}
// 给一个名字
let countDown = function(self) {
    return function(n) {
        console.log(n);
        if (n > 1) {
            self(self)(n - 1);
        }
    }
}
// 调用方式为
countDown(countDown)(5);

// 或者写成纯匿名的方式
(
    function(self) {
        return function(n) {
            console.log(n);
            if (n > 1) {
                self(self)(n - 1);
            }
        }
    }
)(
    function(self) {
        return function(n) {
            console.log(n);
            if (n > 1) {
                self(self)(n - 1);
            }
        }
    }
)

// 使用箭头函数重写缩减段落
(
    (self) => (
        (n) => {
            console.log(n);
            if (n > 1) {
                self(self)(n - 1);
            }
        }
    )
)(
    (self) => (
        (n) => {
            console.log(n);
            if (n > 1) {
                self(self)(n - 1);
            }
        }
    )
)

// 去掉console然后写成一行
(
    (self) => ((n) => { if (n > 1) { self(self)(n - 1); } })
)(
    (self) => ((n) => { if (n > 1) { self(self)(n - 1); } })
)
```
```js
let countDown2 = (
    (self) => ((n) => { if (n > 1) { self(self)(n - 1); } })
)(
    (self) => ((n) => { if (n > 1) { self(self)(n - 1); } })
)
// 与
function countDown(n) {
    if (n > 1) {
        countDown(n - 1);
    }
}
// 是一模一样的。
```
到了这一步，你会发现，`self(self)`这一个部分总会存在。这个部分仅仅是为了制造一个递归的`countDown`函数而已，并不是`countDown`自己逻辑的一部分。我们能不能将这一部分抽象出来呢？
```js
// 让我们把`countDown`自己的逻辑抽出来，给一个名字`g`。
// let g = (self) => (n) => { if (n > 1) { self(self)(n - 1); }
// 我们能不能将`g`传入下面这个形式里，然后替换掉函数逻辑部分呢？
(
    (self) => ((n) => { if (n > 1) { self(self)(n - 1); } })
)(
    (self) => ((n) => { if (n > 1) { self(self)(n - 1); } })
)
```
答案是可以的，如下
```js
let recursion = (
    (self) => (g) => (n) => g(g)(self)(n)
)(
    (self) => (g) => (n) => g(g)(self)(n)
)

recursion((g) => (self) => (n) => {
    console.log(n);
    if (n > 1) {
        self(self)(g)(n - 1)
    };
})(5)
```

