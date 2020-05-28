// Θ(logn)，每次递归 O(1),递归 n 次。
function binarySearch(array, ele) {
    if (array.length === 0) {
        return false;
    }
    let m = Math.floor(array.length / 2)
    if (array[m] === ele) {
        return true;
    }
    if (ele > array[m]) {
        return binarySearch(array.slice(m + 1), ele)
    } else {
        return binarySearch(array.slice(0, m), ele)
    }
}

function binarySearch2(array, ele) {
    function internal(array, ele, l, r) {
        if ((r - l) === 0) {
            return false;
        }
        let m = Math.floor((r - l) / 2) + l
        if (array[m] === ele) {
            return true;
        }
        if (ele > array[m]) {
            return internal(array, ele, m + 1, r)
        } else {
            return internal(array, ele, l, m)
        }
    }
    return internal(array, ele, 0, array.length)
}

function binarySearchLoop(array, ele) {
    let l = 0;
    let r = array.length;
    while( (r - l) > 0 ) {
        let m = Math.floor((r - l) / 2) + l
        if (array[m] === ele) {
            return true;
        }
        if (ele > array[m]) {
            l =  m + 1;
        } else {
            r = m;
        }
    }
    return false;
}

// console.log(binarySearchLoop([0, 1, 2], 0) === binarySearch([0, 1, 2], 0));
// console.log(binarySearchLoop([0,3,4,10,11,12], 0) === binarySearch([0,3,4,10,11,12], 0));
// console.log(binarySearchLoop([0,3,4,10,11,12], 13) === binarySearch([0,3,4,10,11,12], 13));

class BinaryTree {
    constructor(ele) {
        this.data = ele
        this.left = null;
        this.right = null;
    }
}

function add(tree, ele) {
    if(!tree) {
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

function print(tree) {
    // console.log(tree);
    if(!tree) {
        return;
    }
    // console.log(tree.ele);   // pre order 先序
    print(tree.left);
    console.log(tree.data);      // in order 中序
    print(tree.right);
    // console.log(tree.data);   // post order 后序
}

// let tree = new BinaryTree(10);
// add(tree, 10);
// add(tree, 11);
// add(tree, 100);
// add(tree, 36);
// add(tree, 5);
// add(tree, 4);
// add(tree, 0);
// print(tree);

function countDonw(n) {
    console.log(n);
    if (n > 1) {
        countDonw(n - 1)
    }
}

countUp2(10);
