import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const DISABLE_CLASS = 'disabled';
let choosedDate = null;

const timer = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosedDate = selectedDates[0].getTime();
    const deltaDate = choosedDate - Date.now();
    if (deltaDate <= 0) {
      startBtn.classList.add(DISABLE_CLASS);
      alert('Please choose a date in the future!');
      return;
    }
    startBtn.classList.remove(DISABLE_CLASS);

    return choosedDate;
  },
};

flatpickr('#datetime-picker', options);
const inputDate = document.querySelector('#datetime-picker')._flatpickr;

startBtn.addEventListener('click', onClickStartCount);

function onClickStartCount(event) {
  if (event.target.classList.contains(DISABLE_CLASS)) {
    return;
  }

  let timerId = null;

  timerId = setInterval(() => {
    startBtn.classList.remove(DISABLE_CLASS);

    const deltaTime = choosedDate - Date.now();

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    timer.days.textContent = days;
    timer.hours.textContent = hours;
    timer.minutes.textContent = minutes;
    timer.seconds.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padStart(Math.floor(ms / day));
  const hours = padStart(Math.floor((ms % day) / hour));
  const minutes = padStart(Math.floor(((ms % day) % hour) / minute));
  const seconds = padStart(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function padStart(value) {
  return String(value).padStart(2, '0');
}
