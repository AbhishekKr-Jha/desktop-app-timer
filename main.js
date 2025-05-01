const { ipcRenderer } = require("electron");

let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let minData = document.getElementById("min_data");
let secData = document.getElementById("sec_data");

let remainingTime = 0;
let min_value = 0;
let sec_value = 0;
let isTimerRunning = false;

// ------toggle modal btn-------------
startBtn.addEventListener("click", () => {
  ipcRenderer.send("toggle-modal", true);
});
 
let timerId = null;

const timer_func = (timeLeft) => {
   
    // console.log("the timeer dta passed is",timeLeft)
  isTimerRunning = true;

  // console.log("the remaining timen is", timeLeft);
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  resetBtn.style.display = "block";

  timerId = setInterval(() => {
    // console.log("the tiemin terval is",timeLeft)
    if (timeLeft <= 0) {
      clearInterval(timerId);
      minData.innerText = "00";
      secData.innerText = "00";
      isTimerRunning = false;
      return;
    }
    timeLeft -=1
    remainingTime -= 1;
    let displayMin = Math.floor(timeLeft / 60);
    let displaySec = timeLeft % 60;

    // min_value=displayMin
    // sec_value=displaySec

    minData.innerText = String(displayMin).padStart(2, "0");
    secData.innerText = String(displaySec).padStart(2, "0");
  }, 1000);
};


// ----staat initial timer ----- 
ipcRenderer.on("timer-data", (event, data) => {
  console.log("--", data[0]);
  min_value = data[0];
  sec_value = data[1];
pauseBtn.classList.add('timer-paused')
  if (timerId) {
    clearInterval(timerId);
  }

  remainingTime = min_value * 60 + sec_value;
  // console.log("the value of remianing tome is",remainingTime)
console.log("the starting remaining time is",remainingTime)
  timer_func(remainingTime);
});


// -----pause Btn listener --------
pauseBtn.addEventListener("click", () => {
    pauseBtn.classList.toggle("timer-paused")
  console.log("the value is", remainingTime,isTimerRunning);
  if (isTimerRunning) {
    console.log("the class value of timer paused is",pauseBtn.classList.contains('timer-paused'))
  
    clearInterval(timerId);
    console.log("the timer is stopped");
    isTimerRunning = false;
  } else {
    console.log("the class value of timer paused is",pauseBtn.classList.contains('timer-paused'))
    timer_func(remainingTime);
    isTimerRunning=true
    console.log("the timer is started")
  }
});


// -----reset btn listener------
resetBtn.addEventListener("click", () => {
  // pauseBtn.classList.toggle("timer-paused")
  ipcRenderer.send("toggle-modal", true);
});
