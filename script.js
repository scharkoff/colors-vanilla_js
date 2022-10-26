const cols = document.querySelectorAll(".col"); // -- все колонки
const locks = document.querySelectorAll("i"); // -- все замки
const texts = document.querySelectorAll(".text");

// -- самодельный генератор хеш кода цвета
function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";

  for (i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }

  return "#" + color;
}

// -- клик по замку
locks.forEach((lock) => {
  lock.addEventListener("click", (e) => {
    e.target.classList.toggle("fa-lock-open");
  });
});

// -- клик по хеш-коду
texts.forEach((text) => {
  const alert = text.previousElementSibling;
  text.addEventListener("click", (e) => {
    navigator.clipboard
      .writeText(e.target.innerHTML)
      .then(() => {
        alert.style.display = "block";
        setTimeout(() => {
          alert.style.display = "none";
        }, 1000);
      })
      .catch((err) => {
        console.error("Error in copying text: ", err);
      });
  });
});

// -- установить колонкам рандомный цвет
function setRandomColor() {
  cols.forEach((col) => {
    const color = chroma.random().hex(); // -- цвет колонки
    const text = col.querySelector("p"); // -- текст колонки (хеш цвета)
    const lock = col.querySelector("i"); // -- замок колонки
    const alert = col.querySelector(".alert"); // -- сообщение об успешном копировании

    // -- не менять цвет, если замок закрыт
    if (!lock.classList.contains("fa-lock-open")) {
      return;
    }

    text.innerHTML = color.toUpperCase();
    col.style.background = color;
    setTextColor(text, color, lock, alert);
  });
}

// -- установить корректный цвет текста и замка под цвет колонки
function setTextColor(text, color, lock, alert) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.6) {
    text.style.color = "black";
    lock.style.color = "black";
    alert.style.color = "black";
  } else {
    text.style.color = "white";
    lock.style.color = "white";
    alert.style.color = "white";
  }
}

// -- установить цвета при первой запуске страницы
setRandomColor();

// -- обновление цветов по кнопке
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    setRandomColor();
  }
});
