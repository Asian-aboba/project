// Функції getCookie, setCookie, updateBalanceDisplay мають бути у твоєму коді

const spinBtn = document.getElementById("spin-btn");
const depositBtn = document.getElementById("deposit-btn");
const depositModal = document.getElementById("deposit-modal");
const closeModalBtn = document.getElementById("close-modal");
const bigMessage = document.getElementById("big-message");

// Символи для слотів
const symbols = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiHZr0ItiTf7uWb5RGjuzqJ4drlqzw2j8xnsAymQ8zTwQUC8FBC4WsyV7j2U69BIceG5U&usqp=CAU",
  "https://cdn-icons-png.flaticon.com/128/3521/3521726.png",
  "https://cdn-icons-png.flaticon.com/128/11159/11159127.png",
  "https://cdn-icons-png.flaticon.com/128/2001/2001386.png",
];

function spin() {
  const columns = document.querySelectorAll(".reel-column");
  const resultText = document.getElementById("result");
  const winOverlay = document.getElementById("win-overlay");

  let balance = parseFloat(getCookie('balance')) || 0;
  const currency = getCookie('currency') || 'грн';

  if(balance < 10000){
    alert(`Недостатньо коштів для спіна. Потрібно мінімум 10000 ${currency}. Твій баланс: ${balance.toFixed(2)} ${currency}`);
    return;
  }

  balance -= 10000;
  setCookie('balance', balance);
  setCookie('currency', currency);
  updateBalanceDisplay();

  depositBtn.style.display = "none";
  depositModal.style.display = "none";
  bigMessage.style.display = "none";
  winOverlay.style.display = "none";

  resultText.textContent = "Крутиться... 🎲";

  let spinFrames = 20;
  let currentFrame = 0;
  let interval = 30;

  function spinStep() {
    columns.forEach(col => {
      const slots = col.querySelectorAll(".slot");
      slots[0].src = symbols[Math.floor(Math.random() * symbols.length)];
      slots[1].src = symbols[Math.floor(Math.random() * symbols.length)];
      slots[2].src = symbols[Math.floor(Math.random() * symbols.length)];
    });

    currentFrame++;

    if (currentFrame >= spinFrames) {
      const results = [];
      columns.forEach(col => {
        const middleSlot = col.querySelector(".middle");
        results.push(middleSlot.src);
      });

      if (results[0] === results[1] && results[1] === results[2]) {
        resultText.textContent = "🎉 Вітаємо! Три однакових!";
        winOverlay.style.display = "block";
        depositBtn.style.display = "none";
      } else {
        resultText.textContent = "😢 Спробуй ще!";
        depositBtn.style.display = "inline-block";
      }
    } else {
      interval += 15;
      setTimeout(spinStep, interval);
    }
  }

  spinStep();
}

spinBtn.onclick = spin;
