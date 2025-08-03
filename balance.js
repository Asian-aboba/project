// balance.js

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([$?*|{}\]\\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

function updateBalanceDisplay() {
  const balance = parseFloat(getCookie('balance')) || 0;
  const currency = getCookie('currency') || 'грн';
  const el = document.getElementById('balance');
  if(el) {
    el.textContent = `Баланс: ${balance.toFixed(2)} ${currency}`;
    el.style.color = balance < 0 ? 'red' : 'black';
  }
  if(balance <= -1000) {
    showModal();
  }
}

function showModal() {
  const modal = document.getElementById('modal');
  if(modal) modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('modal');
  if(modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', updateBalanceDisplay);
