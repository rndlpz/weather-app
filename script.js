const { appendFile } = require("fs");

let latitude = 0;
let longitude = 0;

window.onload = function() {
	const date = new Date();
	const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
	document.getElementById('date').innerHTML = dateString;
	if("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(success)
	}
	else{
		console.log("Geolocation is not available on your browser.");
	}
// Now, set the .date HTML text to our dateString
}

function success(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	console.log(latitude, longitude);

}

btn.addEventListener("click", function(){
	const xhr = new XMLGttpRequest();//Defines the CML Http object
	xhr.open("GET", "website");//opens a get request to the 
	xhr.send();
	xhr.onload() = function(){
		const body = xhr.responseText;
	}

});
const xhr = new XMLHttpRequest();
xhr.open("GET", `localhost:3000/weather/${latitude}/${longitude}`); //We change this later (What are we calling if we want to get the current weather data)
xhr.send();

xhr.onload = function() {
   //What’s wrong w/ this (Think about the format responseText is in and what format we need it in (stringify/parse)
	const body = JSON.parse(xhr.responseText)
	let temperature = body.temperature;
	let weatherStatus = body.weatherStatus;
	document.getElementById('temperature').innerHTML = `Temperature: ${temperature} F`;
	document.getElementById('weatherStatus').innerHTML = `Weather Status: ${weatherStatus}`;
}


//-------------5 Day Forecast-------------------

const xhr2 = new XMLHttpRequest();
xhr2.open("GET", `localhost:3000/weather/${latitude}/${longitude}`);
xhr2.send();
xhr2.onload() = function(){
	const body = JSON.parse(xhr2.responseText);
	let forecast = body.forecast;

	var forecastElements = document.getElementsByClassName("forecast");
	for(let i = 0; i < forecast.length; i++){
		forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp} F`;

	}
}
	let temp = 59;
	let city = 'Santa Cruz';
	let finalString = `In ${city} it is ${temp} degrees`;

//Write the code that sets const btn to our #getWeatherBtn ID
// const btn = document.querySelector("p");

const btn = document.getElementById('getWeatherBtn');
btn.addEventListener("click", () => {
    let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]];
    let forecastElements = document.getElementsByClassName("forecast");
    for (let i = 0; i < forecast.length; i++) {
        forecastElements[i].innerHTML = `${forecast[i].dayName}  :  ${forecast[i].temp} \u{00B0}F`;
    }
});

app.get('/5day/:lat/:lon', (req, res) => {
	// res.send('Hello World!');
	console.log("welcome to the root!");
	
	var lat = req.params.lat;
	var lon = req.params.lon;
	var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  
	
	  request(url, (error, response, body)=>{
		  
		  // Printing the error if occurred
		  if(error) console.log(error)
		 
		  // Printing status code
		  console.log(response.statusCode);
		   
		  // Printing body
		  body = JSON.parse(body)
		  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		  let forecast = [];
		  let todaysDate = new Date().getDay();//Returns a number from 0-6
		  for(let i = 0; i < 5; i++){//0 1 2 3 4
			let tempSum = 0;
			let count = 0;
			for(const dataPoint of body.list){
				let date = new Date(dataPoint.dt * 1000)
				if(date.getDay() === todaysDate){
					count++;
					tempSum += dataPoint.main.temp;
				}
			}
			let day = {"dayName" : week[todaysDate], "temp" : Math.round(tempSum/count)}
			forecast.push(day);
			todaysDate = (todaysDate + 1) % 7;
		  }
		//   console.log
		  res.send(forecast);
	  });
	
  });

