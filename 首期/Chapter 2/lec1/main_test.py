# HW
def test():
    t = BinarySearchTree()
    t.get(0).v
    t.add(10)
    t.add(5)
    t.add(15)
    t.add(12)
    assert t.dfs(print, "in_order") == p[5, 10, 12, 15]