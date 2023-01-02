const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '**Secret**',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

const getWeather = (city)=> {
	cityName.innerHTML = city

	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
	.then(response => response.json())
	.then((response) => {

        console.log(response)

        temp.innerHTML = response.temp
        wind_speed.innerHTML = response.wind_speed
        humidity.innerHTML = response.humidity

    })
	.catch(err => console.error(err));

}

submit.addEventListener("click", (e)=>{
	e.preventDefault()
	getWeather(city.value)
})

getWeather("Delhi")
