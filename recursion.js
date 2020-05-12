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
//     (f) => (g) => (n) => g(f)(g)(n)
// )(
//     (f) => (g) => (n) => g(g(f)(g))(n)
// )

// recursion(
//     (f) => (g) => (n) => {
//         console.log(n);

//         if (n > 0) {
//             f(f)(g)(n - 1)
//         }
//         return n;
//     }
// )(5);
let recursion = (
    (self) => (g) => (n) => g(g)(self)(n)
)(
    (self) => (g) => (n) => g(g)(self)(n)
)

recursion((g) => (self) => (n) => {
    console.log(n);
    if (n > 1) {
        self(self)(g)(n - 1)
    };
})(5)

