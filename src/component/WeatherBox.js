import React from "react";
// weather =  props
const weatherBox = ({ weather }) => {
  // console.log("wea??", weather);
  return (
    <div className="weather-Box">
      <div>{weather && weather.name}</div>
      <h3>
        현재온도 : {weather && weather.main.temp}°C /{" "}
        {Math.floor((weather && weather.main.temp) * 1.8 + 32)}°F
      </h3>
      <h4>
        최저온도 : {weather && weather.main.temp_min} / 최고온도:{" "}
        {weather && weather.main.temp_max}
      </h4>
      <h4>{weather && weather.weather[0].description}</h4>
    </div>
  );
};

export default weatherBox;
