// invest.js
function topUp() {
  const amountInput = document.getElementById('amount');
  const currencySelect = document.getElementById('currency');

  const rawValue = amountInput.value.replace(',', '.').trim();
  const amount = parseFloat(rawValue);

  if (isNaN(amount) || amount <= 0) {
    alert("Введи правильну суму");
    return;
  }

  const current = parseFloat(getCookie('balance')) || 0;
  const currency = currencySelect.value;
  const newBalance = current + amount;

  setCookie('balance', newBalance);
  setCookie('currency', currency);

  // додати запис в історію
  let history = [];
  const historyStr = getCookie('topupHistory');
  if(historyStr) {
    try {
      history = JSON.parse(historyStr);
    } catch(e) {
      history = [];
    }
  }

  const now = new Date();
  history.push({
    amount: amount.toFixed(2),
    currency: currency,
    date: now.toLocaleString()
  });

  setCookie('topupHistory', JSON.stringify(history));

  updateBalanceDisplay();
  updateHistoryDisplay();

  amountInput.value = "";
}

function updateHistoryDisplay() {
  const historyBox = document.getElementById('history');
  if(!historyBox) return;

  const historyStr = getCookie('topupHistory');
  if(!historyStr) {
    historyBox.innerHTML = '<p>Поки що порожньо...</p>';
    return;
  }

  let history;
  try {
    history = JSON.parse(historyStr);
  } catch(e) {
    historyBox.innerHTML = '<p>Поки що порожньо...</p>';
    return;
  }

  if(history.length === 0) {
    historyBox.innerHTML = '<p>Поки що порожньо...</p>';
    return;
  }

  let html = '<ul>';
  for(let i = history.length - 1; i >= 0; i--) {
    const rec = history[i];
    html += `<li>${rec.date} — Поповнення: ${rec.amount} ${rec.currency}</li>`;
  }
  html += '</ul>';

  historyBox.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  updateBalanceDisplay();
  updateHistoryDisplay();
});

