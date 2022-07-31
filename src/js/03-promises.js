import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', createPromisesOnSubmit);

function createPromisesOnSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target;

  const deltaTime = parseInt(delay.value);
  const stepTime = parseInt(step.value);
  const amountNumber = parseInt(amount.value);

  setTimeout(() => {
    countPromises(amountNumber, stepTime);
  }, deltaTime);
}

function countPromises(count, stepTime) {
  let time = 0;

  for (let i = 1; i <= count; i += 1) {
    time += stepTime;
    createPromise(i, time)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
