/*

类型强弱  -- 值的类型
类型动静  -- 变量名

Python  动态强类型
Go      静态强类型
JS      动态弱类型

*/
function LinkedList() {
    return {
        head: null,
        next: null,
        add: function(v) {
            if (!this.head) {
                this.head = new Node(v)
                return
            }
            let cur = this.head
            while (cur.next) {
                cur = cur.next
            }
            cur.next = new Node(v)
        },
        print: function() {
            // cur := n.next
            // for cur.next != nil {
            //     cur = cur.next
            // }
            // cur.next = &Node{v: v}
            let cur = this.head
            while ( cur ) {
                console.log(cur.v)
                cur = cur.next
            }
        }
    }
}

function Node(v) {
    return {
        v: v,
        next: null,
    }
}

// function Node(v) {
//     this.v = v
//     this.next = null
// }

let ll = LinkedList()
ll.add(10)
ll.add(-2)
ll.print()
