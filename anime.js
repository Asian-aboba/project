document.querySelector("button").addEventListener("click", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const phoneInput = document.getElementById("phone");
  const nameInput = document.querySelector("input.name");
  const surnameInput = document.querySelector("input.soursname");

  clearErrors();

  let valid = true;

  // Email 
  if (!emailInput.value.includes("@gmail.com")) {
    showError(emailInput, "Невірний email");
    valid = false;
  }

  // Логін 
  if (loginInput.value.trim() === "") {
    showError(loginInput, "Невірний логін");
    valid = false;
  }

  // Пароль 
  const password = passwordInput.value;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  if (!passwordRegex.test(password)) {
    showError(passwordInput, "Невірний пароль");
    valid = false;
  }

  // Телефон - тільки цифри, довжина 10-15
  const phone = phoneInput.value.trim();
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    showError(phoneInput, "Невірний номер телефону");
    valid = false;
  }

  // Ім'я - не пусте, тільки літери, дефіс або пробіли
  const name = nameInput.value.trim();
  const nameRegex = /^[a-zA-Zа-яА-ЯіїІЇєЄґҐ\s\-]+$/;
  if (name === "" || !nameRegex.test(name)) {
    showError(nameInput, "Невірне ім'я");
    valid = false;
  }

  // Прізвище - аналогічно до імені
  const surname = surnameInput.value.trim();
  if (surname === "" || !nameRegex.test(surname)) {
    showError(surnameInput, "Невірне прізвище");
    valid = false;
  }

  if (valid) {
    alert("Реєстрація успішна! 🎉");
  }
});

// Функції showError і clearErrors твої залишай без змін
function showError(input, message) {
  const wrapper = input.closest(".input-wrapper");
  const errorDiv = wrapper.querySelector(".error-message");
  errorDiv.innerText = message;
  errorDiv.classList.add("visible");
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.innerText = "";
    el.classList.remove("visible");
  });
}
