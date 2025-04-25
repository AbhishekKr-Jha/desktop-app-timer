const { ipcRenderer } = require('electron');


let startBtn = document.getElementById('startBtn');
let pauseBtn = document.getElementById('pauseBtn');
let resetBtn = document.getElementById('resetBtn');
let minData = document.getElementById('min_data');
let secData = document.getElementById('sec_data');

let remainingTime = 0;
let min_value = 0;
let sec_value = 0;

startBtn.addEventListener('click',()=>{
    ipcRenderer.send('toggle-modal', true);
})

let timerId = null; 

ipcRenderer.on('timer-data', (event,data)=>{
    console.log("--",data[0])
    min_value=data[0]
    sec_value=data[1]

    if (timerId) {
        clearInterval(timerId);
    }

    remainingTime = (min_value * 60) + sec_value;
    console.log("the value of remianing tome is",remainingTime)

startBtn.style.display="none"
    pauseBtn.style.display="block"
    resetBtn.style.display="block"



  timerId=setInterval(()=>{

    if (remainingTime <= 0) {
              clearInterval(timerId);
              minData.innerText = '00';
              secData.innerText = '00';
              return;
            }

    remainingTime -=1
    let displayMin = Math.floor(remainingTime / 60);
    let displaySec = remainingTime % 60;
    
        minData.innerText = String(displayMin).padStart(2, '0');
        secData.innerText = String(displaySec).padStart(2, '0');
},1000)

});



resetBtn.addEventListener('click',()=>{
    ipcRenderer.send('toggle-modal', true);
})


