### 使用 htps URL 連線：
* [https://www.bigorange.cloudnativeteam12.xyz/](https://www.bigorange.cloudnativeteam12.xyz/)

### 你在哪裡購買網域的
* GoDaddy：成功
* GitHub Student Developer Pack：GitHub Student 的授權不知道為什麼過不了，放棄

### 網域名稱系統 DNS（Domain Name System）
* 用來將人類易於記憶的網域名稱 (如 "example.com") 轉換成電腦能夠理解的 IP 位址 (如 "93.184.216.34")
* DNS 系統中，常見的資源記錄類型：

### DNS 的 A record 是什麼
* **A 記錄 (Address Record)** 主要是將網域名稱 (domain name) 解析為 IPv4 位址
* 當使用者在瀏覽器中輸入一個域名時，DNS 伺服器會根據 A 記錄找到對應的 IP 位址，然後將流量導向該伺服器
* 舉例來說，當輸入 "example.com" 時，A 記錄會將 "example.com" 解析成像是 "93.184.216.34" 這樣的 IP 位址

### DNS 的 NS record 是什麼
* **NS 記錄 (Name Server Record)** 用來指定某個網域的 Name Server，負責處理該網域的 DNS 查詢。
* 當 DNS 伺服器收到針對某個網域的查詢時，會根據 NS 記錄來確認該查詢應該由哪一台伺服器來回應。
* 通常每個網域會有多個 NS 記錄來提供冗餘備援。

### Domain Name vs FQDN vs URL 這三者分別為何
* Domain Name：網域名稱是用來代表一個網站的文字地址。例如 "example.com"
* FQDN (Fully Qualified Domain Name)：完全合格的網域名稱包含了主機名稱和網域名稱，具體指向網路上的某一台設備。例如 "www.example.com." (注意末尾有一個 .) 是一個 FQDN，它指向了網域下的一個具體主機
* URL (Uniform Resource Locator): 統一資源定位符是一個包含了更多資訊的網址，通常包含協議 (http/https)、域名或 IP 位址、路徑及查詢參數。例如 "https://www.example.com/path?query=1" 是一個 URL，它不僅指出了網域，還包括了資源的具體路徑

### 為什麼應該要為網站加上憑證？而不是直接用 http 就好
* 加密通信：HTTPS 透過加密防止第三方竊聽，避免數據在傳輸過程中被攔截或竄改。
* 數據完整性：加密也確保了數據在傳輸過程中不會被篡改。
* 身份驗證：憑證提供了網站的真實性驗證，讓使用者確定他們與正確的伺服器通信，防止釣魚攻擊。
* SEO 影響：搜尋引擎（如 Google）會優先排名使用 HTTPS 的網站。
* 瀏覽器警告：現代瀏覽器對於使用 HTTP 的網站會顯示「不安全」的警告，這會影響使用者信任。
* 因此加入憑證後，使用 HTTPS (HTTP Secure) 會比 HTTP 更安全

#### ref
* [搞懂 IP、FQDN、DNS、Name Server](https://its-okay.medium.com/%E6%90%9E%E6%87%82-ip-fqdn-dns-name-server-%E9%BC%A0%E5%B9%B4%E5%85%A8%E9%A6%AC%E9%90%B5%E4%BA%BA%E6%8C%91%E6%88%B0-05-aa60f45496fb)


