import { useState } from 'react';
import './App.css';
import './styles.css';

function App() {
  const apiKey = "92f8aaa04b1879d44dd100312b04796b";
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!city.trim()) {
      alert("Please provide the city name");
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        setWeather({
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          temp: data.main.temp,
          city: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
        });
      })
      .catch(() => {
        alert("Unable to fetch the weather forecast");
        setWeather(null);
      });
  }

  return (
    <div className="container">
      <h1>Weather Forecast App</h1>
      <form className="content" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          className="txt"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          name="city"
        />
        <button className="btn" type="submit">Search</button>
      </form>

      {weather && (
        <>
          <div className="weather-info">
            <h3>{weather.city}</h3>
            <img src={weather.icon} alt="weather icon" />
            <div className="celsius">Temperature: {weather.temp} &#8451;</div>
          </div>
          <div className="containers">
            <div>
              <p><i className="fa-solid fa-water"></i> Humidity</p>
              <p>{weather.humidity}%</p>
            </div>
            <div>
              <p><i className="fa-solid fa-wind"></i> Wind Speed</p>
              <p>{weather.speed} km/hr</p>
            </div>
          </div>
        </>
      )}

      <h2 className="tag">Developed by sruthi</h2>
    </div>
  );
}

export default App;
