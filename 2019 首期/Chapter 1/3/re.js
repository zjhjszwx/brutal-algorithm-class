
// UI / View

// [A B C D]
// [B C D A]
// [C D A B]



// Model

function LinkedList() {
    return {
        head: null,
        next: null,
        add: function(v) {
            if (!this.head) {
                this.head = new Node(v)
                return this.head
            }
            let cur = this.head
            while (cur.next) {
                cur = cur.next
            }
            cur.next = new Node(v)
            return cur.next
        },
        sorted_add: function(v) {
            if (this.head.v > v) {
                let n = Node(v)
                n.next = this.head
                this.head = n
                return
            }
            if (this.head) {
                this.head.sorted_add(v)
            }
        }
        pophead: function() {
            v = this.head.v
            this.head = this.head.next
            return v
        },
        print: function() {
            let cur = this.head
            while ( cur ) {
                console.log(cur.v)
                cur = cur.next
            }
        },
        first: function(n) {
            if (this.head) {
                return this.head.first(n)
            }
        },
        movehead: function( ) {
            this.head = this.head.next
        }
    }
}

function Node(v) {
    return {
        v: v,
        next: null,
        first: function*(n) {
            yield this.v
            // console.log("first", n, this.v, this.next)
            // console.log(this.next && n > 1)
            if( this.next && n > 1 ) {
                yield *this.next.first( n-1)
            }
        },
        sorted_add: function(v) {
            if (this.v <= v && this.next === null ) {
                n = Node(v)
                this.next = n
                return 
            }
            if (this.v <= v && v <= this.next.v) {
                n = Node(v)
                n.next = this.next
                this.next = n
                return
            } 
        }
    }
}

let l = LinkedList()
let head = l.add(1)
// console.log("head", head)
l.add(2)
tail = l.add(3)
// console.log(tail.v)
tail.next = head
// console.log("tail", tail)
// let r = l.first(3)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next())
// h = l.movehead()
// console.log("---", h)
// r = l.first(3)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next())
// h = l.movehead()
// console.log("---", h)
let r = l.first(100)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)
// console.log(r.next().value)

for ( let v = r.next().value; v; v = r.next().value ) {
    console.log(v)
}

// l.add(h)
// r = l.first(3)
// console.log(r)
// h = l.pophead()
// console.log("---", h)
// l.add(h)
// r = l.first(3)
// console.log(r)
// h = l.pophead()
// console.log("---", h)
// l.add(h)
// r = l.first(3)
// console.log(r)

// a = [1, 2]
// a.push(...[2,3])
// console.log(a)

// Controller ???
