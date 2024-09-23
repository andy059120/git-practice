/** 請在 Node.js 中實作一個函式 fibonacci(n)，該函式返回第 n 個費波納契數。
 *
 * 這邊使用 Top-down（自上而下）和 Bottom-up（自下而上）兩種解決問題和設計的策略。
 * Top-down 先從問題的全局入手，建立一個大概的概念，再逐步添加細節，使整體設計越來越具體。
 * Bottom-up 則是從基礎組件或方案開始，將它們逐一準備好，然後逐步組合這些元件，從小到大，最終形成完整的解決方案。
 */

//寫法一：Top-down 思路，使用遞迴
function fibonacciTopDown(n) {
  // 基礎情況，fibonacci(0) = 0 和 fibonacci(1) = 1
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fibonacciTopDown(n - 1) + fibonacciTopDown(n - 2);
}
/** 此方法會導致大量重複計算，因為每次計算某個費波納契數時，都會遞歸計算其前兩個數。
 * 這種解法的時間複雜度是 O(2^n)，因為每次遞歸都會拆分成兩個子問題，計算量隨著 n 指數級增長。
 */

//寫法二：Top-down 思路，使用遞迴 + 記憶化
function fibonacciTopDownMemo(n, memo = {}) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  // 檢查是否已經計算過
  if (memo[n]) return memo[n];

  // 如果沒有計算過，則遞歸計算並記錄結果
  memo[n] =
    fibonacciTopDownMemo(n - 1, memo) + fibonacciTopDownMemo(n - 2, memo);
  return memo[n];
}
/** 這裡使用一個記憶化（Memoization）的技術，將已經計算過的結果存儲起來，減少時間複雜度。
 * 為了避免多次計算相同的子問題，使用一個 memo 將已經計算過的結果存儲下來。
 * 時間複雜度為 O(n)，因為每個 n 都只計算一次。
 */

//寫法三：Bottom-up 思路，使用迴圈、動態規劃
function fibonacciBottomUp(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev2 = 0; // fibonacci(0)
  let prev1 = 1; // fibonacci(1)
  let current;

  // 從 2 開始構建 fibonacci(n)
  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2; // 當前的 fibonacci(i)
    prev2 = prev1; // 更新 prev2
    prev1 = current; // 更新 prev1
  }

  return current;
}
/** 這裡從 fibonacci(0) 和 fibonacci(1) 開始，逐步計算每個費波納契數直到 fibonacci(n)。
 * 只需要記錄前兩個數值來計算下一個數，因此空間複雜度為 O(1)。
 * 時間複雜度為 O(n)，因為每個數值從 2 到 n 都只計算一次。
 */

//寫法四：使用數學公式計算
function fibonacciFormula(n) {
  const phi = (1 + Math.sqrt(5)) / 2; // 黃金比例 φ
  const psi = (1 - Math.sqrt(5)) / 2; // φ 的對應負值

  // Binet's Formula
  return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5));
}

/** 費波納契數列可以用一個數學公式（Binet's Formula）直接計算第 n 個費波納契數。這個公式是基於黃金比例來計算的，不需要遞迴或迴圈。
 * 這個公式的核心是利用黃金比例來計算費波納契數，但它的計算結果可能會出現浮點誤差，所以在最後需要用 Math.round() 來取整數。
 */

// 測試
console.log(fibonacciTopDown(10)); // 55
console.log(fibonacciTopDownMemo(10)); // 55
console.log(fibonacciBottomUp(10)); // 55
console.log(fibonacciFormula(10)); // 55
