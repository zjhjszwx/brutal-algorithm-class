function countDown(n) {
    console.log(n);
    if (n > 1) {
        countDown(n - 1);
    }
}


// (
//     (f) => { return (n) => { if (n > 1) { f(f)(n - 1); } } }
// )(
//     (f) => { return (n) => { if (n > 1) { f(f)(n - 1); } } }
// )(5);


// (
//     // g === return (n) => { if (n > 1) { f(f)(n - 1); } } }
//     (f) => { return (g) => { return (n) => { return g(g)(f)(n) } } }
// )(
//     (f) => { return (g) => { return (n) => { return g(g)(f)(n) } } }
// )(
//     (g) => (f) => {
//         return (n) => {
//             console.log(n);
//             if (n > 1) {
//                 f(f)(g)(n-1)
//             }
//             return n;
//         }
//     }
// )(5);

// let recursion = (
//     (f) => (g) => (n) => g(g)(f)(n)
// )(
//     (f) => (g) => (n) => g(g)(f)(n)
// )

// recursion(
//     (g) => (f) => (n) => {
//         if (n > 0) {
//             console.log(f(f)(g)(n - 1))
//         }
//         return n;
//     }
// )(5);

function fibonacciOptimized(n, seq) {
    if(n === 0) {
        return [1, [1]]
    }
    if(n === 1) {
        return [1, [1, 1]]
    }
    if(n < seq.length) {
        return [seq[n], seq]
    }
    let [n2, seq2] = fibonacciOptimized(n - 2, seq)
    let [n1, seq1] = fibonacciOptimized(n - 1, seq2)
    seq1.push(n2+n1)
    return [seq1[seq1.length - 1], seq1]
}
console.log(fibonacciOptimized(100, [])[0])