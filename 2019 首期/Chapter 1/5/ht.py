# ht = {}

# # key
# ht[10] = "123"         # O(1)
# ht[10] = "1234"        # O(1)
# del ht[10]             # O(1)
# if 10 in ht:           # O(1)

# # value                # CRUD O(n)
# if "1234" in ht.values()  # O(n), n == len(ht)

a = [1, 2, 2, 2, 3, 4, 5, "xxx"]
c = {}
for x in a:
    if x in c:
        c[x] += 1
    else:
        c[x] = 1
for inte, times in c.items():
    print(inte, times)

class LinkedList():
    pass

class Stack:
    def __init__(self):
        self.ll = LinkedList()

    def pop():
        self.ll.pop_tail()

    def push(x):
        self.ll.push_tail(x)

    def peek():
        self.ll.tail

class Queue:
    def __init__(self):
        self.ll = LinkedList()

    def pop():
        self.ll.pop_head()

    def push(x):
        self.ll.push_tail(x)

    def peek():
        self.ll.head

