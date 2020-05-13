function countUp(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

function countUp2(n) {
    if (n > 1) {
        countUp2(n - 1)
    }
    console.log(n);
}

// countUp2(2) // 1 2

// 递归 Recursion（重复发生）
// 归纳法 Reduction（归纳法）具体到一般
// factorial 阶乘
// n!
// 0! = 1
// 1! = 1 x 0! = 1
// 2! = 2 x 1! = 2
// 3! = 3 x 2! = 6
// 4! = 4 x 3! = 24
// 5! = 5 x 4! = 120
// n! = n x (n-1)!

// 数学定义
// n = 0, n! = 1
// n > 0, n! = n x (n-1)!
// n ∈ 非负整数

function factorial(n) {
    if (n === 0) {
        return 1
    }
    return n * factorial(n - 1)
}

function factorialInLoop(n) {
    let results = [1];
    for (let i = 1; i <= n; i++) {
        results.push(i * results[i - 1])
    }
    return results[n];  // results[0]
}

// console.log(factorialInLoop(4));

// 斐波那契
// 1 1 2 3 5 8 13 21 ...
// n = 0 or 1, fib = 1
// n > 1, fib = fib(n-1) + fib(n-2)
// n ∈ 自然数

function fib(n) {
    if (n <= 1) {
        return 1
    }
    return fib(n - 1) + fib(n - 2)
}

function fibInLoop(n) {
    let results = [1, 1]
    for (let i = 2; i <= n; i++) {
        results.push(results[i - 1] + results[i - 2]);
    }
    return results[n];
}

function fibOptimized(n, seq) {
    if (n < seq.length) {
        return [seq[n], seq]
    }
    let [n1, seq1] = fibOptimized(n - 1, seq)
    let [n2, seq2] = fibOptimized(n - 2, seq1)
    seq2.push(n1 + n2)
    return [seq2[n], seq2]
}

function fibOptimized2(n) {
    function internal(n, seq) {
        if (n < seq.length) {
            return [seq[n], seq]
        }
        let [n1, seq1] = internal(n - 1, seq)
        let [n2, seq2] = internal(n - 2, seq1)
        seq2.push(n1 + n2)
        return [seq2[n], seq2]
    }
    return internal(n, [1, 1])[0]
}

function fibOptimized3(n) {
    let seq = [1, 1];
    function internal(n) {
        if (n < seq.length) {
            return seq[n]
        }
        let n1 = internal(n - 1)
        let n2 = internal(n - 2)
        seq.push(n1 + n2)
        return n1 + n2
    }
    return internal(n)
}
// console.log(fibOptimized3(101));
// console.log(fibInLoop(101));

// function fibOptimized4(n) {
//     let seq = [1, 1];
//     return (function(n) {
//         if(n < seq.length) {
//             return seq[n]
//         }
//         let n1 = ???(n-1)
//         let n2 = ???(n-2)
//         seq.push(n1 + n2)
//         return n1 + n2
//     })(n)
// }

// let f = function (self, n) {
//     if (n > 1) {
//         self(self, n - 1)
//     }
//     console.log(n);
// }
// f(f,5)

let countUp3 = (
    function (self) {
        return function (n) {
            if (n > 1) {
                self(self)(n - 1)
            }
            console.log(n);
        }
    }
)(
    function (self) {
        return function (n) {
            if (n > 1) {
                self(self)(n - 1)
            }
            console.log(n);
        }
    }
)

// countUp3(5)

let countUp4 = (
    (self) => ((n) => { if (n > 1) { self(self)(n - 1) } console.log(n); })
)(
    (self) => ((n) => { if (n > 1) { self(self)(n - 1) } console.log(n); })
)
// countUp4(5)

// f = (self) => (n) => { if (n > 1) { self(self)(n - 1) } console.log(n) };
let Rercursion = (
    (self) => (f) => (n) => f(f)(self)(n)
)(
    (self) => (f) => (n) => f(f)(self)(n)
)

let countUp5 = Rercursion(
    (f) => (self) => (n) => {
        if (n > 1) {
            self(self)(f)(n - 1)
        };
        console.log(n);
    }
)
// countUp5(10);


let fibR = Rercursion(
    (f) => (self) => (n) => {
        if (n <= 1) {
            return 1
        }
        return self(self)(f)(n - 1) + self(self)(f)(n - 2)
    }
)
// console.log(fibR(10));

// let fibR = Rercursion2(
//     (me) => (n) => {
//         if (n <= 1) {
//             return 1
//         }
//         return me(n - 1) + me(n - 2)
//     }
// )
// me === function(n) {
//     if (n <= 1) {
//         return 1
//     }
//     return me(n - 1) + me(n - 2)
// }

// Y-Combinator
// Fix Point
// 1 = factorial(1)
// 1 是 factorial 的不动点
// f = R(f)


