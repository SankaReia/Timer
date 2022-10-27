const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const startEl = document.querySelector(".start");
const pauseEl = document.querySelector(".pause");
const resetEl = document.querySelector(".reset");

let isGoing = false;
let future = 0;

startEl.addEventListener("click", () => {
  if (!hourEl.value && !minuteEl.value && !secondEl.value) return;
  hourEl.setAttribute("disabled", true);
  minuteEl.setAttribute("disabled", true);
  secondEl.setAttribute("disabled", true);

  startEl.style.display = "none";
  pauseEl.style.display = "block";
  resetEl.style.display = "none";

  const now = new Date();
  future = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    +hourEl.value + now.getHours(),
    +minuteEl.value + now.getMinutes(),
    +secondEl.value + now.getSeconds(),
    now.getMilliseconds()
  );
  isGoing = true;
  timer();
});

pauseEl.addEventListener("click", () => {
  isGoing = false;
  startEl.style.display = "block";
  resetEl.style.display = "block";
  pauseEl.style.display = "none";
});

resetEl.addEventListener("click", restart);
function restart() {
  isGoing = false;
  hourEl.value = "";
  minuteEl.value = "";
  secondEl.value = "";

  startEl.style.display = "block";
  pauseEl.style.display = "none";
  resetEl.style.display = "none";

  hourEl.removeAttribute("disabled");
  minuteEl.removeAttribute("disabled");
  secondEl.removeAttribute("disabled");
}

function timer() {
  const now = new Date();
  let timeLeft = future - now;

  let hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
  let minutes = Math.floor(timeLeft / 1000 / 60) % 60;
  let seconds = Math.floor(timeLeft / 1000) % 60;

  hourEl.value = hours;
  minuteEl.value = minutes;
  secondEl.value = seconds;

  if (secondEl.value == 0 && minuteEl.value == 0 && secondEl.value == 0)
    restart();
  if (isGoing) setTimeout(() => timer());
}
