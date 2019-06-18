let intercept = 0;
let slope = 0;

let maxTime = 5 / 3600;
let travel = 500;

let height = 400;
let width = 600;

function setup() {
  createCanvas(width, height);
  background(0);
}

function predict(slope){
  return height * slope + intercept;
}

function drawTexts(){
  stroke(0);
  textSize(15);
  fill(100);
  text('Time', 10, 20);
  text('Travel', width - 60 , height - 10);
  fill(150, 0, 0);
}

function draw(slope) {
  background(0);
  stroke(255, 255, 255);
  strokeWeight(2);

  let y_pred = predict(slope); // max_y for trendline  
  console.log(y_pred);

  //line(width, y_pred, 0, intercept); // trendline
  line(width, (height - y_pred), 0, height); // trendline  
  drawTexts();
  noLoop();
}

function kmPerHour(speed){
	return speed/100;
}

function timeWon (speedLimit, speedOver, distance) {
	let actSec = distance/((speedLimit + speedOver)/3600);
	let limSec = distance/(speedLimit/3600);
	let diffSec = limSec - actSec;
	
	draw(diffSec);
	draw(kmPerHour(speedLimit));
	
	return timeConvert(diffSec);
}

function diffMinPerKm(speedLimit, speedOver) {
	return timeWon(speedLimit, speedOver, 1);
}

function timeConvert (seconds) {	
	let h = Math.floor(seconds / 3600);
	let totalSeconds = seconds %= 3600;
	let m = Math.floor(totalSeconds / 60);
	let s = Math.floor(totalSeconds % 60);
	return {'hours': h, 'minutes': m, 'seconds': s}
};

// console.log(timeWon(120, 30, 100));
// console.log(diffMinPerKm(120, 130));

let updateValues = () => {
	let limit = parseInt(document.getElementById("speedlimit").value);
	let actual = parseInt(document.getElementById("speedactual").value);
	//let distance = parseInt(document.getElementById("distance").value);
	let won = diffMinPerKm(limit, actual);
	document.getElementById("timewon").innerHTML = won.hours +":"+won.minutes + ":" +won.seconds;	
}

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
  
	document.getElementById("update").addEventListener("click", function(event){
		event.preventDefault()
		});
	}
}
