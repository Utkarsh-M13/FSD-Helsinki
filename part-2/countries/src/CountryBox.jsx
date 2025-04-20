import React from "react";
import "./styles.css";
import WeatherBox from "./WeatherBox";

const CountryBox = ({ data }) => {
  const languages = [];
  for (const language of Object.values(data.languages)) {
    languages.push(language);
  }
  const flagURL = data.flags.svg;
  const capitalLat = data.capitalInfo.latlng[0];
  const capitalLng = data.capitalInfo.latlng[1];

  return (
    <div className="data">
      <h1>{data.name.common}</h1>
      <h3>{data.name.official}</h3>
      <div className="info">{`Capital City: ${data.capital}`}</div>
      <div className="info">{`Coordinates: ${capitalLat}N ${capitalLng}E`}</div>
      <div className="info">{`Population: ${data.population}`}</div>
      <img className="flag" src={flagURL} alt={`Flag of ${data.name.common}`} />
      <h4>Languages Spoken</h4>
      <ul>
        {languages.map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <WeatherBox lat={capitalLat} lng={capitalLng}></WeatherBox>
    </div>
  );
};

export default CountryBox;
