// api key : f9c2e38490f83652470b710695a68984
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const notificationElement = document.querySelector('.notification');
const timezoneElement = document.querySelector('.time-zone');
const countryElement = document.querySelector('.country');
const weatherItemsElement = document.querySelector('.weather-items');

const weather = {};
weather.temperature = {
    unit: 'celsuis'
};

const KELVIN = 273;
const API_key ='f9c2e38490f83652470b710695a68984';

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError );
}else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML=`<p> Browser doesn't support Geolocalization`;
}
 function setPosition(position){
     let latitude = position.coords.latitude;
     let longitude = position.coords.longitude;

     getWeather(latitude, longitude);
     
 }

function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
     let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`;
     

     fetch(api).then(function(response){
         let data = response.json();
         return data;
     })
     .then(function(data){
         weather.temperature.value = Math.floor(data.main.temp - KELVIN);
         weather.descripition = data.weather[0].descripition;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
        

     })
     .then(function(){
         displayWeather();
        
        
     });
 }

 function displayWeather(){
     iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
     tempElement.innerHTML = `${weather.temperature.value}&#176; <span>C</span>`;
     descElement.innerHTML = weather.descripition
     timezoneElement.innerHTML = `${weather.city}, ${weather.country}`;
     
 }
 





  










































/*getWeatherData(); 
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success)=> {
    

        let{latitude, longitude} = success.coords;



fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_key}`).then(res => res.json()).then(data => {
    
    console.log(data)
   showWeatherData(data);
    

})
})
}
function showWeatherData(data) {
    let { sunrise, sunset} = data.current;

    timezoneElement.innerHTML = data.timezone;
    countryElement.innerHTML = data.lat + 'N'   + data.lon +'E'

    weatherItemsElement.innerHTML =
    `<div class="weather-items">
    <div>sunrise</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-items">
    <div>sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>`;


}














    //`<div class="weather-items">
      // <div>sunrise</div>
    //<div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
     //</div><div class="weather-items">
      //<div>sunset</div>
      //<div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
   //</div>`; 
   
   
   
   
   
   //  `<div class="weather-items">
    //    <div>sunrise</div>
        
    //</div></><div class="weather-items">
      //  <div>sunset</div>
        //<div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    //</div>`*/