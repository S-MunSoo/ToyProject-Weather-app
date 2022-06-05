import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, handleCityChange }) => {
  return (
    <div className="weather-button">
      <Button variant="warning" onClick={() => handleCityChange("current")}>
        Current Location
      </Button>
      {/* JS 사용하고싶으면 {} 써야한다. */}
      {/* map은 원본 배열에서 새로운 배열로 값을 반환(리턴) 해준다. */}

      {cities.map((citiesBtn) => {
        return (
          <Button variant="warning" onClick={() => setCity(citiesBtn)}>
            {citiesBtn}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
