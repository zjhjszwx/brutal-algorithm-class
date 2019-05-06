class Stack:

    # 抽象数据结构
    def __init__(self):
        self.data = []

    def length(self):
        return len(self.data)

    def peek(self): # 窥, 返回顶上的数据
        return self.data[-1]  # self.data[len(self.data)-1]

    def push(self, ele):
        self.data.append(ele)

    def pop(self):
        # return self.data.pop(-1)
        ele = self.peek()
        self.data = self.data[:-1]
        return ele


s = Stack()
s.push(1)
assert s.peek() == 1
s.push(2)
assert s.length() == 2
s.push(3)
print(s.data)
assert s.pop() == 3
assert s.length() == 2
print(s.data)
assert s.pop() == 2
print(s.data)
assert s.pop() == 1
print(s.data)
assert s.length() == 0
