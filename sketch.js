let intercept = 0;
let slope = 0;
let speeding = 0;

let maxTime = 4 * 60 * 60;
let maxTravel = 600;

let height = 450;
let width = 600;
let slider;
let sliderOverSpeed;




function predict(slope) {
  return width * slope + intercept;
}

function kmPerHour(speed) {
  return speed / 100;
}

function diffMinPerKm(speedLimit, speedOver) {
  return timeWon(speedLimit, speedOver, 1);
}

function timeWon(speedLimit, speedOver, distance) {
  let actSec = distance / ((speedLimit + speedOver) / 3600);
  let limSec = distance / (speedLimit / 3600);
  let diffSec = limSec - actSec;

  speeding = speedLimit + speedOver;
  slope = speedLimit;

  return timeConvert(diffSec); I
}

function timeConvert(seconds) {
  let h = Math.floor(seconds / 3600);
  let totalSeconds = seconds %= 3600;
  let m = Math.floor(totalSeconds / 60);
  let s = Math.floor(totalSeconds % 60);
  return { 'hours': h, 'minutes': m, 'seconds': s }
};

// let updateValues = () => {
//   let limit = parseInt(document.getElementById("speedlimit").value);
//   let actual = parseInt(document.getElementById("speedactual").value);
//   //let distance = parseInt(document.getElementById("distance").value);
//   let won = diffMinPerKm(limit, actual);
//   document.getElementById("timewon").innerHTML = won.hours + ":" + won.minutes + ":" + won.seconds;
// }

// document.onreadystatechange = function () {
//   if (document.readyState === 'complete') {

//     document.getElementById("update").addEventListener("click", function (event) {
//       event.preventDefault()
//     });
//   }
// }





function setup() {
  createCanvas(width, height);
  background(0);

  sliderSpeed = createSlider(0, 120, 80);
  sliderSpeed.position(450, 350);

  sliderOverSpeed = createSlider(0, 100, 10);
  sliderOverSpeed.position(450, 400);

  //slider.style('width', '80px');

  //draw();
}


function draw() {

  background(0);
  stroke(255, 255, 255);
  strokeWeight(2);

  // capture values
  let slope = sliderSpeed.value();
  let speeding = sliderOverSpeed.value();
  let distance = mouseX;

  // draw time won text
  let timeWonObj = timeWon(slope, speeding, distance);
  strokeWeight(0);
  textSize(12);
  fill(200);
  let maxY = 20;
  let maxX = width - 100;
  let ytimeWon = height - (mouseX / (speeding + slope) * 100) < maxY ? maxY : height - (mouseX / (speeding + slope) * 100);
  let xtimeWon = mouseX > maxX ? maxX : mouseX;

  text("speedlimit: " + slope + " km/h", 450, 280);
  text("speeding: " + speeding + " km/h", 450, 325);

  if (timeWonObj.hours === 0) {
    text(timeWonObj.minutes + " min " + timeWonObj.seconds + " sec faster", xtimeWon, ytimeWon + 20);
  } else {
    text(timeWonObj.hours + " h " + timeWonObj.minutes + " min " + timeWonObj.seconds + " sec faster", xtimeWon, ytimeWon + 20);
  }

  let driveTime = Math.floor((height - ytimeWon) / 100);

  text("drive time: " + driveTime, xtimeWon, ytimeWon + 40);
  text("distance: " + mouseX + " km", xtimeWon, ytimeWon + 60);



  // draw slopes
  let y = width / slope * 100;
  let ySpeeding = width / (speeding + slope) * 100;

  stroke(255, 255, 255);
  strokeWeight(2);
  line(width, height - y, 0, height); // speed
  line(width, height - ySpeeding, 0, height); // speeding

  // draw triagle
  let y2Triangle = height - (mouseX / (speeding + slope) * 100);
  let y3Triangle = height - (mouseX / (slope) * 100);
  triangle(0, height, mouseX, y2Triangle, mouseX, y3Triangle);

  drawTexts();
  // noLoop();
}

function drawTexts() {
  stroke(0);
  textSize(15);
  fill(200);

  // text(mouseX , 200, 300);

  text('Time', 10, 20);
  text('Travel', width - 100, height - 30);

  for (let i = 100; i <= width; i += 100) {
    text(i + " km", i, height - 5);
  }

  for (let i = height - 100; i >= 0; i -= 100) {
    text((height - i) / 100 + " h", 10, i);
  }

  fill(150, 0, 0);
}

