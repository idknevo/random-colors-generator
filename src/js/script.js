const bodyEl = document.querySelector("body");
const containerEl = document.querySelector(".container");
const toastBox = document.querySelector(".toast-box");

// create color elements
const noOfColors = 12;
const generateColorElements = function (numOfColors) {
  for (let i = 0; i < numOfColors; i++) {
    const colorEl = document.createElement("div");
    colorEl.classList.add("color");
    containerEl.appendChild(colorEl);
  }
};
generateColorElements(noOfColors);

const colorElements = document.querySelectorAll(".color");

const generateColors = function () {
  const chars = "0123456789abcdef";
  let color = "";
  let colorLength = 6;
  for (let i = 0; i < colorLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    color += chars.substring(randomNumber, randomNumber + 1);
  }
  return "#" + color;
};

colorElements.forEach((color) => {
  color.textContent = color.style.backgroundColor = generateColors();
});

const copyColor = async function (content) {
  try {
    await navigator.clipboard.writeText(content);
  } catch (err) {
    console.error(err);
  }
};

const renderMessage = function (msg) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = msg;
  if (msg.includes("copy")) {
    toast.classList.add("copy");
  }
  if (msg.includes("clipboard")) {
    toast.classList.add("done");
  }
  if (msg.includes("Refreshed")) {
    toast.classList.add("refresh");
  }

  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
};

containerEl.addEventListener("click", function (e) {
  const color = e.target.closest(".color").textContent;
  if (!color) return;
  copyColor(color);
  toastBox.innerHTML = "";
  const doneMsg = `<i class="fa-regular fa-circle-check"></i> Copied to clipboard.`;
  renderMessage(doneMsg);
});

window.addEventListener("load", function (e) {
  toastBox.innerHTML = "";
  const loadMsg = `<i class="fa-solid fa-bell"></i> Click on any color to copy it.`;
  renderMessage(loadMsg);
});

// dark mode
const inputEl = document.querySelector(".input");
const h1El = document.querySelector("h1");
inputEl.checked = JSON.parse(localStorage.getItem("mode"));

const updateBackground = function () {
  if (inputEl.checked) {
    bodyEl.style.backgroundColor = "#000000";
    h1El.style.color = "#ffffff";
  } else {
    bodyEl.style.backgroundColor = "#ffffff";
    h1El.style.color = "#000000";
  }
};
updateBackground();

const updateLocalStorage = function () {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
};
inputEl.addEventListener("input", function () {
  updateBackground();
  updateLocalStorage();
});

// refresh btn
const addMoreBtn = document.querySelector(".btn");
addMoreBtn.addEventListener("click", function () {
  containerEl.innerHTML = "";
  generateColorElements(noOfColors);
  const colorElements = document.querySelectorAll(".color");
  colorElements.forEach((color) => {
    color.textContent = color.style.backgroundColor = generateColors();
  });
  toastBox.innerHTML = "";
  const loadMsg = `<i class="fa-solid fa-arrows-rotate"></i> Refreshed.`;
  renderMessage(loadMsg);
});
