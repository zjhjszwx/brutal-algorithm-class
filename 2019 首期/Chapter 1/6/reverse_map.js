let data = {
    g1: [1,2,3],
    g2: [2],
    g3: [3],
}

// 反向映射
function reverseMap(data) {
    let reversed = {};
    for (let k in data) {
        for (let ele of data[k]) {
            if (ele in reversed) {
                reversed[ele].push(k);
            } else {
                reversed[ele] = [k];
            }    
        }
    }
    return reversed;
}

console.log(reverseMap(data));
