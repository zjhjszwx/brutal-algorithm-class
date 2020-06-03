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
