let t1 = Date.now();
let string = [];
for (let i = 0; i < 3000000; i++) {
    string.push(i.toString());
}    
string = string.join('')
console.log(Date.now() - t1, string.length)
