//迭代的方式链表后序遍历
class LinkedList {
  constructor() {
    this.head = null;
    this._length = 0;
  }

  // 得到链表长度
  length() {
    return this._length;
  }

  // 在链表末尾追加元素
  append(data) {
    if (!this.head) {
      this.head = new Node(data);
    } else {
      this.head.append(data);
    }
    this._length += 1;
  }
  getLastLoop() {
    let length = this._length;
    let j = 1;
    let p = this.head;
    while (length > 0) {
      // console.log(length, j);
      if (length === j) {
        // console.log(p.data);
        p = this.head;
        length--;
        j = 1;
        continue;
      }
      if (p.next) {
        p = p.next;
        j++;
      } else {
        length--;
      }
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // Node
  }
  append(data) {
    if (this.next) {
      return this.next.append(data);
    }
    this.next = new Node(data);
  }
}

let list = new LinkedList();
list.append(1);
list.append(4);
list.append(5);
list.append(6);

console.log(list.getLastLoop()); // 6 5 4 1

//2.可中途中断的树遍历===============================================================================
// binarySearch tree
class Tree {
  constructor(ele) {
    this.ele = ele;
    this.right = null;
    this.left = null;
  }

  async traversal(type = "in", func) {
    //如果函数返回 true 则继续执行。如果返回 false，则停止遍历。
    let flag = await func();
    if (!flag) {
      return;
    }
    if (type === "pre") {
      console.log(this.ele);
    }
    this.left && this.left.traversal(type, func);
    if (type === "in") {
      console.log(this.ele);
    }
    this.right && this.right.traversal(type, func);
    if (type === "post") {
      console.log(this.ele);
    }
  }

  iter(type = "in") {
    let treeArray = getTreeArray(this, type, []) || [];
    let iterArray = treeArray[Symbol.iterator]();
    return iterArray;
  }
}

function add(tree, ele) {
  if (!tree) {
    return tree;
  }

  if (tree.ele < ele) {
    if (tree.right) {
      add(tree.right, ele);
    } else {
      tree.right = new Tree(ele);
      return;
    }
  } else {
    if (tree.left) {
      add(tree.left, ele);
    } else {
      tree.left = new Tree(ele);
      return;
    }
  }
}

//获取tree的节点顺序
function getTreeArray(tree, type = "in", array) {
  if (!tree) {
    return;
  }
  if (type === "pre") {
    array.push(tree.ele);
  }
  getTreeArray(tree.left, type, array);
  if (type === "in") {
    array.push(tree.ele);
  }
  getTreeArray(tree.right, type, array);
  if (type === "post") {
    array.push(tree.ele);
  }

  return array;
}

let tree = new Tree(4);
add(tree, 2);
add(tree, 1);
add(tree, 3);
add(tree, 6);
add(tree, 5);
add(tree, 7);

function timer(wait = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, wait);
  });
}

// tree.traversal('pre', timer);
// console.log(getTreeArray(tree, 'in', []));

// let iterTree = tree.iter("pre"); // 哪一种顺序
// console.log(iterTree.next());
// console.log(iterTree.next());
// console.log(iterTree.next());
// console.log(iterTree.next());
// console.log(iterTree.next());
// console.log(iterTree.next());
// console.log(iterTree.next());

//3.更快的快排====================================================================================
function partition(arr, low, high) {
  let i = low - 1;
  //   let pivot = arr[Math.floor(high / 2)];
  let pivot = arr[high];

  for (let j = low; j < high; j++) {
    // O(n)
    if (arr[j] <= pivot) {
      i = i + 1;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}

function quickSort(arr, low, high) {
  let call_stack = [{ arr, low, high }];
  while (call_stack.length > 0) {
    let { arr, low, high } = call_stack.pop();
    if (low < high) {
      let pi = partition(arr, low, high);
      call_stack.push({ arr, low, high: pi - 1 });
      call_stack.push({ arr, low: pi + 1, high });
    }
  }
  return arr;
}
// let arr = [7, 2, 5, 1, 5, 7, 4, 1, 8, 3];
// console.log(quickSort(arr, 0, arr.length - 1));
//正序
function f1(size) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(i);
  }
  return array;
}
//倒序
function f2(size) {
  let array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}
//乱序
function f3(size) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * size));
  }
  return array;
}
function performance(func) {
  let time = new Date();
  func();
  let timeSpend = new Date() - time;
  return timeSpend;
}

let size = 50000;
let a1 = f1(size),
  a2 = f2(size),
  a3 = f3(size);
console.log(
  performance(() => {
    quickSort(a1, 0, a1.length - 1);
  })
);
console.log(
  performance(() => {
    quickSort(a2, 0, a2.length - 1);
  })
);
console.log(
  performance(() => {
    quickSort(a3, 0, a3.length - 1);
  })
);
// 2156 1687 5

//1.都是O(n * logn) quick-sort要比merge-sort快吗?
//快排要比归并快. 如果都是n * logn的话, 快速排序的空间复杂是O(1), 归并排序空间复杂度是O(n), 快速排序内存操作的时间比较少

//2.如何让快排不受影响?
// 每次pivot选取一个中间的值,这样的话就不会出现极端情况
// 选取之后 402 399 186
