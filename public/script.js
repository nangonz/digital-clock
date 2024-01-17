const dayElement = document.querySelector(".day");
const dateElement = document.querySelector(".date");
const hourElement = document.querySelector(".h");
const minutesElement = document.querySelector(".m");
const secondsElement = document.querySelector(".seconds");

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
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const mils = date.getMilliseconds();
  const day = date.getDay();
  const d = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  dayElement.innerHTML = days[day];
  dateElement.innerHTML = formatedDate({ day, month, year });
  hourElement.innerHTML = formatedHour(h);
  minutesElement.innerHTML = m;
  console.log(s);
}

setInterval(getTime(), 0);

function formatedDate({ day, month, year }) {
  return `${day} ${
    months[month].length > 5 ? months[month].slice(0, 3) : months[month]
  } 
  ${year}
  `;
}

function formatedHour(hour) {
  return hour.toString().length == 1 ? `0${hour}:` : `${hour}:`;
}
