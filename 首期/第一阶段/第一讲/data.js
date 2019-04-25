function matrixMul(a, b) {
    mat = []
	// for i, row := range a { // i = 0, 1
	// 	mat = append(mat, []int{})
	// 	for j := range b[0] { // j = 0 1 2
	// 		num := vectorDot(row, getCol(b, j))
	// 		mat[i] = append(mat[i], num)
	// 	}
    // }
    // objs
    // array = ["asdasd", 100]
    for( let i in a ) {
        row = a[i];
        // console.log(i)
        mat.push([]);
        for( let j in b[0]) {
            num = vectorDot(row, getCol(b, j));
            // console.log(mat, i)
            mat[i].push(num);
        } 
    }
	return mat
}

function vectorDot(v1, v2) {
    sum = 0;
    for(let i = 0; i < v1.length; i++) {
        sum += v1[i] * v2[i]
    }
    return sum
}

function getCol(m, j) {
    c = []
    for (i in m) {
        c.push(m[i][j])
    }
    return c
}

console.log(matrixMul([[1,2],[4,5]], [[1,2],[4,5]]))
