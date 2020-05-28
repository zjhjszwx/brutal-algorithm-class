function binarySearch(array, ele) {
    if(array.length === 0) {
        return false;
    }
    let m = Math.floor(array.length / 2)
    if(array[m] === ele) {
        return true;
    }
    if(ele > array[m]) {
        return binarySearch(array.slice(m+1), ele)
    } else {
        return binarySearch(array.slice(0, m), ele)
    }
}

console.log(binarySearch([0,3,4,10,11,12], 0));
console.log(binarySearch([0,3,4,10,11,12], 13));
