let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle-mode');
const themeToggle = document.getElementById('theme-toggle');
const focusModal = document.getElementById('focus-modal');
const focusInput = document.getElementById('focus-input');
const focusSubmit = document.getElementById('focus-submit');
const focusDisplay = document.getElementById('focus-display');
const focusText = document.getElementById('focus-text');
const modalClose = document.getElementById('modal-close');
const focusCancel = document.getElementById('focus-cancel');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

let isDarkMode = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the timer display
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `${timeString} - Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        
        if (isWorkTime) {
            focusModal.style.display = 'flex';
            return;
        }
        
        startTimerInterval();
    }
}

function startTimerInterval() {
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            focusDisplay.style.display = 'none';
            switchMode();
            startTimer();
        }
    }, 1000);
    startButton.disabled = true;
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    toggleButton.textContent = 'Switch to Break';
    focusDisplay.style.display = 'none';
    updateDisplay();
    startButton.disabled = false;
}

function handleModeToggle() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
    switchMode();
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', handleModeToggle);
themeToggle.addEventListener('click', toggleTheme);

const addTimeButton = document.getElementById('add-time');
addTimeButton.addEventListener('click', addFiveMinutes);

// Initialize the display
resetTimer(); 

focusSubmit.addEventListener('click', () => {
    const focusValue = focusInput.value.trim();
    if (focusValue) {
        focusText.textContent = focusValue;
        focusDisplay.style.display = 'block';
        focusModal.style.display = 'none';
        focusInput.value = '';
        startTimerInterval();
    }
});

focusInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        focusSubmit.click();
    }
}); 

modalClose.addEventListener('click', () => {
    focusModal.style.display = 'none';
    startButton.disabled = false;
}); 

// Add event listener for ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && focusModal.style.display === 'flex') {
        focusModal.style.display = 'none';
        startButton.disabled = false;
    }
}); 

focusCancel.addEventListener('click', () => {
    focusModal.style.display = 'none';
    startButton.disabled = false;
}); 