import React, { useEffect, useState } from "react";
import { getWeather } from "./services/countries";

const WeatherBox = ({ lat, lng }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getWeather(lat, lng).then((data) => {
      console.log("data", data);
      setData(data);
    });
  }, [lat, lng]);

  if (data != null) {
    return (
      <>
        <h2>Weather</h2>
        <div className="info">{`Temperature: ${(data.current.temp / 10).toFixed(
          2
        )}°C`}</div>
        <div>{`Feels Like: ${(data.current.feels_like / 10).toFixed(
          2
        )}°C`}</div>
      </>
    );
  }
  return;
};

export default WeatherBox;
