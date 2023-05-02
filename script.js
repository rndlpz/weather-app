let latitude = 0;
let longitude = 0;

window.onload = function() {
	const date = new Date();
	const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
	document.getElementById('date').innerHTML = dateString;
// Now, set the .date HTML text to our dateString
}

if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(success);

} else {
	  console.log("Geolocation is not available in your browser.");
}

function success(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	console.log(latitude, longitude);

}

//Write the code that sets const btn to our #getWeatherBtn ID
// const btn = document.querySelector("p");

const btn = document.getElementById('getWeatherBtn');
btn.addEventListener("click", () => {
    let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]];
    let forecastElements = document.getElementsByClassName("forecast");
    for (let i = 0; i < forecast.length; i++) {
        forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u{00B0}F";
    }
});
