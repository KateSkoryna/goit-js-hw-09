// // all modules
// import Notiflix from 'notiflix';

// const refs = {
//   formEls: document.querySelector('.form'),
//   firstDelay: document.querySelector('input[name=delay]'),
//   delayStep: document.querySelector('input[name=step]'),
//   amount: document.querySelector('input[name=amount]'),
// };

// refs.formEls.addEventListener('submit', onCatFunction);

// function onCycleFunction(amount, delay, step) {
//   for (let i = 1; i <= amount; i += 1) {
//     let total = delay + step * (i - 1);
//     createPromise(i, total)
//       .then(({ position, delay }) => {
//         return Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         return Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//   }
// }

// function onCatFunction(event) {
//   event.preventDefault();
//   const amount = Number(event.target.amount.value);
//   const delay = Number(event.target.delay.value);
//   const step = Number(event.target.step.value);

//   onCycleFunction(amount, delay, step);
// }

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

//
//ВТОРОЙ ВАРИАНТ

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', createPromisesOnSubmit);

function createPromisesOnSubmit(event) {
  event.preventDefault();

  const { delay, step, amount } = event.target;
  const delayTime = parseInt(delay.value);
  const stepTime = parseInt(step.value);
  const amountNumber = parseInt(amount.value);

  countPromises(amountNumber, delayTime, stepTime);
}

function countPromises(count, delay, step) {
  for (let i = 1; i <= count; i += 1) {
    let time = delay + step * (i - 1);
    createPromise(i, time);
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
  })
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
        timeout: 2000,
      });
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
        timeout: 2000,
      });
    });
}
