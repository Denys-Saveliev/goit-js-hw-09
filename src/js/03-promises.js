import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('input', e => {
  if (
    !formRef.elements.delay.value ||
    !formRef.elements.step.value ||
    !formRef.elements.amount.value
  ) {
    formRef.elements.submit.setAttribute('disabled', '');
  } else formRef.elements.submit.removeAttribute('disabled');
});

formRef.addEventListener('submit', runPromiseCreation);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

function runPromiseCreation(e) {
  e.preventDefault();
  const firstDelay = parseInt(formRef.elements.delay.value);
  const delayStep = parseInt(formRef.elements.step.value);
  const promiseAmount = parseInt(formRef.elements.amount.value);
  let delay = firstDelay;
  for (let i = 1; i <= promiseAmount; i += 1) {
    createPromise(i, delay)
      .then(({position, delay}) => Notify.success(`Fulfilled promise ${position} in ${delay}ms`))
      .catch(({position, delay}) => Notify.failure(`Rejected promise ${position} in ${delay}ms`));
    delay += delayStep;
  }
}