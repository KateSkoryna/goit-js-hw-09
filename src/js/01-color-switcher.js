const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const DISABLE_CLASS = 'disabled';
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onClickStartColorChange);
stopBtn.addEventListener('click', onClickStopColorChange);

function onClickStartColorChange(event) {
  const currentEl = event.target;

  if (currentEl.classList.contains(DISABLE_CLASS)) {
    return;
  }
  chaeckDisableStatus(currentEl, stopBtn, DISABLE_CLASS);

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStopColorChange(event) {
  if (timerId === null) {
    return;
  }
  const currentEl = event.target;
  chaeckDisableStatus(currentEl, startBtn, DISABLE_CLASS);
  clearInterval(timerId);
}

function chaeckDisableStatus(activeEl, disabledEl, classAdd) {
  if (activeEl.classList.contains(classAdd)) {
    return;
  }
  activeEl.classList.add(classAdd);
  disabledEl.classList.remove(classAdd);
}

// ВТОРОЙ ВАРИАНТ

// const startBtn = document.querySelector('button[data-start]');
// const stopBtn = document.querySelector('button[data-stop]');
// const body = document.querySelector('body');
// const DISABLED_ATTRIBUTE = 'disabled';
// let timerId = null;

// startBtn.addEventListener('click', onClickStartColorChange);
// stopBtn.addEventListener('click', onClickStopColorChange);

// function onClickStartColorChange(event) {
//   const currentEl = event.target;

//   if (currentEl.hasAttribute(DISABLED_ATTRIBUTE)) {
//     return;
//   }

//   chaeckDisableStatus(currentEl, stopBtn, DISABLED_ATTRIBUTE);

//   timerId = setInterval(() => {
//     body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// }

// function onClickStopColorChange(event) {
//   if (timerId === null) {
//     return;
//   }
//   const currentEl = event.target;
//   chaeckDisableStatus(currentEl, startBtn, DISABLED_ATTRIBUTE);
//   clearInterval(timerId);
// }

// function chaeckDisableStatus(activeEl, disabledEl, attributeAdd) {
//   if (activeEl.hasAttribute(attributeAdd)) {
//     return;
//   }
//   activeEl.setAttribute(attributeAdd, attributeAdd);
//   disabledEl.removeAttribute(attributeAdd);
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
