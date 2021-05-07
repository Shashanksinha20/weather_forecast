import React, {useState } from "react";
import "./Weather.css";
import axios from 'axios'
import 'weather-icons/css/weather-icons.css';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

function App() {
  const [info, setInfo] = useState({});
  const [city, setCity] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [name, setName] = useState("More Info")

  const cityHandler = (event) => {
    setCity(event.target.value);
  };

  const buttonHandler = () => {
    if (city.length > 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97a75dd0b67f33988487b2faa41e6476`
        )
        .then((res) => {
          //setting time with momemt.js

          const sunset1 = moment
            .utc((res.data.sys.sunset + res.data.timezone) * 1000)
            .format("hh:mm A");
          const sunrise1 = moment
            .utc((res.data.sys.sunrise + res.data.timezone) * 1000)
            .format("hh:mm A");

          res.data.sunrise = sunrise1;
          res.data.sunset = sunset1;
          const now = moment(res.data.dt * 1000)
            .add(res.data.timezone, "seconds")
            .unix();

          const sunrise = moment
            .utc((res.data.sys.sunrise + res.data.timezone) * 1000)
            .unix();
          const sunset = moment
            .utc((res.data.sys.sunset + res.data.timezone) * 1000)
            .unix();
          const isDay = now < sunrise || now > sunset ? false : true;
          res.data.isDay = isDay;
          // console.log({ now, sunset, sunrise, isDay });
          res.data.dt = moment
            .utc()
            .add(res.data.timezone, "seconds")
            .format("hh : mm A");
          //time part ends
          setInfo(res.data);
          setLoaded(true);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const moreInfoHandler = () => {
    setMoreInfo(!moreInfo);
    if(moreInfo === true){
      setName("More Info")
    }
    else
    {
      setName("Close")
    }
    
    // console.log(moreInfo);
  };

  const conditionHandler = (range) => {
    if (info.isDay) {
      if (range >= 200 && range <= 232) {
        return <i className="wi wi-day-thunderstorm display-1"></i>;
      } else if (range >= 300 && range <= 321) {
        return <i className="wi wi-day-showers display-1"></i>;
      } else if (range >= 500 && range <= 531) {
        return <i className="wi wi-day-rain display-1"></i>;
      } else if (range >= 600 && range <= 622) {
        return <i className="wi wi-day-snow display-1"></i>;
      } else if (range >= 701 && range <= 781) {
        return <i className="wi wi-day-haze display-1"></i>;
      } else if (range >= 801 && range <= 804) {
        return <i className="wi wi-day-cloudy display-1"></i>;
      } else {
        return <i className="wi wi-day-sunny display-1"></i>;
      }
    } else {
      if (range >= 200 && range <= 232) {
        return <i className="wi wi-night-thunderstorm display-1"></i>;
      } else if (range >= 300 && range <= 321) {
        return <i className="wi wi-night-showers display-1"></i>;
      } else if (range >= 500 && range <= 531) {
        return <i className="wi wi-night-rain display-1"></i>;
      } else if (range >= 600 && range <= 622) {
        return <i className="wi wi-night-snow display-1"></i>;
      } else if (range >= 701 && range <= 781) {
        return <i className="wi wi-night-fog display-1"></i>;
      } else if (range >= 801 && range <= 804) {
        return <i className="wi wi-night-cloudy display-1"></i>;
      } else {
        return <i className="wi wi-night-clear display-1"></i>;
      }
    }
  };

  return (
    <>
      <div className="App">
        <div>
          <section className="header">
            <div></div>
            <div>
              <h1>Weather Forecast</h1>
            </div>
            <div id = "blue">
              <h2>{info.dt}</h2>
            </div>
          </section>

          <input
            className="input"
            type="text"
            value={city}
            placeholder="Search City"
            onChange={cityHandler}
          />
          <button className="button" onClick={buttonHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg> Get Weather
          </button>
          <br />
        </div>

        {isLoaded ? (
          <div className="report">
            <br />
            <h2>
              {info.name}, {info.sys.country}
            </h2>
            <h1 className="text-size">
              {Math.round(info.main.temp - 273.15)}
              <sup>o</sup>C
            </h1>
            <h2>
              <i>{info.weather[0].main}</i>
            </h2>
            <div>{conditionHandler(info.weather[0].id)}</div>
            <br />
            <h3>
              Feels Like {Math.round(info.main.feels_like - 273.15)}
              <sup>o</sup> | HI {Math.round(info.main.temp_max - 273.15)}
              <sup>o</sup> / LO {Math.round(info.main.temp_min - 273.15)}
              <sup>o</sup>
            </h3>
            <div className="moreInfo report" onClick={moreInfoHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              &ensp;{name}
            </div>
            <div>
              {moreInfo === true ? (
                <section className="moreInfoContainer blue">
                  <div>
                    <p>
                      <b>Wind: {Math.round(info.wind.speed * 2.236936)}mph</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Humidity : {info.main.humidity}%</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>
                        Visibility :{" "}
                        {Math.round(info.visibility * 0.00062137119224)}mi
                      </b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Sunrise : {info.sunrise}</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Sunset : {info.sunset}</b>
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Pressure : {info.main.pressure} hPa</b>
                    </p>
                  </div>
                </section>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App
