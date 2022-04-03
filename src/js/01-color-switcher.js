const startBtnRef = document.querySelector("[data-start]");
const stopBtnRef = document.querySelector("[data-stop]");
let timerId = null;

startBtnRef.addEventListener("click", () => {
   startBtnRef.setAttribute('disabled', '');
   stopBtnRef.removeAttribute('disabled');
   
  timerId = setInterval(() => {    
   const newColor = getRandomHexColor();
     document.body.style.backgroundColor = newColor;
  }, 1000);
});


stopBtnRef.addEventListener("click", () => {
   stopBtnRef.setAttribute('disabled', '');    
   startBtnRef.removeAttribute('disabled');
     
  clearInterval(timerId);  
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}