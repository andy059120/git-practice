/** 請以 JavaScript 的 array 函式完成 sum 函式，也就是程式碼中不可以出現 for, while 等迴圈程式。
 *
 * 先來大致了解 JavaScript Array 的底層實作，JavaScript Array 通常是基於動態陣列（Dynamic Arrays），也稱為動態大小的連續記憶體區塊，且能夠自動擴大容量以適應不同大小的資料。
 * 在 JavaScript 中，陣列實際上是一個物件，因此它可以有自己的屬性（例如 arr.length），並且也可以擴展其它屬性或方法。這是因為 Array 實際上是繼承自 Object，只是它有一些特別的行為和優化來處理數字索引和陣列操作。
 */

//寫法一：使用 reduce fuction + 箭頭函式 callback function（網路查的，我第一次寫 JS 真的想不到）
function sum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

console.log(sum([1, 5, 3, 2])); // 11

/** arr.reduce() 用於將陣列中的所有 value 進行歸納（reduce）處理。reduce() 函式接受一個 callback function 作為參數，這個 callback function 會在每次迭代時被執行，並且每次迭代會接收兩個參數：
 * acc（累加器，accumulator）：儲存迭代時累積的結果，保存之前所有累加的結果。
 * cur（current value）：每次迭代中當前的陣列的 value。
 *
 * 說明 (acc, cur) => acc + cur 是用箭頭函式寫一個 callback function，定義了如何在每次迭代中處理陣列中的 value 。
 * 每次迭代都將累加器 acc 與當前 value  cur 相加，並將結果作為下一次迭代的累加器值傳遞下去。
 * 當遍歷完整個陣列時，reduce() 會回傳累積結果。
 *
 * 說明 reduce((acc, cur) => acc + cur, 0) 最後的 0 是 reduce() fuction 的第二個參數，它是累加器的初始值。
 * 即第一個 value 處理時，acc 的初始值是 0。
 *
 * arr.reduce() 會在完成對所有 value 的迭代後回傳累積結果，而 sum() 函式則會將這個結果回傳。
 *
 * 虛擬碼流程如下：
 * 初始值：acc = 0
 * 第一輪：acc + cur = 0 + 1 = 1
 * 第二輪：acc + cur = 1 + 5 = 6
 * 第三輪：acc + cur = 6 + 3 = 9
 * 第四輪：acc + cur = 9 + 2 = 11
 * 最終，reduce() 返回的值是 11。
 */

//寫法二：使用 reduce fuction，把箭頭函式抽出來寫成一個 function
function sumReducer(acc, cur) {
  return acc + cur;
}

function sumR(arr) {
  return arr.reduce(sumReducer, 0);
}

console.log(sumR([1, 5, 3, 2])); // 11

/** 這裡把上面的箭頭函式提取出來，單獨定義成一個名為 sumReducer 的函式。
 * 說明 ary.reduce(sumReducer, 0)：
 * ary.reduce()會從第一個 value 開始，並依次對每個 value 執行我們傳入的 callback function（在這裡是 sumReducer），最終回傳累加的結果。
 * reduce 的第二個參數是初始值，表示累加器在第一次迭代時的初始值，在這裡是 0。
 * function sumReducer() 是一個 callback function，專門用來處理累加操作。
 * 接受 acc, cur 兩個參數，每次呼叫時，它會將 acc（累加器的值）與 cur（當前 value 的值）相加，並將結果作為新的 acc 返回給下一次的迭代。
 * 最後，arr.reduce() 會回傳累加的結果。
 */

//寫法三：使用 recursion function
function sumRecursion(ary) {
  if (ary.length === 0) return 0;
  return ary[0] + sum(ary.slice(1));
}

console.log(sumRecursion([1, 5, 3, 2])); // 11

/** 如果 ary.length === 0，也就是陣列為空，直接回傳 0 作為總和，這是遞迴的終止條件。
 * 若陣列非空，取出第一個元素 ary[0]，並將其加上 sum(ary.slice(1)) 的結果。
 * ary.slice(1) 會取得陣列中除了第一個元素以外的所有元素，並對這些元素重複執行相同的邏輯（遞迴）。
 *
 * 虛擬碼流程如下：
 * 初始：sum([1, 5, 3, 2])
 * 第一次遞迴：1 + sum([5, 3, 2])
 * 第二次遞迴：1 + (5 + sum([3, 2]))
 * 第三次遞迴：1 + (5 + (3 + sum([2])))
 * 第四次遞迴：1 + (5 + (3 + (2 + sum([]))))
 * 第五次遞迴：1 + (5 + (3 + (2 + 0))) = 11
 */

// (optional) 挑戰題: 如果 sum 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？

//寫法一：使用數學公式
function sumMath(n) {
  return (n * (n + 1)) / 2;
}

console.log(sumMath(5)); // 15
//1 到 n 的總和可以使用高斯公式：n * (n + 1) / 2。

//寫法二：使用陣列和 reduce()
function sumNReduce(n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, cur) => acc + cur,
    0
  );
}

console.log(sumNReduce(5)); // 15
//建立一個從 1 到 n 的數列，然後使用 reduce()。
