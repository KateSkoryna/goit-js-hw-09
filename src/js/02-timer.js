import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
      Notify.failure('Please choose a date in the future!');
      return;
    }
    startBtn.removeAttribute('disabled');
    return choosedDate;
  },
};

flatpickr('#datetime-picker', options);
const inputDate = document.querySelector('#datetime-picker')._flatpickr;

startBtn.addEventListener('click', onClickStartCount);

function onClickStartCount(event) {
  if (event.target.removeAttribute('disabled')) {
    return;
  }

  let timerId = null;

  timerId = setInterval(() => {
    startBtn.removeAttribute('disabled');

    const deltaTime = choosedDate - Date.now();
    console.log(choosedDate);
    console.log(deltaTime);

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime >= 0) {
      timer.days.textContent = days;
      timer.hours.textContent = hours;
      timer.minutes.textContent = minutes;
      timer.seconds.textContent = seconds;
    } else {
      clearInterval(timerId);
    }
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

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// const refs = {
//   input: document.querySelector('#datetime-picker'),
//   btnStart: document.querySelector('[data-start]'),
//   timerValue: document.querySelector('.value'),
// };

// refs.btnStart.addEventListener('click', startTimer);

// refs.btnStart.disabled = true;

// let deadline = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     deadline = selectedDates[0].getTime();
//     const d = deadline - Date.now();
//     console.log(deadline);
//     if (d <= 0) {
//       alert('Please choose a date in the future');
//     }

//     refs.btnStart.disabled = false;
//     // return deadline
//   },
// };

// const fp = flatpickr(refs.input, options);
// console.log(deadline);

// function initialTimer({ days, hours, minutes, seconds }) {
//   refs.timerValue.textContent = `${days}:${hours}:${minutes}:${seconds}`;
// }

// function startTimer(e) {
//   setInterval(() => {
//     const timeValue = convertMs(deltaTime);
//     console.log(timeValue);
//   }, 1000);
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
