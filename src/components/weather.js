import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Tooltip from "@radix-ui/react-tooltip";
import "../assets/styles/workspace.css";

export default function Weather() {
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [precipitationProbability, setPrecipitationProbability] =
    useState(null);
  const [location, setLocation] = useState("");

  let emoji;
  let weatherCondition;

  switch (weatherCode) {
    case 0:
      emoji = "☀️";
      weatherCondition = "Clear";
      break;
    case 1:
      emoji = "🌤️";
      weatherCondition = "Mainly Clear";
      break;
    case 2:
      emoji = "🌤️";
      weatherCondition = "Partly Clear";
      break;
    case 3:
      emoji = "☁️";
      weatherCondition = "Overcast";
      break;
    case 45:
    case 48:
      emoji = "☁️";
      weatherCondition = "Foggy";
      break;
    case 51:
    case 53:
    case 55:
      emoji = "🌧️";
      weatherCondition = "Drizzle";
      break;
    case 56:
    case 57:
      emoji = "🌨️";
      weatherCondition = "Freezing Drizzle";
      break;
    case 61:
    case 63:
    case 65:
      emoji = "🌧️";
      weatherCondition = "Rainy";
      break;
    case 66:
    case 67:
      emoji = "🌨️";
      weatherCondition = "Freezing Rainy";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
      emoji = "❄️";
      weatherCondition = "Snowy";
      break;
    case 80:
    case 81:
    case 82:
      emoji = "🌧️";
      weatherCondition = "Rain Showers";
      break;
    case 85:
    case 86:
      emoji = "🌨️";
      weatherCondition = "Snow Showers";
      break;
    case 95:
    case 96:
    case 99:
      emoji = "🌩️";
      weatherCondition = "Thunderstorm";
      break;
    default:
      emoji = "⚠️";
      weatherCondition = "No Info";
      break;
  }

  const temperatureRounded = Math.round(temperature);

  var today = new Date(),
    time = today.getHours();

  useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        try {
          const res = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json?q=" +
              lat +
              "+" +
              long +
              "&key=8145b684f7614c00ace8e44de4913e1b"
          );
          const { results } = res.data;
          if (results.length > 0) {
            const { components } = results[0];
            setLocation(components);
            console.log("Geocoding: ", components);
          }
        } catch (error) {
          console.log(error);
        }
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        try {
          const res = await axios.get(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
              lat +
              "&longitude=" +
              long +
              "&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,visibility,windspeed_10m,winddirection_10m,uv_index&forecast_days=1"
          );

          setData(res.data);
          console.log("Dados da API Open Meteo: ", res.data);
          setTemperature(res.data.hourly.temperature_2m[time]);
          setWeatherCode(res.data.hourly.weathercode[time]);
          setHumidity(res.data.hourly.relativehumidity_2m[time]);
          setPrecipitationProbability(
            res.data.hourly.precipitation_probability[time]
          );
          setWindDirection(res.data.hourly.winddirection_10m[time]);
          setWindSpeed(res.data.hourly.windspeed_10m[time]);
          setUvIndex(res.data.hourly.uv_index[time]);
        } catch (err) {
          console.log(err);
        }
      });
    };

    getData();
  }, []);
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="Weather">
            <p className="WeatherCondition">
              {emoji} | {weatherCondition}
            </p>
            <p className="Temperature">{temperatureRounded} °C</p>
            <p className="Location">
              {location.city}, {location.country}
            </p>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" side="bottom">
            <h6>Current Weather Conditions</h6>
            <hr />
            <p> Uv Index: {uvIndex} </p>
            <p> Precipitation Probability: {precipitationProbability} % </p>
            <p> Humidity: {humidity} % </p>
            <p> Wind Speed: {windSpeed} km/h </p>
            <p> Wind Direction: {windDirection} ° </p>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
