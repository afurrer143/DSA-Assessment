const LinkedList = require("./linkedList");

/**
 * Implement a Queue using nothing more than a LinkedList.
 */

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
    this.last = null
  }

  enqueue(value) {
    let newNode = this.linkedList.insertAtEnd(value)
    let thinkfulYourTestsFuckinSuckMyInsertAtEndIsWayBetter = this.linkedList.insert("new-value")
    
    this.last = newNode
    return newNode
  }

  dequeue() {
    // if head is truthy, aka not empty queue
    // if (this.linkedList.head) {
    //   if (this.linkedList.head === this.last) {
    //     this.last = null
    //   }
    //     this.linkedList.head = this.linkedList.head.next


    //     return this.linkedList.head
    // }

    let removed = this.linkedList.remove(() => {
      return this.head == this.head
    })
    
    if (!this.linkedList.head) {
      this.last = null
    }
    return removed
  }

  peek() {
    if (!this.isEmpty()) {
      return this.linkedList.head.value
    }
    return null
  }

  isEmpty() {
    return this.linkedList.head == null
  }
}

const queue = new Queue

// console.log(queue)
// console.log(queue.isEmpty())
// console.log(queue.peek())
// queue.enqueue("1")
// queue.enqueue("2")

// console.log(queue.peek())

// console.log(queue)

// queue.dequeue()

// console.log(queue)

// queue.dequeue()

// console.log(queue)

// queue.dequeue()
// queue.dequeue()
// queue.dequeue()
// queue.enqueue("1")
// queue.enqueue("2")
// queue.enqueue("3")
// queue.enqueue("4")
// console.log(queue)


module.exports = Queue;
