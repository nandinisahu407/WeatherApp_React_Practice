import React, { useEffect, useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search_icon1.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {

  let api_key="5e3e5d895b11e97dba2aa65c9b80ed98";
  const [wicon,setWicon]=useState(cloud_icon);

  const [isDay, setIsDay] = useState(true);


  const search=async()=>{
   
    const element=document.getElementsByClassName("cityInpput")
    if(element[0].value===""){
      return 0;
    }

    let url=`https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${element[0].value}&units=Metric`

    let response=await fetch(url);

    if(!response.ok){
      //Handling case where the city is not found
        const location = document.getElementsByClassName("weather-location");
        location[0].innerHTML = "No Such City Found";
        return;
    }
    
    //else normal execution continues 
    let data=await response.json();  

    const  humidity=document.getElementsByClassName("humidity-percent");
    const wind=document.getElementsByClassName('wind-rate');

    const temp=document.getElementsByClassName('weather-temp');
    const location=document.getElementsByClassName('weather-location');

    humidity[0].innerHTML=data.main.humidity+" %";
    wind[0].innerHTML=data.wind.speed+" km/h";
    temp[0].innerHTML=data.main.temp+"°C";
    location[0].innerHTML=data.name;

    // if it is night time in city
    if(data.weather[0].icon.slice(-1)==="n"){
      setIsDay(false)
     
    }
    else{
      setIsDay(true)
     
    }
 

    //for weather icons
    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n" ) {   //clear sky

      setWicon(clear_icon);
    } 

    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n" ){ //cloudy
      setWicon(cloud_icon);
    }

    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n" ){ //drixzzy
      setWicon(drizzle_icon);
    }

    else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n" ){ //drizzle
      setWicon(drizzle_icon);
    }

    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n" ){ //rain
      setWicon(rain_icon);
    }

    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n" ){ //rain
      setWicon(rain_icon);
    }

    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n" ){ //snow
      setWicon(snow_icon);
    }

    else{
      setWicon(clear_icon);
    }


  }

  //to update day-night theme immediately on change
  useEffect(() => {
    const container = document.getElementsByClassName("container")[0];
    container.style.setProperty("--background-gradient", isDay ? "var(--background-gradient-day)" : "var(--background-gradient-night)");
  }, [isDay]);



  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" name="" id=""  className="cityInpput" placeholder='Enter city to search'  />
            <div className="search-icon" onClick={search}>
                <img src={search_icon} alt="search icon" />
            </div>
        </div>

        <div className="weather-img">
          <img src={wicon} alt="" />
        </div>

        <div className="weather-temp">
          {/* 24°C */}
        </div>
        <div className="weather-location"></div>

        <div className="data-container">
          {/* humidity */}
          <div className="element">
            <img src={humidity_icon} alt="" className='icon'/>
            <div className="data">
              <div className="humidity-percent"></div>
              <div className="text">Humidity</div>
            </div>
          </div>

          {/* wind speed */}
          <div className="element">
            <img src={wind_icon} alt="" className='icon'/>
            <div className="data">
              <div className="wind-rate"></div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default WeatherApp;
