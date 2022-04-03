import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const INTERVAL_UPDATE_TIME = 1000;
let userSelectedDate;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    checkSelectedDate();
  },
};

flatpickr('#datetime-picker', options);

const refs = {
   startBtnRef: document.querySelector('[data-start]'),   
   daysRef: document.querySelector('[data-days]'),
   hoursRef: document.querySelector('[data-hours]'),
   minutesRef: document.querySelector('[data-minutes]'),
   secondsRef: document.querySelector('[data-seconds]'),
}

refs.startBtnRef.setAttribute('disabled', '');
refs.startBtnRef.addEventListener('click', () => {
   intervalID = setInterval(updateTimeInterface, INTERVAL_UPDATE_TIME);
});

function checkSelectedDate() {
   if (userSelectedDate <= new Date().getTime()) {
      window.alert('Please choose a date in the future');
   } else {
      refs.startBtnRef.removeAttribute('disabled');
   }
}

function updateTimeInterface() {
  const difference = userSelectedDate - new Date().getTime();
  //console.log(`difference ${difference}`);
  if (difference < 1000) {
    clearInterval(intervalID);    
  }
  const time = convertMs(difference);
  //console.log(time);
  refs.daysRef.textContent = time.days;
  refs.hoursRef.textContent = time.hours;
  refs.minutesRef.textContent = time.minutes;
  refs.secondsRef.textContent = time.seconds;
  
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  let days = String(Math.floor(ms / day));
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, '0');
  // Remaining seconds
  const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, '0');
  if (days.length === 1) days = days.padStart(2, '0');
  return { days, hours, minutes, seconds };
}
