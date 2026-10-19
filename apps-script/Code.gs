/**
 * 2027 手搖飲點餐記錄 - Google Apps Script
 * 綁定於 Google Sheet「2027手搖飲點餐記錄」
 *
 * 部署方式：
 *   部署 > 新增部署作業 > 類型：網頁應用程式
 *   執行身分：我
 *   誰可以存取：任何人
 */

var SHEET_NAME = '2027手搖飲點餐記錄';
var TIME_ZONE = 'Asia/Taipei';
var HEADERS = ['時間', '姓名', '餐點明細', '杯數', '總金額', '明細JSON'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSpreadsheetTimeZone() !== TIME_ZONE) {
    ss.setSpreadsheetTimeZone(TIME_ZONE);
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#8c1d2b')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 110);
    sheet.setColumnWidth(3, 420);
    sheet.setColumnWidth(4, 70);
    sheet.setColumnWidth(5, 90);
    sheet.setColumnWidth(6, 420);
  }
  return sheet;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || '';
    var data = raw ? JSON.parse(raw) : {};

    var name = String(data.name || '').trim();
    var itemsText = String(data.itemsText || '').trim();
    var total = Number(data.total) || 0;
    var cups = Number(data.cups) || 0;

    if (!name) return jsonOut_({ ok: false, error: '缺少姓名' });
    if (!itemsText) return jsonOut_({ ok: false, error: '缺少餐點' });

    var sheet = getSheet_();
    sheet.appendRow([
      Utilities.formatDate(new Date(), TIME_ZONE, 'yyyy/MM/dd HH:mm:ss'),
      name,
      itemsText,
      cups,
      total,
      JSON.stringify(data.items || [])
    ]);

    return jsonOut_({ ok: true, total: total, cups: cups });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || 'list';
    if (action !== 'list') return jsonOut_({ ok: false, error: 'unknown action' });

    var sheet = getSheet_();
    var last = sheet.getLastRow();
    var orders = [];

    if (last > 1) {
      var values = sheet.getRange(2, 1, last - 1, 5).getValues();
      for (var i = 0; i < values.length; i++) {
        var r = values[i];
        if (!r[1]) continue;
        orders.push({
          time: r[0] instanceof Date
            ? Utilities.formatDate(r[0], TIME_ZONE, 'yyyy/MM/dd HH:mm:ss')
            : String(r[0]),
          name: String(r[1]),
          items: String(r[2]),
          cups: Number(r[3]) || 0,
          total: Number(r[4]) || 0
        });
      }
    }

    return jsonOut_({ ok: true, orders: orders });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}
