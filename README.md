# 2027 春水堂班級手搖飲點餐

依 `menu.jpg` 菜單設計的班級點飲料網站，共兩個頁面：

- **點餐頁**：`index.html` — 顯示菜單、點餐表單、即時價格計算
- **點餐狀況頁**：`status.html` — 讀取 Google Sheet 顯示目前所有訂單

## 網站網址

- 點餐：https://kirkchu.github.io/2027teashop/
- 點餐狀況：https://kirkchu.github.io/2027teashop/status.html

## 頁面排版

點餐頁由上而下共 2 列：

1. 菜單（`menu.jpg` 等比例縮放、不裁切）
2. 表單 | 價格

## 功能

- 菜單所有餐點（飲品、茶點、湯品、拼盤、蒸物、炸物、滷煮物、套餐、麵食、加點）皆列於表單中
- 飲品可選：冷／熱、容量（S 330ml／M 660ml）、甜度、冰塊、數量
- 表單含「輸入姓名」作為餐點識別
- 右側價格區即時計算總金額，送出時一併寫入 Google Sheet
- 送出後資料寫入 Google Sheet「2027手搖飲點餐記錄」

## 資料儲存

- Google Sheet：`2027手搖飲點餐記錄`
- 第一列標題：`時間`、`姓名`、`餐點明細`、`杯數`、`總金額`、`明細JSON`
- Apps Script 原始碼：`apps-script/Code.gs`（部署為網頁應用程式，執行身分：我，存取權：任何人）
- 前端 API 網址設定於 `assets/config.js` 的 `API_URL`

## 專案結構

```
index.html            點餐頁
status.html           點餐狀況頁
assets/
  config.js           API 設定
  menu-data.js        菜單資料（品項、價格）
  app.js              點餐頁邏輯
  status.js           點餐狀況頁邏輯
  styles.css          樣式
  menu.jpg            菜單圖片
apps-script/
  Code.gs             Google Apps Script（寫入／讀取 Google Sheet）
```
