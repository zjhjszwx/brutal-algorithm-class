/*

第一次作业的范例代码

*/

function Product(matrix1, matrix2) {
    // Check if matrix1 and matrix 2 has the correct shape
    // This step can be skipped

    let result = new Array(matrix1.length);
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = new Array(matrix2[0].length);
        for (let j = 0; j < matrix2[0].length; j++) {
            result[i][j] = dotProduct(row(matrix1, i), col(matrix2, j));
        }
    }
    return result;
}

function dotProduct(vector1, vector2) {
    let sum = 0;
    for (let i = 0; i < vector1.length; i++) {
        sum += vector1[i] * vector2[i]
    }
    return sum;
}

// get the i-th row of a matrix
function row(matrix, i) {
    return matrix[i]
}

// get the i-th column of a matrix
function col(matrix, i) {
    let col = new Array(matrix.length);
    for (let j = 0; j < matrix.length; j++) {
        col[j] = matrix[j][i];
    }
    return col;
}


function equal(m1, m2) {
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m1[i].length; j++) {
            if (m1[i][j] !== m2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function test(name, f) {
    console.log(name);
    console.log('    ', f())
}

test('test 1', () => {
    return equal(
        Product(
            [
                [1],
                [2],
                [3],
            ],
            [
                [1, 2, 3]
            ]
        ),
        [
            [1, 2, 3],
            [2, 4, 6],
            [3, 6, 9]
        ]
    )
})

test('test 2', () => {
    return equal(
        Product(
            [
                [1, 2, 3]
            ],
            [
                [1],
                [2],
                [3],
            ],
        ),
        [
            [36]
        ]
    )
})
