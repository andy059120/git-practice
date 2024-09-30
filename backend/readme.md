## 這邊先解釋建立 Express 專案時指令的說明

### npm init

執行 npm init 後，會初始化一個新的 Node.js 專案，並在專案目錄中創建一個 package.json 檔案，是 Node.js 專案的配置文件，記錄了專案的各種資訊，並管理相依的套件（dependencies）以及其他相關設定。
npm init 會引導你輸入一些基本的專案資訊，如：

- 專案名稱 (name)：用來命名專案，通常也作為發佈套件時的名稱。
- 版本號 (version)：專案的當前版本號，通常初始版本為 1.0.0。
- 專案描述 (description)：簡短描述專案功能。
- 進入點檔案 (entry point)：指定專案的主程式檔案，通常是 index.js。
- 測試指令 (test command)：如果有測試套件，可以在這裡指定執行測試的命令。
- Git 儲存庫 (git repository)：如果使用 Git，這裡會記錄你的專案 Git 倉庫的 URL。
- 關鍵字 (keywords)：可以指定與專案相關的關鍵字，有助於在 npm 上搜尋到你的專案。
- 授權 (license)：專案的授權條款，如 MIT、GPL 等。

```
package.json

{
  "name": "express-practice",
  "version": "1.0.0",
  "description": "express 專案範例",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "andy059120"
}
```

### npm install express

- package.json 會新增一個名為 dependencies 的欄位，記錄了安裝的套件及其版本。

```
package.json

{
  "name": "express-practice",
  "version": "1.0.0",
  "description": "express 專案範例",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "andy059120",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.0"
  }
}
```

- dependencies 欄位列出了 Express 及其版本號，像這裡的 "^4.21.0" 表示安裝的 Express 版本為 4.21.0，且允許自動安裝符合這個範圍（即任何 4.x 版本）的更新。
- node_modules 目錄是用來存放所有安裝的 npm 套件的地方。執行 npm install express 後，node_modules 裡面會包含 Express 及其所有依賴套件。
- node_modules/express：這是 Express 的主目錄，裡面包含了 Express 本身的程式碼和其相關檔案。

### 為什麼 node_modules 資料夾裡東西這麼多？

- 因為每個 npm 套件可能都有自己的依賴套件，這會導致依賴的遞迴增長，並在 node_modules 中形成一個大型的套件樹。

以下是 `node_modules` 裡面有這麼多東西的幾個主要原因：

#### 1. **依賴的依賴 (Nested Dependencies)**

當安裝一個 npm 套件（例如 Express），這個套件通常會依賴其他套件來完成某些功能。這些依賴套件也可能再依賴於其他套件，形成一個遞迴的依賴樹。每個依賴都會被下載並放入 `node_modules` 中。這樣就導致了 `node_modules` 裡包含了大量不同的套件和其子依賴。

以 Express 為例，它可能依賴以下套件：

- **body-parser**
- **cookie-parser**
- **serve-static**

而這些套件又可能依賴其他套件。這個過程可能會進一步擴展，產生很多層次的依賴。

#### 2. **版本衝突 (Version Conflicts)**

不同的套件可能依賴於相同的子套件，但不同的版本。npm 通常會解決這些衝突，為每個套件安裝其需要的版本。因此，`node_modules` 可能會包含同一個套件的多個不同版本，因為每個套件都需要與自己版本相容的子依賴。

#### 3. **扁平化安裝 (Flattening)**

npm 在 v3 及以上的版本使用了一種扁平化的依賴安裝方式（`deduplication`），這意味著當不同的套件依賴相同的函式庫時，npm 會將這些套件的公共依賴儘可能安裝在頂層，從而減少不必要的複製。然而，由於版本不一致的情況，某些套件的子依賴仍需要分別安裝在各自的層級，導致 `node_modules` 的複雜性。

#### 4. **工具與開發依賴 (Dev Dependencies)**

在開發過程中，可能會安裝一些只用於開發階段的工具，如測試框架（如 `mocha`、`jest`）、打包工具（如 `webpack`）、編譯器（如 `babel`）。這些開發依賴（dev dependencies）也會被安裝到 `node_modules` 中，並進一步增加其內容。

#### 5. **跨平台支援**

一些套件會為了支援不同的運行環境（如 Windows、Linux、macOS），安裝不同的子依賴或額外的模組。這些額外的模組也會被放入 `node_modules` 中，增加了套件的數量。

#### 6. **大型套件或多功能套件**

一些套件本身就相當大，或者內含許多模組。例如，像 `lodash` 這樣的工具庫，或 `react` 這樣的前端框架，它們可能包含很多功能和模組，即使你只使用其中的一小部分，npm 仍會下載整個套件，並且這些套件也可能有各自的依賴。

#### **因為檔案太大，所以`node_modules` 要記得用 .gitignore，不然會大爆炸**

### 怎麼透過環境變數的設定來修改要監聽的 port number?

- **環境變數**允許在不修改原始碼的情況下設定一些外部的配置參數，如伺服器的 port number。
- 先修改 app.js 使用 process.env

```
app.js

const express = require('express');
const app = express();

// 使用環境變數設定 port，如果沒有設定，預設為 3000
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

```

1. 在命令列中設定環境變數

- 輸入指令：`PORT=3001 node app.js`
- 這樣每次重跑專案都要打一次，過於麻煩，不採用

2. 使用 .env 文件設定環境變數

- 安裝 dotenv：`npm install dotenv`
- 在專案根目錄下創建 .env 文件，並將環境變數寫入這個文件：`PORT=5000`
- 這樣在運行應用程式時，`dotenv` 會自動讀取 `.env` 文件中的變數，並將它們載入到 `process.env` 中，你的應用程式就可以使用環境變數來設置 port。

### package.json 中的 dependencies 與 devDependencies 分別是什麼

- **`dependencies`**：這個欄位列出專案在**運行時**所需的套件，也就是說，這些套件對於應用程式在任何環境（例如生產環境 Production）中運行都是必要的。安裝這些依賴時，可以使用以下指令：

  ```bash
  npm install <package-name>
  ```

- **`devDependencies`**：這個欄位列出專案在**開發時**所需的套件，例如測試框架、打包工具、編譯器等。這些套件只在開發和測試階段需要，不會影響生產環境。安裝時可以使用以下指令：
  ```bash
  npm install <package-name> --save-dev
  ```

範例：

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "mocha": "^9.0.0"
  }
}
```

在這裡，`express` 是運行專案時的依賴，而 `mocha` 是用於測試的開發依賴。

### package.json 中的 scripts 這個區塊怎麼用

`scripts` 區塊用來定義一組指令，當你運行 `npm run <script-name>` 時，npm 會執行對應的命令。這些命令可以是任何終端指令，例如啟動伺服器、執行測試、打包專案等。

範例：

```json
{
  "scripts": {
    "start": "node app.js",
    "test": "mocha",
    "build": "webpack --config webpack.config.js"
  }
}
```

- `npm start`：執行 `node app.js`，啟動你的應用程式。
- `npm test`：執行 `mocha` 測試框架，運行測試。
- `npm run build`：執行 `webpack`，打包專案。

這樣，你可以簡化常見的指令，並將其儲存在 `scripts` 區塊中。

### 哪些檔案應該被放上 GitHub Repo

#### 應該上傳的檔案：

- **原始碼檔案**：專案的程式碼（例如 `.js`、`.py` 等）。
- **配置檔案**：`package.json`、`.babelrc`、`webpack.config.js` 等這些配置檔案應該提交，因為它們對於專案的運行至關重要。
- **文檔與範例**：如 `README.md`、範例配置檔案（如 `.env.example`）。

#### 不應該上傳的檔案：

- **`node_modules` 目錄**：這個目錄包含所有依賴的套件。因為這些可以根據 `package.json` 安裝，沒必要上傳到 GitHub。可以在 `.gitignore` 中忽略這個目錄。
- **環境配置文件**：如 `.env` 文件，通常包含敏感資訊（如 API 金鑰）。這些應該被忽略，只上傳一個範例（如 `.env.example`）。
- **臨時檔案**：如 IDE 配置檔案、編譯生成的檔案（例如打包後的 `.js` 檔案）。

#### 决策要素：

- **必要性**：只有那些無法自動生成且對專案有用的檔案才應上傳。
- **敏感資訊**：任何包含私密資料或環境特定設置的檔案都應避免上傳。

### CJS vs ESM (CommonJS vs ECMAScript Modules)

- **CommonJS (CJS)**：是 Node.js 最早期的模組系統，使用 `require()` 來引入模組，使用 `module.exports` 或 `exports` 來導出模組。

  範例：

  ```js
  // 使用 require 引入模組
  const express = require("express");

  // 使用 module.exports 導出模組
  module.exports = myFunction;
  ```

  CJS 是同步的，這意味著模組在載入時會暫停後續的程式執行。

- **ECMAScript Modules (ESM)**：這是最新的 ES6 標準模組系統，使用 `import` 來引入模組，使用 `export` 來導出模組。

  範例：

  ```js
  // 使用 import 引入模組
  import express from "express";

  // 使用 export 導出模組
  export const myFunction = () => {};
  ```

  ESM 是異步的，因此它更適合於需要非同步載入模組的情境。

### 如何使用：

- **CJS (CommonJS)**：適用於大部分 Node.js 預設環境，因為 Node.js 預設支援 CommonJS。如果使用 `require()`，就是在使用 CJS。

- **ESM (ECMAScript Modules)**：要使用 ESM，需要在 `package.json` 中添加 `"type": "module"`，這樣 Node.js 會識別並運行 ES 模組。如果使用 `import/export`，就是在使用 ESM。

#### 範例：

1. **CommonJS**：

   ```js
   const express = require("express"); // CJS 引入
   const app = express();
   ```

2. **ECMAScript Modules**：
   ```js
   import express from "express"; // ESM 引入
   const app = express();
   ```

這兩種方式的選擇主要取決於你的專案環境和 Node.js 版本。若使用現代前端工具（如 React、Vue），則更偏向使用 ESM；但在現有的 Node.js 專案中，CJS 仍然廣泛使用。

### localhost 是什麼？

localhost 是指電腦的本地主機，它是指向自己電腦的一個預設域名。在瀏覽器或命令列中輸入 localhost 時，實際上是指向 127.0.0.1 或 ::1 這個 IP 地址。

- 127.0.0.1 是 IPv4 的本地主機 IP。
- ::1 是 IPv6 的本地主機 IP。

本地主機的用途是能夠在不依賴網路的情況下進行開發與測試。當應用程式使用 localhost 作為伺服器地址，該應用會只在本機上運行，外部電腦無法連接到此應用，這在開發階段非常有用。

### curl 是什麼？

curl（Client URL）是一個命令列工具，允許從命令列發送 HTTP 請求並接收回應。它是測試和調試網路連線、API、網站、和伺服器響應的常用工具。可以使用 curl 發送 GET、POST、PUT、DELETE 等。

### 如何使用 curl 來測試網路連線

以下是一些基本的 `curl` 使用範例：

1. **測試網頁是否可達**（使用 HTTP GET 請求）：

   ```bash
   curl http://example.com
   ```

   這個指令會請求 `example.com` 的首頁並顯示伺服器的回應。

2. **檢查網站的 HTTP 標頭**：

   ```bash
   curl -I http://example.com
   ```

   這會顯示 `example.com` 的 HTTP 回應標頭資訊，而不是整個頁面內容。

3. **測試 API 或提交表單**（使用 POST 請求）：

   ```bash
   curl -X POST -d "username=user&password=pass" http://example.com/login
   ```

   這個指令會使用 POST 請求向 `example.com` 的 `/login` 路徑發送 `username` 和 `password` 表單資料。

4. **檢查網路連線是否正常**：
   ```bash
   curl -v http://example.com
   ```
   這個指令會使用 verbose 模式，詳細顯示請求和響應的過程，幫助你檢查連線細節。

### **常用的 `curl` 參數**

- `-X [HTTP_METHOD]`：指定 HTTP 方法（如 GET、POST、PUT、DELETE 等）。例如：

  ```bash
  curl -X POST http://example.com
  ```

- `-d [data]`：傳送資料（通常用於 POST 請求）。例如：

  ```bash
  curl -d "name=John&age=30" http://example.com
  ```

- `-I`：只顯示 HTTP 回應標頭，不顯示回應內容。適用於檢查伺服器狀態和標頭信息。例子：

  ```bash
  curl -I http://example.com
  ```

- `-H [header]`：添加自定義 HTTP 標頭，例如添加 `Authorization` 標頭：

  ```bash
  curl -H "Authorization: Bearer token" http://example.com
  ```

- `-v`：啟用詳細模式，顯示請求和響應的所有細節。

- `-o [filename]`：將請求結果儲存到文件，而不是輸出到終端。例子：

  ```bash
  curl http://example.com -o output.html
  ```

- `-u [username:password]`：在請求中添加 HTTP 基本認證（Basic Authentication）。

### **實際範例：使用 `curl` 測試本地伺服器**

假設在本地使用 Express 啟動了一個伺服器，並運行在 `http://localhost:3000`，可以使用 `curl` 測試伺服器的運行情況：

```bash
curl http://localhost:3000
```

如果伺服器正在運行，應該會看到伺服器回應的內容`"Hello World!"`
