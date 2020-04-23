# Python , Go , JS
# Top Down
def matrix_mul(a, b):
    """
    """
    mat = []
    for i in range(len(a)):             # i = 0, 1
        mat.append([])
        for j in range(len(b[0])):      # j = 0 1 2
            r = get_row(a, i)
            c = get_col(b, j)
            num = vector_dot(r, c)
            mat[i].append(num)
    return mat

def get_row(m, i):
    return m[i]

def get_col(m, j):
    col = [0] * len(m)
    for i, row in enumerate(m):
        col[i] = row[j]
    return col


# [1, 2, 3] * [4, 5, 6] = 1*4 + 2*5 + 3*6
'''
    for 条件
        不断重复干同一件事情
    直到条件结束
'''
def vector_dot(v1, v2):
    prod = v1[0] * v2[0]
    for i in range(1, len(v1)):
        prod += v1[i] * v2[i]
    return prod
    # return reduce(lambda x, y: x + y,v1[i] * v2[i] for in in range(len(v1)))


'''

            [-1, -2, 1,],
            [-3, -4, 2],
            [-6, -5, 3,],
[1, 2, 3],  -25  -25
[4, 5, 6],  -55  
'''

r = matrix_mul(
    [
        [1, 2, 3],
        [4, 5, 6],
    ],
    [
        [-1, -2, 1],
        [-3, -4, 3],
        [-6, -5.5, 99],
    ]
)
print(r)

# string/array (matrix)

# hash
#     hash table
#     hash set
#     Hash Set
#     HashMap (index based on hash)
#     TreeMap (index based on BTree)

# Recursion
#     Recursive Algorithm
#     Recursive Structure

# Linked List (pointers)
#     Stack
#     Queue

# Binary Tree 
#     Binary Seach Tree
#     AVL
#     B Tree? 多半不

# Recursion -> Dynamic Programming 动态规划

# Graph
