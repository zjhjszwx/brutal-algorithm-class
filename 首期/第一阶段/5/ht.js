// let a = [1, 2, 3, 4, 2, 2, 5, "xxx"];
// let c = {};
// for (x of a) {
//     if (x in c) {
//         c[x] += 1;
//     } else {
//         c[x] = 1;
//     }
// }
// for (integer in c) {
//     console.log(integer, c[integer]);
// }

// ht = {
//     a: 12,
//     b: 213,
//     fgertg: 123,
//     asdhfb: 123,
// }
// for (let i = 0; i < 10000; i++ ) {
//     ht[i.toString()] = 12312;
// }
// for (k in ht) {
//     console.log(k)
// }

let a = [1, 2, 3, 4, 2, 2, 5, "xxx"];
let unique = {};
for (x of a) {
    if (x in unique) {
    } else {
        unique[x] = null;
    }
}
for (u in unique) {
    console.log(u)
}
