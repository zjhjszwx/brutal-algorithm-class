class LinkedList:
    '''
    No Recursion
    '''
    def __init__(self):
        self.head = None

    def add(self, v):
        self.head.add(v)

    def delete(self, i):
        pass

    def poptail(self):
        pass

    def pophead(self):
        if self.head is None:
            raise Exception("链表为空")
        head = self.head                 # 10 2 -3, head = 10
        self.head = self.head.next       # 2 - 3, head =10
        return head

    def print(self):
        self.head.print()

class Node:
    def __init__(self, v):
        self.v = v
        self.next = None

    def print(self):
        print(self.v)
        if self.next:
            self.next.print()

    def add(self, v):
        if self.next is not None:
            return self.next.add(v)
        self.v = Node(v)


# [1, 2, 3, 4]

# 1 [2, 3, 4]
# 2 [3, 4]
# 3 [4]
# 4 []

def count(n):
    for i in range(n):
        print(i)

# count(10)

def count_re(n):
    if n > 1:
        count_re(n-1)
    print(n-1)

# count_re(10)


# 1 1 2 3 5 8 13 21 .....

def fib(n):
    if n == 1:
        return 1
    if n == 2:
        return 1
    return fib(n-2) + fib(n-1)

print(fib(7))


# Reduction 归纳法
n = 1 : F(1) => True
n -> n + 1 : F(n) => True
F(n) = True for all n
