const { ipcRenderer } = require('electron');


let min_value = 0;
let sec_value = 0;
let remainingTime = 0;

let min_ele = document.getElementById('min_input');
let sec_ele = document.getElementById('sec_input');
let btn = document.getElementById('btn');
let stopBtn = document.getElementById('stopBtn');

let timerId = null;

// When user changes input
min_ele.addEventListener('change', (e) => {
  min_value = parseInt(e.target.value) || 0;
});

sec_ele.addEventListener('change', (e) => {
  sec_value = parseInt(e.target.value) || 0;
});

btn.addEventListener('click', () => {
  ipcRenderer.send('set-timer-data', [Number(min_value),Number(sec_value),false]);
}); 
