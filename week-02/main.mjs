import Stack from "./stack.mjs";

let stack = new Stack();
stack.print(); // []

stack.push(5);
stack.push(8);
stack.print(); // 5,8

console.log(stack.peek()); // 8
console.log(stack.size()); // 2
console.log(stack.isEmpty()); // false

console.log(stack.pop()); // 8
stack.print(); // 5
stack.clear();
stack.print(); // []
console.log(stack.isEmpty()); // true
