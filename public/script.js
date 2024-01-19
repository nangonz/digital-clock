const dayElement = document.querySelector(".day");
const dateElement = document.querySelector(".date");
const hourElement = document.querySelector(".hm");
const secondsElement = document.querySelector(".seconds");
const am_pm = document.querySelector(".am-pm");
const pointer = document.querySelector(".secondHand");
const alarmConfig = document.querySelector(".alarmSettings");
const alarmMessage = document.querySelector(".alarm-message");
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
    alarmMessage.innerHTML = "tu alarma está sonando";
  } else {
    alarmMessage.innerHTML = "";
  }
}

setInterval(getTime, 0);

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
checkSettings.addEventListener("click", () => {
  confirmAlarmSettings();
  alarmConfig.style.visibility = "hidden";
});

function confirmAlarmSettings() {
  let hours = document.querySelector("input[name=hours-section").value;
  let min = document.querySelector("input[name=min-section").value;
  alarmSetHourMin.hours = hours;
  alarmSetHourMin.min = min;
  return alarmSetHourMin;
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
