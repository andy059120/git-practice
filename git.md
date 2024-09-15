## Blob 和 Tree

**Blob**(Binary Large Object)是 Git 中最基本的物件，專門用來儲存「檔案的內容」。它代表了一個檔案的具體內容，但不包含檔案的名稱、路徑或權限資訊。
**Tree** 是一種描述「目錄結構」的物件。它負責將檔案、子目錄和它們的相關資訊（如檔名、路徑、權限）組織在一起。Tree 可以包含多個 Blob（代表檔案）以及其他 Tree（代表子目錄）。

在 Git 中提交一個檔案時，Git 會把這個檔案的內容轉換成一個 Blob 並儲存起來。每個 Blob 有一個唯一的 SHA-1 雜湊演算法的值，使 Git 可以高效地追蹤檔案的變化；一樣的，當你在 Git 中提交一個檔案時，Git 會為目錄結構創建一個 Tree。這個 Tree 會包含每個檔案的 Blob，以及其他目錄（即子 Tree）。因此，Tree 是遞迴的，可以包含其他 Tree，最終組成完整的專案檔案結構。

說了這麼多，來看一下他長什麼樣子，當想檢查某個檔案在 Git 中的 Blob 或 Tree 時：

#### 進入該檔案夾

    $ cd directory

#### 使用 git ls-tree 指令來列出檔案和其對應的 Blob 和 Tree 的 SHA-1 值，這會顯示當前分支（HEAD）的檔案清單及每個檔案的 Blob ID

    $ git ls-tree HEAD

#### 如果想看一個 Blob 檔案的內容，可以用 SHA-1 值進一步檢查。

    $ git cat-file -p <blob-hash>

#### 如果想查看子目錄中的 Tree，可以用 SHA-1 值進一步檢查：

    $ git ls-tree <tree-hash>

我使用一個手邊的 Flutter 專案來測試：

專案樹：
![projectTree](https://hackmd.io/_uploads/SJdwgEVT0.png =50%x)

表格：

| 權限模式 | 類型 | 雜湊值                                   | 檔案/目錄名稱         |
| -------- | ---- | ---------------------------------------- | --------------------- |
| 100644   | blob | 262e5e83783197ede8d66c6789e6c0cce0a51a0d | .fvmrc                |
| 100644   | blob | c54174577268583d75a5c0fbaa7ea5844dc3395d | .gitignore            |
| 100644   | blob | ebf547f7d519ffe6c923b494e7dfa5af135e6168 | .metadata             |
| 100644   | blob | 3d12b9eda53f0b42e4534fd46ab2423409e73e9b | README.md             |
| 100644   | blob | 0d2902135caece481a035652d88970c80e29cc7e | analysis_options.yaml |
| 040000   | tree | 0724e8f929f6bfd15aff47642f3ebc0fbf62e7fc | android               |
| 040000   | tree | b8dadd2aa9b5d8acc805593512d8f68a429d040f | assets                |
| 040000   | tree | d3668547fe8eab57de12dc583e9bd9486c8f6980 | fonts                 |
| 040000   | tree | e15501eec5e0aeaa0422a5d3d15d99fa7954a114 | ios                   |
| 040000   | tree | f666e793c405682e546d1fe01902e02728063d5a | lib                   |
| 100644   | blob | 471006abc1bdc0b1bfb9d3f6c2c307661d2c6e76 | pubspec.lock          |
| 100644   | blob | 01a347d2681ee8f62f3a269c2f4128afc957368d | pubspec.yaml          |
| 040000   | tree | ebe64144d1783260dce8344583151a661b4d095f | test                  |

欄位解釋：

- 權限模式：檔案或目錄的權限，如 100644 代表普通檔案，040000 代表目錄。
- 類型：類型為 blob 表示檔案內容，tree 表示目錄。
- 雜湊值：每個檔案或目錄的唯一 SHA-1 雜湊值。
- 檔案/目錄名稱：檔案或目錄的名稱。

圖片：
![BlobTest](https://hackmd.io/_uploads/BJLMGaQ6R.png)

### Blob 和 Tree 是如何合作的？

Blob 儲存了檔案的內容，而 Tree 組織了目錄結構，並將每個檔案的 Blob 與其檔名、路徑、權限等資訊聯繫起來。
一個 Tree 可以包含多個 Blob：假設你有一個目錄，裡面有 3 個檔案，Git 會為這 3 個檔案分別生成 3 個 Blob，然後 Tree 將這 3 個 Blob 組織成一個目錄結構，包含它們的檔名和路徑。
Tree 可以嵌套其他 Tree：假設你有一個目錄裡面還有子目錄，Git 會為子目錄創建一個 Tree，並在父目錄的 Tree 中引用它。這樣就能形成遞迴的目錄結構。

簡單的說法，可以把 Git 中的 Tree 和 Blob 視作一棵樹：
Blob 是樹葉（儲存實際的檔案內容），Tree 是樹枝（組織檔案和目錄的結構）。
每當有一個目錄時，Git 就創建一個 Tree，Tree 指向它下面的檔案（Blob）和其他子目錄（Tree）。

### 接下來加入 Commit 的概念。

回憶一下單向鏈結串列（Singly Linked List），其中每個節點（Node）包含兩個部分：
資料部分：存儲該節點的資料（在 Git 中，可以視為提交的內容）。
指標部分：指向下一個節點（在 Git 中，這個指標就是指向前一個提交，也就是 parent commit）。

Git Commit 作為單向鏈結串列，每個 commit 物件 包含以下主要兩個部分：
資料：Commit 物件存儲了這次提交的內容，例如提交訊息（對此次提交所做更改的描述）、提交者資訊、日期和時間，以及指向當前提交的 Tree 物件（目錄和檔案的快照）。
指向前一個 commit 的鏈結（parent commit）：每個 commit 都指向它的 parent commit，也就是前一次的提交，這相當於在單向鏈結串列中指向下一個節點的指標。
由於每個 commit 物件都會指向它的父提交，這就形成了單向的鏈條。最新的提交就是 HEAD 指向的 commit。

### Blob, Tree, Commit 物件的結論：

Commit 是每次提交程式碼的節點，它包含一個指向專案狀態（Tree）的鏈結，以及一個指向前一次提交（Parent commit）的鏈結。
Tree 物件 是專案的目錄結構，它包含指向檔案內容（Blob）或子目錄（其他 Tree）的鏈結。
每次新的提交會創建新的 commit 物件，並且這個 commit 物件會指向當前的 Tree 結構以及前一個 commit。

### Branch 是一個可變的指標

它指向某個具體的 commit。當你在某個分支上進行新的 commit 時，這個分支會自動向前移動，指向最新的 commit。分支讓你能夠在同一個儲存庫中同時進行多個不同的開發流程，互不干擾。

### HEAD 是 Git 中的特殊指標，指向當前所在的分支或 commit。

例如現在在 main 分支上時，HEAD 的內容會是 ref: refs/heads/main 的文字。
當處於分離的 HEAD 狀態（detached HEAD）時，它會直接指向某個具體的 commit（雜湊值）。
當每次切換分支（git checkout）、創建新的分支，或進入分離 HEAD 狀態時，HEAD 檔案的內容會更新以反映當前的狀態。

三者之間的關係：

HEAD 通常指向一個分支，而這個分支指向某個 commit。
Branch 只是指向 commit 的指標，而 commit 是對文件系統狀態的記錄。
HEAD 和 Branch 的關係是動態的，當你在一個分支上進行新的 commit 時，Branch 和 HEAD 都會隨之更新，指向最新的 commit。

---

`.git` 資料夾儲存了所有與儲存庫有關的歷史紀錄、配置文件以及各種管理資訊。每次進行 Git 操作（如 `add`、`commit`、`push` 等）時，`.git` 資料夾的內容都會發生變化。

1. **git init**
   當執行 `git init` 時，Git 會在當前目錄下創建一個 `.git` 資料夾，並生成基本的資料結構，例如 `HEAD`、`config`、`objects/` 等。

2. **git add**
   當使用 `git add` 將文件添加到暫存區時，Git 會根據文件內容創建一個 `blob` 物件，並將其儲存在 `objects/` 中。同時，這些文件的狀態會被記錄到 `index` 檔案中，準備進行提交。`index` 是暫存區的映像，記錄了所有已經被 `git add` 的文件狀態。每次你執行 `git add`，`index` 會更新，反映暫存區的最新變化。當你進行提交操作（`git commit`）時，`index` 的內容會轉換成一個新的提交，並清空暫存區。

3. **objects/**
   `objects/` 是 Git 儲存庫中最重要的資料夾，存儲了所有的 Git 物件。Git 物件主要分為三種類型：

   - **Blob**：儲存文件的內容，對應每一個檔案的快照。
   - **Tree**：儲存目錄結構，記錄文件之間的層級關係。
   - **Commit**：儲存提交記錄，包括提交訊息、提交時間、作者等資訊，並指向一個 `Tree` 物件。

   所有這些物件都根據它們的 SHA-1 雜湊值儲存在 `objects/` 資料夾中，並以二進制方式壓縮存儲。每個物件都使用兩級目錄結構進行命名（例如：`objects/aa/bb123...`）。

   每次執行 `git commit` 時，Git 會創建新的 `commit` 物件、`blob` 物件和 `tree` 物件，並儲存在 `objects/` 中。每當你新增或修改文件，這些變更就會體現為新物件存儲於此。

4. **git commit**
   執行 `git commit` 時，Git 會根據當前暫存區的內容生成一個新的 `tree` 物件，並創建一個 `commit` 物件。這些物件會被儲存在 `objects/` 中，並且 `HEAD` 和 `refs/heads/<branch>` 也會更新，指向這次新的提交。

5. **遠端設定變化（remote）**
   在 Git 儲存庫操作過程中，當設定遠端（`remote`）時，`.git` 資料夾會發生明顯的變化，特別是在 `config` 檔案中。`config` 儲存了本地儲存庫的配置，包括遠端 URL、分支的行為以及其他用戶設定。

   當你設定遠端 URL 後，`config` 檔案會更新，例如：

   ```
   [remote "origin"]
       url = https://github.com/andy059120/git-practice.git
       fetch = +refs/heads/*:refs/remotes/origin/*
   [branch "main"]
       remote = origin
       merge = refs/heads/main
   ```

6. **refs/**  
   `refs/` 資料夾存儲了分支（`heads/`）、遠端追蹤分支（`remotes/`）以及標籤（`tags/`）的指標。每次創建新分支、切換分支或拉取遠端分支時，`refs/` 資料夾的內容會更新。例如，當你執行 `git fetch` 後，`refs/remotes/` 會更新遠端分支的狀態。

   - `refs/heads/`：每個本地分支在這裡都有一個檔案，檔案內容是這個分支指向的提交（commit）的哈希值。
   - `refs/remotes/`：儲存遠端追蹤分支的記錄，例如 `origin/main`。
   - `refs/tags/`：存放標籤的指標。

---

commit message 存在的原因：

1. 記錄做了哪些更動，以及為什麼要做這些更動。
2. 讓其他人能夠快速地了解異動的內容，方便回溯程式碼已修正錯誤或添加新功能。

commit message 範例：

#### 簡單提交：

```
Fix typo in README
```

#### 包含詳細描述：

```
feat: Add user login functionality

Added user authentication using JWT. Includes login and logout functionality.
This commit also refactors the user model to include authentication tokens.

Fixes #102
```

commit message 規範：

### **標題與描述**

- **標題**：每個 commit message 應該有一個簡短明確的標題，描述這次提交的目的。
  - **限制在 50 字元內**：簡潔是關鍵，讓標題能在 Git log 中易於掃描。
- **類型標籤**：可以在標題前添加簡短的類型標籤來說明這次提交的範疇。例如：

  - `feat:` (功能) 用於新增功能
  - `fix:` (修復) 用於修正 bug
  - `docs:` 用於修改文件
  - `refactor:` 用於重構現有代碼而不改變功能
  - `test:` 用於添加或修改測試
  - `style: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
  - `perf: 改善效能 (A code change that improves performance)。
  - `chore: 建構程序或輔助工具的變動 (maintain)。
  - `revert: 撤銷回覆先前的 commit 例如：revert: type(scope): subject (回覆版本：xxxx)。
  - 例如：`feat: Add user authentication` 或 `fix: Correct issue with login logic`

- **相關問題或任務 ID**（選填）：如果這次提交解決了一個 issue 或是與某個工作任務相關，可以在描述中提到 issue 編號，這樣便於追溯：
  - `Fixes #123` 或 `Closes #456`

### **避免的事項**

- **不要用模糊或無意義的訊息**：像是 "Fix bug" 或 "Update file" 無法傳達具體的變更。
- **不要在一個 commit 裡包含過多變更**：每個 commit 應該聚焦於一個具體的任務或變更，這樣可以更容易追蹤問題。
