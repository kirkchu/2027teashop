/* 點餐頁邏輯 */
(function () {
  'use strict';

  const MENU = window.MENU;
  const SUGAR = window.SUGAR_OPTIONS;
  const ICE = window.ICE_OPTIONS;

  const formEl = document.getElementById('menuForm');
  const tabsEl = document.getElementById('categoryTabs');
  const priceTotalEl = document.getElementById('priceTotal');
  const priceCountEl = document.getElementById('priceCount');
  const priceListEl = document.getElementById('priceList');
  const nameEl = document.getElementById('customerName');
  const formMsgEl = document.getElementById('formMsg');
  const submitBtn = document.getElementById('submitBtn');
  const orderForm = document.getElementById('orderForm');

  /* ---------- helpers ---------- */
  const isDrink = (item) => !!(item.cold || item.hot);
  const hasBothTemps = (item) => !!(item.cold && item.hot);
  const hasSizes = (item) => {
    const p = item.cold || item.hot || {};
    return p.S !== undefined || p.M !== undefined;
  };

  function priceOf(item, temp, size) {
    if (item.single !== undefined) return item.single;
    const table = item[temp];
    if (!table) return 0;
    if (size && table[size] !== undefined) return table[size];
    if (table.single !== undefined) return table.single;
    if (table.S !== undefined) return table.S;
    if (table.M !== undefined) return table.M;
    return 0;
  }

  function priceLabel(item) {
    if (item.single !== undefined) return `$${item.single}`;
    const parts = [];
    if (item.cold) {
      if (item.cold.S !== undefined) parts.push(`冷S $${item.cold.S}`);
      if (item.cold.M !== undefined) parts.push(`冷M $${item.cold.M}`);
    }
    if (item.hot) {
      if (item.hot.S !== undefined) parts.push(`熱S $${item.hot.S}`);
      if (item.hot.M !== undefined) parts.push(`熱M $${item.hot.M}`);
      if (item.hot.single !== undefined) parts.push(`熱 $${item.hot.single}`);
    }
    return parts.join(' / ');
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  /* ---------- render ---------- */
  function renderTabs() {
    tabsEl.innerHTML = MENU.categories
      .map((c, i) => `<button type="button" class="tab${i === 0 ? ' active' : ''}" data-cat="${c.id}">${esc(c.name)}</button>`)
      .join('');
    tabsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab');
      if (!btn) return;
      const id = btn.dataset.cat;
      tabsEl.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === btn));
      formEl.querySelectorAll('.cat-group').forEach((g) => {
        g.classList.toggle('hidden', g.dataset.cat !== id);
        if (g.dataset.cat === id) g.classList.add('open');
      });
    });
  }

  function itemHTML(item, catId) {
    const drink = isDrink(item);
    const both = hasBothTemps(item);
    const sizes = hasSizes(item);
    const defaultTemp = item.cold ? 'cold' : 'hot';
    const defaultSize = (item.cold || item.hot || {}).M !== undefined ? 'M' : 'S';

    let opts = '';

    if (both) {
      opts += `<div class="opt-group"><span class="opt-label">溫度</span>
        <label class="opt-pill"><input type="radio" name="temp-${item.id}" value="cold" checked><span>冷飲</span></label>
        <label class="opt-pill"><input type="radio" name="temp-${item.id}" value="hot"><span>熱飲</span></label>
      </div>`;
    }

    if (sizes) {
      const table = item.cold || item.hot || {};
      const sizeOpts = [];
      if (table.S !== undefined) sizeOpts.push(['S', 'S 330ml']);
      if (table.M !== undefined) sizeOpts.push(['M', 'M 660ml']);
      opts += `<div class="opt-group"><span class="opt-label">容量</span>${sizeOpts
        .map(([v, label]) => `<label class="opt-pill"><input type="radio" name="size-${item.id}" value="${v}"${v === defaultSize ? ' checked' : ''}><span>${label}</span></label>`)
        .join('')}</div>`;
    }

    if (drink && !item.noSugar) {
      opts += `<div class="opt-group"><span class="opt-label">甜度</span>${SUGAR
        .map((s, i) => `<label class="opt-pill"><input type="radio" name="sugar-${item.id}" value="${esc(s)}"${i === 0 ? ' checked' : ''}><span>${esc(s)}</span></label>`)
        .join('')}</div>`;
    }

    if (drink) {
      opts += `<div class="opt-group"><span class="opt-label">冰塊</span>${ICE
        .map((s, i) => `<label class="opt-pill"><input type="radio" name="ice-${item.id}" value="${esc(s)}"${i === 0 ? ' checked' : ''}><span>${esc(s)}</span></label>`)
        .join('')}</div>`;
    }

    opts += `<div class="opt-group"><span class="opt-label">數量</span>
      <div class="qty">
        <button type="button" class="qty-minus" aria-label="減少">−</button>
        <input type="number" class="qty-input" min="1" max="99" value="1" inputmode="numeric">
        <button type="button" class="qty-plus" aria-label="增加">+</button>
      </div>
    </div>`;

    return `
      <div class="item" data-id="${item.id}" data-cat="${catId}" data-temp="${defaultTemp}">
        <div class="item-main">
          <label class="item-check">
            <input type="checkbox" class="item-toggle">
            <span class="item-name">${esc(item.name)}<span class="item-en">${esc(item.en || '')}</span></span>
          </label>
          <span class="item-price">${priceLabel(item)}</span>
        </div>
        <div class="item-options">${opts}</div>
      </div>`;
  }

  function renderForm() {
    formEl.innerHTML = MENU.categories
      .map((c, i) => `
        <div class="cat-group${i === 0 ? ' open' : ''}" data-cat="${c.id}">
          <button type="button" class="cat-head">
            <span class="cat-head-left">
              <span class="cat-name">${esc(c.name)}</span>
              <span class="cat-en">${esc(c.en || '')}</span>
            </span>
            <span class="cat-meta">
              <span class="cat-badge" data-badge="${c.id}">0</span>
              <span class="cat-chevron">▾</span>
            </span>
          </button>
          <div class="cat-body">${c.items.map((it) => itemHTML(it, c.id)).join('')}</div>
        </div>`)
      .join('');
  }

  /* ---------- interactions ---------- */
  formEl.addEventListener('click', (e) => {
    const head = e.target.closest('.cat-head');
    if (head) {
      head.parentElement.classList.toggle('open');
      return;
    }
    const minus = e.target.closest('.qty-minus');
    const plus = e.target.closest('.qty-plus');
    if (minus || plus) {
      const input = (minus || plus).parentElement.querySelector('.qty-input');
      let v = parseInt(input.value, 10) || 1;
      v = minus ? Math.max(1, v - 1) : Math.min(99, v + 1);
      input.value = v;
      updatePrice();
    }
  });

  formEl.addEventListener('change', (e) => {
    const t = e.target;
    if (t.classList.contains('item-toggle')) {
      const itemEl = t.closest('.item');
      itemEl.classList.toggle('selected', t.checked);
      if (t.checked) {
        const qty = itemEl.querySelector('.qty-input');
        if (!qty.value || qty.value === '0') qty.value = 1;
      }
      updatePrice();
      return;
    }
    if (t.type === 'radio' && t.name.startsWith('temp-')) {
      const itemEl = t.closest('.item');
      itemEl.dataset.temp = t.value;
      // 熱飲不提供冰塊
      const iceGroup = [...itemEl.querySelectorAll('.opt-group')].find((g) => g.textContent.includes('冰塊'));
      if (iceGroup) iceGroup.style.display = t.value === 'hot' ? 'none' : '';
      updatePrice();
      return;
    }
    if (t.type === 'radio' || t.type === 'number') updatePrice();
  });

  formEl.addEventListener('input', (e) => {
    if (e.target.classList.contains('qty-input')) {
      let v = parseInt(e.target.value, 10);
      if (isNaN(v) || v < 1) v = 1;
      if (v > 99) v = 99;
      e.target.value = v;
      updatePrice();
    }
  });

  document.getElementById('expandAll').addEventListener('click', () => {
    formEl.querySelectorAll('.cat-group').forEach((g) => g.classList.remove('hidden'));
    formEl.querySelectorAll('.cat-group').forEach((g) => g.classList.add('open'));
    tabsEl.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
  });

  document.getElementById('collapseAll').addEventListener('click', () => {
    formEl.querySelectorAll('.cat-group').forEach((g) => g.classList.remove('open'));
  });

  /* ---------- collect ---------- */
  function collect() {
    const rows = [];
    formEl.querySelectorAll('.item.selected').forEach((el) => {
      const id = el.dataset.id;
      const cat = MENU.categories.find((c) => c.id === el.dataset.cat);
      const item = cat.items.find((i) => i.id === id);
      const temp = el.dataset.temp;
      const sizeInput = el.querySelector(`input[name="size-${id}"]:checked`);
      const size = sizeInput ? sizeInput.value : '';
      const sugarInput = el.querySelector(`input[name="sugar-${id}"]:checked`);
      const iceInput = el.querySelector(`input[name="ice-${id}"]:checked`);
      const qty = Math.max(1, parseInt(el.querySelector('.qty-input').value, 10) || 1);
      const unit = priceOf(item, temp, size);
      rows.push({
        category: cat.name,
        itemId: id,
        item: item.name,
        temp: isDrink(item) ? (temp === 'cold' ? '冷飲' : '熱飲') : '',
        size: size ? (size === 'S' ? 'S' : 'M') : '',
        sugar: sugarInput ? sugarInput.value : '',
        ice: iceInput && temp === 'cold' ? iceInput.value : '',
        qty,
        unitPrice: unit,
        subtotal: unit * qty
      });
    });
    return rows;
  }

  function updatePrice() {
    const rows = collect();
    const total = rows.reduce((s, r) => s + r.subtotal, 0);
    const cups = rows.reduce((s, r) => s + r.qty, 0);

    priceTotalEl.textContent = `$${total}`;
    priceCountEl.textContent = `已選 ${cups} 杯 / ${rows.length} 項`;

    if (!rows.length) {
      priceListEl.innerHTML = '<li class="price-empty">尚未選擇餐點</li>';
    } else {
      priceListEl.innerHTML = rows
        .map((r) => {
          const detail = [r.temp, r.size, r.sugar, r.ice].filter(Boolean).join(' · ');
          return `<li>
            <span class="li-name">${esc(r.item)} × ${r.qty}
              <span class="li-detail">${esc(detail)}</span>
            </span>
            <span class="li-amount">$${r.subtotal}</span>
          </li>`;
        })
        .join('');
    }

    // 分類徽章
    const counts = {};
    rows.forEach((r) => { counts[r.category] = (counts[r.category] || 0) + r.qty; });
    formEl.querySelectorAll('[data-badge]').forEach((b) => {
      const n = counts[b.dataset.badge] || 0;
      b.textContent = n;
      b.style.display = n ? '' : 'none';
    });

    return { rows, total, cups };
  }

  /* ---------- toast ---------- */
  let toastEl = null;
  function toast(msg, isErr) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.toggle('err', !!isErr);
    toastEl.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }

  /* ---------- submit ---------- */
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMsgEl.textContent = '';
    formMsgEl.className = 'form-msg';

    const name = nameEl.value.trim();
    if (!name) {
      formMsgEl.textContent = '請先輸入姓名';
      formMsgEl.classList.add('err');
      nameEl.focus();
      return;
    }

    const { rows, total, cups } = updatePrice();
    if (!rows.length) {
      formMsgEl.textContent = '請至少選擇一項餐點';
      formMsgEl.classList.add('err');
      return;
    }

    const apiUrl = (window.APP_CONFIG && window.APP_CONFIG.API_URL) || '';
    if (!apiUrl) {
      formMsgEl.textContent = '尚未設定 Google Sheet API，請先完成 Apps Script 部署';
      formMsgEl.classList.add('err');
      return;
    }

    const payload = {
      name,
      total,
      cups,
      items: rows,
      itemsText: rows.map((r) => {
        const d = [r.temp, r.size, r.sugar, r.ice].filter(Boolean).join('/');
        return `${r.item}${d ? `(${d})` : ''} x${r.qty}`;
      }).join('；'),
      pageUrl: location.href
    };

    submitBtn.disabled = true;
    submitBtn.textContent = '送出中…';

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || '寫入失敗');

      formMsgEl.textContent = `訂單已送出！總金額 $${total}`;
      formMsgEl.classList.add('ok');
      toast(`訂單已送出，總金額 $${total}`);

      // 重置
      formEl.querySelectorAll('.item.selected').forEach((el) => {
        el.classList.remove('selected');
        el.querySelector('.item-toggle').checked = false;
        el.querySelector('.qty-input').value = 1;
      });
      nameEl.value = '';
      updatePrice();
    } catch (err) {
      formMsgEl.textContent = `送出失敗：${err.message}`;
      formMsgEl.classList.add('err');
      toast('送出失敗，請稍後再試', true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '送出訂單';
    }
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    formEl.querySelectorAll('.item.selected').forEach((el) => {
      el.classList.remove('selected');
      el.querySelector('.item-toggle').checked = false;
      el.querySelector('.qty-input').value = 1;
    });
    nameEl.value = '';
    formMsgEl.textContent = '';
    updatePrice();
  });

  /* ---------- init ---------- */
  renderTabs();
  renderForm();
  updatePrice();
})();
