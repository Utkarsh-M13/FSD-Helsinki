import axios from "axios";

const API_KEY = import.meta.env.VITE_WTHR_KEY;

const allURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
// const specURL = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getData = () => {
  const data = axios.get(allURL).then((response) => response.data);
  return data;
};

const getWeather = (lat, lng) => {
  const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  const data = axios.get(URL).then((r) => r.data);
  return data;
};

export { getData, getWeather };
