import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   formRef: document.querySelector('.form'),
   btnRef: document.querySelector('.btn'),
}

refs.btnRef.setAttribute('disabled', '');

refs.formRef.addEventListener('input', e => {
  if (refs.formRef.elements.delay.value &&
    refs.formRef.elements.step.value &&
    refs.formRef.elements.amount.value) {
    refs.btnRef.removeAttribute('disabled');
  } 
});

refs.formRef.addEventListener('submit', runPromiseCreation);

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
  const firstDelay = parseInt(refs.formRef.elements.delay.value);
  const delayStep = parseInt(refs.formRef.elements.step.value);
  const promiseAmount = parseInt(refs.formRef.elements.amount.value);
  let delay = firstDelay;
  for (let i = 1; i <= promiseAmount; i += 1) {
    createPromise(i, delay)
      .then(({position, delay}) => Notify.success(`Fulfilled promise ${position} in ${delay}ms`))
      .catch(({position, delay}) => Notify.failure(`Rejected promise ${position} in ${delay}ms`));
    delay += delayStep;
  }
}