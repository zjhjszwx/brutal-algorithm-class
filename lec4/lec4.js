function quickSort(array) {                             // O(n^2) ---> O(n log n)
    if(array.length <= 1) {
        return array;
    }
    let [left, right] = partitionRecursion(array[array.length - 1], array.slice(0, array.length-1));               // O(n)
    let sortedLeft = quickSort(left);                   // recursion n ---> log n times
    let sortedRight = quickSort(right);                 // recursion n ---> log n times
    // console.log(left, right);
    return [...sortedLeft, array[array.length - 1], ...sortedRight];   // O(n)
}

function partition(list) {                 // O(n)
    let pivotIndex = 0;
    let smaller = new LinkedList();
    let bigger = new LinkedList();

    for(let cur = list.head; cur != null; cur = cur.next) { // O(n)
        if(cur.data <= array[pivotIndex]) {
            smaller.append(array[i])          // O(n)  ---> O(1)
        } else {
            bigger.append(array[i])           // O(1)
        }
    }
    return [smaller, bigger];
}

function partitionRecursion(pivot, list) {                 // O(n)
    if(list.length <= 0) {
        return [[], []]
    }
    let sliced = list.slice(1);
    let [smaller2, bigger2] = partitionRecursion(pivot, sliced);       // 3
    if(list[0] <= pivot) {
        return [smaller2.concat([list[0]]), bigger2];
    } else {
        return [smaller2, bigger2.concat([list[0]])];
    }
}

console.log(quickSort([2, 1, 1]));  // --> [1, 1], [3], 2
console.log(quickSort([4, 1, 2, 3, 1, 2, 3, 4]));
console.log(quickSort([5, 20, 3, 1, 5, 31, 4]));

