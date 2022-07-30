const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const DISABLE_CLASS = 'disabled';
let timerId = null;

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

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
