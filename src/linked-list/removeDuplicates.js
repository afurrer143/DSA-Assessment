const LinkedList = require("./linkedList");



/**
 * Remove duplicate values, if any, from a sorted linked list.
 *
 * The algorithm should be O(n) time complexity, therefore it cannot use `find()`.
 *
 * @param sortedLinkedList
 *  a possibly empty link list with all values in lexical order.
 *
 * @returns {LinkedList}
 *  the original linked list with any duplicate values removed.
 */

function removeDuplicates(sortedLinkedList) {
  // TODO: implement an algorithm to remove duplicate values from a sorted linked list.
  // if head is truthy, aka not empty link list
  const noDuplicates = new Set()
  if (sortedLinkedList.head) {
    let current = sortedLinkedList.head
    while (current) {
      noDuplicates.add(current.value)
      current = current.next
    }
  }
  const betterList = new LinkedList
  noDuplicates.forEach((currentEl) => {
    console.log(`Current el is ${currentEl}`)
    betterList.insert(currentEl)
  })
  return betterList
}


const testList = new LinkedList

testList.insertAtHead("2")
testList.insertAtHead("2")
testList.insertAtHead("1")
//LinkedList {
//  head: Node { value: '1', next: Node { value: '2', next: [Node] 

console.log(removeDuplicates(testList))


module.exports = removeDuplicates;
