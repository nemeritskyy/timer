const minTimeValue = 1;
const maxTimeValue = 9999;
const inputs = document.getElementById('timer-field');
const timerField = document.getElementById('timer-minutes-field');
const addTimeButton = document.getElementById('timer-add-time');
const minusTimeButton = document.getElementById('timer-minus-time');
const timerStart = document.getElementById('timer-start');
const timerRemain = document.getElementById('timer-remain');

const getFieldValue = () => parseInt(timerField.value, 10);

function getAbs(number) {
  return Math.abs(number);
}

function startTimer() {
  inputs.style.display = 'none';
	const getCurrentTime = () => moment(); // eslint-disable-line
  const finishTime = getCurrentTime().add(getFieldValue(), 'minutes');

  function checkTime() {
    const currentTime = getCurrentTime();
    if (currentTime.isBefore(finishTime)) {
      const minutesDiff = currentTime.diff(finishTime, 'minutes');
      timerRemain.innerHTML = `${getAbs(minutesDiff)}:${getAbs(currentTime.diff(finishTime, 'seconds') % 60)}`;
      setTimeout(checkTime, 500);
    } else {
      timerRemain.innerHTML = 'Finish';
      inputs.style.display = 'flex';
    }
  }

  checkTime();
}

addTimeButton.addEventListener('click', () => {
  if (getFieldValue() >= minTimeValue && getFieldValue() < maxTimeValue) {
    timerField.value = getFieldValue() + 1;
  }
});

minusTimeButton.addEventListener('click', () => {
  if (getFieldValue() > minTimeValue && getFieldValue() <= maxTimeValue) {
    timerField.value = getFieldValue() - 1;
  }
});

timerStart.addEventListener('click', () => {
  startTimer();
});
