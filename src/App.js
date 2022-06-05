import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
// 1. 앱이 실행되자마자(useEffect api 가져오기), 현재 위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시,썹씨,화씨 날씨 상태
// 3. 5개의 버튼이 있다.(1개는 현재 위치 날씨 , 4개는 다른 도시)
// 4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.

const cities = ["paris", "new york", "tokyo", "seoul"];

function App() {
  // ui에 보여주는 데이터를 만들어준다 state
  const [weather, setWeather] = useState(null);
  // 버튼클릭시 도시날씨 정보 가져오는 state 자식 컴포넌트에게 props 해준다.
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  // 도시정보 배열 관리

  const getCurrentLocation = () => {
    // 현재 위치 불러오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  // 현재 날씨 불러오기 API(fetch)
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=768488f9727d306b81da906732c1ce45&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    //state setWeather 에 가지고온 날씨 data를 넣어준다.
    console.log("data??", data);
    setWeather(data);
    setLoading(false);
  };
  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=768488f9727d306b81da906732c1ce45&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data2?", data);
    setWeather(data);
    setLoading(false);
  };

  // useEffect(콜백 , 배열) api호출 해주는 영역이다.
  useEffect(() => {
    if (city === "") {
      getCurrentLocation(); // 현재 위치 정보 호출
    } else {
      getWeatherByCity(); // message: "Nothing to geocode" 에러는 뭐야 ??? uesEffect는 한번만 써주자!!
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  // 화면 그려주는 곳
  return (
    <div>
      {loading ? (
        <div className="container">
          {/* <ClipLoader color="#f88c6d" loading={loading} size={150} className="lds-dual-ring " /> */}
          <div class="lds-roller" loading={loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            setCity={setCity}
          />
        </div>
      )}
    </div>
  );
}

export default App;
