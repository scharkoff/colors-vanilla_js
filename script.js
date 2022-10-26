const cols = document.querySelectorAll(".col");

function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";

  for (i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }

  return "#" + color;
}

function setRandomColor() {
  cols.forEach((col) => {
    const color = chroma.random().hex();
    const text = col.querySelector("p");
    const lock = col.querySelector("button").querySelector("i");
    text.innerHTML = color.toUpperCase();
    col.style.background = color;
    setTextColor(text, color, lock);
  });
}

function setTextColor(text, color, lock) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.6) {
    text.style.color = "black";
    lock.style.color = "black";
  } else {
    text.style.color = "white";
    lock.style.color = "white";
  }
}

console.log(generateRandomColor());
setRandomColor();
