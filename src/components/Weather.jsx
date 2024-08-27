import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Weather.css";

export default function Weather() {
  const API_KEY = import.meta.env.VITE_API_KEY_WEATHER;

  const [data, setData] = useState(null);
  const [location, setLocation] = useState();

  useEffect(() => {
    async function fetchDefaultLocation() {
      const CITY_NAME = "Atibaia";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;
      const response = await axios.get(url);
      setData(response.data);
    }
    // fetchDefaultLocation();
  }, []);

  async function fetchDataWeather(city) {
    const trimmedCity = city.trimEnd();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("An unexpected error occurred", error);
      }
    }
  }

  function handleInputChange(e) {
    setLocation(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchDataWeather(location);
    }
  }

  function getWeatherIcon(weatherType) {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Drizzle":
        return <i className="bx bxs-cloud-drizzle"></i>;
      case "Fog":
      case "Mist":
      case "Haze":
        return <i className="bx bxs-fog"></i>;
      default:
        return <i className="bx bxs-question-mark"></i>; // Ícone padrão para tipos desconhecidos
    }
  }

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          {data && <div className="location">{data.name}</div>}
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => fetchDataWeather(location)}
          ></i>
        </div>
      </div>

      {data && data.notFound ? (
        <div className="not-found">Not Found</div>
      ) : (
        data && (
          <div className="weather-data">
            {data.weather &&
              data.weather[0] &&
              getWeatherIcon(data.weather[0].main)}
            <div className="weather-type">
              {data.weather ? data.weather[0].main : null}
            </div>
            <div className="temp">
              {data.main && Math.round(data.main.temp - 273.15)}°C
            </div>
          </div>
        )
      )}
    </div>
  );
}
