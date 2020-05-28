/*

洗牌算法

几乎每一种排序算法都可以经过一点点改动成为洗牌算法。上课时我们讲了基于 Insertion 插入的洗牌算法。其实名字是 Fisher Yate Shuffling 算法。

这次示例代码展示基于 Quick Sort 快排的洗牌算法。

需要注意的是，基于插入的洗牌时间复杂度变成了 Θ(n)，而基于快排的洗牌时间复杂度变成了 Θ(n * logn)

你能参透其中缘由吗？

*/

function QuickShuffle(array) {
    if(array.length <= 1) {
        return array
    }
    // 随机挑一个数作为交换点
    // 注意，快排本身可以选择任何一个数，比如固定选第一个数，但是洗牌必须随机选择。
    let i = Math.floor(Math.random() * array.length);
    
    // 这里为了思路清晰，易于学习，我选择每次调用更多的内存。但是，快速的实现可以使用两个游标 i、j来进行 swap 交换。
    let left = [];
    let right = [];
    for(let n of [...array.slice(0, i), ...array.slice(i+1)]) {
        // 之所以时间复杂度变成了 n * logn，是因为这里左右各分一半，所以只会递归 logn 次。
        if( Math.random < 0.5) {
            left.push(n)
        } else {
            right.push(n)
        }
    }
    return [...QuickShuffle(left), array[i], ...QuickShuffle(right)];
}

console.log(QuickShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(QuickShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(QuickShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(QuickShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(QuickShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));

// 方差分析我就不写了，想必大家都会。不会的请复习第一课。
