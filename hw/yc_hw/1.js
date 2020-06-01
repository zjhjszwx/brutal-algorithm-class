function str(a, b, c) {
  while (true) {
    let num = a.indexOf(b);
    if (num > -1) {
      let a1 = a.slice(0, num);
      let a2 = a.slice(num + b.length);
      a = a1 + c + a2;
    } else {
      return a;
    }
  }
}

// console.log(str("aabbccbb", "bb", "eee"));
console.log(str("", "", "eee"));
