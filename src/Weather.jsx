import React, { useState } from "react";
import "./Weather.css";

const api = {
  key: "a83c8c4d01eba608e1c2b3bbd43b9d0c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = (evt) => {
    if (evt.key === "Enter") {
      setLoading(true);
      setError(null);
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("City not found");
          }
          return res.json();
        })
        .then((result) => {
          setWeather(result);
          setLoading(false);
          setQuery("");
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          setWeather({});
          setQuery("");
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {error && <div className="error">{error}</div>}

            {typeof weather.main != "undefined" ? (
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.name},{weather.sys.country}
                  </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="weather">{weather.weather[0].main}</div>
                  <div className="details">
                    <p>Humidity:{weather.main.humidity}%</p>
                    <p>Wind:{Math.round(weather.wind.speed)}km/hr</p>
                    <p>Pressure:{weather.main.pressure} hPa</p>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
export default Weather;
