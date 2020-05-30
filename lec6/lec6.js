class BinaryTree {
    constructor(ele) {
        this.visited = false; // 1 * N
        this.data = ele
        this.left = null;
        this.right = null;
    }
}


function add(tree, ele) {
    if (!tree) {
        return;
    }
    if (ele > tree.data) {
        if (!tree.right) {
            tree.right = new BinaryTree(ele);
            return;
        }
        add(tree.right, ele);
    } else {
        if (!tree.left) {
            tree.left = new BinaryTree(ele);
            return;
        }
        add(tree.left, ele);
    }
}


function DFS_PRE(tree) {
    let stack = [tree];
    process.stdout.write(`pre loop: `);
    while (stack.length > 0) {
        let t = stack.pop();    // 函数调用
        if (!t) {
            continue;
        }
        process.stdout.write(`${t.data} `);
        stack.push(t.right)      // 函数调用
        stack.push(t.left)       // 函数调用
    }
    console.log();
}

function DFS_POST(tree) {
    let visited = [];              // n extra space, visited set
    let stack = [tree];
    process.stdout.write(`post loop: `);
    while (stack.length > 0) {
        let t = stack.pop();    // 函数调用
        if (!t) {
            continue;
        }
        // process.stdout.write(`${t.data} `);
        visited.push(t.data)
        stack.push(t.left)       // 函数调用
        stack.push(t.right)      // 函数调用
    }
    for (let i = visited.length - 1; i >= 0; i--) {
        process.stdout.write(`${visited[i]} `);
    }
    console.log();
}

function DFS_PAIR(tree) {
    let stack = [tree];
    if (tree) {
        console.log(tree.data);
    }
    while (stack.length > 0) {
        let t = stack.pop();
        if (t.left) {
            console.log(t.left.data);
            stack.push(t.left)
        }
        if (t.right) {
            console.log(t.right.data);
            stack.push(t.right)
        }
    }
}

function DFS(tree, order) {
    function f(tree, order) {
        if (!tree) {
            return;
        }
        if (order === 'pre') {
            process.stdout.write(`${tree.data} `);
        }
        f(tree.left, order);
        if (order === 'in') {
            process.stdout.write(`${tree.data} `);
        }
        f(tree.right, order);
        if (order === 'post') {
            process.stdout.write(`${tree.data} `);
        }
    }
    process.stdout.write(`${order}: `);
    f(tree, order)
    console.log();
}


function BFS(tree) {
    let Q = [tree];
    process.stdout.write(`bfs: `);
    while (Q.length > 0) {
        let t = Q.shift();    // 函数调用
        if (!t) {
            continue;
        }
        process.stdout.write(`${t.data} `);
        Q.push(t.left)       // 函数调用
        Q.push(t.right)      // 函数调用
    }
    console.log();
}

function FS(tree, deque) {
    deque.push(tree);
    process.stdout.write(`FS: `);
    while (deque.length > 0) {
        let t = deque.pop();    // 函数调用
        if (!t) {
            continue;
        }
        process.stdout.write(`${t.data} `);
        deque.push(t.left)       // 函数调用
        deque.push(t.right)      // 函数调用
    }
    console.log();
}


let tree = new BinaryTree(4);
add(tree, 2);
add(tree, 6);
add(tree, 1);
add(tree, 3);
add(tree, 5);
add(tree, 7);
// DFS_PRE(tree);
// DFS_POST(tree);
// console.log('---------------------')
// DFS(tree, 'pre');
// DFS(tree, 'post');
// DFS(tree, 'in');
// BFS(tree)

// class Q extends Array {
//     pop() {
//         return super.shift()    // shift === pop head
//     }
// }

// class Stack extends LinkedList {
//     pop() {
//         return super.pop_tail();
//     }
// }

// class Queue extends LinkedList {
//     pop() {
//         return super.pop_head();
//     }
// }

// FS(tree, new Stack())       // DFS
// FS(tree, new Queue())       // BFS


function DFS_LOOP(tree, f) {
    process.stdout.write(`Func in Loop: `);
    let order = [[f, tree]];
    while (order.length) {
        let [f, t] = order.pop()
        f(t, order);
    }
    console.log();
}
DFS(tree, 'pre')
DFS(tree, 'post')
DFS(tree, 'in')

DFS_LOOP(tree, function f(tree, order) {
    if (!tree) {
        return;
    }
    order.push([f, tree.right]);
    order.push([() => {
        process.stdout.write(`${tree.data} `)
    }]);
    order.push([f, tree.left]);
});

