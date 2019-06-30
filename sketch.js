let intercept = 0;
let slope = 0;

let maxTime = 4 * 60 * 60;
let maxTravel = 600;
console.log(maxTime);

let height = 450;
let width = 600;

function setup() {
  createCanvas(width, height);
  background(0);
}

function predict(slope){
  return width * slope + intercept;
}

function draw(slope, speedingSlope) {
  if(slope == null){slope = 0;}
  background(0);
  stroke(255, 255, 255);
  strokeWeight(2);

  console.log("km/h: " + slope);
  let y = width / slope * 100;  
  let ySpeeding = width / speedingSlope * 100;  

  //let y = predict(slope); // max_y for trendline  
  console.log(": " + y);

  line(width, height - y, 0, height); // speed
  line(width, height - ySpeeding, 0, height); // speed

  
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
	
	//draw(diffSec);
	let speeding = speedLimit+speedOver;
	draw(speedLimit, speeding);
	
	return timeConvert(diffSec);
}

function drawTexts(){
  stroke(0);
  textSize(15);
  fill(200);
  
  text('Time', 10, 20);
  text('Travel', width - 60 , height - 30);
  
  for(let i = 0; i <= width; i += 100){
	  text(i + " km", i, height -5);
  }

  for(let i = height; i >= 0; i -= 100){
	  text((height-i)/100 + " h", 10, i);
  }
  
  fill(150, 0, 0);
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
