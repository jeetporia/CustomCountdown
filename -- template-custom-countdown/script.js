const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countdownActive;

const seconds = 1000;
const minute = seconds * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input min with today's date

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate the countdown and complete UI
function updateDom() {
    countdownActive = setInterval(() => {
        // Time starts with 1970 January 1 we need to calculate the time in Milisecond
        const now = new Date().getTime();
        console.log('Now ', now);
        const distance = countDownValue - now;
        console.log('Distance ', distance);
        // returns largest whole number
        const days = Math.floor(distance / day);
        // remender operator
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % day) / minute);
        const second = Math.floor((distance % day) / seconds);
        console.log('-------------------------');
        console.log(days, hours, minutes, second);

        // Hide Input
        inputContainer.hidden = true;

        countdownElTitle.textContent = `${countDownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${second}`

        // Show countdown
        countdownEl.hidden = false;
    }, seconds);
}

// take values from form input
function updateCountdown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    console.log(countDownDate, countDownTitle);
    // checking valid date 
    if (countDownDate === '') {
        alert('Please select the date first...')
    } else {
        // Get the number version of the date , Update the DOM
        countDownValue = new Date(countDownDate).getTime();
        console.log('Count down value', countDownValue);
        updateDom();
    }
}

function reset() {
    // hide countdown and show input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset the values 
    countDownTitle = '';
    countDownDate = '';
}

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);