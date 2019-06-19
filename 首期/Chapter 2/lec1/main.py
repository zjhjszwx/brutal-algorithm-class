class BinarySearchTree:

    def __init__(self, v):
        self.v = v
        self.size = 1
        self.left = None
        self.right = None
    
    def add(self, v):
        self.size += 1
        if v > self.v:
            if self.right is None:
                self.right = BinarySearchTree(v)
            else:
                self.right.add(v)
        else:
            if self.left is None:
                self.left = BinarySearchTree(v)
            else:
                self.left.add(v)

    def dfs(self, f, order):  
        if order == "pre":
            f(self.v)
        if self.left is not None:
            self.left.dfs(f, order)
        if order == "in":
            f(self.v)
        if self.right is not None:
            self.right.dfs(f, order)
        if order == "post":
            f(self.v)

    def dfs_stream(self, order):  
        if order == "pre":
            yield self.v
        if self.left is not None:
            yield from self.left.dfs_stream(order)
        if order == "in":
            yield self.v
        if self.right is not None:
            yield from self.right.dfs_stream(order)
        if order == "post":
            yield self.v

# Low Coupling 耦合, High Cohesion 内聚
def dfs_stream(bfs, order):  
    if bfs is not None:
        yield from dfs_stream(bfs.left, order)
        yield bfs.v
        yield from dfs_stream(bfs.right, order)

        

t = BinarySearchTree(10)
t.add(5)
t.add(15)
t.add(12)
for x in dfs_stream(t, "xxxx"):
    print(":", x)
def example_flatten_tree():
    l = []
    t.dfs(lambda x: l.append(x), "in")
    print(l)
example_flatten_tree()

def example_push_to_stream():
    def stream():
        x = (yield None)
        while x != None:
            x = (yield x)
            print(x)

    g_obj = stream()
    next(g_obj)
    t.dfs(lambda x: g_obj.send(x), "in")

def example_dfs_stream():
    l = [None] * t.size
    i = 0
    for x in t.dfs_stream("post"):
        l[i] = x
        i += 1
    print(l)
example_dfs_stream()