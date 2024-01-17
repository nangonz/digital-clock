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
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let day = date.getDay();
  let d = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  document.querySelector(".day").innerHTML = days[day];
  document.querySelector(".date").innerHTML = `
  ${day} 
  ${months[month].length > 5 ? months[month].slice(0, 3) : months[month]} 
  ${year}
  `;
}

setInterval(getTime(), 0);
