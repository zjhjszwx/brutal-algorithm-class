class LinkedList:
    '''
    No Recursion
    '''
    def __init__(self):
        self.head = None

    def add(self, v):
        if self.head is None:
            self.head = Node(v)
            return
        next = self.head
        while next.next is not None:
            next = next.next
        next.next = Node(v)

    def delete(self, i):
        pass

    def poptail(self):
        pass

    def pophead(self):
        if self.head is None:
            raise Exception("链表为空")
        head = self.head                 # 10 2 -3, head = 10
        self.head = self.head.next       # 2 - 3, head =10
        head.next = None
        return head.v

    def print(self):
        cur = self.head
        while cur is not None:
            print(cur.v)
            cur = cur.next

class Node:
    def __init__(self, v):
        self.v = v
        self.next = None

def run():
    print("run!!!")

if __name__ == "__main__":
    n = Node(10)
    # a.py
    print(n.v, n.next)
    ll = LinkedList()   # []
    ll.add(run)          # [10]
    ll.add(run)           # [10, 2]
    ll.add(run)          # [10, 2, -3]
    ll.print()          # 10, 2 , -3
    # ll.pophead()        # [2, -3]
    # ll.poptail() # 10 2

    # b.py
    node = ll.pophead() # 2
    node.v()

    a = 10
    print(type(a))
    a = "xxx"
    print(type(a))

    
