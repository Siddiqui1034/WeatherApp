let weather ={
    apiKey :"08dd9de73419f1b8d9737237fc7cb363",
    fetchWeather : function (city){
        fetch("api.openweathermap.org/data/2.5/weather?q=" + city + )
    }
}