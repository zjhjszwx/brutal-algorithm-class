class MinHeap:
    
    def __init__(self):
        self.data = []

    def insert(self, v):

        def push_up(array, s, e):
            if e == 0:
                return
            i = e
            if i % 2 == 0:
                p_i = (i - 2) // 2
            else:
                p_i = (i - 1) // 2
            if array[i] < array[p_i]:
                array[i], array[p_i] = array[p_i], array[i]
            push_up(array, 0, p_i)

        self.data.append(v)
        push_up(self.data, 0, len(self.data) - 1)

    def pop(self):
        pass

    def bfs_order(self):
        pass

h = MinHeap()
h.insert(1)
h.insert(10)
h.insert(9)
h.insert(-9)
print(h.data)
# BFS --> Level Order Traversal