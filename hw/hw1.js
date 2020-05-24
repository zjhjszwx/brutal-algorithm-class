//1.矩阵乘法
function Product(M1, M2) {
  let h1 = M1.length;
  let w1 = M1[0].length;
  let result = [];
  for (let i = 0; i < h1; i++) {
    //循环 h1次
    let row = [];
    for (let j = 0; j < h1; j++) {
      //循环 h1次
      let sumArray = [];
      for (let t = 0; t < w1; t++) {
        //循环 w1次
        sumArray.push(M1[i][t] * M2[t][j]);
      }
      let sum = sumArray.reduce((a, b) => a + b);
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}
// 时间复杂度 O(n^3)

//Test
function equal(array1, array2) {
  if (array1.length !== array2.length) {
    return "not equal";
  }
  if (array1.length === 0) {
    return true;
  }
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

// console.log(equal([], [])); //true
// console.log(
//   equal(
//     [
//       [2, 1],
//       [4, 3],
//     ],
//     [
//       [2, 1],
//       [4, 1],
//     ]
//   )
// ); //false
// console.log(
//   equal(
//     [
//       [2, 1],
//       [4, 3],
//     ],
//     [
//       [2, 1],
//       [4, 3],
//     ]
//   )
// ); //true

//Test
let M1 = [
  [1, 2, 3],
  [4, 5, 6],
];
let M2 = [
  [7, 8],
  [9, 10],
  [11, 12],
];

// console.log(
//   equal(Product(M1, M2), [
//     [58, 64],
//     [139, 154],
//   ])
// ); //true

// console.log(
//   equal(
//     Product(
//       [
//         [1, 2, 3],
//         [4, 5, 6],
//       ],
//       [
//         [1, 2],
//         [3, 4],
//         [5, 6],
//       ]
//     ),
//     [
//       [22, 28],
//       [49, 64],
//     ]
//   )
// ); //true

//============================================
//2.洗牌算法
function shuffle(array) {
  if (array.length <= 1) {
    return array;
  }
  let [l, r] = split(array);
  let shuffledL = shuffle(l); // 2 * log(n/2)
  let shuffledR = shuffle(r); // 2 * log(n/2)

  return shuffleMerge(shuffledL, shuffledR); // n
}
// 复杂度 O(n * logn)

function shuffleMerge(L, R) {
  function recursion(shuffled, l, r) {
    if (l.length === 0) {
      return shuffled.concat(r);
    }
    if (r.length === 0) {
      return shuffled.concat(l);
    }
    if (Math.random() > 0.5) {
      shuffled.push(l[0]);
      return recursion(shuffled, l.slice(1), r);
    } else {
      shuffled.push(r[0]);
      return recursion(shuffled, l, r.slice(1));
    }
  }
  return recursion([], L, R);
}
// console.log(shuffleMerge([1, 2, 3], [4, 5, 6]));

function split(array) {
  let middle = Math.floor(array.length / 2);
  let l = array.slice(0, middle);
  let r = array.slice(middle);
  return [l, r];
}
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(split(array));

// console.log(shuffle(array));

//统计每一个数字在每一个位置出现的次数
function count(f, M) {
  let results = [];
  for (let i = 0; i < M; i++) {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let f_result = f ? f(array) : array;
    results.push(f_result);
  }
  let stats = [];
  for (let i = 0; i < 10; i++) {
    stats.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  for (let result of results) {
    for (let i = 0; i < result.length; i++) {
      stats[i][result[i] - 1] += 1;
    }
  }
  return stats;
}
//获取标准差
function sd(array, avg) {
  let sum = 0;
  for (const row of array) {
    for (const num of row) {
      sum += Math.abs(num - avg) * Math.abs(num - avg);
    }
  }
  return Math.sqrt(sum / (avg / 10));
}

function getSd(m) {
  return sd(count(shuffle, m), m / 10);
}

// console.log(getSd(10000)); //184

//============================================
class LinkedList {
  constructor() {
    this.head = null;
    this._length = 0;
  }

  // 得到链表长度
  // O(1)
  length() {
    return this._length;
  }

  // N --> O(n)
  // 在链表末尾追加元素
  append(data) {
    if (!this.head) {
      this.head = new Node(data);
    } else {
      this.head.append(data);
    }
    this._length += 1;
  }
  // 在链表头部追加元素
  append_head(data) {
    let newHead = new Node(data);
    newHead.next = this.head;
    this.head = newHead;
    this._length += 1;
  }

  // 在链表 index-1 和 index 之间插入一个元素
  // insert(element, 0) 等于 append_head(element)
  // insert(element, length()) 等于 append(element)
  insert(element, index) {
    if (index === 0) {
      this.append_head(element);
    } else if (index === this._length) {
      this.append(element);
    } else {
      this.head.insert(element, index - 1);
      this._length += 1;
    }
  }

  // 得到 index 位的元素
  get(index) {
    if (index >= this.length()) {
      throw Error("not found");
    }
    return this.head.get(index);
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // Node
  }

  insert(data, index) {
    // console.log("index", data, index, this.data);
    if (index === 0) {
      const next = this.next;
      this.next = new Node(data);
      this.next.next = next;
      return true;
    }
    return this.next.insert(data, index - 1);
  }

  append(data) {
    if (this.next) {
      return this.next.append(data);
    }
    this.next = new Node(data);
  }

  get(index) {
    if (index === 0) {
      console.log("get index", this.data);
      return this.data;
    }
    return this.next.get(index - 1);
  }
}

let list = new LinkedList();
list.append(1);
list.append_head(4);
list.append_head(5);
list.insert(3, 2);
list.insert(2, 2);

// 5 4 2 3 1
list.get(0);
list.get(1);
list.get(2);
list.get(3);
list.get(4);

console.log("len", list.length());
