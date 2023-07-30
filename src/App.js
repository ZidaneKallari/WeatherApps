import React, { useState } from "react";
import axios from "axios";
import Humidity from "./assets/humidity";
import Pressure from "./assets/pressure";
import Wind from "./assets/wind";
import ClearIcon from "./assets/clear.svg";
import CloudsIcon from "./assets/clouds.svg";
import RainIcon from "./assets/rain.svg";
import DrizzleIcon from "./assets/drizzle.svg";
import ThunderstormIcon from "./assets/thunderstorm.svg";
import SnowIcon from "./assets/snow.svg";
import MistIcon from "./assets/mist.svg";
import HazeIcon from "./assets/haze.svg";
import FogIcon from "./assets/fog.svg";
import SmokeIcon from "./assets/smoke.svg";
import DustIcon from "./assets/dust.svg";
import SandIcon from "./assets/sand.svg";
import AshIcon from "./assets/ash.svg";
function App() {
  const [data, setData] = useState({});
  const [weatherCondition, setWeatherCondition] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=481975326e20847c7de315043d400c8e`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        getDateFromAPI(response.data.timezone);
        getTimeFromAPI(response.data.timezone);
        setWeatherCondition(response.data.weather[0].main);
      });
      setLocation("");
    }
  };
  const getDateFromAPI = (timezone) => {
    const currentTimeUTC = new Date().getTime();
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const locationOffset = timezone;
    const currentTimeInSeconds =
      currentTimeUTC / 1000 + timezoneOffset + locationOffset;
    setCurrentDate(new Date(currentTimeInSeconds * 1000));
  };
  const getTimeFromAPI = (timezone) => {
    const currentTimeUTC = new Date().getTime();
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const locationOffset = timezone;
    const currentTimeInSeconds =
      currentTimeUTC / 1000 + timezoneOffset + locationOffset;
    setCurrentTime(new Date(currentTimeInSeconds * 1000));
  };
  const convertToCelsius = (fahrenheitValue) => {
    const celcius = ((fahrenheitValue - 32) * 5) / 9;
    return celcius.toFixed();
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Region Or Country"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>
              {data.name}
              
            </p>
            
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{convertToCelsius(data.main.temp.toFixed())}°C</h1>
            ) : null}
            
          </div>
          <div className="clock">
            <p>{currentDate.toLocaleDateString()}</p>
            <p>Current Time: {currentTime.toLocaleTimeString()}</p>
          </div>

          <div className="weathericon">
          <p>
            {weatherCondition === "Clear" && <img src={ClearIcon} alt="Clear" />}
              {weatherCondition === "Clouds" && <img src={CloudsIcon} alt="Clouds" />}
              {weatherCondition === "Rain" && <img src={RainIcon} alt="Rain" />}
              {weatherCondition === "Drizzle" && <img src={DrizzleIcon} alt="Drizzle" />}
              {weatherCondition === "Thunderstorm" && <img src={ThunderstormIcon} alt="Thunderstorm" />}
              {weatherCondition === "Snow" && <img src={SnowIcon} alt="Snow" />}
              {weatherCondition === "Mist" && <img src={MistIcon} alt="Mist" />}
              {weatherCondition === "Haze" && <img src={HazeIcon} alt="Haze" />}
              {weatherCondition === "Fog" && <img src={FogIcon} alt="Fog" />}
              {weatherCondition === "Smoke" && <img src={SmokeIcon} alt="Smoke" />}
              {weatherCondition === "Dust" && <img src={DustIcon} alt="Dust" />}
              {weatherCondition === "Sand" && <img src={SandIcon} alt="Sand" />}
              {weatherCondition === "Ash" && <img src={AshIcon} alt="Ash" />}
            </p>
          </div>

          <div className="description">
            
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            
          </div>
          
        </div>
        
        {data.name !== undefined && (
          <div className="bottom">
            <div className="pressure">
              <Pressure />
              {data.main ? (
                <p className="bold">{data.main.pressure} hPa</p>
              ) : null}
              <p>Pressure</p>
            </div>

            <div className="humidity">
              <Humidity />
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>

            <div className="wind">
              <Wind />
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;