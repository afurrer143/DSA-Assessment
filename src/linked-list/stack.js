/**
 * Implement a Stack using nothing more than a LinkedList.
 */

const LinkedList = require("../linked-list/linkedList");

class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  push(value) {
    let newNode = this.linkedList.insertAtHead(value);

    return newNode;
  }

  pop() {
    if (this.linkedList.head === null) {
      return null;
    }

    let removed = this.linkedList.remove((index) => {
      return this.linkedList.length;
    });

    return removed;
  }

  peek() {
    if (!this.isEmpty()) {
      return this.linkedList.head.value;
    }
    return null;
  }

  isEmpty() {
    return this.linkedList.head == null;
  }
}

// const testStack = new Stack ()

// testStack.push("new-value")

// console.log(testStack)

// console.log(testStack.pop())

// console.log(testStack)

module.exports = Stack;
