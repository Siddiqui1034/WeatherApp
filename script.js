let searchCity = document.getElementById('searchCity'),
searchBtn = document.getElementById('searchBtn'),
api_key = `08dd9de73419f1b8d9737237fc7cb363`,
searchWeatherCard = document.querySelectorAll('.rightPane')[0]


function getCityDetails(country, lat, lon, name, state){
    days= [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    let WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    fetch(WEATHER_API).then(res => res.json()).then(data => {
        console.log("WEATHER",data)
        let date = new Date();
        searchWeatherCard.innerHTML = `
         <div class="rightPane">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <p>${data.weather[0].description}</p>
            <p>lat: ${data.coord.lat}</p>
            <p>long: ${data.coord.lon}</p>
            <p class="searchedCity">city ${data.name} ${data.sys.country}</p>
            <p class="sear">Temperature ${(data.main.temp - 273.15).toFixed(2)}&deg;C</p>
            <p>Humidity</p>
            <p>Visibility ${data.visibility}</p>
            <p>Wind Speed ${data.wind.speed}</p>
            <p class="time">Time </p>
            <p class="day">${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</p>
            <p class="day">${name} ${country}</p>
        </div>
        `
    })

    let FORECAST_WEATHER_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`

    fetch(FORECAST_WEATHER_API).then(res=>res.json()).then(data => {
        // console.log("FORECAST",data)
    })
}

function getCityCoordinates(){
    let cityName = searchCity.value.trim()
    searchCity.value ='';
    if(!cityName) return;
    let  GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data =>{
        let {country, lat, lon, name, state} = data[0]
        getCityDetails(country, lat, lon, name, state);
    }).catch(()=>{
        alert(`Failed to fetch coordinates of ${cityName}`)
    })
}

searchBtn.addEventListener('click', getCityCoordinates)



function checkLocation(){
    // check if the geolocation api is available in the browser
    if ("geolocation" in navigator){
        // Attempt to get the user's current position 
        window.addEventListener('load', () => {
            const imageContainer = document.querySelector('.imageGif');
            imageContainer.style.display = 'flex'; // Show the container
            setTimeout(() => {
                const image = document.querySelector('.fade-in');
                image.style.opacity = 1; // Trigger the fade-in effect
            }, 100); // Small delay to ensure the container is displayed before fading in
        });      
        console.log("Location access Not granted")  
        navigator.geolocation.getCurrentPosition(
            function (position){
                // success callback
                console.log("Location access granted")
                console.log("Latitude:", position.coords.latitude)
                console.log("Longitude:", position.coords.longitude)
            },
            function (error){
                // Error callback                
                switch(error.code){
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.")
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable");
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get the user location timed out")
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("An unknow erro occured.");
                        break;
                }
            }
        )
    }
    else{
        // console.log("Location access Not granted")   
    }  
}

const changeBackgroundArray = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image0.jpg',
]
function changeBackground(){
    // debouncing concept apply here so that user cann't frequenty click search to change background image
    document.body.style.opacity = 0;
    const randomIndex = Math.floor(Math.random() * changeBackgroundArray.length);
    // console.log(randomIndex)
    document.body.style.backgroundImage = `url('images/image${randomIndex}.jpg')`;
    document.body.style.opacity = 1;
}
document.getElementById('searchCity').addEventListener('click', changeBackground);
