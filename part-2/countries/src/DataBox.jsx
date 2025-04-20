import React from "react";
import CountryBox from "./CountryBox";
import "./styles.css";

const DataBox = ({ allData, search, setSearch }) => {
  const countries = allData.filter((country) => {
    if (country.name.common.toLowerCase().includes(search.toLowerCase()))
      return true;
  });

  if (
    countries.length === 1 ||
    countries.find(
      (country) => country.name.common.toLowerCase() === search.toLowerCase()
    )
  ) {
    if (countries.length > 1) {
      const country = countries.find(
        (country) => country.name.common.toLowerCase() === search.toLowerCase()
      );
      return <CountryBox data={country}></CountryBox>;
    }
    return <CountryBox data={countries[0]}></CountryBox>;
  } else if (countries.length > 10) {
    return <div className="data">Too many countries fit the search value</div>;
  } else {
    return (
      <ul className="data">
        {countries.map((country) => {
          return (
            <div key={country.name.common}>
              <li>{country.name.common}</li>
              <button
                className="show"
                onClick={() => {
                  setSearch(country.name.common);
                }}
              >
                Show Country
              </button>
            </div>
          );
        })}
      </ul>
    );
  }
};

export default DataBox;
