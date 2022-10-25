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
    const color = generateRandomColor();
    const text = col.querySelector("p");
    text.innerHTML = color;
    col.style.background = color;
  });
}

console.log(generateRandomColor());
setRandomColor();
