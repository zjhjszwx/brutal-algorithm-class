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
