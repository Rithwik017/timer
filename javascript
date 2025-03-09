let timer;
let isRunning = false;
let currentTime = 25 * 60; // 25 minutes default (in seconds)
let interval;
let mode = 'pomodoro'; // Default mode

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const stopBtn = document.getElementById('stop-btn');
const alarm = document.getElementById('alarm-sound');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);

document.getElementById('pomodoro-btn').addEventListener('click', () => switchMode(25 * 60, 'pomodoro'));
document.getElementById('short-break-btn').addEventListener('click', () => switchMode(5 * 60, 'short-break'));
document.getElementById('long-break-btn').addEventListener('click', () => switchMode(15 * 60, 'long-break'));

function startTimer() {
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;

    interval = setInterval(() => {
        if (currentTime <= 0) {
            clearInterval(interval);
            alarm.play();
            resetTimer();
        } else {
            currentTime--;
            updateTimeDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    clearInterval(interval);
}

function resetTimer() {
    clearInterval(interval);
    currentTime = mode === 'pomodoro' ? 25 * 60 : (mode === 'short-break' ? 5 * 60 : 15 * 60);
    updateTimeDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
}

function stopTimer() {
    clearInterval(interval);
    currentTime = mode === 'pomodoro' ? 25 * 60 : (mode === 'short-break' ? 5 * 60 : 15 * 60);
    updateTimeDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
}

function switchMode(time, newMode) {
    mode = newMode;
    currentTime = time;
    updateTimeDisplay();
    resetTimer();
}

function updateTimeDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
