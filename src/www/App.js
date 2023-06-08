import React, { useState } from "react";
import "./App.css";
import Map from "./Components/Map";

const ZOOM = 12;

const App = (props) => {
  const [geoLocation, setGeoLocation] = useState({
    latitude: 50,
    longitude: 50,
  });

  const clickHandler = async (ev) => {
    ev.preventDefault();
    const location = document.getElementById("search-location").value;
    let weatherDetails;

    try {
      const googleResponse = await fetch(
        `/api/v1/googlePlaces?location=${location}`
      );
      const { lat, lng } = await googleResponse.json();

      setGeoLocation({
        latitude: lat,
        longitude: lng,
      });

      const weatherResponse = await fetch(
        `/api/v1/weather?lat=${lat}&lng=${lng}`
      );
      weatherDetails = await weatherResponse.json();

    } catch (error) {
      console.log(error.message);
    }

    const iconElem = document.getElementById("weather-image");
    iconElem.src = `http://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`;
  };

  return (
    <div className="App">
      <header className="App_header">
        <div className="searchBar">
          <form id="location-search-form" className="searchForm">
            <label htmlFor="search-location" className="searchFormElement">Location</label>
            <input id="search-location" className="searchFormElement"></input>
            <button type="submit" className="searchFormElement" onClick={clickHandler}>
              Search
            </button>
          </form>
          <img id="weather-image" src="" className="searchFormElement"></img>
        </div>
        <Map geoLocation={geoLocation} zoom={ZOOM} />
      </header>
    </div>
  );
};

export default App;
