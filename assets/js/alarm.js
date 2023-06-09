// Get the hour, minute, and second hands
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// Set the alarm sound
const alarmSound = new Audio('assets/sounds/alarm.mp3');

// Get the alarm form and set the alarm button
const alarmForm = document.getElementById('alarm-form');
const setAlarmButton = document.getElementById('set-alarm');

// Function to update the clock hands
function updateTime() {
  // Get the current time
  const now = new Date();

  // Calculate the angles for the clock hands
  const hourAngle = ((now.getHours() % 12) / 12) * 360 + 90;
  const minuteAngle = (now.getMinutes() / 60) * 360 + 90;
  const secondAngle = (now.getSeconds() / 60) * 360 + 90;

  // Set the clock hand rotations
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `rotate(${secondAngle}deg)`;
}

// Call the updateTime function every second to update the clock
setInterval(updateTime, 1000);

// Function to check if it's time for the alarm
function checkAlarm() {
  // Get the current time and alarm time
  const now = new Date();
  const alarmHour = parseInt(document.getElementById('hour').value);
  const alarmMinute = parseInt(document.getElementById('minute').value);

  // Check if the current time matches the alarm time
  if (now.getHours() === alarmHour && now.getMinutes() === alarmMinute) {
    // Play the alarm sound
    alarmSound.play();
    // Disable the set alarm button
    setAlarmButton.disabled = true;
    // Show an alert message
    alert('Time\'s up! Wake up!');
  }
}

// Add an event listener to the alarm form submit button
alarmForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting
  event.preventDefault();
  // Check if the hour and minute inputs are valid
  const hourInput = document.getElementById('hour');
  const minuteInput = document.getElementById('minute');
  if (hourInput.checkValidity() && minuteInput.checkValidity()) {
    // Call the checkAlarm function every second to check if it's time for the alarm
    setInterval(checkAlarm, 1000);
    // Disable the hour and minute inputs and the set alarm button
    hourInput.disabled = true;
    minuteInput.disabled = true;
    setAlarmButton.disabled = true;
  } else {
    // Show an error message if the hour and minute inputs are invalid
    alert('Please enter a valid hour (0-23) and minute (0-59)');
  }
});
