
const months = [
    "January", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

//store the clock hands in variables
const hr = document.querySelector('#hour-hand');
const min = document.querySelector('#min-hand');
const sec = document.querySelector('#sec-hand');

//store span to show date
const date = document.querySelector("#date");


//store divs which hold the digital clock
const dHours = document.querySelector("#hour-1");
const dMinute_1 = document.querySelector("#minutes-1");
const amOrpm = document.querySelector("#amOrpm");


//stores button and body for changing the background color
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.querySelector(".color-change");
const body = document.querySelector("body");

  
//a function that returns a lightened version of the color given as input
function lightenColor(color, percent) {
  var num = parseInt(color.replace("#",""),16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  B = (num >> 8 & 0x00FF) + amt,
  G = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
  };


function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}



function mainTime() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = 6*seconds;
  sec.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minsDegrees = 6*minutes;
  min.style.transform = `rotate(${minsDegrees}deg)`;
  //sets digital clock
  if (minutes < 10) {
    let newMinutes = "0" + String(minutes);
    dMinute_1.innerHTML = newMinutes;
  }
  else {
    dMinute_1.innerHTML = minutes;
  }

  const hours = now.getHours();
  const hourDegrees = 30*hours + (minutes/2);
  hr.style.transform = `rotate(${hourDegrees}deg)`;
  
  //sets digital clock
  if (hours > 12) {
    amOrpm.textContent = "PM";
    let hour12_time = (hours % 12);
    dHours.textContent = hour12_time;
  }

  if (hours< 12) {
    amOrpm.textContent = "AM";
    dHours.textContent = hours;
  }

  const current_date = String(months[now.getMonth()] + " " + now.getDate() + ", "  + now.getFullYear());
  //changes span showing date to the current date
  date.textContent = current_date;



  //checks to see if button was pressed, then changes the color of the background
  btn.addEventListener("click", function () {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[getRandomNumber()];
    }
    body.style.backgroundColor = hexColor;
    dHours.style.backgroundColor = lightenColor(hexColor, 10);
    dMinute_1.style.backgroundColor = lightenColor(hexColor, 10);
    amOrpm.style.backgroundColor = lightenColor(hexColor, 10);
    
  });


}
//sets an interval for the function every second to keep an accurate time
setInterval(mainTime, 1000);

mainTime();