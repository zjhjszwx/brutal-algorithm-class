package main

import "time"
import "fmt"
import "sync"

type QueueOrStack interface {
	length() int
	peek() int
	push(ele int)
	pop() int
}

type queue struct {
	data []task
	sync.Mutex
}

func (q *queue) length() int {
	return len(q.data)
}

func (q *queue) peek() task {
	return q.data[0]
}

func (q *queue) push(ele task) {
	q.Lock()
	defer q.Unlock()
	q.data = append(q.data, ele)
}

func (q *queue) pop() task {
	q.Lock()
	defer q.Unlock()
	var ret task
	ret, q.data = q.data[0], q.data[1:]
	return ret
}

// Connection Pool
// http Get
// ajax

// 客户端（前端、手机） --- 100 个网络请求 --->
// Connection Pool == 10
type ConnectionPool struct {
	q queue
	size int
}

func (cp *ConnectionPool) add(ajax ajaxT, a, b int) {
	if cp.q.length() < cp.size {
		cp.q.push(task{ajax: ajax, a: a, b:b})
	}
}

type ajaxT func(a, b int) int 

func ajax(a, b int) int {
	time.Sleep(time.Second)
	return a + b
}

type task struct {
	a, b int
	ajax ajaxT
}

func main() {
	cp := make(chan struct{}, 20) // channel is a fixed size queue
	done := make(chan struct{})
	for i := 0; i < 10; i++ {
		t := task{ajax: ajax, a:i, b: i+1}
		cp <- struct{}{}
		go func() {
			fmt.Println(t.ajax(t.a, t.b))
			<-cp
			done <- struct{}{}
		}()
	}
	for i := 0; i < 10; i++ {
		<- done
	}
}
