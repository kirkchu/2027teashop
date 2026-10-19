/* 點餐狀況頁 */
(function () {
  'use strict';

  const metaEl = document.getElementById('statusMeta');
  const bodyEl = document.getElementById('statusBody');
  const cardsEl = document.getElementById('summaryCards');
  const refreshBtn = document.getElementById('refreshBtn');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function fmtTime(v) {
    if (!v) return '';
    const d = new Date(v);
    if (isNaN(d.getTime())) return String(v);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  function render(orders) {
    const totalAmount = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
    const totalCups = orders.reduce((s, o) => s + (Number(o.cups) || 0), 0);

    cardsEl.innerHTML = `
      <div class="summary-card"><div class="k">訂單筆數</div><div class="v">${orders.length}</div></div>
      <div class="summary-card"><div class="k">總杯數</div><div class="v">${totalCups}</div></div>
      <div class="summary-card"><div class="k">總金額</div><div class="v">$${totalAmount}</div></div>
    `;

    if (!orders.length) {
      bodyEl.innerHTML = '<tr><td colspan="5" class="status-empty">目前尚無點餐紀錄</td></tr>';
      return;
    }

    bodyEl.innerHTML = orders
      .map((o) => `
        <tr>
          <td>${esc(fmtTime(o.time))}</td>
          <td>${esc(o.name)}</td>
          <td>${esc(o.items)}</td>
          <td class="num">${esc(o.cups)}</td>
          <td class="num money">$${esc(o.total)}</td>
        </tr>`)
      .join('');
  }

  async function load() {
    const apiUrl = (window.APP_CONFIG && window.APP_CONFIG.API_URL) || '';
    if (!apiUrl) {
      metaEl.textContent = '尚未設定 Google Sheet API';
      bodyEl.innerHTML = '<tr><td colspan="5" class="status-empty">請先在 assets/config.js 填入 Apps Script 網址</td></tr>';
      return;
    }

    metaEl.textContent = '載入中…';
    refreshBtn.disabled = true;
    try {
      const res = await fetch(`${apiUrl}?action=list&t=${Date.now()}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || '讀取失敗');
      render(data.orders || []);
      metaEl.textContent = `最後更新：${new Date().toLocaleTimeString('zh-TW', { hour12: false })}`;
    } catch (err) {
      metaEl.textContent = `讀取失敗：${err.message}`;
      bodyEl.innerHTML = '<tr><td colspan="5" class="status-empty">無法取得資料，請稍後重新整理</td></tr>';
    } finally {
      refreshBtn.disabled = false;
    }
  }

  refreshBtn.addEventListener('click', load);
  load();
})();
