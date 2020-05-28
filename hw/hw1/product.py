'''
Example code for the first homework
'''

def product(m1, m2):
    '''
    这里的实现对于矩阵形状的定义，恰好和 JS 反过来了
    '''
    result = [None] * len(m2)
    for i, row in enumerate(m2):
        result[i] = [None] * len(m1[0])
        for j, col in enumerate(iter_col(m1)):
            result[i][j] = dot(col, row)
    return result


def iter_col(m):
    for i in range(len(m[0])):
        yield get_col(m, i)


def get_col(m, i):
    for row in m:
        yield row[i]


def dot(vec1, vec2):
    return sum(x * y for x, y in zip(vec1, vec2))


print(product(
    [
        [1],
        [2],
        [3],
    ],
    [
        [1, 2, 3],
        [1, 2, 3]
    ]
))
'''
[
    [14],
    [14]
]
'''

print(product(
    [
        [1, 2, 3, 4]
    ],
    [
        [1],
        [2],
        [3],
    ],
))
'''
[
    [1, 2, 3, 4], 
    [2, 4, 6, 8], 
    [3, 6, 9, 12]
]
'''
