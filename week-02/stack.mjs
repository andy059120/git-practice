// stack 是一個後進先出（Last In First Out）的資料結構，通常會有 pop, push 等操作，請用 JavaScript 的 class 來完成 Stack 資料結構，並盡可能使用 javascript 的 array 函式。

// # 符號在 JavaScript 的 class 中代表私有屬性或方法，這是 JavaScript 中為了實現類似內部封裝的機制。私有屬性不能從 class 外部直接訪問，只能在 class 的內部使用。

/** ESModules 是什麼東西？
 * ESModules（即 ECMAScript Modules，簡稱 ESM）是 JavaScript 的官方模組系統，是在 ECMAScript 2015 (ES6) 中引入的。它允許開發者將程式碼分割成多個文件，並通過 import 和 export 關鍵字來管理這些模組的依賴和使用。這使得程式碼更具可讀性、可維護性，並且可以重用模組中的功能。
 * ESModules 的主要目的是解決 JavaScript 中的程式碼管理問題，允許開發者將程式碼按功能分成模組（Modules），使得各模組之間的依賴關係更加明確且可控。這些模組可以包含函數、類別、對象、變數等，然後可以從一個模組導出（export），並在另一個模組中導入（import）。
 */

export default class Stack {
  #items;

  constructor() {
    this.#items = [];
  }

  // 在 stack 頂部加入元素
  push(element) {
    this.#items.push(element);
  }

  // 移除並回傳 stack 頂部的元素
  pop() {
    return this.#items.pop();
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    return this.#items[this.#items.length - 1];
  }

  // 檢查 stack 是否為空
  isEmpty() {
    return this.#items.length === 0;
  }

  // 回傳 stack 中元素的個數
  size() {
    return this.#items.length;
  }

  // 清空 stack
  clear() {
    this.#items = [];
  }

  // 印出 stack 內容
  print() {
    console.log(this.#items.toString());
  }
}
