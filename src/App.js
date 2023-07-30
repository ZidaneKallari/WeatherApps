import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
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
      });
      setLocation("");
    }
  };
  const getDateFromAPI = (timezone) => {
    const currentTimeUTC = new Date().getTime();
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const locationOffset = timezone;
    const currentTimeInSeconds = currentTimeUTC / 1000 + timezoneOffset + locationOffset;
    setCurrentDate(new Date(currentTimeInSeconds * 1000));
  };
  const getTimeFromAPI = (timezone) => {
    const currentTimeUTC = new Date().getTime();
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const locationOffset = timezone;
    const currentTimeInSeconds = currentTimeUTC / 1000 + timezoneOffset + locationOffset;
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
            <p>{data.name}</p>
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
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            

            <div className="pressure">
            <img src="./assets/pressure.svg" alt="SVG Icon" width="24" height="24"></img>
              {data.main ? <p className="bold">{data.main.pressure} hPa</p> : null}
              <p>Pressure</p>
            </div>
            
            <div className="humidity">
            <img src="./assets/humidity.svg" alt="SVG Icon" width="24" height="24"></img>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>

            <div className="wind">
            <img src="./assets/wind.svg" alt="SVG Icon" width="24" height="24"></img>
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

export default App;