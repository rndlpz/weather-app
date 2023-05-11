app.get('/weather/:lat/:lon', (req, res) => {
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
			   let  weatherStatus = body.weather[0].main
		  		return {“temp” : body.main.temp, “weatherStatus” : weatherStatus} // New Code
	  });
	
  });

