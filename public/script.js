const dayElement = document.querySelector(".day");
const dateElement = document.querySelector(".date");
const hourElement = document.querySelector(".hm");
const secondsElement = document.querySelector(".seconds");
const am_pm = document.querySelector(".am-pm");
const pointer = document.querySelector(".secondHand");
const alarmConfig = document.querySelector(".alarmSettings");
const timerConfig = document.querySelector(".timerSettings");
const alarmMessage = document.querySelector(".alarm-message");
const validationMessage = document.querySelector(".validation-message");
const alarmaAudio = document.getElementById("alarmaAudio");
const playIcon = document.querySelector(".playIcon");
const stopIcon = document.querySelector(".stopIcon");

let alarmSetHourMin = {};

const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const min = date.getMinutes();
  const seconds = date.getSeconds();
  const weekDay = date.getDay();
  const monthDay = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  dayElement.innerHTML = days[weekDay];
  dateElement.innerHTML = formatedDate({ monthDay, month, year });
  hourElement.innerHTML = formatedHour({ hours, min });
  secondsElement.innerHTML = formatSeconds({ seconds });
  am_pm.innerHTML = hours >= 12 ? "PM" : "AM";
  pointer.style.transform = `rotate(${seconds * 6}deg)`;

  if (checkAlarm()) {
    if (seconds == 0) activarAlarma();
    alarmMessage.innerHTML = "Time's up!";
    alarmConfig.style.display = "flex";
  } else {
    alarmMessage.innerHTML = "Alarm Settings";
  }
}

setInterval(getTime, 1000);

function formatedDate({ monthDay, month, year }) {
  return `${monthDay} ${
    months[month].length > 5 ? months[month].slice(0, 3) : months[month]
  } 
  ${year}
  `;
}

function formatedHour({ hours, min }) {
  let formatHours = hours.toString().length == 1 ? `0${hours}` : `${hours}`;
  let formatMin = min.toString().length == 1 ? `0${min}` : `${min}`;

  return `${formatHours}:${formatMin}`;
}

function formatSeconds({ seconds }) {
  let formatSeconds = seconds.toString().padStart(2, "0");

  return `00.${formatSeconds}`;
}

const alarmSetting = document.querySelector(".clockIcon");
alarmSetting.addEventListener("click", () => {
  alarmConfig.style.display = "flex";
});

const timerSettings = document.querySelector(".timerIcon");
timerSettings.addEventListener("click", () => {
  timerConfig.style.display = "flex";
});

const checkSettings = document.querySelector(".checkIcon");
checkSettings.addEventListener("click", confirmAlarmSettings);

function confirmAlarmSettings() {
  let hours = document.querySelector("input[name=hours-section").value;
  let min = document.querySelector("input[name=min-section").value;

  if (validateAlarmSettings({ hours, min })) {
    alarmSetHourMin.hours = hours;
    alarmSetHourMin.min = min;
    validationMessage.innerHTML = "";
    alarmConfig.style.display = "none";
    return alarmSetHourMin;
  } else {
    validationMessage.classList.add("error");
    validationMessage.innerHTML = "incorrect number";
    validationMessage.style.display = "flex";
  }
}

function checkAlarm() {
  let currentTime = hourElement.innerHTML.split(":");
  let [current_hour, current_min] = currentTime;
  if (
    current_hour == alarmSetHourMin.hours &&
    current_min == alarmSetHourMin.min
  ) {
    return true;
  } else {
    return false;
  }
}

function cancelAlarmSettings() {
  document.querySelector("input[name=hours-section").value = "";
  document.querySelector("input[name=min-section").value = "";
  validationMessage.style.display = "none";
  alarmaAudio.pause();
  alarmaAudio.currentTime = 0;
  alarmSetHourMin = {};
}

const cancelIconButton = document.querySelector(".cancelIcon");
cancelIconButton.addEventListener("click", cancelAlarmSettings);

function validateAlarmSettings({ hours, min }) {
  let valid = true;
  if (hours == "" && min == "") return true;

  if (
    isNaN(Number(hours)) ||
    Number(hours) < 0 ||
    Number(hours) > 23 ||
    hours.length != 2
  ) {
    valid = false;
  }
  if (
    isNaN(Number(min)) ||
    Number(hours) < 0 ||
    Number(hours) > 59 ||
    min.length != 2
  ) {
    valid = false;
  }
  return valid;
}

function configurarAlarma(tiempoDeAlarmaEnMilisegundos) {
  setTimeout(() => {
    activarAlarma();
  }, tiempoDeAlarmaEnMilisegundos);
}

function activarAlarma() {
  alarmaAudio.play();
}

// Pomodoro's Timer functionality
// Timer's variables

const workTittle = document.querySelector(".title-work");
const breakTittle = document.querySelector(".title-break");
let worktimeInterval;
let breaktimeInterval;
let isTimerRunning = false;
let [timer_workmin, timer_worksec] = document
  .querySelector(".work-minutes")
  .innerHTML.split(":");

let [timer_breakmin, timer_breaksec] = document
  .querySelector(".break-minutes")
  .innerHTML.split(":");

// stop icon button
stopIcon.addEventListener("click", () => {
  document.querySelector(".work-minutes").innerHTML = "02:00";
  document.querySelector(".break-minutes").innerHTML = "02:00";
  isTimerRunning = false;
  resetTimer();
  setTimeout(() => {
    timerConfig.style.display = "none";
  }, 500);
});

// play icon button
playIcon.addEventListener("click", () => {
  startTimer();
  isTimerRunning = true;
});

// timer's functionlity
function startTimer() {
  if (isTimerRunning) {
    // console.log("timer is running now"); //replace for a message
    return;
  } else {
    start_worktime_countdown();
  }
}

function start_worktime_countdown() {
  timer_workmin = Number(timer_workmin) - 1;
  timer_worksec = 10;

  const worktime_countdownFunction = () => {
    //change display
    if (timer_workmin == 0 && timer_worksec == 0) {
      clearInterval(worktimeInterval);
      timer_workmin = 2;
      timer_worksec = 0;
      timer_breakmin = 2;
      timer_breaksec = 0;
      setTimeout(() => {
        start_breaktime_countdown();
      }, 1000);
    }

    updateTimerDisplay(timer_workmin, timer_worksec, ".work-minutes");

    timer_worksec = timer_worksec - 1;
    if (timer_worksec == 0) {
      setTimeout(() => {
        timer_workmin -= 1;
        timer_worksec = 10;
      }, 1000);
    }
  };

  worktimeInterval = setInterval(worktime_countdownFunction, 1000);
}

function start_breaktime_countdown() {
  timer_breakmin = Number(timer_breakmin) - 1;
  timer_breaksec = 10;

  const breaktime_countdownFunction = () => {
    //change display
    if (timer_breakmin == 0 && timer_breaksec == 0) {
      timer_workmin = 2;
      timer_worksec = 0;
      timer_breakmin = 2;
      timer_breaksec = 0;
      clearInterval(breaktimeInterval);
      setTimeout(() => {
        start_worktime_countdown();
      }, 1000);
    }
    updateTimerDisplay(timer_breakmin, timer_breaksec, ".break-minutes");

    timer_breaksec = timer_breaksec - 1;
    if (timer_breaksec == 0) {
      setTimeout(() => {
        timer_breakmin -= 1;
        timer_breaksec = 10;
      }, 1000);
    }
  };

  breaktimeInterval = setInterval(breaktime_countdownFunction, 1000);
}

function resetTimer() {
  clearInterval(worktimeInterval);
  clearInterval(breaktimeInterval);
  timer_workmin = 2;
  timer_worksec = 0;
  timer_breakmin = 2;
  timer_breaksec = 0;
}

function updateTimerDisplay(minutes, seconds, elementSelector) {
  document.querySelector(elementSelector).innerHTML = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
