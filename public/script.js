const dayElement = document.querySelector(".day");
const dateElement = document.querySelector(".date");
const hourElement = document.querySelector(".hm");
const secondsElement = document.querySelector(".seconds");
const am_pm = document.querySelector(".am-pm");
const pointer = document.querySelector(".secondHand");
const alarmConfig = document.querySelector(".alarmSettings");
const alarmMessage = document.querySelector(".alarm-message");
const validationMessage = document.querySelector(".validation-message");
const alarmaAudio = document.getElementById("alarmaAudio");

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
    alarmConfig.style.visibility = "visible";
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
  alarmConfig.style.visibility = "visible";
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
    alarmConfig.style.visibility = "hidden";
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
  console.log("¡Alarma activada!");
}
