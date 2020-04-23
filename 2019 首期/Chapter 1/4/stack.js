// b.js
let operations = {
    "+": function(a, b) {
        return a + b
    },
    "-": function(a, b) {
        return a - b
    },
    "*": function(a, b) {
        return a * b
    },
    "x": function(a, b) {
        return a * b
    },
    "/": function(a, b) {
        return a / b
    },
}

// 用数据封装行为

// a.js
function compute(input, operations) {
    // for x in y, index/key
    // for x of y, value
    while( input.length > 1) {
        let num1 = parseFloat(input[0]);  // pop
        let num2 = parseFloat(input[2]);  // pop
        let op = input[1];  // pop
        let f = operations[op];
        if (f === undefined) {
            throw "!"
        }
        input[2] = f(num1, num2); // push
        input = input.slice(2)
    }
    return input[0]
}

console.log(compute(["1", "+", "100", "x", "-2", "/", "3"], operations))

// 1 stack
// 2 stacks
// Binary Tree 二叉树

/*
["1", "+", "100", "*", "-2", "/", "3"]
["101", "*", "-2", "/", "3"]
["-202", "/", "3"]
["-67.3333"]
*/
