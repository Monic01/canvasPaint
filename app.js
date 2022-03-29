const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("color");
const range = document.querySelector("#brushSize");
const changeBtn = document.querySelector("#changeBtn");
const saveBtn = document.querySelector("#saveBtn");
const brushState = document.querySelector("#brushState");
const resetBtn = document.querySelector("#resetBtn");
const nowColor = document.querySelector("#nowColor");

canvas.width = 600;
canvas.height = 600;
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown() {
  painting = true;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  nowColor.style.backgroundColor = color;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function cursorPointer() {
  if (filling === false) {
    canvas.style.cursor = "crosshair";
  } else {
    canvas.style.cursor = "cell";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("mouseover", cursorPointer);
  canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function onHandleSize(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  range.addEventListener("input", onHandleSize);
}

function changeMode() {
  if (filling === true) {
    changeBtn.innerText = "FILL";
    brushState.innerText = "Now use Brush";
    filling = false;
  } else {
    changeBtn.innerText = "BRUSH";
    brushState.innerText = "Now use Fill";
    filling = true;
  }
}

changeBtn.addEventListener("click", changeMode);

resetBtn.addEventListener("click", function () {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener("click", function () {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "null";
  link.click();
});
