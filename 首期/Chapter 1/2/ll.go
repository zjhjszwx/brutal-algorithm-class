package main

import "fmt"

// Node 是一个元素
type Node struct {
	v    int
	next *Node
}

func (n *Node) add(v int) {
	if n.next == nil {
		n.next = &Node{v: v}
		return
	}
	cur := n.next
	for cur.next != nil {
		cur = cur.next
	}
	cur.next = &Node{v: v}
}

func (n *Node) print() {
	for cur := n; cur != nil; cur = cur.next {
		fmt.Println(cur.v)
	}
}

func main() {
	n := Node{v: 10}
	n.add(2)
	n.print()

	a := 10
	a = "xxx"
}
