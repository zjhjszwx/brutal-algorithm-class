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
