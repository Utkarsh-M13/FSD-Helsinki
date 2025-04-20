import { useEffect, useState } from "react";
import "./styles.css";
import { getData } from "./services/countries";
import DataBox from "./Databox";

function App() {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setCountryData(data);
    });
  }, []);

  return (
    <>
      <input
        className="search"
        value={country}
        onChange={(event) => {
          setCountry(event.target.value);
        }}
      />
      <DataBox
        allData={countryData}
        search={country}
        setSearch={setCountry}
      ></DataBox>
    </>
  );
}

export default App;
